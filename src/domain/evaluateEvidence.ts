import type { NarrativeSentence, EvidenceCategory } from '../model/case';
import type { EvidenceFeedback } from '../model/feedback';
import type { EvidenceSelection } from '../model/session';

const CATEGORY_ORDER: readonly EvidenceCategory[] = ['observation', 'inference', 'evaluation'];
const CATEGORIES = new Set<EvidenceCategory>(CATEGORY_ORDER);

const normalizeCategories = (categories: readonly EvidenceCategory[]): EvidenceCategory[] =>
  CATEGORY_ORDER.filter((category) => categories.includes(category));

const sameSet = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((value, index) => value === right[index]);

const feedbackMessage = (sentence: NarrativeSentence, status: EvidenceFeedback['status']): string =>
  `${sentence.number}번 문장: ${sentence.feedback[status]}`;

const makeFeedback = (
  sentence: NarrativeSentence,
  status: EvidenceFeedback['status'],
  matchedCategoryIds: readonly EvidenceCategory[],
  missingSegmentIds: readonly string[],
): EvidenceFeedback => ({
  status,
  sentenceId: sentence.id,
  sentenceNumber: sentence.number,
  matchedCategoryIds,
  missingSegmentIds,
  message: feedbackMessage(sentence, status),
});

export function evaluateEvidenceSelection(
  sentence: NarrativeSentence,
  selection: EvidenceSelection,
): EvidenceFeedback {
  const knownSegmentIds = new Set(sentence.segments.map((segment) => segment.id));
  const unknownSegmentSelected = selection.selectedSegmentIds.some((id) => !knownSegmentIds.has(id));
  const selectedSegmentIds = [...new Set(selection.selectedSegmentIds)].filter((id) => knownSegmentIds.has(id));
  const selectedCategoryIds = normalizeCategories(selection.categoryIds);
  const hasUnknownCategory = selection.categoryIds.some((category) => !CATEGORIES.has(category));
  const categorySetMatches = sentence.acceptedCategorySets.some((accepted) =>
    sameSet(normalizeCategories(accepted), selectedCategoryIds),
  );

  if (selection.sentenceId !== sentence.id || unknownSegmentSelected || hasUnknownCategory || !categorySetMatches) {
    return makeFeedback(sentence, 'revise', selectedCategoryIds, []);
  }

  const requiredSegmentIds = sentence.kind === 'mixed' ? sentence.segments.map((segment) => segment.id) : [];
  const missingSegmentIds = requiredSegmentIds.filter((id) => !selectedSegmentIds.includes(id));
  if (missingSegmentIds.length > 0) {
    return makeFeedback(sentence, 'partially-supported', selectedCategoryIds, missingSegmentIds);
  }

  return makeFeedback(sentence, 'supported', selectedCategoryIds, []);
}
