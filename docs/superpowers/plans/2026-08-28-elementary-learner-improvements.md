# Perspective Lens Case Room Implementation Plan

> For agentic workers: REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** 초등학교 5~6학년 학습자가 관점 렌즈 사건실의 전체 흐름을 덜 헷갈리고 더 쉽게 끝내도록, 학습자용 표현·문장 맥락·진행 안내·완료 보고서·배포 문서를 개선한다.

**Architecture:** 기존 React 컴포넌트와 순수 판정 도메인을 유지하고, 학습자에게 보이는 이름은 src/content/learnerLabels.ts와 src/content/reportCopy.ts에서 한 곳에 관리한다. 보고서에서 렌즈 문장으로 돌아갈 때 문장 ID를 앱 경계에서 전달하고, LensReader가 해당 렌즈 탭과 문장 버튼을 선택해 학습자가 바로 다시 읽도록 한다. 판정 로직의 내부 ID와 supported 계열 상태값은 저장·도메인 계약에만 남기고 화면에는 한국어 표현과 문장 번호만 표시한다.

**Tech Stack:** Vite 8, React 19, TypeScript 6 strict mode, Vitest 4 + Testing Library, Playwright 1.62, @axe-core/playwright, CSS media queries, inline SVG favicon.

**Spec:** 2026-08-26-perspective-lens-case-room-design.md, 기존 구현 계약 2026-08-26-perspective-lens-case-room-implementation-plan.md

## Global Constraints

- 대상은 초등학교 5~6학년 국어 학습자이며, 문장과 버튼은 짧고 행동을 바로 알 수 있는 한국어로 작성한다.
- 같은 사건의 관점을 참·거짓 또는 인물의 우열로 판정하지 않고, 사실·추론·평가와 위치·관심·목적의 차이를 근거로 설명한다.
- 네 사건과 두 서술자, 문장 근거, 지연 공개 중립 기록, 블록 기반 관점 전환, 복수 타당 답을 유지한다.
- 세션·메모·읽기 설정은 기존 허용 저장 키와 로컬 저장 경계를 유지하며 서버·로그인·AI·분석 SDK·광고·외부 폰트·외부 이미지를 추가하지 않는다.
- 학생 이름, 실제 갈등, 학교폭력, 가족 갈등, 범죄, 감정 분석, 학생 글 업로드를 추가하지 않는다.
- 완료 보고서는 총점·승자·정답률을 표시하지 않고 사용한 근거, 달라진 판단, 남은 질문, 배운 점, 다음 행동을 보여 준다.
- 중요한 진행 버튼은 기존 단일 gi-pulse 계약을 유지하고, 모션 감소에서는 정적 3px 윤곽선과 안내 문장을 유지한다.
- 375px 모바일에서는 렌즈 탭 전환, 차이 요약, 44px 조작 영역, 가로 스크롤 없음, 고정 도구 모음과 현재 행동의 비중첩을 보장한다.
- 키보드와 ARIA 역할·이름·상태를 자동 검증한다. 이번 개선 범위에서는 VoiceOver 호출·구현·수동 검증을 수행하지 않으며 문서에서도 완료 근거로 제시하지 않는다.
- 모든 소스·테스트·스타일 파일은 500줄 미만이며 기능별 책임을 분리한다.
- 업데이트 내역에는 실제 검증일 2026-08-28의 개선 행을 최신 순서로 추가하고, 계획 문구를 완료 내역으로 기록하지 않는다.
- 명령은 구현자가 나중에 실행할 절차이며, 이 계획 작성 단계에서는 패키지 설치·커밋·푸시·배포를 실행하지 않는다.

## Expected File Structure and Responsibilities

