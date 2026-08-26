import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import type { CasePack } from '../model/case';
import { validateCasePack } from './validateCasePack';

const issue = (pack: Parameters<typeof validateCasePack>[0], code: string) =>
  validateCasePack(pack).some((item) => item.code === code);

describe('validateCasePack', () => {
  it('accepts a fully linked fictional case pack', () => {
    expect(validateCasePack(makeCasePackFixture())).toEqual([]);
  });

  it('reports a sentence whose segments do not reconstruct its text', () => {
    const pack = makeCasePackFixture();
    const sentence = pack.narrators[0].sentences[0]!;
    const brokenSentence = { ...sentence, text: `${sentence.text}불일치` };
    const brokenFirstLens = {
      ...pack.narrators[0],
      sentences: [brokenSentence, ...pack.narrators[0].sentences.slice(1)],
    };
    const broken = { ...pack, narrators: [brokenFirstLens, pack.narrators[1]] as const };
    expect(issue(broken as CasePack, 'sentence-text-mismatch')).toBe(true);
  });

  it('reports duplicate ids and every missing evidence reference', () => {
    const pack = makeCasePackFixture();
    const broken = {
      ...pack,
      comparisonOptions: [
        { ...pack.comparisonOptions[0]!, evidenceSentenceIds: ['not-a-sentence'] },
        { ...pack.comparisonOptions[1]!, id: pack.comparisonOptions[0]!.id },
      ],
    };
    expect(issue(broken as CasePack, 'duplicate-id')).toBe(true);
    expect(issue(broken as CasePack, 'broken-reference')).toBe(true);
  });

  it.each([
    ['missing-category', (pack: ReturnType<typeof makeCasePackFixture>) => ({
      ...pack,
      narrators: pack.narrators.map((narrator) => ({
        ...narrator,
        sentences: narrator.sentences.map((sentence) => ({
          ...sentence,
          segments: sentence.segments.filter((segment) => segment.category !== 'evaluation'),
        })),
      })) as unknown as typeof pack.narrators,
    })],
    ['missing-reveal-record', (pack: ReturnType<typeof makeCasePackFixture>) => ({
      ...pack,
      neutralRecords: pack.neutralRecords.filter((record) => record.visibility !== 'reveal' || record.sequence !== 4),
    })],
    ['insufficient-alternatives', (pack: ReturnType<typeof makeCasePackFixture>) => ({
      ...pack,
      comparisonOptions: [pack.comparisonOptions[0]],
    })],
    ['invalid-date', (pack: ReturnType<typeof makeCasePackFixture>) => ({ ...pack, reviewedOn: '2026-02-31' as const })],
    ['missing-review-note', (pack: ReturnType<typeof makeCasePackFixture>) => ({ ...pack, contentReviewNote: '  ' })],
  ] as const)('reports %s', (code, breakPack) => {
    expect(issue(breakPack(makeCasePackFixture()) as CasePack, code)).toBe(true);
  });

  it('reports a missing expression review note', () => {
    const pack = makeCasePackFixture();
    expect(issue({ ...pack, expressionRevisionNote: '' }, 'missing-review-note')).toBe(true);
  });

  it('reports unsafe verdict fields anywhere in the pack', () => {
    const pack = makeCasePackFixture();
    const unsafe = {
      ...pack,
      comparisonOptions: pack.comparisonOptions.map((option, index) =>
        index === 0 ? { ...option, metadata: { truthScore: 1 } } : option,
      ),
    };
    expect(issue(unsafe as CasePack, 'unsafe-verdict-field')).toBe(true);
  });
});
