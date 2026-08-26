import { useCallback, useMemo, useRef, useState, type CSSProperties } from 'react';
import { casePacks } from '../content/caseIndex';
import { loadReadingPreferences, saveReadingPreferences } from '../domain/sessionPersistence';
import { safetyCopy } from '../content/safetyCopy';
import { getStageGate } from '../domain/sessionReducer';
import type { CaseId, InitialHypothesis } from '../model/case';
import type { CaseAction, ComparisonDraft, EvidenceSelection, RewriteDraft, StageId, StorageAdapter } from '../model/session';
import type { AppViewModel } from '../model/ui';
import type { ReadingPreferences } from '../model/ui';
import { ModalDialog } from '../components/ModalDialog';
import { hasModalLock } from '../components/modalCoordinator';
import { ReadingSettings } from '../features/settings/ReadingSettings';
import { UpdateHistoryDialog } from '../features/updates/UpdateHistoryDialog';
import { ProgressSteps } from '../components/ProgressSteps';
import { StageRenderer } from './StageRenderer';
import { useCaseSession } from './useCaseSession';
import { useStageFocus } from './useStageFocus';

export interface AppShellProps {
  storage?: StorageAdapter;
  persistentStorage?: StorageAdapter;
  localStorage?: StorageAdapter;
}

const persistentMemory = new Map<string, string>();
const fallbackPersistentStorage: StorageAdapter = {
  getItem: (key) => persistentMemory.get(key) ?? null,
  setItem: (key, value) => { persistentMemory.set(key, value); },
  removeItem: (key) => { persistentMemory.delete(key); },
};

function browserPersistentStorage(): StorageAdapter {
  if (typeof window === 'undefined') return fallbackPersistentStorage;
  try {
    const storage = window.localStorage;
    return {
      getItem: (key) => storage.getItem(key),
      setItem: (key, value) => storage.setItem(key, value),
      removeItem: (key) => storage.removeItem(key),
    };
  } catch {
    return fallbackPersistentStorage;
  }
}

// MemoPad owns the single live persistence status. Keep the callback contract
// for the stage renderer without rendering the same announcement twice.
const ignoreMemoPersistenceMessage = (message: string): void => { void message; };

