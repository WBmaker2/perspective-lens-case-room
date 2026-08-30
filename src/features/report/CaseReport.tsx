import type { RefObject } from 'react';
import type { CasePack } from '../../model/case';
import type { StageId } from '../../model/session';
import type { CaseReportModel } from '../../domain/buildCaseReport';
import { ReportResetControl } from './ReportResetControl';
import { factReference, feedbackStatusLabels, perspectiveTagLabels } from '../../content/learnerLabels';

export interface CaseReportProps {
  model: CaseReportModel;
  pack: CasePack;
  onRevisitStage: (stage: Exclude<StageId, 'intake'>) => void;
  onRevisitSentence?: (sentenceId: string) => void;
  onReset: () => void;
  printMode?: boolean;
}

const hypothesisLabels: Readonly<Record<CaseReportModel['initialHypothesis'], string>> = {
  'seen-information': '보이는 정보를 먼저 살폈어요.',
  priority: '무엇을 먼저 챙길지에 초점을 두었어요.',
  'evaluative-language': '말에 담긴 평가 표현을 먼저 살폈어요.',
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

function ComparisonSnapshot({ pack, title, draft, onRevisitStage, onRevisitSentence, readOnly = false }: { pack: CasePack; title: string; draft: CaseReportModel['initialComparison']; onRevisitStage: CaseReportProps['onRevisitStage']; onRevisitSentence?: CaseReportProps['onRevisitSentence']; readOnly?: boolean }) {
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
      <div className="case-report__snapshot-group">
        <span>연결한 근거 문장</span>
        <div className="case-report__reason-list">
          {draft.supportingSentenceIds.length > 0 ? draft.supportingSentenceIds.map((sentenceId, index) => {
            const info = sentenceInfo(pack, sentenceId);
            return (
              <SentenceRevisit
                key={`${title}-${sentenceId}-${index}`}
                pack={pack}
                sentenceId={sentenceId}
                sentenceNumber={info?.sentence.number ?? 0}
                prefix="근거"
                context={title}
                onRevisitStage={onRevisitStage}
                onRevisitSentence={onRevisitSentence}
                readOnly={readOnly}
              />
            );
          }) : <p className="muted">기록 없음</p>}
        </div>
      </div>
    </div>
  );
}

function SentenceRevisit({
  pack,
  sentenceId,
  sentenceNumber,
  onRevisitStage,
  onRevisitSentence,
  prefix = '근거',
  context,
  readOnly = false,
}: {
  pack: CasePack;
  sentenceId: string;
  sentenceNumber: number;
  onRevisitStage: CaseReportProps['onRevisitStage'];
  onRevisitSentence?: CaseReportProps['onRevisitSentence'];
  prefix?: string;
  context?: string;
  readOnly?: boolean;
}) {
  const info = sentenceInfo(pack, sentenceId);
  const label = info
    ? `${context ? `${context} · ` : ''}${info.narrator.displayName} ${prefix} 문장 ${sentenceNumber}${readOnly ? '' : ' 다시 보기'}`
    : '근거 문장 다시 보기';
  if (readOnly) {
    return <span className="case-report__sentence-reference" data-sentence-id={sentenceId}>{label}</span>;
  }
  return (
    <button
      className="case-report__sentence-button"
      type="button"
      data-sentence-id={sentenceId}
      onClick={() => onRevisitSentence ? onRevisitSentence(sentenceId) : onRevisitStage('lenses')}
    >
      {label}
    </button>
  );
}

