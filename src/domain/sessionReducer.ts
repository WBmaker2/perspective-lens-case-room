import type { CasePack, CaseId } from '../model/case';
import type { CaseAction, CaseSession, ComparisonDraft, EvidenceSelection, RewriteDraft, StageId } from '../model/session';
import { evaluateComparison } from './evaluateComparison';
import { evaluateEvidenceSelection } from './evaluateEvidence';
import { evaluateRewrite } from './evaluateRewrite';

export type CasePackResolver = (caseId: CaseId) => CasePack;
export interface StageGate { ready: boolean; reason: string; }

const STAGES: readonly StageId[] = ['intake', 'lenses', 'evidence', 'comparison', 'rewrite', 'report'];
const cloneEvidence = (value: EvidenceSelection): EvidenceSelection => ({
  sentenceId: value.sentenceId,
  categoryIds: [...value.categoryIds],
  selectedSegmentIds: [...value.selectedSegmentIds],
});
const cloneComparison = (value: ComparisonDraft): ComparisonDraft => ({
  sharedFactOptionIds: [...value.sharedFactOptionIds],
  differentExpressionOptionIds: [...value.differentExpressionOptionIds],
  missingInformationOptionIds: [...value.missingInformationOptionIds],
  supportingSentenceIds: [...value.supportingSentenceIds],
});
const cloneRewrite = (value: RewriteDraft): RewriteDraft => ({ ...value, blockIds: [...value.blockIds] });
const unique = (values: readonly string[]): string[] => [...new Set(values)];
const revealRecordIds = (pack: CasePack): string[] => pack.neutralRecords
  .filter((record) => record.visibility === 'reveal')
  .map((record) => record.id);
const hasExactIdSet = (actual: readonly string[], required: readonly string[]): boolean => {
  const actualSet = new Set(actual);
  const requiredSet = new Set(required);
  return actualSet.size === requiredSet.size && [...actualSet].every((id) => requiredSet.has(id));
};
const normalizeInOrder = (values: readonly string[], order: readonly string[]): string[] => {
  const selected = new Set(values);
  return order.filter((id) => selected.has(id));
};

export function createInitialSession(): CaseSession {
  return {
    version: 1, caseId: null, stage: 'intake', comparisonPhase: 'initial', initialHypothesis: null,
    readNarratorIds: [], markedSentenceIds: [], evidenceSelections: {}, initialComparison: null,
    revealedRecordIds: [], revisedComparison: null, revisionEvidenceSentenceIds: [], rewriteDraft: null,
  };
}

export function getStageGate(session: CaseSession, pack: CasePack): StageGate {
  if (session.caseId !== pack.id) return { ready: false, reason: 'case-not-selected' };
  if (session.stage === 'intake') {
    if (!session.initialHypothesis) return { ready: false, reason: 'initial-hypothesis-required' };
    return { ready: true, reason: 'ready' };
  }
  if (session.stage === 'lenses') {
    if (!session.initialHypothesis) return { ready: false, reason: 'initial-hypothesis-required' };
    const narratorIds = pack.narrators.map((narrator) => narrator.id);
    if (!narratorIds.every((id) => session.readNarratorIds.includes(id))) return { ready: false, reason: 'both-lenses-must-be-read' };
    if (!narratorIds.every((id) => {
      const sentenceIds = pack.narrators.find((narrator) => narrator.id === id)!.sentences.map((sentence) => sentence.id);
      return sentenceIds.some((sentenceId) => session.markedSentenceIds.includes(sentenceId));
    })) return { ready: false, reason: 'important-sentence-required-for-each-lens' };
    return { ready: true, reason: 'ready' };
  }
  if (session.stage === 'evidence') {
    const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
    if (!sentences.every((sentence) => evaluateEvidenceSelection(sentence, session.evidenceSelections[sentence.id] ?? { sentenceId: sentence.id, categoryIds: [], selectedSegmentIds: [] }).status === 'supported')) {
      return { ready: false, reason: 'supported-evidence-required-for-all-sentences' };
    }
    return { ready: true, reason: 'ready' };
  }
  if (session.stage === 'comparison') {
    if (!session.initialComparison) return { ready: false, reason: 'initial-comparison-required' };
    const initial = evaluateComparison(pack, session.initialComparison);
    if (initial.status !== 'supported') return { ready: false, reason: 'supported-initial-comparison-required' };
    if (session.comparisonPhase !== 'revised' || session.revisedComparison === null) return { ready: false, reason: 'revised-comparison-required' };
    if (!hasExactIdSet(session.revealedRecordIds, revealRecordIds(pack))) return { ready: false, reason: 'all-reveal-records-required' };
    if (evaluateComparison(pack, session.revisedComparison).status !== 'supported') return { ready: false, reason: 'supported-revised-comparison-required' };
    if (session.revisionEvidenceSentenceIds.length === 0) return { ready: false, reason: 'revision-evidence-required' };
    return { ready: true, reason: 'ready' };
  }
  if (session.stage === 'rewrite') {
    if (!session.rewriteDraft) return { ready: false, reason: 'rewrite-required' };
    return evaluateRewrite(pack, session.rewriteDraft).status === 'supported'
      ? { ready: true, reason: 'ready' }
      : { ready: false, reason: 'supported-rewrite-required' };
  }
  if (session.stage === 'report') {
    if (!session.rewriteDraft) return { ready: false, reason: 'supported-rewrite-required' };
    return evaluateRewrite(pack, session.rewriteDraft).status === 'supported'
      ? { ready: true, reason: 'ready' }
      : { ready: false, reason: 'supported-rewrite-required' };
  }
  return { ready: false, reason: 'unknown-stage' };
}

