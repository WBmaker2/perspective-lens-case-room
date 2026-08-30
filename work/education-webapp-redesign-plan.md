# Perspective Lens Case Room Implementation Plan

## Goal

`관점 렌즈 사건실`을 초등학교 5~6학년 국어 학습자가 처음 화면에서 목표와 다음 행동을 이해하고, 여섯 단계를 끝까지 수행하며, 마지막에 자신의 근거와 생각 변화를 읽을 수 있는 학습 도구로 다듬는다. 기존 사건 팩·판정 규칙·로컬 저장 경계·GitHub Pages 경로는 유지하고, 시각 위계와 행동 안내를 개선한다.

## 구현 상태

2026-08-30 현재 소스·테스트·문서 리디자인을 구현했습니다. `PRODUCT.md`, `design-system/MASTER.md`, 설계 문서와 기존 감사·보고서를 다시 읽고, `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects`, `imagegen` 역할을 적용했습니다. `concept-seed` 방향 `99fd868c`의 승인 구성으로 `.impeccable/mocks/perspective-lens-comp-stage-rail.png`를 북극성 comp로 기록했으며, 두 대안은 비교 자료로 보존했습니다.

`build-phase.mjs`의 comps·spec·plates 단계는 통과했습니다. 승인 comp와 실제 렌더의 hero 대조는 61.7%로 72% 기준에 미달해 열린 상태이며 강제 통과시키지 않았습니다. 따라서 hero 대조는 미해결 검토 항목으로 보고하고, 기능·접근성·반응형 자동 게이트와 승인 브라우저 수동 확인은 별도 증거로 기록합니다. 커밋·푸시·GitHub Pages 배포·HVC 등록은 별도 승인 전까지 실행하지 않습니다. VoiceOver와 실제 보조공학 승인은 이 계획의 검증 범위에 포함하지 않습니다.

## 조사 결과와 적용 문서

- 프로젝트 루트에는 `AGENTS.md`, `EDUCATION_DESIGN.md`가 없으며, 제품 사실은 `PRODUCT.md`, 시각 규칙은 `design-system/MASTER.md`에 기록한다. 없는 규칙은 추측하지 않는다.
- 설계 기준은 `2026-08-26-perspective-lens-case-room-design.md`와 현재 코드·README·기존 테스트다.
- 현재 스택은 Vite 8, React 19, TypeScript 6 strict, Vitest 4, Testing Library, Playwright 1.62이며 새 의존성은 추가하지 않는다.
- `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects`, `imagegen` 역할을 읽고 적용했다. UI Pro Max의 데이터베이스 검색 결과가 없는 쿼리는 한 번 더 좁혀 검색했으며, React 스택 검색은 `accessible focus state` 결과를 사용한다.

## Architecture

현재의 `AppShell → StageRenderer → stage feature → domain evaluator` 경계를 유지한다.

- 전역 학습 상태와 저장: `src/app/AppShell.tsx`, `src/app/useCaseSession.ts`, `src/domain/sessionReducer.ts`, `src/domain/sessionPersistence.ts`를 변경하지 않는 방향으로 우선 검토한다.
- 전역 시각 안내: `src/components/StageStatus.tsx`가 현재 단계 번호·단계명·짧은 다음 행동을 렌더링하고 `AppShell`에서 한 번만 배치한다.
- 단계 진행: `ProgressSteps`가 현재 단계와 이미 통과한 단계를 구분하되, 단계 전환 로직은 reducer에 맡긴다.
- 학습 화면: 사건 선택 카드에는 기존 `focusQuestion`에서 만든 짧은 초점을 보여 주고, 각 단계의 완료 수와 행동 안내는 기존 상태에서 계산한다.
- 판정 모델: 사실·추론·평가·복수 타당 답·중립 기록·관점 전환 규칙의 타입과 ID는 보존한다. 학습자에게 내부 블록 ID를 표시하지 않는다.
- 모션: 기존 `gi-pulse`는 현재 필수 CTA 한 개에만 유지하고 `prefers-reduced-motion: reduce`에서는 정적 윤곽선과 텍스트 안내로 대체한다.

## Tech Stack

