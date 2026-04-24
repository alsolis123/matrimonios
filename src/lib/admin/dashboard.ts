import { buildSurveyScoreSummary } from "@/lib/scoring/service";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { SurveyCategory } from "@/types";

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

  const questionMap = new Map(
    (questions ?? []).map((question) => [question.id, question.category_id]),
  );

  const scoreSummary = buildSurveyScoreSummary(
    (answers ?? [])
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

  const totalSubmissions = submissions?.length ?? 0;
  const menCount =
    submissions?.filter((submission) => submission.audience === "man").length ?? 0;
  const womenCount =
    submissions?.filter((submission) => submission.audience === "woman").length ?? 0;
  const latestCompletion = submissions?.[0]?.completed_at ?? null;

  return {
    totalSubmissions,
    menCount,
    womenCount,
    latestCompletion,
    scoreSummary,
  };
}
