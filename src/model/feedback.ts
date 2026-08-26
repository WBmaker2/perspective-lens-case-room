import type { EvidenceCategory } from './case';
export type FeedbackStatus = 'supported' | 'partially-supported' | 'revise';
export interface EvidenceFeedback { status: FeedbackStatus; sentenceId: string; sentenceNumber: number; matchedCategoryIds: readonly EvidenceCategory[]; missingSegmentIds: readonly string[]; message: string; }
export interface CaseReportEvidence { sentenceId: string; sentenceNumber: number; status: FeedbackStatus; }
export interface ComparisonFeedback { status: FeedbackStatus; supportingSentenceIds: readonly string[]; sharedFactOptionIds: readonly string[]; differentExpressionOptionIds: readonly string[]; missingInformationOptionIds: readonly string[]; message: string; }
export interface RewriteFeedback { status: FeedbackStatus; preservedFactIds: readonly string[]; missingFactGroupIndexes: readonly number[]; contradictoryBlockIds: readonly string[]; matchedPerspectiveTags: readonly string[]; message: string; }
