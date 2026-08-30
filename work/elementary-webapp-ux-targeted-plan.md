# Elementary Learner UX Targeted Implementation Plan

## Goal

이번 회차는 `elementary-webapp-ux-orchestrator`의 두 기능만 실행합니다.

1. **단어·문장 표현 감사**: 초등학교 5–6학년 서윤(10–12세)을 주 사용자로, 초등학교 3–4학년 준호(8–10세)의 읽기 부담을 인접 학년 가드레일로 삼아 학습 화면의 용어, 지시문, 상태 문구, 피드백, 복구 안내를 점검합니다.
2. **시뮬레이션 기회 판정**: 현재 앱의 학습 목표에 예측 → 변수 조작 → 결과 관찰 → 설명 → 재시도/전이 루프가 필요한지 판정합니다. 판정 결과는 `not-needed`로 기록하며 시뮬레이션 코드는 추가하지 않습니다.

보존할 학습 목표는 같은 사건을 본 위치·관심·목적에 따라 다르게 표현할 수 있음을 이해하고, 사실·추론·평가 표현을 근거와 연결한 뒤 다른 관점으로 다시 쓰는 것입니다. 네 가지 가상 사건, 무점수·무승자 판정, `CasePack` 콘텐츠와 `evaluateEvidence`·`evaluateComparison`·`evaluateRewrite` 판정 의미, 로컬 저장 경계, 라이트 테마, 키보드·ARIA 구조는 변경하지 않습니다.

## Architecture

렌더링 경로는 `src/app/AppShell.tsx` → `src/app/StageRenderer.tsx` → 단계별 feature 컴포넌트입니다.

- 표현 감사 대상은 `CaseIntake`, `LensReader`, `EvidenceBoard`, `CrossExamination`, `PerspectiveRewrite`, `CaseReport`, `StageStatus`, `NeutralRecordReveal`의 학습자에게 보이는 텍스트와 `aria-label`입니다.
- 공통 학습 용어 설명은 `src/content/learnerLabels.ts`의 타입이 있는 상수로 관리해 화면마다 같은 낱말과 풀이를 사용합니다.
- 시뮬레이션 판정은 기존 DOM 상태 변화가 시뮬레이션의 필수 계약을 만족하는지 소스·브라우저 증거로 기록합니다. 변수·단위·seed·clock·reset·pause·step을 갖는 동적 모델이 없으므로 렌더러나 상태 모델을 새로 만들지 않습니다.
- 문장 표현 변경은 현재 행동 버튼과 정답 조건의 의미를 유지하고, `gi-pulse`와 `prefers-reduced-motion` 대체 스타일을 건드리지 않습니다.

## Tech Stack

- React 19, Vite 8, TypeScript 6 strict
- Vitest 4, Testing Library, Playwright 1.62, axe 브라우저 점검
- 기존 CSS(`src/styles/tokens.css`, `src/styles/base.css`, `src/styles/layout.css`, `src/styles/components.css`, `src/styles/motion.css`, `src/styles/print.css`)
- 새 패키지·브라우저 바이너리·Canvas/WebGL·외부 서비스는 사용하지 않습니다.

## Spec

### 표현 감사에서 적용할 변환

