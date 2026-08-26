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
```

개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다. 배포는 이 구현 요청의 범위가 아닙니다.

## 범위와 경계

- 사건은 모두 오리지널 허구이며, 실제 인물·사건에 대한 평가를 요구하지 않습니다.
- 서버 없음: 데이터는 브라우저 안에서만 처리합니다.
- AI 없음: 자동 판정·생성·모델 호출을 사용하지 않습니다.
- 분석/추적 없음: 분석 SDK, 광고, 외부 폰트·이미지, 제3자 추적 요청을 사용하지 않습니다.
- 개인정보 입력 필드와 파일 업로드가 없습니다.

사건 팩은 `playground-storage-box`, `missing-umbrella-tag`, `club-notice-poster`, `library-window-seat` 네 가지입니다.

## 저장 동작

허용된 브라우저 저장 키는 다음 세 개뿐입니다.

- `perspective-lens:session:v1`: 현재 사건과 학습 진행 상태(sessionStorage)
- `perspective-lens:saved-memo:v1`: 사용자가 저장한 메모(localStorage)
- `perspective-lens:reading-prefs:v1`: 글자 크기·대비·모션 설정(localStorage)

새 브라우저 컨텍스트에서는 저장하지 않은 메모가 사라지고, 저장한 메모는 남습니다. 삭제 동작은 저장 메모를 제거합니다. 세션 저장값에는 허용된 자료형만 보관합니다.

## 접근성·반응형 확인 범위

키보드만으로 전체 흐름을 완료하고, VoiceOver 구조와 포커스 반환을 확인합니다. 375px 모바일 및 640px CSS 뷰포트에서 무수평스크롤을 확인하고, 브라우저 200% 확대와 모션 감소(`Reduce Motion`)에서 현재 행동 안내를 확인합니다. A4 인쇄 미리보기에서는 교사용 요약·두 렌즈·완료 보고서가 잘리지 않아야 합니다.

시각 증거 파일:

- `docs/qa/evidence/375-intake.png`
- `docs/qa/evidence/375-evidence.png`
- `docs/qa/evidence/375-report.png`
- `docs/qa/evidence/reduced-motion-current-action.png`

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
| 수동 | `docs/qa/manual-accessibility-checklist.md` | VoiceOver, 확대, 모션 감소, A4 포함 12개 항목 |
