import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { evaluateEvidenceSelection } from '../../domain/evaluateEvidence';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { SentenceCard } from '../../components/SentenceCard';
import { StageActionButton } from '../../components/StageActionButton';
import type { CasePack, EvidenceCategory, NarrativeSentence } from '../../model/case';
import type { EvidenceFeedback } from '../../model/feedback';
import type { EvidenceSelection } from '../../model/session';

export interface EvidenceBoardProps {
  pack: CasePack;
  selections: Readonly<Record<string, EvidenceSelection>>;
  onRecord: (selection: EvidenceSelection) => void;
  onContinue: () => void;
}

type Draft = Pick<EvidenceSelection, 'categoryIds' | 'selectedSegmentIds'>;

const categoryLabels: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실',
  inference: '인물의 추론',
  evaluation: '평가 표현',
};
const categoryOrder: readonly EvidenceCategory[] = ['observation', 'inference', 'evaluation'];

const normalizeCategories = (values: readonly EvidenceCategory[]): EvidenceCategory[] =>
  categoryOrder.filter((category) => values.includes(category));

const allSentences = (pack: CasePack): NarrativeSentence[] => pack.narrators.flatMap((narrator) => narrator.sentences);

const selectionIsSupported = (sentence: NarrativeSentence, selection: EvidenceSelection | undefined): boolean =>
  Boolean(selection && evaluateEvidenceSelection(sentence, selection).status === 'supported');