| 이슈 ID | 화면·상태 | 현재 표현 | 적용 표현 | 의미 보존 기준 |
| --- | --- | --- | --- | --- |
| EDU-LANG-001 | 렌즈 A/B, 차이 요약 | `관점의 메타데이터` | `두 사람이 본 단서` | 위치·관심·목적을 비교한다는 뜻을 유지하고 내부 데이터 용어를 제거 |
| EDU-LANG-002 | 근거 보드, 단계 안내·제목·빈 상태 | `근거 종류를 골라 보세요`, `...을 근거로 분류해 보세요`, `혼합 문장은 문장 부분을 모두 선택` | `사실·생각·판단 중 어디에 해당하는지 골라 보세요`, 세 종류의 짧은 풀이, `두 종류가 섞인 문장은 해당 부분을 모두 골라요` | `관찰 사실`·`인물의 추론`·`평가 표현` 라벨과 판정 조건은 그대로 유지 |
| EDU-LANG-003 | 교차 조사, 초기·수정·추가 기록 상태 | `저장된 초기 비교 · 읽기 전용`, `중립 기록 · 순서대로 공개됨`, `수정한 판단의 이유가 된 실제 서술 문장` | `처음에 고른 내용`, `사실만 적힌 기록 · 순서대로 열림`, `생각을 바꾼 까닭이 담긴 문장` | 처음 선택과 추가 사실 공개, 이유 문장 선택이라는 상태 전이를 유지 |
| EDU-LANG-004 | 관점 전환, 미완료·완료·문장 목록 | `문장 블록`, `모순된 블록`, `맞은 관점 표지` | `문장 조각`, `서로 맞지 않는 문장 조각`, `맞는 관점 단서` | 사실 보존·관점 태그·허용 블록 집합의 판정 의미를 유지 |
| EDU-LANG-005 | 사건 보고서, 증거·사실 요약 | `보존한 사실 표지`, `사용한 관점 표지`, `바뀐 항목 없음` | `지킨 사실`, `사용한 관점 단서`, `바뀐 항목이 없어요` | 보고서가 근거와 관점 선택을 되돌아보게 한다는 목적을 유지 |
| EDU-LANG-006 | 보고서의 오늘 배운 점 | 한 문장에 위치·관심·목적·사실/생각을 모두 넣음 | 두 문장으로 나누고 `본 자리·관심·목적`과 사실/생각을 각각 설명 | 학습 목표와 교과 용어를 삭제하지 않고 문장 부담만 줄임 |

### 시뮬레이션 기회 판정

| simulation ID | 학습 목표 | 예측 | 변수·조작 | 관찰·설명 | 재시도·전이 | 판정 |
| --- | --- | --- | --- | --- | --- | --- |
| EDU-SIM-001 | 두 인물의 같은 사건 서술이 관점에 따라 달라짐을 비교 | 다음 문장에서 사실·추론·평가가 어떻게 달라질지 예상 | 문장 카드 선택, 근거 범주 버튼, 비교 체크박스, 문장 조각 선택 | 화면의 분류 상태·근거 연결·추가 기록·다시 쓴 문장을 말로 설명 | 같은 카드 재분류, 추가 기록 공개, 다른 관점·독자·목적으로 다시 쓰기 | `not-needed`: 값·위치·순서 같은 하나의 동적 변수를 조작해 물리적·수치적 결과를 관찰하는 모델이 없고, 현재의 이산 선택·근거 판정이 학습 목표를 직접 충족 |

`pause`와 `step`은 시간에 따라 자동 실행되는 상태가 없으므로 N/A입니다. `reset`은 앱의 현재 기록 지우기 기능이 있지만 시뮬레이션 reset이 아니라 학습 세션 초기화이며, 시뮬레이션 구현 계약의 reset·seed·clock 검증 대상이 아닙니다. 정적 대체 경로를 별도로 만들 필요가 없습니다.

## Global Constraints

- 이번 회차의 코드 변경은 표현 감사에서 확인된 문구와 접근 가능한 이름에 한정합니다. 학습 로직, 사건 사실, 판정 함수, 저장 키, 네트워크 경계를 변경하지 않습니다.
- 모든 소스 파일은 500줄 미만입니다. 새 설명 상수는 기존 `learnerLabels.ts`에 추가하고, 컴포넌트는 설명 렌더링만 담당합니다.
- 교육용 핵심 CTA의 `gi-pulse`, `prefers-reduced-motion: reduce` 정적 teal 강조, 44×44px 조작 영역, 키보드 순서·포커스·ARIA 상태를 유지합니다.
- `업데이트 내역` 버튼과 날짜별 기록을 유지하며 실제 소스 변경이 있으면 `src/content/updateHistory.ts`에 2026-08-30 항목을 추가합니다.
- 라이트 모드만 사용하고 VoiceOver·TTS·내레이션·녹음은 추가하거나 검증하지 않습니다.
- 이미지 생성·교체는 이번 텍스트·시뮬레이션 범위에 교육적 이득이 없으므로 실행하지 않습니다. 기존 사건 SVG는 사실·맥락 자산으로 보존합니다.
- 저장소에 포함된 기존 사용자 파일과 이전 릴리스 문서를 덮어쓰지 않습니다. 이번 회차 산출물은 `work/elementary-webapp-ux-targeted-*` 이름으로 분리합니다.

