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

  it('keeps every accepted rewrite block within the rule tags and fact groups', () => {
    const blocks = new Map(playgroundStorageBox.rewriteBlocks.map((block) => [block.id, block]));

    playgroundStorageBox.rewriteRules.forEach((rule) => {
      rule.acceptedExampleBlockSets.forEach((blockSet) => {
        const selected = blockSet.map((blockId) => blocks.get(blockId));
        expect(selected.every((block) => block !== undefined)).toBe(true);
        selected.forEach((block) => {
          expect(block?.perspectiveTags.every((tag) => rule.allowedPerspectiveTags.includes(tag))).toBe(true);
        });
        rule.requiredFactGroups.forEach((factGroup) => {
          expect(factGroup.every((factId) => selected.some((block) => block?.factIds.includes(factId)))).toBe(true);
        });
      });
    });
  });
});