| 경로 | 책임 |
| --- | --- |
| src/content/learnerLabels.ts | 피드백 상태, 근거 분류, 관점 표지, 읽기 설정의 학습자용 이름과 문장·사실·블록 참조 포맷 |
| src/content/learnerLabels.test.ts | 내부 ID가 학습자용 참조로 변환되고 알 수 없는 값이 안전한 일반 표현으로 표시되는지 검증 |
| src/content/reportCopy.ts | 보고서의 오늘 배운 점·다음에 해 볼 일 문장과 보조 타입 |
| src/content/reportCopy.test.ts | 보고서 문장이 선택된 두 서술자 이름과 핵심 학습 목표를 포함하는지 검증 |
| src/components/SentenceCard.tsx | 문장 카드의 접근 가능한 맥락 이름과 상태에 따른 읽기/중요 표시 버튼 |
| src/components/SentenceCard.test.tsx | 서술자 맥락, aria-pressed, 상태별 버튼 이름 계약 |
| src/features/lenses/LensReader.tsx | 두 렌즈 표시, 동적 토글 이름, 보고서에서 돌아온 문장 탭·포커스 |
| src/features/lenses/LensReader.test.tsx | 렌즈 토글 이름, 중복 문장 번호의 맥락, 지정 문장 재방문 |
| src/features/evidence/EvidenceBoard.tsx | 근거 분류 진행 수와 서술자-문장 맥락 |
| src/features/evidence/EvidenceBoard.test.tsx | 완료 수/전체 수, 맥락 있는 문장 이름, 기존 분류 게이트 |
| src/features/comparison/CrossExamination.tsx | 상태·근거 참조를 한국어로 표시하고 내부 ID를 화면에서 숨김 |
| src/features/comparison/CrossExamination.test.tsx | 비교 피드백과 처음 생각 영역의 학습자용 문구 |
| src/features/rewrite/PerspectiveRewrite.tsx | 보존 사실·모순 블록·관점 표지의 학습자용 표시 |
| src/features/rewrite/PerspectiveRewrite.test.tsx | 다시 쓰기 피드백에서 내부 ID가 노출되지 않는지 검증 |
| src/features/report/CaseReport.tsx | 사람이 읽는 근거 참조, 배운 점·다음 행동, 문장 재방문 콜백 |
| src/features/report/CaseReport.test.tsx | 보고서 섹션, 한국어 상태, 문장 재방문 대상 검증 |
| src/domain/buildCaseReport.ts | 보고서 모델에 학습 요약·다음 행동을 채우고 기존 판정 검증 유지 |
| src/domain/buildCaseReport.test.ts | 새 보고서 필드의 내용·불변성·기존 오류 경계 검증 |
| src/app/AppShell.tsx | 보고서 재방문 문장 상태와 렌즈 단계 콜백 연결 |
| src/app/StageRenderer.tsx | 재방문 문장 상태를 렌즈와 보고서 사이에 전달 |
| src/app/AppShell.test.tsx | 보고서에서 문장 재방문 시 렌즈 단계와 대상 ID 유지 |
| src/features/settings/ReadingSettings.tsx | 숫자 대신 의미 있는 글자 크기·줄 간격 선택 이름 |
| src/features/settings/ReadingSettings.test.tsx | 설정 라벨과 저장되는 숫자 값의 분리 검증 |
| src/styles/layout.css | 진행 수 표시, 버튼·문장 맥락, 모바일 도구 모음 여백 스타일 |
| src/styles/components.css | 보고서 학습 요약과 학습자용 피드백 행의 읽기 폭·강조 스타일 |
| src/styles/layout.test.ts | 모바일·고정 도구·문장 블록의 CSS 계약 |
| public/favicon.svg | 외부 요청이 없는 PL 파비콘 |
| index.html | 상대 경로 파비콘 링크 |
| src/content/updateHistory.ts | 2026-08-28 개선 기록 |
| src/content/updateHistory.test.ts | 최신 날짜·요약·정렬 계약 |
| README.md | HVC 링크, 실제 검증 범위, 최신 학습자 개선 설명 |
| docs/qa/manual-accessibility-checklist.md | VoiceOver 항목을 제외한 키보드·ARIA·모바일·확대·모션·인쇄 점검표 |
| src/test/releaseReadiness.test.ts | 문서에 HVC 링크·파비콘·VoiceOver 제외 범위가 반영됐는지 검증 |
| tests/e2e/learner-flow.spec.ts | 실제 학습 흐름의 표현·보고서·재방문 검증 |
| tests/e2e/responsive-motion.spec.ts | 375px·640px·모션 감소와 동적 토글 이름 검증 |
| tests/e2e/privacy-print.spec.ts | 내부 ID 비노출, 파비콘 응답, 인쇄·저장 경계 검증 |
| tests/e2e/accessibility.spec.ts | 기존 ARIA·탭·대화상자 흐름에 새 이름과 포커스 재방문 반영 |
| docs/qa/evidence/375-report.png | 개선된 완료 보고서의 실제 375px 시각 증거 |

## Interfaces and Data Contracts

    // src/content/learnerLabels.ts
    import type { CasePack, EvidenceCategory, NarrativeSentence } from '../model/case';
    import type { FeedbackStatus } from '../model/feedback';

    export const feedbackStatusLabels: Readonly<Record<FeedbackStatus, string>>;
    export const evidenceCategoryLabels: Readonly<Record<EvidenceCategory, string>>;
    export const perspectiveTagLabels: Readonly<Record<string, string>>;
    export const readingPreferenceLabels: Readonly<{
      fontSize: Readonly<Record<18 | 20 | 22, string>>;
      lineHeight: Readonly<Record<1.6 | 1.8 | 2, string>>;
    }>;
    export function sentenceReference(pack: CasePack, sentenceId: string): string;
    export function sentenceReferences(pack: CasePack, sentenceIds: readonly string[]): string;
    export function factReference(pack: CasePack, factId: string): string;
    export function rewriteBlockReference(pack: CasePack, blockId: string): string;
    export function sentenceOwner(pack: CasePack, sentence: NarrativeSentence): string;

    // src/content/reportCopy.ts
    export interface ReportLearningCopy {
      takeaway: string;
      nextStep: string;
    }

    export function createReportLearningCopy(narratorNames: readonly string[]): ReportLearningCopy;

    // App boundary for sentence re-entry
    type RevisitSentence = (sentenceId: string) => void;

    interface LensReaderProps {
      focusSentenceId?: string | null;
      onFocusConsumed?: () => void;
    }

