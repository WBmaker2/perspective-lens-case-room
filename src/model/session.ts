import type { EvidenceCategory, RewriteRuleSet } from './case';

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