- Vite 8 + React 19 + TypeScript 6 strict
- CSS 모듈 없이 기존 `src/styles/tokens.css`, `layout.css`, `components.css`, `motion.css` 재사용
- Vitest 4 + Testing Library + `@testing-library/user-event`
- Playwright 1.62 + axe 기반 E2E
- 외부 폰트·이미지·분석 SDK·서버·AI·새 npm 패키지 없음

## Spec

### 학습자 경험

1. 첫 화면에서 `국어 · 5~6학년 · 30~40분` 맥락, 현재 단계 `1/6`, 사건 선택과 첫 생각이라는 다음 행동을 한 번에 이해한다.
2. 사건 카드에서 제목만 읽지 않고 사건별 초점 질문을 먼저 확인한다.
3. 진행 단계에서 통과한 단계는 완료 상태로, 현재 단계는 `aria-current="step"`와 시각적 강조로 확인한다.
4. 렌즈·근거·비교·다시 쓰기 화면에서 현재 해야 할 행동과 완료 수를 읽을 수 있다.
5. 다시 쓰기 화면에서는 문장 블록의 실제 문장만 보이며 내부 ID는 화면·접근 가능한 이름에 노출되지 않는다.
6. 375px과 640px에서 고정 학습 도구, 현재 행동 CTA, 긴 문장 카드가 겹치지 않으며 가로 스크롤이 없다.
7. 키보드만으로 사건 선택부터 보고서까지 완료하고, 단계 제목과 피드백으로 포커스가 이동한다.
8. 라이트 모드와 reduced-motion 동작을 유지한다.

### 디자인 토큰

`design-system/MASTER.md`에 다음 토큰과 적용 규칙을 기록하고 실제 CSS에 반영한다.

- 색상: 종이 배경 `#f7f4ee`, 잉크 `#233044`, 청록 행동 `#0f766e`, 주황 안내 `#c2410c`, 선·보조 배경의 대비 조합
- 글자: 본문 18/20/22px 선택, 줄 간격 1.6/1.8/2 선택, 제목은 `clamp()`로 단계 위계를 유지
- 간격: 0.5rem 단위의 0.5/0.75/1/1.5/2.5rem, 카드 내부 최소 0.75rem
- 상태: 선택·완료·현재·비활성·오류를 색만으로 구분하지 않고 테두리·텍스트·`aria` 상태로 함께 표현
- 조작: 최소 44px 터치 영역, `:focus-visible` 3px 주황 윤곽선, 현재 필수 CTA 한 개만 `gi-pulse`
- 반응형: 760px에서 단일 열, 480px에서 단일 카드·세로 CTA, 375px에서 고정 도구 여백 예약

## Global Constraints

- 네 사건과 두 서술자, 문장 단위 근거, 지연 공개 중립 기록, 구조화한 관점 전환을 유지한다.
- 관점 차이를 참·거짓, 승자·점수·정답률로 판정하지 않는다.
- 실제 뉴스·학생 이름·학생 글 업로드·감정 분석·게시판·학생 간 평가를 추가하지 않는다.
- 자유 메모는 기존 로컬 저장 선택 흐름과 허용 키를 유지한다. 네트워크 요청·로그인·AI 호출·추적을 추가하지 않는다.
- 기존 `data-*` ID는 테스트·상태 연결을 위해 유지하되, 학생에게 보이는 텍스트와 접근 가능한 이름에는 내부 ID를 쓰지 않는다.
- 모든 소스와 테스트 파일은 499줄 이하로 유지한다.
- 업데이트 내역은 실제 구현 확인일 `2026-08-30`을 최신 `개선` 행으로 기록하고, 계획·예정 작업은 완료 내역으로 쓰지 않는다.
- 커밋·푸시·릴리스·배포·HVC 등록은 이 요청 범위에서 실행하지 않는다.
- VoiceOver 호출과 승인 주장은 하지 않는다. 키보드·ARIA·axe·모바일·확대·reduced-motion만 자동·수동 검증한다.

## 변경하지 않을 범위

