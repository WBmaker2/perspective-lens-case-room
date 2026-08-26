import type { CaseId, CasePack, InitialHypothesis } from '../model/case';
import type { CaseSession, ComparisonDraft, EvidenceSelection, RewriteDraft, StageId, StorageAdapter } from '../model/session';
import { CaseIntake } from '../features/intake/CaseIntake';
import { LensReader } from '../features/lenses/LensReader';
import { EvidenceBoard } from '../features/evidence/EvidenceBoard';
import { CrossExamination } from '../features/comparison/CrossExamination';
import { MemoPad } from '../features/rewrite/MemoPad';
import { PerspectiveRewrite } from '../features/rewrite/PerspectiveRewrite';
import { CaseReport } from '../features/report/CaseReport';
import { buildCaseReport, isIncompleteCaseReportError } from '../domain/buildCaseReport';
import { stageLabel } from '../model/ui';
import { ReportResetControl } from '../features/report/ReportResetControl';

export interface StageRendererProps {
  casePacks: readonly CasePack[];
  session: CaseSession;
  onSelectCase: (caseId: CaseId) => void;
  onSelectHypothesis: (hypothesis: InitialHypothesis) => void;
  onMarkRead: (narratorId: string) => void;
  onToggleImportantSentence: (sentenceId: string) => void;
  onRecordEvidence: (selection: EvidenceSelection) => void;
  onSaveInitialComparison: (draft: ComparisonDraft) => void;
  onRevealRecords: (recordIds: readonly string[]) => void;
  onSaveRevisedComparison: (draft: ComparisonDraft, reasonSentenceIds: readonly string[]) => void;
  onSaveRewrite: (draft: RewriteDraft) => void;
  onRevisitStage: (stage: Exclude<StageId, 'intake'>) => void;
  onReset: () => void;
  storage: StorageAdapter;
  onPersistenceMessage: (message: string) => void;
  onContinue: () => void;
}

function Placeholder({ stage }: { stage: StageId }) {
  return (
    <section className="stage-content stage-placeholder" aria-labelledby={`${stage}-title`}>
      <p className="eyebrow">NEXT WORKSPACE</p>
      <h1 id={`${stage}-title`} data-stage-heading tabIndex={-1}>{stageLabel(stage)}</h1>
      <p className="lead">이 단계의 활동은 다음 화면에서 이어집니다.</p>
    </section>
  );
}

function IncompleteReportRecovery({ onRevisitStage, onReset }: Pick<StageRendererProps, 'onRevisitStage' | 'onReset'>) {
  return (
    <section className="stage-content case-report case-report--recovery" aria-labelledby="report-recovery-title">
      <ReportResetControl onReset={onReset}>
        {(resetTriggerRef, openResetDialog) => <>
          <div className="stage-heading-block">
            <p className="eyebrow">REPORT RECOVERY / 06</p>
            <h1 id="report-recovery-title" data-stage-heading tabIndex={-1}>사건 보고서를 다시 확인해 주세요</h1>
            <p className="lead" role="alert">이전 답변이 모두 확인되지 않아 보고서를 만들 수 없어요. 앞 단계로 돌아가 기록을 확인하거나 현재 기록을 지우고 새 사건을 접수하세요.</p>
          </div>
          <div className="case-report__recovery-actions">
            <button className="case-report__sentence-button" type="button" onClick={() => onRevisitStage('comparison')}>
              이전 비교 단계 다시 확인
            </button>
            <button className="case-report__reset-trigger" ref={resetTriggerRef} type="button" onClick={openResetDialog}>
              다른 사건 접수
            </button>
          </div>
        </>}
      </ReportResetControl>
    </section>
  );
}

export function StageRenderer({ casePacks, session, onSelectCase, onSelectHypothesis, onMarkRead, onToggleImportantSentence, onRecordEvidence, onSaveInitialComparison, onRevealRecords, onSaveRevisedComparison, onSaveRewrite, onRevisitStage, onReset, storage, onPersistenceMessage, onContinue }: StageRendererProps) {
  const selectedPack = session.caseId ? casePacks.find((pack) => pack.id === session.caseId) ?? null : null;

  switch (session.stage) {
    case 'intake':
      return (
        <CaseIntake
          casePacks={casePacks}
          session={session}
          onSelectCase={onSelectCase}
          onSelectHypothesis={onSelectHypothesis}
          onContinue={onContinue}
        />
      );
    case 'lenses':
      return selectedPack ? (
        <LensReader
          pack={selectedPack}
          readNarratorIds={session.readNarratorIds}
          markedSentenceIds={session.markedSentenceIds}
          onMarkRead={onMarkRead}
          onToggleImportantSentence={onToggleImportantSentence}
          onContinue={onContinue}
        />
      ) : <Placeholder stage="lenses" />;
    case 'evidence':
      return selectedPack ? (
        <EvidenceBoard
          pack={selectedPack}
          selections={session.evidenceSelections}
          onRecord={onRecordEvidence}
          onContinue={onContinue}
        />
      ) : <Placeholder stage="evidence" />;
    case 'comparison':
      return selectedPack ? (
        <CrossExamination
          pack={selectedPack}
          phase={session.comparisonPhase}
          initialDraft={session.initialComparison}
          revisedDraft={session.revisedComparison}
          revealedRecordIds={session.revealedRecordIds}
          revisionEvidenceSentenceIds={session.revisionEvidenceSentenceIds}
          onSaveInitial={onSaveInitialComparison}
          onReveal={onRevealRecords}
          onSaveRevision={onSaveRevisedComparison}
          onContinue={onContinue}
        />
      ) : <Placeholder stage="comparison" />;
    case 'rewrite':
      return selectedPack ? (
        <>
          <PerspectiveRewrite
            pack={selectedPack}
            draft={session.rewriteDraft}
            onChange={onSaveRewrite}
            onContinue={onContinue}
          />
          <MemoPad caseId={selectedPack.id} storage={storage} onPersistenceMessage={onPersistenceMessage} />
        </>
      ) : <Placeholder stage="rewrite" />;
    case 'report': {
      if (!selectedPack) return <IncompleteReportRecovery onRevisitStage={onRevisitStage} onReset={onReset} />;
      let reportModel;
      try {
        reportModel = buildCaseReport(session, selectedPack);
      } catch (error) {
        if (isIncompleteCaseReportError(error)) {
          return <IncompleteReportRecovery onRevisitStage={onRevisitStage} onReset={onReset} />;
        }
        throw error;
      }
      return <CaseReport model={reportModel} pack={selectedPack} onRevisitStage={onRevisitStage} onReset={onReset} />;
    }
  }

  return <p role="alert">알 수 없는 학습 단계입니다.</p>;
}
