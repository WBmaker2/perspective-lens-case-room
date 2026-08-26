import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import { createInitialSession } from './sessionReducer';
import { clearSession, deleteSavedMemo, loadSavedMemo, loadSession, saveMemo, saveSession, SESSION_KEY, SAVED_MEMO_KEY } from './sessionPersistence';
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
});
