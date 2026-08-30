# Education Web App Redesign Report

검증일: 2026-08-30 (KST)

## 결과 요약

`관점 렌즈 사건실`의 기존 React/Vite 학습 흐름과 판정·저장·안전 경계를 유지하면서, 초등 5~6학년 학습자가 현재 위치와 다음 행동을 더 빨리 이해하도록 전체 화면 위계를 리디자인했습니다. 계획 문서의 P1 세 가지와 P2 세 가지를 구현하고, 승인한 `두 목소리의 편집 대본` 방향을 근거 보드까지 확장했습니다. 소스 코드·테스트·문서 파일은 기능별로 분리했습니다.

## 구현 내용

- `src/components/StageStatus.tsx`: 현재 단계 번호, 단계명, 선택한 사건, 다음 행동을 공통 안내 카드로 제공합니다.
- `src/components/ProgressSteps.tsx`: 이전 단계에는 `완료`, 현재 단계에는 `진행 중`, 이후 단계에는 `예정`을 표시하고 현재 단계만 `aria-current="step"`으로 남깁니다.
- `src/features/intake/CaseIntake.tsx`: 모든 사건 카드에 초점 질문을 표시하고 사건·첫 생각 게이트 문구를 제공합니다.
- `src/features/evidence/EvidenceBoard.tsx`: 두 렌즈 요약 rail, 분류 진행, 세 근거 종류 칸, 선택 문장 근거 모음을 추가해 분류 흐름을 한눈에 보여 줍니다.
- `src/features/comparison/CrossExamination.tsx`: 비교 항목, 근거 문장, 수정 이유의 선택 수를 `비교 진행률` 상태로 알립니다.
- `src/features/rewrite/PerspectiveRewrite.tsx`: 문장 블록의 내부 ID 텍스트와 접근 가능한 이름 노출을 제거하고 상태 연결용 `data-*`와 DOM ID만 유지합니다.
- `src/styles/tokens.css`, `src/styles/layout.css`, `src/styles/components.css`, `src/styles/print.css`: 라이트 팔레트·상태·표면 토큰을 정리하고 단계 헤딩·사건 카드·보조 도구의 위계를 다듬었습니다.
- `src/content/updateHistory.ts`: 실제 확인일 `2026-08-30` 개선 내역을 최신 행으로 추가했습니다.
- `README.md`, `PRODUCT.md`, `design-system/MASTER.md`, `work/education-webapp-redesign-audit.md`, `work/education-webapp-redesign-assets.md`, `work/education-webapp-redesign-surface-brief.md`: 리디자인 범위·토큰·자산·승인 comp·검증 경계를 기록했습니다.

## 자동 검증

| 명령 | 결과 |
| --- | --- |
| `npm test` | 39개 파일, 157개 테스트 PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run lint:filesize` | PASS, 검사 대상 소스 파일 499줄 이하 |
| `npm run build` | Vite production build PASS |
| `npm run test:e2e` | 10개 테스트 PASS |
| `git diff --check` | PASS |

Playwright 10개 테스트는 네 허구 사건의 keyboard-only 시작→보고서 흐름, axe 심각도 기준, 375px·640px 무수평스크롤과 44px 조작 영역, 고정 도구와 현재 CTA 겹침 방지, reduced-motion 정적 안내, 개인정보·저장·인쇄 경계, 증거 캡처를 포함합니다. QA PNG는 증거 캡처 결과로 갱신된 상태이며 학습 화면 자산과 분리해 관리합니다.

재검증 시 기본 `npm run test:e2e`의 4173 포트는 다른 프로젝트의 Vite preview가 사용 중이어서 서버 시작 단계에서 중단됐습니다. 다른 프로젝트 프로세스는 종료하지 않고, 이 프로젝트의 4174 preview를 재사용한 임시 설정으로 동일한 10개 E2E를 실행해 10개 모두 PASS를 확인했습니다. 포트 충돌은 앱 코드나 macOS Chromium 권한 오류와 별개의 로컬 실행 환경 상태입니다.

## 브라우저 확인

- 승인된 브라우저 세션의 Vite preview `http://127.0.0.1:4174/`에서 1586×992 근거 보드와 375px 사건 접수 화면을 확인했습니다. 1440×900 시작 화면은 앞선 재감사에서 확인했습니다.
- 시작 화면에서 단계 진행 줄, `현재 학습 단계` 카드, 사건별 초점 질문, 비어 있는 첫 행동 안내가 읽기 순서에 맞게 보입니다.
- 선택한 사건에서는 안내 카드에 사건명이 추가되고, 업데이트 내역 대화상자에는 `2026-08-30` 행이 최상단에 표시됩니다.
- 승인 브라우저 콘솔 오류는 0건이었고 375px에서 `scrollWidth === clientWidth`를 확인했습니다.
- `impeccable` comps/spec/plates는 통과했으며 hero comp 대조는 61.7%로 72% 기준에 미달해 열린 상태입니다. 시각 대조를 강제 통과로 표시하지 않았습니다.
- VoiceOver와 실제 보조공학 승인, 학생·교사의 실제 수업 관찰은 수행하지 않았습니다.

