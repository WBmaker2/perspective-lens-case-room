# Elementary Web App UX Targeted Review Report

## 결론

이번 회차에는 요청하신 두 기능만 실행했습니다.

1. 단어·문장 표현 검사: 초등 3–6학년 읽기 부담을 기준으로 여섯 표현 이슈를 수정했습니다. `관찰 사실·인물의 추론·평가 표현`, 비교 범주, 추가 사실 기록, 문장 조각, 보고서 회고를 한결 쉬운 말과 짧은 안내로 통일했습니다.
2. 시뮬레이션 검사: 현재 앱에는 값·단위·시간이 변하는 동적 모델이 없으므로 `EDU-SIM-001 = not-needed`로 판정했습니다. 시뮬레이션 기능은 추가하지 않았습니다.

학습 목표, 사건 사실, 판정 함수, reducer 상태, 저장 경계, 라이트 테마, `gi-pulse`, 모션 감소 대체, 키보드·ARIA 구조는 유지했습니다.

## 점검 정보

- 점검일: 2026-08-30 KST
- 실행 모드: `full`
- Stage 0: `ready` — [bootstrap report](./elementary-webapp-ux-bootstrap.md)
- 실행 계획: [targeted implementation plan](./elementary-webapp-ux-targeted-plan.md)
- 언어 장부: [elementary-webapp-ux-language-audit.md](./elementary-webapp-ux-language-audit.md)
- 시뮬레이션 결정: [elementary-webapp-ux-simulation-decision.md](./elementary-webapp-ux-simulation-decision.md)
- 시뮬레이션 검사: [elementary-webapp-ux-simulation-test.md](./elementary-webapp-ux-simulation-test.md)
- 주 페르소나: 서윤(10–12세)
- 읽기 가드레일: 준호(8–10세)
- 브라우저: Codex in-app browser, `http://127.0.0.1:4175/`
- VoiceOver·실제 학생·교실 수용성: 실행하지 않음

## 기준선 → 최종 상태

| 영역 | 기준선 | 최종 상태 | 증거 |
| --- | --- | --- | --- |
| P0 안전·학습 목표 | 0건 | 0건 | 사건·판정·저장 경계 변경 없음 |
| P1 핵심 행동·판정 | 0건 | 0건 | 기존 버튼 enabled/disabled, `gi-pulse`, 판정 결과 유지 |
| P2 표현 부담 | 내부 용어와 긴 안내 6건 | 6건 수정 | [언어 장부](./elementary-webapp-ux-language-audit.md)의 EDU-LANG-001~006 |
| 시뮬레이션 모델 | 동적 모델 없음 | `not-needed`, 새 모델 없음 | [시뮬레이션 결정](./elementary-webapp-ux-simulation-decision.md) |
| 모바일·태블릿 가로 폭 | 기존 반응형 계약 | 375·640·1280px에서 재확인 | in-app browser와 기존 responsive E2E 경로 |

## P0–P3 판정 원장

| 우선순위 | 항목 | 상태 | 근거 |
| --- | --- | --- | --- |
| P0 | 안전·개인정보·학습 목표 변경 | resolved | 가상 사건, 로컬 저장, 외부 전송 없음; 판정 모델 미변경 |
| P1 | 핵심 CTA·판정·접근성 회귀 | resolved | 48개 집중 테스트, 기존 `gi-pulse`·44px·ARIA 계약 유지 |
| P2 | EDU-LANG-001~006 | resolved | 여섯 before/after와 이해 probe를 언어 장부에 기록 |
| P3 | 용어 일관성·문장 길이 | resolved | `learnerLabels.ts` 공통 상수, 보고서 회고 두 문장, 문장 조각 용어 통일 |

## 구현 변경

- `src/content/learnerLabels.ts`: `EvidenceCategoryGuidance`, `ComparisonCategoryGuidance`, 공통 풀이 상수, `문장 조각` fallback.
- `src/components/StageStatus.tsx`: 근거·교차 조사 단계의 다음 행동을 한 문장으로 명확화.
- `src/features/lenses/LensReader.tsx`: `두 사람이 본 단서` 라벨.
- `src/features/evidence/EvidenceBoard.tsx`: 사실·생각·판단 풀이, 혼합 문장 안내, 빈 상태·완료 안내.
- `src/features/comparison/CrossExamination.tsx`: 범주별 짧은 설명, 처음 고른 내용, 사실 기록, 까닭 문장 안내.
- `src/features/comparison/NeutralRecordReveal.tsx`: 사실 기록 accessible name과 상태 안내.
- `src/features/rewrite/PerspectiveRewrite.tsx`: 문장 조각 선택·피드백·완료 안내.
- `src/features/report/CaseReport.tsx`: 지킨 사실·관점 단서·재방문 문구.
- `src/content/reportCopy.ts`: 오늘 배운 점을 두 문장으로 분리.
- `src/content/updateHistory.ts`: 2026-08-30 날짜 기록 추가.
- 단위·컴포넌트 테스트: 새 문구와 기존 판정·포커스·`gi-pulse` 계약을 고정.
- E2E 회귀 셀렉터: 새 접근 가능한 이름에 맞게 갱신하고 `tests/e2e/learner-language-simulation.spec.ts`를 추가.

