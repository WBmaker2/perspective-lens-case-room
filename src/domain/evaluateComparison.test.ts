import { describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { evaluateComparison } from './evaluateComparison';

const option = (category: 'shared-fact' | 'different-expression' | 'missing-information', index = 0) =>
  missingUmbrellaTag.comparisonOptions.filter((item) => item.validFor.includes(category))[index]!;

const draftFor = (shared = option('shared-fact'), difference = option('different-expression'), missing = option('missing-information')) => ({
  sharedFactOptionIds: [shared.id],
  differentExpressionOptionIds: [difference.id],
  missingInformationOptionIds: [missing.id],
  supportingSentenceIds: [...shared.evidenceSentenceIds, ...difference.evidenceSentenceIds, ...missing.evidenceSentenceIds],
});

describe('evaluateComparison', () => {
  it('accepts an evidence-linked shared fact, difference, and blind spot', () => {
    const result = evaluateComparison(missingUmbrellaTag, draftFor());
    expect(result.status).toBe('supported');
    expect(result.supportingSentenceIds.length).toBeGreaterThan(0);
    expect(result).not.toHaveProperty('winner');
  });

  it('accepts a second valid difference route', () => {
    const result = evaluateComparison(missingUmbrellaTag, draftFor(option('shared-fact'), option('different-expression', 0), option('missing-information', 2)));
    expect(result.status).toBe('supported');
  });

  it('returns partially-supported when one comparison category is omitted', () => {
    const shared = option('shared-fact');
    const difference = option('different-expression');
    const result = evaluateComparison(missingUmbrellaTag, {
      sharedFactOptionIds: [shared.id],
      differentExpressionOptionIds: [difference.id],
      missingInformationOptionIds: [],
      supportingSentenceIds: [...shared.evidenceSentenceIds, ...difference.evidenceSentenceIds],
    });
    expect(result.status).toBe('partially-supported');
  });

  it('returns revise when a required evidence sentence is missing', () => {
    const draft = draftFor();
    const result = evaluateComparison(missingUmbrellaTag, {
      ...draft,
      supportingSentenceIds: draft.supportingSentenceIds.slice(1),
    });
    expect(result.status).toBe('revise');
  });

  it('returns revise when an option is placed under the wrong category', () => {
    const shared = option('shared-fact');
    const difference = option('different-expression');
    const missing = option('missing-information');
    const result = evaluateComparison(missingUmbrellaTag, {
      sharedFactOptionIds: [difference.id],
      differentExpressionOptionIds: [shared.id],
      missingInformationOptionIds: [missing.id],
      supportingSentenceIds: [...shared.evidenceSentenceIds, ...difference.evidenceSentenceIds, ...missing.evidenceSentenceIds],
    });
    expect(result.status).toBe('revise');
  });

  it('normalizes duplicate selections and option order without mutating the draft', () => {
    const shared = option('shared-fact');
    const difference = option('different-expression');
    const missing = option('missing-information');
    const draft = {
      sharedFactOptionIds: [shared.id, shared.id],
      differentExpressionOptionIds: [difference.id, difference.id],
      missingInformationOptionIds: [missing.id, missing.id],
      supportingSentenceIds: [...missing.evidenceSentenceIds, ...shared.evidenceSentenceIds, ...difference.evidenceSentenceIds],
    } as const;
    const snapshot = JSON.stringify(draft);
    const result = evaluateComparison(missingUmbrellaTag, draft);
    expect(result.status).toBe('supported');
    expect(result.sharedFactOptionIds).toEqual([shared.id]);
    expect(result.supportingSentenceIds).toEqual(
      missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id))
        .filter((id) => new Set([...shared.evidenceSentenceIds, ...difference.evidenceSentenceIds, ...missing.evidenceSentenceIds]).has(id)),
    );
    expect(JSON.stringify(draft)).toBe(snapshot);
  });
});
