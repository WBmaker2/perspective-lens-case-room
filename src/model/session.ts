import type { EvidenceCategory } from './case';

export interface EvidenceSelection {
  sentenceId: string;
  categoryIds: readonly EvidenceCategory[];
  selectedSegmentIds: readonly string[];
}
