import type { Metadata } from "next";
import Link from "next/link";
import { getSurveyResultByToken } from "@/lib/results/service";

type ResultPageProps = {
  searchParams: Promise<{ token?: string }>;
};

export const metadata: Metadata = {
  title: "Resultado | Matrimonios",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-foreground">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Resultado
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Falta el identificador del resultado
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-300">
            Vuelve a completar la encuesta desde el inicio para generar un
            resumen nuevo.
          </p>
          <Link
            className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950"
            href="/encuesta"
          >
            Ir a la encuesta
          </Link>
        </div>
      </main>
    );
  }

  const result = await getSurveyResultByToken(token);

  if (!result) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 text-foreground">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Resultado
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            No encontramos ese resultado
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-300">
            El enlace puede estar incompleto o el resultado no existe.
          </p>
          <Link
            className="mt-6 inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950"
            href="/encuesta"
          >
            Ir a la encuesta
          </Link>
        </div>
      </main>
    );
  }

  const { submission, summary: scoreSummary } = result;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#8d1d1d_0%,#3d0d12_32%,#14070a_72%,#090406_100%)] px-5 py-8 text-foreground sm:px-6 sm:py-10">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-[2rem] border border-amber-100/15 bg-black/25 px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/90">
            Resultado personal
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
            Resumen de tu evaluacion matrimonial
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-stone-200/80">
            Esta lectura no busca condenarte, sino ayudarte a ver con claridad
            una fortaleza y dos areas que necesitan atencion practica esta
            semana.
          </p>
          <p className="mt-4 text-sm text-stone-300">
            Encuesta completada el{" "}
            {new Date(submission.completedAt).toLocaleString("es-CR", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            .
          </p>
          <div className="mt-6">
            <a
              className="inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              href={`/api/pdf?token=${encodeURIComponent(token)}`}
              target="_blank"
            >
              Descargar PDF
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-[2rem] border border-emerald-300/15 bg-emerald-500/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
              Fortaleza principal
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-50">
              {scoreSummary.strongest.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-stone-200/85">
              {scoreSummary.strongest.description}
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200/90">
              Puntaje promedio: {scoreSummary.strongest.average.toFixed(2)} / 5
            </p>
          </div>

          <div className="rounded-[2rem] border border-amber-200/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Vista general
            </p>
            <div className="mt-4 space-y-4">
              {scoreSummary.categoryScores.map((category) => (
                <div
                  className="rounded-[1.25rem] border border-white/8 bg-black/20 p-4"
                  key={category.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-sm text-stone-100">
                      {category.title}
                    </strong>
                    <span className="text-sm font-semibold text-amber-200">
                      {category.average.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {scoreSummary.weaknesses.map((weakness) => (
            <article
              className="rounded-[2rem] border border-rose-200/15 bg-rose-500/10 p-6"
              key={weakness.id}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-200">
                Area que necesita crecer
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-stone-50">
                {weakness.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-stone-200/85">
                {weakness.description}
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-rose-200/90">
                Puntaje promedio: {weakness.average.toFixed(2)} / 5
              </p>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
                  Sugerencias para esta semana
                </p>
                <ul className="space-y-3">
                  {weakness.suggestions.map((suggestion) => (
                    <li
                      className="rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-stone-100"
                      key={suggestion}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