- `src/model/case.ts`의 콘텐츠 타입과 네 사건 원문·정답 배열
- `src/domain/evaluateEvidence.ts`, `evaluateComparison.ts`, `evaluateRewrite.ts`의 판정 규칙
- `src/domain/sessionReducer.ts`의 단계 게이트와 저장 키 계약
- `src/features/teacher/TeacherGuide.tsx`의 인쇄용 콘텐츠 의미
- GitHub Actions workflow, Vite base 경로, 외부 배포 설정

## 예상 파일 구조와 책임

| 경로 | 책임 |
| --- | --- |
| `work/education-webapp-redesign-plan.md` | 이 구현 범위·수용 기준·롤백·검증 순서 |
| `work/education-webapp-redesign-audit.md` | 초기 및 최종 UX/UI 감사와 근거 |
| `work/education-webapp-redesign-assets.md` | 자산 사용처·품질 판정·교체 여부 |
| `work/education-webapp-redesign-report.md` | 변경 파일·검증 결과·미해결 항목·지원 스킬 상태 |
| `PRODUCT.md` | 제품 사용자·목적·포지셔닝·보존해야 할 기능·접근성 사실 |
| `work/education-webapp-redesign-surface-brief.md` | 승인된 `stage-rail` comp와 화면 번역 규칙 |
| `.impeccable/mocks/perspective-lens-comp-stage-rail.png` | 승인된 첫 화면 구성 북극성 comp |
| `.impeccable/mocks/perspective-lens-comp-stage-rail.png.json` | comp 원문 prompt와 `approved: true` 기록 |
| `design-system/MASTER.md` | 리디자인 토큰·컴포넌트·반응형·접근성 규칙 |
| `src/components/StageStatus.tsx` | 현재 단계, 진행 번호, 다음 행동의 공통 안내 |
| `src/components/StageStatus.test.tsx` | 단계별 이름·번호·ARIA 상태 계약 |
| `src/components/ProgressSteps.tsx` | 단계 완료/현재/예정 상태 표시 |
| `src/components/ProgressSteps.test.tsx` | 완료 상태와 `aria-current` 검증 |
| `src/app/AppShell.tsx` | 앱 맥락과 StageStatus 배치, 기존 흐름 연결 |
| `src/features/intake/CaseIntake.tsx` | 사건 카드의 초점 질문, 첫 행동 안내 |
| `src/features/intake/CaseIntake.test.tsx` | 초점 질문·비활성 CTA·게이트 안내 |
| `src/features/evidence/EvidenceBoard.tsx` | 분류 진행·현재 카드 안내 |
| `src/features/evidence/EvidenceBoard.test.tsx` | 진행 수와 안내 상태 |
| `src/features/comparison/CrossExamination.tsx` | 비교 항목 진행 안내와 기존 판정 연결 |
| `src/features/comparison/CrossExamination.test.tsx` | 비교 진행 안내·복수 답 유지 |
| `src/features/rewrite/PerspectiveRewrite.tsx` | 내부 ID 비노출, 문장 중심 작업 이름 |
| `src/features/rewrite/PerspectiveRewrite.test.tsx` | 블록 ID 비노출 및 키보드 조작 |
| `src/styles/tokens.css` | 색상·서체·간격·상태 토큰 |
| `src/styles/layout.css` | 헤더·단계·진행 안내·모바일 레이아웃 |
| `src/styles/components.css` | 카드·상태·완료·안내·CTA 표면 |
| `src/styles/motion.css` | `gi-pulse`와 reduced-motion 정적 대체 |
| `src/content/updateHistory.ts` | 리디자인 확인일과 짧은 변경 기록 |
| `src/content/updateHistory.test.ts` | 최신 날짜·정렬·문구 계약 |
| `README.md` | 리디자인 검증 범위와 공개 링크 설명 |
| `tests/e2e/learner-flow.spec.ts` | 실제 시작→보고서 여정과 새 안내 검증 |
| `tests/e2e/responsive-motion.spec.ts` | 375/640px, 모션·가로 스크롤·CTA 상태 |
| `tests/e2e/accessibility.spec.ts` | 키보드·탭·대화상자·상태 이름 |
| `tests/e2e/privacy-print.spec.ts` | 내부 ID 비노출·저장/인쇄 경계 |

