import { useEffect, useRef, useState } from 'react';
import type { CasePack } from '../../model/case';
import type { FeedbackStatus } from '../../model/feedback';
import type { StageId } from '../../model/session';
import type { CaseReportModel } from '../../domain/buildCaseReport';

export interface CaseReportProps {
  model: CaseReportModel;
  pack: CasePack;
  onRevisitStage: (stage: Exclude<StageId, 'intake'>) => void;
  onReset: () => void;
}

const hypothesisLabels: Readonly<Record<CaseReportModel['initialHypothesis'], string>> = {
  'seen-information': '보이는 정보를 먼저 살폈어요.',
  priority: '무엇을 먼저 챙길지에 초점을 두었어요.',
  'evaluative-language': '말에 담긴 평가 표현을 먼저 살폈어요.',
};

const evidenceStatusLabels: Readonly<Record<FeedbackStatus, string>> = {
  supported: '근거 연결됨',
  'partially-supported': '일부 연결됨',
  revise: '다시 살펴볼 근거',
};

type ComparisonKey = 'sharedFactOptionIds' | 'differentExpressionOptionIds' | 'missingInformationOptionIds';
const comparisonLabels: Readonly<Record<ComparisonKey, string>> = {
  sharedFactOptionIds: '공통 사실',
  differentExpressionOptionIds: '다른 표현',
  missingInformationOptionIds: '빠진 정보',
};

const sentenceInfo = (pack: CasePack, sentenceId: string) => {
  for (const narrator of pack.narrators) {
    const sentence = narrator.sentences.find((item) => item.id === sentenceId);
    if (sentence) return { narrator, sentence };
  }
  return undefined;
};

const optionLabel = (pack: CasePack, optionId: string): string => (
  pack.comparisonOptions.find((option) => option.id === optionId)?.label ?? optionId
);

function ComparisonSnapshot({ pack, title, draft }: { pack: CasePack; title: string; draft: CaseReportModel['initialComparison'] }) {
  const keys = Object.keys(comparisonLabels) as ComparisonKey[];
  return (
    <div className="case-report__snapshot" role="group" aria-label={title}>
      <strong>{title}</strong>
      {keys.map((key) => (
        <div className="case-report__snapshot-group" key={key}>
          <span>{comparisonLabels[key]}</span>
          {draft[key].length > 0 ? (
            <ul>
              {draft[key].map((optionId) => <li key={optionId}>{optionLabel(pack, optionId)}</li>)}
            </ul>
          ) : <p className="muted">기록 없음</p>}
        </div>
      ))}
    </div>
  );
}

function SentenceRevisit({
  pack,
  sentenceId,
  sentenceNumber,
  onRevisitStage,
  prefix = '근거',
}: {
  pack: CasePack;
  sentenceId: string;
  sentenceNumber: number;
  onRevisitStage: CaseReportProps['onRevisitStage'];
  prefix?: string;
}) {
  const info = sentenceInfo(pack, sentenceId);
  const label = info ? `${info.narrator.displayName} ${prefix} 문장 ${sentenceNumber} 다시 보기` : `${prefix} 문장 ${sentenceNumber} 다시 보기`;
  return (
    <button
      className="case-report__sentence-button"
      type="button"
      data-sentence-id={sentenceId}
      onClick={() => onRevisitStage('lenses')}
    >
      {label}
    </button>
  );
}