## 예상 파일 구조와 책임

- `src/content/learnerLabels.ts`: `EvidenceCategoryGuidance`, `ComparisonCategoryKey`, `ComparisonCategoryGuidance` 타입과 공통 학습 용어·짧은 풀이.
- `src/components/StageStatus.tsx`: 단계별 다음 행동 문구. 근거 보드와 교차 조사 안내를 학습자 행동 하나 중심으로 표시.
- `src/features/lenses/LensReader.tsx`: 차이 요약의 내부 용어를 학습자 표현으로 교체.
- `src/features/evidence/EvidenceBoard.tsx`: 세 근거 종류의 쉬운 풀이, 문장 부분 안내, 빈 상태·완료 안내.
- `src/features/comparison/CrossExamination.tsx`: 비교 범주별 행동 설명, 추가 기록·이유 문장·초기 비교 문구.
- `src/features/comparison/NeutralRecordReveal.tsx`: 추가 사실 기록의 접근 가능한 이름과 빈 상태.
- `src/features/rewrite/PerspectiveRewrite.tsx`: 문장 조각 용어, 선택·완료·피드백 문구.
- `src/features/report/CaseReport.tsx`: 보고서 라벨과 재방문 안내.
- `src/content/reportCopy.ts`: 보고서의 오늘 배운 점을 두 문장으로 나눈 학습자 문구.
- `src/content/updateHistory.ts`: 2026-08-30 표현 감사 개선 기록.
- `src/content/learnerLabels.test.ts`, `src/components/StageStatus.test.tsx`, `src/features/evidence/EvidenceBoard.test.tsx`, `src/features/comparison/CrossExamination.test.tsx`, `src/features/comparison/NeutralRecordReveal.test.tsx`, `src/features/rewrite/PerspectiveRewrite.test.tsx`, `src/features/report/CaseReport.test.tsx`, `src/content/reportCopy.test.ts`, `src/content/updateHistory.test.ts`: 새 문구와 학습 용어·상태를 검증.
- `tests/e2e/learner-language-simulation.spec.ts`: 375×812·640×900·1280×900에서 문구, 오답 회복, 시뮬레이션 `not-needed`의 실제 DOM 증거와 콘솔을 기록하는 회귀 시나리오.
- `work/elementary-webapp-ux-language-candidates.md`: 후보 수집 원본.
- `work/elementary-webapp-ux-language-audit.md`: before/after·난이도 신호·이해 확인 장부.
- `work/elementary-webapp-ux-simulation-decision.md`: EDU-SIM-001 판정과 선택하지 않은 대안.
- `work/elementary-webapp-ux-simulation-test.md`: 구현하지 않은 이유, N/A 제어, 브라우저에서 확인한 현재 이산 학습 루프.
- `work/elementary-webapp-ux-targeted-report.md`: 두 영역의 최종 증거·게이트·남은 작업.

## 작업별 Files·Interfaces·Acceptance

### 1. 공통 학습 용어와 단계 안내

- Files: `src/content/learnerLabels.ts`, `src/components/StageStatus.tsx`, 해당 테스트 파일.
- Interfaces: `EvidenceCategoryGuidance`, `ComparisonCategoryKey`, `ComparisonCategoryGuidance`, 기존 `StageStatusProps`.
- Acceptance: 세 범주의 label은 기존 판정 키와 일치하고, 각 풀이가 한 문장 안에서 `무엇인지`를 말하며, `StageStatus`의 evidence/comparison 안내가 지금 할 행동 하나를 말합니다.

### 2. 근거 보드 표현

- Files: `src/features/evidence/EvidenceBoard.tsx`, `src/features/evidence/EvidenceBoard.test.tsx`.
- Interfaces/selectors: `EvidenceBoardProps`, `CategoryChoices`, `SegmentChoices`, `.category-choices`, `[aria-live="polite"]`.
- Acceptance: 정상·오분류·혼합 문장·빈 보드·10/10 완료 상태에서 세 범주 풀이와 회복 문구가 보이고, `근거 표시하기`·`교차 조사 시작`의 enabled/disabled와 `gi-pulse`가 기존 조건과 같습니다.

### 3. 교차 조사와 추가 기록 표현

