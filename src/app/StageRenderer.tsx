import type { CaseId, CasePack, InitialHypothesis } from '../model/case';
import type { CaseSession, ComparisonDraft, EvidenceSelection, StageId } from '../model/session';
import { CaseIntake } from '../features/intake/CaseIntake';
import { LensReader } from '../features/lenses/LensReader';
import { EvidenceBoard } from '../features/evidence/EvidenceBoard';
import { CrossExamination } from '../features/comparison/CrossExamination';
import { stageLabel } from '../model/ui';

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

export function StageRenderer({ casePacks, session, onSelectCase, onSelectHypothesis, onMarkRead, onToggleImportantSentence, onRecordEvidence, onSaveInitialComparison, onRevealRecords, onSaveRevisedComparison, onContinue }: StageRendererProps) {
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
      return <Placeholder stage="rewrite" />;
    case 'report':
      return <Placeholder stage="report" />;
  }

  return <p role="alert">알 수 없는 학습 단계입니다.</p>;
}
