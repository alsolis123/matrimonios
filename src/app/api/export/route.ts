import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  isAdminSessionValueValid,
} from "@/lib/admin/session";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type SubmissionExportRow = Pick<
  Database["public"]["Tables"]["submissions"]["Row"],
  "id" | "public_token" | "audience" | "status" | "started_at" | "completed_at"
>;
type AnswerExportRow = Pick<
  Database["public"]["Tables"]["answers"]["Row"],
  "submission_id" | "question_id" | "score" | "created_at"
>;
type QuestionExportRow = Pick<
  Database["public"]["Tables"]["questions"]["Row"],
  "id" | "category_id" | "prompt" | "order_in_survey" | "order_in_category"
>;
type CategoryExportRow = Pick<
  Database["public"]["Tables"]["categories"]["Row"],
  "id" | "title"
>;

function escapeCsvValue(value: string | number | null) {
  if (value === null) {
    return '""';
  }

  const normalized = String(value).replaceAll('"', '""');
  return `"${normalized}"`;
}

export async function GET() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isAdminSessionValueValid(adminSession)) {
    return Response.json(
      {
        ok: false,
        message: "No autorizado para exportar datos administrativos.",
      },
      { status: 401 },
    );
  }

  const supabase = createSupabaseAdminClient();

  const [
    { data: submissions, error: submissionsError },
    { data: answers, error: answersError },
    { data: questions, error: questionsError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("submissions")
      .select("id, public_token, audience, status, started_at, completed_at")
      .order("completed_at", { ascending: false }),
    supabase
      .from("answers")
      .select("submission_id, question_id, score, created_at"),
    supabase
      .from("questions")
      .select("id, category_id, prompt, order_in_survey, order_in_category"),
    supabase.from("categories").select("id, title"),
  ]);

  if (submissionsError || answersError || questionsError || categoriesError) {
    return Response.json(
      {
        ok: false,
        message: "No se pudieron cargar los datos para la exportacion.",
      },
      { status: 500 },
    );
  }

  const safeSubmissions = (submissions ?? []) as SubmissionExportRow[];
  const safeAnswers = (answers ?? []) as AnswerExportRow[];
  const safeQuestions = (questions ?? []) as QuestionExportRow[];
  const safeCategories = (categories ?? []) as CategoryExportRow[];

  const submissionMap = new Map(
    safeSubmissions.map((submission) => [submission.id, submission]),
  );
  const questionMap = new Map(
    safeQuestions.map((question) => [question.id, question]),
  );
  const categoryMap = new Map(
    safeCategories.map((category) => [category.id, category]),
  );

  const header = [
    "submission_id",
    "public_token",
    "audience",
    "status",
    "started_at",
    "completed_at",
    "question_order",
    "category_id",
    "category_title",
    "question_prompt",
    "score",
    "answer_created_at",
  ];

  const rows = safeAnswers
    .map((answer) => {
      const submission = submissionMap.get(answer.submission_id);
      const question = questionMap.get(answer.question_id);

      if (!submission || !question) {
        return null;
      }

      const category = categoryMap.get(question.category_id);

      return [
        submission.id,
        submission.public_token,
        submission.audience,
        submission.status,
        submission.started_at,
        submission.completed_at,
        question.order_in_survey,
        question.category_id,
        category?.title ?? question.category_id,
        question.prompt,
        answer.score,
        answer.created_at,
      ];
    })
    .filter((row): row is Array<string | number> => row !== null)
    .sort((left, right) => {
      const completedAtComparison = String(right[5]).localeCompare(String(left[5]));

      if (completedAtComparison !== 0) {
        return completedAtComparison;
      }

      return Number(left[6]) - Number(right[6]);
    });

  const csv = [header, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");

  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="matrimonios-export.csv"',
    },
  });
}