- Files: `src/features/comparison/CrossExamination.tsx`, `src/features/comparison/NeutralRecordReveal.tsx`, `src/domain/evaluateComparison.ts`, 관련 테스트.
- Interfaces/selectors: `CrossExaminationProps`, `OptionFieldset`, `SupportingSentenceChecklist`, `NeutralRecordRevealProps`, `data-comparison-phase`, `aria-label="추가 사실 기록"`.
- Acceptance: 세 비교 범주 설명, 초기 비교, 추가 사실 기록, 생각 변경 이유 안내가 한 행동씩 읽히며, 지원 문장 누락·정상 저장·추가 기록 공개 전후 판정 결과가 동일합니다.

### 4. 관점 전환·보고서 표현

- Files: `src/features/rewrite/PerspectiveRewrite.tsx`, `src/features/report/CaseReport.tsx`, `src/content/reportCopy.ts`, 관련 테스트.
- Interfaces/selectors: `PerspectiveRewriteProps`, `LocalRewriteDraft`, `FeedbackRows`, `CaseReportProps`, `ComparisonSnapshot`, `ReportLearningCopy`.
- Acceptance: 문장 조각 선택·순서 변경·삭제 버튼의 accessible name이 같은 용어를 쓰고, 미완료·정상·모순 선택 피드백이 사실 보존·관점 판정과 일치합니다. 보고서에서 지킨 사실·관점 단서·오늘 배운 점·다음 행동이 실제 완료 상태에 표시됩니다.

### 5. 문구 회귀·브라우저 증거

- Files: `tests/e2e/learner-language-simulation.spec.ts`, `src/content/updateHistory.ts` 및 테스트, `work/` 감사 문서.
- Interfaces/selectors: 사용자 역할 기반 locator, `[data-sentence-id]`, `[data-comparison-phase]`, `[data-stage-heading]`, `.gi-pulse`, `document.body.scrollWidth`.
- Acceptance: 375×812에서 오답 → 풀이 → 재제출, 640×900에서 비교·문장 조각, 1280×900에서 보고서의 새 문구가 표시되고 콘솔 오류·가로 오버플로가 없습니다. 시뮬레이션은 동적 모델 부재와 현재 이산 루프의 실제 DOM 증거를 남기며 `not-needed`를 통과시킵니다.

## TDD 순서

### 실패 테스트 먼저

- [ ] `src/content/learnerLabels.test.ts`에 세 근거 범주의 짧은 풀이와 비교 범주 설명이 존재한다는 테스트를 추가합니다. 기존 용어 키와 label은 유지되는지 함께 확인합니다.
- [ ] `src/components/StageStatus.test.tsx`에 evidence/comparison의 새 행동 문구를 기대하도록 테스트를 먼저 바꿉니다.
- [ ] `src/features/evidence/EvidenceBoard.test.tsx`에 세 범주 풀이, `두 종류가 섞인 문장`, `모든 문장을 분류했어요. 이제 두 글을 비교해 보세요.`를 기대하는 실패 테스트를 추가합니다.
- [ ] `src/features/comparison/CrossExamination.test.tsx`에 `사실만 적힌 기록`, `생각을 바꾼 까닭`, 범주별 설명과 기존 판정 상태 보존을 기대하는 실패 테스트를 추가합니다.
- [ ] `src/features/rewrite/PerspectiveRewrite.test.tsx`와 `src/features/report/CaseReport.test.tsx`에 `문장 조각`, `지킨 사실`, `사용한 관점 단서`, 새 완료·미완료 문구를 기대하는 실패 테스트를 추가합니다.
- [ ] `src/content/reportCopy.test.ts`에 오늘 배운 점이 두 문장으로 나뉘고 위치·관심·목적·사실/생각 학습 의미를 모두 포함하는지 테스트합니다.
- [ ] `tests/e2e/learner-language-simulation.spec.ts`에 새 문구 locator와 오답 회복, `simulationDecision === 'not-needed'` 문서 증거를 먼저 작성합니다. 로컬 Playwright 브라우저가 없으면 이 테스트를 설치하지 않고 `not run`으로 기록합니다.

### 최소 구현

