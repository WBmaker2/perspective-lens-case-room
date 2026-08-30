# Education Web App Redesign — Audit Log

## 감사 범위

- 대상: `관점 렌즈 사건실` 공개 Pages 앱과 현재 checkout
- 초기 기준선: 2026-08-29 · 재감사: 2026-08-30 (KST)
- 화면: 공개 시작 화면 1440×900, 375×812, 저장소의 375px 사건 접수·근거·보고서 증거
- 코드: `src/app`, `src/components`, `src/features`, `src/content`, `src/domain`, `src/styles`
- 자동 기준선: 초기 `npm test` 38개 파일/152개 테스트 PASS, `npm run typecheck` PASS, `npm run lint` PASS, `npm run lint:filesize` PASS
- 규칙 문서: 프로젝트 루트에는 `AGENTS.md`, `EDUCATION_DESIGN.md`가 없었고, 이번 재감사에서 `PRODUCT.md`, `design-system/MASTER.md`를 작성·확인함
- 지원 역할: `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects`, `imagegen`의 지침을 읽고 적용함. UI Pro Max 디자인 시스템·UX·React 검색과 승인 comp 검토 결과는 2026-08-30 섹션에 기록함

## 학습 목표와 흐름 확인

현재 앱은 초등 5~6학년 국어의 관점 비교 목표에 맞게 네 허구 사건을 제공한다. 학습 흐름은 `사건 접수 → 렌즈 A/B → 근거 보드 → 교차 조사 → 관점 전환 → 사건 보고서`로 연결되고, `sessionReducer`가 게이트를 관리한다. 사실·추론·평가 분류, 중립 기록 지연 공개, 최초/수정 비교, 블록 기반 다시 쓰기, 로컬 메모 저장, 교사용 인쇄 보기는 유지할 가치가 높은 기반이다.

## 발견 사항

### P1 — 다시 쓰기 화면에 내부 블록 ID가 학습자에게 노출됨

- 근거: `src/features/rewrite/PerspectiveRewrite.tsx`가 각 블록 아래에 `<small className="rewrite-block__id">{block.id}</small>`를 렌더링하고, 넣기·이동·빼기 버튼의 `aria-label`에도 `(${block.id})`를 붙인다.
- 영향: 초등 학습자에게 의미 없는 문자열이 보이고, 앱이 약속한 내부 ID 비노출·개인정보 최소화 인상을 깨뜨린다. 화면을 읽는 사용자는 문장보다 시스템 식별자를 먼저 듣게 된다.
- 수정: 화면에서는 블록 문장과 행동만 보여 주고, `data-block-id`와 제어용 DOM ID만 상태 연결을 위해 유지한다. 접근 가능한 이름은 `블록 넣기: {문장}` 형식으로 통일한다.
- 합격 조건: 렌더된 텍스트와 접근 가능한 이름에 `rewrite-`, `block-`, 사건 내부 ID가 없고, 기존 reducer·판정 테스트는 그대로 통과한다.

### P1 — 현재 단계와 다음 행동의 전역 안내가 약함

- 근거: `src/components/ProgressSteps.tsx`는 활성 단계에만 `aria-current="step"`를 설정하고 이전 단계 완료 여부나 남은 단계를 텍스트로 보여 주지 않는다. `src/app/AppShell.tsx`에는 단계별 공통 `현재 단계 n/6` 안내가 없다.
- 영향: 긴 화면을 스크롤하는 어린 학습자가 지금 어디에 있는지와 얼마나 남았는지를 매번 제목과 상단 메뉴를 다시 해석해야 한다.
- 수정: 공통 `StageStatus`를 추가해 단계 번호·단계명·짧은 현재 행동을 보여 주고, 이전 단계는 `완료` 상태로 구분한다. 현재 단계만 `aria-current`로 유지한다.
- 합격 조건: 시작 화면에서 `현재 단계 1/6`과 다음 행동이 보이고, 보고서 화면에서 1~5단계가 완료 상태로 표현되며, 단계 전환 로직은 변하지 않는다.

### P1 — 사건 선택 카드가 제목과 반복 버튼에 머물러 초점 파악이 늦음

