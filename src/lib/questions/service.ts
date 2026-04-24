import type { CategoryDefinition, Gender, QuestionDefinition } from "@/types";
import { categories, participantIntroNote, questions } from "./catalog";

export type SurveyDefinition = {
  audience: Gender;
  introNote: string;
  categories: CategoryDefinition[];
  questions: QuestionDefinition[];
};

export function getSurveyDefinition(audience: Gender): SurveyDefinition {
  return {
    audience,
    introNote: participantIntroNote,
    categories,
    questions: questions.filter((question) => question.audience === audience),
  };
}