export function caseSessionReducer(session: CaseSession, action: CaseAction, resolveCasePack: CasePackResolver): CaseSession {
  switch (action.type) {
    case 'SELECT_CASE': return { ...createInitialSession(), caseId: action.caseId };
    case 'RESET_CASE': return createInitialSession();
    case 'SET_INITIAL_HYPOTHESIS': return { ...session, initialHypothesis: action.hypothesis };
    case 'MARK_LENS_READ': return { ...session, readNarratorIds: unique([...session.readNarratorIds, action.narratorId]) };
    case 'TOGGLE_IMPORTANT_SENTENCE': {
      const marked = session.markedSentenceIds.includes(action.sentenceId)
        ? session.markedSentenceIds.filter((id) => id !== action.sentenceId)
        : [...session.markedSentenceIds, action.sentenceId];
      return { ...session, markedSentenceIds: marked };
    }
    case 'RECORD_EVIDENCE': return { ...session, evidenceSelections: { ...session.evidenceSelections, [action.selection.sentenceId]: cloneEvidence(action.selection) } };
    case 'SAVE_INITIAL_COMPARISON': {
      if (!session.caseId) return session;
      const pack = resolveCasePack(session.caseId);
      if (evaluateComparison(pack, action.draft).status !== 'supported') return session;
      return { ...session, initialComparison: cloneComparison(action.draft), comparisonPhase: 'reveal' };
    }
    case 'REVEAL_RECORDS': {
      if (!session.caseId || !session.initialComparison || session.comparisonPhase !== 'reveal') return session;
      const pack = resolveCasePack(session.caseId);
      if (evaluateComparison(pack, session.initialComparison).status !== 'supported') return session;
      if (!Array.isArray(action.recordIds)) return session;
      const requiredRevealIds = revealRecordIds(pack);
      const ids = unique(action.recordIds);
      if (!hasExactIdSet(ids, requiredRevealIds)) return session;
      return { ...session, revealedRecordIds: normalizeInOrder(ids, requiredRevealIds), comparisonPhase: 'revised' };
    }
    case 'SAVE_REVISED_COMPARISON': {
      if (!session.caseId || !session.initialComparison || session.comparisonPhase !== 'revised' || session.revealedRecordIds.length === 0) return session;
      const pack = resolveCasePack(session.caseId);
      if (!hasExactIdSet(session.revealedRecordIds, revealRecordIds(pack))) return session;
      if (evaluateComparison(pack, session.initialComparison).status !== 'supported' || evaluateComparison(pack, action.draft).status !== 'supported') return session;
      const sentenceIds = new Set(pack.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id)));
      const evidenceIds = unique(action.revisionEvidenceSentenceIds);
      if (evidenceIds.length === 0 || evidenceIds.some((id) => !sentenceIds.has(id))) return session;
      return { ...session, revisedComparison: cloneComparison(action.draft), revisionEvidenceSentenceIds: evidenceIds, comparisonPhase: 'revised' };
    }
    case 'SET_REWRITE_DRAFT': return { ...session, rewriteDraft: cloneRewrite(action.draft) };
    case 'REVISIT_STAGE': {
      const currentIndex = STAGES.indexOf(session.stage);
      const targetIndex = STAGES.indexOf(action.stage);
      if (targetIndex < 1 || targetIndex >= currentIndex) return session;
      return { ...session, stage: action.stage };
    }
    case 'ADVANCE_STAGE': {
      if (!session.caseId) return session;
      const pack = resolveCasePack(session.caseId);
      if (!getStageGate(session, pack).ready) return session;
      const index = STAGES.indexOf(session.stage);
      return index < STAGES.length - 1 ? { ...session, stage: STAGES[index + 1]!, comparisonPhase: session.stage === 'comparison' ? 'revised' : session.comparisonPhase } : session;
    }
  }
}
