# Elementary Learner UX Review Report

## 결론

초등 5–6학년 서윤 관점으로 실제 브라우저에서 전체 학습 흐름을 확인하고, 761px 태블릿 경계에서 학습 단계와 고정 도구가 겹치던 P1을 수정했습니다. 320·375·640·761·1280px에서 가로 오버플로가 없고, 761px에서 도구와 단계가 분리되며 사건 카드가 두 열로 읽힙니다.

이번 작업은 코드·문서·로컬 검증까지 완료했지만 커밋·푸시·Pages 배포는 실행하지 않았습니다. 로컬 Playwright CLI는 브라우저 실행 파일이 없어 자동 E2E가 실행되지 않았으므로, 이 보고서는 릴리스 통과가 아닌 `conditional` 판정입니다.

## 점검 정보

- 날짜: 2026-08-30 KST
- 모드: `full`
- Stage 0: `ready` (`work/elementary-webapp-ux-bootstrap.md`)
- 계획: `work/elementary-webapp-ux-plan.md`
- 상세 감사: `work/elementary-webapp-ux-audit.md`
- 주 페르소나: 서윤(10–12세), 보조 페르소나 준호(8–10세)
- 브라우저: Codex in-app browser, `http://localhost:4174/`
- VoiceOver·실제 학생·교실 수용성: 실행하지 않음

## 기준선 → 최종

| 항목 | 기준선 | 최종 |
| --- | --- | --- |
| 761×900 도구·단계 교차 | `true` — 단계명이 도구 버튼에 가려짐 | `false` — 도구 bottom 73.2px, 단계 top 162.4px |
| 761×900 사건 카드 행 | 1행 4열 | 2행 2열 |
| 1280×900 도구·단계 교차 | `true` — 우측 단계가 도구와 겹침 | `false` — 단계 top 107.6px |
| 320·375·640·761·1280 가로 오버플로 | 확인 전 | 모두 `false` |
| 375×812 전체 학습 경로 | 기준선에서 완료 | 동일 경로 재완료, 최종 `사건 보고서`, `gi-pulse` 0개 |
| 브라우저 콘솔 | 확인 전 | 오류·경고 `[]` |

## 개선 사항

### EDU-UX-001 — 태블릿·데스크톱 상단 겹침(P1) 해결

- `src/styles/layout.css`
  - 761px 이상에 `padding-top: 5.75rem`을 예약해 상단 고정 학습 도구와 진행 단계를 분리했습니다.
  - 761–1024px에서는 진행 단계를 한 열로, 사건·첫 생각 카드를 두 열로, 선택 사건 작업 공간을 한 열로 배치했습니다.
- `tests/e2e/accessibility.spec.ts`
  - 761×900 사각형 교차 없음, 카드 2행, 가로 오버플로 없음 회귀 검사를 추가했습니다.
- `src/content/updateHistory.ts`
  - 2026-08-30 개선 날짜와 태블릿 배치 변경을 기록했습니다.
- `src/content/updateHistory.test.ts`, `src/features/updates/UpdateHistoryDialog.test.tsx`
  - 업데이트 행 수와 최신 항목 검사를 16행으로 맞췄습니다.

### EDU-UX-002 — 모바일 고정 도구(P2) 후속

375px 보고서 중간 스크롤에서 도구가 본문 위에 떠 있는 현상은 관찰 항목으로 남겼습니다. 핵심 완료 CTA는 기존 `StageActionButton` 겹침 감지·중앙 스크롤과 하단 예약 공간으로 가려지지 않았으므로, 이번 사이클에는 학습 로직이나 새 음성 기능을 추가하지 않았습니다.

## 설계 요구사항 대조

| 설계 요구사항 | 구현·검증 연결 |
| --- | --- |
| 학습 목표 | `StageStatus`, 여섯 단계 진행, 보고서의 `오늘 배운 점`·`다음에 해 볼 일`을 375px 전체 흐름에서 확인 |
| 기존 앱과의 차별성 | 사건·렌즈·근거·관점 전환의 무점수 학습 흐름과 가상 사건 경계를 유지 |
| 핵심 학습 흐름 | `CaseIntake` → `LensReader` → `EvidenceBoard` → `CrossExamination` → `PerspectiveRewrite` → `CaseReport`를 같은 시나리오로 재실행 |
| 콘텐츠·판정 모델 | `CasePack`, `EvidenceSelection`, `ComparisonDraft`, `RewriteDraft`와 사실·추론·평가 판정을 변경하지 않음 |
| 접근성 | 44px 조작 영역, ARIA 이름·현재 단계·상태 알림, 키보드 단위 테스트, 모달 Escape·포커스 복귀 확인; VoiceOver는 제외 |
| 개인정보·안전 | 가상 사건 문구, session/local storage 경계, 외부 전송·분석·점수 없음 유지 |
| MVP 범위 | 네 사건과 기존 단계만 유지하고 새 의존성·서버·콘텐츠를 추가하지 않음 |
| 완료 기준 | P0 0, 해결되지 않은 P1 0, 동일 경로 재검증, 반응형·가로 오버플로·콘솔 증거 기록 |

## 학습자 언어·편의성 결과

- `사건 선택`, `읽음 표시`, `중요 문장 표시`, `근거 표시하기`처럼 지금 해야 할 행동이 버튼 이름에 직접 나타납니다.
- 자연스러운 오분류에서 `보이는 사실과 생각을 구분해 다시 살펴봐요.`를 보여 주고 같은 카드에서 수정 제출할 수 있었습니다.
- `분류 완료 n / 10`, `비교 항목 3 / 3`, `잘 연결했어요`가 화면과 상태 알림으로 함께 제공됩니다.
- 내부 사건 ID·디버그 용어·점수·승자 표현은 학습 화면에 노출되지 않았습니다.
- 업데이트 내역은 날짜별로 최신 태블릿 개선을 포함합니다.

## 검증 결과

- `npm test`: 39개 파일 / 157개 테스트 PASS
- `npm run typecheck`: PASS
- `npm run lint`: PASS
- `npm run lint:filesize`: 499줄 이하 PASS
- `npm run build`: PASS
- `git diff --check`: PASS
- In-app browser: 전체 learner path PASS, 5개 뷰포트 레이아웃·가로 오버플로·콘솔 PASS
- 자동 Playwright E2E: 로컬 Chromium 실행 파일이 없어 `not run`; 설치는 승인하지 않아 실행하지 않음

## 수용 게이트

- 기준선: `fail` — 761/1280px에서 해결되지 않은 P1 겹침.
- 최종: `conditional` — P0 0, 해결되지 않은 P1 0, 동일 시나리오 재검증 완료. 다만 자동 Playwright/axe 재실행 증거가 없어 릴리스 통과로 보고하지 않으며, EDU-UX-002 P2 후속도 남아 있습니다.
- 잠정 점수: 84/100. 자동 브라우저 증거가 확보되기 전까지 잠정치로만 사용합니다.

## 다음 권장 단계

1. GitHub Actions Ubuntu Chromium에서 새 761px 회귀와 기존 learner/axe 시나리오를 실행해 자동 증거를 확보합니다.
2. 결과가 통과하면 이 작업의 변경 파일만 별도 커밋하고, 그 다음에만 사용자의 별도 승인으로 푸시·Pages 배포를 진행합니다.
3. 모바일 본문 위 고정 도구(P2)는 실제 교실 관찰 전에 고정 위치 변경 여부를 검토합니다.
