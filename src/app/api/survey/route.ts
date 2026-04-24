import type { Gender } from "@/types";
import { getSurveyDefinition } from "@/lib/questions/service";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

function isGender(value: string | null): value is Gender {
  return value === "man" || value === "woman";
}

type SurveyAnswerInput = {
  orderInSurvey: number;
  score: number;
};

type SurveySubmissionPayload = {
  audience: Gender;
  answers: SurveyAnswerInput[];
};

function isSurveyAnswerInput(value: unknown): value is SurveyAnswerInput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.orderInSurvey === "number" &&
    Number.isInteger(candidate.orderInSurvey) &&
    typeof candidate.score === "number" &&
    Number.isInteger(candidate.score)
  );
}

function isSurveySubmissionPayload(value: unknown): value is SurveySubmissionPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    (candidate.audience === "man" || candidate.audience === "woman") &&
    Array.isArray(candidate.answers) &&
    candidate.answers.every(isSurveyAnswerInput)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const audience = searchParams.get("audience");

  if (!isGender(audience)) {
    return Response.json(
      {
        ok: false,
        message: "Query param 'audience' must be 'man' or 'woman'.",
      },
      { status: 400 },
    );
  }

  return Response.json({
    ok: true,
    data: getSurveyDefinition(audience),
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isSurveySubmissionPayload(body)) {
    return Response.json(
      {
        ok: false,
        message:
          "El cuerpo de la solicitud debe incluir audience: 'man' | 'woman' y answers: [{ orderInSurvey, score }].",
      },
      { status: 400 },
    );
  }

  const uniqueAnswers = new Map<number, number>();

  for (const answer of body.answers) {
    if (answer.orderInSurvey < 1 || answer.orderInSurvey > 20) {
      return Response.json(
        {
          ok: false,
          message: "Cada answer.orderInSurvey debe estar entre 1 y 20.",
        },
        { status: 400 },
      );
    }

    if (answer.score < 1 || answer.score > 5) {
      return Response.json(
        {
          ok: false,
          message: "Cada answer.score debe estar entre 1 y 5.",
        },
        { status: 400 },
      );
    }

    if (uniqueAnswers.has(answer.orderInSurvey)) {
      return Response.json(
        {
          ok: false,
          message: "No se permiten preguntas duplicadas en la misma encuesta.",
        },
        { status: 400 },
      );
    }

    uniqueAnswers.set(answer.orderInSurvey, answer.score);
  }

  if (uniqueAnswers.size !== 20) {
    return Response.json(
      {
        ok: false,
        message: "La encuesta debe incluir exactamente 20 respuestas.",
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();

  const { data: questionSet, error: questionSetError } = await supabase
    .from("question_sets")
    .select("id")
    .eq("key", body.audience)
    .eq("is_active", true)
    .maybeSingle();

  if (questionSetError || !questionSet) {
    return Response.json(
      {
        ok: false,
        message: "No se pudo encontrar el set de preguntas activo para la audiencia seleccionada.",
      },
      { status: 500 },
    );
  }

  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("id, order_in_survey")
    .eq("question_set_id", questionSet.id)
    .eq("is_active", true)
    .order("order_in_survey", { ascending: true });

  if (questionsError) {
    return Response.json(
      {
        ok: false,
        message: "No se pudieron cargar las preguntas activas de la encuesta.",
      },
      { status: 500 },
    );
  }

  if (questions.length !== 20) {
    return Response.json(
      {
        ok: false,
        message: "La encuesta configurada en la base de datos no tiene exactamente 20 preguntas activas.",
      },
      { status: 500 },
    );
  }

  const answersToInsert = questions.map((question) => {
    const score = uniqueAnswers.get(question.order_in_survey);

    if (typeof score !== "number") {
      throw new Error("Missing score for configured survey question.");
    }

    return {
      question_id: question.id,
      score,
    };
  });

  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      audience: body.audience,
      status: "completed",
      user_agent: request.headers.get("user-agent"),
    })
    .select("id, public_token")
    .single();

  if (submissionError || !submission) {
    return Response.json(
      {
        ok: false,
        message: "No se pudo crear la encuesta en Supabase.",
      },
      { status: 500 },
    );
  }

  const { error: answersError } = await supabase.from("answers").insert(
    answersToInsert.map((answer) => ({
      submission_id: submission.id,
      question_id: answer.question_id,
      score: answer.score,
    })),
  );

  if (answersError) {
    await supabase.from("submissions").delete().eq("id", submission.id);

    return Response.json(
      {
        ok: false,
        message: "No se pudieron guardar las respuestas de la encuesta.",
      },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    data: {
      submissionId: submission.id,
      publicToken: submission.public_token,
    },
  });
}
