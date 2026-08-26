import { evaluateComparison } from './evaluateComparison';
import { evaluateEvidenceSelection } from './evaluateEvidence';
import { evaluateRewrite } from './evaluateRewrite';
import type { CasePack, InitialHypothesis } from '../model/case';
import type { CaseReportEvidence, FeedbackStatus } from '../model/feedback';
import type { CaseSession, ComparisonDraft } from '../model/session';

export interface CaseReportModel {
  evidence: readonly CaseReportEvidence[];
  initialHypothesis: InitialHypothesis;
  initialComparison: ComparisonDraft;
  revisedComparison: ComparisonDraft;
  changedOptionIds: readonly string[];
  revisionEvidenceSentenceIds: readonly string[];
  preservedFactIds: readonly string[];
  perspectiveTags: readonly string[];
  remainingQuestions: readonly string[];
}

/**
 * A session can reach the report route from persisted data even when an old or
 * hand-edited snapshot is missing an earlier answer. This error is deliberately
 * separate from ordinary developer errors so the UI can offer recovery without
 * hiding a real implementation failure.
 */
export class IncompleteCaseReportError extends Error {
  readonly code = 'INCOMPLETE_CASE_REPORT';

  constructor(detail: string) {
    super(`Cannot build case report: complete case session required (${detail}).`);
    this.name = 'IncompleteCaseReportError';
  }
}

export const isIncompleteCaseReportError = (error: unknown): error is IncompleteCaseReportError => (
  error instanceof IncompleteCaseReportError || (
    Boolean(error) && typeof error === 'object' &&
    (error as { name?: unknown }).name === 'IncompleteCaseReportError' &&
    (error as { code?: unknown }).code === 'INCOMPLETE_CASE_REPORT'
  )
);

const hypothesisIds = new Set<InitialHypothesis>(['seen-information', 'priority', 'evaluative-language']);

const cloneComparison = (draft: ComparisonDraft): ComparisonDraft => ({
  sharedFactOptionIds: [...draft.sharedFactOptionIds],
  differentExpressionOptionIds: [...draft.differentExpressionOptionIds],
  missingInformationOptionIds: [...draft.missingInformationOptionIds],
  supportingSentenceIds: [...draft.supportingSentenceIds],
});

const unique = (values: readonly string[]): string[] => [...new Set(values)];

const isStringArray = (value: unknown): value is readonly string[] => (
  Array.isArray(value) && value.every((item) => typeof item === 'string')
);

const isComparisonDraft = (value: unknown): value is ComparisonDraft => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const draft = value as Record<string, unknown>;
  return isStringArray(draft.sharedFactOptionIds) && isStringArray(draft.differentExpressionOptionIds) &&
    isStringArray(draft.missingInformationOptionIds) && isStringArray(draft.supportingSentenceIds);
};

const isEvidenceSelection = (value: unknown): value is CaseSession['evidenceSelections'][string] => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const selection = value as Record<string, unknown>;
  return typeof selection.sentenceId === 'string' && isStringArray(selection.categoryIds) && isStringArray(selection.selectedSegmentIds);
};

const isRewriteDraft = (value: unknown): value is NonNullable<CaseSession['rewriteDraft']> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const draft = value as Record<string, unknown>;
  return typeof draft.targetNarratorId === 'string' && typeof draft.audienceId === 'string' &&
    typeof draft.purposeId === 'string' && isStringArray(draft.blockIds);
};

const allSentences = (pack: CasePack) => pack.narrators.flatMap((narrator) => (
  [...narrator.sentences].sort((left, right) => left.number - right.number)
));

const developerError = (detail: string): IncompleteCaseReportError => new IncompleteCaseReportError(detail);

const validateComparison = (pack: CasePack, draft: ComparisonDraft | null, name: string): ComparisonDraft => {
  if (!isComparisonDraft(draft)) throw developerError(`${name} is missing or malformed`);
  const feedback = evaluateComparison(pack, draft);
  if (feedback.status !== 'supported') throw developerError(`${name} is not supported`);
  return draft;
};

const optionIds = (draft: ComparisonDraft): string[] => unique([
  ...draft.sharedFactOptionIds,
  ...draft.differentExpressionOptionIds,
  ...draft.missingInformationOptionIds,
]);