## 작업 단계와 TDD 순서

### 1. 초기 감사와 계획 문서 확정

- [x] 현재 `git status`, 브랜치, 파일 줄 수, `package.json` 스크립트 확인
- [x] 1440×900 공개 화면과 375×812 공개 화면에서 시작 화면을 확인
- [x] 사건 접수→렌즈→근거→교차 조사→관점 전환→보고서 흐름을 자동 테스트와 승인 브라우저에서 점검
- [x] `work/education-webapp-redesign-audit.md`에 P0/P1/P2 발견 사항, 근거 경로, 수정 수용 기준을 기록
- [x] 초기 감사에서 확인한 자산 사용처를 `work/education-webapp-redesign-assets.md`에 기록

### 2. 디자인 시스템 기록과 공통 단계 안내

**Files:** `design-system/MASTER.md`, `src/components/StageStatus.tsx`, `src/components/StageStatus.test.tsx`, `src/components/ProgressSteps.tsx`, `src/components/ProgressSteps.test.tsx`, `src/app/AppShell.tsx`, `src/app/AppShell.test.tsx`

**Interfaces:**

```ts
interface StageStatusProps {
  activeStage: StageId;
  caseTitle?: string;
}

interface ProgressStepsProps {
  activeStage: StageId;
}
```

- [x] 실패 테스트 계약: `StageStatus`가 `현재 단계 1/6`, `사건 접수`, `사건을 고르고 첫 생각을 기록해 보세요.`를 렌더링하는지, 이전 단계가 `완료` 상태를 갖는지 테스트로 고정
- [x] 실패 테스트 실행: 구현 전 계약을 기준으로 테스트를 작성하고 구현 후 동일 명령에서 계약 통과를 확인
- [x] 최소 구현: 단계 순서에서 현재 이전 인덱스를 완료로 계산하고, 현재 단계에만 `aria-current="step"`; StageStatus는 순수한 안내만 표시
- [x] 통과 테스트 실행: 동일 명령에서 새 안내·완료 표식·기존 AppShell 흐름 통과 확인
- [x] `design-system/MASTER.md`에 실제 적용한 토큰과 상태 스타일을 기록

### 3. 사건 접수와 분류/비교 행동의 시각 위계 개선

**Files:** `src/features/intake/CaseIntake.tsx`, `src/features/intake/CaseIntake.test.tsx`, `src/features/evidence/EvidenceBoard.tsx`, `src/features/evidence/EvidenceBoard.test.tsx`, `src/features/comparison/CrossExamination.tsx`, `src/features/comparison/CrossExamination.test.tsx`

- [x] 실패 테스트 계약: 사건 카드에 `focusQuestion`이 표시되고, 사건/첫 생각이 비어 있을 때 읽을 수 있는 `먼저 사건과 첫 생각을 골라 주세요.` 안내가 나타나는지 테스트로 고정
- [x] 실패 테스트 계약: 근거 화면의 `분류 완료 n / 10`, 비교 화면의 선택 항목 수가 상태와 함께 갱신되는지 테스트로 고정
- [x] 실패 테스트 실행: 구현 전 계약을 기준으로 테스트를 작성하고 구현 후 동일 명령에서 계약 통과를 확인
- [x] 최소 구현: 기존 데이터와 reducer를 재사용해 카드 초점·진행 텍스트·현재 행동 안내만 추가하고 판정 로직은 수정하지 않음
- [x] 통과 테스트 실행: 동일 명령에서 복수 타당 답과 기존 게이트를 포함해 통과 확인

### 4. 다시 쓰기 화면의 내부 ID 제거와 키보드 이름 정리

**Files:** `src/features/rewrite/PerspectiveRewrite.tsx`, `src/features/rewrite/PerspectiveRewrite.test.tsx`, `src/styles/components.css`