export function CaseReport({ model, pack, onRevisitStage, onReset }: CaseReportProps) {
  const [isResetOpen, setIsResetOpen] = useState(false);
  const resetTriggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const closeResetDialog = () => {
    setIsResetOpen(false);
    resetTriggerRef.current?.focus();
  };
  const confirmReset = () => {
    setIsResetOpen(false);
    onReset();
  };

  useEffect(() => {
    if (!isResetOpen) return undefined;
    const firstControl = dialogRef.current?.querySelector<HTMLButtonElement>('button');
    firstControl?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeResetDialog();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isResetOpen]);

  return (
    <section className="stage-content case-report" aria-labelledby="report-title">
      <div className="stage-heading-block">
        <p className="eyebrow">EVIDENCE-CENTERED REPORT / 06</p>
        <h1 id="report-title" data-stage-heading tabIndex={-1}>사건 보고서</h1>
        <p className="lead">무엇을 보았고, 어떤 생각을 고쳐 보았는지 근거와 함께 돌아봅니다.</p>
      </div>

      <section className="case-report__section" aria-labelledby="report-evidence-title">
        <h2 id="report-evidence-title">사용한 근거</h2>
        <p className="case-report__intro">두 렌즈의 문장을 순서대로 확인했어요. 문장을 다시 읽으려면 해당 버튼을 누르세요.</p>
        <ol className="case-report__evidence-list">
          {model.evidence.map((evidence) => (
            <li key={evidence.sentenceId} className="case-report__evidence-row">
              <SentenceRevisit
                pack={pack}
                sentenceId={evidence.sentenceId}
                sentenceNumber={evidence.sentenceNumber}
                onRevisitStage={onRevisitStage}
              />
              <span className={`case-report__evidence-status case-report__evidence-status--${evidence.status}`}>
                {evidenceStatusLabels[evidence.status]}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-report__section" aria-labelledby="report-thought-title">
        <h2 id="report-thought-title">처음 생각과 수정한 생각</h2>
        <div className="case-report__hypothesis">
          <span>처음 고른 초점</span>
          <p>{hypothesisLabels[model.initialHypothesis]}</p>
        </div>
        <div className="case-report__snapshots">
          <ComparisonSnapshot pack={pack} title="처음 비교" draft={model.initialComparison} />
          <ComparisonSnapshot pack={pack} title="수정한 비교" draft={model.revisedComparison} />
        </div>
        <div className="case-report__changed">
          <span>달라진 비교 항목</span>
          <p>{model.changedOptionIds.length > 0 ? model.changedOptionIds.map((id) => optionLabel(pack, id)).join(' · ') : '바뀐 항목 없음'}</p>
        </div>
        <div className="case-report__reason">
          <span>생각이 달라진 이유</span>
          <div className="case-report__reason-list">
            {model.revisionEvidenceSentenceIds.map((sentenceId) => {
              const info = sentenceInfo(pack, sentenceId);
              return (
                <SentenceRevisit
                  key={sentenceId}
                  pack={pack}
                  sentenceId={sentenceId}
                  sentenceNumber={info?.sentence.number ?? 0}
                  prefix="이유"
                  onRevisitStage={onRevisitStage}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="case-report__section" aria-labelledby="report-preserved-title">
        <h2 id="report-preserved-title">관점 전환에서 유지한 사실</h2>
        <div className="case-report__fact-row">
          <span>보존한 사실 표지</span>
          <p>{model.preservedFactIds.length > 0 ? model.preservedFactIds.join(' · ') : '기록 없음'}</p>
        </div>
        <div className="case-report__fact-row">
          <span>사용한 관점 표지</span>
          <p>{model.perspectiveTags.length > 0 ? model.perspectiveTags.join(' · ') : '기록 없음'}</p>
        </div>
      </section>

      <section className="case-report__section" aria-labelledby="report-questions-title">
        <h2 id="report-questions-title">남은 질문</h2>
        {model.remainingQuestions.length > 0 ? (
          <ul className="case-report__questions">
            {model.remainingQuestions.map((question) => <li key={question}>{question}</li>)}
          </ul>
        ) : <p className="case-report__empty">더 살펴볼 빠진 정보가 없어요. 그래도 새로운 근거가 보이면 다시 질문해 보세요.</p>}
      </section>

      <div className="case-report__actions">
        <button
          className="case-report__reset-trigger"
          ref={resetTriggerRef}
          type="button"
          onClick={() => setIsResetOpen(true)}
        >
          다른 사건 접수
        </button>
      </div>

      {isResetOpen ? (
        <div className="case-report__dialog-backdrop">
          <div
            className="case-report__dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-reset-title"
            aria-describedby="case-reset-description"
          >
            <h2 id="case-reset-title">현재 기록을 지울까요?</h2>
            <p id="case-reset-description">진행 중인 답과 저장하지 않은 메모가 지워집니다. 따로 저장한 메모는 남아 있어요.</p>
            <div className="case-report__dialog-actions">
              <button type="button" onClick={closeResetDialog}>취소</button>
              <button type="button" onClick={confirmReset}>현재 기록 지우고 새 사건 접수</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
