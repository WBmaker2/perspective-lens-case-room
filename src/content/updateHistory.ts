import type { CasePack } from '../model/case';
import type { UpdateEntry } from '../model/ui';
import { casePacks } from './caseIndex';

export const BASE_UPDATE_ENTRIES: readonly UpdateEntry[] = [
  { date: '2026-08-30', category: '개선', summary: '761–1024px 태블릿에서 학습 도구와 단계가 겹치지 않도록 상단 여백과 두 열 학습 카드 배치를 추가' },
  { date: '2026-08-30', category: '개선', summary: '근거 보드를 두 렌즈 요약·진행 안내·문장 카드·근거 모음으로 재구성해 비교 흐름을 한눈에 확인하도록 개선' },
  { date: '2026-08-29', category: '개선', summary: '학습 단계·사건 선택·다시 쓰기 화면의 현재 행동과 문장 맥락을 더 쉽게 확인하도록 리디자인' },
  { date: '2026-08-28', category: '개선', summary: '375·640px에서 고정 학습 도구와 현재 행동 버튼이 겹치지 않도록 한 줄 배치 안정화' },
  { date: '2026-08-28', category: '개선', summary: '375px 렌즈 문장 가로 배치, 학습자 표현 정리, 보고서 배운 점·다음 행동, 문장 재방문 초점, 파비콘 추가' },
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