export function AppShell({ storage, persistentStorage, localStorage: injectedLocalStorage }: AppShellProps = {}) {
  const { session, dispatch, persistenceWarning } = useCaseSession(storage);
  const persistentAdapter = useMemo(
    () => persistentStorage ?? injectedLocalStorage ?? browserPersistentStorage(),
    [injectedLocalStorage, persistentStorage],
  );
  const [readingPreferences, setReadingPreferences] = useState<ReadingPreferences>(() => loadReadingPreferences(persistentAdapter));
  const [readingWarning, setReadingWarning] = useState<string | null>(null);
  const [openUtility, setOpenUtility] = useState<'reading' | 'updates' | null>(null);
  const readingTriggerRef = useRef<HTMLButtonElement>(null);
  const updatesTriggerRef = useRef<HTMLButtonElement>(null);
  const selectedPack = session.caseId ? casePacks.find((pack) => pack.id === session.caseId) ?? null : null;
  const gate = selectedPack ? getStageGate(session, selectedPack) : { ready: false, reason: 'case-not-selected' };
  const viewModel: AppViewModel = { session, selectedPack, gate };
  useStageFocus(viewModel.session.stage);

  const send = (action: CaseAction) => dispatch(action);
  const selectCase = (caseId: CaseId) => send({ type: 'SELECT_CASE', caseId });
  const selectHypothesis = (hypothesis: InitialHypothesis) => send({ type: 'SET_INITIAL_HYPOTHESIS', hypothesis });
  const continueStage = () => {
    if (!viewModel.gate.ready) return;
    send({ type: 'ADVANCE_STAGE' });
  };
  const saveInitialComparison = (draft: ComparisonDraft) => send({ type: 'SAVE_INITIAL_COMPARISON', draft });
  const revealRecords = (recordIds: readonly string[]) => send({ type: 'REVEAL_RECORDS', recordIds });
  const saveRevisedComparison = (draft: ComparisonDraft, reasonSentenceIds: readonly string[]) => send({
    type: 'SAVE_REVISED_COMPARISON', draft, revisionEvidenceSentenceIds: reasonSentenceIds,
  });
  const saveRewrite = (draft: RewriteDraft) => send({ type: 'SET_REWRITE_DRAFT', draft });
  const revisitStage = (stage: Exclude<StageId, 'intake'>) => send({ type: 'REVISIT_STAGE', stage });
  const resetCase = () => send({ type: 'RESET_CASE' });
  const closeUtility = useCallback(() => setOpenUtility(null), []);
  const openUtilityDialog = (utility: 'reading' | 'updates') => {
    if (hasModalLock()) return;
    setOpenUtility(utility);
  };
  const changeReadingPreferences = useCallback((preferences: ReadingPreferences) => {
    setReadingPreferences(preferences);
    const result = saveReadingPreferences(persistentAdapter, preferences);
    setReadingWarning(result.ok ? null : '읽기 설정을 저장하지 못했지만 현재 화면에는 적용했어요.');
  }, [persistentAdapter]);
  const readingStyle: CSSProperties = {
    '--reading-size': `${readingPreferences.fontSize}px`,
    '--reading-line-height': `${readingPreferences.lineHeight}`,
    '--reading-width': readingPreferences.readingWidth === 'standard' ? '68ch' : '48ch',
  } as CSSProperties;

  return (
    <main className="app-shell" style={readingStyle}>
      <header className="app-header">
        <div className="app-header__brand">
          <span className="brand-mark" aria-hidden="true">PL</span>
          <div>
            <p className="eyebrow">KOREAN READING LAB</p>
            <h1 className="app-header__title">관점 렌즈 사건실</h1>
          </div>
        </div>
        <p className="app-header__safety">{safetyCopy.fictionalCase}</p>
      </header>

      <div className="app-shell__orientation">
        <p>같은 사건도 말하는 사람의 위치와 관심에 따라 다르게 보일 수 있습니다.</p>
        <p>모든 사건과 인물은 가상이며 실제 인물을 평가하는 도구가 아닙니다.</p>
      </div>
      <ProgressSteps activeStage={viewModel.session.stage} />
      {persistenceWarning && <p className="persistence-warning" role="status">{persistenceWarning}</p>}
      <StageRenderer
        casePacks={casePacks}
        session={viewModel.session}
        onSelectCase={selectCase}
        onSelectHypothesis={selectHypothesis}
        onMarkRead={(narratorId) => send({ type: 'MARK_LENS_READ', narratorId })}
        onToggleImportantSentence={(sentenceId) => send({ type: 'TOGGLE_IMPORTANT_SENTENCE', sentenceId })}
        onRecordEvidence={(selection: EvidenceSelection) => send({ type: 'RECORD_EVIDENCE', selection })}
        onSaveInitialComparison={saveInitialComparison}
        onRevealRecords={revealRecords}
        onSaveRevisedComparison={saveRevisedComparison}
        onSaveRewrite={saveRewrite}
        onRevisitStage={revisitStage}
        onReset={resetCase}
        storage={persistentAdapter}
        onPersistenceMessage={ignoreMemoPersistenceMessage}
        onContinue={continueStage}
      />
      <div className="utility-group" aria-label="학습 도구">
        <button
          ref={readingTriggerRef}
          className="utility-button"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={openUtility === 'reading'}
          aria-controls="reading-settings-dialog"
          onClick={() => openUtilityDialog('reading')}
        >읽기 설정</button>
        <button
          ref={updatesTriggerRef}
          className="utility-button"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={openUtility === 'updates'}
          aria-controls="update-history-dialog"
          onClick={() => openUtilityDialog('updates')}
        >업데이트 내역</button>
      </div>
      {readingWarning ? <p className="utility-warning" role="status">{readingWarning}</p> : null}
      <ModalDialog
        id="reading-settings-dialog"
        title="읽기 설정"
        open={openUtility === 'reading'}
        triggerRef={readingTriggerRef}
        onClose={closeUtility}
      >
        <ReadingSettings preferences={readingPreferences} onChange={changeReadingPreferences} />
      </ModalDialog>
      <UpdateHistoryDialog
        open={openUtility === 'updates'}
        triggerRef={updatesTriggerRef}
        onClose={closeUtility}
      />
    </main>
  );
}