- 근거: `src/features/intake/CaseIntake.tsx`의 사건 선택 카드는 `pack.title`과 `사건 선택/선택됨`만 표시한다. `focusQuestion`은 선택 뒤에만 보인다. 실제 375px 화면에서 네 카드가 세로로 길게 이어진 뒤 선택한 사건의 질문을 다시 읽게 된다(`docs/qa/evidence/375-intake.png`).
- 영향: 학습자가 사건을 고를 때 무엇을 살펴볼 이야기인지 비교하기 어렵고, 첫 행동 CTA가 화면 아래로 밀린다.
- 수정: 기존 `focusQuestion`에서 짧은 `이번 사건에서 볼 점`을 카드 안에 함께 표시하고, 사건과 첫 생각이 비었을 때 구체적인 게이트 안내를 제공한다.
- 합격 조건: 각 카드에 질문 요약이 있고, 선택 전에도 카드의 접근 가능한 이름이 제목과 초점을 포함하며, 모바일에서 카드와 CTA가 세로 순서로 읽힌다.

### P2 — 단계별 진행 수가 서로 다른 밀도로 표시됨

- 근거: `EvidenceBoard`에는 `분류 완료 n / 10`이 있으나, `CrossExamination`과 `PerspectiveRewrite`에는 현재 선택 수를 한눈에 보여 주는 공통 진행 표시가 없다. 비교 화면은 세 fieldset과 긴 근거 목록이 같은 시각적 무게를 가진다.
- 영향: 학생이 무엇을 더 골라야 하는지 문장 하단의 안내를 읽기 전까지 알기 어렵다.
- 수정: 비교 화면에 공통 사실·다른 표현·빠진 정보와 근거 선택의 현재 수를 작게 표시하고, 기존 게이트/판정 결과와 일치시킨다. 다시 쓰기 화면은 기존 피드백을 유지하되 문장 블록 중심으로 시각 순서를 정리한다.
- 합격 조건: 선택 전/후 숫자가 실제 상태와 일치하고, 복수 타당 답과 기존 평가 메시지가 변하지 않는다.

### P2 — 전역 표면과 상태 스타일이 파일 사이에 흩어짐

- 근거: `src/styles/tokens.css`에 정의된 색상과 `layout.css`·`components.css`의 직접 색상값이 함께 사용된다. 카드·필드셋·피드백·유틸리티가 모두 종이색 표면이지만 경계·간격 규칙이 조금씩 다르다.
- 영향: 화면마다 카드의 밀도와 강조가 달라지고, 새 상태를 추가할 때 대비·모션 규칙을 반복해서 판단해야 한다.
- 수정: `design-system/MASTER.md`에 토큰과 상태 규칙을 기록하고, 기존 색상 체계를 유지한 채 공통 표면·경계·간격 토큰을 우선 사용한다.
- 합격 조건: 라이트 모드, 주황 포커스, 청록 행동, `gi-pulse`, 44px 조작 영역이 유지되고 색상만으로 상태를 구분하지 않는다.

### P2 — 고정 학습 도구가 CTA와 같은 시각적 무게를 가짐

- 근거: `src/styles/layout.css`의 `.utility-group`은 모든 화면에서 하단 고정이며 세 버튼이 동일한 pill 형태다. 현재 `StageActionButton`은 겹침을 감지해 스크롤을 보정하지만, 좁은 화면에서는 도구 모음이 학습 행동보다 먼저 눈에 들어온다.
- 영향: 학생이 `읽기 설정/업데이트 내역/교사용 활동 요약`과 현재 학습 CTA를 혼동할 수 있다.
- 수정: 도구 모음은 보조 표면으로 낮추고, 현재 필수 CTA에는 일관된 `gi-pulse`와 안내 문장을 유지한다. 기존 겹침 보정과 safe-area 여백은 보존한다.
- 합격 조건: 375px·640px에서 CTA와 도구 모음이 겹치지 않고, 도구 버튼은 `gi-pulse`를 받지 않으며, reduced-motion에서는 CTA가 정적 윤곽선으로 보인다.

## 잘 작동하는 기반