- [x] 실패 테스트 계약: 렌더된 화면과 버튼 `aria-label`에 `rewrite-`, `block-` 또는 사건 내부 ID가 없고 실제 블록 문장과 행동 이름만 있는지 테스트로 고정
- [x] 실패 테스트 실행: 구현 전 ID 비노출 계약을 기준으로 테스트를 작성하고 구현 후 동일 명령에서 계약 통과를 확인
- [x] 최소 구현: `.rewrite-block__id` 렌더를 제거하고 `블록 넣기: {문장}`, `위로 이동: {문장}`, `아래로 이동: {문장}`, `블록 빼기: {문장}`으로 변경; `data-block-id`와 DOM 제어 ID는 유지
- [x] 통과 테스트 실행: 동일 명령에서 지원되는 피드백 문장·키보드 순서·포커스 복구 통과 확인

### 5. CSS 리디자인과 자산 안전 판정

**Files:** `src/styles/tokens.css`, `src/styles/layout.css`, `src/styles/components.css`, `src/styles/motion.css`, `work/education-webapp-redesign-assets.md`

- [x] 초기 자산 목록: `CaseIllustration.tsx`, `public/favicon.svg`, CSS background/import/srcset 사용처를 검색하고 각 렌더 크기와 역할을 기록
- [x] 판정: 사건을 설명하는 인라인 SVG와 파비콘은 사실·정체성 자산으로 분류해 유지; 생성 comp는 `.impeccable/mocks/` 참고 자료로만 보존
- [x] 디자인 구현: 종이 표면, 카드 경계, 단계 상태, 안내 배지, 모바일 단일 열, 고정 도구 여백을 토큰 기반으로 정리
- [x] 모션 구현: 현재 필수 CTA 한 개에만 `gi-pulse`; reduced-motion에서는 애니메이션 없이 3px 윤곽선과 안내 문장
- [x] 줄 수 확인: `npm run lint:filesize`로 모든 소스가 499줄 이하인지 확인

### 6. 업데이트 기록·문서·최종 검수

**Files:** `src/content/updateHistory.ts`, `src/content/updateHistory.test.ts`, `README.md`, `work/education-webapp-redesign-report.md`

- [x] 실패 테스트: 최신 `2026-08-30` 개선 행과 리디자인 요약이 배열 앞에 있고 계획 문구가 없는지 작성
- [x] 실패 테스트 실행: `npm test -- src/content/updateHistory.test.ts src/test/releaseReadiness.test.ts`에서 날짜·링크 계약을 확인
- [x] 최소 구현: 실제 변경 범위를 짧게 기록하고 README 검증 범위·VoiceOver 제외·HVC 링크를 갱신
- [x] 통과 테스트 실행: 동일 명령에서 문서 계약 통과 확인
- [x] 최종 `work/education-webapp-redesign-report.md`에 역할별 실행 상태, 변경 파일, 자동 결과, 브라우저 결과, 사람 확인 대기 항목을 분리해 기록
- [x] 최종 `work/education-webapp-redesign-report.md`에 네 역할의 `read`/`applied`, 승인 comp·spec·detector 결과, 자동 결과, 브라우저 결과, 사람 확인 대기 항목을 분리해 기록

## 수용 기준

- [x] 네 사건의 콘텐츠·판정·복수 타당 답이 기존 테스트와 동일하게 유지된다.
- [x] 첫 화면에 대상·시간·현재 단계·다음 행동이 보이고, 사건 카드에 사건별 초점 질문이 있다.
- [x] `ProgressSteps`가 이전 단계 완료, 현재 단계, 이후 단계를 구분하며 현재 단계만 `aria-current="step"`이다.
- [x] 근거 화면 진행 수와 비교 화면 선택 안내가 실제 상태와 일치한다.
- [x] 학생 화면 및 접근 가능한 이름 어디에도 내부 rewrite/block ID가 없다.
- [x] 375/640px에서 가로 스크롤과 고정 도구·CTA 겹침이 없고 모든 핵심 조작이 44px 이상이다.
- [x] 키보드로 시작부터 보고서까지 완료하고 `:focus-visible`과 단계 제목 포커스가 유지된다.
- [x] `prefers-reduced-motion: reduce`에서 애니메이션 없이 동일한 행동 안내가 제공된다.
- [x] `npm test`, `npm run typecheck`, `npm run lint`, `npm run lint:filesize`, `npm run build`, 관련 Playwright E2E가 통과한다.
- [x] VoiceOver·실제 보조공학 승인·사람의 콘텐츠 출처 승인은 확인하지 않은 상태로 명확히 남는다.

