"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SurveyDefinition } from "@/lib/questions/service";
import type { Gender } from "@/types";

type SurveyState = "audience" | "intro" | "questions";

const scoreOptions = [
  { value: 1, label: "1", hint: "Muy poco" },
  { value: 2, label: "2", hint: "Poco" },
  { value: 3, label: "3", hint: "A veces" },
  { value: 4, label: "4", hint: "Frecuente" },
  { value: 5, label: "5", hint: "Constante" },
];

export default function SurveyPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<SurveyState>("audience");
  const [audience, setAudience] = useState<Gender | null>(null);
  const [survey, setSurvey] = useState<SurveyDefinition | null>(null);
  const [loadingSurvey, setLoadingSurvey] = useState(false);
  const [surveyError, setSurveyError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!audience) {
      return;
    }

    let cancelled = false;

    async function loadSurvey() {
      setLoadingSurvey(true);
      setSurveyError(null);

      try {
        const response = await fetch(`/api/survey?audience=${audience}`);
        const payload = (await response.json()) as
          | { ok: true; data: SurveyDefinition }
          | { ok: false; message: string };

        if (!response.ok || !payload.ok) {
          throw new Error(
            "message" in payload
              ? payload.message
              : "No se pudo cargar la encuesta.",
          );
        }

        if (cancelled) {
          return;
        }

        setSurvey(payload.data);
        setPhase("intro");
        setCurrentIndex(0);
        setAnswers({});
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSurveyError(
          error instanceof Error
            ? error.message
            : "Ocurrio un error al cargar la encuesta.",
        );
      } finally {
        if (!cancelled) {
          setLoadingSurvey(false);
        }
      }
    }

    loadSurvey();

    return () => {
      cancelled = true;
    };
  }, [audience]);

  const currentQuestion = survey?.questions[currentIndex];
  const selectedScore = currentQuestion
    ? answers[currentQuestion.orderInSurvey]
    : undefined;
  const answeredCount = Object.keys(answers).length;
  const progress = survey ? ((currentIndex + 1) / survey.questions.length) * 100 : 0;

  async function handleSubmit() {
    if (!survey) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          audience: survey.audience,
          answers: survey.questions.map((question) => ({
            orderInSurvey: question.orderInSurvey,
            score: answers[question.orderInSurvey],
          })),
        }),
      });

      const payload = (await response.json()) as
        | {
            ok: true;
            data: { submissionId: string; publicToken: string };
          }
        | { ok: false; message: string };

      if (!response.ok || !payload.ok) {
        throw new Error(
          "message" in payload
            ? payload.message
            : "No se pudo guardar la encuesta.",
        );
      }

      router.push(`/resultado?token=${payload.data.publicToken}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No se pudo guardar la encuesta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#7a1919_0%,#351015_32%,#13070a_72%,#090406_100%)] px-5 py-8 text-foreground sm:px-6 sm:py-10">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col justify-center">
        <div className="overflow-hidden rounded-[2rem] border border-amber-100/15 bg-black/25 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="border-b border-amber-100/10 bg-[linear-gradient(135deg,rgba(255,224,127,0.16),rgba(255,255,255,0.02))] px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
              Encuesta matrimonial
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
              Evaluacion personal del matrimonio
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-200/80 sm:text-base">
              Un recorrido privado, reflexivo y directo para identificar
              fortalezas y areas que necesitan crecer.
            </p>
          </div>

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            {phase === "audience" && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-amber-300">
                    Paso 1
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                    Selecciona la version de la encuesta
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-stone-300">
                    Cada participante responde solo la version que le
                    corresponde. El contenido es privado y se guarda sin nombres.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    className="rounded-[1.5rem] border border-amber-200/20 bg-white/5 p-6 text-left transition hover:border-amber-300/50 hover:bg-white/8"
                    onClick={() => setAudience("man")}
                    type="button"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                      Version
                    </span>
                    <strong className="mt-3 block text-2xl text-stone-50">
                      Hombre
                    </strong>
                    <span className="mt-3 block text-sm leading-6 text-stone-300">
                      Preguntas orientadas al liderazgo, amor, gracia,
                      fidelidad y vida espiritual del esposo.
                    </span>
                  </button>

                  <button
                    className="rounded-[1.5rem] border border-amber-200/20 bg-white/5 p-6 text-left transition hover:border-amber-300/50 hover:bg-white/8"
                    onClick={() => setAudience("woman")}
                    type="button"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                      Version
                    </span>
                    <strong className="mt-3 block text-2xl text-stone-50">
                      Mujer
                    </strong>
                    <span className="mt-3 block text-sm leading-6 text-stone-300">
                      Preguntas orientadas al respeto, apoyo, gracia,
                      fidelidad y vida espiritual de la esposa.
                    </span>
                  </button>
                </div>

                {loadingSurvey && (
                  <p className="text-sm text-amber-100/85">
                    Cargando la encuesta...
                  </p>
                )}

                {surveyError && (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-100">
                    {surveyError}
                  </div>
                )}
              </div>
            )}

            {phase === "intro" && survey && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-amber-300">
                    Paso 2
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                    Antes de comenzar
                  </h2>
                </div>

                <div className="rounded-[1.5rem] border border-amber-100/15 bg-white/5 p-5 text-base leading-8 text-stone-200">
                  {survey.introNote}
                </div>

                <div className="rounded-[1.5rem] border border-amber-100/10 bg-black/20 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
                    Version elegida
                  </p>
                  <p className="mt-3 text-xl font-semibold text-stone-50">
                    {survey.audience === "man"
                      ? "Preguntas para hombres"
                      : "Preguntas para mujeres"}
                  </p>
                  <p className="mt-2 text-sm text-stone-300">
                    Son {survey.questions.length} preguntas con escala del 1 al
                    5.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="rounded-full border border-amber-200/25 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-amber-300/50 hover:text-stone-50"
                    onClick={() => {
                      setAudience(null);
                      setSurvey(null);
                      setPhase("audience");
                    }}
                    type="button"
                  >
                    Cambiar version
                  </button>
                  <button
                    className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
                    onClick={() => setPhase("questions")}
                    type="button"
                  >
                    Comenzar encuesta
                  </button>
                </div>
              </div>
            )}

            {phase === "questions" && survey && currentQuestion && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
                    <span>
                      Pregunta {currentIndex + 1} de {survey.questions.length}
                    </span>
                    <span>{answeredCount} respondidas</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-300 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-amber-100/12 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                    {survey.categories.find(
                      (category) =>
                        category.id === currentQuestion.categoryId,
                    )?.title ?? "Categoria"}
                  </p>
                  <h2 className="mt-4 text-2xl leading-9 text-stone-50 sm:text-3xl">
                    {currentQuestion.prompt}
                  </h2>
                </div>

                <div className="grid gap-3">
                  {scoreOptions.map((option) => {
                    const isSelected = selectedScore === option.value;

                    return (
                      <button
                        className={`flex items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition ${
                          isSelected
                            ? "border-amber-300 bg-amber-300 text-stone-950"
                            : "border-amber-100/15 bg-white/5 text-stone-100 hover:border-amber-300/50 hover:bg-white/8"
                        }`}
                        key={option.value}
                        onClick={() =>
                          setAnswers((current) => ({
                            ...current,
                            [currentQuestion.orderInSurvey]: option.value,
                          }))
                        }
                        type="button"
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/25 text-base font-semibold">
                            {option.label}
                          </span>
                          <span className="text-base font-medium">
                            {option.hint}
                          </span>
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
                          Seleccionar
                        </span>
                      </button>
                    );
                  })}
                </div>

                {submitError && (
                  <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-100">
                    {submitError}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    className="rounded-full border border-amber-200/25 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-amber-300/50 hover:text-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((index) => index - 1)}
                    type="button"
                  >
                    Anterior
                  </button>

                  <button
                    className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={typeof selectedScore !== "number" || isSubmitting}
                    onClick={() => {
                      if (currentIndex === survey.questions.length - 1) {
                        void handleSubmit();
                        return;
                      }

                      setCurrentIndex((index) => index + 1);
                    }}
                    type="button"
                  >
                    {isSubmitting
                      ? "Guardando..."
                      : currentIndex === survey.questions.length - 1
                        ? "Finalizar encuesta"
                        : "Siguiente"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