- 사건 원문은 모두 허구이며 실제 인물 평가를 요구하지 않는다는 안전 문구가 시작 화면에 있다.
- 도메인 평가가 문장·사실 근거와 연결되어 있고 자유 글 AI 채점, 서버 전송, 분석 SDK가 없다.
- `SentenceCard`, 렌즈 탭, 대화상자, 고정 CTA에 ARIA 이름과 `:focus-visible` 계약이 이미 있다.
- 기존 테스트는 키보드, 375/640px, reduced-motion, 인쇄, 저장 경계를 포함한다.
- `CaseIllustration`의 인라인 SVG는 사건 맥락을 설명하는 자산이며 외부 이미지가 아니다.

## 자산 감사의 초기 결론

`public/favicon.svg`는 정체성 자산, `src/components/CaseIllustration.tsx`의 SVG는 사건 맥락을 전달하는 개념 도식으로 분류한다. 사실·출처가 필요한 이미지가 아니지만 학습 맥락을 직접 전달하므로 자동 생성·교체하지 않는다. CSS `background`, `srcset`, 외부 이미지 import는 현재 검색에서 발견되지 않았다. 이번 리디자인에서는 이미지 생성과 자산 교체를 실행하지 않는다.

## 초기 수용 기준으로 이동한 P0/P1

현재 치명적 P0는 발견하지 않았다. 다음 P1을 구현 계획의 필수 게이트로 이동한다.

1. 다시 쓰기 화면의 내부 ID 비노출
2. 현재 단계·완료 단계·다음 행동 안내
3. 사건 카드 초점 질문과 비어 있는 첫 행동 안내

P2인 비교 진행 수·표면 토큰·유틸리티 위계는 P1 수정과 함께 회귀 없이 적용한다.

## 미확인 범위

- VoiceOver와 실제 보조공학 승인은 이 스킬의 범위에서 실행하지 않는다.
- 학생·교사의 실제 수업 관찰이나 콘텐츠 출처에 대한 사람 승인은 자동으로 주장하지 않는다.

## 최종 감사 — 2026-08-29

### 수정 확인

| 우선순위 | 확인 결과 | 근거 |
| --- | --- | --- |
| P1 내부 블록 ID 노출 | 해결 | `src/features/rewrite/PerspectiveRewrite.tsx`에서 학습자용 ID 텍스트와 `aria-label`의 ID를 제거했고, `src/features/rewrite/PerspectiveRewrite.test.tsx`와 네 사건 E2E가 문장 중심 이름을 확인합니다. `data-block-id`와 제어용 DOM ID는 상태 연결을 위해 남겼습니다. |
| P1 현재 단계 안내 | 해결 | `src/components/StageStatus.tsx`, `src/components/ProgressSteps.tsx`, `src/app/AppShell.tsx`가 현재 단계 번호·다음 행동·이전 단계 완료 상태를 제공합니다. 단위 테스트와 axe/키보드 E2E가 통과했습니다. |
| P1 사건 선택 맥락 | 해결 | `src/features/intake/CaseIntake.tsx` 카드에 사건별 `focusQuestion`과 선택 전·후 게이트 안내를 표시합니다. 375px 스냅샷과 사건 접수 테스트가 확인합니다. |
| P2 비교 진행 수 | 해결 | `src/features/comparison/CrossExamination.tsx`가 비교 항목 3종, 근거 문장, 수정 이유의 현재 수를 `비교 진행률` 상태로 알립니다. |
| P2 표면 토큰 | 해결 | 색상·상태·반경 토큰을 `src/styles/tokens.css`로 모으고 레이아웃·컴포넌트·인쇄 스타일이 공통 토큰을 사용합니다. |
| P2 도구 위계 | 해결 | `.utility-group`의 그림자와 표면을 보조 수준으로 낮추고, 단계 필수 버튼의 `gi-pulse`·reduced-motion 정적 윤곽선은 유지했습니다. |

### 최종 검증

- `npm test`: 39개 파일, 156개 테스트 PASS
- `npm run typecheck`: PASS
- `npm run lint`: PASS
- `npm run lint:filesize`: PASS, 검사 대상 소스 파일 499줄 이하
- `npm run build`: Vite production build PASS
- `npx playwright test`: 10개 테스트 PASS — 네 허구 사건 keyboard-only, axe, 375/640px 반응형·44px 조작 영역·고정 도구 겹침, reduced-motion, 개인정보·인쇄 경계, 증거 캡처
- `git diff --check`: PASS
- 로컬 브라우저 확인: 1440px 시작 화면과 375px 시작 화면에서 단계 안내·사건 초점 질문·고정 도구를 확인하고 콘솔 오류 0건을 확인했습니다.