## 2026-08-30 실행 기록

- `npm test`: 39개 파일, 157개 테스트 PASS
- `npm run typecheck`: PASS
- `npm run lint`: PASS
- `npm run lint:filesize`: PASS, 검사 대상 소스 파일 499줄 이하
- `npm run build`: Vite production build PASS
- `npm run test:e2e`: 10개 테스트 PASS
- 재검증 시 4173 포트가 다른 프로젝트 preview와 충돌해 기본 서버 시작이 중단됐으나, 이 프로젝트의 4174 preview를 재사용한 임시 설정에서 동일한 10개 테스트가 모두 PASS
- 승인 브라우저 세션: 1586×992 근거 보드와 375px 사건 접수 화면, 무수평스크롤 확인; 콘솔 오류 0건
- `impeccable`: comps/spec/plates PASS, hero 61.7%로 72% 기준 미달(open); detector는 한 번 실행해 advisory 결과를 기록
- `git diff --check`: PASS
- 커밋·푸시·배포·HVC 등록: 실행하지 않음

## 향후 실행할 명령과 예상 결과

아래 명령은 같은 결과를 재현하거나 다음 수정 라운드에서 실행할 항목이다. 현재 라운드에서는 구현 후 실행해 위의 결과를 얻었다.

```bash
npm test -- src/components/StageStatus.test.tsx src/components/ProgressSteps.test.tsx src/app/AppShell.test.tsx
# 예상: 신규 공통 단계 안내·완료 표식·기존 AppShell 흐름 PASS

npm test -- src/features/intake/CaseIntake.test.tsx src/features/evidence/EvidenceBoard.test.tsx src/features/comparison/CrossExamination.test.tsx src/features/rewrite/PerspectiveRewrite.test.tsx
# 예상: 각 단계의 학습자 문구·진행 수·내부 ID 비노출 테스트 PASS

npm test -- src/content/updateHistory.test.ts src/test/releaseReadiness.test.ts
# 예상: 실제 개선일·문서 링크·범위 계약 PASS

npm test
npm run typecheck
npm run lint
npm run lint:filesize
npm run build
# 예상: 전체 단위/컴포넌트 테스트, strict 타입, ESLint, 499줄 검사, dist 빌드 PASS

npx playwright test tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive-motion.spec.ts tests/e2e/privacy-print.spec.ts
# 예상: 시작→보고서 keyboard flow, ARIA, 375/640px, reduced-motion, 저장/인쇄 경계 PASS

git diff --check
# 예상: 공백 오류 없음
```

## 롤백 방법

리디자인 변경은 공통 안내·콘텐츠 표시·스타일·테스트·문서 파일에 한정한다. 검증 실패 시 변경 파일 목록을 확인한 뒤 해당 파일만 이전 상태로 복구하고, 기존 reducer·domain·case 콘텐츠·workflow는 건드리지 않는다. `.impeccable/mocks/`의 생성 comp와 sidecar는 비배포 참고 자료이므로 소스 회귀와 분리해 보존하거나 검토 후 제거한다. 커밋·배포 전까지는 작업 트리의 diff로 복구 범위를 검토한다.

## 향후 커밋 단계

이 요청에서는 실행하지 않으며, 사용자가 별도로 승인한 후 다음처럼 분리한다.

1. `docs: add education redesign plan and audit` — 계획·초기 감사·디자인 시스템 기록
2. `feat: clarify learner stage guidance` — 공통 단계 안내·사건/진행 UX
3. `fix: hide internal rewrite identifiers` — 다시 쓰기 접근 가능한 이름과 표시 정리
4. `style: refine case room learning surfaces` — 토큰·반응형·모션 스타일
5. `test: verify redesigned learner journey` — 자동·브라우저 검증과 최종 보고서

각 단계는 해당 범위의 테스트와 `git diff --check`를 통과한 뒤에만 다음 단계로 이동하며, 이 문서 작성 중에는 커밋·푸시·배포하지 않는다.
