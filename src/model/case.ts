export type CaseId =
  | 'playground-storage-box'
  | 'missing-umbrella-tag'
  | 'club-notice-poster'
  | 'library-window-seat';
export type EvidenceCategory = 'observation' | 'inference' | 'evaluation';
export type SentenceKind = EvidenceCategory | 'mixed';
export type InitialHypothesis = 'seen-information' | 'priority' | 'evaluative-language';

export interface SentenceSegment { id: string; text: string; category: EvidenceCategory; }
export interface NarrativeSentence {
  id: string; number: number; text: string; kind: SentenceKind; segments: readonly SentenceSegment[];
  acceptedCategorySets: readonly (readonly EvidenceCategory[])[];
  feedback: Readonly<Record<'supported' | 'partially-supported' | 'revise', string>>;
}
export interface NarratorLens {
  id: string; displayName: string; roleLabel: string;
  icon: 'clipboard' | 'ball' | 'umbrella' | 'info' | 'poster' | 'reader' | 'window' | 'book';
  borderStyle: 'solid' | 'double'; position: string; interest: string; purpose: string;
  sentences: readonly NarrativeSentence[];
}
export interface NeutralRecord { id: string; sequence: number; text: string; visibility: 'intake' | 'reveal'; factIds: readonly string[]; }
export interface ComparisonOption {
  id: string; label: string; evidenceSentenceIds: readonly string[];
  validFor: readonly ('shared-fact' | 'different-expression' | 'missing-information')[];
}
export interface RewriteBlock { id: string; text: string; factIds: readonly string[]; perspectiveTags: readonly string[]; }
export interface RewriteRuleSet {
  targetNarratorId: string; audienceId: 'classmate' | 'new-reader' | 'teacher';
  purposeId: 'report' | 'guide' | 'reflection'; requiredFactGroups: readonly (readonly string[])[];
  allowedPerspectiveTags: readonly string[]; contradictoryBlockIds: readonly string[];
  acceptedExampleBlockSets: readonly (readonly string[])[];
}
export interface CasePack {
  id: CaseId; title: string; focusQuestion: string;
  focalContrast: 'priority' | 'seen-vs-inferred' | 'familiar-vs-new-reader' | 'comfort-vs-preservation';
  illustrationKey: CaseId; safetyNote: string; originalFiction: true; reviewedOn: `${number}-${number}-${number}`;
  contentReviewNote: string; expressionRevisionNote: string; neutralRecords: readonly NeutralRecord[];
  narrators: readonly [NarratorLens, NarratorLens]; comparisonOptions: readonly ComparisonOption[];
  rewriteBlocks: readonly RewriteBlock[]; rewriteRules: readonly [RewriteRuleSet, RewriteRuleSet];
}
