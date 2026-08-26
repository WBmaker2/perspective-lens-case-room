import { describe, expect, it } from 'vitest';
import { validateCasePack } from '../domain/validateCasePack';
import { casePacks, getCasePack } from './caseIndex';

describe('caseIndex', () => {
  it('publishes four unique, valid, original-fiction case packs', () => {
    expect(casePacks.map((item) => item.id)).toEqual([
      'playground-storage-box',
      'missing-umbrella-tag',
      'club-notice-poster',
      'library-window-seat',
    ]);
    expect(new Set(casePacks.map((item) => item.id)).size).toBe(4);
    expect(casePacks.every((item) => item.originalFiction)).toBe(true);
    expect(getCasePack('library-window-seat').title).toBe('도서관 창가 자리');
  });

  it('exposes the complete validated library shape', () => {
    expect(casePacks.flatMap((pack) => pack.narrators)).toHaveLength(8);
    expect(casePacks.flatMap((pack) => pack.narrators.flatMap((lens) => lens.sentences))).toHaveLength(40);
    expect(casePacks.flatMap((pack) => validateCasePack(pack))).toEqual([]);
    expect(Object.isFrozen(casePacks)).toBe(true);
  });
});
