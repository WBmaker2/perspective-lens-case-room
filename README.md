# 관점 렌즈 사건실

초등학교 5~6학년 국어 수업을 위한 오리지널 허구 사건 탐구 웹앱입니다. 학습자는 같은 장면을 두 렌즈로 읽고, 문장을 관찰 사실·인물의 추론·평가 표현으로 분류한 뒤 비교와 관점 전환을 연습합니다. 앱은 특정 인물의 진실이나 우열을 판정하지 않습니다.

## 실행

```bash
npm install
npm run dev
npm run build
npm test
npm run test:e2e
npm run lint
npm run lint:filesize
npm ci
```

개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다. 배포는 아래 GitHub Pages workflow를 통해 수행합니다.

## GitHub Pages 배포

`main`에 푸시하면 `.github/workflows/pages.yml`이 `npm ci`와 품질 검사를 통과한 `dist/`를 GitHub Pages에 배포합니다. 저장소 Pages 설정의 소스는 `GitHub Actions`로 둡니다. 프로젝트 저장소 주소는 다음 규칙을 따릅니다.

`https://WBmaker2.github.io/perspective-lens-case-room/`

[관점 렌즈 사건실 HVC 결과](https://wbmaker2.github.io/perspective-lens-case-room/)

상대 경로 `favicon.svg`를 포함한 정적 파일은 저장소 하위 경로에서도 같은 방식으로 불러옵니다.

배포 후에는 Actions의 `Deploy to GitHub Pages` 실행 성공, 위 공개 주소의 문서 제목·정적 asset, 375px 학습 시작 흐름을 각각 확인합니다. 공개 주소가 아직 이전 빌드를 보이면 Actions 완료 후 새로고침하여 현재 커밋의 제목과 asset hash를 다시 확인합니다.

## 범위와 경계

- 사건은 모두 오리지널 허구이며, 실제 인물·사건에 대한 평가를 요구하지 않습니다.
- 서버 없음: 데이터는 브라우저 안에서만 처리합니다.
- AI 없음: 자동 판정·생성·모델 호출을 사용하지 않습니다.
- 분석/추적 없음: 분석 SDK, 광고, 외부 폰트·이미지, 제3자 추적 요청을 사용하지 않습니다.
- 개인정보 입력 필드와 파일 업로드가 없습니다.

사건 팩은 `playground-storage-box`, `missing-umbrella-tag`, `club-notice-poster`, `library-window-seat` 네 가지입니다.

## 학습 흐름

학습자가 만나는 여섯 단계의 화면 흐름은 다음 순서입니다.

`사건 접수 → 렌즈 A/B → 근거 보드 → 교차 조사(처음 생각) → 중립 기록 열기·수정 비교 → 관점 전환 → 사건 보고서`

중립 기록은 처음 비교를 저장하기 전까지 숨겨져 있다가, 저장 후 `중립 기록 열기·수정 비교`에서 열어 볼 수 있습니다. 사건 보고서는 점수 없이 사실과 이유 문장을 연결해 보여 주며, 어느 관점이 맞는지 판정하지 않습니다.

## 저장 동작

허용된 브라우저 저장 키는 다음 세 개뿐입니다.

- `perspective-lens:session:v1`: 현재 사건과 학습 진행 상태(sessionStorage)
- `perspective-lens:saved-memo:v1`: 사용자가 저장한 메모(localStorage)
- `perspective-lens:reading-prefs:v1`: 글자 크기·대비·모션 설정(localStorage)

새 브라우저 컨텍스트에서는 저장하지 않은 메모가 사라지고, 저장한 메모는 남습니다. 삭제 동작은 저장 메모를 제거합니다. 세션 저장값에는 허용된 자료형만 보관합니다.

## 접근성·반응형 확인 범위

이번 확인 범위는 375px·640px CSS 뷰포트, 200% 확대, keyboard-only 전체 흐름, ARIA/axe 구조, reduced motion, A4 print 미리보기입니다. 모바일 무수평스크롤·44px 조작 영역·포커스 반환과 현재 행동 안내를 함께 확인합니다. 이번 개선 범위에서는 VoiceOver 검증 제외이며, 보조공학 완료를 의미하지 않습니다.

시각 증거 파일:

- `docs/qa/evidence/375-intake.png`
- `docs/qa/evidence/375-evidence.png`
- `docs/qa/evidence/375-report.png`
- `docs/qa/evidence/reduced-motion-current-action.png`

## 최종 통합 품질 게이트

2026-08-28 통합 확인은 `npm test`, `npm run typecheck`, `npm run lint`, `npm run lint:filesize`, `npm run build`, `npx playwright test`, `git diff --check` 순서로 실행합니다. 브라우저 게이트는 네 허구 사건의 keyboard-only 완료 흐름, `오늘 배운 점`·`다음에 해 볼 일` 보고서, 문장 재방문 초점, 375px·640px 무수평스크롤, 44px 조작 영역, reduced motion 안내, 로컬 요청·저장 경계를 함께 확인합니다. 완료 보고서에는 점수·승자·정답률과 내부 사건 ID를 표시하지 않습니다.

검증 산출물은 `docs/qa/evidence/375-report.png`에 저장하며, 375×812 CSS 뷰포트에서 두 학습 요약 섹션이 읽히고 가로로 잘리지 않는지 확인합니다. 이 통합 게이트는 별도의 커밋·푸시·GitHub Pages 배포 승인과 분리되어 있습니다.

## 업데이트 내역 유지 방법

화면의 `업데이트 내역` 버튼과 `src/content/updateHistory.ts`를 함께 갱신합니다. 개선이 실제로 확인된 날짜를 `YYYY-MM-DD` 형식의 literal 날짜로 새 `개선` 행에 기록하고, 최신 행을 배열 앞에 둡니다. 요약에는 변경한 학습 흐름이나 접근성 범위를 짧게 적고, `src/content/updateHistory.test.ts`에 날짜·순서·정확한 요약 계약을 함께 갱신합니다. 계획 또는 예정 작업을 완료 내역으로 기록하지 않습니다.

## 테스트 매트릭스

| 영역 | 확인 명령/자료 | 범위 |
| --- | --- | --- |
| 단위·컴포넌트 | `npm test` | 도메인, 저장, 콘텐츠, UI 계약 |
| 타입 | `npm run typecheck` | TypeScript 빌드 계약 |
| 정적 품질 | `npm run lint`, `npm run lint:filesize` | ESLint와 500줄 미만 파일 |
| 빌드 | `npm run build` | 배포 산출물 생성 |
| 브라우저 | `npm run test:e2e` | 네 사건, 키보드, 접근성, 반응형, 개인정보, 인쇄 |
| 수동 | `docs/qa/manual-accessibility-checklist.md` | VoiceOver 검증 제외, 확대, 모션 감소, A4 포함 12개 항목 |