## Sequential Implementation Tasks

### Task 1: Establish learner-facing labels and remove internal identifiers from feedback

**Files:**
- Create: src/content/learnerLabels.ts
- Create: src/content/learnerLabels.test.ts
- Modify: src/features/comparison/CrossExamination.tsx
- Modify: src/features/comparison/CrossExamination.test.tsx
- Modify: src/features/rewrite/PerspectiveRewrite.tsx
- Modify: src/features/rewrite/PerspectiveRewrite.test.tsx
- Modify: src/features/report/CaseReport.tsx
- Modify: src/features/report/CaseReport.test.tsx
- Modify: src/app/AppShell.test.tsx (cross-component accessible-name contract)

**Interfaces:**
- Consumes: CasePack, NarrativeSentence, FeedbackStatus, EvidenceCategory from src/model; existing ComparisonFeedback and RewriteFeedback ID arrays.
- Produces: feedbackStatusLabels, evidenceCategoryLabels, perspectiveTagLabels, sentenceReference, sentenceReferences, factReference, rewriteBlockReference, and sentenceOwner for all learner-facing components.

- [ ] Step 1: Write the failing label and rendering tests.

Add these assertions to src/content/learnerLabels.test.ts and the named component tests:

    it('turns a sentence ID into a narrator and sentence number', () => {
      expect(sentenceReference(missingUmbrellaTag, 'mut-a-4')).toBe('가람 문장 4');
      expect(sentenceReference(missingUmbrellaTag, 'unknown-id')).toBe('근거 문장');
    });

    it('uses Korean feedback labels instead of domain status tokens', () => {
      expect(feedbackStatusLabels.supported).toBe('잘 연결했어요');
      expect(feedbackStatusLabels['partially-supported']).toBe('조금 더 연결해 봐요');
      expect(feedbackStatusLabels.revise).toBe('다시 살펴봐요');
    });

In CrossExamination.test.tsx, render a supported draft and assert that the feedback includes 잘 연결했어요, includes 가람 문장 1, and does not include 근거 문장 ID or a case-prefix identifier. In PerspectiveRewrite.test.tsx, render a contradictory block and assert that the feedback uses the block text rather than its internal identifier. In CaseReport.test.tsx, assert that report evidence and reason buttons use 가람 근거 문장 4 다시 보기 style text and no internal ID appears in the rendered report.

- [ ] Step 2: Run only the new and affected tests to verify the failure.

Run:

    npm test -- src/content/learnerLabels.test.ts src/features/comparison/CrossExamination.test.tsx src/features/rewrite/PerspectiveRewrite.test.tsx src/features/report/CaseReport.test.tsx

Expected: FAIL because the label module is absent and the existing components still render supported, 근거 문장 ID, and raw block/sentence IDs.

- [ ] Step 3: Implement the smallest shared label module.

Implement the exact maps and helpers below without changing domain IDs:

    export const feedbackStatusLabels = Object.freeze({
      supported: '잘 연결했어요',
      'partially-supported': '조금 더 연결해 봐요',
      revise: '다시 살펴봐요',
    });

    export const evidenceCategoryLabels = Object.freeze({
      observation: '관찰 사실',
      inference: '인물의 추론',
      evaluation: '평가 표현',
    });

    export const perspectiveTagLabels = Object.freeze({
      seen: '보이는 정보를 살핀 관점',
      inference: '추론한 내용을 살핀 관점',
      careful: '차분하게 확인한 관점',
      neutral: '중립적으로 정리한 관점',
      sequence: '시간 순서를 살핀 관점',
      quick: '빠르게 핵심을 잡은 관점',
    });

sentenceReference must search narrator order, return narrator display name plus 문장 plus number, and return 근거 문장 for an unknown ID. sentenceReferences joins valid references with · and returns 없음 for an empty list. factReference returns the matching neutral-record or rewrite-block text and otherwise 기록된 사실; rewriteBlockReference returns matching block text and otherwise 문장 블록; sentenceOwner returns the narrator display name or 서술자.

Update CrossExamination so ComparisonFeedbackPanel renders the Korean status label, the existing message, and 근거 문장 followed by formatted references. Update InitialThought to show 연결한 근거 with formatted references. Update supporting-checkbox aria-label to 근거 문장 · 가람 문장 4 or 이유 문장 · 가람 문장 4 without IDs.

