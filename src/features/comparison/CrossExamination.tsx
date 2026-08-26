import { useEffect, useRef, useState } from 'react';
import { evaluateComparison } from '../../domain/evaluateComparison';
import { StageActionButton } from '../../components/StageActionButton';
import { NeutralRecordReveal } from './NeutralRecordReveal';
import type { CasePack, ComparisonOption } from '../../model/case';
import type { ComparisonFeedback } from '../../model/feedback';
import type { ComparisonDraft, ComparisonPhase } from '../../model/session';

export interface CrossExaminationProps {
  pack: CasePack;
  phase: ComparisonPhase;
  initialDraft: ComparisonDraft | null;
  revisedDraft: ComparisonDraft | null;
  onSaveInitial: (draft: ComparisonDraft) => void;
  onReveal: (recordIds: readonly string[]) => void;
  onSaveRevision: (draft: ComparisonDraft, reasonSentenceIds: readonly string[]) => void;
  onContinue: () => void;
  /** IDs are controlled by the reducer. Kept optional for direct feature use. */
  revealedRecordIds?: readonly string[];
  /** Revision reasons are separate from the comparison's supporting sentences. */
  revisionEvidenceSentenceIds?: readonly string[];
}

type DraftOptionKey = 'sharedFactOptionIds' | 'differentExpressionOptionIds' | 'missingInformationOptionIds';

const categories: readonly { key: DraftOptionKey; label: string; validFor: ComparisonOption['validFor'][number] }[] = [
  { key: 'sharedFactOptionIds', label: '공통 사실', validFor: 'shared-fact' },
  { key: 'differentExpressionOptionIds', label: '다른 표현', validFor: 'different-expression' },
  { key: 'missingInformationOptionIds', label: '빠진 정보', validFor: 'missing-information' },
];

const emptyDraft = (): ComparisonDraft => ({
  sharedFactOptionIds: [],
  differentExpressionOptionIds: [],
  missingInformationOptionIds: [],
  supportingSentenceIds: [],
});

const cloneDraft = (draft: ComparisonDraft): ComparisonDraft => ({
  sharedFactOptionIds: [...draft.sharedFactOptionIds],
  differentExpressionOptionIds: [...draft.differentExpressionOptionIds],
  missingInformationOptionIds: [...draft.missingInformationOptionIds],
  supportingSentenceIds: [...draft.supportingSentenceIds],
});

const sameIds = (left: readonly string[] | undefined, right: readonly string[] | undefined): boolean =>
  Boolean(left && right && left.length === right.length && left.every((id, index) => id === right[index]));

const hasDraftContent = (draft: ComparisonDraft): boolean => (
  draft.sharedFactOptionIds.length > 0 || draft.differentExpressionOptionIds.length > 0 ||
  draft.missingInformationOptionIds.length > 0 || draft.supportingSentenceIds.length > 0
);

const allSentenceIds = (pack: CasePack): readonly string[] =>
  pack.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id));

function ComparisonFeedbackPanel({ feedback, live }: { feedback: ComparisonFeedback; live: boolean }) {
  const sentenceIds = feedback.supportingSentenceIds.length > 0 ? feedback.supportingSentenceIds.join(', ') : '없음';
  return (
    <div
      className={`comparison-feedback comparison-feedback--${feedback.status}`}
      role={live ? 'status' : 'note'}
      aria-live={live ? 'polite' : undefined}
      data-comparison-status={feedback.status}
    >
      <strong>{feedback.status}</strong>
      <span>{feedback.message}</span>
      <span>근거 문장 ID: {sentenceIds}</span>
    </div>
  );
}

function OptionFieldset({
  category,
  options,
  selectedIds,
  onToggle,
}: {
  category: (typeof categories)[number];
  options: readonly ComparisonOption[];
  selectedIds: readonly string[];
  onToggle: (optionId: string) => void;
}) {
  return (
    <fieldset className={`comparison-fieldset comparison-fieldset--${category.key}`}>
      <legend>{category.label}</legend>
      <div className="comparison-options">
        {options.length > 0 ? options.map((option) => (
          <label className="comparison-option" key={option.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(option.id)}
              aria-label={option.label}
              data-option-id={option.id}
              onChange={() => onToggle(option.id)}
            />
            <span>{option.label}</span>
          </label>
        )) : <p className="gate-hint">이 사건에는 이 종류의 비교 항목이 없습니다.</p>}
      </div>
    </fieldset>
  );
}

