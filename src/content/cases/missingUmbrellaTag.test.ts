import { describe, expect, it } from 'vitest';
import { validateCasePack } from '../../domain/validateCasePack';
import { missingUmbrellaTag } from './missingUmbrellaTag';

describe('missingUmbrellaTag', () => {
  it('separates what each narrator saw from what they inferred', () => {
    expect(missingUmbrellaTag.id).toBe('missing-umbrella-tag');
    expect(missingUmbrellaTag.focalContrast).toBe('seen-vs-inferred');
    expect(missingUmbrellaTag.narrators.flatMap((lens) => lens.sentences)).toHaveLength(10);
    expect(missingUmbrellaTag.neutralRecords.filter((record) => record.visibility === 'intake')).toHaveLength(1);
    expect(missingUmbrellaTag.neutralRecords.filter((record) => record.visibility === 'reveal').length).toBeGreaterThanOrEqual(3);
    const categories = missingUmbrellaTag.narrators.flatMap((lens) => lens.sentences.flatMap((sentence) => sentence.segments.map((segment) => segment.category)));
    expect(categories).toContain('observation');
    expect(categories).toContain('inference');
    expect(missingUmbrellaTag.comparisonOptions.filter((option) => option.validFor.includes('missing-information')).length).toBeGreaterThanOrEqual(2);
    expect(JSON.stringify(missingUmbrellaTag)).not.toMatch(/훔쳤다|범인|거짓말|나쁜 학생/);
    expect(missingUmbrellaTag.rewriteRules.every((rule) => rule.acceptedExampleBlockSets.length >= 2)).toBe(true);
    expect(validateCasePack(missingUmbrellaTag)).toEqual([]);
  });

  it('keeps every accepted rewrite block within the rule tags and fact groups', () => {
    const blocks = new Map(missingUmbrellaTag.rewriteBlocks.map((block) => [block.id, block]));

    missingUmbrellaTag.rewriteRules.forEach((rule) => {
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
