import type { CasePack } from '../model/case';
import type { UpdateEntry } from '../model/ui';
import { casePacks } from './caseIndex';

export const BASE_UPDATE_ENTRIES: readonly UpdateEntry[] = [
  { date: '2026-08-27', category: '개선', summary: '375px 모바일, 키보드 전체 흐름, 스크린 리더 구조, 200% 확대, 모션 감소, A4 인쇄 검증 완료' },
  { date: '2026-08-26', category: '개발', summary: 'MVP 4개 사건, 근거 분류, 교차 조사, 관점 전환, 접근성 기능 추가' },
  { date: '2026-08-26', category: '설계', summary: '최초 설계 문서 작성' },
];

export function createContentReviewEntries(packs: readonly CasePack[]): readonly UpdateEntry[] {
  return packs.flatMap((pack): UpdateEntry[] => [
    { date: pack.reviewedOn, category: '콘텐츠 검수', caseId: pack.id, summary: pack.contentReviewNote },
    { date: pack.reviewedOn, category: '표현 수정', caseId: pack.id, summary: pack.expressionRevisionNote },
  ]);
}

export function createUpdateHistory(packs: readonly CasePack[] = casePacks): readonly UpdateEntry[] {
  const entries = [...BASE_UPDATE_ENTRIES, ...createContentReviewEntries(packs)];
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((left, right) => right.entry.date.localeCompare(left.entry.date) || left.index - right.index)
    .map(({ entry }) => entry);
}

export const updateHistory: readonly UpdateEntry[] = createUpdateHistory();