export function CaseReport({ model, pack, onRevisitStage, onRevisitSentence, onReset, printMode = false }: CaseReportProps) {
  const headingPrefix = printMode ? 'teacher-print-report' : 'report';
  const reportBody = (
    resetTriggerRef: RefObject<HTMLButtonElement | null> | null,
    openResetDialog: (() => void) | null,
  ) => (
    <>
            <div className="stage-heading-block">
              <p className="eyebrow">EVIDENCE-CENTERED REPORT / 06</p>
              <h1 id={`${headingPrefix}-title`} {...(!printMode ? { 'data-stage-heading': true, tabIndex: -1 } : {})}>사건 보고서</h1>
              <p className="lead">무엇을 보았고, 어떤 생각을 고쳐 보았는지 근거와 함께 돌아봅니다.</p>
            </div>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-evidence-title`}>
              <h2 id={`${headingPrefix}-evidence-title`}>사용한 근거</h2>
              <p className="case-report__intro">{printMode ? '인물별 문장 번호와 근거 연결 상태를 참고하세요.' : '두 글에서 고른 근거 문장을 다시 확인해 보세요. 문장을 누르면 원래 자리로 돌아가요.'}</p>
              <ol className="case-report__evidence-list">
                {model.evidence.map((evidence) => (
                  <li key={evidence.sentenceId} className="case-report__evidence-row">
                    <SentenceRevisit
                      pack={pack}
                      sentenceId={evidence.sentenceId}
                      sentenceNumber={evidence.sentenceNumber}
                      onRevisitStage={onRevisitStage}
                      onRevisitSentence={onRevisitSentence}
                      readOnly={printMode}
                    />
                    <span className={`case-report__evidence-status case-report__evidence-status--${evidence.status}`}>
                      {feedbackStatusLabels[evidence.status]}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-thought-title`}>
              <h2 id={`${headingPrefix}-thought-title`}>처음 생각과 수정한 생각</h2>
              <div className="case-report__hypothesis">
                <span>처음 고른 초점</span>
                <p>{hypothesisLabels[model.initialHypothesis]}</p>
              </div>
              <div className="case-report__snapshots">
                <ComparisonSnapshot pack={pack} title="처음 비교" draft={model.initialComparison} onRevisitStage={onRevisitStage} onRevisitSentence={onRevisitSentence} readOnly={printMode} />
                <ComparisonSnapshot pack={pack} title="수정한 비교" draft={model.revisedComparison} onRevisitStage={onRevisitStage} onRevisitSentence={onRevisitSentence} readOnly={printMode} />
              </div>
              <div className="case-report__changed">
                <span>달라진 비교 항목</span>
                <p>{model.changedOptionIds.length > 0 ? model.changedOptionIds.map((id) => optionLabel(pack, id)).join(' · ') : '바뀐 항목이 없어요.'}</p>
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
                        onRevisitSentence={onRevisitSentence}
                        readOnly={printMode}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-preserved-title`}>
              <h2 id={`${headingPrefix}-preserved-title`}>관점 전환에서 유지한 사실</h2>
              <div className="case-report__fact-row">
                <span>지킨 사실</span>
                {model.preservedFactIds.length > 0 ? (
                  <ul className="case-report__facts" aria-label="지킨 사실">
                    {model.preservedFactIds.map((factId) => (
                      <li key={factId} data-fact-id={factId}>{factReference(pack, factId)}</li>
                    ))}
                  </ul>
                ) : <p>기록 없음</p>}
              </div>
              <div className="case-report__fact-row">
                <span>사용한 관점 단서</span>
                {model.perspectiveTags.length > 0 ? (
                  <ul className="case-report__tags" aria-label="사용한 관점 단서">
                    {model.perspectiveTags.map((tag) => (
                      <li key={tag} data-perspective-tag={tag}>{perspectiveTagLabels[tag] ?? '기록된 관점'}</li>
                    ))}
                  </ul>
                ) : <p>기록 없음</p>}
              </div>
            </section>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-takeaway-title`}>
              <h2 id={`${headingPrefix}-takeaway-title`}>오늘 배운 점</h2>
              <p className="case-report__intro">{model.learningTakeaway}</p>
            </section>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-next-step-title`}>
              <h2 id={`${headingPrefix}-next-step-title`}>다음에 해 볼 일</h2>
              <p className="case-report__intro">{model.nextStep}</p>
            </section>

            <section className="case-report__section" aria-labelledby={`${headingPrefix}-questions-title`}>
              <h2 id={`${headingPrefix}-questions-title`}>남은 질문</h2>
              {model.remainingQuestions.length > 0 ? (
                <ul className="case-report__questions">
                  {model.remainingQuestions.map((question) => <li key={question}>{question}</li>)}
                </ul>
              ) : <p className="case-report__empty">더 살펴볼 빠진 정보가 없어요. 그래도 새로운 근거가 보이면 다시 질문해 보세요.</p>}
            </section>

            {printMode ? null : (
              <div className="case-report__actions">
                <button
                  className="case-report__reset-trigger"
                  ref={resetTriggerRef ?? undefined}
                  type="button"
                  onClick={openResetDialog ?? undefined}
                >
                  다른 사건 접수
                </button>
              </div>
            )}
    </>
  );

  return (
    <section className={`stage-content case-report${printMode ? ' case-report--print' : ''}`} aria-labelledby={`${headingPrefix}-title`}>
      {printMode ? (
        <div className="case-report__background">{reportBody(null, null)}</div>
      ) : (
        <ReportResetControl onReset={onReset}>
          {(resetTriggerRef, openResetDialog) => reportBody(resetTriggerRef, openResetDialog)}
        </ReportResetControl>
      )}
    </section>
  );
}
