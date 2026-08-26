import { describe, expect, it } from 'vitest';
import { clubNoticePoster } from '../content/cases/clubNoticePoster';
import { evaluateRewrite } from './evaluateRewrite';

const rule = clubNoticePoster.rewriteRules[1];
const draft = (blockIds: readonly string[] = rule.acceptedExampleBlockSets[0]!) => ({
  targetNarratorId: rule.targetNarratorId,
  audienceId: rule.audienceId,
  purposeId: rule.purposeId,
  blockIds,
});

describe('evaluateRewrite', () => {
  it.each(rule.acceptedExampleBlockSets.map((blockIds) => [blockIds]))('accepts evidence-backed block set %#', (blockIds) => {
    const result = evaluateRewrite(clubNoticePoster, draft(blockIds));
    expect(result.status).toBe('supported');
    expect(result.missingFactGroupIndexes).toEqual([]);
    expect(result.contradictoryBlockIds).toEqual([]);
  });

  it('reports a missing required fact group separately from perspective fit', () => {
    const result = evaluateRewrite(clubNoticePoster, draft(['cnp-block-date-a']));
    expect(result.status).toBe('partially-supported');
    expect(result.missingFactGroupIndexes).toEqual([1]);
    expect(result.matchedPerspectiveTags).toEqual(['seen']);
  });

  it('revises a contradictory block', () => {
    const pack = { ...clubNoticePoster, rewriteRules: [{ ...rule, contradictoryBlockIds: ['cnp-block-place-a'] }, clubNoticePoster.rewriteRules[0]] as const };
    const result = evaluateRewrite(pack, draft(['cnp-block-date-a', 'cnp-block-place-a']));
    expect(result.status).toBe('revise');
    expect(result.contradictoryBlockIds).toEqual(['cnp-block-place-a']);
  });

  it('revises a block with no allowed perspective tag', () => {
    const pack = { ...clubNoticePoster, rewriteBlocks: [...clubNoticePoster.rewriteBlocks, { id: 'cnp-block-guess', text: '아마 그럴 것이다.', factIds: [], perspectiveTags: ['guess'] }] };
    const result = evaluateRewrite(pack, draft(['cnp-block-date-a', 'cnp-block-guess']));
    expect(result.status).toBe('revise');
    expect(result.matchedPerspectiveTags).toEqual(['seen', 'guess']);
    expect(result.missingFactGroupIndexes).toEqual([1]);
  });

  it('fails closed for unknown target and block, and deduplicates feedback', () => {
    const unknownTarget = evaluateRewrite(clubNoticePoster, { ...draft(), targetNarratorId: 'unknown' });
    expect(unknownTarget.status).toBe('revise');
    expect(unknownTarget.preservedFactIds).toEqual([]);

    const duplicate = evaluateRewrite(clubNoticePoster, draft(['cnp-block-date-a', 'cnp-block-date-a', 'cnp-block-place-a']));
    expect(duplicate.status).toBe('supported');
    expect(duplicate.preservedFactIds).toEqual(['cnp-f-2', 'cnp-f-3', 'cnp-f-4']);
    expect(duplicate.matchedPerspectiveTags).toEqual(['seen']);
  });

  it('does not mutate the draft', () => {
    const value = draft(['cnp-block-place-a', 'cnp-block-date-a']);
    const snapshot = JSON.stringify(value);
    evaluateRewrite(clubNoticePoster, value);
    expect(JSON.stringify(value)).toBe(snapshot);
  });
});
