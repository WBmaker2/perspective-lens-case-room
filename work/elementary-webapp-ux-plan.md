# Elementary Webapp UX Orchestrator Plan

## 목표와 범위

- 모드: `full`
- 대상: 초등학교 5–6학년 서윤(10–12세)을 주 사용자로 삼고, 초등 3–4학년 준호(8–10세)의 읽기 부담도 함께 확인합니다.
- 학습 목표: 같은 사건을 본 위치·관심·목적이 다르게 만들 수 있음을 이해하고, 사실·추론·평가를 근거와 연결한 뒤 관점을 바꾸어 다시 씁니다.
- 보존할 계약: 네 가지 가상 사건, 점수·승자 없는 판정, 세션은 `sessionStorage`, 저장 메모·읽기 설정은 `localStorage`, 외부 서버·분석·개인 식별 정보 없음.
- 참고 설계: `PRODUCT.md`, `design-system/MASTER.md`, `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-audit.md`.
- 이 작업은 기존 리디자인의 재점검입니다. 콘텐츠 모델과 판정 로직을 바꾸지 않고, 새로 확인한 반응형·조작 공간 문제만 수정합니다.

## 사전 준비 결과

- Stage 0 보고서: `work/elementary-webapp-ux-bootstrap.md`
- 상태: `ready`
- 확인된 런타임: `elementary-webapp-ux-orchestrator`, `browser:control-in-app-browser`, `playwright`, `impeccable`, `redesign-existing-projects`, `education-webapp-redesign`, `imagegen`, `frontend-skill`.
- 디자인 시스템 검색 도구는 파일 시스템에 존재하지만 이번 런타임에서는 `filesystem-only`로 표시되었습니다. 기준은 기존 `design-system/MASTER.md`와 실제 브라우저 결과로 고정합니다.
- 의존성 설치, 패키지 추가, Git 작업, 배포는 이 계획의 범위가 아닙니다.

## 기준선 학습자 패널과 뷰포트

실제 학생 연구가 아닌 관찰 패널입니다. 결과를 학생 승인으로 표현하지 않습니다.

- 320×800: 첫 화면, 사건 선택 전 빈 상태, 고정 학습 도구가 읽기 영역을 가리지 않는지 확인.
- 375×812: 필수 전체 흐름(사건 접수 → 렌즈 A/B → 근거 보드 → 교차 조사 → 추가 기록 → 수정 비교 → 관점 전환 → 사건 보고서), 자연스러운 오분류 후 피드백 회복, 업데이트 내역·Escape 포커스 복귀 확인.
- 640×900: 두 열 모바일 카드와 세로 고정 도구 확인.
- 761×900: 데스크톱 분기 직후의 태블릿 경계 확인. 기준선에서 `학습 도구`가 `학습 단계`와 겹쳐 단계명이 읽히지 않는 P1 문제를 재현했습니다.
- 1280×900: 데스크톱 헤더·진행 단계·도구 영역, 보고서 CTA 확인.
- 브라우저 콘솔: 오류·경고 0건.
- VoiceOver, 실제 학생, 교실 수업 승인은 범위에서 제외합니다. 키보드·ARIA·스크린 리더용 DOM 구조는 자동화로 확인합니다.

## 기준선 이슈 원장

### EDU-UX-001 — 태블릿 경계에서 학습 단계와 도구가 겹침

- 심각도: P1(핵심 학습 단계의 의미를 읽기 어렵게 만드는 주요 오해 가능성)
- 증거: 761×900 실제 브라우저에서 `.utility-group`은 `top:16px–73px`, `.progress`는 `top:22px–124px`로 겹쳤고, 스크린샷에서 `읽기 설정·업데이트 내역·교사용 활동 요약`이 `렌즈 A/B·근거 보드·교차 조사` 텍스트를 덮었습니다.
- 학습자 영향: 준호는 현재 단계와 도구를 구분하지 못하고, 서윤은 다음 활동의 위치를 잃을 수 있습니다. 가로 스크롤은 없지만 핵심 안내가 가려집니다.
- 원인: `src/styles/layout.css`의 `@media (min-width: 761px)`가 761px부터 데스크톱 4열 카드와 고정 상단 도구를 동시에 적용하고, 상단 도구를 위한 세로·가로 예약 공간이 없습니다.
- 제안: 761–1024px 전용 규칙으로 앱 상단에 고정 도구 예약 여백을 만들고, 진행 단계를 한 줄 아래로 이동하며, 사건·첫 생각 그리드를 두 열로 줄입니다. 1280px 레이아웃은 현재 시각 체계를 유지합니다.
- 검증: `tests/e2e/accessibility.spec.ts`에서 761×900으로 진행 단계와 도구의 사각형 교차가 없고, 사건 카드가 두 열이며, 가로 오버플로가 없는지 검사합니다. 동일 흐름을 375×812와 1280×900에서 다시 확인합니다.

