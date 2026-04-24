import { buildSurveyScoreSummary } from "@/lib/scoring/service";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import type { SurveyCategory } from "@/types";

type SubmissionResultRow = Pick<
  Database["public"]["Tables"]["submissions"]["Row"],
  "id" | "audience" | "completed_at"
>;
type AnswerResultRow = Pick<
  Database["public"]["Tables"]["answers"]["Row"],
  "question_id" | "score"
>;
type QuestionResultRow = Pick<
  Database["public"]["Tables"]["questions"]["Row"],
  "id" | "category_id"
>;

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

  const safeSubmission = submission as SubmissionResultRow;

  const { data: answers } = await supabase
    .from("answers")
    .select("question_id, score")
    .eq("submission_id", safeSubmission.id);

  const safeAnswers = (answers ?? []) as AnswerResultRow[];

  const questionIds = safeAnswers.map((answer) => answer.question_id);

  const { data: questions } = await supabase
    .from("questions")
    .select("id, category_id")
    .in("id", questionIds);

  const safeQuestions = (questions ?? []) as QuestionResultRow[];

  const questionMap = new Map(
    safeQuestions.map((question) => [question.id, question]),
  );

  const summary = buildSurveyScoreSummary(
    safeAnswers
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
      id: safeSubmission.id,
      audience: safeSubmission.audience,
      completedAt: safeSubmission.completed_at,
    },
    summary,
  };
}