## 자산·안전 확인

`src/components/CaseIllustration.tsx`의 사건별 인라인 SVG와 `public/favicon.svg`를 유지했습니다. 생성한 세 comp는 `.impeccable/mocks/`의 비배포 참고 자료이며 각 `.png.json` sidecar에 prompt와 승인 방향을 기록했습니다. 외부 이미지·폰트·분석·AI·서버·업로드·학생 식별 정보·음성 기능은 추가하지 않았고, 관련 결정은 `work/education-webapp-redesign-assets.md`에 남겼습니다. `impeccable`, `ui-ux-pro-max`, `redesign-existing-projects`, `imagegen` 역할 파일은 읽고 적용했습니다.

## 독립 마감 리뷰 — 2026-08-30

- **지속성:** 소스와 테스트에서 로컬 저장 경계와 명시적 리셋 동작은 일관되게 확인됐습니다. 새로고침 뒤 복원되는 실제 브라우저 캡처는 남아 있지 않으므로 사람 확인 항목으로 분리했습니다.
- **시각 충실도:** 승인한 stage-rail comp와 현재 렌더의 hero 대조는 61.7%(구조 66, 색상 88, 세부 42)로 72% 기준에 미달했습니다. 렌즈 정체성, 근거 필터·평가·트레이, 다음 행동, 모바일 도구 크롬의 대응이 추가 조정 대상으로 남아 있습니다.
- **사용성·접근성:** 한국어 행동 안내, 44px 조작 영역, `:focus-visible`, `aria-current`, `gi-pulse`, reduced-motion 대체, 색상 이외의 렌즈 구분은 구현됐습니다. 375px 화면에서 하단 고정 도구가 단계 안내와 시각적으로 가까워지는 경우가 있어 다음 시각 라운드에서 여백 또는 흐름 배치를 재검토합니다.
- **재검토 순서:** 같은 상태의 데스크톱 hero, 375px·640px 모바일, reduced-motion, 새로고침 복원 캡처를 추가한 뒤 hero 대조를 다시 실행합니다. 현재 점수는 강제 통과로 표시하지 않습니다.
- **검증 경계:** VoiceOver, 실제 보조공학 승인, 실제 학생·교사 수업 관찰은 수행하지 않았습니다. macOS Chromium 권한 오류는 앱 결함이 아닌 로컬 실행 환경 이슈로 분리하고, 이번 게이트는 승인 브라우저 세션과 Ubuntu CI E2E 결과로 기록했습니다.

## 릴리스 상태

이번 요청에서는 커밋, 푸시, GitHub Pages 배포, HVC 등록을 실행하지 않았습니다. 작업 트리에는 리디자인 소스·테스트·문서 변경과 시각 검토 참고 자료가 남아 있으며, 도메인·콘텐츠·저장 경계는 보존했습니다. VoiceOver·실제 보조공학·실수업 확인을 별도로 진행하려면 그 결과를 이 보고서의 검증 상태와 분리해 기록해야 합니다.
