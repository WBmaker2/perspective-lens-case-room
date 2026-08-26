import { describe, expect, it } from 'vitest';
import { playgroundStorageBox } from '../content/cases/playgroundStorageBox';
import { evaluateEvidenceSelection } from './evaluateEvidence';

const sentence = playgroundStorageBox.narrators[0].sentences[1]!;

describe('evaluateEvidenceSelection', () => {
  it('supports a mixed answer only when all required segments are selected', () => {
    const selectedSegmentIds = sentence.segments.map((segment) => segment.id);
    const result = evaluateEvidenceSelection(sentence, {
      sentenceId: sentence.id,
      categoryIds: ['observation', 'inference'],
      selectedSegmentIds,
    });
    expect(result.status).toBe('supported');
    expect(result.sentenceNumber).toBe(2);
    expect(result.missingSegmentIds).toEqual([]);
  });

  it('returns partially-supported for correct mixed categories with a missing segment', () => {
    const result = evaluateEvidenceSelection(sentence, {
      sentenceId: sentence.id,
      categoryIds: ['observation', 'inference'],
      selectedSegmentIds: [sentence.segments[0]!.id],
    });
    expect(result.status).toBe('partially-supported');
    expect(result.missingSegmentIds.length).toBeGreaterThan(0);
  });

  it('asks for revision when the category has no accepted evidence set', () => {
    const result = evaluateEvidenceSelection(sentence, {
      sentenceId: sentence.id,
      categoryIds: ['observation'],
      selectedSegmentIds: [],
    });
    expect(result.status).toBe('revise');
    expect(result.message).toContain('2번 문장');
    expect(result).not.toHaveProperty('score');
  });

  it('compares categories and segments as sets', () => {
    const result = evaluateEvidenceSelection(sentence, {
      sentenceId: sentence.id,
      categoryIds: ['observation', 'inference', 'observation'],
      selectedSegmentIds: [sentence.segments[1]!.id, sentence.segments[0]!.id, sentence.segments[0]!.id],
    });
    expect(result.status).toBe('supported');
  });

  it('revises an unknown segment instead of treating it as a valid selection', () => {
    const result = evaluateEvidenceSelection(sentence, {
      sentenceId: sentence.id,
      categoryIds: ['observation', 'inference'],
      selectedSegmentIds: [...sentence.segments.map((segment) => segment.id), 'not-a-segment'],
    });
    expect(result.status).toBe('revise');
  });

  it('does not mutate the selection arrays', () => {
    const categoryIds = ['observation', 'inference'] as const;
    const selectedSegmentIds = [sentence.segments[1]!.id, sentence.segments[0]!.id] as const;
    const originalCategories = [...categoryIds];
    const originalSegments = [...selectedSegmentIds];
    evaluateEvidenceSelection(sentence, { sentenceId: sentence.id, categoryIds, selectedSegmentIds });
    expect(categoryIds).toEqual(originalCategories);
    expect(selectedSegmentIds).toEqual(originalSegments);
  });
});