### EDU-UX-002 — 모바일 고정 도구가 스크롤 중 내용 위에 떠 있음

- 심각도: P2(반복되는 시각적 마찰)
- 증거: 375×812 보고서 중간 스크롤에서 하단 `.utility-group`이 보고서 문장과 겹쳐 보였습니다. 보고서 마지막의 `다른 사건 접수` 버튼은 예약 여백으로 가려지지 않았습니다.
- 학습자 영향: 읽는 중인 문장 일부가 가려져 잠시 스크롤을 멈춰야 합니다.
- 원인: 모바일 고정 도구는 항상 하단에 있으며, 본문에는 넉넉한 하단 패딩만 있고 현재 읽는 위치와 겹침을 피하는 규칙은 없습니다.
- 처리 방침: 핵심 CTA 가림은 `StageActionButton`의 기존 자동 중앙 스크롤로 이미 막고 있으므로 이번 코드 변경에서는 P1 문제 해결에 집중합니다. P2는 브라우저 증거와 함께 후속 관찰 항목으로 남기고, 새로운 고정 위치나 음성 기능을 추가하지 않습니다.

## 아키텍처·기술 스택

- React 19 + Vite 8 + TypeScript 6 strict.
- 단계 렌더링: `src/app/AppShell.tsx` → `src/app/StageRenderer.tsx` → 단계별 feature 컴포넌트.
- 스타일: `src/styles/tokens.css`, `base.css`, `layout.css`, `components.css`, `motion.css`, `print.css`.
- 테스트: Vitest 4 + Testing Library, Playwright 1.62 + axe.
- 변경하지 않을 타입·인터페이스: `CasePack`, `CaseSession`, `StageId`, `StageActionButtonProps`, `EvidenceSelection`, `ComparisonDraft`, `RewriteDraft`.

## 전역 제약과 합격 조건

- 한 소스 파일은 500줄 미만으로 유지합니다.
- 교육용 핵심 현재 행동 버튼에는 기존 `gi-pulse`를 유지하고, `prefers-reduced-motion: reduce`에서는 정적 teal outline으로 대체합니다.
- 학습 도구의 `업데이트 내역` 버튼과 날짜 기록을 유지합니다.
- 라이트 모드, 44px 이상 조작 영역, 키보드 순서, `aria-current`, `aria-live`, 모달 Escape·포커스 복귀를 훼손하지 않습니다.
- 개인정보·서버·분석·점수·승자·정답률을 추가하지 않습니다.
- 브라우저 검증은 320×800, 375×812, 640×900, 761×900, 1280×900으로 실행합니다. VoiceOver 및 실제 학생 검증은 실행하지 않습니다.
- 합격: P0/P1 0건, 모든 필수 뷰포트에서 가로 오버플로 0, 761×900에서 도구·단계 사각형 교차 0, 기존 단위·E2E·axe·빌드 게이트 통과.

## 예상 파일 구조와 책임

- `src/styles/layout.css`: 앱 셸 상단 예약 공간, 태블릿 전용 그리드·진행 단계 배치.
- `tests/e2e/accessibility.spec.ts`: 761px 회귀 시나리오와 사각형 교차·오버플로·카드 열 수 검증.
- `work/elementary-webapp-ux-plan.md`: 이번 점검의 목표·이슈·실행 순서.
- `work/elementary-webapp-ux-audit.md`: 기준선과 최종 관찰 증거.
- `work/elementary-webapp-ux-report.md`: 학습자 관점 요약, 변경 목록, 게이트 판정.
- `src/content/updateHistory.ts`: 실제 소스 변경이 있을 때 2026-08-30 개선 기록 추가.

## 작업 순서(TDD)

### 1. EDU-UX-001 회귀 테스트를 먼저 실패시키기