function SupportingSentenceChecklist({
  pack,
  selectedIds,
  reason,
  onToggle,
}: {
  pack: CasePack;
  selectedIds: readonly string[];
  reason?: boolean;
  onToggle: (sentenceId: string) => void;
}) {
  const prefix = reason ? '이유 문장' : '근거 문장';
  return (
    <fieldset className={`supporting-sentence-fieldset${reason ? ' supporting-sentence-fieldset--reason' : ''}`}>
      <legend>{reason ? '생각이 달라진 이유를 보여 주는 문장' : '비교를 뒷받침하는 근거 문장'}</legend>
      <p className="supporting-copy">
        {reason ? '수정한 판단의 이유가 된 실제 서술 문장을 하나 이상 고르세요.' : '고른 비교 항목을 뒷받침하는 서술 문장을 모두 고르세요.'}
      </p>
      <div className="supporting-sentence-list">
        {pack.narrators.map((narrator) => (
          <div className="supporting-sentence-group" key={narrator.id}>
            <h3>{narrator.displayName}</h3>
            {narrator.sentences.map((sentence) => (
              <label className="supporting-sentence" key={sentence.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(sentence.id)}
                  aria-label={`${prefix} ${sentence.id} · ${narrator.displayName} 문장 ${sentence.number}`}
                  onChange={() => onToggle(sentence.id)}
                />
                <span><b>{sentence.number}.</b> {sentence.text}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

function InitialThought({ pack, draft }: { pack: CasePack; draft: ComparisonDraft }) {
  const selectedIds = new Set([
    ...draft.sharedFactOptionIds,
    ...draft.differentExpressionOptionIds,
    ...draft.missingInformationOptionIds,
  ]);
  const selectedOptions = pack.comparisonOptions.filter((option) => selectedIds.has(option.id));
  return (
    <section className="initial-thought" aria-labelledby="initial-thought-title">
      <div className="section-label-row">
        <h2 id="initial-thought-title">처음 생각</h2>
        <span className="muted">저장된 초기 비교 · 읽기 전용</span>
      </div>
      <ul className="initial-thought__list">
        {selectedOptions.map((option) => <li key={option.id}>{option.label}</li>)}
      </ul>
      <p className="initial-thought__evidence">연결한 근거 문장 ID: {draft.supportingSentenceIds.join(', ') || '없음'}</p>
    </section>
  );
}

export function CrossExamination({
  pack,
  phase,
  initialDraft,
  revisedDraft,
  onSaveInitial,
  onReveal,
  onSaveRevision,
  onContinue,
  revealedRecordIds,
  revisionEvidenceSentenceIds,
}: CrossExaminationProps) {
  const [draft, setDraft] = useState<ComparisonDraft>(() => cloneDraft(initialDraft ?? emptyDraft()));
  const [reasonSentenceIds, setReasonSentenceIds] = useState<readonly string[]>(() => [...(revisionEvidenceSentenceIds ?? [])]);
  const previousPhase = useRef(phase);
  const previousRevisedDraft = useRef(revisedDraft);
  const previousReasons = useRef(revisionEvidenceSentenceIds);
  const sentenceIds = allSentenceIds(pack);
  const sentenceIdSet = new Set(sentenceIds);

  useEffect(() => {
    const enteredRevised = phase === 'revised' && previousPhase.current !== 'revised';
    if (enteredRevised) setDraft(cloneDraft(revisedDraft ?? initialDraft ?? emptyDraft()));
    if (phase === 'initial' && previousPhase.current !== 'initial') setDraft(cloneDraft(initialDraft ?? emptyDraft()));
    if (phase === 'revised' && revisedDraft && revisedDraft !== previousRevisedDraft.current) setDraft(cloneDraft(revisedDraft));
    if (phase === 'revised' && revisionEvidenceSentenceIds && revisionEvidenceSentenceIds !== previousReasons.current) {
      setReasonSentenceIds([...revisionEvidenceSentenceIds]);
    }
    previousPhase.current = phase;
    previousRevisedDraft.current = revisedDraft;
    previousReasons.current = revisionEvidenceSentenceIds;
  }, [phase, initialDraft, revisedDraft, revisionEvidenceSentenceIds]);

  const feedback = hasDraftContent(draft) ? evaluateComparison(pack, draft) : null;
  const initialFeedback = initialDraft ? evaluateComparison(pack, initialDraft) : null;
  const supportingIdsAreValid = draft.supportingSentenceIds.every((id) => sentenceIdSet.has(id));
  const validReasonIds = reasonSentenceIds.filter((id) => sentenceIdSet.has(id));
  const revisionFeedbackIsSupported = feedback?.status === 'supported' && supportingIdsAreValid;
  const canSaveInitial = phase === 'initial' && feedback?.status === 'supported' && supportingIdsAreValid;
  const canSaveRevision = phase === 'revised' && revisionFeedbackIsSupported && validReasonIds.length > 0;
  const propsReasons = revisionEvidenceSentenceIds ?? undefined;
  const propsRevisionSaved = Boolean(
    phase === 'revised' && revisedDraft && evaluateComparison(pack, revisedDraft).status === 'supported' &&
    propsReasons && propsReasons.length > 0 && propsReasons.every((id) => sentenceIdSet.has(id)) &&
    sameIds(draft.sharedFactOptionIds, revisedDraft.sharedFactOptionIds) &&
    sameIds(draft.differentExpressionOptionIds, revisedDraft.differentExpressionOptionIds) &&
    sameIds(draft.missingInformationOptionIds, revisedDraft.missingInformationOptionIds) &&
    sameIds(draft.supportingSentenceIds, revisedDraft.supportingSentenceIds) &&
    sameIds(reasonSentenceIds, propsReasons),
  );
  const directUseRevisionSaved = Boolean(
    phase === 'revised' && revisedDraft && revisionEvidenceSentenceIds === undefined &&
    evaluateComparison(pack, revisedDraft).status === 'supported' && sameIds(draft.supportingSentenceIds, revisedDraft.supportingSentenceIds),
  );
  const revisionSaved = propsRevisionSaved || directUseRevisionSaved;
  const hiddenRecords = pack.neutralRecords.filter((record) => record.visibility === 'reveal');
  const controlledRevealIds = revealedRecordIds ?? (phase === 'revised' ? hiddenRecords.map((record) => record.id) : []);
  const visibleRecords = hiddenRecords.filter((record) => controlledRevealIds.includes(record.id));

  const toggleOption = (key: DraftOptionKey, optionId: string) => {
    setDraft((current) => {
      const nextIds = current[key].includes(optionId)
        ? current[key].filter((id) => id !== optionId)
        : [...current[key], optionId];
      return { ...current, [key]: nextIds };
    });
  };
  const toggleSentence = (sentenceId: string) => {
    setDraft((current) => ({
      ...current,
      supportingSentenceIds: current.supportingSentenceIds.includes(sentenceId)
        ? current.supportingSentenceIds.filter((id) => id !== sentenceId)
        : [...current.supportingSentenceIds, sentenceId],
    }));
  };
  const toggleReasonSentence = (sentenceId: string) => {
    setReasonSentenceIds((current) => current.includes(sentenceId)
      ? current.filter((id) => id !== sentenceId)
      : [...current, sentenceId]);
  };

  const saveInitial = () => {
    if (!canSaveInitial) return;
    onSaveInitial(cloneDraft(draft));
  };
  const revealRecords = () => {
    if (phase !== 'reveal' || !initialDraft || initialFeedback?.status !== 'supported') return;
    onReveal(hiddenRecords.map((record) => record.id));
  };
  const saveRevision = () => {
    if (!canSaveRevision) return;
    onSaveRevision(cloneDraft(draft), [...validReasonIds]);
  };

  return (
    <section className="stage-content comparison" aria-labelledby="comparison-title" data-comparison-phase={phase}>
      <div className="stage-heading-block">
        <p className="eyebrow">CROSS-EXAMINATION / 04</p>
        <h1 id="comparison-title" data-stage-heading tabIndex={-1}>교차 조사</h1>
        <p className="lead">두 서술에서 공통 사실·다른 표현·빠진 정보를 찾아 근거 문장과 연결해 보세요.</p>
      </div>

      {phase !== 'initial' && initialDraft ? <InitialThought pack={pack} draft={initialDraft} /> : null}

      {phase === 'initial' || phase === 'revised' ? (
        <div className="comparison-workspace">
          {categories.map((category) => (
            <OptionFieldset
              key={category.key}
              category={category}
              options={pack.comparisonOptions.filter((option) => option.validFor.includes(category.validFor))}
              selectedIds={draft[category.key]}
              onToggle={(optionId) => toggleOption(category.key, optionId)}
            />
          ))}
          <SupportingSentenceChecklist pack={pack} selectedIds={draft.supportingSentenceIds} onToggle={toggleSentence} />
        </div>
      ) : null}

      {phase !== 'initial' && visibleRecords.length > 0 ? (
        <section className="comparison-records" aria-labelledby="neutral-record-title">
          <div className="section-label-row">
            <h2 id="neutral-record-title">추가 기록</h2>
            <span className="muted">중립 기록 · 순서대로 공개됨</span>
          </div>
          <NeutralRecordReveal records={visibleRecords} labelledBy="neutral-record-title" />
        </section>
      ) : null}

      {phase === 'revised' ? (
        <SupportingSentenceChecklist
          pack={pack}
          selectedIds={reasonSentenceIds}
          reason
          onToggle={toggleReasonSentence}
        />
      ) : null}

      {phase !== 'reveal' && feedback ? <ComparisonFeedbackPanel feedback={feedback} live /> : null}
      {phase === 'reveal' && initialFeedback ? <ComparisonFeedbackPanel feedback={initialFeedback} live={false} /> : null}

      <div className="stage-action-row comparison-actions">
        {phase === 'initial' ? (
          <StageActionButton
            disabled={!canSaveInitial}
            isCurrentRequired={Boolean(canSaveInitial)}
            guidanceText="세 비교 항목과 근거 문장을 연결했어요. 초기 비교를 저장하세요."
            onClick={saveInitial}
          >
            비교 완료
          </StageActionButton>
        ) : null}
        {phase === 'reveal' ? (
          <StageActionButton
            disabled={!initialDraft || initialFeedback?.status !== 'supported'}
            isCurrentRequired={Boolean(initialDraft && initialFeedback?.status === 'supported')}
            guidanceText="처음 생각을 저장했어요. 추가 중립 기록을 열어 보세요."
            onClick={revealRecords}
          >
            추가 기록 열기
          </StageActionButton>
        ) : null}
        {phase === 'revised' && !revisionSaved ? (
          <StageActionButton
            disabled={!canSaveRevision}
            isCurrentRequired={Boolean(canSaveRevision)}
            guidanceText="수정한 비교와 생각이 달라진 이유를 저장하세요."
            onClick={saveRevision}
          >
            수정 비교 완료
          </StageActionButton>
        ) : null}
        {phase === 'revised' && revisionSaved ? (
          <StageActionButton
            disabled={false}
            isCurrentRequired
            guidanceText="수정 비교가 저장되었어요. 관점 전환을 시작하세요."
            onClick={onContinue}
          >
            관점 전환 시작
          </StageActionButton>
        ) : null}
      </div>
      {phase === 'initial' && !canSaveInitial ? <p className="gate-hint" role="status">공통 사실·다른 표현·빠진 정보를 각각 하나 이상 고르고 필요한 근거 문장을 선택하세요.</p> : null}
      {phase === 'revised' && !canSaveRevision && !revisionSaved ? <p className="gate-hint" role="status">수정 비교가 뒷받침되고 이유 문장을 하나 이상 선택해야 저장할 수 있어요.</p> : null}
    </section>
  );
}
