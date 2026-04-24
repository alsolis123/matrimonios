export type Gender = "man" | "woman";

export type SurveyCategory =
  | "communion-with-christ"
  | "love-and-order-in-the-home"
  | "grace-in-the-relationship"
  | "faithfulness-and-testimony";

export type CategoryDefinition = {
  id: SurveyCategory;
  title: string;
  description: string;
  sortOrder: number;
};

export type QuestionSetDefinition = {
  key: Gender;
  title: string;
};

export type QuestionDefinition = {
  audience: Gender;
  categoryId: SurveyCategory;
  orderInSurvey: number;
  orderInCategory: number;
  prompt: string;
};

export type SuggestionDefinition = {
  categoryId: SurveyCategory;
  order: number;
  text: string;
};
