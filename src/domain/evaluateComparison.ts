import type { CasePack } from '../model/case';
import type { ComparisonFeedback, FeedbackStatus } from '../model/feedback';
import type { ComparisonDraft } from '../model/session';

type ComparisonCategory = keyof Pick<ComparisonDraft, 'sharedFactOptionIds' | 'differentExpressionOptionIds' | 'missingInformationOptionIds'>;
const CATEGORY_TO_VALID_FOR: Readonly<Record<ComparisonCategory, 'shared-fact' | 'different-expression' | 'missing-information'>> = {
  sharedFactOptionIds: 'shared-fact',
  differentExpressionOptionIds: 'different-expression',
  missingInformationOptionIds: 'missing-information',
};
const CATEGORY_ORDER: readonly ComparisonCategory[] = [
  'sharedFactOptionIds',
  'differentExpressionOptionIds',
  'missingInformationOptionIds',
];
const MESSAGES: Readonly<Record<FeedbackStatus, string>> = {
  supported: '공통 사실·다른 표현·빠진 정보를 근거 문장과 연결했어요.',
  'partially-supported': '비교 항목 일부가 근거와 연결되었어요. 빠진 정보도 더 살펴봐요.',
  revise: '비교 항목의 종류와 근거 문장을 다시 확인해요.',
};

const uniqueInPackOrder = (ids: readonly string[], packOrder: readonly string[]): string[] => {
  const selected = new Set(ids);
  return packOrder.filter((id) => selected.has(id));
};

const feedback = (
  status: FeedbackStatus,
  sharedFactOptionIds: readonly string[],
  differentExpressionOptionIds: readonly string[],
  missingInformationOptionIds: readonly string[],
  supportingSentenceIds: readonly string[],
): ComparisonFeedback => ({
  status,
  supportingSentenceIds,
  sharedFactOptionIds,
  differentExpressionOptionIds,
  missingInformationOptionIds,
  message: MESSAGES[status],
});

export function evaluateComparison(pack: CasePack, draft: ComparisonDraft): ComparisonFeedback {
  const optionsById = new Map(pack.comparisonOptions.map((option) => [option.id, option]));
  const optionIdsByCategory = Object.fromEntries(
    CATEGORY_ORDER.map((category) => [category, uniqueInPackOrder(draft[category], pack.comparisonOptions.map((option) => option.id))]),
  ) as Record<ComparisonCategory, string[]>;
  const selectedOptions = CATEGORY_ORDER.flatMap((category) => optionIdsByCategory[category].map((id) => ({ id, category })));
  const hasUnknownOption = CATEGORY_ORDER.some((category) => draft[category].some((id) => !optionsById.has(id)));
  const wronglyPlaced = selectedOptions.some(({ id, category }) => !optionsById.get(id)!.validFor.includes(CATEGORY_TO_VALID_FOR[category]));

  const sentenceOrder = pack.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id));
  const normalizedSupportingSentenceIds = uniqueInPackOrder(draft.supportingSentenceIds, sentenceOrder);
  const hasUnknownSentence = draft.supportingSentenceIds.some((id) => !sentenceOrder.includes(id));
  const requiredSentenceIds = uniqueInPackOrder(
    selectedOptions.flatMap(({ id }) => optionsById.get(id)!.evidenceSentenceIds),
    sentenceOrder,
  );
  const missingRequiredSentence = requiredSentenceIds.some((id) => !normalizedSupportingSentenceIds.includes(id));
  const hasSelectedOption = selectedOptions.length > 0;

  if (hasUnknownOption || wronglyPlaced || hasUnknownSentence || !hasSelectedOption || missingRequiredSentence) {
    return feedback('revise', optionIdsByCategory.sharedFactOptionIds, optionIdsByCategory.differentExpressionOptionIds, optionIdsByCategory.missingInformationOptionIds, normalizedSupportingSentenceIds);
  }

  const hasEveryCategory = CATEGORY_ORDER.every((category) => optionIdsByCategory[category].length > 0);
  return feedback(
    hasEveryCategory ? 'supported' : 'partially-supported',
    optionIdsByCategory.sharedFactOptionIds,
    optionIdsByCategory.differentExpressionOptionIds,
    optionIdsByCategory.missingInformationOptionIds,
    normalizedSupportingSentenceIds,
  );
}
