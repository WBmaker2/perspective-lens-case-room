import type { CaseId, EvidenceCategory, InitialHypothesis, RewriteRuleSet } from './case';

export interface EvidenceSelection {
  sentenceId: string;
  categoryIds: readonly EvidenceCategory[];
  selectedSegmentIds: readonly string[];
}

export interface ComparisonDraft {
  sharedFactOptionIds: readonly string[];
  differentExpressionOptionIds: readonly string[];
  missingInformationOptionIds: readonly string[];
  supportingSentenceIds: readonly string[];
}

export interface RewriteDraft {
  targetNarratorId: string;
  audienceId: RewriteRuleSet['audienceId'];
  purposeId: RewriteRuleSet['purposeId'];
  blockIds: readonly string[];
}

export type StageId = 'intake' | 'lenses' | 'evidence' | 'comparison' | 'rewrite' | 'report';
export type ComparisonPhase = 'initial' | 'reveal' | 'revised';

export interface CaseSession {
  version: 1;
  caseId: CaseId | null;
  stage: StageId;
  comparisonPhase: ComparisonPhase;
  initialHypothesis: InitialHypothesis | null;
  readNarratorIds: readonly string[];
  markedSentenceIds: readonly string[];
  evidenceSelections: Readonly<Record<string, EvidenceSelection>>;
  initialComparison: ComparisonDraft | null;
  revealedRecordIds: readonly string[];
  revisedComparison: ComparisonDraft | null;
  revisionEvidenceSentenceIds: readonly string[];
  rewriteDraft: RewriteDraft | null;
}

export type CaseAction =
  | { type: 'SELECT_CASE'; caseId: CaseId }
  | { type: 'SET_INITIAL_HYPOTHESIS'; hypothesis: InitialHypothesis }
  | { type: 'MARK_LENS_READ'; narratorId: string }
  | { type: 'TOGGLE_IMPORTANT_SENTENCE'; sentenceId: string }
  | { type: 'RECORD_EVIDENCE'; selection: EvidenceSelection }
  | { type: 'SAVE_INITIAL_COMPARISON'; draft: ComparisonDraft }
  | { type: 'REVEAL_RECORDS'; recordIds: readonly string[] }
  | { type: 'SAVE_REVISED_COMPARISON'; draft: ComparisonDraft; revisionEvidenceSentenceIds: readonly string[] }
  | { type: 'SET_REWRITE_DRAFT'; draft: RewriteDraft }
  | { type: 'ADVANCE_STAGE' }
  | { type: 'RESET_CASE' };

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export interface PersistenceResult {
  ok: boolean;
  reason?: 'unavailable' | 'quota' | 'invalid-data';
}
