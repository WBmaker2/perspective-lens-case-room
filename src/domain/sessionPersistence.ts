import type { CaseId, InitialHypothesis } from '../model/case';
import type { CaseSession, ComparisonDraft, EvidenceSelection, RewriteDraft, StorageAdapter, PersistenceResult } from '../model/session';
import { createInitialSession } from './sessionReducer';

export const SESSION_KEY = 'perspective-lens:session:v1';
export const SAVED_MEMO_KEY = 'perspective-lens:saved-memo:v1';

const caseIds = new Set<CaseId>(['playground-storage-box', 'missing-umbrella-tag', 'club-notice-poster', 'library-window-seat']);
const stages = new Set(['intake', 'lenses', 'evidence', 'comparison', 'rewrite', 'report']);
const phases = new Set(['initial', 'reveal', 'revised']);
const hypotheses = new Set<InitialHypothesis>(['seen-information', 'priority', 'evaluative-language']);
const categories = new Set(['observation', 'inference', 'evaluation']);
const audiences = new Set(['classmate', 'new-reader', 'teacher']);
const purposes = new Set(['report', 'guide', 'reflection']);
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string');
const identifiers = (value: unknown): value is string[] => isStringArray(value) && value.every((item) => item.trim().length > 0);
const exactKeys = (value: Record<string, unknown>, keys: readonly string[]): boolean => Object.keys(value).length === keys.length && keys.every((key) => Object.prototype.hasOwnProperty.call(value, key));
const draft = (value: unknown): value is ComparisonDraft => isObject(value) && exactKeys(value, ['sharedFactOptionIds', 'differentExpressionOptionIds', 'missingInformationOptionIds', 'supportingSentenceIds']) && identifiers(value.sharedFactOptionIds) && identifiers(value.differentExpressionOptionIds) && identifiers(value.missingInformationOptionIds) && identifiers(value.supportingSentenceIds);
const rewrite = (value: unknown): value is RewriteDraft => isObject(value) && exactKeys(value, ['targetNarratorId', 'audienceId', 'purposeId', 'blockIds']) && typeof value.targetNarratorId === 'string' && value.targetNarratorId.trim().length > 0 && typeof value.audienceId === 'string' && audiences.has(value.audienceId) && typeof value.purposeId === 'string' && purposes.has(value.purposeId) && identifiers(value.blockIds);
const evidence = (value: unknown): value is EvidenceSelection => isObject(value) && exactKeys(value, ['sentenceId', 'categoryIds', 'selectedSegmentIds']) && typeof value.sentenceId === 'string' && value.sentenceId.trim().length > 0 && isStringArray(value.categoryIds) && value.categoryIds.every((id) => categories.has(id)) && identifiers(value.selectedSegmentIds);

const validSession = (value: unknown): value is CaseSession => {
  if (!isObject(value) || value.version !== 1 || (value.caseId !== null && (!caseIds.has(value.caseId as CaseId))) || typeof value.stage !== 'string' || !stages.has(value.stage) || typeof value.comparisonPhase !== 'string' || !phases.has(value.comparisonPhase)) return false;
  if (value.initialHypothesis !== null && (typeof value.initialHypothesis !== 'string' || !hypotheses.has(value.initialHypothesis as InitialHypothesis))) return false;
  if (!identifiers(value.readNarratorIds) || !identifiers(value.markedSentenceIds) || !identifiers(value.revealedRecordIds) || !identifiers(value.revisionEvidenceSentenceIds)) return false;
  if (!isObject(value.evidenceSelections) || !Object.values(value.evidenceSelections).every(evidence)) return false;
  if (value.initialComparison !== null && !draft(value.initialComparison)) return false;
  if (value.revisedComparison !== null && !draft(value.revisedComparison)) return false;
  if (value.rewriteDraft !== null && !rewrite(value.rewriteDraft)) return false;
  const allowed = ['version', 'caseId', 'stage', 'comparisonPhase', 'initialHypothesis', 'readNarratorIds', 'markedSentenceIds', 'evidenceSelections', 'initialComparison', 'revealedRecordIds', 'revisedComparison', 'revisionEvidenceSentenceIds', 'rewriteDraft'];
  return Object.keys(value).every((key) => allowed.includes(key));
};

const classify = (error: unknown): PersistenceResult => {
  const text = error instanceof Error ? `${error.name} ${error.message}`.toLowerCase() : String(error).toLowerCase();
  return { ok: false, reason: text.includes('quota') || text.includes('space') ? 'quota' : 'unavailable' };
};

export function loadSession(storage: StorageAdapter): CaseSession {
  try {
    const raw = storage.getItem(SESSION_KEY);
    if (!raw) return createInitialSession();
    const parsed: unknown = JSON.parse(raw);
    return validSession(parsed) ? parsed : createInitialSession();
  } catch {
    return createInitialSession();
  }
}

export function saveSession(storage: StorageAdapter, session: CaseSession): PersistenceResult {
  try {
    const clean: CaseSession = {
      version: 1, caseId: session.caseId, stage: session.stage, comparisonPhase: session.comparisonPhase,
      initialHypothesis: session.initialHypothesis, readNarratorIds: [...session.readNarratorIds], markedSentenceIds: [...session.markedSentenceIds],
      evidenceSelections: Object.fromEntries(Object.entries(session.evidenceSelections).map(([id, value]) => [id, { sentenceId: value.sentenceId, categoryIds: [...value.categoryIds], selectedSegmentIds: [...value.selectedSegmentIds] }])),
      initialComparison: session.initialComparison ? { ...session.initialComparison, sharedFactOptionIds: [...session.initialComparison.sharedFactOptionIds], differentExpressionOptionIds: [...session.initialComparison.differentExpressionOptionIds], missingInformationOptionIds: [...session.initialComparison.missingInformationOptionIds], supportingSentenceIds: [...session.initialComparison.supportingSentenceIds] } : null,
      revealedRecordIds: [...session.revealedRecordIds], revisedComparison: session.revisedComparison ? { ...session.revisedComparison, sharedFactOptionIds: [...session.revisedComparison.sharedFactOptionIds], differentExpressionOptionIds: [...session.revisedComparison.differentExpressionOptionIds], missingInformationOptionIds: [...session.revisedComparison.missingInformationOptionIds], supportingSentenceIds: [...session.revisedComparison.supportingSentenceIds] } : null,
      revisionEvidenceSentenceIds: [...session.revisionEvidenceSentenceIds], rewriteDraft: session.rewriteDraft ? { ...session.rewriteDraft, blockIds: [...session.rewriteDraft.blockIds] } : null,
    };
    storage.setItem(SESSION_KEY, JSON.stringify(clean));
    return { ok: true };
  } catch (error) { return classify(error); }
}

export function clearSession(storage: StorageAdapter): PersistenceResult {
  try { storage.removeItem(SESSION_KEY); return { ok: true }; } catch (error) { return classify(error); }
}
export function loadSavedMemo(storage: StorageAdapter): string | null {
  try { return storage.getItem(SAVED_MEMO_KEY); } catch { return null; }
}
export function saveMemo(storage: StorageAdapter, memo: string): PersistenceResult {
  try { storage.setItem(SAVED_MEMO_KEY, memo); return { ok: true }; } catch (error) { return classify(error); }
}
export function deleteSavedMemo(storage: StorageAdapter): PersistenceResult {
  try { storage.removeItem(SAVED_MEMO_KEY); return { ok: true }; } catch (error) { return classify(error); }
}