- [ ] `src/content/learnerLabels.ts`에 타입이 있는 풀이 상수를 추가하고, `StageStatus.tsx`에서 evidence/comparison 문구만 교체합니다.
- [ ] `EvidenceBoard.tsx`에서 범주 풀이·혼합 문장 안내·카드/완료 문구를 렌더링하되, `EvidenceSelection` 생성과 `evaluateEvidenceSelection` 호출은 변경하지 않습니다.
- [ ] `CrossExamination.tsx`와 `NeutralRecordReveal.tsx`에서 learner-facing label과 안내만 교체하고 `ComparisonDraft`, `ComparisonFeedback`, `revealedRecordIds` 흐름은 유지합니다.
- [ ] `PerspectiveRewrite.tsx`, `CaseReport.tsx`, `reportCopy.ts`에서 표시 문자열과 accessible name만 교체하고 `RewriteDraft`, `CaseReportModel` 계산은 유지합니다.
- [ ] `src/content/updateHistory.ts`에 `2026-08-30` 표현 감사·시뮬레이션 판정 범위 기록을 한 행 추가하고 행 수 테스트를 갱신합니다.
- [ ] `work/elementary-webapp-ux-language-audit.md`, `work/elementary-webapp-ux-simulation-decision.md`, `work/elementary-webapp-ux-simulation-test.md`에 기준선 증거를 먼저 기록합니다.

### 통과 테스트와 동일 경로 재검증

- [ ] 실패했던 단위·컴포넌트 테스트가 모두 통과하고, 기존의 사실·추론·평가 판정 결과와 `gi-pulse` 수가 변하지 않습니다.
- [ ] 동일한 375×812 시나리오에서 문구를 자기 말로 다시 말하고, 잘못된 범주 선택 후 풀이를 읽고 같은 카드에서 다시 제출합니다.
- [ ] 640×900에서 교차 조사 범주 설명과 추가 사실 기록을 확인하고, 1280×900에서 관점 전환·사건 보고서의 새 표현을 확인합니다.
- [ ] 브라우저 콘솔 오류·경고 0, 가로 오버플로 0, 키보드 Tab/Enter/Space 조작과 44px 조작 영역을 확인합니다. VoiceOver는 실행하지 않습니다.
- [ ] `work/elementary-webapp-ux-targeted-report.md`에 `confirmed`, `partial`, `not run`, `blocked`를 증거별로 구분하고 P0/P1은 0건인지 판정합니다.

## 향후 실행할 명령과 예상 결과

아래 명령은 계획을 구현하는 다음 작업에서 실행할 항목이며, 이 계획 작성 단계에서는 실행하지 않습니다.

```sh
npm test
# 기존 테스트와 새 표현 회귀 테스트가 모두 PASS

npm run typecheck
# tsc -b 성공, 타입 오류 0

npm run lint
# ESLint 오류 0

npm run lint:filesize
# 소스 파일 500줄 초과 0건

npm run build
# Vite dist 생성 성공

npm run test:e2e -- tests/e2e/learner-language-simulation.spec.ts
# 새 언어·회복 시나리오가 Ubuntu Chromium에서 PASS; 로컬 브라우저 부재 시 not run

git diff --check
# 공백 오류 0
```

시뮬레이션을 구현하지 않으므로 Canvas/WebGL 성능, seed/clock, pause/step, simulation reset 테스트는 실행하지 않고 `work/elementary-webapp-ux-simulation-test.md`에 N/A 사유를 기록합니다.

## 향후 커밋 단계

1. `test: add targeted learner language and simulation decision checks` — 새 문구·판정 보존·시뮬레이션 `not-needed` 증거를 먼저 추가합니다.
2. `fix: clarify learner terminology and recovery guidance` — 공통 용어 풀이와 두 학습 단계의 최소 문구 변경을 반영합니다.
3. `test: verify targeted learner browser path` — 375/640/1280px의 같은 시나리오 회귀 검사를 추가하고 실행 결과를 기록합니다.
4. `docs: record targeted elementary UX audit` — 언어 장부·시뮬레이션 결정·테스트 기록·최종 보고서를 저장합니다.

이 회차에서는 구현 승인 범위가 단어·문장 표현과 시뮬레이션 판정으로 제한되어 있으므로, 커밋·푸시·GitHub Pages 배포·HVC 등록은 실행하지 않습니다.
