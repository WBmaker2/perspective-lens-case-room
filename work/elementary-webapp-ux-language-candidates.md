# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/perspective-lens-case-room`
- Files scanned: `99`
- Candidates: `2365`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| index.html:8:12 | text | 관점 렌즈 사건실 | learner-text-candidate | repeated-text |
| scripts/check-file-length.mjs:13:36 | text | object | feedback-or-error | repeated-text |
| scripts/check-file-length.mjs:13:48 | text | code | feedback-or-error | — |
| scripts/check-file-length.mjs:13:82 | text | ENOENT | feedback-or-error | technical-or-internal |
| scripts/check-file-length.mjs:29:52 | text | ${offender.path}: ${offender.lines} lines | feedback-or-error | — |
| src/App.test.tsx:8:30 | text | heading | heading | repeated-text |
| src/App.test.tsx:8:49 | text | 관점 렌즈 사건실 | heading | repeated-text |
| src/App.test.tsx:10:25 | text | 모든 사건과 인물은 가상이며 실제 인물을 평가하는 도구가 아닙니다. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:60:30 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:60:49 | text | 관점 렌즈 사건실 | heading | repeated-text |
| src/app/AppShell.test.tsx:61:45 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:61:64 | text | 사건 접수 | heading | repeated-text |
| src/app/AppShell.test.tsx:62:44 | text | data-stage-heading | heading | repeated-text |
| src/app/AppShell.test.tsx:64:30 | text | 모든 사건과 인물은 가상입니다. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:65:55 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:65:88 | text | 현재 단계 1/6 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:66:55 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:66:88 | text | 사건을 고르고 첫 생각을 기록해 보세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/app/AppShell.test.tsx:67:33 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:68:30 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:68:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:70:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:72:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:72:58 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:74:45 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:74:64 | text | 렌즈 A/B | heading | repeated-text |
| src/app/AppShell.test.tsx:75:44 | text | data-stage-heading | heading | repeated-text |
| src/app/AppShell.test.tsx:84:41 | text | storage blocked | feedback-or-error | — |
| src/app/AppShell.test.tsx:89:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:91:30 | text | 진행 상황을 이 기기에 저장하지 못했습니다. 활동은 계속할 수 있습니다. | learner-text-candidate | repeated-text, shaming-tone |
| src/app/AppShell.test.tsx:93:30 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:93:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:109:47 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:110:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:110:58 | text | 관찰 사실 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:111:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:111:58 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:137:39 | text | 비교 옵션을 찾지 못했습니다: ${optionId} | feedback-or-error | shaming-tone, technical-or-internal |
| src/app/AppShell.test.tsx:140:25 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:141:25 | text | 다른 표현 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:142:25 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:144:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:144:58 | text | 비교 완료 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:151:32 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:152:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:152:58 | text | 추가 기록 열기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:153:24 | text | { const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof comparisonSession & { revealedRecordIds: string[] }; expect(saved.comparisonPhase).toBe('revised'); expect(saved.revealedRecordIds).toHaveLength(3); }); expect(screen.getByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).toBeInTheDocument(); const comparisonGroup = screen.getByRole('group', { name: '공통 사실' }); await user.click(comparisonGroup.querySelector | input | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:158:30 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:160:64 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:163:60 | text | 이유 문장 · 가람 문장 4 | learner-text-candidate | — |
| src/app/AppShell.test.tsx:164:44 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:164:62 | text | 수정 비교 완료 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:176:30 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:176:48 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:177:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:177:58 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:179:32 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:179:51 | text | 관점 전환 | heading | repeated-text |
| src/app/AppShell.test.tsx:196:57 | text | 나래 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:197:57 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:198:57 | text | 사실 보고 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:199:57 | text | 사용 가능한 블록 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:205:63 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:205:81 | text | 블록 넣기: ${block!.text} | button-or-action | — |
| src/app/AppShell.test.tsx:211:30 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:211:48 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:211:75 | text | gi-pulse | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:213:55 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:214:28 | text | 이 메모는 명시적으로 저장할 때만 남아요. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:216:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:216:58 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:217:44 | text | 이 메모는 명시적으로 저장할 때만 남아요. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:218:91 | text | 이 기기에 메모를 저장했어요. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:219:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:219:58 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:229:43 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:230:50 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:230:69 | text | 렌즈 A/B | heading | repeated-text |
| src/app/AppShell.test.tsx:243:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:243:58 | text | 가람 이유 문장 4 다시 보기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:244:24 | text | { expect(screen.getByRole('heading', { name: '렌즈 A/B' })).toBeInTheDocument(); expect(screen.getByRole('tab', { name: '렌즈 A' })).toHaveAttribute('aria-selected', 'true'); const target = document.querySelector | heading | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:245:32 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:245:51 | text | 렌즈 A/B | heading | repeated-text |
| src/app/AppShell.test.tsx:246:47 | text | 렌즈 A | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:249:37 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:253:84 | text | { const user = userEvent.setup(); sessionStorage.setItem(SESSION_KEY, JSON.stringify(completeReportSession())); localStorage.setItem(SAVED_MEMO_KEY, '저장해 둔 메모'); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:256:43 | text | 저장해 둔 메모 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:259:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:259:58 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:261:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:261:58 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:262:50 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:262:69 | text | 사건 접수 | heading | repeated-text |
| src/app/AppShell.test.tsx:265:56 | text | 저장해 둔 메모 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:277:58 | text | 이전 답변이 모두 확인되지 않아 보고서를 만들 수 없어요. | learner-text-candidate | multiple-actions |
| src/app/AppShell.test.tsx:278:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:278:58 | text | 이전 비교 단계 다시 확인 | button-or-action | multiple-actions, repeated-text |
| src/app/AppShell.test.tsx:279:30 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:279:49 | text | 교차 조사 | heading | repeated-text |
| src/app/AppShell.test.tsx:282:88 | text | { const user = userEvent.setup(); sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'report' })); localStorage.setItem(SAVED_MEMO_KEY, '저장해 둔 메모'); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:285:43 | text | 저장해 둔 메모 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:288:39 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:288:57 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:290:48 | text | 현재 기록을 지울까요? | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:292:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:292:58 | text | 취소 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:295:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:295:58 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:296:50 | text | heading | heading | repeated-text |
| src/app/AppShell.test.tsx:296:69 | text | 사건 접수 | heading | repeated-text |
| src/app/AppShell.test.tsx:297:56 | text | 저장해 둔 메모 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:304:24 | text | ); const before = sessionStorage.getItem(SESSION_KEY); const updates = screen.getByRole('button', { name: '업데이트 내역' }); expect(updates).toHaveAttribute('aria-haspopup', 'dialog'); expect(updates).toHaveAttribute('aria-expanded', 'false'); await user.click(updates); expect(updates).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument(); expect(sessionStorage.getItem(SESSION_KEY)).toBe(before); await user.click(screen.getByRole('button', { name: '닫기' })); expect(updates).toHaveFocus(); const settings = screen.getByRole('button', { name: '읽기 설정' }); await user.click(settings); await user.click(screen.getByRole('radio', { name: /크게22px/ })); const shell = document.querySelector | button-or-action | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:306:39 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:306:57 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:312:48 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:314:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:314:58 | text | 닫기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:317:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:317:58 | text | 읽기 설정 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:333:24 | text | ); const resetTrigger = screen.getByRole('button', { name: '다른 사건 접수' }); await user.click(resetTrigger); expect(screen.getAllByRole('dialog')).toHaveLength(1); expect(screen.getByRole('dialog', { name: '현재 기록을 지울까요?' })).toBeInTheDocument(); expect(document.querySelector('.app-shell')).toHaveAttribute('inert'); const updates = document.querySelector | button-or-action | long-or-dense |
| src/app/AppShell.test.tsx:335:44 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:335:62 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:338:48 | text | 현재 기록을 지울까요? | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:341:64 | text | .utility-button[aria-controls="update-history-dialog"] | button-or-action | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:345:50 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:347:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:347:58 | text | 취소 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:365:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:365:58 | text | 읽기 설정 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:380:39 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:380:57 | text | 교사용 활동 요약 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:384:56 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:391:48 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:391:66 | text | 인쇄하기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:394:48 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:394:66 | text | 닫기 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:403:38 | text | ); await user.click(screen.getByRole('button', { name: '교사용 활동 요약' })); const incompletePrint = document.querySelector | button-or-action | long-or-dense |
| src/app/AppShell.test.tsx:404:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:404:58 | text | 교사용 활동 요약 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:405:64 | text | ('[data-print-region]'); expect(incompletePrint).toHaveTextContent(missingUmbrellaTag.title); expect(incompletePrint).toHaveTextContent('가람'); expect(incompletePrint).toHaveTextContent('문장 1'); expect(incompletePrint).not.toHaveAttribute('data-print-report'); first.unmount(); sessionStorage.setItem(SESSION_KEY, JSON.stringify(completeReportSession())); render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/app/AppShell.test.tsx:407:48 | text | 가람 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:408:48 | text | 문장 1 | learner-text-candidate | — |
| src/app/AppShell.test.tsx:412:24 | text | ); await user.click(screen.getByRole('button', { name: '교사용 활동 요약' })); const completePrint = document.querySelector | button-or-action | long-or-dense |
| src/app/AppShell.test.tsx:413:40 | text | button | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:413:58 | text | 교사용 활동 요약 | button-or-action | repeated-text |
| src/app/AppShell.test.tsx:416:46 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:417:43 | text | 이 메모는 인쇄하면 안 됩니다. | learner-text-candidate | repeated-text |
| src/app/AppShell.test.tsx:418:50 | text | 이 메모는 인쇄하면 안 됩니다. | learner-text-candidate | repeated-text |
| src/app/AppShell.tsx:63:91 | text | (null); const readingTriggerRef = useRef | learner-text-candidate | technical-or-internal |
| src/app/AppShell.tsx:64:54 | text | (null); const updatesTriggerRef = useRef | learner-text-candidate | technical-or-internal |
| src/app/AppShell.tsx:65:54 | text | (null); const teacherTriggerRef = useRef | learner-text-candidate | technical-or-internal |
| src/app/AppShell.tsx:110:84 | text | { setReadingPreferences(preferences); const result = saveReadingPreferences(persistentAdapter, preferences); setReadingWarning(result.ok ? null : '읽기 설정을 저장하지 못했지만 현재 화면에는 적용했어요.'); }, [persistentAdapter]); const readingStyle: CSSProperties = { '--reading-size': `${readingPreferences.fontSize}px`, '--reading-line-height': `${readingPreferences.lineHeight}`, '--reading-width': readingPreferences.readingWidth === 'standard' ? '68ch' : '48ch', } as CSSProperties; return ( | learner-text-candidate | abstract-or-formal, long-or-dense, shaming-tone, technical-or-internal |
| src/app/AppShell.tsx:113:43 | text | 읽기 설정을 저장하지 못했지만 현재 화면에는 적용했어요. | learner-text-candidate | abstract-or-formal, shaming-tone |
| src/app/AppShell.tsx:129:49 | text | 관점 렌즈 사건실 | heading | repeated-text |
| src/app/AppShell.tsx:138:12 | text | 같은 사건도 말하는 사람의 위치와 관심에 따라 다르게 보일 수 있습니다. | learner-text-candidate | — |
| src/app/AppShell.tsx:139:12 | text | 모든 사건과 인물은 가상이며 실제 인물을 평가하는 도구가 아닙니다. | learner-text-candidate | repeated-text |
| src/app/AppShell.tsx:141:121 | text | {persistenceWarning && | learner-text-candidate | — |
| src/app/AppShell.tsx:164:50 | aria-label | 학습 도구 | aria-label | — |
| src/app/AppShell.tsx:173:10 | text | 읽기 설정 | button-or-action | repeated-text |
| src/app/AppShell.tsx:182:10 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/app/AppShell.tsx:191:10 | text | 교사용 활동 요약 | button-or-action | repeated-text |
| src/app/AppShell.tsx:196:16 | title | 읽기 설정 | title | repeated-text |
| src/app/StageRenderer.tsx:33:20 | text | void; } function Placeholder({ stage }: { stage: StageId }) { return ( | input | long-or-dense, technical-or-internal |
| src/app/StageRenderer.tsx:38:76 | text | ${stage}-title | input | — |
| src/app/StageRenderer.tsx:40:66 | text | {stageLabel(stage)} | heading | — |
| src/app/StageRenderer.tsx:41:27 | text | 이 단계의 활동은 다음 화면에서 이어집니다. | learner-text-candidate | — |
| src/app/StageRenderer.tsx:46:118 | text | ) { return ( | learner-text-candidate | — |
| src/app/StageRenderer.tsx:48:91 | text | report-recovery-title | learner-text-candidate | — |
| src/app/StageRenderer.tsx:53:77 | text | 사건 보고서를 다시 확인해 주세요 | heading | — |
| src/app/StageRenderer.tsx:54:46 | text | 이전 답변이 모두 확인되지 않아 보고서를 만들 수 없어요. 앞 단계로 돌아가 기록을 확인하거나 현재 기록을 지우고 새 사건을 접수하세요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/app/StageRenderer.tsx:57:107 | text | comparison | button-or-action | repeated-text |
| src/app/StageRenderer.tsx:57:121 | text | 이전 비교 단계 다시 확인 | button-or-action | multiple-actions, repeated-text |
| src/app/StageRenderer.tsx:60:122 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/app/StageRenderer.tsx:96:41 | text | ; case 'evidence': return selectedPack ? ( | input | technical-or-internal |
| src/app/StageRenderer.tsx:105:43 | text | ; case 'comparison': return selectedPack ? ( | input | — |
| src/app/StageRenderer.tsx:120:45 | text | ; case 'rewrite': return selectedPack ? ( | input | — |
| src/app/StageRenderer.tsx:132:42 | text | ; case 'report': { if (!selectedPack) return | input | — |
| src/app/StageRenderer.tsx:134:111 | text | ; let reportModel; try { reportModel = buildCaseReport(session, selectedPack); } catch (error) { if (isIncompleteCaseReportError(error)) { return | feedback-or-error | long-or-dense |
| src/app/StageRenderer.tsx:140:96 | text | ; } throw error; } return | feedback-or-error | — |
| src/app/StageRenderer.tsx:148:26 | text | 알 수 없는 학습 단계입니다. | learner-text-candidate | — |
| src/app/useCaseSession.ts:46:47 | text | 진행 상황을 이 기기에 저장하지 못했습니다. 활동은 계속할 수 있습니다. | learner-text-candidate | repeated-text, shaming-tone |
| src/app/useStageFocus.ts:7:18 | text | { if (previousFocusKey.current === focusKey) return; previousFocusKey.current = focusKey; const heading = document.querySelector | heading | long-or-dense |
| src/app/useStageFocus.ts:10:58 | text | [data-stage-heading] | heading | repeated-text |
| src/components/CaseIllustration.tsx:8:37 | text | = { 'playground-storage-box': '운동장 정리 상자 그림', 'missing-umbrella-tag': '사라진 우산 표찰 그림', 'club-notice-poster': '동아리 알림 포스터 그림', 'library-window-seat': '도서관 창가 자리 그림', }; export function CaseIllustration({ illustrationKey, label }: CaseIllustrationProps) { const title = label ?? titles[illustrationKey]; const titleId = `illustration-title-${illustrationKey}`; return ( | heading | long-or-dense, technical-or-internal |
| src/components/CaseIllustration.tsx:9:30 | text | 운동장 정리 상자 그림 | learner-text-candidate | — |
| src/components/CaseIllustration.tsx:10:28 | text | 사라진 우산 표찰 그림 | learner-text-candidate | — |
| src/components/CaseIllustration.tsx:11:26 | text | 동아리 알림 포스터 그림 | learner-text-candidate | — |
| src/components/CaseIllustration.tsx:12:27 | text | 도서관 창가 자리 그림 | learner-text-candidate | — |
| src/components/FeedbackPanel.tsx:9:76 | text | (function FeedbackPanel({ feedback, live = true }, ref) { const className = `feedback-panel feedback-panel--${feedback.status}`; return live ? ( | feedback-or-error | long-or-dense |
| src/components/FeedbackPanel.tsx:12:67 | text | polite | feedback-or-error | repeated-text |
| src/components/ModalDialog.test.tsx:11:7 | text | labels the dialog, traps focus, closes on Escape, and restores its trigger | learner-text-candidate | long-or-dense |
| src/components/ModalDialog.test.tsx:14:45 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:16:28 | text | 열기 | learner-text-candidate | repeated-text |
| src/components/ModalDialog.test.tsx:21:89 | text | 열기 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:22:50 | title | 읽기 설정 | title | repeated-text |
| src/components/ModalDialog.test.tsx:23:33 | text | 첫 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:24:33 | text | 두 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:30:56 | text | 읽기 설정 | learner-text-candidate | repeated-text |
| src/components/ModalDialog.test.tsx:31:37 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/ModalDialog.test.tsx:31:56 | text | settings-dialog-title | learner-text-candidate | — |
| src/components/ModalDialog.test.tsx:32:30 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:32:48 | text | 닫기 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:34:36 | text | .app-shell | learner-text-candidate | — |
| src/components/ModalDialog.test.tsx:37:30 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:37:48 | text | 첫 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:39:30 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:39:48 | text | 두 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:41:30 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:41:48 | text | 닫기 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:43:30 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:43:48 | text | 두 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:48:7 | text | closes from the visible close button | button-or-action | — |
| src/components/ModalDialog.test.tsx:48:57 | text | { const user = userEvent.setup(); const onClose = vi.fn(); const triggerRef = { current: null }; render( | button-or-action | long-or-dense, repeated-text, technical-or-internal |
| src/components/ModalDialog.test.tsx:52:52 | title | 업데이트 내역 | title | repeated-text |
| src/components/ModalDialog.test.tsx:52:111 | text | 내용 | learner-text-candidate | — |
| src/components/ModalDialog.test.tsx:53:40 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:53:58 | text | 닫기 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:62:71 | text | 기록 초기화 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:67:39 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:67:57 | text | 기록 초기화 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:73:75 | text | { const trigger = document.createElement('button'); trigger.type = 'button'; trigger.textContent = '열기'; document.body.append(trigger); const triggerRef = { current: trigger }; function StageHeading() { const headingRef = useRef | heading, button-or-action | long-or-dense |
| src/components/ModalDialog.test.tsx:74:45 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:76:28 | text | 열기 | learner-text-candidate | repeated-text |
| src/components/ModalDialog.test.tsx:81:22 | text | headingRef.current?.focus(), []); return | heading | — |
| src/components/ModalDialog.test.tsx:82:68 | text | 사건 접수 | heading | repeated-text |
| src/components/ModalDialog.test.tsx:82:78 | text | ; } render( | heading | — |
| src/components/ModalDialog.test.tsx:87:48 | title | 닫힌 대화상자 | title | — |
| src/components/ModalDialog.test.tsx:88:33 | text | 첫 번째 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:93:30 | text | heading | heading | repeated-text |
| src/components/ModalDialog.test.tsx:93:49 | text | 사건 접수 | heading | repeated-text |
| src/components/ModalDialog.test.tsx:96:78 | text | { const firstTriggerRef = { current: null }; const secondTriggerRef = { current: null }; const shell = document.createElement('main'); shell.className = 'app-shell'; shell.setAttribute('inert', ''); shell.setAttribute('aria-hidden', 'false'); document.body.append(shell); const view = render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ModalDialog.test.tsx:106:47 | title | 첫 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:107:33 | text | 첫 번째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:109:48 | title | 둘째 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:110:33 | text | 둘째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:112:10 | text | , ); expect(screen.getAllByRole('dialog', { hidden: true })).toHaveLength(2); expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).toHaveLength(1); expect(shell).toHaveAttribute('inert'); expect(shell).toHaveAttribute('aria-hidden', 'true'); view.rerender( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ModalDialog.test.tsx:116:39 | text | [role="dialog"][aria-modal="true"] | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ModalDialog.test.tsx:121:46 | title | 둘째 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:122:31 | text | 둘째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:123:21 | text | , ); expect(shell).toHaveAttribute('inert'); expect(shell).toHaveAttribute('aria-hidden', 'true'); view.rerender( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ModalDialog.test.tsx:138:47 | title | 첫 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:139:33 | text | 첫 번째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:141:48 | title | 둘째 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:142:33 | text | 둘째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:144:10 | text | , ); const dialogs = screen.getAllByRole('dialog', { hidden: true }); expect(dialogs).toHaveLength(2); expect(dialogs[0]).toHaveAttribute('inert'); expect(dialogs[0]).toHaveAttribute('aria-hidden', 'true'); expect(dialogs[1]).toHaveAttribute('aria-modal', 'true'); expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).toHaveLength(1); view.rerender( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ModalDialog.test.tsx:152:39 | text | [role="dialog"][aria-modal="true"] | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ModalDialog.test.tsx:155:45 | title | 첫 대화상자 | title | repeated-text |
| src/components/ModalDialog.test.tsx:156:31 | text | 첫 번째 확인 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:161:64 | text | 첫 대화상자 | learner-text-candidate | repeated-text |
| src/components/ModalDialog.test.tsx:164:32 | text | button | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:164:50 | text | 닫기 | button-or-action | repeated-text |
| src/components/ModalDialog.test.tsx:165:41 | text | [role="dialog"][aria-modal="true"] | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/ModalDialog.tsx:11:17 | text | void; showCloseButton?: boolean; } const focusableSelector = [ 'button:not([disabled])', '[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])', ].join(','); export function ModalDialog({ id, title, open, triggerRef, children, onClose, showCloseButton = true }: ModalDialogProps) { const dialogRef = useRef | button-or-action, input | long-or-dense, technical-or-internal |
| src/components/ModalDialog.tsx:16:4 | text | button:not([disabled]) | button-or-action | — |
| src/components/ModalDialog.tsx:96:27 | text | ${id}-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/components/ModalDialog.tsx:100:46 | text | {showCloseButton ? | heading, button-or-action | — |
| src/components/ModalDialog.tsx:101:102 | text | 닫기 | button-or-action | repeated-text |
| src/components/ModalDialog.tsx:101:113 | text | : null} | button-or-action | repeated-text, technical-or-internal |
| src/components/ProgressSteps.test.tsx:9:52 | text | 학습 단계 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.test.tsx:12:35 | text | a, button, [tabindex] | button-or-action | — |
| src/components/ProgressSteps.test.tsx:13:36 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.test.tsx:19:63 | text | 학습 단계 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.test.tsx:23:44 | text | 사건 접수 · 완료 | learner-text-candidate | — |
| src/components/ProgressSteps.test.tsx:24:44 | text | 교차 조사 · 진행 중 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:9:60 | text | stage.id === activeStage); return ( | learner-text-candidate | technical-or-internal |
| src/components/ProgressSteps.tsx:11:43 | aria-label | 학습 단계 | aria-label | repeated-text |
| src/components/ProgressSteps.tsx:12:71 | aria-label | 학습 단계 | aria-label | repeated-text |
| src/components/ProgressSteps.tsx:18:26 | text | ${stage.label} · ${index < activeIndex ? '완료' : stage.id === activeStage ? '진행 중' : '예정'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ProgressSteps.tsx:21:67 | text | {String(index + 1).padStart(2, '0')} | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:22:39 | text | {index | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:23:89 | text | 완료 | learner-text-candidate | — |
| src/components/ProgressSteps.tsx:23:98 | text | : null} | learner-text-candidate | repeated-text, technical-or-internal |
| src/components/SentenceCard.test.tsx:10:10 | text | 해솔은 줄넘이를 살폈다. | learner-text-candidate | — |
| src/components/SentenceCard.test.tsx:13:34 | text | 해솔은 줄넘이를 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:14:34 | text | 살폈다. | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:17:27 | text | 잘 뒷받침해요. | feedback-or-error | repeated-text |
| src/components/SentenceCard.test.tsx:17:39 | text | partially-supported | feedback-or-error | repeated-text |
| src/components/SentenceCard.test.tsx:17:62 | text | 일부만 뒷받침해요. | feedback-or-error | repeated-text |
| src/components/SentenceCard.test.tsx:17:84 | text | 다시 살펴봐요. | feedback-or-error | repeated-text |
| src/components/SentenceCard.test.tsx:25:52 | text | classify-evidence | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/SentenceCard.test.tsx:25:121 | text | 해솔 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:28:43 | value | sentence-1-a | value, input | repeated-text |
| src/components/SentenceCard.test.tsx:28:59 | text | 해솔은 줄넘이를 | input | repeated-text |
| src/components/SentenceCard.test.tsx:32:43 | value | sentence-1-b | value, input | repeated-text |
| src/components/SentenceCard.test.tsx:32:59 | text | 살폈다. | input | repeated-text |
| src/components/SentenceCard.test.tsx:36:22 | text | ); const { rerender } = render(view()); expect(screen.getByRole('group', { name: '해솔 문장 1' })).toBeInTheDocument(); const select = screen.getByRole('button', { name: /해솔 문장 1/ }); expect(select).toHaveAttribute('aria-pressed', 'false'); expect(screen.queryAllByRole('checkbox')).toHaveLength(0); await user.keyboard('{Tab}{Enter}'); expect(onToggle).toHaveBeenCalledWith('sentence-1'); rerender( | button-or-action | long-or-dense, technical-or-internal |
| src/components/SentenceCard.test.tsx:40:47 | text | 해솔 문장 1 | learner-text-candidate | — |
| src/components/SentenceCard.test.tsx:41:38 | text | button | button-or-action | repeated-text |
| src/components/SentenceCard.test.tsx:49:52 | text | classify-evidence | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/SentenceCard.test.tsx:49:113 | text | 해솔 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:52:43 | value | sentence-1-a | value, input | repeated-text |
| src/components/SentenceCard.test.tsx:52:59 | text | 해솔은 줄넘이를 | input | repeated-text |
| src/components/SentenceCard.test.tsx:56:43 | value | sentence-1-b | value, input | repeated-text |
| src/components/SentenceCard.test.tsx:56:59 | text | 살폈다. | input | repeated-text |
| src/components/SentenceCard.test.tsx:74:38 | text | button | button-or-action | repeated-text |
| src/components/SentenceCard.test.tsx:74:56 | text | 중요 문장 표시 | button-or-action | repeated-text |
| src/components/SentenceCard.test.tsx:81:87 | text | { render( | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:82:57 | text | mark-important | learner-text-candidate | — |
| src/components/SentenceCard.test.tsx:82:122 | text | 가람 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.test.tsx:84:47 | text | 가람 문장 1 | learner-text-candidate | — |
| src/components/SentenceCard.test.tsx:85:30 | text | button | button-or-action | repeated-text |
| src/components/SentenceCard.test.tsx:85:48 | text | 중요 표시 취소 | button-or-action | repeated-text |
| src/components/SentenceCard.test.tsx:85:79 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/components/SentenceCard.test.tsx:85:95 | text | true | button-or-action | repeated-text |
| src/components/SentenceCard.tsx:8:36 | text | void; contextLabel?: string; children?: ReactNode; } export function SentenceCard({ sentence, mode, pressed, onToggle, contextLabel, children }: SentenceCardProps) { const textId = `${sentence.id}-text`; const isClassification = mode === 'classify-evidence'; const sentenceLabel = `${contextLabel ? `${contextLabel} ` : ''}문장 ${sentence.number}`; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/SentenceCard.tsx:16:26 | text | ${contextLabel ? | learner-text-candidate | — |
| src/components/SentenceCard.tsx:16:61 | text | : ''}문장 ${sentence.number} | learner-text-candidate | — |
| src/components/SentenceCard.tsx:25:6 | text | {isClassification ? ( | button-or-action | — |
| src/components/SentenceCard.tsx:50:36 | text | 중요 표시 취소 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.tsx:50:49 | text | 중요 문장 표시 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.tsx:52:12 | text | {pressed ? '중요 표시 취소' : '중요 문장 표시'} | button-or-action | — |
| src/components/SentenceCard.tsx:53:25 | text | 중요 표시 취소 | learner-text-candidate | repeated-text |
| src/components/SentenceCard.tsx:53:38 | text | 중요 문장 표시 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:10:84 | text | ({ left, top, right, bottom, x: left, y: top, width: right - left, height: bottom - top, } as DOMRect); function renderWithGeometry(utilityRect: DOMRect, actionRect: DOMRect) { const utility = document.createElement('div'); utility.className = 'utility-group'; document.body.append(utility); vi.spyOn(utility, 'getBoundingClientRect').mockReturnValue(utilityRect); const view = render( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/StageActionButton.test.tsx:20:73 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:20:114 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:22:25 | text | , ); const action = screen.getByRole('button', { name: '사건 렌즈 열기' }); vi.spyOn(action, 'getBoundingClientRect').mockReturnValue(actionRect); const scrollIntoView = vi.fn(); Object.defineProperty(action, 'scrollIntoView', { configurable: true, value: scrollIntoView }); view.rerender( | button-or-action | long-or-dense |
| src/components/StageActionButton.test.tsx:24:36 | text | button | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:24:54 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:29:73 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:29:114 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:36:11 | text | StageActionButton | learner-text-candidate | — |
| src/components/StageActionButton.test.tsx:37:75 | text | { const onClick = vi.fn(); const { rerender } = render( | learner-text-candidate | long-or-dense |
| src/components/StageActionButton.test.tsx:40:75 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:40:108 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:42:27 | text | , ); expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toHaveClass('gi-pulse'); expect(screen.getByText('다음 활동을 시작하세요.')).toBeVisible(); rerender( | button-or-action | long-or-dense |
| src/components/StageActionButton.test.tsx:45:30 | text | button | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:45:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:45:75 | text | gi-pulse | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:46:30 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:49:74 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:49:107 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:51:27 | text | , ); expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).not.toHaveClass('gi-pulse'); expect(screen.queryByText('다음 활동을 시작하세요.')).not.toBeInTheDocument(); rerender( | button-or-action | long-or-dense |
| src/components/StageActionButton.test.tsx:53:30 | text | button | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:53:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:53:79 | text | gi-pulse | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:54:32 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:57:83 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:57:116 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:61:30 | text | button | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:61:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:61:79 | text | gi-pulse | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:62:32 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:79:80 | text | { const utility = document.createElement('div'); utility.className = 'utility-group'; document.body.append(utility); vi.spyOn(utility, 'getBoundingClientRect').mockReturnValue(rect(12, 700, 363, 812)); render( | learner-text-candidate | long-or-dense |
| src/components/StageActionButton.test.tsx:85:67 | text | 다음 활동을 시작하세요. | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:85:108 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/components/StageActionButton.test.tsx:90:30 | text | button | button-or-action | repeated-text |
| src/components/StageActionButton.test.tsx:90:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/components/StageActionButton.tsx:8:17 | text | void; } export function StageActionButton({ children, disabled, isCurrentRequired, guidanceText, onClick }: StageActionButtonProps) { const guidanceId = useId(); const actionRef = useRef | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/StageActionButton.tsx:43:16 | text | {showGuidance ? | button-or-action | missing-term-explanation, technical-or-internal |
| src/components/StageStatus.test.tsx:9:63 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:10:39 | text | 현재 단계 1/6 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:11:39 | text | 사건 접수 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:12:39 | text | 사건을 고르고 첫 생각을 기록해 보세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/components/StageStatus.test.tsx:15:79 | text | { render( | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:16:38 | text | comparison | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:16:61 | text | 사라진 우산 표찰 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:18:66 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:19:39 | text | 사라진 우산 표찰 | learner-text-candidate | repeated-text |
| src/components/StageStatus.test.tsx:20:39 | text | 현재 단계 4/6 | learner-text-candidate | — |
| src/components/StageStatus.tsx:10:12 | text | 사건을 고르고 첫 생각을 기록해 보세요. | learner-text-candidate | multiple-actions, repeated-text |
| src/components/StageStatus.tsx:11:12 | text | 두 렌즈를 읽고 중요한 문장을 표시해 보세요. | learner-text-candidate | — |
| src/components/StageStatus.tsx:12:14 | text | 각 문장을 읽고 근거 종류를 골라 보세요. | learner-text-candidate | — |
| src/components/StageStatus.tsx:13:16 | text | 공통점·차이점·빠진 정보를 근거와 연결해 보세요. | learner-text-candidate | — |
| src/components/StageStatus.tsx:14:13 | text | 사실을 지키며 다른 관점의 문장을 조립해 보세요. | learner-text-candidate | — |
| src/components/StageStatus.tsx:15:12 | text | 사용한 근거와 달라진 생각을 돌아보세요. | learner-text-candidate | — |
| src/components/StageStatus.tsx:20:36 | text | = 0 ? activeIndex + 1 : 1; const descriptor = stageDescriptors[activeIndex] ?? stageDescriptors[0]!; return ( | learner-text-candidate | long-or-dense |
| src/components/StageStatus.tsx:24:49 | aria-label | 현재 학습 단계 | aria-label | repeated-text |
| src/components/StageStatus.tsx:25:44 | text | 현재 단계 {stageNumber}/{stageDescriptors.length} | learner-text-candidate | — |
| src/components/StageStatus.tsx:27:44 | text | {caseTitle ? | learner-text-candidate | — |
| src/components/StageStatus.tsx:28:77 | text | : null} | learner-text-candidate | repeated-text, technical-or-internal |
| src/content/caseIndex.test.ts:15:25 | text | library-window-seat | learner-text-candidate | — |
| src/content/caseIndex.test.ts:15:60 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/content/caseIndex.ts:13:22 | text | Invalid case pack '${pack.id}': ${issues.map((item) => | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/caseIndex.ts:13:109 | text | ).join('; ')} | feedback-or-error | — |
| src/content/caseIndex.ts:21:31 | text | Unknown case pack '${caseId}'. | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/cases/clubNoticePoster.test.ts:23:39 | text | 충분한 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.test.ts:24:39 | text | 알기 어렵다 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.test.ts:27:64 | text | 2026년 8월 28일 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.test.ts:27:97 | text | 과학실 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:4:15 | text | 문장의 근거를 잘 찾았어요. | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:5:27 | text | 문장 일부의 근거를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:6:12 | text | 보이는 사실과 생각을 구분해 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:25:29 | text | 나는 별빛 동아리 모임을 알리려고 월요일에 포스터를 붙였다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:26:29 | text | 포스터에는 이번 주 금요일 방과 후라고 썼다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:27:29 | text | 망원경 그림을 크게 넣어 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:27:63 | text | 동아리 이름이 잘 보인다고 생각했다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:28:29 | text | 늘 과학실에서 모였으니 장소는 모두 알 것이라고 여겼다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:29:29 | text | 색이 선명해서 필요한 정보가 충분한 포스터라고 보았다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:33:29 | text | 월요일 점심시간에 복도에서 그 포스터를 처음 봤다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:34:29 | text | 포스터에는 금요일 방과 후라는 말과 망원경 그림이 있었다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:35:29 | text | 정확한 날짜와 모이는 교실은 적혀 있지 않았다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:36:29 | text | 망원경 그림만으로는 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:36:60 | text | 어느 동아리인지 바로 알기 어렵다고 생각했다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:37:29 | text | 처음 보는 사람에게는 설명이 조금 더 필요한 포스터였다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:41:36 | text | 이번 주 금요일인 2026년 8월 28일 방과 후에 모인다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:42:36 | text | 2026년 8월 28일 금요일 방과 후에 별빛 동아리 모임이 있다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:43:37 | text | 모임 장소는 과학실이다. | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:44:37 | text | 금요일 방과 후에는 과학실에서 모인다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:49:11 | text | 동아리 알림 포스터 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:50:19 | text | 익숙한 사람과 처음 보는 사람에게 필요한 정보는 어떻게 다를까요? | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:53:16 | text | 모든 인물과 사건은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:56:23 | text | 포스터의 표시 정보와 독자 배경 정보 연결 검수 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:57:28 | text | 정보 부족을 만든 학생의 능력 비난이 아닌 독자 관점 차이로 표현 수정 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:59:42 | text | 월요일에 별빛 동아리 포스터가 복도에 붙었다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:60:42 | text | 포스터에는 이번 주 금요일 방과 후라는 말과 망원경 그림이 있다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:61:42 | text | 이번 주 금요일은 2026년 8월 28일이다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:62:42 | text | 기존 동아리원은 늘 과학실에서 모였다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:66:12 | text | poster-maker | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:66:41 | text | 나래 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:66:58 | text | 포스터를 만든 학생 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:66:78 | text | poster | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:66:101 | text | solid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/cases/clubNoticePoster.ts:67:18 | text | 복도 게시판 앞 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:67:40 | text | 동아리 모임을 알리기 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:67:64 | text | 포스터에 넣은 정보와 그 이유를 돌아보기 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:70:12 | text | first-reader | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:70:41 | text | 보람 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:70:58 | text | 처음 본 학생 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:70:75 | text | reader | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:70:98 | text | double | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:71:18 | text | 복도 게시판 앞 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:71:40 | text | 처음 보는 포스터에서 모임 정보를 찾기 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:71:74 | text | 처음 보는 독자에게 필요한 정보를 확인하기 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:75:12 | text | cnp-comparison-shared | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:75:44 | text | 두 학생 모두 금요일 방과 후와 망원경 그림을 포스터에서 보았다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:75:106 | text | cnp-a-2 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:75:117 | text | cnp-b-2 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:75:140 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:76:12 | text | cnp-comparison-expression | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:76:48 | text | 나래는 색과 그림을 강조했고 보람은 날짜와 교실 정보를 찾았다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:76:109 | text | cnp-a-3 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:76:120 | text | cnp-b-3 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:76:143 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:77:12 | text | cnp-comparison-room | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:77:42 | text | 과학실은 기존 동아리원에게 익숙하지만 처음 보는 보람에게는 드러나지 않은 정보였다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:77:114 | text | cnp-a-4 | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:77:125 | text | cnp-b-3 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:77:148 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:78:12 | text | cnp-comparison-date | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:78:42 | text | 포스터의 이번 주 금요일이라는 표현만으로는 처음 보는 사람에게 정확한 날짜가 부족하다. | learner-text-candidate | — |
| src/content/cases/clubNoticePoster.ts:78:116 | text | cnp-a-2 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:78:127 | text | cnp-b-3 | learner-text-candidate | repeated-text |
| src/content/cases/clubNoticePoster.ts:78:150 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:8:43 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:11:44 | text | 14:00 창문이 열려 있었다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:12:44 | text | 14:04 바람에 전시 책장이 들렸다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:13:44 | text | 창문 옆에 비 오는 날 책 보호 안내가 있다. | instruction | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:14:44 | text | 14:05 하준이 창문을 닫고 이어서 이유를 설명했다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.test.ts:20:70 | text | 나는 창문을 닫은 뒤 서윤에게 이유를 설명했다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:4:15 | text | 문장의 근거를 잘 찾았어요. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:5:27 | text | 문장 일부의 근거를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:6:12 | text | 보이는 사실과 생각을 구분해 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:25:29 | text | 나는 창가 자리에서 책을 읽고 있었고 창문은 열려 있었다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:26:29 | text | 바람이 들어와서 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:26:58 | text | 답답하지 않고 편안했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:27:29 | text | 하준이 먼저 창문을 닫았다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:28:29 | text | 책장이 조금 흔들렸지만 책이 상할 정도는 아니라고 생각했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:29:29 | text | 내게는 읽기 편한 공기를 유지하는 일이 더 중요했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:33:29 | text | 창가 전시대의 책장이 바람에 여러 번 들렸다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:34:29 | text | 창문 옆에는 비 오는 날 책을 보호하려면 창문을 닫으라는 안내가 있었다. | instruction | — |
| src/content/cases/libraryWindowSeat.ts:35:29 | text | 빗방울이 들어오면 책이 젖을 수 있다고 판단했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:36:29 | text | 나는 창문을 닫은 뒤 서윤에게 이유를 설명했다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:37:29 | text | 그때는 시원함보다 책을 보호하는 일이 더 급하다고 보았다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:41:36 | text | 14:00에 창문이 열려 있었다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:42:36 | text | 창가의 창문은 열려 있었다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:43:36 | text | 14:04 바람에 전시 책장이 들렸다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:44:36 | text | 바람이 불어 전시 책장이 여러 번 들렸다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:45:37 | text | 14:05 하준이 창문을 닫았다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:46:37 | text | 하준은 창문을 닫은 뒤 이유를 설명했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:51:11 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:52:19 | text | 편안함과 책 보존에 대한 관심은 같은 장면을 어떻게 다르게 보이게 할까요? | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:55:16 | text | 모든 인물과 사건은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:58:23 | text | 창문·바람·책 보호 기록과 두 서술의 시간 순서 검수 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:59:28 | text | 창문 닫기를 성격 평가가 아닌 편안함과 보존의 관심 차이로 표현 수정 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:61:42 | text | 14:00 창문이 열려 있었다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:62:42 | text | 14:04 바람에 전시 책장이 들렸다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:63:42 | text | 창문 옆에 비 오는 날 책 보호 안내가 있다. | instruction | repeated-text |
| src/content/cases/libraryWindowSeat.ts:64:42 | text | 14:05 하준이 창문을 닫고 이어서 이유를 설명했다. | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:67:12 | text | window-reader | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:67:42 | text | 서윤 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:67:59 | text | 창가에서 읽던 학생 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:67:79 | text | reader | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:67:102 | text | solid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/cases/libraryWindowSeat.ts:67:121 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:67:144 | text | 읽기 편한 공기 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:67:165 | text | 편안함을 느낀 장면과 생각을 구분하기 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:12 | text | window-closer | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:42 | text | 하준 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:59 | text | 창문을 닫은 학생 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:78 | text | window | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:101 | text | double | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:68:121 | text | 창가 전시대 옆 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:143 | text | 책을 보존하기 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:68:163 | text | 책 보호를 위해 확인한 정보와 판단을 설명하기 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:71:12 | text | lws-comparison-window | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:71:44 | text | 두 학생 모두 창문이 열려 있고 바람이 들어온 장면을 보았다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:71:104 | text | lws-a-1 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:71:115 | text | lws-b-1 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:71:138 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:72:12 | text | lws-comparison-interest | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:72:46 | text | 서윤은 편안함을, 하준은 책 보존을 더 먼저 살폈다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:72:101 | text | lws-a-5 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:72:112 | text | lws-b-5 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:72:135 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:73:12 | text | lws-comparison-range | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:73:43 | text | 서윤은 책이 당장 상하지 않을 것이라 생각했고 하준은 젖을 가능성을 판단했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:73:112 | text | lws-a-4 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:73:123 | text | lws-b-3 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:73:146 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:73:170 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/libraryWindowSeat.ts:74:12 | text | lws-comparison-sequence | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:74:46 | text | 하준은 창문을 닫은 뒤 서윤에게 이유를 설명했다. | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:74:99 | text | lws-b-4 | learner-text-candidate | — |
| src/content/cases/libraryWindowSeat.ts:74:122 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:4:15 | text | 문장의 근거를 잘 찾았어요. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:5:27 | text | 문장 일부의 근거를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:6:12 | text | 보이는 사실과 생각을 구분해 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:25:29 | text | 미술실에서 나오며 노란 우산을 복도 걸이에 걸었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:26:29 | text | 돌아왔을 때 내가 걸어 둔 자리는 비어 있었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:27:29 | text | 조금 전 안내 담당 다온이 우산 걸이 앞에 서 있었다. | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:28:29 | text | 다온이 내 우산인 줄 모르고 다른 곳으로 옮겼을지도 모른다고 생각했다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:29:29 | text | 내 눈에는 우산이 갑자기 사라진 것처럼 보였다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:33:29 | text | 복도 우산 걸이에 이름표가 없는 노란 우산 한 개가 남아 있었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:34:29 | text | 수업이 끝난 뒤에도 주인이 바로 찾으러 오지 않았다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:35:29 | text | 통로에 두면 누군가 부딪힐 수 있다고 생각했다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:36:29 | text | 나는 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:37:29 | text | 이름표가 없어서 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:37:58 | text | 주인을 바로 알기 어려운 우산이었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:41:37 | text | 우산은 복도 걸이에서 안내 책상으로 옮겨졌다. | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:42:37 | text | 이름표 없는 우산을 안내 책상으로 옮겼다. | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:43:35 | text | 파란 표찰은 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:44:35 | text | 우산 표찰이 걸이 아래에 남아 있었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:49:11 | text | 사라진 우산 표찰 | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:50:19 | text | 같은 우산 장면에서 본 정보와 추론은 어떻게 다를까요? | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:53:16 | text | 모든 인물과 사건은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:56:23 | text | 표찰 공개 순서와 본 정보·추론의 문장 근거 검수 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:57:28 | text | 우산 이동을 잘못이나 절도가 아닌 정보 차이로 표현 수정 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:59:42 | text | 13:15 가람이 확인하러 왔을 때 우산 걸이 한 자리가 비어 있었다. | learner-text-candidate | multiple-conditions |
| src/content/cases/missingUmbrellaTag.ts:60:42 | text | 가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:61:42 | text | 다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:62:42 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:66:12 | text | umbrella-owner | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:66:43 | text | 가람 | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:66:60 | text | 우산 주인 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:66:75 | text | umbrella | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:66:100 | text | solid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/cases/missingUmbrellaTag.ts:67:18 | text | 미술실 복도 우산 걸이 앞 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:67:46 | text | 내 우산의 위치를 확인하기 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:67:73 | text | 내가 본 장면과 생각을 구분해 알리기 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:70:12 | text | information-helper | hint, instruction | — |
| src/content/cases/missingUmbrellaTag.ts:70:47 | text | 다온 | hint, instruction | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:70:64 | text | 안내 담당 | hint, instruction | — |
| src/content/cases/missingUmbrellaTag.ts:70:79 | text | info | hint, instruction | — |
| src/content/cases/missingUmbrellaTag.ts:70:100 | text | double | hint, instruction | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:71:18 | text | 복도 우산 걸이와 안내 책상 사이 | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:71:50 | text | 이름표 없는 물건을 안전하게 보관하기 | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:71:83 | text | 본 정보에 따라 분실물을 기록하기 | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:75:12 | text | mut-comparison-umbrella | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:75:46 | text | 가람과 다온 모두 노란 우산을 보았다. | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:75:93 | text | mut-a-1 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:75:104 | text | mut-b-1 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:75:127 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:76:12 | text | mut-comparison-moved | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:76:43 | text | 우산의 위치가 복도 걸이와 안내 책상 사이에서 달라졌다. | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:76:100 | text | mut-a-2 | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:76:111 | text | mut-b-4 | instruction | — |
| src/content/cases/missingUmbrellaTag.ts:76:134 | text | shared-fact | instruction | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:77:12 | text | mut-comparison-owner-blind-spot | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:77:54 | text | 가람은 파란 표찰이 걸이 아래로 떨어진 것을 보지 못했다. | learner-text-candidate | repeated-text, shaming-tone |
| src/content/cases/missingUmbrellaTag.ts:77:112 | text | mut-a-4 | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:77:135 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:78:12 | text | mut-comparison-return-blind-spot | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:78:55 | text | 다온은 가람이 곧 돌아올 계획을 알지 못했다. | learner-text-candidate | shaming-tone |
| src/content/cases/missingUmbrellaTag.ts:78:106 | text | mut-b-2 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:78:129 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:79:12 | text | mut-comparison-inference | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:79:47 | text | 우산이 옮겨진 까닭은 처음에는 추론으로만 연결되었다. | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:79:102 | text | mut-a-4 | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:79:113 | text | mut-b-3 | learner-text-candidate | — |
| src/content/cases/missingUmbrellaTag.ts:79:136 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/missingUmbrellaTag.ts:79:160 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:4:15 | text | 문장의 근거를 잘 찾았어요. | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:5:27 | text | 문장 일부의 근거를 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:6:12 | text | 보이는 사실과 생각을 구분해 다시 살펴봐요. | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:25:29 | text | 정리 종이 울린 뒤 온유가 공 두 개를 상자 쪽으로 가져왔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:26:29 | text | 나는 젖은 줄넘이가 다른 물건을 적실까 봐 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:26:71 | text | 옆 바구니에 따로 넣었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:27:29 | text | 온유는 마지막 공을 가지러 다시 운동장 끝으로 갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:28:29 | text | 정리 표를 확인하지 않고 서두르면 상자가 다시 흐트러질 것 같았다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:29:29 | text | 그래서 오늘 정리는 빠르기보다 꼼꼼함이 더 중요했다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:33:29 | text | 정리 종이 울리자 나는 공 두 개를 들고 상자로 갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:34:29 | text | 해솔은 상자 앞에서 줄넘이를 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:34:66 | text | 한참 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:34:88 | text | 들여다보고 있었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:35:29 | text | 나는 운동장 끝에 남은 공 하나를 가지러 뛰어갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:36:29 | text | 해솔이 빨리 넣지 못해서 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:36:62 | text | 정리가 늦어지는 줄 알았다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:37:29 | text | 그때는 먼저 모두 상자에 넣는 것이 더 효율적이라고 생각했다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:41:36 | text | 정리 종이 울린 뒤였다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:42:36 | text | 정리 종이 울리자 상자로 갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:43:39 | text | 공 두 개를 상자 쪽으로 가져왔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:44:39 | text | 공 두 개를 들고 상자로 갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:45:36 | text | 젖은 줄넘이를 옆 바구니에 따로 넣었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:46:36 | text | 젖은 줄넘이는 옆 바구니로 분리되었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:47:36 | text | 젖은 줄넘이를 옆 바구니에 넣었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:52:11 | text | 운동장 정리 상자 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:53:19 | text | 같은 정리 장면에서 빠르기와 꼼꼼함은 어떻게 다르게 보일까요? | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:56:16 | text | 모든 인물과 사건은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:59:23 | text | 중립 기록과 10개 문장의 사실·추론·평가 연결 검수 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:60:28 | text | 빠르기와 꼼꼼함을 우열이 아닌 관심 차이로 표현 수정 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:62:42 | text | 15:20 정리 종이 울렸다. | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:63:42 | text | 온유가 공 두 개와 운동장 끝의 공 하나를 가져왔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:64:42 | text | 해솔이 젖은 줄넘이를 옆 바구니로 분리하고 표찰을 확인했다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:65:42 | text | 15:27 상자 뚜껑이 닫혔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:69:12 | text | cleanup-lead | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:69:41 | text | 해솔 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:69:58 | text | 정리 담당 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:69:73 | text | clipboard | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:69:99 | text | solid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/cases/playgroundStorageBox.ts:70:18 | text | 운동장 정리 상자 앞 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:70:43 | text | 물건을 안전하게 정리하기 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:70:69 | text | 정리 표와 물건 상태를 확인하기 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:73:12 | text | last-player | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:73:40 | text | 온유 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:73:57 | text | 놀이를 마친 학생 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:73:76 | text | ball | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:73:97 | text | double | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:74:18 | text | 운동장 끝과 상자 사이 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:74:44 | text | 남은 공을 찾아 정리를 마치기 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:74:73 | text | 빠르게 물건을 상자에 넣기 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:78:12 | text | psb-comparison-shared-bell | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:78:49 | text | 정리 종이 울린 뒤 정리 행동이 시작되었다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:78:99 | text | psb-a-1 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:78:110 | text | psb-b-1 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:78:133 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:79:12 | text | psb-comparison-shared-objects | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:79:52 | text | 공을 상자 쪽으로 가져갔다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:79:93 | text | psb-a-1 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:79:104 | text | psb-b-1 | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:79:127 | text | shared-fact | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:80:12 | text | psb-comparison-care | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:80:42 | text | 물건이 젖지 않도록 살피는 데 관심이 있다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:80:92 | text | psb-a-2 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:80:103 | text | psb-b-2 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:80:126 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:80:150 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:81:12 | text | psb-comparison-speed | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:81:43 | text | 먼저 모두 넣는 빠르기에 관심이 있다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:81:90 | text | psb-a-5 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:81:101 | text | psb-b-5 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:81:124 | text | different-expression | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:81:148 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/cases/playgroundStorageBox.ts:82:12 | text | psb-comparison-missing-effort | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:82:52 | text | 온유가 먼 공을 가지러 간 노력은 해솔의 설명에 드러나지 않는다. | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:82:114 | text | psb-b-3 | learner-text-candidate | — |
| src/content/cases/playgroundStorageBox.ts:82:137 | text | missing-information | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:15:11 | text | learner labels | learner-text-candidate | — |
| src/content/learnerLabels.test.ts:17:68 | text | 가람 문장 4 | learner-text-candidate | — |
| src/content/learnerLabels.test.ts:18:71 | text | 근거 문장 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:21:7 | text | uses Korean feedback labels instead of domain status tokens | feedback-or-error | long-or-dense |
| src/content/learnerLabels.test.ts:22:50 | text | 잘 연결했어요 | feedback-or-error | repeated-text |
| src/content/learnerLabels.test.ts:23:34 | text | partially-supported | feedback-or-error | repeated-text |
| src/content/learnerLabels.test.ts:23:63 | text | 조금 더 연결해 봐요 | feedback-or-error | repeated-text |
| src/content/learnerLabels.test.ts:24:47 | text | 다시 살펴봐요 | feedback-or-error | repeated-text |
| src/content/learnerLabels.test.ts:28:82 | text | 가람 문장 4 · 다온 문장 3 | learner-text-candidate | — |
| src/content/learnerLabels.test.ts:29:62 | text | 없음 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:30:100 | text | 다온 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:32:70 | text | 서술자 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:33:64 | text | 다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | repeated-text |
| src/content/learnerLabels.test.ts:34:67 | text | 기록된 사실 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:35:80 | text | 파란 표찰은 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:36:75 | text | 문장 블록 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:37:54 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.test.ts:38:45 | text | 보이는 정보를 살핀 관점 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:4:76 | text | = Object.freeze({ supported: '잘 연결했어요', 'partially-supported': '조금 더 연결해 봐요', revise: '다시 살펴봐요', }); export const evidenceCategoryLabels: Readonly | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/learnerLabels.ts:5:15 | text | 잘 연결했어요 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:6:27 | text | 조금 더 연결해 봐요 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:7:12 | text | 다시 살펴봐요 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:10:80 | text | = Object.freeze({ observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현', }); export const perspectiveTagLabels: Readonly | learner-text-candidate | long-or-dense |
| src/content/learnerLabels.ts:11:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:12:15 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:13:16 | text | 평가 표현 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:17:10 | text | 보이는 정보를 살핀 관점 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:18:15 | text | 추론한 내용을 살핀 관점 | learner-text-candidate | — |
| src/content/learnerLabels.ts:19:13 | text | 차분하게 확인한 관점 | learner-text-candidate | — |
| src/content/learnerLabels.ts:20:13 | text | 중립적으로 정리한 관점 | learner-text-candidate | — |
| src/content/learnerLabels.ts:21:14 | text | 시간 순서를 살핀 관점 | learner-text-candidate | — |
| src/content/learnerLabels.ts:22:11 | text | 빠르게 핵심을 잡은 관점 | learner-text-candidate | — |
| src/content/learnerLabels.ts:35:19 | text | ${found.narrator.displayName} 문장 ${found.sentence.number} | learner-text-candidate | long-or-dense |
| src/content/learnerLabels.ts:35:81 | text | 근거 문장 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:42:39 | text | ${narrator.displayName} 문장 ${sentence.number} | learner-text-candidate | — |
| src/content/learnerLabels.ts:43:60 | text | 없음 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:51:87 | text | 기록된 사실 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:55:70 | text | 문장 블록 | learner-text-candidate | repeated-text |
| src/content/learnerLabels.ts:59:61 | text | 서술자 | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:6:45 | text | 가람 | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:6:51 | text | 다온 | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:8:38 | text | 가람과 다온 | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:9:38 | text | 위치·관심·목적 | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:10:38 | text | 무엇을 보았지? | learner-text-candidate | repeated-text |
| src/content/reportCopy.test.ts:11:38 | text | 무엇을 추측했지? | learner-text-candidate | repeated-text |
| src/content/reportCopy.ts:7:38 | text | 첫 번째 서술자 | learner-text-candidate | — |
| src/content/reportCopy.ts:8:39 | text | 두 번째 서술자 | learner-text-candidate | — |
| src/content/reportCopy.ts:10:24 | text | 과 | learner-text-candidate | — |
| src/content/reportCopy.ts:10:40 | text | 의 글을 비교하며, 같은 사건도 본 위치·관심·목적에 따라 다르게 표현할 수 있고 사실과 생각을 근거로 나눌 수 있다는 점을 배웠어요. | learner-text-candidate | long-or-dense |
| src/content/reportCopy.ts:11:16 | text | 다음 글을 읽을 때 “무엇을 보았지?”, “무엇을 중요하게 여겼지?”, “무엇을 추측했지?”를 차례로 물어보세요. | learner-text-candidate | long-or-dense |
| src/content/safetyCopy.test.ts:9:44 | text | 모든 사건과 인물은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:10:47 | text | 실제 인물을 평가하는 도구가 아닙니다. | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:11:55 | text | 근거가 있는 여러 답을 인정합니다. | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:17:46 | text | 학습 단계 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:7 | text | 사건 접수 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:16 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:26 | text | 근거 보드 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:35 | text | 교차 조사 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:44 | text | 관점 전환 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:18:53 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/content/safetyCopy.test.ts:21:39 | text | [aria-current="step"] | learner-text-candidate | technical-or-internal |
| src/content/safetyCopy.test.ts:22:30 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| src/content/safetyCopy.ts:2:19 | text | 모든 사건과 인물은 가상입니다. | learner-text-candidate | repeated-text |
| src/content/safetyCopy.ts:3:22 | text | 실제 인물을 평가하는 도구가 아닙니다. | learner-text-candidate | repeated-text |
| src/content/safetyCopy.ts:4:30 | text | 근거가 있는 여러 답을 인정합니다. | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:8:29 | text | 초등 5~6학년 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:9:29 | text | 국어 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:10:29 | text | 30~40분 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:11:29 | text | [6국02-04] | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:12:29 | text | [6국02-02] | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:13:29 | text | 이해 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:14:29 | text | 적용 | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.test.ts:15:29 | text | 분석 | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.test.ts:16:29 | text | 창안 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:17:29 | text | 관점이 사건을 바라보는 위치·관심·목적과 관련됨을 설명합니다. | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:18:29 | text | 문장을 관찰 사실, 추론, 평가 표현으로 구분합니다. | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:19:29 | text | 두 서술의 공통 사실과 서로 다른 해석을 비교합니다. | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:20:29 | text | 같은 사실을 다른 인물의 관점에서 다시 표현합니다. | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:26:8 | text | 중립 사건 기록 확인 | learner-text-candidate | multiple-actions, repeated-text |
| src/content/teacherGuide.test.ts:27:8 | text | 인물별 서술 읽기 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:28:8 | text | 사실·추론·평가 표시 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:29:8 | text | 공통점·차이점 비교 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:30:8 | text | 빠진 정보 확인 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:31:8 | text | 다른 관점으로 다시 쓰기 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:39:29 | text | 운동장 정리 상자 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:40:29 | text | 속도와 꼼꼼함 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:41:29 | text | 사라진 우산 표찰 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:42:29 | text | 본 정보와 추측한 정보 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:43:29 | text | 동아리 알림 포스터 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:44:29 | text | 익숙한 정보와 독자에게 필요한 정보 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:45:29 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:46:29 | text | 편안함과 책 보존 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.test.ts:53:31 | text | 근거 구분 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:53:40 | text | 관점 비교 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:53:49 | text | 다시 쓰기 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:54:31 | text | ${criterion} · 3단계 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:55:31 | text | ${criterion} · 2단계 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:56:31 | text | ${criterion} · 1단계 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:58:29 | text | 문장 ID 또는 문장 번호 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/teacherGuide.test.ts:59:29 | text | 근거가 뒷받침하는 여러 답은 모두 타당 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:60:29 | text | 총점은 계산하거나 표시하지 않습니다 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:67:29 | text | 가상의 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:68:29 | text | 학생 이름 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:69:29 | text | 실제 갈등 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:70:29 | text | 개인적인 감정 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:71:29 | text | 학교폭력 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:72:29 | text | 범죄 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:73:29 | text | 가족 갈등 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:74:29 | text | 고정된 성격 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:75:30 | text | 업로드 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:75:37 | text | 서버 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:75:43 | text | 로그인 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:75:50 | text | AI 채점 | learner-text-candidate | technical-or-internal |
| src/content/teacherGuide.test.ts:75:59 | text | 감정 분석 | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.test.ts:75:68 | text | 원격 분석 | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.test.ts:75:77 | text | 전송 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:78:29 | text | 메모 | learner-text-candidate | — |
| src/content/teacherGuide.test.ts:79:29 | text | 교사용 요약과 인쇄 자료에 포함하지 않습니다 | learner-text-candidate | — |
| src/content/teacherGuide.ts:12:14 | text | 30~40분 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:18:37 | text | 관점 렌즈 사건실 · 교사용 활동 요약 | heading | — |
| src/content/teacherGuide.ts:29:15 | text | 안전·개인정보 약속 | heading | repeated-text |
| src/content/teacherGuide.ts:31:8 | text | 모든 사건과 인물은 가상의 이야기와 인물입니다. | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:32:8 | text | 이 자료는 실제 인물을 평가하는 도구가 아닙니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:33:8 | text | 학생 이름을 입력하거나 공개하도록 요청하지 않습니다. | input | abstract-or-formal |
| src/content/teacherGuide.ts:34:8 | text | 실제 갈등이나 개인적인 감정을 이야기하도록 요청하지 않습니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:35:8 | text | 학교폭력·범죄·가족 갈등을 미션으로 삼지 않습니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:36:8 | text | 인물에게 고정된 성격 꼬리표를 붙이지 않습니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:37:8 | text | 학생 글·사진·파일을 업로드하지 않으며 서버·로그인 없이 활동합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:38:8 | text | AI 채점이나 감정 분석을 하지 않습니다. | learner-text-candidate | abstract-or-formal, technical-or-internal |
| src/content/teacherGuide.ts:39:8 | text | 원격 분석을 하지 않으며 활동 내용을 외부로 전송하지 않습니다. | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.ts:40:8 | text | 학생이 적은 메모 텍스트는 교사용 요약과 인쇄 자료에 포함하지 않습니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:41:8 | text | 점수나 총점은 계산하거나 표시하지 않으며, 근거가 뒷받침하는 여러 답은 모두 타당할 수 있습니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:46:15 | text | 활동 개요 | heading | — |
| src/content/teacherGuide.ts:48:8 | text | 대상: 초등 5~6학년 | learner-text-candidate | — |
| src/content/teacherGuide.ts:49:8 | text | 교과: 국어 | learner-text-candidate | — |
| src/content/teacherGuide.ts:50:8 | text | 권장 시간: 30~40분 | learner-text-candidate | — |
| src/content/teacherGuide.ts:51:8 | text | 핵심 질문: 같은 사건도 말하는 사람의 위치와 관심에 따라 어떻게 다르게 표현될까요? | learner-text-candidate | — |
| src/content/teacherGuide.ts:52:8 | text | 독창적인 가상 이야기에서 두 인물의 서술을 읽고, 근거를 연결해 관점의 차이를 비교합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:57:15 | text | 교육과정·학습 목표 | heading | — |
| src/content/teacherGuide.ts:59:8 | text | [6국02-04] 글에 나타난 관점이나 내용의 차이를 비교하며 읽고 문제 해결에 활용하기 | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.ts:60:8 | text | [6국02-02] 글의 맥락과 표현을 바탕으로 생략되거나 드러나지 않은 내용을 추론하기 | learner-text-candidate | — |
| src/content/teacherGuide.ts:61:8 | text | 이해: 관점이 사건을 바라보는 위치·관심·목적과 관련됨을 설명합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:62:8 | text | 적용: 문장을 관찰 사실, 추론, 평가 표현으로 구분합니다. | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.ts:63:8 | text | 분석: 두 서술의 공통 사실과 서로 다른 해석을 비교합니다. | learner-text-candidate | abstract-or-formal |
| src/content/teacherGuide.ts:64:8 | text | 창안: 같은 사실을 다른 인물의 관점에서 다시 표현합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:69:15 | text | 활동 흐름 | heading | — |
| src/content/teacherGuide.ts:71:8 | text | 중립 사건 기록 확인 | learner-text-candidate | multiple-actions, repeated-text |
| src/content/teacherGuide.ts:72:8 | text | 인물별 서술 읽기 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:73:8 | text | 사실·추론·평가 표시 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:74:8 | text | 공통점·차이점 비교 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:75:8 | text | 빠진 정보 확인 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:76:8 | text | 다른 관점으로 다시 쓰기 | learner-text-candidate | repeated-text |
| src/content/teacherGuide.ts:81:15 | text | 사건 카드와 초점 | heading | — |
| src/content/teacherGuide.ts:83:8 | text | 운동장 정리 상자 — 속도와 꼼꼼함 | learner-text-candidate | — |
| src/content/teacherGuide.ts:84:8 | text | 사라진 우산 표찰 — 본 정보와 추측한 정보 | learner-text-candidate | — |
| src/content/teacherGuide.ts:85:8 | text | 동아리 알림 포스터 — 익숙한 정보와 독자에게 필요한 정보 | learner-text-candidate | — |
| src/content/teacherGuide.ts:86:8 | text | 도서관 창가 자리 — 편안함과 책 보존 | learner-text-candidate | — |
| src/content/teacherGuide.ts:91:15 | text | 관찰 루브릭과 답 안내 | heading, instruction | — |
| src/content/teacherGuide.ts:93:8 | text | 근거 구분 · 3단계: 사실·추론·평가를 문장 부분까지 구분합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:94:8 | text | 근거 구분 · 2단계: 문장 단위로 대체로 구분합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:95:8 | text | 근거 구분 · 1단계: 느낌으로만 판단합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:96:8 | text | 관점 비교 · 3단계: 위치·관심·빠진 정보를 함께 설명합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:97:8 | text | 관점 비교 · 2단계: 차이 한 가지를 설명합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:98:8 | text | 관점 비교 · 1단계: 한 인물의 옳고 그름만 판단합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:99:8 | text | 다시 쓰기 · 3단계: 사실을 유지하며 관점 표현을 바꿉니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:100:8 | text | 다시 쓰기 · 2단계: 일부 사실이 빠지지만 관점은 드러납니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:101:8 | text | 다시 쓰기 · 1단계: 원문을 거의 그대로 복사합니다. | learner-text-candidate | — |
| src/content/teacherGuide.ts:102:8 | text | 답을 안내할 때는 문장 ID 또는 문장 번호를 확인하고, 그 근거로 생각의 연결을 설명합니다. | instruction | missing-term-explanation, multiple-conditions, technical-or-internal |
| src/content/teacherGuide.ts:103:8 | text | 본문 문장의 근거가 뒷받침하는 여러 답은 모두 타당할 수 있습니다. 하나의 절대 정답을 제시하지 않습니다. 총점은 계산하거나 표시하지 않습니다. | feedback-or-error | long-or-dense |
| src/content/teacherGuide.ts:116:16 | text | 30~40분 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:18 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:13:17 | text | 761–1024px 태블릿에서 학습 도구와 단계가 겹치지 않도록 상단 여백과 두 열 학습 카드 배치를 추가 | learner-text-candidate | long-or-dense, repeated-text |
| src/content/updateHistory.test.ts:17:18 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:18:17 | text | 근거 보드를 두 렌즈 요약·진행 안내·문장 카드·근거 모음으로 재구성해 비교 흐름을 한눈에 확인하도록 개선 | instruction | abstract-or-formal, long-or-dense, multiple-actions, repeated-text |
| src/content/updateHistory.test.ts:22:18 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:23:17 | text | 학습 단계·사건 선택·다시 쓰기 화면의 현재 행동과 문장 맥락을 더 쉽게 확인하도록 리디자인 | learner-text-candidate | multiple-actions, repeated-text |
| src/content/updateHistory.test.ts:27:18 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:28:17 | text | 375px 렌즈 문장 가로 배치, 학습자 표현 정리, 보고서 배운 점·다음 행동, 문장 재방문 초점, 파비콘 추가 | learner-text-candidate | long-or-dense, repeated-text |
| src/content/updateHistory.test.ts:30:77 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:30:92 | text | 375px 모바일, 키보드 전체 흐름, 스크린 리더 구조, 200% 확대, 모션 감소, A4 인쇄 검증 완료 | learner-text-candidate | abstract-or-formal, long-or-dense, repeated-text |
| src/content/updateHistory.test.ts:31:77 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:31:92 | text | MVP 4개 사건, 근거 분류, 교차 조사, 관점 전환, 접근성 기능 추가 | learner-text-candidate | repeated-text, technical-or-internal |
| src/content/updateHistory.test.ts:32:77 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:32:92 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:37:78 | text | 콘텐츠 검수 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:38:78 | text | 표현 수정 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:48:8 | text | playground-storage-box:콘텐츠 검수 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:48:41 | text | playground-storage-box:표현 수정 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:49:8 | text | missing-umbrella-tag:콘텐츠 검수 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:49:39 | text | missing-umbrella-tag:표현 수정 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:50:8 | text | club-notice-poster:콘텐츠 검수 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:50:37 | text | club-notice-poster:표현 수정 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:51:8 | text | library-window-seat:콘텐츠 검수 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:51:38 | text | library-window-seat:표현 수정 | learner-text-candidate | — |
| src/content/updateHistory.ts:6:36 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:6:51 | text | 761–1024px 태블릿에서 학습 도구와 단계가 겹치지 않도록 상단 여백과 두 열 학습 카드 배치를 추가 | learner-text-candidate | long-or-dense, repeated-text |
| src/content/updateHistory.ts:7:36 | text | 개선 | instruction | repeated-text |
| src/content/updateHistory.ts:7:51 | text | 근거 보드를 두 렌즈 요약·진행 안내·문장 카드·근거 모음으로 재구성해 비교 흐름을 한눈에 확인하도록 개선 | instruction | abstract-or-formal, long-or-dense, multiple-actions, repeated-text |
| src/content/updateHistory.ts:8:36 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:8:51 | text | 학습 단계·사건 선택·다시 쓰기 화면의 현재 행동과 문장 맥락을 더 쉽게 확인하도록 리디자인 | learner-text-candidate | multiple-actions, repeated-text |
| src/content/updateHistory.ts:9:36 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:9:51 | text | 375·640px에서 고정 학습 도구와 현재 행동 버튼이 겹치지 않도록 한 줄 배치 안정화 | learner-text-candidate | — |
| src/content/updateHistory.ts:10:36 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:10:51 | text | 375px 렌즈 문장 가로 배치, 학습자 표현 정리, 보고서 배운 점·다음 행동, 문장 재방문 초점, 파비콘 추가 | learner-text-candidate | long-or-dense, repeated-text |
| src/content/updateHistory.ts:11:36 | text | 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:11:51 | text | 375px 모바일, 키보드 전체 흐름, 스크린 리더 구조, 200% 확대, 모션 감소, A4 인쇄 검증 완료 | learner-text-candidate | abstract-or-formal, long-or-dense, repeated-text |
| src/content/updateHistory.ts:12:36 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:12:51 | text | MVP 4개 사건, 근거 분류, 교차 조사, 관점 전환, 접근성 기능 추가 | learner-text-candidate | repeated-text, technical-or-internal |
| src/content/updateHistory.ts:13:36 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:13:51 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:18:41 | text | 콘텐츠 검수 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:19:41 | text | 표현 수정 | learner-text-candidate | repeated-text |
| src/domain/buildCaseReport.test.ts:57:47 | text | 가람과 다온 | learner-text-candidate | repeated-text |
| src/domain/buildCaseReport.test.ts:60:39 | text | 무엇을 보았지? | learner-text-candidate | repeated-text |
| src/domain/buildCaseReport.test.ts:61:39 | text | 무엇을 추측했지? | learner-text-candidate | repeated-text |
| src/domain/buildCaseReport.test.ts:92:49 | text | 가람은 파란 표찰이 걸이 아래로 떨어진 것을 보지 못했다. | learner-text-candidate | repeated-text, shaming-tone |
| src/domain/buildCaseReport.test.ts:112:7 | text | throws a developer error instead of returning a partial report | feedback-or-error | long-or-dense |
| src/domain/buildCaseReport.ts:34:18 | text | IncompleteCaseReportError | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:38:99 | text | ( error instanceof IncompleteCaseReportError \|\| ( Boolean(error) && typeof error === 'object' && (error as { name?: unknown }).name === 'IncompleteCaseReportError' && (error as { code?: unknown }).code === 'INCOMPLETE_CASE_REPORT' ) ); const hypothesisIds = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/buildCaseReport.ts:40:41 | text | object | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:41:45 | text | IncompleteCaseReportError | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:42:45 | text | INCOMPLETE_CASE_REPORT | feedback-or-error | — |
| src/domain/buildCaseReport.ts:88:56 | text | ${name} is missing or malformed | feedback-or-error | — |
| src/domain/buildCaseReport.ts:90:28 | text | supported | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:90:62 | text | ${name} is not supported | feedback-or-error | — |
| src/domain/buildCaseReport.ts:123:57 | text | case does not match the selected pack | feedback-or-error | — |
| src/domain/buildCaseReport.ts:124:26 | text | report | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:124:57 | text | report stage is not complete | feedback-or-error | — |
| src/domain/buildCaseReport.ts:126:27 | text | initial hypothesis is missing | feedback-or-error | — |
| src/domain/buildCaseReport.ts:128:36 | text | revised | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:128:68 | text | revised comparison is missing | feedback-or-error | — |
| src/domain/buildCaseReport.ts:131:27 | text | evidence selections are missing or malformed | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:134:27 | text | reveal or revision evidence records are missing | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:140:37 | text | !sentenceIds.has(id))) throw developerError('evidence contains an unknown sentence'); const evidence = sentences.map | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/buildCaseReport.ts:140:83 | text | evidence contains an unknown sentence | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:143:64 | text | evidence for ${sentence.id} is missing or malformed | feedback-or-error | long-or-dense, missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:145:30 | text | supported | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:145:64 | text | evidence for ${sentence.id} is not supported | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:153:91 | text | revealed records are incomplete or invalid | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:155:27 | text | revision evidence is missing or invalid | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/buildCaseReport.ts:158:68 | text | rewrite draft is missing or malformed | feedback-or-error | — |
| src/domain/buildCaseReport.ts:160:35 | text | supported | feedback-or-error | repeated-text |
| src/domain/buildCaseReport.ts:160:69 | text | rewrite draft is not supported | feedback-or-error | — |
| src/domain/evaluateComparison.ts:6:130 | text | = { sharedFactOptionIds: 'shared-fact', differentExpressionOptionIds: 'different-expression', missingInformationOptionIds: 'missing-information', }; const CATEGORY_ORDER: readonly ComparisonCategory[] = [ 'sharedFactOptionIds', 'differentExpressionOptionIds', 'missingInformationOptionIds', ]; const MESSAGES: Readonly | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/evaluateComparison.ts:17:15 | text | 공통 사실·다른 표현·빠진 정보를 근거 문장과 연결했어요. | learner-text-candidate | — |
| src/domain/evaluateComparison.ts:18:27 | text | 비교 항목 일부가 근거와 연결되었어요. 빠진 정보도 더 살펴봐요. | learner-text-candidate | multiple-actions |
| src/domain/evaluateComparison.ts:19:12 | text | 비교 항목의 종류와 근거 문장을 다시 확인해요. | learner-text-candidate | multiple-actions |
| src/domain/evaluateComparison.ts:62:22 | text | revise | feedback-or-error | repeated-text |
| src/domain/evaluateEvidence.test.ts:37:39 | text | 2번 문장 | learner-text-candidate | — |
| src/domain/evaluateEvidence.ts:14:81 | text | status | feedback-or-error | repeated-text |
| src/domain/evaluateEvidence.ts:15:4 | text | ${sentence.number}번 문장: ${sentence.feedback[status]} | feedback-or-error | long-or-dense |
| src/domain/evaluateEvidence.ts:19:29 | text | status | feedback-or-error | repeated-text |
| src/domain/evaluateEvidence.ts:45:36 | text | revise | feedback-or-error | repeated-text |
| src/domain/evaluateEvidence.ts:51:36 | text | partially-supported | feedback-or-error | repeated-text |
| src/domain/evaluateEvidence.ts:54:34 | text | supported | feedback-or-error | repeated-text |
| src/domain/evaluateRewrite.test.ts:36:124 | text | 아마 그럴 것이다. | learner-text-candidate | — |
| src/domain/evaluateRewrite.test.ts:43:7 | text | fails closed for unknown target and block, and deduplicates feedback | feedback-or-error | long-or-dense |
| src/domain/evaluateRewrite.ts:6:15 | text | 필요한 사실을 모두 보존하고 관점에 맞게 다시 썼어요. | learner-text-candidate | — |
| src/domain/evaluateRewrite.ts:7:27 | text | 필요한 사실 일부가 빠졌어요. 빠진 사실을 더 넣어 보세요. | learner-text-candidate | — |
| src/domain/evaluateRewrite.ts:8:12 | text | 모순되거나 관점에 맞지 않는 표현이 있어요. 블록의 근거와 관점을 다시 확인해 보세요. | learner-text-candidate | — |
| src/domain/evaluateRewrite.ts:66:26 | text | revise | feedback-or-error | repeated-text |
| src/domain/sessionPersistence.test.ts:38:7 | text | converts quota errors to a result | feedback-or-error | — |
| src/domain/sessionPersistence.test.ts:39:130 | text | quota | feedback-or-error | — |
| src/domain/sessionPersistence.test.ts:39:139 | text | QuotaExceededError | feedback-or-error | repeated-text |
| src/domain/sessionPersistence.test.ts:90:123 | text | blocked | feedback-or-error | — |
| src/domain/sessionPersistence.ts:73:42 | text | ${error.name} ${error.message} | feedback-or-error | — |
| src/domain/validateCasePack.test.ts:17:50 | text | ${sentence.text}불일치 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.test.tsx:22:86 | text | { const choices = [ ['공통 사실', 'mut-comparison-umbrella'], ['다른 표현', 'mut-comparison-inference'], ['빠진 정보', 'mut-comparison-owner-blind-spot'], ] as const; for (const [group, optionId] of choices) { const fieldset = screen.getByRole('group', { name: group }); await user.click(fieldset.querySelector | input | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.test.tsx:24:7 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:25:7 | text | 다른 표현 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:26:7 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:50:9 | text | , ); const progress = screen.getByRole('status', { name: '비교 진행률' }); expect(progress).toHaveTextContent('비교 항목 0 / 3 · 근거 0개'); await user.click(screen.getByRole('group', { name: '공통 사실' }).querySelector | input | long-or-dense, multiple-actions |
| src/features/comparison/CrossExamination.test.tsx:53:58 | text | 비교 진행률 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:54:41 | text | 비교 항목 0 / 3 · 근거 0개 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.test.tsx:56:57 | text | 공통 사실 | input | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:57:41 | text | 비교 항목 1 / 3 · 근거 0개 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.test.tsx:60:41 | text | 비교 항목 1 / 3 · 근거 1개 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:83:58 | text | 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:87:30 | text | 잘 연결했어요 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:121:40 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:121:58 | text | 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:156:9 | text | , ); expect(screen.getByRole('button', { name: '관점 전환 시작' })).toHaveClass('gi-pulse'); expect(screen.queryByRole('button', { name: '수정 비교 완료' })).not.toBeInTheDocument(); expect(screen.getByRole('group', { name: '공통 사실' }).querySelector | button-or-action, input | long-or-dense |
| src/features/comparison/CrossExamination.test.tsx:159:30 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:159:48 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:159:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:160:32 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:160:50 | text | 수정 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:161:47 | text | 공통 사실 | input | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:161:88 | text | ('[data-option-id="mut-comparison-moved"]')).toBeChecked(); expect(screen.getByRole('group', { name: '공통 사실' }).querySelector | input | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.test.tsx:162:47 | text | 공통 사실 | input | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:163:48 | text | 비교 진행률 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:163:79 | text | 이유 1개 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.test.tsx:164:30 | text | heading | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:164:49 | text | 처음 생각 | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:165:30 | text | heading | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:165:49 | text | 처음 생각 | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:165:108 | text | 가람과 다온 모두 노란 우산을 보았다. | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:189:32 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:190:32 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:190:50 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:191:30 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:191:48 | text | 수정 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:226:30 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:226:48 | text | 추가 기록 열기 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:226:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:228:40 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:228:58 | text | 추가 기록 열기 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:229:30 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:232:8 | text | 02가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다. | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:233:8 | text | 03다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:234:8 | text | 04파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:236:48 | text | 추가 기록 안내 | instruction | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:238:74 | text | option.id === 'mut-comparison-moved')!; const differentGroup = screen.getByRole('group', { name: '공통 사실' }); await user.click(differentGroup.querySelector | input | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.test.tsx:239:63 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:245:30 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:245:48 | text | 수정 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:246:40 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:246:58 | text | 수정 비교 완료 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:248:30 | text | heading | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:248:49 | text | 처음 생각 | heading | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:249:33 | text | 가람과 다온 모두 노란 우산을 보았다. | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:250:30 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:250:48 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:250:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:251:40 | text | button | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.test.tsx:251:58 | text | 관점 전환 시작 | button-or-action | repeated-text |
| src/features/comparison/CrossExamination.tsx:27:94 | text | validFor | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:28:11 | text | sharedFactOptionIds | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:28:41 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:28:60 | text | shared-fact | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:29:11 | text | differentExpressionOptionIds | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:29:50 | text | 다른 표현 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:29:69 | text | different-expression | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:30:11 | text | missingInformationOptionIds | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:30:49 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:30:68 | text | missing-information | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:56:76 | text | sentence.id)); function ComparisonFeedbackPanel({ pack, feedback, live }: { pack: CasePack; feedback: ComparisonFeedback; live: boolean }) { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:66:15 | text | {feedbackStatusLabels[feedback.status]} | feedback-or-error | — |
| src/features/comparison/CrossExamination.tsx:68:13 | text | 근거 문장: {sentenceReferences(pack, feedback.supportingSentenceIds)} | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:99:39 | text | 이 사건에는 이 종류의 비교 항목이 없습니다. | hint | — |
| src/features/comparison/CrossExamination.tsx:114:36 | text | void; }) { const prefix = reason ? '이유 문장' : '근거 문장'; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:116:28 | text | 이유 문장 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:116:38 | text | 근거 문장 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:119:15 | text | {reason ? '생각이 달라진 이유를 보여 주는 문장' : '비교를 뒷받침하는 근거 문장'} | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:119:26 | text | 생각이 달라진 이유를 보여 주는 문장 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:119:51 | text | 비교를 뒷받침하는 근거 문장 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:120:38 | text | {reason ? '수정한 판단의 이유가 된 실제 서술 문장을 하나 이상 고르세요.' : '고른 비교 항목을 뒷받침하는 서술 문장을 모두 고르세요.'} | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/comparison/CrossExamination.tsx:121:20 | text | 수정한 판단의 이유가 된 실제 서술 문장을 하나 이상 고르세요. | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:121:60 | text | 고른 비교 항목을 뒷받침하는 서술 문장을 모두 고르세요. | learner-text-candidate | multiple-actions |
| src/features/comparison/CrossExamination.tsx:132:32 | text | ${prefix} · ${sentenceReference(pack, sentence.id)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:151:68 | text | selectedIds.has(option.id)); return ( | learner-text-candidate | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:153:59 | text | initial-thought-title | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:155:40 | text | 처음 생각 | heading | repeated-text |
| src/features/comparison/CrossExamination.tsx:156:33 | text | 저장된 초기 비교 · 읽기 전용 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:161:48 | text | 연결한 근거: {sentenceReferences(pack, draft.supportingSentenceIds)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:205:61 | text | supported | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:206:37 | text | initial | feedback-or-error | — |
| src/features/comparison/CrossExamination.tsx:206:71 | text | supported | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:207:38 | text | revised | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:221:31 | text | 비교 항목 ${selectedCategoryCount} / ${categories.length} · 근거 ${draft.supportingSentenceIds.length}개${phase === 'revised' ? | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:250:20 | text | reveal | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:250:77 | text | supported | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:253:29 | text | { if (!canSaveRevision) return; onSaveRevision(cloneDraft(draft), [...validReasonIds]); }; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:259:68 | text | comparison-title | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:262:68 | text | 교차 조사 | heading | repeated-text |
| src/features/comparison/CrossExamination.tsx:263:29 | text | 두 서술에서 공통 사실·다른 표현·빠진 정보를 찾아 근거 문장과 연결해 보세요. | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:266:70 | aria-label | 비교 진행률 | aria-label | repeated-text |
| src/features/comparison/CrossExamination.tsx:266:89 | text | polite | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:267:15 | text | 지금까지 고른 것 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:289:66 | text | neutral-record-title | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:291:43 | text | 추가 기록 | heading | repeated-text |
| src/features/comparison/CrossExamination.tsx:292:37 | text | 중립 기록 · 순서대로 공개됨 | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:294:69 | text | neutral-record-title | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:304:11 | text | ) : null} {phase !== 'reveal' && feedback ? | feedback-or-error | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:307:19 | text | reveal | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:307:105 | text | : null} {phase === 'reveal' && initialFeedback ? | feedback-or-error | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:308:19 | text | reveal | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:308:127 | text | : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:310:60 | text | {phase === 'initial' ? ( | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:315:27 | text | 세 비교 항목과 근거 문장을 연결했어요. 초기 비교를 저장하세요. | learner-text-candidate | multiple-actions |
| src/features/comparison/CrossExamination.tsx:317:12 | text | 비교 완료 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:319:31 | text | ) : null} {phase === 'reveal' ? ( | learner-text-candidate | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:323:69 | text | supported | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:324:85 | text | supported | feedback-or-error | repeated-text |
| src/features/comparison/CrossExamination.tsx:325:27 | text | 처음 생각을 저장했어요. 추가 중립 기록을 열어 보세요. | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:327:12 | text | 추가 기록 열기 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:329:31 | text | ) : null} {phase === 'revised' && !revisionSaved ? ( | learner-text-candidate | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:335:27 | text | 수정한 비교와 생각이 달라진 이유를 저장하세요. | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:337:12 | text | 수정 비교 완료 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:339:31 | text | ) : null} {phase === 'revised' && revisionSaved ? ( | learner-text-candidate | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:345:27 | text | 수정 비교가 저장되었어요. 관점 전환을 시작하세요. | learner-text-candidate | — |
| src/features/comparison/CrossExamination.tsx:347:12 | text | 관점 전환 시작 | learner-text-candidate | repeated-text |
| src/features/comparison/CrossExamination.tsx:349:31 | text | ) : null} | learner-text-candidate | technical-or-internal |
| src/features/comparison/CrossExamination.tsx:351:13 | text | {phase === 'initial' && !canSaveInitial ? | hint | — |
| src/features/comparison/CrossExamination.tsx:352:88 | text | 공통 사실·다른 표현·빠진 정보를 각각 하나 이상 고르고 필요한 근거 문장을 선택하세요. | hint | multiple-actions |
| src/features/comparison/CrossExamination.tsx:352:141 | text | : null} {phase === 'revised' && !canSaveRevision && !revisionSaved ? | hint | long-or-dense, technical-or-internal |
| src/features/comparison/CrossExamination.tsx:353:107 | text | 수정 비교가 뒷받침되고 이유 문장을 하나 이상 선택해야 저장할 수 있어요. | hint | multiple-actions, multiple-conditions |
| src/features/comparison/CrossExamination.tsx:353:152 | text | : null} | hint | repeated-text, technical-or-internal |
| src/features/comparison/NeutralRecordReveal.test.tsx:10:78 | text | record.visibility === 'reveal').reverse(); render( | learner-text-candidate | long-or-dense |
| src/features/comparison/NeutralRecordReveal.test.tsx:11:63 | text | neutral-title | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:13:30 | text | region | learner-text-candidate | — |
| src/features/comparison/NeutralRecordReveal.test.tsx:13:48 | text | 추가 기록 | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:13:76 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/comparison/NeutralRecordReveal.test.tsx:13:95 | text | neutral-title | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:15:8 | text | 02가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다. | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:16:8 | text | 03다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:17:8 | text | 04파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.test.tsx:19:48 | text | 추가 기록 안내 | instruction | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:9:60 | text | left.sequence - right.sequence); return ( | learner-text-candidate | — |
| src/features/comparison/NeutralRecordReveal.tsx:11:89 | aria-label | 추가 기록 | aria-label | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:12:55 | aria-label | 추가 중립 기록 | aria-label | — |
| src/features/comparison/NeutralRecordReveal.tsx:14:71 | text | 중립 기록 ${record.sequence} | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:15:73 | text | {String(record.sequence).padStart(2, '0')} | learner-text-candidate | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:20:75 | text | polite | instruction | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:20:95 | aria-label | 추가 기록 안내 | aria-label, instruction | repeated-text |
| src/features/comparison/NeutralRecordReveal.tsx:21:68 | text | record.text).join(' ') : '아직 공개된 추가 기록이 없습니다.'} | learner-text-candidate | — |
| src/features/comparison/NeutralRecordReveal.tsx:21:95 | text | 아직 공개된 추가 기록이 없습니다. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:11:54 | text | (`[data-sentence-id="${sentenceId}"]`); if (!element) throw new Error(`문장 카드를 찾지 못했습니다: ${sentenceId}`); return element; }; const categoryLabels = { observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현' } as const; const categoryOrder = ['observation', 'inference', 'evaluation'] as const; const submitSupportedSentence = async (user: ReturnType | button-or-action, feedback-or-error | long-or-dense, shaming-tone, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:12:34 | text | 문장 카드를 찾지 못했습니다: ${sentenceId} | feedback-or-error | shaming-tone, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:16:40 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:16:60 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:16:82 | text | 평가 표현 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:21:36 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:21:65 | text | 문장 ${sentence.number} | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:23:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:28:38 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:28:56 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:42:48 | text | 두 렌즈 요약 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:43:81 | text | ${lens.displayName}의 글 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:44:55 | text | 분류한 근거 요약 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:45:30 | text | heading | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:45:49 | text | 문장 카드 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:46:30 | text | heading | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:46:49 | text | 근거 모음 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:47:30 | text | 아직 모은 문장이 없어요. 문장 카드를 열어 분류해 보세요. | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:50:7 | text | supports keyboard classification, mixed segments, numbered feedback, and the ten-sentence gate | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:50:115 | text | { const user = userEvent.setup(); let selections: Record | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:64:30 | text | heading | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:64:49 | text | 근거 보드 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:65:47 | text | 분류 완료 0 / 10 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:69:48 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:73:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:73:58 | text | 관찰 사실 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:74:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:74:48 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:74:74 | text | gi-pulse | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:75:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:75:58 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:77:47 | text | 분류 완료 1 / 10 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:80:36 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:80:98 | text | 1번 문장 | feedback-or-error | — |
| src/features/evidence/EvidenceBoard.test.tsx:83:46 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:83:75 | text | 문장 ${mixed.number} | button-or-action | — |
| src/features/evidence/EvidenceBoard.test.tsx:86:59 | text | 해솔 문장 ${mixed.number} | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:89:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:89:48 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:90:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:90:58 | text | 인물의 추론 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:91:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:91:58 | text | 관찰 사실 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:94:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:94:48 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:95:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:95:58 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:97:36 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:97:98 | text | ${mixed.number}번 문장 | feedback-or-error | — |
| src/features/evidence/EvidenceBoard.test.tsx:101:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:101:48 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:101:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:102:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:102:48 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:103:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:103:58 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:107:7 | text | returns focus to updated feedback for repeated submissions of the same sentence | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:107:100 | text | { const user = userEvent.setup(); const recorded: EvidenceSelection[] = []; render( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:116:9 | text | , ); const firstSentence = playgroundStorageBox.narrators[0].sentences[0]!; const card = within(sentenceElement(firstSentence.id)); await user.click(card.getByRole('button', { name: /문장 1/ })); await user.click(screen.getByRole('button', { name: '인물의 추론' })); await user.click(screen.getByRole('button', { name: '근거 표시하기' })); const firstFeedback = document.querySelector | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:121:38 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:122:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:122:58 | text | 인물의 추론 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:123:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:123:58 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:125:62 | text | ('[role="status"][data-feedback-sentence]'); expect(firstFeedback).not.toBeNull(); expect(firstFeedback).toHaveTextContent(`${firstSentence.number}번 문장: ${firstSentence.feedback.revise}`); expect(firstFeedback).toHaveFocus(); await user.click(screen.getByRole('button', { name: '인물의 추론' })); await user.click(screen.getByRole('button', { name: '관찰 사실' })); await user.click(screen.getByRole('button', { name: '근거 표시하기' })); const secondFeedback = document.querySelector | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:125:64 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:127:46 | text | ${firstSentence.number}번 문장: ${firstSentence.feedback.revise} | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:130:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:130:58 | text | 인물의 추론 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:131:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:131:58 | text | 관찰 사실 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:132:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:132:58 | text | 근거 표시하기 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:134:65 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:136:47 | text | ${firstSentence.number}번 문장: ${firstSentence.feedback.supported} | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:141:7 | text | derives numbered feedback and status from persisted selections after remount | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:141:91 | text | { const sentence = playgroundStorageBox.narrators[0].sentences[0]!; const selections: Record | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:151:132 | text | ); const { unmount } = render(view()); const persistedFeedback = document.querySelector | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.test.tsx:155:66 | text | (`[data-feedback-sentence="${sentence.number}"]`); expect(persistedFeedback).not.toBeNull(); expect(persistedFeedback).toHaveTextContent(`${sentence.number}번 문장: ${sentence.feedback.supported}`); expect(persistedFeedback).toHaveClass('feedback-panel--supported'); expect(screen.queryByText('분류가 저장되었습니다.')).not.toBeInTheDocument(); unmount(); render(view()); const remountedFeedback = document.querySelector | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.test.tsx:155:68 | text | [data-feedback-sentence="${sentence.number}"] | feedback-or-error | long-or-dense, repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:157:50 | text | ${sentence.number}번 문장: ${sentence.feedback.supported} | feedback-or-error | long-or-dense, repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:158:44 | text | feedback-panel--supported | feedback-or-error | — |
| src/features/evidence/EvidenceBoard.test.tsx:159:32 | text | 분류가 저장되었습니다. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.test.tsx:163:68 | text | [data-feedback-sentence="${sentence.number}"] | feedback-or-error | long-or-dense, repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:165:50 | text | ${sentence.number}번 문장: ${sentence.feedback.supported} | feedback-or-error | long-or-dense, repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:166:48 | text | data-feedback-sentence | feedback-or-error | — |
| src/features/evidence/EvidenceBoard.test.tsx:186:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:186:48 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:199:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:199:48 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:201:30 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:201:48 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:201:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:202:36 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:203:40 | text | button | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.test.tsx:203:58 | text | 교차 조사 시작 | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:18:75 | text | ; const categoryLabels: Readonly | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:21:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:22:15 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:23:16 | text | 평가 표현 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:43:15 | text | 문장 부분을 모두 확인하세요 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:66:15 | text | 이 문장의 근거를 분류하세요 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:75:12 | text | {categoryLabels[category]} | button-or-action | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:90:102 | text | ({}); const submissionRevision = useRef(0); const [latestFeedback, setLatestFeedback] = useState | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:92:104 | text | (null); const feedbackRef = useRef | feedback-or-error | technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:95:18 | text | { if (!latestFeedback) return; feedbackRef.current?.focus(); }, [latestFeedback]); const effectiveSelections: Readonly | feedback-or-error | long-or-dense |
| src/features/evidence/EvidenceBoard.tsx:178:10 | text | ); }; return ( | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:183:66 | text | evidence-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:186:66 | text | 근거 보드 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:187:29 | text | 문장을 고른 뒤, 보이는 사실·인물의 추론·평가 표현을 근거로 분류해 보세요. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:190:59 | aria-label | 근거 보드 진행 안내 | aria-label, instruction | — |
| src/features/evidence/EvidenceBoard.tsx:191:56 | text | 진행 안내 | instruction | — |
| src/features/evidence/EvidenceBoard.tsx:192:17 | text | {supportedCount} / {sentences.length} 문장 분류 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:196:64 | text | evidence-lens-summary-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:197:74 | text | 두 렌즈 요약 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:201:78 | text | {index === 0 ? 'A' : 'B'} | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:202:23 | text | 렌즈 {index === 0 ? 'A' : 'B'} | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:203:21 | text | {lens.displayName}의 글 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:211:65 | aria-label | 분류한 근거 요약 | aria-label | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:213:19 | text | 비교 포인트 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:217:21 | text | {categoryLabels[category]} | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:225:59 | aria-label | 근거 분류 안내 | aria-label, instruction | — |
| src/features/evidence/EvidenceBoard.tsx:226:78 | text | 분류 완료 {supportedCount} / {sentences.length} | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:227:61 | text | 10개 문장 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:228:15 | text | 혼합 문장은 문장 부분을 모두 선택 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:230:71 | text | evidence-workspace-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:233:47 | text | 문장 카드 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:234:16 | text | 카드를 열어 근거 종류를 고르고, 표시한 문장은 아래 보드에 모입니다. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:236:60 | text | 선택한 근거 | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:238:64 | aria-label | 근거 종류별 모음 | aria-label | — |
| src/features/evidence/EvidenceBoard.tsx:244:23 | text | {categoryLabels[category]} | heading | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:251:24 | text | 카드를 열어 이 칸에 모아 보세요. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:256:61 | text | evidence-tray-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:259:44 | text | 근거 모음 | heading | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:260:18 | text | 분류한 문장을 다시 읽으며 다음 단계의 비교를 준비하세요. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:262:19 | text | {selectedEvidence.length}개 모음 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:268:44 | text | {sentenceLens.get(sentence.id) ?? '?'} | learner-text-candidate | technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:273:51 | text | 아직 모은 문장이 없어요. 문장 카드를 열어 분류해 보세요. | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:275:51 | aria-label | 분류할 근거 문장 | aria-label | — |
| src/features/evidence/EvidenceBoard.tsx:276:39 | text | { const pressed = sentence.id === activeSentence?.id; const contextLabel = sentenceOwners.get(sentence.id); const saved = effectiveSelections[sentence.id]; const savedFeedback: EvidenceFeedback \| null = saved ? evaluateEvidenceSelection(sentence, saved) : null; const isLatestFeedback = latestFeedback?.sentenceId === sentence.id; return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:286:57 | text | classify-evidence | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:286:164 | text | {cardDetails(sentence)} | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:288:32 | text | {savedFeedback ? | feedback-or-error | — |
| src/features/evidence/EvidenceBoard.tsx:289:149 | text | : null} | feedback-or-error | repeated-text, technical-or-internal |
| src/features/evidence/EvidenceBoard.tsx:301:27 | text | 문장을 분류하고 근거를 표시해 보세요. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:303:12 | text | 근거 표시하기 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:310:25 | text | 열 문장을 모두 분류했어요. 교차 조사를 시작하세요. | learner-text-candidate | — |
| src/features/evidence/EvidenceBoard.tsx:312:10 | text | 교차 조사 시작 | learner-text-candidate | repeated-text |
| src/features/evidence/EvidenceBoard.tsx:315:13 | text | {effectiveFirstUnclassified && !activeSentence ? | hint | long-or-dense |
| src/features/evidence/EvidenceBoard.tsx:316:95 | text | 아직 분류하지 않은 문장을 선택하세요. | hint | — |
| src/features/evidence/EvidenceBoard.tsx:316:120 | text | : null} | hint | repeated-text, technical-or-internal |
| src/features/intake/CaseIntake.test.tsx:31:33 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:32:30 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:33:59 | text | 먼저 사건과 첫 생각을 골라 주세요. | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.test.tsx:35:40 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:39:56 | text | 시간 기록 | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.test.tsx:41:40 | text | 15:20 정리 종이 울렸다. | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.test.tsx:42:43 | text | 교차 조사 뒤 공개 | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.test.tsx:50:30 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:50:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:51:59 | text | 첫 생각을 하나 골라 주세요. | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.test.tsx:56:30 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:56:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:58:30 | text | button | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:58:48 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| src/features/intake/CaseIntake.test.tsx:58:75 | text | gi-pulse | button-or-action | repeated-text |
| src/features/intake/CaseIntake.tsx:16:10 | text | seen-information | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:16:37 | text | 보이는 정보가 가장 중요하다고 생각한다. | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:17:10 | text | priority | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:17:29 | text | 인물이 먼저 해야 할 일이 가장 중요하다고 생각한다. | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:18:10 | text | evaluative-language | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:18:40 | text | 표현에 담긴 판단이 사건을 가장 잘 보여 준다고 생각한다. | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:25:49 | text | record.visibility === 'reveal').length; const gateMessage = !selectedPack ? '먼저 사건과 첫 생각을 골라 주세요.' : !session.initialHypothesis ? '첫 생각을 하나 골라 주세요.' : null; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/intake/CaseIntake.tsx:27:8 | text | 먼저 사건과 첫 생각을 골라 주세요. | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:29:10 | text | 첫 생각을 하나 골라 주세요. | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:33:64 | text | intake-title | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:36:64 | text | 사건 접수 | heading | repeated-text |
| src/features/intake/CaseIntake.tsx:37:29 | text | 중립적인 기록을 확인하고, 두 렌즈를 읽기 전 첫 생각을 골라 보세요. | learner-text-candidate | multiple-actions |
| src/features/intake/CaseIntake.tsx:40:53 | text | case-picker-title | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:42:38 | text | 사건 선택 | heading | repeated-text |
| src/features/intake/CaseIntake.tsx:43:35 | text | 4개의 가상 사건 | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:46:35 | text | { const selected = pack.id === session.caseId; return ( | button-or-action | long-or-dense, technical-or-internal |
| src/features/intake/CaseIntake.tsx:53:30 | text | ${pack.title} 사건 선택 · ${pack.focusQuestion} | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:59:55 | text | {selected ? '선택됨' : '사건 선택'} | learner-text-candidate | multiple-actions |
| src/features/intake/CaseIntake.tsx:59:68 | text | 선택됨 | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:59:76 | text | 사건 선택 | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:77:58 | text | timeline-title | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:79:39 | text | 시간 기록 | heading | repeated-text |
| src/features/intake/CaseIntake.tsx:80:39 | text | 먼저 보이는 기록만 | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:82:56 | aria-label | 시간 기록 | aria-label | repeated-text |
| src/features/intake/CaseIntake.tsx:85:73 | text | {String(record.sequence).padStart(2, '0')} | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:91:73 | text | {String(intakeRecords.length + index + 1).padStart(2, '0')} | learner-text-candidate | long-or-dense |
| src/features/intake/CaseIntake.tsx:92:37 | aria-label | 교차 조사 뒤 공개 | aria-label | repeated-text |
| src/features/intake/CaseIntake.tsx:92:49 | text | 교차 조사 뒤 공개 | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:98:60 | text | hypothesis-title | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:100:45 | text | 첫 생각을 골라 보세요 | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:101:46 | text | 정답을 맞히는 단계가 아니라, 나중에 생각이 어떻게 달라졌는지 살펴보기 위한 기록입니다. | feedback-or-error | multiple-actions |
| src/features/intake/CaseIntake.tsx:119:54 | aria-label | 활동 안내 | aria-label, instruction | — |
| src/features/intake/CaseIntake.tsx:131:25 | text | 사건과 첫 생각을 골랐어요. 사건 렌즈를 열어 보세요. | learner-text-candidate | — |
| src/features/intake/CaseIntake.tsx:133:10 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| src/features/intake/CaseIntake.tsx:136:13 | text | {gateMessage ? | hint | — |
| src/features/intake/CaseIntake.tsx:137:96 | text | : null} | hint | repeated-text, technical-or-internal |
| src/features/lenses/LensReader.test.tsx:27:57 | text | { expect(screen.getByText(narrator.displayName, { exact: true })).toBeInTheDocument(); expect(screen.getByText(narrator.roleLabel, { exact: true })).toBeInTheDocument(); expect(screen.getByRole('img', { name: new RegExp(narrator.displayName) })).toBeInTheDocument(); }); expect(document.querySelectorAll('[data-border-style]')).toHaveLength(2); expect(new Set([...document.querySelectorAll | learner-text-candidate | long-or-dense |
| src/features/lenses/LensReader.test.tsx:36:49 | text | 렌즈 선택 | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.test.tsx:43:69 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/lenses/LensReader.test.tsx:44:57 | text | 차이 요약 | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.test.tsx:48:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:48:51 | text | 중요 문장 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:49:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:49:51 | text | 읽음 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:50:30 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:50:48 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:53:43 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:53:61 | text | 읽음 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:54:43 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:54:61 | text | 읽음 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:55:43 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:55:61 | text | 중요 문장 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:56:43 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:56:61 | text | 중요 문장 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:59:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:59:51 | text | 읽음 취소 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:60:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:60:51 | text | 중요 표시 취소 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:61:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:61:51 | text | 중요 표시 취소 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:61:85 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/lenses/LensReader.test.tsx:61:101 | text | true | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:62:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:62:51 | text | 중요 표시 취소 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:62:85 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/lenses/LensReader.test.tsx:62:101 | text | true | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:63:33 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:63:51 | text | 중요 문장 표시 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:64:30 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:64:48 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:66:30 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:66:48 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:66:76 | text | gi-pulse | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:93:24 | text | { expect(screen.getByRole('tab', { name: '렌즈 B' })).toHaveAttribute('aria-selected', 'true'); const target = document.querySelector | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/lenses/LensReader.test.tsx:94:47 | text | 렌즈 B | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.test.tsx:97:37 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.test.tsx:113:81 | text | ); const firstTab = screen.getByRole('tab', { name: '렌즈 A' }); firstTab.focus(); rerender( | learner-text-candidate | long-or-dense |
| src/features/lenses/LensReader.test.tsx:114:55 | text | 렌즈 A | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.test.tsx:122:45 | text | 렌즈 B | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:17:54 | text | = { clipboard: 'M106 58h108v88H106z M132 58v-12h56v12 M132 84h56 M132 108h36', ball: 'M160 50a50 50 0 1 0 0 100a50 50 0 1 0 0-100 M125 65c18 14 52 14 70 0 M116 119c25-17 63-17 88 0', umbrella: 'M105 98a55 55 0 0 1 110 0H105 M160 98v43c0 16 22 17 22 2', info: 'M160 54a50 50 0 1 0 0 100a50 50 0 1 0 0-100 M160 91v41 M160 76v1', poster: 'M112 50h96v106h-96z M130 77h60 M130 101h36 M130 128h52', reader: 'M107 56h45c12 0 20 8 20 20v63h-45c-12 0-20-8-20-20z M213 56h-45c-12 0-20 8-20 20v63h45c12 0 20-8 20-20z', window: 'M105 52h110v102H105z M160 52v102 M105 103h110 M82 154h156', book: 'M104 59c19-7 38-5 56 7v87c-18-12-37-14-56-7z M216 59c-19-7-38-5-56 7v87c18-12 37-14 56-7z', }; function LensIcon({ lens }: { lens: NarratorLens }) { return ( | learner-text-candidate | long-or-dense |
| src/features/lenses/LensReader.tsx:30:66 | text | ${lens.displayName} 아이콘 | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:30:125 | text | false | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:49:53 | text | void; }) { const panelTitleId = `${lens.id}-panel-title`; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/lenses/LensReader.tsx:59:25 | text | ${lens.id}-tab | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/lenses/LensReader.tsx:74:10 | text | {isRead ? '읽음 취소' : '읽음 표시'} | button-or-action | — |
| src/features/lenses/LensReader.tsx:75:22 | text | 읽음 취소 | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:75:32 | text | 읽음 표시 | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:78:51 | text | ${lens.displayName} 서술 문장 | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:129:27 | text | element.dataset.sentenceId === focusSentenceId); const button = target?.querySelector | button-or-action | long-or-dense, technical-or-internal |
| src/features/lenses/LensReader.tsx:130:64 | text | button | button-or-action | repeated-text |
| src/features/lenses/LensReader.tsx:145:53 | text | markedSentenceIds.includes(sentence.id)); return read && marked; }); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/lenses/LensReader.tsx:150:64 | text | lenses-title | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:153:64 | text | 렌즈 A/B | heading | repeated-text |
| src/features/lenses/LensReader.tsx:154:29 | text | 같은 사건을 본 두 인물의 문장을 나란히 읽고, 중요한 문장을 골라 보세요. | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:157:61 | aria-label | 렌즈 선택 | aria-label | repeated-text |
| src/features/lenses/LensReader.tsx:158:45 | text | { const selected = lens.id === activeNarratorId; return ( | button-or-action | long-or-dense, technical-or-internal |
| src/features/lenses/LensReader.tsx:166:31 | text | ${lens.id}-panel | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/lenses/LensReader.tsx:179:14 | text | {index === 0 ? '렌즈 A' : '렌즈 B'} | button-or-action | — |
| src/features/lenses/LensReader.tsx:180:31 | text | 렌즈 A | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:180:40 | text | 렌즈 B | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:200:78 | text | difference-summary-title | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:202:45 | text | 차이 요약 | heading | repeated-text |
| src/features/lenses/LensReader.tsx:203:35 | text | 관점의 메타데이터 | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:206:20 | text | 위치 | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:207:20 | text | 관심 | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:208:20 | text | 목적 | learner-text-candidate | repeated-text |
| src/features/lenses/LensReader.tsx:213:48 | text | 두 렌즈에 읽음 표시를 하고, 각 렌즈에서 중요 문장을 하나 이상 골라 주세요. | hint | — |
| src/features/lenses/LensReader.tsx:217:25 | text | 두 렌즈를 살펴봤어요. 근거 보드로 이동하세요. | learner-text-candidate | — |
| src/features/lenses/LensReader.tsx:219:10 | text | 근거 보드로 이동 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:51:43 | text | heading | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:53:8 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:54:8 | text | 사용한 근거 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:55:8 | text | 처음 생각과 수정한 생각 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:56:8 | text | 관점 전환에서 유지한 사실 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:57:8 | text | 오늘 배운 점 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:58:8 | text | 다음에 해 볼 일 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:59:8 | text | 남은 질문 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:62:43 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:65:40 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:66:40 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:68:30 | text | 다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다. | instruction | repeated-text |
| src/features/report/CaseReport.test.tsx:69:30 | text | 파란 표찰은 우산 걸이 아래로 떨어져 있었다. | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:70:30 | text | 보이는 정보를 살핀 관점 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:73:46 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:73:64 | text | 가람 근거 문장 4 다시 보기 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:74:44 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:74:62 | text | 가람 이유 문장 4 다시 보기 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:75:50 | text | 가람 근거 문장 4 다시 보기 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:76:48 | text | 가람 이유 문장 4 다시 보기 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:94:30 | text | heading | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:94:49 | text | 오늘 배운 점 | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:95:30 | text | heading | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:95:49 | text | 다음에 해 볼 일 | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:96:40 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:96:58 | text | 가람 이유 문장 4 다시 보기 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:100:7 | text | namespaces print headings and keeps every ARIA reference unique | heading | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/report/CaseReport.test.tsx:100:78 | text | { render( | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:109:60 | text | ('.case-report--print'); expect(normalReport).toHaveAttribute('aria-labelledby', 'report-title'); expect(normalReport?.querySelector('#report-title')).toHaveAttribute('data-stage-heading'); expect(printReport).toHaveAttribute('aria-labelledby', 'teacher-print-report-title'); expect(printReport?.querySelector('#teacher-print-report-title')).not.toHaveAttribute('data-stage-heading'); const ids = [...document.querySelectorAll | heading | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.test.tsx:110:43 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/report/CaseReport.test.tsx:110:62 | text | report-title | learner-text-candidate | — |
| src/features/report/CaseReport.test.tsx:111:41 | text | #report-title | heading | — |
| src/features/report/CaseReport.test.tsx:111:75 | text | data-stage-heading | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:112:42 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/report/CaseReport.test.tsx:112:61 | text | teacher-print-report-title | learner-text-candidate | — |
| src/features/report/CaseReport.test.tsx:113:40 | text | #teacher-print-report-title | heading | — |
| src/features/report/CaseReport.test.tsx:113:92 | text | data-stage-heading | heading | repeated-text |
| src/features/report/CaseReport.test.tsx:115:85 | text | element.id).filter(Boolean); expect(new Set(ids).size).toBe(ids.length); for (const element of document.querySelectorAll | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.test.tsx:117:67 | text | [aria-labelledby] | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/report/CaseReport.test.tsx:118:46 | text | aria-labelledby | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/report/CaseReport.test.tsx:128:44 | text | 인물별 문장 번호와 근거 연결 상태를 참고하세요. | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:130:44 | text | 가람 근거 문장 1 | learner-text-candidate | — |
| src/features/report/CaseReport.test.tsx:131:44 | text | 잘 연결했어요 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:133:43 | text | .case-report__sentence-button | button-or-action | — |
| src/features/report/CaseReport.test.tsx:143:39 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:143:57 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:146:48 | text | 현재 기록을 지울까요? | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:148:40 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:148:58 | text | 취소 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:153:40 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:153:58 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:161:39 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:161:57 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:163:56 | text | 현재 기록을 지울까요? | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.test.tsx:164:30 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:164:48 | text | 취소 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:170:30 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:170:48 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:172:30 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:172:48 | text | 취소 | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:174:30 | text | button | button-or-action | repeated-text |
| src/features/report/CaseReport.test.tsx:174:48 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.tsx:13:17 | text | void; printMode?: boolean; } const hypothesisLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.tsx:17:58 | text | initialHypothesis | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:17:87 | text | = { 'seen-information': '보이는 정보를 먼저 살폈어요.', priority: '무엇을 먼저 챙길지에 초점을 두었어요.', 'evaluative-language': '말에 담긴 평가 표현을 먼저 살폈어요.', }; type ComparisonKey = 'sharedFactOptionIds' \| 'differentExpressionOptionIds' \| 'missingInformationOptionIds'; const comparisonLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.tsx:18:24 | text | 보이는 정보를 먼저 살폈어요. | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:19:14 | text | 무엇을 먼저 챙길지에 초점을 두었어요. | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:20:27 | text | 말에 담긴 평가 표현을 먼저 살폈어요. | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:25:25 | text | 공통 사실 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:26:34 | text | 다른 표현 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:27:33 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:39:42 | text | option.id === optionId)?.label ?? optionId ); function ComparisonSnapshot({ pack, title, draft, onRevisitStage, onRevisitSentence, readOnly = false }: { pack: CasePack; title: string; draft: CaseReportModel['initialComparison']; onRevisitStage: CaseReportProps['onRevisitStage']; onRevisitSentence?: CaseReportProps['onRevisitSentence']; readOnly?: boolean }) { const keys = Object.keys(comparisonLabels) as ComparisonKey[]; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.tsx:42:163 | text | initialComparison | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:42:217 | text | onRevisitStage | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:42:272 | text | onRevisitSentence | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:49:17 | text | {comparisonLabels[key]} | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:52:64 | text | {optionLabel(pack, optionId)} | learner-text-candidate | technical-or-internal |
| src/features/report/CaseReport.tsx:54:36 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:58:15 | text | 연결한 근거 문장 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:64:23 | text | ${title}-${sentenceId}-${index} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/report/CaseReport.tsx:68:25 | text | 근거 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:75:37 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:78:11 | text | ); } function SentenceRevisit({ pack, sentenceId, sentenceNumber, onRevisitStage, onRevisitSentence, prefix = '근거', context, readOnly = false, }: { pack: CasePack; sentenceId: string; sentenceNumber: number; onRevisitStage: CaseReportProps['onRevisitStage']; onRevisitSentence?: CaseReportProps['onRevisitSentence']; prefix?: string; context?: string; readOnly?: boolean; }) { const info = sentenceInfo(pack, sentenceId); const label = info ? `${context ? `${context} · ` : ''}${info.narrator.displayName} ${prefix} 문장 ${sentenceNumber}${readOnly ? '' : ' 다시 보기'}` : '근거 문장 다시 보기'; if (readOnly) { return | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/CaseReport.tsx:88:13 | text | 근거 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:103:35 | text | : ''}${info.narrator.displayName} ${prefix} 문장 ${sentenceNumber}${readOnly ? '' : ' 다시 보기'} | learner-text-candidate | long-or-dense |
| src/features/report/CaseReport.tsx:104:8 | text | 근거 문장 다시 보기 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:106:106 | text | ; } return ( | button-or-action | — |
| src/features/report/CaseReport.tsx:116:14 | text | ); } export function CaseReport({ model, pack, onRevisitStage, onRevisitSentence, onReset, printMode = false }: CaseReportProps) { const headingPrefix = printMode ? 'teacher-print-report' : 'report'; const reportBody = ( resetTriggerRef: RefObject | heading, button-or-action | long-or-dense |
| src/features/report/CaseReport.tsx:121:38 | text | teacher-print-report | heading | — |
| src/features/report/CaseReport.tsx:121:63 | text | report | heading | repeated-text |
| src/features/report/CaseReport.tsx:129:70 | text | data-stage-heading | heading | repeated-text |
| src/features/report/CaseReport.tsx:129:119 | text | 사건 보고서 | heading | repeated-text |
| src/features/report/CaseReport.tsx:130:35 | text | 무엇을 보았고, 어떤 생각을 고쳐 보았는지 근거와 함께 돌아봅니다. | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:133:73 | text | ${headingPrefix}-evidence-title | heading | missing-term-explanation, technical-or-internal |
| src/features/report/CaseReport.tsx:134:58 | text | 사용한 근거 | heading | repeated-text |
| src/features/report/CaseReport.tsx:135:49 | text | {printMode ? '인물별 문장 번호와 근거 연결 상태를 참고하세요.' : '두 렌즈의 문장을 순서대로 확인했어요. 문장을 다시 읽으려면 해당 버튼을 누르세요.'} | learner-text-candidate | ambiguous-reference, long-or-dense, multiple-actions |
| src/features/report/CaseReport.tsx:135:63 | text | 인물별 문장 번호와 근거 연결 상태를 참고하세요. | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:135:95 | text | 두 렌즈의 문장을 순서대로 확인했어요. 문장을 다시 읽으려면 해당 버튼을 누르세요. | learner-text-candidate | ambiguous-reference, multiple-actions |
| src/features/report/CaseReport.tsx:147:119 | text | {feedbackStatusLabels[evidence.status]} | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/report/CaseReport.tsx:155:73 | text | ${headingPrefix}-thought-title | heading | — |
| src/features/report/CaseReport.tsx:156:57 | text | 처음 생각과 수정한 생각 | heading | repeated-text |
| src/features/report/CaseReport.tsx:158:23 | text | 처음 고른 초점 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:159:20 | text | {hypothesisLabels[model.initialHypothesis]} | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:162:56 | title | 처음 비교 | title | — |
| src/features/report/CaseReport.tsx:163:56 | title | 수정한 비교 | title | — |
| src/features/report/CaseReport.tsx:166:23 | text | 달라진 비교 항목 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:167:91 | text | optionLabel(pack, id)).join(' · ') : '바뀐 항목 없음'} | learner-text-candidate | technical-or-internal |
| src/features/report/CaseReport.tsx:167:130 | text | 바뀐 항목 없음 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:170:23 | text | 생각이 달라진 이유 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:180:33 | text | 이유 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:191:73 | text | ${headingPrefix}-preserved-title | heading | — |
| src/features/report/CaseReport.tsx:192:59 | text | 관점 전환에서 유지한 사실 | heading | repeated-text |
| src/features/report/CaseReport.tsx:194:23 | text | 보존한 사실 표지 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:196:66 | aria-label | 보존한 사실 | aria-label | repeated-text |
| src/features/report/CaseReport.tsx:201:24 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:204:23 | text | 사용한 관점 표지 | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:206:65 | aria-label | 사용한 관점 | aria-label | — |
| src/features/report/CaseReport.tsx:208:64 | text | {perspectiveTagLabels[tag] ?? '기록된 관점'} | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:208:95 | text | 기록된 관점 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:211:24 | text | 기록 없음 | learner-text-candidate | repeated-text |
| src/features/report/CaseReport.tsx:215:73 | text | ${headingPrefix}-takeaway-title | heading | — |
| src/features/report/CaseReport.tsx:216:58 | text | 오늘 배운 점 | heading | repeated-text |
| src/features/report/CaseReport.tsx:220:73 | text | ${headingPrefix}-next-step-title | heading | — |
| src/features/report/CaseReport.tsx:221:59 | text | 다음에 해 볼 일 | heading | repeated-text |
| src/features/report/CaseReport.tsx:225:73 | text | ${headingPrefix}-questions-title | heading | — |
| src/features/report/CaseReport.tsx:226:59 | text | 남은 질문 | heading | repeated-text |
| src/features/report/CaseReport.tsx:231:53 | text | 더 살펴볼 빠진 정보가 없어요. 그래도 새로운 근거가 보이면 다시 질문해 보세요. | learner-text-candidate | — |
| src/features/report/CaseReport.tsx:241:18 | text | 다른 사건 접수 | button-or-action | repeated-text |
| src/features/report/CaseReport.tsx:246:8 | text | ); return ( | heading | repeated-text |
| src/features/report/CaseReport.tsx:250:113 | text | ${headingPrefix}-title | heading | — |
| src/features/report/CaseReport.tsx:250:138 | text | {printMode ? ( | heading | — |
| src/features/report/ReportResetControl.tsx:6:17 | text | void; children: (triggerRef: RefObject | learner-text-candidate | technical-or-internal |
| src/features/report/ReportResetControl.tsx:7:89 | text | ReactNode; } /** Shared, confirmed reset UI for the normal and incomplete-report states. */ export function ReportResetControl({ onReset, children }: ReportResetControlProps) { const [isOpen, setIsOpen] = useState(false); const triggerRef = useRef | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/ReportResetControl.tsx:13:47 | text | (null); const backgroundRef = useRef | learner-text-candidate | technical-or-internal |
| src/features/report/ReportResetControl.tsx:53:16 | title | 현재 기록을 지울까요? | title | repeated-text |
| src/features/report/ReportResetControl.tsx:59:40 | text | 진행 중인 답과 저장하지 않은 메모가 지워집니다. 따로 저장한 메모는 남아 있어요. | learner-text-candidate | — |
| src/features/report/ReportResetControl.tsx:61:49 | text | 취소 | button-or-action | repeated-text |
| src/features/report/ReportResetControl.tsx:62:51 | text | 현재 기록 지우고 새 사건 접수 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:24:19 | text | 표찰을 보지 못한 점을 근거로 쓰기 | learner-text-candidate | — |
| src/features/rewrite/MemoPad.test.tsx:25:59 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:30:40 | text | button | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:30:58 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:35:49 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:37:40 | text | button | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:37:58 | text | 저장된 메모 삭제 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:39:49 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:46:48 | text | quota exceeded | feedback-or-error | — |
| src/features/rewrite/MemoPad.test.tsx:46:66 | text | QuotaExceededError | feedback-or-error | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:51:59 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:52:32 | text | 학습을 계속할 수 있는 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:53:40 | text | button | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:53:58 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:55:35 | text | 학습을 계속할 수 있는 개인 메모 | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:58:30 | text | button | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:58:48 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:59:30 | text | button | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.test.tsx:59:48 | text | 저장된 메모 삭제 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.tsx:13:39 | text | 이 기기에 메모를 저장했어요. | learner-text-candidate | repeated-text |
| src/features/rewrite/MemoPad.tsx:13:60 | text | 저장된 메모를 삭제했어요. | learner-text-candidate | — |
| src/features/rewrite/MemoPad.tsx:14:35 | text | 저장 공간이 부족해 메모를 저장하지 못했어요. 메모는 화면에 남아 있으니 학습을 계속하세요. | learner-text-candidate | shaming-tone |
| src/features/rewrite/MemoPad.tsx:16:8 | text | 이 기기에 메모를 저장하지 못했어요. 메모는 화면에 남아 있으니 학습을 계속하세요. | learner-text-candidate | shaming-tone |
| src/features/rewrite/MemoPad.tsx:17:8 | text | 저장된 메모를 삭제하지 못했어요. 화면의 메모는 그대로 두었어요. | learner-text-candidate | shaming-tone |
| src/features/rewrite/MemoPad.tsx:35:23 | text | { const result = deleteSavedMemo(storage); announce(result.ok, 'delete', result.reason); if (result.ok) setMemo(''); }; return ( | learner-text-candidate | long-or-dense |
| src/features/rewrite/MemoPad.tsx:42:74 | text | memo-pad-title | learner-text-candidate | — |
| src/features/rewrite/MemoPad.tsx:44:33 | text | 나만의 메모 | heading | — |
| src/features/rewrite/MemoPad.tsx:45:33 | text | 이 사건에서 떠오른 생각 | learner-text-candidate | — |
| src/features/rewrite/MemoPad.tsx:48:21 | aria-label | 개인 메모 | aria-label | repeated-text |
| src/features/rewrite/MemoPad.tsx:52:22 | placeholder | 근거를 보고 떠오른 생각을 적어 보세요. | placeholder, input | — |
| src/features/rewrite/MemoPad.tsx:54:40 | text | 저장하지 않은 메모는 이 탭을 닫으면 사라집니다. 메모는 다시 쓰기 판단이나 결과에 반영되지 않아요. | learner-text-candidate | — |
| src/features/rewrite/MemoPad.tsx:56:46 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.tsx:57:48 | text | 저장된 메모 삭제 | button-or-action | repeated-text |
| src/features/rewrite/MemoPad.tsx:58:13 | text | {statusMessage ? | learner-text-candidate | — |
| src/features/rewrite/MemoPad.tsx:59:108 | text | : null} | learner-text-candidate | repeated-text, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:38:57 | text | 나래 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:39:57 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:40:57 | text | 사실 보고 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:42:57 | text | 사용 가능한 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:47:64 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:47:82 | text | 블록 넣기: 이번 주 금요일인 2026년 8월 28일 방과 후에 모인다. | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:50:66 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:50:84 | text | 블록 넣기: 모임 장소는 과학실이다. | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:52:57 | text | 조립한 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:56:71 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:56:89 | text | 위로 이동: 모임 장소는 과학실이다. | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:57:63 | text | item.getAttribute('data-block-id'))).toEqual([ 'cnp-block-place-a', 'cnp-block-date-a', ]); const movedPlace = assembled.querySelector('[data-block-id="cnp-block-place-a"]'); expect(movedPlace).not.toBeNull(); await user.click(within(movedPlace as HTMLElement).getByRole('button', { name: '블록 빼기: 모임 장소는 과학실이다.' })); expect(assembled.querySelector('[data-block-id="cnp-block-place-a"]')).toBeNull(); const missing = draftFor(0, ['cnp-block-date-a']); rerender( | button-or-action | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:62:67 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:62:85 | text | 블록 빼기: 모임 장소는 과학실이다. | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:69:24 | text | expect(screen.getByRole('button', { name: '관점 전환 완료' })).not.toHaveClass('gi-pulse')); expect(screen.getByRole('button', { name: '관점 전환 완료' })).toBeDisabled(); for (const [ruleIndex, rule] of clubNoticePoster.rewriteRules.entries()) { for (const blockIds of rule.acceptedExampleBlockSets) { const accepted = draftFor(ruleIndex, blockIds); rerender( | button-or-action | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:69:50 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:69:68 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:69:99 | text | gi-pulse | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:70:30 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:70:48 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:78:28 | text | expect(screen.getByRole('button', { name: '관점 전환 완료' })).toHaveClass('gi-pulse')); const complete = screen.getByRole('button', { name: '관점 전환 완료' }); expect(complete).toBeEnabled(); expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1); expect(evaluateRewrite(clubNoticePoster, accepted).status).toBe('supported'); await user.click(complete); } } expect(continued).toBe(true); const contradictoryPack: CasePack = { ...clubNoticePoster, rewriteRules: [{ ...firstRule, contradictoryBlockIds: ['cnp-block-place-a'] }, clubNoticePoster.rewriteRules[1]!], }; rerender( | button-or-action | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:78:54 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:78:72 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:78:99 | text | gi-pulse | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:79:44 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:79:62 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:95:50 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:95:68 | text | 관점 전환 완료 | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:95:99 | text | gi-pulse | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:97:40 | text | heading | heading, feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:97:59 | text | 다시 쓰기 확인 | heading, feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:98:41 | text | 모임 장소는 과학실이다. | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:99:45 | text | cnp-block-place-a | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:114:57 | text | 나래 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:115:57 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:116:57 | text | 사실 보고 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:117:57 | text | 사용 가능한 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:119:19 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:119:37 | text | 블록 넣기: ${clubNoticePoster.rewriteBlocks.find((block) => block.id === blockId)!.text} | button-or-action | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:131:57 | text | 조립한 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:133:45 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:133:63 | text | 위로 이동: 모임 장소는 과학실이다. | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:140:50 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:140:68 | text | 블록 빼기: 모임 장소는 과학실이다. | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:158:51 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:158:106 | text | rewrite-operation | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:161:40 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:161:58 | text | 블록 넣기: ${block.text} | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:162:39 | text | data-block-id | button-or-action | missing-term-explanation, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:163:39 | text | data-rewrite-action | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:163:62 | text | add | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:164:35 | text | rewrite-operation | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:165:39 | text | type | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:165:47 | text | button | button-or-action | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:167:46 | text | 사용 가능한 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:168:69 | text | aria-label | button-or-action | missing-term-explanation, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.test.tsx:168:93 | text | cnp-block- | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.test.tsx:171:7 | text | names the four evaluator-derived feedback rows without score-like language | feedback-or-error | long-or-dense |
| src/features/rewrite/PerspectiveRewrite.test.tsx:171:89 | text | { render( | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:181:30 | text | 보존한 사실 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:182:30 | text | 빠진 사실 묶음 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:183:30 | text | 맞은 관점 표지 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.test.tsx:184:30 | text | 모순된 블록 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:13:20 | text | void; } interface LocalRewriteDraft { targetNarratorId: string; audienceId: string; purposeId: string; blockIds: string[]; } type RewriteOperation = 'add' \| 'move-up' \| 'move-down' \| 'remove'; interface FocusTarget { action: RewriteOperation; blockId: string; } const audienceLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:30:55 | text | audienceId | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:30:77 | text | = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님', }; const purposeLabels: Readonly | learner-text-candidate | long-or-dense, repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:31:15 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:32:18 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:33:13 | text | 선생님 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:36:54 | text | purposeId | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:36:75 | text | = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기', }; const incompleteFeedback: RewriteFeedback = { status: 'revise', preservedFactIds: [], missingFactGroupIndexes: [], contradictoryBlockIds: [], matchedPerspectiveTags: [], message: '대상, 독자, 목적을 고르고 문장 블록을 조립해 보세요.', }; const unique = | feedback-or-error, instruction | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:37:12 | text | 사실 보고 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:38:11 | text | 읽기 안내 | instruction | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:39:16 | text | 생각 돌아보기 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:48:13 | text | 대상, 독자, 목적을 고르고 문장 블록을 조립해 보세요. | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:64:60 | text | ({ targetNarratorId: value.targetNarratorId, audienceId: value.audienceId as RewriteDraft['audienceId'], purposeId: value.purposeId as RewriteDraft['purposeId'], blockIds: [...value.blockIds], }); const activateWithKeyboard = (event: KeyboardEvent | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:84:11 | text | ); return ( | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:88:99 | text | rewrite-feedback-title | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:89:39 | text | 다시 쓰기 확인 | heading, feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:92:15 | text | 보존한 사실 | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:92:97 | text | 아직 선택하지 않았어요. | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:93:15 | text | 빠진 사실 묶음 | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:93:75 | text | 필요한 묶음 ${index + 1} | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:93:99 | text | 빠진 묶음이 없어요. | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:94:15 | text | 맞은 관점 표지 | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:94:101 | text | 기록된 관점 | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:94:112 | text | 아직 맞은 표지가 없어요. | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:95:15 | text | 모순된 블록 | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:95:71 | text | rewriteBlockReference(pack, blockId)), '모순된 블록이 없어요.')} | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:95:112 | text | 모순된 블록이 없어요. | feedback-or-error | — |
| src/features/rewrite/PerspectiveRewrite.tsx:105:24 | text | { const requestedTarget = focusTarget.current; if (!requestedTarget) return; const target = document.getElementById(controlId(requestedTarget.action, requestedTarget.blockId)); if (target instanceof HTMLButtonElement && !target.disabled) { target.focus({ preventScroll: true }); } else { // A missing/disabled operation should never strand keyboard focus on body. document.querySelector | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:113:50 | text | .rewrite-operation:not(:disabled) | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:166:95 | text | entry.block !== undefined); return ( | learner-text-candidate | technical-or-internal |
| src/features/rewrite/PerspectiveRewrite.tsx:169:71 | text | rewrite-title | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:172:65 | text | 관점 전환 | heading | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:173:29 | text | 같은 사건의 사실을 지키면서, 다른 사람에게 맞는 순서와 표현으로 다시 조립해 보세요. | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:178:19 | text | 대상 인물 | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:197:19 | text | 독자 | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:208:23 | text | {audienceLabels[audience]} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:215:19 | text | 목적 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:226:23 | text | {purposeLabels[purpose]} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:234:67 | text | available-blocks-title | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:235:43 | text | 사용할 수 있는 문장 블록 | heading | — |
| src/features/rewrite/PerspectiveRewrite.tsx:236:58 | aria-label | 사용 가능한 블록 | aria-label | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:246:32 | text | 블록 넣기: ${block.text} | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:250:18 | text | 블록 넣기 | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.tsx:258:67 | text | assembled-blocks-title | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:259:43 | text | 내가 조립한 문장 | heading | — |
| src/features/rewrite/PerspectiveRewrite.tsx:260:88 | aria-label | 조립한 블록 | aria-label | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:263:75 | text | {displayIndex + 1} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:272:34 | text | 위로 이동: ${block.text} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:276:20 | text | 위로 이동 | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.tsx:285:34 | text | 아래로 이동: ${block.text} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:289:20 | text | 아래로 이동 | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.tsx:298:34 | text | 블록 빼기: ${block.text} | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:301:20 | text | 블록 빼기 | button-or-action | — |
| src/features/rewrite/PerspectiveRewrite.tsx:308:65 | text | 아래 목록에서 블록을 넣으면 여기에 순서대로 놓여요. | learner-text-candidate | ambiguous-reference |
| src/features/rewrite/PerspectiveRewrite.tsx:315:42 | text | supported | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:316:51 | text | supported | feedback-or-error | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:317:25 | text | 필요한 사실과 관점이 모두 맞아요. 다음 단계로 가세요. | learner-text-candidate | — |
| src/features/rewrite/PerspectiveRewrite.tsx:319:10 | text | 관점 전환 완료 | learner-text-candidate | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:322:13 | text | {feedback.status !== 'supported' ? | feedback-or-error, hint | — |
| src/features/rewrite/PerspectiveRewrite.tsx:323:29 | text | supported | feedback-or-error, hint | repeated-text |
| src/features/rewrite/PerspectiveRewrite.tsx:323:67 | text | 필요한 사실을 모두 보존하고 모순 없는 블록을 골라야 완료할 수 있어요. | feedback-or-error, hint | — |
| src/features/rewrite/PerspectiveRewrite.tsx:323:111 | text | : null} | feedback-or-error, hint | repeated-text, technical-or-internal |
| src/features/settings/ReadingSettings.test.tsx:11:7 | text | exposes exact labelled choices and reports a complete preference object | learner-text-candidate | long-or-dense |
| src/features/settings/ReadingSettings.test.tsx:11:92 | text | { const user = userEvent.setup(); const onChange = vi.fn | learner-text-candidate | long-or-dense |
| src/features/settings/ReadingSettings.test.tsx:20:47 | text | 글자 크기 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:22:54 | text | 줄 간격 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:23:54 | text | 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:24:30 | text | 작게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:25:30 | text | 보통 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:26:30 | text | 크게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:27:30 | text | 촘촘하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:28:30 | text | 넉넉하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:29:30 | text | 아주 넉넉하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:32:47 | text | 표준 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.test.tsx:36:57 | text | 좁은 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:5:49 | text | void; } const fontSizeOptions: ReadonlyArray | learner-text-candidate | technical-or-internal |
| src/features/settings/ReadingSettings.tsx:8:67 | text | fontSize | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:8:115 | text | = [ { value: 18, label: '작게', valueLabel: '18px' }, { value: 20, label: '보통', valueLabel: '20px' }, { value: 22, label: '크게', valueLabel: '22px' }, ]; const lineHeightOptions: ReadonlyArray | learner-text-candidate | long-or-dense |
| src/features/settings/ReadingSettings.tsx:9:24 | text | 작게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:9:42 | text | 18px | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:10:24 | text | 보통 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:10:42 | text | 20px | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:11:24 | text | 크게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:11:42 | text | 22px | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:14:69 | text | lineHeight | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:14:119 | text | = [ { value: 1.6, label: '촘촘하게', valueLabel: '1.6' }, { value: 1.8, label: '넉넉하게', valueLabel: '1.8' }, { value: 2, label: '아주 넉넉하게', valueLabel: '2' }, ]; const readingWidthOptions: ReadonlyArray | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/settings/ReadingSettings.tsx:15:25 | text | 촘촘하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:16:25 | text | 넉넉하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:17:23 | text | 아주 넉넉하게 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:20:71 | text | readingWidth | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/settings/ReadingSettings.tsx:20:103 | text | = [ { value: 'narrow', label: '좁은 읽기 폭' }, { value: 'standard', label: '표준 읽기 폭' }, ]; export function ReadingSettings({ preferences, onChange }: ReadingSettingsProps) { return ( | learner-text-candidate | long-or-dense |
| src/features/settings/ReadingSettings.tsx:21:13 | text | narrow | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:21:30 | text | 좁은 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:22:13 | text | standard | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:22:32 | text | 표준 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:27:60 | text | reading-settings-title | learner-text-candidate | — |
| src/features/settings/ReadingSettings.tsx:28:39 | text | 읽기 설정 | heading | repeated-text |
| src/features/settings/ReadingSettings.tsx:29:46 | text | 글자와 줄 간격을 바꾸면 이 탭의 읽기 화면에 바로 적용됩니다. | learner-text-candidate | abstract-or-formal |
| src/features/settings/ReadingSettings.tsx:31:17 | text | 글자 크기 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:40:17 | text | 줄 간격 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:49:17 | text | 읽기 폭 | learner-text-candidate | repeated-text |
| src/features/settings/ReadingSettings.tsx:52:39 | text | reading-width | input | missing-term-explanation, technical-or-internal |
| src/features/teacher/TeacherGuide.test.tsx:231:56 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:236:38 | text | 모든 사건과 인물은 가상의 이야기와 인물입니다. | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:237:38 | text | button | button-or-action | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:237:56 | text | 인쇄하기 | button-or-action | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:237:79 | text | teacher-guide__print-button | button-or-action | missing-term-explanation, technical-or-internal |
| src/features/teacher/TeacherGuide.test.tsx:239:48 | text | button | button-or-action | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:239:66 | text | 인쇄하기 | button-or-action | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:253:48 | text | 문장 ${sentence.number} | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:257:48 | text | 개인 메모 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:266:44 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:267:44 | text | 안전·개인정보 약속 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.test.tsx:286:8 | text | button | button-or-action | repeated-text |
| src/features/teacher/TeacherGuide.tsx:10:17 | text | void; viewModel: PrintViewModel; } const focalContrastLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/teacher/TeacherGuide.tsx:14:54 | text | focalContrast | learner-text-candidate | — |
| src/features/teacher/TeacherGuide.tsx:14:79 | text | = { priority: '속도와 꼼꼼함', 'seen-vs-inferred': '본 정보와 추측한 정보', 'familiar-vs-new-reader': '익숙한 정보와 독자에게 필요한 정보', 'comfort-vs-preservation': '편안함과 책 보존', }; function GuideSection({ section, prefix }: { section: TeacherGuideSection; prefix: string }) { const headingId = `${prefix}-${section.id}-heading`; return ( | heading | long-or-dense, technical-or-internal |
| src/features/teacher/TeacherGuide.tsx:15:14 | text | 속도와 꼼꼼함 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.tsx:16:24 | text | 본 정보와 추측한 정보 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.tsx:17:30 | text | 익숙한 정보와 독자에게 필요한 정보 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.tsx:18:31 | text | 편안함과 책 보존 | learner-text-candidate | repeated-text |
| src/features/teacher/TeacherGuide.tsx:29:15 | text | ); } function SelectedCaseMaterial({ pack, prefix }: { pack: CasePack; prefix: string }) { const headingId = `${prefix}-selected-case-heading`; return ( | heading | long-or-dense, technical-or-internal |
| src/features/teacher/TeacherGuide.tsx:37:26 | text | 선택한 사건 자료 | heading | — |
| src/features/teacher/TeacherGuide.tsx:38:77 | text | · 초점: {focalContrastLabels[pack.focalContrast]} | learner-text-candidate | long-or-dense |
| src/features/teacher/TeacherGuide.tsx:47:68 | text | 문장 {sentence.number} | learner-text-candidate | — |
| src/features/teacher/TeacherGuide.tsx:55:11 | text | ); } function ReportForPrint({ viewModel }: { viewModel: PrintViewModel }) { if (!viewModel.currentReport \|\| !viewModel.currentPack) return null; return ( | heading | long-or-dense, technical-or-internal |
| src/features/teacher/TeacherGuide.tsx:62:100 | text | teacher-print-report-heading | heading | — |
| src/features/teacher/TeacherGuide.tsx:63:45 | text | 완료한 사건 보고서 | heading | — |
| src/features/teacher/TeacherGuide.tsx:85:51 | text | 대상: 초등 5~6학년 · 교과: 국어 · 차시: {viewModel.duration} | learner-text-candidate | — |
| src/features/teacher/TeacherGuide.tsx:102:16 | title | 교사용 활동 요약 | title | repeated-text |
| src/features/teacher/TeacherGuide.tsx:108:47 | text | 수업 전에 활동의 목표와 안전·개인정보 경계를 확인하세요. 인쇄 자료에는 학습자가 작성한 메모를 포함하지 않습니다. | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/teacher/TeacherGuide.tsx:114:91 | text | 인쇄하기 | button-or-action | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:11:7 | text | renders sixteen rows with case titles and no raw case IDs | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/updates/UpdateHistoryDialog.test.tsx:11:78 | text | { const user = userEvent.setup(); const onClose = vi.fn(); const triggerRef = { current: null }; render( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/updates/UpdateHistoryDialog.test.tsx:17:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:19:38 | text | heading | heading | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:19:57 | text | 운동장 정리 상자 | heading | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:21:38 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:22:48 | text | button | button-or-action | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:22:66 | text | 닫기 | button-or-action | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:26:7 | text | groups the eight case rows under four accessible case headings | heading | long-or-dense |
| src/features/updates/UpdateHistoryDialog.test.tsx:26:77 | text | { const triggerRef = { current: null }; render( | heading | technical-or-internal |
| src/features/updates/UpdateHistoryDialog.test.tsx:30:56 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:33:59 | text | heading | heading | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:34:8 | text | 운동장 정리 상자 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:35:8 | text | 사라진 우산 표찰 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:36:8 | text | 동아리 알림 포스터 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:37:8 | text | 도서관 창가 자리 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:41:39 | text | 콘텐츠 검수 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.test.tsx:42:39 | text | 표현 수정 | learner-text-candidate | repeated-text |
| src/features/updates/UpdateHistoryDialog.tsx:32:52 | text | (); for (const entry of entries) { if (!('caseId' in entry)) continue; const group = caseGroups.get(entry.caseId) ?? []; group.push(entry); caseGroups.set(entry.caseId, group); } return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/updates/UpdateHistoryDialog.tsx:40:52 | title | 업데이트 내역 | title | repeated-text |
| src/features/updates/UpdateHistoryDialog.tsx:41:55 | aria-label | 업데이트 기록 | aria-label | — |
| src/features/updates/UpdateHistoryDialog.tsx:43:67 | text | { const title = titleById.get(caseId) ?? '사건'; const headingId = `update-history-case-${index + 1}`; return ( | heading | long-or-dense, technical-or-internal |
| src/features/updates/UpdateHistoryDialog.tsx:44:51 | text | 사건 | heading | — |
| src/model/case.ts:14:30 | text | supported | feedback-or-error | repeated-text |
| src/model/case.ts:14:44 | text | partially-supported | feedback-or-error | repeated-text |
| src/model/case.ts:14:68 | text | revise | feedback-or-error | repeated-text |
| src/model/feedback.ts:2:31 | text | supported | feedback-or-error | repeated-text |
| src/model/feedback.ts:2:45 | text | partially-supported | feedback-or-error | repeated-text |
| src/model/feedback.ts:2:69 | text | revise | feedback-or-error | repeated-text |
| src/model/ui.ts:13:18 | text | 설계 | learner-text-candidate | repeated-text |
| src/model/ui.ts:13:25 | text | 개발 | learner-text-candidate | repeated-text |
| src/model/ui.ts:13:32 | text | 개선 | learner-text-candidate | repeated-text |
| src/model/ui.ts:18:18 | text | 콘텐츠 검수 | learner-text-candidate | repeated-text |
| src/model/ui.ts:18:29 | text | 표현 수정 | learner-text-candidate | repeated-text |
| src/model/ui.ts:41:10 | text | intake | learner-text-candidate | — |
| src/model/ui.ts:41:27 | text | 사건 접수 | learner-text-candidate | repeated-text |
| src/model/ui.ts:42:10 | text | lenses | learner-text-candidate | — |
| src/model/ui.ts:42:27 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| src/model/ui.ts:43:10 | text | evidence | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/model/ui.ts:43:29 | text | 근거 보드 | learner-text-candidate | repeated-text |
| src/model/ui.ts:44:10 | text | comparison | learner-text-candidate | repeated-text |
| src/model/ui.ts:44:31 | text | 교차 조사 | learner-text-candidate | repeated-text |
| src/model/ui.ts:45:10 | text | rewrite | learner-text-candidate | — |
| src/model/ui.ts:45:28 | text | 관점 전환 | learner-text-candidate | repeated-text |
| src/model/ui.ts:46:10 | text | report | learner-text-candidate | repeated-text |
| src/model/ui.ts:46:27 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/styles/readingTypography.test.tsx:11:5 | text | 렌즈 | learner-text-candidate | — |
| src/styles/readingTypography.test.tsx:12:5 | text | 근거 | learner-text-candidate | repeated-text |
| src/styles/readingTypography.test.tsx:13:5 | text | 교차 조사 | learner-text-candidate | repeated-text |
| src/styles/readingTypography.test.tsx:14:5 | text | 관점 전환 | learner-text-candidate | repeated-text |
| src/styles/readingTypography.test.tsx:15:5 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/styles/readingTypography.test.tsx:24:7 | text | wires each learner-readable stage body to the shared preference variables | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/test/fixtures/casePackFixture.ts:3:32 | text | 잘 뒷받침해요. | feedback-or-error | repeated-text |
| src/test/fixtures/casePackFixture.ts:3:44 | text | partially-supported | feedback-or-error | repeated-text |
| src/test/fixtures/casePackFixture.ts:3:67 | text | 일부만 뒷받침해요. | feedback-or-error | repeated-text |
| src/test/fixtures/casePackFixture.ts:3:89 | text | 다시 살펴봐요. | feedback-or-error | repeated-text |
| src/test/fixtures/casePackFixture.ts:13:38 | text | 상자에 파란 공이 보인다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:14:38 | text | 이름표가 떨어져 있다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:15:38 | text | 누군가 서둘렀을 것 같다. | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:16:38 | text | 공을 먼저 챙긴 듯하다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:17:38 | text | 조심히 보관해야 한다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:20:45 | text | 상자 옆에 공이 놓여 있다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:21:45 | text | 이름표가 바닥에 있다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:22:45 | text | 친구가 찾으러 올 수 있다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:23:45 | text | 공을 돌려주는 것이 좋겠다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:24:45 | text | 그래서 상자를 닫았다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:24:78 | text | 잃어버리지 않게 하려는 뜻이다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:12 | text | narrator-caretaker | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:47 | text | 정리 담당 렌즈 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:70 | text | 관리자 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:83 | text | clipboard | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:27:109 | text | solid | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/fixtures/casePackFixture.ts:27:128 | text | 교실 뒤 수납장 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:150 | text | 정리와 보관 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:27:169 | text | 물건을 안전하게 돌려주기 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:12 | text | narrator-friend | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:44 | text | 친구 렌즈 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:64 | text | 친구 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:76 | text | ball | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:28:97 | text | double | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:28:117 | text | 운동장 옆 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:136 | text | 친구의 물건 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:28:155 | text | 상황을 알려주기 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:31:10 | text | playground-storage-box | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:31:43 | text | 파란 공이 든 상자 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:31:72 | text | 같은 사건을 다른 렌즈로 보면 무엇이 달라질까요? | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:31:118 | text | seen-vs-inferred | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:31:155 | text | playground-storage-box | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:32:18 | text | 모든 인물과 사건은 가상입니다. | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:32:107 | text | 사실과 해석을 구분하도록 검토했습니다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:32:156 | text | 어린이가 이해하기 쉬운 표현으로 다듬었습니다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:34:50 | text | 파란 공과 이름표가 상자 주변에 있다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:35:54 | text | 공의 주인은 민서다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:36:54 | text | 이름표는 바람에 떨어졌다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:37:56 | text | 민서는 방과 후에 찾으러 온다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:41:14 | text | comparison-shared | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:41:42 | text | 공과 이름표를 본다 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:41:78 | text | box-sentence-1 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:41:96 | text | playground-sentence-2 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:41:133 | text | shared-fact | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:42:14 | text | comparison-expression | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:42:46 | text | 서둘렀다고 생각한다 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:42:82 | text | box-sentence-3 | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:42:112 | text | different-expression | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:42:136 | text | missing-information | learner-text-candidate | repeated-text |
| src/test/fixtures/casePackFixture.ts:45:41 | text | 파란 공을 보았다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:46:38 | text | 민서가 찾으러 온다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:47:36 | text | 상자를 조심히 보관한다. | learner-text-candidate | — |
| src/test/fixtures/casePackFixture.ts:48:37 | text | 누군가 서둘렀을 것 같다. | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:26:30 | text | 서버 없음 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:26:39 | text | AI 없음 | learner-text-candidate | technical-or-internal |
| src/test/releaseReadiness.test.ts:26:48 | text | 분석/추적 없음 | learner-text-candidate | abstract-or-formal |
| src/test/releaseReadiness.test.ts:29:70 | text | ARIA/axe | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/releaseReadiness.test.ts:29:82 | text | 모션 감소 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:32:31 | text | [관점 렌즈 사건실 HVC 결과](https://wbmaker2.github.io/perspective-lens-case-room/) | learner-text-candidate | long-or-dense, technical-or-internal |
| src/test/releaseReadiness.test.ts:33:31 | text | VoiceOver 검증 제외 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/test/releaseReadiness.test.ts:46:27 | text | 사건 접수 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:46:36 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:46:46 | text | 근거 보드 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:46:55 | text | 교차 조사(처음 생각) | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:46:71 | text | 중립 기록 열기·수정 비교 | learner-text-candidate | multiple-actions |
| src/test/releaseReadiness.test.ts:46:89 | text | 관점 전환 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:46:98 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:51:31 | text | 최종 통합 품질 게이트 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:53:31 | text | 오늘 배운 점 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:54:31 | text | 다음에 해 볼 일 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:55:31 | text | 내부 사건 ID | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/releaseReadiness.test.ts:62:8 | text | 포커스 표시·44px 조작 영역 | learner-text-candidate | repeated-text |
| src/test/releaseReadiness.test.ts:63:8 | text | 랜드마크 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:64:8 | text | 렌즈 탭 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:65:8 | text | 문장 번호 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:66:8 | text | 정중한 피드백 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:68:8 | text | 키보드만 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:73:8 | text | 개인정보 | learner-text-candidate | — |
| src/test/releaseReadiness.test.ts:81:34 | text | VoiceOver 검증 제외 | learner-text-candidate | abstract-or-formal, repeated-text |
| src/test/releaseReadiness.test.ts:83:34 | text | 포커스 표시·44px 조작 영역 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:9:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:9:37 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:9:59 | text | 평가 표현 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:11:33 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:11:58 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:11:79 | text | 선생님 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:12:29 | text | 사실 보고 | instruction | repeated-text |
| tests/e2e/accessibility.spec.ts:12:45 | text | 읽기 안내 | instruction | repeated-text |
| tests/e2e/accessibility.spec.ts:12:66 | text | 생각 돌아보기 | instruction | repeated-text |
| tests/e2e/accessibility.spec.ts:25:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:26:30 | text | [data-stage-heading] | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:27:30 | text | [data-stage-heading] | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:28:54 | text | 학습 단계 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:34:45 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:35:63 | text | 다른 표현 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:36:61 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:40:35 | text | No comparison option for ${validFor} | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/accessibility.spec.ts:44:31 | text | group | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:44:71 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:44:121 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:48:62 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/accessibility.spec.ts:57:31 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:58:108 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:63:31 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:63:49 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:71:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:71:47 | text | ${pack.title} 사건 선택 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:73:23 | text | [data-stage-heading] | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:79:28 | text | 사건 접수 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:81:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:81:47 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:82:28 | text | 렌즈 A/B | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:92:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:92:47 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:94:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:94:47 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:95:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:95:47 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:97:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:97:47 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:98:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:98:47 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:100:28 | text | 근거 보드 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:102:41 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:106:129 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:107:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:107:47 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:108:30 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| tests/e2e/accessibility.spec.ts:108:119 | text | aria-live | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/accessibility.spec.ts:108:132 | text | polite | feedback-or-error | repeated-text |
| tests/e2e/accessibility.spec.ts:109:30 | text | [role="status"][data-feedback-sentence] | feedback-or-error | repeated-text |
| tests/e2e/accessibility.spec.ts:111:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:111:47 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:113:28 | text | 교차 조사 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:116:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:116:47 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:117:28 | text | 교차 조사 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:119:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:119:51 | text | 처음 생각 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:120:32 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:120:50 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:121:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:121:47 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:125:51 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:126:31 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:126:93 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:127:31 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:127:82 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:130:69 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/accessibility.spec.ts:133:60 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| tests/e2e/accessibility.spec.ts:136:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:136:47 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:137:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:137:47 | text | 관점 전환 시작 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:138:28 | text | 관점 전환 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:146:34 | text | No rewrite block ${blockId} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/accessibility.spec.ts:147:29 | text | .rewrite-block | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:147:89 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:149:29 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:149:47 | text | 관점 전환 완료 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:150:28 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:152:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:152:51 | text | 오늘 배운 점 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:153:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:153:51 | text | 다음에 해 볼 일 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:154:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:154:51 | text | 오늘 배운 점 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:154:93 | text | 위치·관심·목적 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:155:32 | text | heading | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:155:51 | text | 다음에 해 볼 일 | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:155:95 | text | 무엇을 추측했지? | heading | repeated-text |
| tests/e2e/accessibility.spec.ts:161:7 | text | 읽기 설정 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:161:16 | text | 읽기 설정 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:162:7 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:162:18 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:163:7 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:163:20 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| tests/e2e/accessibility.spec.ts:165:37 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:177:40 | text | button | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:177:58 | text | 다른 사건 접수 | button-or-action | repeated-text |
| tests/e2e/accessibility.spec.ts:179:57 | text | 현재 기록을 지울까요? | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:7:38 | text | item.id === 'missing-umbrella-tag')!; const categoryLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:9:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:9:37 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:9:59 | text | 평가 표현 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:11:33 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:11:58 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:11:79 | text | 선생님 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:12:29 | text | 사실 보고 | instruction | repeated-text |
| tests/e2e/evidence-capture.spec.ts:12:45 | text | 읽기 안내 | instruction | repeated-text |
| tests/e2e/evidence-capture.spec.ts:12:66 | text | 생각 돌아보기 | instruction | repeated-text |
| tests/e2e/evidence-capture.spec.ts:24:32 | text | heading | heading | repeated-text |
| tests/e2e/evidence-capture.spec.ts:34:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:34:49 | text | ${pack.title} 사건 선택 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:40:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:40:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:42:37 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:42:55 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:44:32 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:44:50 | text | 읽음 취소 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:46:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:46:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:47:42 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:47:60 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:49:32 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:49:50 | text | 중요 표시 취소 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:51:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:51:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:52:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:52:49 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:56:56 | text | narrator.sentences)[index]!; await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true })); for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categoryLabels[category], exact: true })); if (sentence.kind === 'mixed') { const segments = page.getByRole('checkbox'); for (let segmentIndex = 0; segmentIndex | button-or-action | long-or-dense, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:57:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:58:108 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:67:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:67:49 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:73:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:73:49 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:78:45 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:79:63 | text | 다른 표현 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:80:61 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:84:35 | text | No ${validFor} option | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:87:75 | text | group | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:87:115 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:87:165 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:89:64 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:91:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:91:49 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:92:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:92:49 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:95:51 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:96:33 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:96:94 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:97:33 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:97:84 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:99:69 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:102:62 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:103:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:103:49 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:104:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:104:49 | text | 관점 전환 시작 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:112:34 | text | No rewrite block ${blockId} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/evidence-capture.spec.ts:113:31 | text | .rewrite-block | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:113:91 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:115:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:115:49 | text | 관점 전환 완료 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:122:32 | text | 사건 접수 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:123:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:123:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:125:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:125:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:126:32 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:126:50 | text | 읽음 취소 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:128:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:128:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:129:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:129:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:130:32 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:130:50 | text | 중요 표시 취소 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:132:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:132:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:133:31 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:133:49 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:135:32 | text | 근거 보드 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:138:27 | text | 오늘 배운 점 | heading | repeated-text |
| tests/e2e/evidence-capture.spec.ts:138:38 | text | 다음에 해 볼 일 | heading | repeated-text |
| tests/e2e/evidence-capture.spec.ts:139:34 | text | heading | heading | repeated-text |
| tests/e2e/evidence-capture.spec.ts:142:32 | text | 사건 보고서 | learner-text-candidate | repeated-text |
| tests/e2e/evidence-capture.spec.ts:148:34 | text | button | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:148:52 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/evidence-capture.spec.ts:155:32 | text | 근거 보드 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:13:65 | text | = { observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현', }; const audienceLabels: Readonly | learner-text-candidate | long-or-dense |
| tests/e2e/learner-flow.spec.ts:14:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:15:15 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:16:16 | text | 평가 표현 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:18:40 | text | classmate | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:18:54 | text | new-reader | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:18:69 | text | teacher | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:18:87 | text | = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님', }; const purposeLabels: Readonly | learner-text-candidate | long-or-dense, repeated-text |
| tests/e2e/learner-flow.spec.ts:19:15 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:20:18 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:21:13 | text | 선생님 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:23:39 | text | report | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:23:50 | text | guide | learner-text-candidate | missing-term-explanation, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:23:60 | text | reflection | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:24:12 | text | 사실 보고 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:25:11 | text | 읽기 안내 | instruction | repeated-text |
| tests/e2e/learner-flow.spec.ts:26:16 | text | 생각 돌아보기 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:44:31 | text | Missing case pack ${caseId} | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:53:60 | text | narrator.sentences); const sentenceButtons = page.getByRole('button', { name: /^.+ 문장 \d+$/ }); await expect(sentenceButtons).toHaveCount(allSentences.length); for (const sentence of allSentences) { await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true })); for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) { await press(page.getByRole('button', { name: categoryLabels[category], exact: true })); } if (sentence.kind === 'mixed') { const segments = page.getByRole('checkbox'); await expect(segments).toHaveCount(sentence.segments.length); for (let segmentIndex = 0; segmentIndex | button-or-action | long-or-dense, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:54:43 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:57:33 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:59:35 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:68:36 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:68:54 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:74:35 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:74:53 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:83:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:83:51 | text | 근거 보드 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:91:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:91:49 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:100:43 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:101:61 | text | 다른 표현 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:102:59 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:109:35 | text | No ${validFor} option in ${pack.id} | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:120:37 | text | No option ${optionId} | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:121:41 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:129:67 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:139:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:139:51 | text | 사건 접수 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:140:57 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:140:86 | text | 현재 단계 1/6 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:141:32 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:141:50 | text | ${pack.title} 사건 선택 · ${pack.focusQuestion} | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:142:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:142:49 | text | ${pack.title} 사건 선택 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:143:32 | text | complementary | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:143:57 | text | 현재 학습 단계 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:145:41 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:145:59 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:150:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:150:51 | text | 렌즈 A/B | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:151:32 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:151:50 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:152:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:152:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:153:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:153:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:154:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:154:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:155:31 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:155:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:156:32 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:156:50 | text | 읽음 취소 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:157:32 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:157:50 | text | 중요 표시 취소 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:158:39 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:158:57 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:163:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:163:51 | text | 근거 보드 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:165:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:165:51 | text | 교차 조사 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:166:50 | text | 비교 진행률 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:166:77 | text | 비교 항목 0 / 3 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:169:50 | text | 비교 진행률 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:169:77 | text | 비교 항목 3 / 3 | learner-text-candidate | — |
| tests/e2e/learner-flow.spec.ts:170:42 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:170:60 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:175:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:175:51 | text | 처음 생각 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:177:54 | text | 중립 기록 ${record.sequence} | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:179:34 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:179:52 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:184:54 | text | 중립 기록 ${record.sequence} | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:190:37 | text | No alternate comparison option in ${pack.id} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:193:37 | text | No initial option ${change.from} | feedback-or-error | — |
| tests/e2e/learner-flow.spec.ts:194:38 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:194:92 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:195:38 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:195:91 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:203:62 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0].id)} | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:204:43 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:204:61 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:208:40 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:208:58 | text | 관점 전환 시작 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:213:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:213:51 | text | 관점 전환 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:220:34 | text | No rewrite block ${blockId} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/learner-flow.spec.ts:221:31 | text | .rewrite-block | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:221:91 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:223:48 | text | 사용 가능한 블록 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:224:48 | text | 조립한 블록 | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:225:42 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:225:60 | text | 관점 전환 완료 | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:230:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:230:51 | text | 사건 보고서 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:27 | text | 사용한 근거 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:37 | text | 처음 생각과 수정한 생각 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:54 | text | 관점 전환에서 유지한 사실 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:72 | text | 오늘 배운 점 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:83 | text | 다음에 해 볼 일 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:231:96 | text | 남은 질문 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:232:34 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:234:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:234:51 | text | 오늘 배운 점 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:234:93 | text | 위치·관심·목적 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:235:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:235:51 | text | 다음에 해 볼 일 | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:235:95 | text | 무엇을 추측했지? | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:242:35 | text | button | button-or-action | repeated-text |
| tests/e2e/learner-flow.spec.ts:243:12 | text | ${pack.narrators[0].displayName} 이유 문장 ${revisitSentence.number} 다시 보기 | learner-text-candidate | long-or-dense |
| tests/e2e/learner-flow.spec.ts:247:32 | text | heading | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:247:51 | text | 렌즈 A/B | heading | repeated-text |
| tests/e2e/learner-flow.spec.ts:248:47 | text | 렌즈 A | learner-text-candidate | repeated-text |
| tests/e2e/learner-flow.spec.ts:249:30 | text | [data-sentence-id="${revisitSentence.id}"] | button-or-action | technical-or-internal |
| tests/e2e/learner-flow.spec.ts:249:86 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:7:38 | text | item.id === 'playground-storage-box')!; const categoryLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:9:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:9:37 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:9:59 | text | 평가 표현 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:11:33 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:11:58 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:11:79 | text | 선생님 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:12:29 | text | 사실 보고 | instruction | repeated-text |
| tests/e2e/privacy-print.spec.ts:12:45 | text | 읽기 안내 | instruction | repeated-text |
| tests/e2e/privacy-print.spec.ts:12:66 | text | 생각 돌아보기 | instruction | repeated-text |
| tests/e2e/privacy-print.spec.ts:23:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:23:49 | text | ${pack.title} 사건 선택 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:25:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:25:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:26:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:26:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:27:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:27:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:28:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:28:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:29:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:29:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:30:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:30:49 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:31:57 | text | narrator.sentences); for (const sentence of sentences) { await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true })); for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categoryLabels[category], exact: true })); if (sentence.kind === 'mixed') { const segments = page.getByRole('checkbox'); for (let segmentIndex = 0; segmentIndex | button-or-action | long-or-dense, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:33:33 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:34:110 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:39:33 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:39:51 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:41:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:41:49 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:43:22 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:44:31 | text | 다른 표현 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:45:30 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:49:35 | text | No comparison option ${validFor} | feedback-or-error | missing-term-explanation, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:52:75 | text | group | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:52:115 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:52:165 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:53:156 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:54:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:54:49 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:55:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:55:49 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:57:51 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:58:33 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:58:94 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:59:33 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:59:84 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:61:69 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:64:62 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:65:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:65:49 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:66:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:66:49 | text | 관점 전환 시작 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:76:34 | text | No rewrite block ${blockId} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/privacy-print.spec.ts:77:31 | text | .rewrite-block | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:77:91 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:79:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:79:49 | text | 관점 전환 완료 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:80:32 | text | heading | heading | repeated-text |
| tests/e2e/privacy-print.spec.ts:80:51 | text | 사건 보고서 | heading | repeated-text |
| tests/e2e/privacy-print.spec.ts:96:51 | text | 개인 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:97:20 | text | 저장하지 않을 개인 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:101:60 | text | 저장하지 않을 개인 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:103:20 | text | 저장할 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:104:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:104:49 | text | 이 기기에 메모 저장 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:106:51 | text | 개인 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:106:75 | text | 저장할 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:107:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:107:49 | text | 저장된 메모 삭제 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:108:51 | text | 개인 메모 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:126:31 | text | button | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:126:49 | text | 교사용 활동 요약 | button-or-action | repeated-text |
| tests/e2e/privacy-print.spec.ts:127:50 | text | 교사용 활동 요약 | learner-text-candidate | repeated-text |
| tests/e2e/privacy-print.spec.ts:136:30 | text | [data-print-region] button | button-or-action | — |
| tests/e2e/privacy-print.spec.ts:137:30 | text | button:visible, input:visible, textarea:visible, select:visible | button-or-action, input | long-or-dense |
| tests/e2e/responsive-motion.spec.ts:8:17 | text | 관찰 사실 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:8:37 | text | 인물의 추론 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:8:59 | text | 평가 표현 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:10:33 | text | 같은 반 친구 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:10:58 | text | 처음 보는 독자 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:10:79 | text | 선생님 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:11:29 | text | 사실 보고 | instruction | repeated-text |
| tests/e2e/responsive-motion.spec.ts:11:45 | text | 읽기 안내 | instruction | repeated-text |
| tests/e2e/responsive-motion.spec.ts:11:66 | text | 생각 돌아보기 | instruction | repeated-text |
| tests/e2e/responsive-motion.spec.ts:13:43 | text | 공통 사실 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:14:61 | text | 다른 표현 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:15:59 | text | 빠진 정보 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:28:45 | text | { const selector = 'button, [role="tab"], a, label:has(input[type="radio"]), label:has(input[type="checkbox"])'; return Array.from(document.querySelectorAll | button-or-action, input | long-or-dense |
| tests/e2e/responsive-motion.spec.ts:29:23 | text | button, [role="tab"], a, label:has(input[type="radio"]), label:has(input[type="checkbox"]) | button-or-action, input | long-or-dense |
| tests/e2e/responsive-motion.spec.ts:44:55 | text | ('.primary-action.gi-pulse'); const heading = document.querySelector | heading | long-or-dense |
| tests/e2e/responsive-motion.spec.ts:45:56 | text | ('[data-stage-heading]'); const stageContent = heading?.closest | heading | long-or-dense |
| tests/e2e/responsive-motion.spec.ts:45:58 | text | [data-stage-heading] | heading | repeated-text |
| tests/e2e/responsive-motion.spec.ts:46:57 | text | .stage-content | heading | — |
| tests/e2e/responsive-motion.spec.ts:49:57 | text | { if (!element) return null; const rect = element.getBoundingClientRect(); return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height }; }; if (!utility \|\| !action) { return { overlap: false, utility: rectDetails(utility), action: rectDetails(action), heading: heading?.textContent ?? null, stageWidth: stageContent?.getBoundingClientRect().width ?? null, viewport, scrollY }; } const first = utility.getBoundingClientRect(); const second = action.getBoundingClientRect(); return { overlap: !(first.right | heading | long-or-dense, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:69:27 | text | ${viewportLabel} ${stage} utility/action geometry: ${JSON.stringify(result)} | learner-text-candidate | long-or-dense, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:73:34 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:84:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:84:49 | text | ${pack.title} 사건 선택 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:91:33 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:92:110 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:97:33 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:97:51 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:104:35 | text | No ${validFor} option | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:107:75 | text | group | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:107:115 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:107:165 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:108:156 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:109:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:109:49 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:110:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:110:49 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:115:45 | text | No alternate comparison option in ${pack.id} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:117:39 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:117:97 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:118:39 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:118:100 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:120:69 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:123:62 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:124:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:124:49 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:125:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:125:49 | text | 관점 전환 시작 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:135:34 | text | No rewrite block ${blockId} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:136:31 | text | .rewrite-block | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:136:91 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:138:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:138:49 | text | 관점 전환 완료 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:145:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:145:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:148:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:148:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:149:32 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:149:50 | text | 읽음 취소 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:151:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:151:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:152:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:152:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:153:32 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:153:50 | text | 중요 표시 취소 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:155:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:155:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:156:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:156:49 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:159:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:159:49 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:180:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:180:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:182:51 | text | 렌즈 선택 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:185:50 | text | 차이 요약 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:193:36 | text | 사건 렌즈 열기 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:194:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:194:49 | text | 사건 렌즈 열기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:196:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:196:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:198:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:198:49 | text | 읽음 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:199:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:199:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:201:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:201:49 | text | 중요 문장 표시 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:202:36 | text | 근거 보드로 이동 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:203:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:203:49 | text | 근거 보드로 이동 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:205:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:206:105 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:207:36 | text | 근거 표시하기 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:208:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:208:49 | text | 근거 표시하기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:210:36 | text | 교차 조사 시작 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:211:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:211:49 | text | 교차 조사 시작 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:216:75 | text | group | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:216:115 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:216:165 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:217:156 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:218:36 | text | 비교 완료 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:219:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:219:49 | text | 비교 완료 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:220:36 | text | 추가 기록 열기 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:221:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:221:49 | text | 추가 기록 열기 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:226:45 | text | No alternate comparison option in ${pack.id} | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:228:39 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:228:97 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:229:39 | text | checkbox | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:229:100 | text | Space | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:231:69 | text | 근거 문장.*${sentenceReference(pack, sentenceId)} | learner-text-candidate | repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:234:62 | text | 이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| tests/e2e/responsive-motion.spec.ts:235:36 | text | 수정 비교 완료 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:236:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:236:49 | text | 수정 비교 완료 | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:237:36 | text | 관점 전환 시작 | learner-text-candidate | repeated-text |
| tests/e2e/responsive-motion.spec.ts:238:31 | text | button | button-or-action | repeated-text |
| tests/e2e/responsive-motion.spec.ts:238:49 | text | 관점 전환 시작 | button-or-action | repeated-text |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