function SegmentChoices({ sentence, selectedSegmentIds, onToggle }: {
  sentence: NarrativeSentence;
  selectedSegmentIds: readonly string[];
  onToggle: (segmentId: string) => void;
}) {
  if (sentence.kind !== 'mixed') return null;
  return (
    <fieldset className="segment-choices">
      <legend>문장 부분을 모두 확인하세요</legend>
      <div className="segment-choices__list">
        {sentence.segments.map((segment) => (
          <label className="segment-choice" key={segment.id}>
            <input
              type="checkbox"
              checked={selectedSegmentIds.includes(segment.id)}
              onChange={() => onToggle(segment.id)}
            />
            <span>{segment.text}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function CategoryChoices({ categoryIds, onToggle }: {
  categoryIds: readonly EvidenceCategory[];
  onToggle: (category: EvidenceCategory) => void;
}) {
  return (
    <fieldset className="category-choices">
      <legend>이 문장의 근거를 분류하세요</legend>
      <div className="category-choices__list">
        {categoryOrder.map((category) => (
          <button
            className="category-choice"
            type="button"
            aria-pressed={categoryIds.includes(category)}
            key={category}
            onClick={() => onToggle(category)}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function EvidenceBoard({ pack, selections, onRecord, onContinue }: EvidenceBoardProps) {
  const sentences = useMemo(() => allSentences(pack), [pack]);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Readonly<Record<string, Draft>>>({});
  const [localSelections, setLocalSelections] = useState<Readonly<Record<string, EvidenceSelection>>>({});
  const [feedbackBySentence, setFeedbackBySentence] = useState<Readonly<Record<string, EvidenceFeedback>>>({});
  const [latestFeedbackId, setLatestFeedbackId] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!latestFeedbackId) return;
    feedbackRef.current?.focus();
  }, [latestFeedbackId]);

  const effectiveSelections: Readonly<Record<string, EvidenceSelection>> = { ...selections, ...localSelections };
  const effectiveFirstUnclassified = sentences.find((sentence) => !selectionIsSupported(sentence, effectiveSelections[sentence.id]));
  const activeSentence = activeSentenceId ? sentences.find((sentence) => sentence.id === activeSentenceId) ?? null : null;
  const activeSelection = activeSentence ? effectiveSelections[activeSentence.id] : undefined;
  const activeDraft: Draft = activeSentence
    ? drafts[activeSentence.id] ?? activeSelection ?? { categoryIds: [], selectedSegmentIds: [] }
    : { categoryIds: [], selectedSegmentIds: [] };
  const isActiveReady = Boolean(
    activeSentence &&
    activeDraft.categoryIds.length > 0 &&
    (activeSentence.kind !== 'mixed' || activeSentence.segments.every((segment) => activeDraft.selectedSegmentIds.includes(segment.id))),
  );
  const complete = sentences.length > 0 && sentences.every((sentence) => selectionIsSupported(sentence, effectiveSelections[sentence.id]));

  const setDraft = (sentenceId: string, next: Draft) => {
    setDrafts((current) => ({ ...current, [sentenceId]: next }));
  };

  const selectSentence = (sentenceId: string) => {
    const sentence = sentences.find((item) => item.id === sentenceId);
    if (!sentence) return;
    const existing = effectiveSelections[sentenceId];
    if (!drafts[sentenceId] && existing) setDraft(sentenceId, existing);
    setActiveSentenceId(sentenceId);
  };

  const toggleCategory = (category: EvidenceCategory) => {
    if (!activeSentence) return;
    const nextCategories = activeDraft.categoryIds.includes(category)
      ? activeDraft.categoryIds.filter((item) => item !== category)
      : [...activeDraft.categoryIds, category];
    setDraft(activeSentence.id, { ...activeDraft, categoryIds: normalizeCategories(nextCategories) });
  };

  const toggleSegment = (segmentId: string) => {
    if (!activeSentence) return;
    const nextSegments = activeDraft.selectedSegmentIds.includes(segmentId)
      ? activeDraft.selectedSegmentIds.filter((item) => item !== segmentId)
      : [...activeDraft.selectedSegmentIds, segmentId];
    setDraft(activeSentence.id, {
      ...activeDraft,
      selectedSegmentIds: activeSentence.segments.map((segment) => segment.id).filter((id) => nextSegments.includes(id)),
    });
  };

  const recordActiveSentence = () => {
    if (!activeSentence || !isActiveReady) return;
    const selection: EvidenceSelection = {
      sentenceId: activeSentence.id,
      categoryIds: normalizeCategories(activeDraft.categoryIds),
      selectedSegmentIds: activeSentence.segments.map((segment) => segment.id).filter((id) => (
        activeSentence.kind !== 'mixed' || activeDraft.selectedSegmentIds.includes(id)
      )),
    };
    const result = evaluateEvidenceSelection(activeSentence, selection);
    setLocalSelections((current) => ({ ...current, [selection.sentenceId]: selection }));
    setFeedbackBySentence((current) => ({ ...current, [selection.sentenceId]: result }));
    setLatestFeedbackId(selection.sentenceId);
    onRecord(selection);
    if (result.status === 'supported') {
      const next = sentences.find((sentence) => sentence.id !== selection.sentenceId && !selectionIsSupported(sentence, effectiveSelections[sentence.id]));
      setActiveSentenceId(next?.id ?? null);
    }
  };

  const cardDetails = (sentence: NarrativeSentence): ReactNode => {
    if (sentence.id !== activeSentence?.id) return null;
    const draft = sentence.id === activeSentence?.id ? activeDraft : drafts[sentence.id] ?? { categoryIds: [], selectedSegmentIds: [] };
    return (
      <>
        <CategoryChoices categoryIds={draft.categoryIds} onToggle={toggleCategory} />
        <SegmentChoices sentence={sentence} selectedSegmentIds={draft.selectedSegmentIds} onToggle={toggleSegment} />
      </>
    );
  };

  return (
    <section className="stage-content evidence" aria-labelledby="evidence-title">
      <div className="stage-heading-block">
        <p className="eyebrow">EVIDENCE BOARD / 03</p>
        <h1 id="evidence-title" data-stage-heading tabIndex={-1}>근거 보드</h1>
        <p className="lead">문장을 고른 뒤, 보이는 사실·인물의 추론·평가 표현을 근거로 분류해 보세요.</p>
      </div>

      <div className="evidence-board__legend" aria-label="근거 분류 안내">
        <span>10개 문장</span>
        <span>혼합 문장은 문장 부분을 모두 선택</span>
      </div>
      <ol className="evidence-list" aria-label="분류할 근거 문장">
        {sentences.map((sentence) => {
          const savedFeedback = feedbackBySentence[sentence.id];
          const pressed = sentence.id === activeSentence?.id;
          const saved = effectiveSelections[sentence.id];
          return (
            <li className={`evidence-list__item${pressed ? ' is-active' : ''}`} key={sentence.id}>
              <SentenceCard sentence={sentence} mode="classify-evidence" pressed={pressed} onToggle={selectSentence}>
                {cardDetails(sentence)}
              </SentenceCard>
              {savedFeedback ? <FeedbackPanel ref={savedFeedback.sentenceId === latestFeedbackId ? feedbackRef : undefined} feedback={savedFeedback} live={savedFeedback.sentenceId === latestFeedbackId} /> : null}
              {saved && !savedFeedback ? <p className="saved-indicator">분류가 저장되었습니다.</p> : null}
            </li>
          );
        })}
      </ol>

      <div className="stage-action-row evidence-actions">
        <div className="evidence-submit">
          <StageActionButton
            disabled={!isActiveReady}
            isCurrentRequired={Boolean(activeSentence && !selectionIsSupported(activeSentence, effectiveSelections[activeSentence.id]))}
            guidanceText="문장을 분류하고 근거를 표시해 보세요."
            onClick={recordActiveSentence}
          >
            근거 표시하기
          </StageActionButton>
        </div>
        <StageActionButton
          disabled={!complete}
          isCurrentRequired={complete}
          guidanceText="열 문장을 모두 분류했어요. 교차 조사를 시작하세요."
          onClick={onContinue}
        >
          교차 조사 시작
        </StageActionButton>
      </div>
      {effectiveFirstUnclassified && !activeSentence ? <p className="gate-hint" role="status">아직 분류하지 않은 문장을 선택하세요.</p> : null}
    </section>
  );
}