### 자산·안전 결론

`work/education-webapp-redesign-assets.md`에 기록한 대로 기존 인라인 SVG와 파비콘을 유지했으며 새 이미지 생성·외부 요청·학생 식별 정보·음성 기능을 추가하지 않았습니다. VoiceOver, 실제 보조공학 승인, 실제 수업 관찰은 이 감사에서 확인하지 않았습니다.

## 재감사 — 2026-08-30

### 구현 대조

| 영역 | 확인 결과 | 근거 |
| --- | --- | --- |
| 공통 방향 안내 | 해결 | `src/components/StageStatus.tsx`와 `src/components/ProgressSteps.tsx`가 단계 번호·현재 행동·완료 상태를 제공하고 `src/app/AppShell.tsx`가 한 번만 배치함 |
| 사건 접수 맥락 | 해결 | `src/features/intake/CaseIntake.tsx` 카드가 네 사건의 `focusQuestion`을 선택 전부터 보여 주고 선택 전·후 상태를 구체적으로 알림 |
| 근거 보드 위계 | 해결 | `src/features/evidence/EvidenceBoard.tsx`가 두 렌즈 요약 rail, 분류 진행, 세 근거 종류 칸, 근거 모음을 문장 카드보다 먼저 읽을 수 있게 구성함 |
| 비교 진행 안내 | 해결 | `src/features/comparison/CrossExamination.tsx`가 비교 항목·근거·이유 선택 수를 실제 상태로 알림 |
| 다시 쓰기 ID 비노출 | 해결 | `src/features/rewrite/PerspectiveRewrite.tsx`의 화면·접근 가능한 이름에서 내부 ID를 제거하고 상태 연결용 `data-block-id`만 유지함 |
| 표면·반응형·모션 | 해결 | `src/styles/tokens.css`, `layout.css`, `components.css`, `motion.css`가 종이 표면·청록/주황 상태·44px 조작 영역·`gi-pulse`와 reduced-motion 정적 윤곽선을 적용함 |

### 리디자인 도구와 시각 검증

- 승인 방향 seed는 `99fd868c`이며 `.impeccable/mocks/perspective-lens-comp-stage-rail.png`를 북극성 comp로 선택했습니다. `.impeccable/mocks/`의 두 대안과 prompt sidecar는 비배포 참고 자료입니다.
- `build-phase.mjs` comps·spec·plates 단계는 통과했습니다. hero 대조는 61.7%로 72% 기준에 미달해 열린 상태이며 강제 통과하지 않았습니다. 차이는 콘텐츠의 실제 문장, 접근성 구조, 반응형 semantic reflow를 comp의 장식 픽셀로 대체하지 않은 결과와 섞여 있으므로 후속 시각 검토가 필요합니다.
- detector는 변경 UI 파일에 한 번 실행했고, 기존 accent border에 대한 advisory를 기록했습니다. 동일 검사를 반복하지 않았습니다.

### 최종 자동·브라우저 검증

- `npm test`: 39개 파일, 157개 테스트 PASS
- `npm run typecheck`, `npm run lint`, `npm run lint:filesize`, `npm run build`, `git diff --check`: 모두 PASS
- `npm run test:e2e`: 10개 테스트 PASS — 네 허구 사건 keyboard-only 완료, axe, 375/640px 무수평스크롤·44px 조작 영역, reduced-motion, 개인정보·인쇄 경계, 증거 캡처
- 승인 브라우저 세션: 1586×992 근거 보드와 375px 사건 접수 화면에서 읽기 순서와 무수평스크롤을 확인했고 콘솔 오류 0건

### 남은 사람 확인과 릴리스 경계

- VoiceOver·실제 보조공학 승인·학생/교사 수업 관찰·콘텐츠 출처에 대한 사람 승인은 이 감사에서 확인하지 않았습니다.
- 커밋·푸시·GitHub Pages 배포는 사용자 승인으로 완료했고, PR #1 병합 커밋 `8ed3872`와 Pages run `33293582641` 성공을 확인했습니다. HVC 등록은 실행하지 않았습니다.