Pass pack to FeedbackRows in PerspectiveRewrite. Map preserved fact IDs through factReference, matched tags through perspectiveTagLabels, and contradictory block IDs through rewriteBlockReference. Keep the labels 보존한 사실, 빠진 사실 묶음, 맞은 관점 표지, 모순된 블록.

Replace CaseReport local fallback maps with the shared helpers. SentenceRevisit must never concatenate an unknown ID into visible text; use 근거 문장 다시 보기 as its fallback label.

- [ ] Step 4: Run the affected tests and verify the learner-facing contract passes.

Run the command from Step 2. Expected: all affected tests PASS, visible status text is Korean, and no rendered learner-facing region contains 근거 문장 ID, 연결한 근거 문장 ID, or a case-prefix identifier.

- [ ] Step 5: Run the full unit suite before moving to the next task.

Run:

    npm test

Expected: every existing test plus the new label tests PASS; no reducer, evaluator, persistence, or case-pack contract changes are required.

### Task 2: Make sentence context, toggle state, progress, and reading settings obvious to children

**Files:**
- Modify: src/components/SentenceCard.tsx
- Modify: src/components/SentenceCard.test.tsx
- Modify: src/features/lenses/LensReader.tsx
- Modify: src/features/lenses/LensReader.test.tsx
- Modify: src/features/evidence/EvidenceBoard.tsx
- Modify: src/features/evidence/EvidenceBoard.test.tsx
- Modify: src/features/settings/ReadingSettings.tsx
- Modify: src/features/settings/ReadingSettings.test.tsx
- Modify: src/styles/layout.css
- Modify: src/styles/layout.test.ts
- Modify: tests/e2e/learner-flow.spec.ts
- Modify: tests/e2e/responsive-motion.spec.ts
- Modify: tests/e2e/privacy-print.spec.ts
- Modify: tests/e2e/accessibility.spec.ts

**Interfaces:**
- Consumes: SentenceCardProps, NarrativeSentence, CasePack, ReadingPreferences, and sentenceOwner from Task 1.
- Produces: optional contextLabel on SentenceCardProps; a sentence button name composed of context plus 문장 number; dynamic 읽음 표시/읽음 취소 and 중요 문장 표시/중요 표시 취소; an accessible evidence progress string 분류 완료 count / total.

- [ ] Step 1: Write failing tests for context and stateful labels.

