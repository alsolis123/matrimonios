import { buildSurveyScoreSummary } from "@/lib/scoring/service";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SurveyCategory } from "@/types";

export type SurveyResultData = {
  submission: {
    id: string;
    audience: "man" | "woman";
    completedAt: string;
  };
  summary: ReturnType<typeof buildSurveyScoreSummary>;
};

export async function getSurveyResultByToken(
  token: string,
): Promise<SurveyResultData | null> {
  const supabase = createSupabaseAdminClient();

  const { data: submission } = await supabase
    .from("submissions")
    .select("id, audience, completed_at")
    .eq("public_token", token)
    .maybeSingle();

  if (!submission) {
    return null;
  }

  const { data: answers } = await supabase
    .from("answers")
    .select("question_id, score")
    .eq("submission_id", submission.id);

  const questionIds = answers?.map((answer) => answer.question_id) ?? [];

  const { data: questions } = await supabase
    .from("questions")
    .select("id, category_id")
    .in("id", questionIds);

  const questionMap = new Map(
    (questions ?? []).map((question) => [question.id, question]),
  );

  const summary = buildSurveyScoreSummary(
    (answers ?? [])
      .map((answer) => {
        const question = questionMap.get(answer.question_id);

        if (!question) {
          return null;
        }

        return {
          categoryId: question.category_id as SurveyCategory,
          score: answer.score,
        };
      })
      .filter(
        (
          value,
        ): value is { categoryId: SurveyCategory; score: number } =>
          value !== null,
      ),
  );

  return {
    submission: {
      id: submission.id,
      audience: submission.audience,
      completedAt: submission.completed_at,
    },
    summary,
  };
}
