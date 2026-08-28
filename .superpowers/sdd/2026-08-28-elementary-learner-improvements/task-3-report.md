# Task 3 구현 보고서

## 결과

완료했습니다. 보고서에 학습자용 `오늘 배운 점`과 `다음에 해 볼 일`을 추가하고, 보고서의 문장 근거 버튼이 정확한 렌즈 탭과 문장 버튼으로 재진입하도록 연결했습니다. 알 수 없는 문장 ID는 화면에 노출하지 않고 안전하게 소비합니다. 인쇄 보고서의 문장 참조는 계속 비대화형 텍스트입니다.

## TDD 순서

1. `reportCopy`, `buildCaseReport`, `CaseReport`, `LensReader`, `AppShell`의 실패 테스트를 먼저 추가했습니다.
2. 집중 테스트를 실행해 모듈·필드·섹션·문장 포커스가 없는 RED를 확인했습니다.
3. 최소 구현으로 학습 카피/보고서 모델 필드, 보고서 섹션, `onRevisitSentence`, `focusSentenceId`, `onFocusConsumed` 전달과 포커스 effect를 추가했습니다.
4. 집중 테스트와 전체 단위 테스트를 다시 실행했습니다.

## 검증

- `npm test -- src/content/reportCopy.test.ts src/domain/buildCaseReport.test.ts src/features/report/CaseReport.test.tsx src/features/lenses/LensReader.test.tsx src/app/AppShell.test.tsx` — 5 files, 28 tests passed
- `npm test` — 37 files, 143 tests passed
- `npm run typecheck` — passed
- `npm run lint` — passed
- `npm run lint:filesize` — passed; checked source files 499 lines or fewer
- `npm run build` — passed
- `npx playwright test tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts` — 5 tests passed

Playwright에서 네 사건의 전체 키보드 학습 흐름, 보고서 두 새 섹션, 375px 문장 재진입, ARIA/axe 흐름을 확인했습니다. 브라우저 환경 차단은 없었습니다. VoiceOver 구현·호출·검증은 범위에서 제외했습니다.

## 시각 증거

최종 브라우저 단언 통과 후 [375-report.png](../../../docs/qa/evidence/375-report.png)를 갱신했습니다. `sips` 검사 결과 PNG 크기는 `375 × 4832`이며, 두 새 섹션이 줄바꿈되어 읽히고 문서 가로 넘침이 없음을 확인했습니다.
