import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import { playgroundStorageBox } from '../content/cases/playgroundStorageBox';
import { createInitialSession } from './sessionReducer';
import { clearSession, deleteSavedMemo, loadReadingPreferences, loadSavedMemo, loadSession, READING_PREFERENCES_KEY, saveMemo, saveReadingPreferences, saveSession, SESSION_KEY, SAVED_MEMO_KEY } from './sessionPersistence';
import { DEFAULT_READING_PREFERENCES } from '../model/ui';
import type { StorageAdapter } from '../model/session';

class MemoryStorage implements StorageAdapter {
  data = new Map<string, string>();
  getItem(key: string) { return this.data.get(key) ?? null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
}

describe('session persistence boundaries', () => {
  it('uses separate explicit keys for session and saved memo', () => {
    const storage = new MemoryStorage();
    const session = { ...createInitialSession(), caseId: makeCasePackFixture().id, rewriteDraft: { targetNarratorId: 'n', audienceId: 'classmate' as const, purposeId: 'report' as const, blockIds: ['b'] } };
    expect(saveSession(storage, session)).toEqual({ ok: true });
    expect([...storage.data.keys()]).toEqual([SESSION_KEY]);
    expect(JSON.parse(storage.data.get(SESSION_KEY)!).rewriteFeedback).toBeUndefined();
    expect(saveMemo(storage, 'private note')).toEqual({ ok: true });
    expect(loadSavedMemo(storage)).toBe('private note');
    expect(storage.data.has(SAVED_MEMO_KEY)).toBe(true);
    expect(deleteSavedMemo(storage)).toEqual({ ok: true });
    expect(clearSession(storage)).toEqual({ ok: true });
  });

  it('fails closed for malformed or versioned data', () => {
    const storage = new MemoryStorage();
    storage.data.set(SESSION_KEY, '{bad');
    expect(loadSession(storage)).toEqual(createInitialSession());
    storage.data.set(SESSION_KEY, JSON.stringify({ version: 2 }));
    expect(loadSession(storage)).toEqual(createInitialSession());
  });

  it('converts quota errors to a result', () => {
    const storage: StorageAdapter = { getItem: () => null, removeItem: () => undefined, setItem: () => { throw new DOMException('quota', 'QuotaExceededError'); } };
    expect(saveMemo(storage, 'memo')).toEqual({ ok: false, reason: 'quota' });
  });

  it('rejects mismatched evidence map keys and unknown nested identifiers', () => {
    const storage = new MemoryStorage();
    const base = { ...createInitialSession(), caseId: 'playground-storage-box', evidenceSelections: { wrong: { sentenceId: 'box-sentence-1', categoryIds: ['observation'], selectedSegmentIds: [] } } };
    storage.data.set(SESSION_KEY, JSON.stringify(base));
    expect(loadSession(storage)).toEqual(createInitialSession());
    storage.data.set(SESSION_KEY, JSON.stringify({ ...base, evidenceSelections: { 'box-sentence-1': { sentenceId: 'box-sentence-1', categoryIds: ['observation'], selectedSegmentIds: ['unknown'] } } }));
    expect(loadSession(storage)).toEqual(createInitialSession());
  });

  it('rejects unknown records, options, blocks, and target/rule combinations', () => {
    const storage = new MemoryStorage();
    const base = { ...createInitialSession(), caseId: 'playground-storage-box', revealedRecordIds: ['unknown'] };
    storage.data.set(SESSION_KEY, JSON.stringify(base));
    expect(loadSession(storage)).toEqual(createInitialSession());
    const invalidRewrite = { ...base, revealedRecordIds: [], rewriteDraft: { targetNarratorId: 'narrator-caretaker', audienceId: 'teacher', purposeId: 'reflection', blockIds: ['unknown'] } };
    storage.data.set(SESSION_KEY, JSON.stringify(invalidRewrite));
    expect(loadSession(storage)).toEqual(createInitialSession());
  });

  it('loads a valid completed session with references that remain evaluator-safe', () => {
    const storage = new MemoryStorage();
    const rule = playgroundStorageBox.rewriteRules[0];
    const session = { ...createInitialSession(), caseId: 'playground-storage-box' as const, stage: 'rewrite' as const, rewriteDraft: { targetNarratorId: rule.targetNarratorId, audienceId: rule.audienceId, purposeId: rule.purposeId, blockIds: [...rule.acceptedExampleBlockSets[0]!] } };
    storage.data.set(SESSION_KEY, JSON.stringify(session));
    expect(loadSession(storage).rewriteDraft).toEqual(session.rewriteDraft);
  });

  it('keeps reading preferences in their own local key with exact-shape validation', () => {
    const storage = new MemoryStorage();
    expect(loadReadingPreferences(storage)).toEqual(DEFAULT_READING_PREFERENCES);
    expect(saveReadingPreferences(storage, { fontSize: 22, lineHeight: 2, readingWidth: 'narrow' })).toEqual({ ok: true });
    expect([...storage.data.keys()]).toEqual([READING_PREFERENCES_KEY]);
    expect(loadReadingPreferences(storage)).toEqual({ fontSize: 22, lineHeight: 2, readingWidth: 'narrow' });

    for (const malformed of [
      { fontSize: 20, lineHeight: 1.8, readingWidth: 'standard', extra: true },
      { fontSize: 19, lineHeight: 1.8, readingWidth: 'standard' },
      { fontSize: 20, lineHeight: 1.7, readingWidth: 'standard' },
      { fontSize: 20, lineHeight: 1.8, readingWidth: 'wide' },
      '{bad',
    ]) {
      storage.data.set(READING_PREFERENCES_KEY, JSON.stringify(malformed));
      expect(loadReadingPreferences(storage)).toEqual(DEFAULT_READING_PREFERENCES);
    }
  });

  it('keeps the active preference in memory when preference saving is unavailable', () => {
    const storage: StorageAdapter = { getItem: () => null, removeItem: () => undefined, setItem: () => { throw new Error('blocked'); } };
    expect(saveReadingPreferences(storage, { fontSize: 18, lineHeight: 1.6, readingWidth: 'standard' })).toEqual({ ok: false, reason: 'unavailable' });
    expect(saveReadingPreferences(storage, { fontSize: 17 as 18, lineHeight: 1.6, readingWidth: 'standard' })).toEqual({ ok: false, reason: 'invalid-data' });
  });
});