- Files: `tests/e2e/accessibility.spec.ts`.
- Interface/selector: `.utility-group`, `.progress`, `.case-picker__list`, `assertNoHorizontalOverflow(page)`.
- 체크박스:
  - [x] 761×900 회귀 테스트를 `tests/e2e/accessibility.spec.ts`에 추가했습니다.
  - [x] `page.goto('/')` 후 저장소를 초기화하고 다시 로드하는 테스트 절차를 기록했습니다.
  - [x] `utilityBox`와 `progressBox`의 사각형 교차 검사를 추가했습니다.
  - [x] `.case-picker__list`의 두 열 행 수 검사를 추가했습니다.
  - [x] 가로 오버플로 검사를 추가했습니다.
- 기준선에서 사각형 교차와 4열 계산값이 실제로 재현되었습니다.

### 2. 최소 CSS 구현

- Files: `src/styles/layout.css`.
- 변경 인터페이스: 기존 CSS 클래스만 사용하며 React/도메인 타입은 변경하지 않습니다.
- 체크박스:
  - [x] `@media (min-width: 761px) and (max-width: 1024px)`를 추가했습니다.
  - [x] 761px 이상 `.app-shell`에 상단 도구 높이를 피하는 `padding-top`을 지정했습니다.
  - [x] `.app-shell__topbar`를 태블릿에서 한 열로 배치했습니다.
  - [x] 사건·첫 생각 그리드를 두 열, 선택 사건 작업 공간을 한 열로 지정했습니다.
  - [x] 1280px 데스크톱, 모바일 하단 도구, `gi-pulse`, reduced-motion 규칙을 보존했습니다.
- 761×900에서 도구와 단계가 교차하지 않고 카드가 2행으로 배치되었습니다.

### 3. 테스트 통과 및 동일 흐름 재검증

- Files: `tests/e2e/accessibility.spec.ts`, `src/components/*.test.tsx`, `src/features/**/*.test.tsx`.
- 체크박스:
  - [ ] 로컬 Playwright CLI 회귀 E2E는 브라우저 실행 파일 부재로 실행하지 못했습니다.
  - [x] in-app browser에서 375×812 핵심 흐름과 오분류→피드백→수정을 재실행했습니다.
  - [x] 모달 Escape·포커스 복귀와 업데이트 내역 날짜를 확인했습니다.
  - [x] 가로 오버플로 0과 최종 `.gi-pulse` 0개를 확인했습니다. 현재 사이클의 axe 실행은 `not run`입니다.
  - [x] `prefers-reduced-motion` 정적 대체를 `src/styles/motion.css`와 기존 테스트로 확인했습니다.

### 4. 문서화·자체 검토

- Files: `work/elementary-webapp-ux-audit.md`, `work/elementary-webapp-ux-report.md`, 필요 시 `src/content/updateHistory.ts`와 해당 테스트.
- 체크박스:
  - [x] 기준선과 최종 사각형 측정값, 뷰포트, 콘솔 결과를 `work/elementary-webapp-ux-audit.md`에 기록했습니다.
  - [x] EDU-UX-001은 `resolved`, EDU-UX-002는 `observed-follow-up`으로 명시했습니다.
  - [x] 설계 목표·학습 흐름·콘텐츠/판정·접근성·개인정보/안전·MVP·완료 기준 대조표를 보고서에 포함했습니다.
  - [x] 미완성·자리표시자 문구 검색 결과가 0임을 확인했습니다.
  - [x] 타입·명명·파일 길이·`git diff --check`를 확인했습니다.

## 향후 실행할 명령과 예상 결과(지금 실행하지 않음)

```sh
npm test
# 35개 안팎의 테스트 파일, 기존 133개 이상 테스트와 새 회귀 테스트 PASS

npm run typecheck
# tsc -b 성공, 타입 오류 0

npm run lint
# ESLint 오류 0

npm run lint:filesize
# 500줄 이상 소스 파일 0

npm run build
# dist 생성 성공

npm run test:e2e
# 기존 10개 이상 learner/a11y 시나리오와 761px 회귀 PASS

git diff --check
# 공백 오류 0
```

## 향후 커밋 단계(지금 실행하지 않음)

1. `test: add tablet utility overlap regression` — 실패하는 761px 회귀 테스트만 기록합니다.
2. `fix: reserve tablet utility space` — 최소 CSS와 통과 증거를 포함합니다.
3. `docs: record elementary learner UX audit` — 감사 원장·보고서·업데이트 날짜를 포함합니다.

커밋·푸시·Pages 배포·HVC 등록은 이번 점검 요청의 승인 범위가 아니므로 실행하지 않습니다.