모든 소스 파일은 500줄 미만이며 새 패키지는 설치하지 않았습니다. 이미지 생성·교체는 텍스트와 시뮬레이션 판정 범위에 교육적 이득이 없어 실행하지 않았습니다.

## 브라우저 증거와 학습자 확인

- 375×812: 잘못된 근거 범주를 선택한 뒤 피드백을 읽고 같은 카드에서 회복 제출했습니다. 새 근거 풀이, `두 사람이 본 단서`, 문장 조각 accessible name을 확인했습니다.
- 640×900: 교차 조사 세 범주 풀이와 사실 기록 안내를 확인했고 문장 조각 작업 공간의 가로 오버플로가 없었습니다.
- 1280×900: 보고서에서 `지킨 사실`, `사용한 관점 단서`, 두 문장 회고를 확인했습니다.
- 세 뷰포트에서 `scrollWidth === clientWidth`였고 콘솔 오류·경고는 0개였습니다.
- 실제 아동 probe는 실행하지 않았습니다. 예상 답변은 [언어 감사 장부](./elementary-webapp-ux-language-audit.md)의 각 행에 적었습니다.

## 시뮬레이션 경계

현재 상태 모델은 `CasePack`, `EvidenceSelection`, `ComparisonDraft`, `RewriteDraft`와 규칙 판정으로 충분합니다. `canvas`, `webgl`, `seed`, `clock`, 연속 변수, pause/step 제어가 없으므로 성능·프레임·수치 안정성 게이트는 N/A입니다. 세부 근거와 재판정 조건은 [결정 문서](./elementary-webapp-ux-simulation-decision.md)에 있습니다.

## 검증 상태

- 실패 테스트 우선: 새 문구를 기대하도록 먼저 수정했고 기존 구현에서 16개 실패를 확인했습니다.
- 최소 구현 후 집중 테스트: `npm test -- --run ...` 결과 11개 파일 / 48개 테스트 PASS.
- 전체 단위 테스트: `npm test` 결과 39개 파일 / 158개 테스트 PASS.
- 타입·린트·파일 크기·빌드·공백 검사: `npm run typecheck`, `npm run lint`, `npm run lint:filesize`, `npm run build`, `git diff --check` 모두 PASS. 모든 소스 파일은 499줄 이하입니다.
- 로컬 Playwright CLI: targeted 명령은 빌드까지 통과했지만 macOS Chromium 실행 파일 부재로 2개 테스트가 `blocked`; 브라우저 설치는 하지 않았습니다.
- in-app browser: 375×812·640×900·1280×900 targeted 흐름 PASS, 오답 회복·문구·가로 폭·콘솔 확인.
- GitHub Actions·커밋·푸시·Pages 배포: 이번 회차 범위가 아니므로 실행하지 않았습니다.

## 기존 공개 경로

이전 릴리스의 공개 확인 주소는 [관점 렌즈 사건실](https://wbmaker2.github.io/perspective-lens-case-room/)입니다. 이번 변경은 아직 커밋·푸시·배포하지 않았으므로 이 URL은 이번 문구 변경의 공개 증거가 아닙니다.

## 수용 게이트

- 최종 P0: 0건
- 최종 미해결 P1: 0건
- 언어 장부: 6건 resolved
- 시뮬레이션: `not-needed` confirmed
- 변경 범위: 단어·문장 표현, 접근 가능한 이름, 보고서 회고, 테스트·증거 문서만 변경
- 미실행: VoiceOver, 실제 학생, 로컬 Playwright 브라우저, 커밋·푸시·배포

## 다음 실행 선택지

1. 사용자가 승인하면 전체 로컬 게이트와 in-app browser 375·640·1280 재검증을 실행합니다.
2. 별도 승인 전에는 시뮬레이션 기능, 음성 기능, 새 이미지, 콘텐츠·판정 모델을 추가하지 않습니다.
3. 이번 회차가 검증으로 충분하다고 판단할 때만 커밋·푸시·Pages 배포를 별도 요청으로 진행합니다.
