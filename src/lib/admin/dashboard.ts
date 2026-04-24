import { buildSurveyScoreSummary } from "@/lib/scoring/service";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";
import type { SurveyCategory } from "@/types";

type SubmissionDashboardRow = Pick<
  Database["public"]["Tables"]["submissions"]["Row"],
  "id" | "audience" | "completed_at"
>;
type AnswerDashboardRow = Pick<
  Database["public"]["Tables"]["answers"]["Row"],
  "question_id" | "score" | "submission_id"
>;
type QuestionDashboardRow = Pick<
  Database["public"]["Tables"]["questions"]["Row"],
  "id" | "category_id"
>;

export type AdminDashboardData = {
  totalSubmissions: number;
  menCount: number;
  womenCount: number;
  latestCompletion: string | null;
  scoreSummary: ReturnType<typeof buildSurveyScoreSummary>;
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = createSupabaseAdminClient();

  const [
    { data: submissions, error: submissionsError },
    { data: answers, error: answersError },
    { data: questions, error: questionsError },
  ] = await Promise.all([
    supabase
      .from("submissions")
      .select("id, audience, completed_at")
      .eq("status", "completed")
      .order("completed_at", { ascending: false }),
    supabase.from("answers").select("question_id, score, submission_id"),
    supabase.from("questions").select("id, category_id"),
  ]);

  if (submissionsError || answersError || questionsError) {
    throw new Error("No se pudieron cargar los datos administrativos.");
  }

  const safeSubmissions = (submissions ?? []) as SubmissionDashboardRow[];
  const safeAnswers = (answers ?? []) as AnswerDashboardRow[];
  const safeQuestions = (questions ?? []) as QuestionDashboardRow[];

  const questionMap = new Map(
    safeQuestions.map((question) => [question.id, question.category_id]),
  );

  const scoreSummary = buildSurveyScoreSummary(
    safeAnswers
      .map((answer) => {
        const categoryId = questionMap.get(answer.question_id);

        if (!categoryId) {
          return null;
        }

        return {
          categoryId,
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

  const totalSubmissions = safeSubmissions.length;
  const menCount =
    safeSubmissions.filter((submission) => submission.audience === "man").length;
  const womenCount =
    safeSubmissions.filter((submission) => submission.audience === "woman").length;
  const latestCompletion = safeSubmissions[0]?.completed_at ?? null;

  return {
    totalSubmissions,
    menCount,
    womenCount,
    latestCompletion,
    scoreSummary,
  };
}
