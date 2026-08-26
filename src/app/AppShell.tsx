import { casePacks } from '../content/caseIndex';
import { safetyCopy } from '../content/safetyCopy';
import { getStageGate } from '../domain/sessionReducer';
import type { CaseId, InitialHypothesis } from '../model/case';
import type { CaseAction, StorageAdapter } from '../model/session';
import type { AppViewModel } from '../model/ui';
import { ProgressSteps } from '../components/ProgressSteps';
import { StageRenderer } from './StageRenderer';
import { useCaseSession } from './useCaseSession';
import { useStageFocus } from './useStageFocus';

export interface AppShellProps {
  storage?: StorageAdapter;
}

export function AppShell({ storage }: AppShellProps = {}) {
  const { session, dispatch, persistenceWarning } = useCaseSession(storage);
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

  return (
    <main className="app-shell">
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
        onRecordEvidence={(selection) => send({ type: 'RECORD_EVIDENCE', selection })}
        onContinue={continueStage}
      />
    </main>
  );
}
