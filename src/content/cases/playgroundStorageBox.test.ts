import { describe, expect, it } from 'vitest';
import { validateCasePack } from '../../domain/validateCasePack';
import { playgroundStorageBox } from './playgroundStorageBox';

describe('playgroundStorageBox', () => {
  it('compares speed and care without choosing a truthful winner', () => {
    expect(playgroundStorageBox.id).toBe('playground-storage-box');
    expect(playgroundStorageBox.focalContrast).toBe('priority');
    expect(playgroundStorageBox.narrators.flatMap((lens) => lens.sentences)).toHaveLength(10);
    expect(playgroundStorageBox.comparisonOptions.filter((item) => item.validFor.includes('different-expression')).length).toBeGreaterThanOrEqual(2);
    expect(JSON.stringify(playgroundStorageBox)).not.toMatch(/liar|truthScore|winner/);
    expect(validateCasePack(playgroundStorageBox)).toEqual([]);
  });
});