const symmetricDifferenceInPackOrder = (
  pack: CasePack,
  initial: ComparisonDraft,
  revised: ComparisonDraft,
): string[] => {
  const initialIds = new Set(optionIds(initial));
  const revisedIds = new Set(optionIds(revised));
  return pack.comparisonOptions
    .map((option) => option.id)
    .filter((id) => initialIds.has(id) !== revisedIds.has(id));
};

const hasExactIdSet = (actual: readonly string[], required: readonly string[]): boolean => {
  const actualSet = new Set(actual);
  const requiredSet = new Set(required);
  return actualSet.size === requiredSet.size && [...actualSet].every((id) => requiredSet.has(id));
};

const revealRecordIds = (pack: CasePack): string[] => pack.neutralRecords
  .filter((record) => record.visibility === 'reveal')
  .map((record) => record.id);

export function buildCaseReport(session: CaseSession, pack: CasePack): CaseReportModel {
  if (session.caseId !== pack.id) throw developerError('case does not match the selected pack');
  if (session.stage !== 'report') throw developerError('report stage is not complete');
  if (!session.initialHypothesis || !hypothesisIds.has(session.initialHypothesis)) {
    throw developerError('initial hypothesis is missing');
  }
  if (session.comparisonPhase !== 'revised') throw developerError('revised comparison is missing');

  if (!session.evidenceSelections || typeof session.evidenceSelections !== 'object' || Array.isArray(session.evidenceSelections)) {
    throw developerError('evidence selections are missing or malformed');
  }
  if (!Array.isArray(session.revealedRecordIds) || !Array.isArray(session.revisionEvidenceSentenceIds)) {
    throw developerError('reveal or revision evidence records are missing');
  }

  const sentences = allSentences(pack);
  const sentenceIds = new Set(sentences.map((sentence) => sentence.id));
  const storedEvidenceIds = Object.keys(session.evidenceSelections);
  if (storedEvidenceIds.some((id) => !sentenceIds.has(id))) throw developerError('evidence contains an unknown sentence');
  const evidence = sentences.map<CaseReportEvidence>((sentence) => {
    const selection = session.evidenceSelections[sentence.id];
    if (!isEvidenceSelection(selection)) throw developerError(`evidence for ${sentence.id} is missing or malformed`);
    const feedback = evaluateEvidenceSelection(sentence, selection);
    if (feedback.status !== 'supported') throw developerError(`evidence for ${sentence.id} is not supported`);
    const status: FeedbackStatus = feedback.status;
    return { sentenceId: sentence.id, sentenceNumber: sentence.number, status };
  });

  const initialComparison = validateComparison(pack, session.initialComparison, 'initial comparison');
  const revisedComparison = validateComparison(pack, session.revisedComparison, 'revised comparison');
  const requiredRevealIds = revealRecordIds(pack);
  if (!hasExactIdSet(session.revealedRecordIds, requiredRevealIds)) throw developerError('revealed records are incomplete or invalid');
  if (session.revisionEvidenceSentenceIds.length === 0 || session.revisionEvidenceSentenceIds.some((id) => !sentenceIds.has(id))) {
    throw developerError('revision evidence is missing or invalid');
  }

  if (!isRewriteDraft(session.rewriteDraft)) throw developerError('rewrite draft is missing or malformed');
  const rewriteFeedback = evaluateRewrite(pack, session.rewriteDraft);
  if (rewriteFeedback.status !== 'supported') throw developerError('rewrite draft is not supported');

  const revisedSelectedIds = new Set(optionIds(revisedComparison));
  const remainingQuestions = pack.comparisonOptions
    .filter((option) => option.validFor.includes('missing-information') && !revisedSelectedIds.has(option.id))
    .map((option) => option.label);

  return {
    evidence,
    initialHypothesis: session.initialHypothesis,
    initialComparison: cloneComparison(initialComparison),
    revisedComparison: cloneComparison(revisedComparison),
    changedOptionIds: symmetricDifferenceInPackOrder(pack, initialComparison, revisedComparison),
    revisionEvidenceSentenceIds: [...session.revisionEvidenceSentenceIds],
    preservedFactIds: [...rewriteFeedback.preservedFactIds],
    perspectiveTags: [...rewriteFeedback.matchedPerspectiveTags],
    remainingQuestions,
  };
}