Add to SentenceCard.test.tsx:

    render(<SentenceCard sentence={sentence} mode="mark-important" pressed onToggle={() => undefined} contextLabel="가람" />);
    expect(screen.getByRole('button', { name: '중요 표시 취소' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('group', { name: '가람 문장 1' })).toBeInTheDocument();

Add to LensReader.test.tsx assertions that a read lens exposes 읽음 취소, a marked sentence exposes 중요 표시 취소, and an unmarked sentence keeps 중요 문장 표시. Add to EvidenceBoard.test.tsx an assertion for 분류 완료 0 / 10 before selection and 분류 완료 1 / 10 after the first supported record. Add to ReadingSettings.test.tsx assertions for 작게, 보통, 크게, 촘촘하게, 넉넉하게, and 아주 넉넉하게, while checking the selected numeric preference value remains unchanged.

- [ ] Step 2: Run only the new tests to verify the failure.

Run:

    npm test -- src/components/SentenceCard.test.tsx src/features/lenses/LensReader.test.tsx src/features/evidence/EvidenceBoard.test.tsx src/features/settings/ReadingSettings.test.tsx

Expected: FAIL because the current cards use 문장 number without narrator context, toggle text is static, progress only says 10개 문장, and settings display raw numeric values.

- [ ] Step 3: Implement the smallest UI changes.

Add contextLabel?: string to SentenceCardProps; derive the accessible label from contextLabel and sentence.number and use it for the group and classification button accessible name. Keep data-sentence-id and all stored IDs unchanged.

In LensReader, pass contextLabel equal to lens.displayName. Render 읽음 취소 when isRead and 읽음 표시 otherwise. Render 중요 표시 취소 when pressed and 중요 문장 표시 otherwise. Keep aria-pressed synchronized with the same booleans.

In EvidenceBoard, build a Map from sentence ID to narrator name, pass that context to SentenceCard, calculate supportedCount with selectionIsSupported, and render a polite live span reading 분류 완료 supportedCount / sentences.length in the legend. Keep the 10개 문장 fact as a visually secondary label only if it remains useful.

In ReadingSettings, define typed option arrays with the existing numeric values and these labels: font size 18 maps to 작게, 20 to 보통, 22 to 크게; line height 1.6 maps to 촘촘하게, 1.8 to 넉넉하게, 2 to 아주 넉넉하게; reading width labels stay 좁은 읽기 폭 and 표준 읽기 폭. Render the human label first and the exact numeric value as a visually secondary small element.

Add CSS only for the progress label and the secondary setting value; preserve the existing 44px minimum hit areas, gi-pulse, reduced-motion rules, and the P0 narrative-sentence display block/min-width contract.

- [ ] Step 4: Run affected tests and confirm no single action loses its pulse.

Run the command from Step 2. Expected: PASS; after a read/important toggle, only the appropriate stage action button can carry gi-pulse, and the toggle itself never receives gi-pulse.

- [ ] Step 5: Update browser locators and run the focused E2E checks.

Use state-aware locators, for example:

    const unread = page.getByRole('button', { name: '읽음 표시', exact: true });
    const read = page.getByRole('button', { name: '읽음 취소', exact: true });
    const important = page.getByRole('button', { name: /중요 (문장 )?표시( 취소)?$/, exact: true });

Run:

    npx playwright test tests/e2e/accessibility.spec.ts tests/e2e/responsive-motion.spec.ts tests/e2e/learner-flow.spec.ts tests/e2e/privacy-print.spec.ts

Expected: PASS at 375px and 640px, no horizontal overflow, no utility/action overlap, correct tab semantics, and the full learner flow reaches the report.

### Task 3: Add a learner-facing report takeaway and sentence-specific re-entry

**Files:**
- Create: src/content/reportCopy.ts
- Create: src/content/reportCopy.test.ts
- Modify: src/domain/buildCaseReport.ts
- Modify: src/domain/buildCaseReport.test.ts
- Modify: src/features/report/CaseReport.tsx
- Modify: src/features/report/CaseReport.test.tsx
- Modify: src/features/lenses/LensReader.tsx
- Modify: src/features/lenses/LensReader.test.tsx
- Modify: src/app/AppShell.tsx
- Modify: src/app/StageRenderer.tsx
- Modify: src/app/AppShell.test.tsx
- Modify: src/styles/components.css
- Modify: tests/e2e/learner-flow.spec.ts
- Modify: tests/e2e/accessibility.spec.ts
- Modify: docs/qa/evidence/375-report.png

**Interfaces:**
- Consumes: CasePack.narrators, existing report model, StageId, and SentenceRevisit callbacks.
- Produces: CaseReportModel.learningTakeaway, CaseReportModel.nextStep, createReportLearningCopy, onRevisitSentence(sentenceId), LensReaderProps.focusSentenceId, and LensReaderProps.onFocusConsumed.

- [ ] Step 1: Write failing report-copy, model, and re-entry tests.

Add to reportCopy.test.ts:

    const copy = createReportLearningCopy(['가람', '다온']);
    expect(copy.takeaway).toContain('가람과 다온');
    expect(copy.takeaway).toContain('위치·관심·목적');
    expect(copy.nextStep).toContain('무엇을 보았지?');
    expect(copy.nextStep).toContain('무엇을 추측했지?');

Extend buildCaseReport.test.ts to assert learningTakeaway and nextStep are non-empty, contain both narrator names, and remain strings when the report is cloned. Add to CaseReport.test.tsx assertions for headings 오늘 배운 점 and 다음에 해 볼 일, plus a click on a 가람 이유 문장 4 다시 보기 button that calls onRevisitSentence with mut-a-4.

Add to LensReader.test.tsx a controlled render with focusSentenceId equal to mut-b-4; assert the active tab is 렌즈 B, the target sentence button receives focus, and onFocusConsumed is called once. Add to AppShell.test.tsx a completed session render, click a report evidence button, and assert the stage becomes lenses while the target sentence is the focus request.

- [ ] Step 2: Run the new tests to verify the failure.

Run:

    npm test -- src/content/reportCopy.test.ts src/domain/buildCaseReport.test.ts src/features/report/CaseReport.test.tsx src/features/lenses/LensReader.test.tsx src/app/AppShell.test.tsx

Expected: FAIL because the report model has no learning fields, the report has no takeaway sections, and report buttons only dispatch a stage without a sentence target.

- [ ] Step 3: Implement the copy and report model fields.

Create createReportLearningCopy with exact behavior:

    export function createReportLearningCopy(narratorNames: readonly string[]): ReportLearningCopy {
      const first = narratorNames[0] ?? '첫 번째 서술자';
      const second = narratorNames[1] ?? '두 번째 서술자';
      return {
        takeaway: first + '과 ' + second + '의 글을 비교하며, 같은 사건도 본 위치·관심·목적에 따라 다르게 표현할 수 있고 사실과 생각을 근거로 나눌 수 있다는 점을 배웠어요.',
        nextStep: '다음 글을 읽을 때 “무엇을 보았지?”, “무엇을 중요하게 여겼지?”, “무엇을 추측했지?”를 차례로 물어보세요.',
      };
    }

Add the two fields to CaseReportModel, call the helper in buildCaseReport, and preserve all existing validation and clone behavior. In CaseReport, add two case-report__section blocks before 남은 질문, each with a labelled h2 and a case-report__intro paragraph using the corresponding model field. The shared report body keeps both sections in print mode, and components.css must allow the paragraphs to wrap at 375px without horizontal overflow.

- [ ] Step 4: Implement sentence-specific re-entry without changing session storage.

Add onRevisitSentence to CaseReportProps and StageRendererProps. In AppShell, store focusSentenceId as string or null, define a callback that sets the ID and dispatches REVISIT_STAGE for lenses, and define a stable consume callback that clears the ID. Pass both values through StageRenderer to LensReader. SentenceRevisit invokes onRevisitSentence for interactive report references; print mode continues to render a non-button reference. Keep onRevisitStage comparison for incomplete-report recovery.

In LensReader, accept focusSentenceId and onFocusConsumed. In an effect, find the narrator containing the target by comparing sentence.id values, select that narrator tab if needed, then on the next effect pass locate the matching element by comparing dataset.sentenceId values, call scrollIntoView with block center, focus its first button with preventScroll true, and call onFocusConsumed. If the ID is unknown or the button is absent, call onFocusConsumed without throwing. Do not use CSS.escape, direct URL query parameters, or new storage keys.

- [ ] Step 5: Run affected tests and verify the final screen is actionable.

Run the command from Step 1. Expected: PASS; the report explains what was learned and what to do next, and a report reference opens the exact narrator tab and sentence instead of landing at the top of the lenses stage.

- [ ] Step 6: Run the full learner-flow browser test and refresh the report evidence.

Run:

    npx playwright test tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts

Expected: PASS with no gi-pulse on the report, no visible internal IDs, visible 오늘 배운 점 and 다음에 해 볼 일, and successful sentence re-entry. Capture the completed 375×812 report to docs/qa/evidence/375-report.png only after the browser assertions pass; inspect the image dimensions and confirm both new sections are readable.

### Task 4: Fix release-facing polish, update history, and align documentation with the verification boundary

**Files:**
- Create: public/favicon.svg
- Modify: index.html
- Modify: src/content/updateHistory.ts
- Modify: src/content/updateHistory.test.ts
- Modify: src/features/updates/UpdateHistoryDialog.test.tsx
- Modify: README.md
- Modify: docs/qa/manual-accessibility-checklist.md
- Modify: src/test/releaseReadiness.test.ts
- Modify: tests/e2e/privacy-print.spec.ts
- Modify: tests/e2e/responsive-motion.spec.ts

**Interfaces:**
- Consumes: existing Vite relative base ./, update-history type UpdateEntry, the three local storage keys, and the current GitHub Pages path.
- Produces: a no-network favicon.svg, a documented HVC link, a dated improvement entry, and a 12-row verification checklist that excludes VoiceOver while retaining keyboard/ARIA coverage.

- [ ] Step 1: Write failing release-document and favicon tests.

Extend src/test/releaseReadiness.test.ts with:

    expect(readme).toContain('https://wbmaker2.github.io/perspective-lens-case-room/');
    expect(readme).toContain('VoiceOver 검증 제외');
    expect(readme).toContain('favicon.svg');
    expect(checklist).not.toContain('VoiceOver');
    expect(checklist).toContain('포커스 표시·44px 조작 영역');

Extend updateHistory.test.ts with:

    expect(updateHistory[0]).toMatchObject({
      date: '2026-08-28',
      category: '개선',
      summary: '375px 렌즈 문장 가로 배치, 학습자 표현 정리, 보고서 배운 점·다음 행동, 문장 재방문 초점, 파비콘 추가',
    });

Update `src/features/updates/UpdateHistoryDialog.test.tsx` to expect the current twelve update rows while preserving the existing case-group and raw-ID assertions.

Add a privacy-print.spec.ts assertion that requests new URL('favicon.svg', page.url()) and receives HTTP 200 with an SVG content type. Keep the existing no-external-request and print assertions.

- [ ] Step 2: Run only the release-document tests to verify the failure.

Run:

    npm test -- src/test/releaseReadiness.test.ts src/content/updateHistory.test.ts

Expected: FAIL because the README still mentions VoiceOver as a completed check, the checklist contains a VoiceOver row, the favicon link/file is absent, and the 2026-08-28 history row is absent.

- [ ] Step 3: Implement the favicon, dated history, and documentation changes.

Create public/favicon.svg as a self-contained 64×64 SVG with a paper background, navy circular outline, and teal PL letters. Do not reference external fonts, images, or scripts. Add a relative favicon link to index.html so Vite base ./ works locally and under the repository path.

Prepend the literal 2026-08-28 improvement entry to src/content/updateHistory.ts with the exact summary from Step 1.

Update README's verification paragraph to name 375px, 640px, 200%, keyboard-only, ARIA/axe, reduced motion, and A4 print; add the exact HVC link as a Markdown link; state VoiceOver 검증 제외 without claiming assistive-technology completion. Keep the four case IDs, three storage keys, no-server/no-AI/no-analytics boundaries, and update-history maintenance instructions.

Replace the checklist's VoiceOver row with 포커스 표시·44px 조작 영역 and retain exactly 12 checked rows: landmarks/headings, lens tabs/arrows, sentence context/status, polite feedback, dialog Escape/focus, keyboard-only completion, 375×812, 200% zoom, reduced motion, A4 print, safety/privacy, and focus/hit targets. The header must state the concrete existing environment and VoiceOver 검증 제외.

- [ ] Step 4: Run the release-document tests and favicon E2E test.

Run the commands from Steps 2 and the focused privacy-print.spec.ts test. Expected: PASS; the favicon request is 200, the checklist has 12 rows without VoiceOver, the README contains the HVC URL, and the newest update entry is dated 2026-08-28.

### Task 5: Complete the integrated quality gate and learner-facing evidence review

**Files:**
- Modify: tests/e2e/learner-flow.spec.ts
- Modify: tests/e2e/accessibility.spec.ts
- Modify: tests/e2e/responsive-motion.spec.ts
- Modify: tests/e2e/privacy-print.spec.ts
- Modify: tests/e2e/evidence-capture.spec.ts
- Modify: src/test/releaseReadiness.test.ts
- Modify: README.md
- Modify: docs/qa/evidence/375-report.png
- Verify: src/styles/layout.css, src/styles/components.css, all source, test, and style files

**Interfaces:**
- Consumes: all contracts from Tasks 1–4 and the existing playwright.config.ts base URL.
- Produces: reproducible local evidence that the app is understandable at a child-sized viewport, preserves privacy boundaries, and is ready for a separately requested release.

- [ ] Step 1: Add the integrated assertions before running the gate.

In the full learner-flow E2E, assert the report contains 오늘 배운 점, 다음에 해 볼 일, and no case-prefix ID pattern in visible text. Assert a report sentence button sends the user to the matching narrator tab and focused sentence. In responsive E2E, assert document scroll width is no greater than client width at 375px and 640px, every visible action control is at least 44px, the utility group does not overlap the current action, and reduced motion gives animation-name none, outline width at least 3px, and visible guidance. In privacy/print E2E, assert no input requests a student name, no network request leaves the page origin, print hides interactive controls, and favicon returns 200. Update `tests/e2e/evidence-capture.spec.ts` to use the current context-aware, state-aware learner locators so the evidence flow exercises the same public contract as the learner-flow spec.

- [ ] Step 2: Run the complete local command sequence.

Run:

    npm ci
    npm test
    npm run typecheck
    npm run lint
    npm run lint:filesize
    npm run build
    npx playwright test
    git diff --check

Expected: clean dependency verification, all Vitest files and tests PASS, TypeScript and ESLint PASS, the file-length script reports every checked file at 499 lines or fewer, Vite emits dist/index.html and local assets, all Playwright specs PASS, and git diff --check prints no errors. If a macOS browser process fails before a product assertion, rerun only in the configured clean browser/CI environment and record the environment failure separately from the app result.

- [ ] Step 3: Capture and inspect the learner report evidence.

Run the production preview on an unused local port:

    npm run preview -- --host 127.0.0.1 --port 4175

Use the browser test flow at 375×812 to reach the report and save docs/qa/evidence/375-report.png at CSS scale. Inspect the PNG dimensions, confirm the two new report sections are visible, confirm no horizontal clipping, and stop the preview server. Do not claim VoiceOver validation.

- [ ] Step 4: Run the final consistency searches.

Run:

    rg -n "supported|partially-supported|근거 문장 ID|연결한 근거 문장 ID|mut-|psb-|cna-|lws-|VoiceOver|작성 예정|미완성" src tests README.md docs/qa

Expected: domain/test fixture occurrences remain only where they are required for machine contracts; no raw status or case-prefix ID appears in learner-facing JSX; VoiceOver appears only in the explicit exclusion statement; no provisional wording appears in completed documentation.

- [ ] Step 5: Review the change set without committing it.

Run:

    git status --short --branch
    git diff --stat
    git diff --check

Expected: only the planned source, test, documentation, favicon, and evidence files are changed on codex/fix-lens-layout (or a separately named improvement branch); no package installation side effects, generated cache, or unrelated user file is included. Commit, push, and GitHub Pages deployment remain separate actions that require an explicit release request.

## TDD and Review Order

Each task follows the same review gate: failing test → observed failure → minimum implementation → focused passing tests → broader regression tests → visual/browser evidence. Review Task 1 before Task 2, Task 2 before Task 3, Task 3 before Task 4, and Task 4 before Task 5. A task is not considered complete when only its component test passes; its learner-facing text, keyboard behavior, mobile layout, privacy boundary, and existing gi-pulse contract must remain intact.

## Future Commit Sequence

These are future commands to run only after the implementation and review are accepted:

    git add src/content/learnerLabels.ts src/content/learnerLabels.test.ts src/features/comparison/CrossExamination.tsx src/features/comparison/CrossExamination.test.tsx src/features/rewrite/PerspectiveRewrite.tsx src/features/rewrite/PerspectiveRewrite.test.tsx src/features/report/CaseReport.tsx src/features/report/CaseReport.test.tsx src/app/AppShell.test.tsx
    git commit -m "fix: replace internal feedback labels for learners"

    git add src/components/SentenceCard.tsx src/components/SentenceCard.test.tsx src/features/lenses/LensReader.tsx src/features/lenses/LensReader.test.tsx src/features/evidence/EvidenceBoard.tsx src/features/evidence/EvidenceBoard.test.tsx src/features/settings/ReadingSettings.tsx src/features/settings/ReadingSettings.test.tsx src/styles/layout.css src/styles/layout.test.ts tests/e2e/learner-flow.spec.ts tests/e2e/responsive-motion.spec.ts tests/e2e/privacy-print.spec.ts tests/e2e/accessibility.spec.ts
    git commit -m "fix: clarify sentence controls and reading progress"

    git add src/content/reportCopy.ts src/content/reportCopy.test.ts src/domain/buildCaseReport.ts src/domain/buildCaseReport.test.ts src/features/report/CaseReport.tsx src/features/report/CaseReport.test.tsx src/features/lenses/LensReader.tsx src/features/lenses/LensReader.test.tsx src/app/AppShell.tsx src/app/StageRenderer.tsx src/app/AppShell.test.tsx src/styles/components.css tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts docs/qa/evidence/375-report.png
    git commit -m "feat: add learner report takeaway and sentence reentry"

    git add public/favicon.svg index.html src/content/updateHistory.ts src/content/updateHistory.test.ts src/features/updates/UpdateHistoryDialog.test.tsx README.md docs/qa/manual-accessibility-checklist.md src/test/releaseReadiness.test.ts tests/e2e/privacy-print.spec.ts tests/e2e/responsive-motion.spec.ts
    git commit -m "docs: align learner release evidence and add favicon"

    git add tests/e2e/learner-flow.spec.ts tests/e2e/accessibility.spec.ts tests/e2e/responsive-motion.spec.ts tests/e2e/privacy-print.spec.ts tests/e2e/evidence-capture.spec.ts src/test/releaseReadiness.test.ts README.md docs/qa/evidence/375-report.png
    git commit -m "test: verify elementary learner improvements"

Expected after each future commit: the focused test set for that task is green, git diff --check is clean, and no remote operation has occurred. A later explicit release request may push the accepted branch to the configured GitHub repository, wait for the Pages workflow, verify the public learner path, and report the clickable HVC URL:

관점 렌즈 사건실 HVC 확인 링크: https://wbmaker2.github.io/perspective-lens-case-room/

## Plan Self-Review Record — 2026-08-28

| 확인 항목 | 확인 결과 |
| --- | --- |
| 설계 요구사항 | 두 관점 비교, 사실·추론·평가 분류, 근거 연결, 복수 타당 답, 안전·개인정보 경계, 결과 보고서, 모바일·키보드·모션 감소, 업데이트 기록을 각각 Task 1–5에 연결했다. Task 4의 업데이트 행 교차 테스트와 Task 5의 evidence-capture 로케이터도 실제 파일 목록에 반영했다. |
| 초등학생 실사용성 | raw 상태·ID를 숨기고, 서술자 이름이 붙은 문장 번호, 동적 버튼 이름, 완료 수, 배운 점, 다음 행동, 정확한 문장 재방문을 추가했다. |
| 접근성 범위 | ARIA 역할·이름·상태, 키보드, 44px 조작 영역, focus-visible, 모션 감소를 자동 검증하며 VoiceOver 구현·검증은 새 지침에 따라 제외했다. |
| 개인정보·안전 | 새 입력·저장·네트워크 경로를 만들지 않고, 기존 로컬 저장 키와 허구 사건 문구를 유지한다. |
| 파일 경계 | 새 라벨·보고서 문구를 별도 파일로 분리하고 모든 변경 파일에 500줄 미만 검사를 지정했다. |
| 자리표시자 점검 | 각 단계에 실제 경로, 타입·함수명, 테스트 대상, 명령, 예상 결과, 커밋 메시지를 적었으며 미완성 지시 문구를 남기지 않았다. |
| 명명 일관성 | sentenceReference, sentenceReferences, factReference, rewriteBlockReference, createReportLearningCopy, focusSentenceId 이름을 후속 작업에서 동일하게 사용한다. |
