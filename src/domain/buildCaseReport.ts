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

const hypothesisIds = new Set<InitialHypothesis>(['seen-information', 'priority', 'evaluative-language']);

const cloneComparison = (draft: ComparisonDraft): ComparisonDraft => ({
  sharedFactOptionIds: [...draft.sharedFactOptionIds],
  differentExpressionOptionIds: [...draft.differentExpressionOptionIds],
  missingInformationOptionIds: [...draft.missingInformationOptionIds],
  supportingSentenceIds: [...draft.supportingSentenceIds],
});

const unique = (values: readonly string[]): string[] => [...new Set(values)];

const allSentences = (pack: CasePack) => pack.narrators.flatMap((narrator) => (
  [...narrator.sentences].sort((left, right) => left.number - right.number)
));

const developerError = (detail: string): Error => (
  new Error(`Cannot build case report: complete case session required (${detail}).`)
);

const evaluateSafely = <T,>(evaluate: () => T, detail: string): T => {
  try {
    return evaluate();
  } catch {
    throw developerError(detail);
  }
};

const validateComparison = (pack: CasePack, draft: ComparisonDraft | null, name: string): ComparisonDraft => {
  if (!draft) throw developerError(`${name} is missing`);
  const feedback = evaluateSafely(() => evaluateComparison(pack, draft), `${name} is invalid`);
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

export function buildCaseReport(session: CaseSession, pack: CasePack): CaseReportModel {
  if (session.caseId !== pack.id) throw developerError('case does not match the selected pack');
  if (session.stage !== 'report') throw developerError('report stage is not complete');
  if (!session.initialHypothesis || !hypothesisIds.has(session.initialHypothesis)) {
    throw developerError('initial hypothesis is missing');
  }
  if (session.comparisonPhase !== 'revised') throw developerError('revised comparison is missing');

  const sentences = allSentences(pack);
  const sentenceIds = new Set(sentences.map((sentence) => sentence.id));
  const storedEvidenceIds = Object.keys(session.evidenceSelections);
  if (storedEvidenceIds.some((id) => !sentenceIds.has(id))) throw developerError('evidence contains an unknown sentence');
  const evidence = sentences.map<CaseReportEvidence>((sentence) => {
    const selection = session.evidenceSelections[sentence.id];
    if (!selection) throw developerError(`evidence is missing for ${sentence.id}`);
    const feedback = evaluateSafely(() => evaluateEvidenceSelection(sentence, selection), `evidence for ${sentence.id} is invalid`);
    if (feedback.status !== 'supported') throw developerError(`evidence for ${sentence.id} is not supported`);
    const status: FeedbackStatus = feedback.status;
    return { sentenceId: sentence.id, sentenceNumber: sentence.number, status };
  });

  const initialComparison = validateComparison(pack, session.initialComparison, 'initial comparison');
  const revisedComparison = validateComparison(pack, session.revisedComparison, 'revised comparison');
  const revealIds = new Set(pack.neutralRecords.filter((record) => record.visibility === 'reveal').map((record) => record.id));
  if (session.revealedRecordIds.some((id) => !revealIds.has(id))) throw developerError('revealed records are invalid');
  if (session.revisionEvidenceSentenceIds.length === 0 || session.revisionEvidenceSentenceIds.some((id) => !sentenceIds.has(id))) {
    throw developerError('revision evidence is missing or invalid');
  }

  if (!session.rewriteDraft) throw developerError('rewrite draft is missing');
  const rewriteFeedback = evaluateSafely(() => evaluateRewrite(pack, session.rewriteDraft!), 'rewrite draft is invalid');
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
