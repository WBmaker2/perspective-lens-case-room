import { describe, expect, it } from 'vitest';
import { casePacks } from './caseIndex';
import { createContentReviewEntries, updateHistory } from './updateHistory';

const isoDate = /^\d{4}-\d{2}-\d{2}$/;

describe('update history', () => {
  it('contains the dated design/development entries and eight case review rows', () => {
    expect(updateHistory).toHaveLength(12);
    expect(updateHistory[0]).toMatchObject({
      date: '2026-08-28',
      category: '개선',
      summary: '375px 렌즈 문장 가로 배치, 학습자 표현 정리, 보고서 배운 점·다음 행동, 문장 재방문 초점, 파비콘 추가',
    });
    expect(updateHistory[1]).toMatchObject({ date: '2026-08-27', category: '개선', summary: '375px 모바일, 키보드 전체 흐름, 스크린 리더 구조, 200% 확대, 모션 감소, A4 인쇄 검증 완료' });
    expect(updateHistory[2]).toMatchObject({ date: '2026-08-26', category: '개발', summary: 'MVP 4개 사건, 근거 분류, 교차 조사, 관점 전환, 접근성 기능 추가' });
    expect(updateHistory[3]).toMatchObject({ date: '2026-08-26', category: '설계', summary: '최초 설계 문서 작성' });
    const caseEntries = updateHistory.filter((entry) => 'caseId' in entry);
    expect(caseEntries).toHaveLength(8);
    expect(caseEntries.map((entry) => entry.caseId)).toEqual(casePacks.flatMap((pack) => [pack.id, pack.id]));
    casePacks.forEach((pack) => {
      expect(caseEntries).toContainEqual({ date: pack.reviewedOn, category: '콘텐츠 검수', caseId: pack.id, summary: pack.contentReviewNote });
      expect(caseEntries).toContainEqual({ date: pack.reviewedOn, category: '표현 수정', caseId: pack.id, summary: pack.expressionRevisionNote });
    });
    expect(updateHistory.every((entry) => isoDate.test(entry.date))).toBe(true);
    expect(updateHistory.map((entry) => entry.date)).toEqual([...updateHistory].sort((a, b) => b.date.localeCompare(a.date)).map((entry) => entry.date));
    expect(JSON.stringify(updateHistory)).not.toMatch(/예정|임시|TBD|TODO/);
  });

  it('keeps content-review rows in pack order when dates are equal', () => {
    const rows = createContentReviewEntries(casePacks);
    expect(rows.map((row) => 'caseId' in row ? `${row.caseId}:${row.category}` : row.category)).toEqual([
      'playground-storage-box:콘텐츠 검수', 'playground-storage-box:표현 수정',
      'missing-umbrella-tag:콘텐츠 검수', 'missing-umbrella-tag:표현 수정',
      'club-notice-poster:콘텐츠 검수', 'club-notice-poster:표현 수정',
      'library-window-seat:콘텐츠 검수', 'library-window-seat:표현 수정',
    ]);
  });
});
