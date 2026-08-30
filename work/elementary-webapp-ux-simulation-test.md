# Elementary Learner Simulation Check

## 실행 정보

- 점검일: 2026-08-30 KST
- 대상: `EDU-SIM-001`
- 결론: `not-needed`
- 브라우저: Codex in-app browser, 로컬 Vite `http://127.0.0.1:4175/`
- 확인 뷰포트: 375×812, 640×900, 1280×900
- 자동 Playwright CLI: `blocked` — targeted 명령은 빌드까지 통과했지만 `/Users/kimhongnyeon/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell` 실행 파일이 없어 2개 테스트가 시작되지 않았습니다. 브라우저는 설치하지 않았습니다.
- VoiceOver·실제 학생: `not run`

## 실행한 검사

### 런타임 요소 검사

앱 첫 화면과 완료 보고서 DOM에서 다음 요소를 확인했습니다.

| 검사 | 기대값 | 의미 | 상태 |
| --- | --- | --- | --- |
| `canvas` 개수 | `0` | Canvas/WebGL 기반 모델 없음 | confirmed |
| `[role="slider"], input[type="range"]` 개수 | `0` | 연속 수치 변수를 직접 조작하지 않음 | confirmed |
| `[data-simulation], [data-variable], [data-seed], [data-clock]` 개수 | `0` | 시뮬레이션 전용 상태 표식 없음 | confirmed |
| `main`의 `시뮬레이션` 표시 | 없음 | 학습자에게 없는 기능을 있다고 안내하지 않음 | confirmed |

### 현재 이산 학습 루프 검사

1. 375×812에서 문장 카드 하나를 잘못된 범주로 제출했습니다.
2. `FeedbackPanel`의 오답 안내를 읽고 같은 카드에서 범주를 해제·선택해 다시 제출했습니다.
3. 모든 문장을 분류한 뒤 `교차 조사 시작`으로 이동했습니다.
4. 공통 사실·다른 표현·빠진 정보를 체크하고 근거 문장을 연결했습니다.
5. `비교 완료` 뒤 `추가 기록 열기`로 순서가 있는 사실 기록을 확인했습니다.
6. 생각을 바꾼 까닭 문장을 고르고 `수정 비교 완료` 후 문장 조각을 조립했습니다.
7. 보고서에서 근거와 관점 단서를 다시 확인했습니다.

이 순서는 선택 → 규칙 기반 피드백 → 근거 연결 → 추가 사실 공개 → 다시 쓰기라는 학습자 전이입니다. 값·단위·시간을 예측하는 시뮬레이션과는 다른 구조입니다.

## 반응형 확인

- 375×812: 오답 회복, 근거 분류, `사실만 적힌 기록 · 순서대로 열림`, 보고서 회고 확인.
- 640×900: 교차 조사 범주 설명과 문장 조각 작업 공간의 가로 오버플로 없음.
- 1280×900: 보고서의 두 문장 회고와 단서 라벨 확인.
- 모든 확인에서 `document.documentElement.scrollWidth <= document.documentElement.clientWidth`를 확인합니다.

## 제어·성능 범위

pause, step, seed, clock, 단위 변환, Canvas/WebGL 프레임, 물리·수치 안정성 검사는 동적 모델이 없으므로 N/A입니다. 이 항목을 통과했다고 표현하지 않고, “검사 대상이 아님”으로 기록합니다. 기존 `gi-pulse`와 `prefers-reduced-motion`은 일반 CTA 접근성 기능이며 시뮬레이션 재생 제어가 아닙니다.

## 판정

`EDU-SIM-001 = not-needed`. 새 시뮬레이션 코드와 정적 대체 경로는 만들지 않았습니다. 문장 표현 개선은 [언어 감사 장부](./elementary-webapp-ux-language-audit.md)에, 최종 게이트와 테스트 명령은 [타깃 보고서](./elementary-webapp-ux-targeted-report.md)에 기록합니다.
