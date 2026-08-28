# Task 2 검증 보고서

## 범위

문장 맥락 이름, 읽기/중요 표시 토글 상태, 근거 분류 진행 수, 어린이용 읽기 설정 라벨을 개선했습니다. 기존 문장·서술자·저장 ID와 도메인 판정, 저장 경계는 변경하지 않았습니다. 사전 승인된 P0 레이아웃 계약(`display: block`, `min-width: 0`)도 유지했습니다.

## TDD 기록

1. 다음 테스트 계약을 먼저 추가했습니다.

   `npm test -- src/components/SentenceCard.test.tsx src/features/lenses/LensReader.test.tsx src/features/evidence/EvidenceBoard.test.tsx src/features/settings/ReadingSettings.test.tsx`

2. 첫 실행은 4개 파일에서 5개 테스트가 실패했습니다. `해솔 문장 1`/`가람 문장 1` 맥락 이름, `읽음 취소`, `중요 표시 취소`, `분류 완료 0 / 10`, 어린이용 설정 라벨이 아직 구현되지 않은 것이 확인되었습니다.

3. 최소 구현 후 동일한 집중 테스트와 스타일 계약을 실행했고 통과했습니다.

## 구현 결과

- `SentenceCard`에 선택적 `contextLabel`을 추가하고 group/분류 버튼 이름을 `${contextLabel} 문장 ${number}`로 구성했습니다.
- 중요 표시 버튼은 `중요 문장 표시`/`중요 표시 취소`와 `aria-pressed`가 동기화됩니다.
- `LensReader`는 읽음 상태에 따라 `읽음 표시`/`읽음 취소`를 표시하고 렌즈 이름을 문장 맥락으로 전달합니다.
- `EvidenceBoard`는 `sentenceOwner`로 맥락을 전달하고 `분류 완료 count / total`을 `aria-live="polite"` 상태로 표시합니다. 기존 `10개 문장` 표기는 보조 표기로 남겼습니다.
- `ReadingSettings`는 `작게`·`보통`·`크게`, `촘촘하게`·`넉넉하게`·`아주 넉넉하게`를 먼저 표시하고 정확한 숫자는 보조 표기로 표시합니다. 저장되는 숫자 값은 그대로입니다.
- 네 E2E 파일의 문장/근거 체크박스 로케이터를 학습자용 맥락 이름 및 상태-aware 이름으로 갱신했습니다.

## 검증

- PASS: 집중 Vitest 4개 파일, 9개 테스트
- PASS: `npm run typecheck`
- PASS: `npm run lint`
- PASS: `npm run lint:filesize` — 모든 검사 대상 소스 499줄 이하
- PASS: `git diff --check`
- PASS: `npm run build` (최신 번들로 E2E 실행 전 확인)

### E2E 제한 실행 관찰

`npx playwright test tests/e2e/accessibility.spec.ts tests/e2e/responsive-motion.spec.ts tests/e2e/learner-flow.spec.ts tests/e2e/privacy-print.spec.ts --workers=1`을 90초 상한으로 한 번 실행했습니다. `accessibility.spec.ts`는 통과했습니다. 이후 학습자 흐름은 각 테스트의 30초 제한에 걸렸고, 당시 로그에는 비교 단계의 남아 있던 `이유 문장.*<내부 ID>` 로케이터 대기가 표시되었습니다. 그 로케이터는 이후 `sentenceReference` 기반으로 수정했으며, 상위 실행 지시에 따라 브라우저를 추가 실행하지 않았습니다. 따라서 전체 E2E는 최종 PASS로 주장하지 않습니다.

자동화된 VoiceOver 검증은 범위에서 제외했습니다.
