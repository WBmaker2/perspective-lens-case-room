import { describe, expect, it } from 'vitest';
import { validateCasePack } from '../../domain/validateCasePack';
import { libraryWindowSeat } from './libraryWindowSeat';

describe('libraryWindowSeat', () => {
  it('keeps comfort and preservation as two evidence-based lenses', () => {
    expect(libraryWindowSeat.id).toBe('library-window-seat');
    expect(libraryWindowSeat.title).toBe('도서관 창가 자리');
    expect(libraryWindowSeat.focalContrast).toBe('comfort-vs-preservation');
    expect(libraryWindowSeat.neutralRecords).toEqual([
      { id: 'lws-r-1', sequence: 1, text: '14:00 창문이 열려 있었다.', visibility: 'intake', factIds: ['lws-f-1'] },
      { id: 'lws-r-2', sequence: 2, text: '14:04 바람에 전시 책장이 들렸다.', visibility: 'reveal', factIds: ['lws-f-2'] },
      { id: 'lws-r-3', sequence: 3, text: '창문 옆에 비 오는 날 책 보호 안내가 있다.', visibility: 'reveal', factIds: ['lws-f-3'] },
      { id: 'lws-r-4', sequence: 4, text: '14:05 하준이 창문을 닫고 이어서 이유를 설명했다.', visibility: 'reveal', factIds: ['lws-f-4'] },
    ]);
    expect(libraryWindowSeat.narrators.flatMap((lens) => lens.sentences)).toHaveLength(10);
    expect(new Set(libraryWindowSeat.narrators.flatMap((lens) => lens.sentences.map((sentence) => sentence.kind)))).toEqual(
      new Set(['observation', 'inference', 'evaluation', 'mixed']),
    );
    expect(libraryWindowSeat.narrators[1]!.sentences[3]!.text).toBe('나는 창문을 닫은 뒤 서윤에게 이유를 설명했다.');
    const comparisonAnswers = libraryWindowSeat.comparisonOptions.filter((option) => option.evidenceSentenceIds.length >= 2);
    expect(comparisonAnswers.length).toBeGreaterThanOrEqual(2);
    expect(comparisonAnswers.every((option) => option.evidenceSentenceIds.every((id) => libraryWindowSeat.narrators.some((lens) => lens.sentences.some((sentence) => sentence.id === id))))).toBe(true);
    expect(validateCasePack(libraryWindowSeat)).toEqual([]);
  });

  it('keeps accepted rewrites tagged and fact-complete', () => {
    const blocks = new Map(libraryWindowSeat.rewriteBlocks.map((block) => [block.id, block]));
    libraryWindowSeat.rewriteRules.forEach((rule) => rule.acceptedExampleBlockSets.forEach((set) => {
      const selected = set.map((id) => blocks.get(id));
      expect(selected.every(Boolean)).toBe(true);
      selected.forEach((block) => expect(block?.perspectiveTags.every((tag) => rule.allowedPerspectiveTags.includes(tag))).toBe(true));
      rule.requiredFactGroups.forEach((group) => expect(group.every((factId) => selected.some((block) => block?.factIds.includes(factId)))).toBe(true));
    }));
  });
});
