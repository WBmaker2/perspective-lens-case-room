import { describe, expect, it } from 'vitest';
import { validateCasePack } from '../../domain/validateCasePack';
import { clubNoticePoster } from './clubNoticePoster';

describe('clubNoticePoster', () => {
  it('keeps author familiarity separate from first-time reader needs', () => {
    expect(clubNoticePoster.id).toBe('club-notice-poster');
    expect(clubNoticePoster.focalContrast).toBe('familiar-vs-new-reader');
    expect(clubNoticePoster.narrators.flatMap((lens) => lens.sentences)).toHaveLength(10);

    const posterVisibleText = clubNoticePoster.neutralRecords
      .filter((record) => record.visibility === 'intake')
      .map((record) => record.text)
      .join(' ');
    expect(posterVisibleText).not.toMatch(/2026년 8월 28일|과학실/);
    expect(clubNoticePoster.neutralRecords.filter((record) => record.visibility === 'intake')).toHaveLength(1);
    expect(clubNoticePoster.neutralRecords.filter((record) => record.visibility === 'reveal').length).toBeGreaterThanOrEqual(3);
    expect(clubNoticePoster.neutralRecords.filter((record) => record.visibility === 'intake').every((record) => !record.factIds.includes('cnp-f-4'))).toBe(true);

    const evaluationText = clubNoticePoster.narrators
      .flatMap((lens) => lens.sentences.flatMap((sentence) => sentence.segments.filter((segment) => segment.category === 'evaluation').map((segment) => segment.text)))
      .join(' ');
    expect(evaluationText).toContain('충분한');
    expect(evaluationText).toContain('알기 어렵다');
    expect(JSON.stringify(clubNoticePoster)).not.toMatch(/잘못한 학생|나쁜 학생|winner|truthScore/);
    const acceptedRewriteTexts = clubNoticePoster.rewriteRules.flatMap((rule) => rule.acceptedExampleBlockSets.map((set) => set.map((id) => clubNoticePoster.rewriteBlocks.find((block) => block.id === id)?.text ?? '').join(' ')));
    expect(acceptedRewriteTexts.every((text) => text.includes('2026년 8월 28일') && text.includes('과학실'))).toBe(true);
    expect(validateCasePack(clubNoticePoster)).toEqual([]);
  });

  it('keeps accepted rewrites tagged and fact-complete without inventing an event', () => {
    const blocks = new Map(clubNoticePoster.rewriteBlocks.map((block) => [block.id, block]));

    clubNoticePoster.rewriteRules.forEach((rule) => {
      rule.acceptedExampleBlockSets.forEach((blockSet) => {
        const selected = blockSet.map((blockId) => blocks.get(blockId));
        expect(selected.every((block) => block !== undefined)).toBe(true);
        selected.forEach((block) => {
          expect(block?.perspectiveTags.every((tag) => rule.allowedPerspectiveTags.includes(tag))).toBe(true);
          expect(block?.text).not.toMatch(/새 동아리|새로운 행사|다음 주|토요일/);
        });
        rule.requiredFactGroups.forEach((factGroup) => {
          expect(factGroup.every((factId) => selected.some((block) => block?.factIds.includes(factId)))).toBe(true);
        });
      });
    });
  });
});
