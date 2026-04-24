import { categories } from "@/lib/questions/catalog";
import { suggestions } from "@/lib/suggestions/catalog";
import type { SurveyCategory } from "@/types";

type AnswerForScoring = {
  categoryId: SurveyCategory;
  score: number;
};

export type CategoryScoreSummary = {
  id: SurveyCategory;
  title: string;
  description: string;
  average: number;
  suggestions: string[];
};

export type SurveyScoreSummary = {
  strongest: CategoryScoreSummary;
  weaknesses: CategoryScoreSummary[];
  categoryScores: CategoryScoreSummary[];
};

type RankedCategoryScoreSummary = CategoryScoreSummary & {
  sortOrder: number;
};

export function buildSurveyScoreSummary(
  answers: AnswerForScoring[],
): SurveyScoreSummary {
  const aggregates = new Map<
    SurveyCategory,
    { total: number; count: number }
  >();

  for (const category of categories) {
    aggregates.set(category.id, { total: 0, count: 0 });
  }

  for (const answer of answers) {
    const current = aggregates.get(answer.categoryId);

    if (!current) {
      continue;
    }

    current.total += answer.score;
    current.count += 1;
  }

  const categoryScores: RankedCategoryScoreSummary[] = categories
    .map((category) => {
      const aggregate = aggregates.get(category.id);
      const average =
        aggregate && aggregate.count > 0 ? aggregate.total / aggregate.count : 0;

      return {
        id: category.id,
        title: category.title,
        description: category.description,
        average,
        suggestions: suggestions
          .filter((suggestion) => suggestion.categoryId === category.id)
          .sort((left, right) => left.order - right.order)
          .map((suggestion) => suggestion.text),
        sortOrder: category.sortOrder,
      };
    })
    .sort((left, right) => left.sortOrder - right.sortOrder);

  const strongest = [...categoryScores].sort((left, right) => {
    if (right.average !== left.average) {
      return right.average - left.average;
    }

    return left.sortOrder - right.sortOrder;
  })[0];

  const weaknesses = [...categoryScores]
    .sort((left, right) => {
      if (left.average !== right.average) {
        return left.average - right.average;
      }

      return left.sortOrder - right.sortOrder;
    })
    .slice(0, 2);

  return {
    strongest,
    weaknesses,
    categoryScores: categoryScores.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      average: category.average,
      suggestions: category.suggestions,
    })),
  };
}
