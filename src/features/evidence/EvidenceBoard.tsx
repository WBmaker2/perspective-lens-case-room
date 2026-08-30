import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { evaluateEvidenceSelection } from '../../domain/evaluateEvidence';
import { FeedbackPanel } from '../../components/FeedbackPanel';
import { SentenceCard } from '../../components/SentenceCard';
import { StageActionButton } from '../../components/StageActionButton';
import { sentenceOwner } from '../../content/learnerLabels';
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
  const sentenceOwners = useMemo(() => new Map(sentences.map((sentence) => [sentence.id, sentenceOwner(pack, sentence)])), [pack, sentences]);
  const sentenceLens = useMemo(() => new Map(pack.narrators.flatMap((lens, index) => lens.sentences.map((sentence) => [sentence.id, index === 0 ? 'A' : 'B'] as const))), [pack]);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Readonly<Record<string, Draft>>>({});
  const [localSelections, setLocalSelections] = useState<Readonly<Record<string, EvidenceSelection>>>({});
  const submissionRevision = useRef(0);
  const [latestFeedback, setLatestFeedback] = useState<{ sentenceId: string; revision: number } | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!latestFeedback) return;
    feedbackRef.current?.focus();
  }, [latestFeedback]);

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
  const supportedCount = sentences.filter((sentence) => selectionIsSupported(sentence, effectiveSelections[sentence.id])).length;
  const categoryCounts = categoryOrder.map((category) => ({
    category,
    count: sentences.filter((sentence) => selectionIsSupported(sentence, effectiveSelections[sentence.id]) && effectiveSelections[sentence.id]?.categoryIds.includes(category)).length,
  }));
  const selectedEvidence = sentences.filter((sentence) => selectionIsSupported(sentence, effectiveSelections[sentence.id]));

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
    submissionRevision.current += 1;
    setLatestFeedback({ sentenceId: selection.sentenceId, revision: submissionRevision.current });
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

      <div className="evidence-board__status" aria-label="근거 보드 진행 안내">
        <span className="evidence-board__status-label">진행 안내</span>
        <strong>{supportedCount} / {sentences.length} 문장 분류</strong>
        <span>{pack.title}</span>
      </div>

      <section className="evidence-lens-rail" aria-labelledby="evidence-lens-summary-title">
        <h2 id="evidence-lens-summary-title" className="visually-hidden">두 렌즈 요약</h2>
        {pack.narrators.map((lens, index) => (
          <article className={`evidence-lens-card evidence-lens-card--${index === 0 ? 'teal' : 'orange'}`} key={lens.id}>
            <header className="evidence-lens-card__heading">
              <span className="evidence-lens-card__badge" aria-hidden="true">{index === 0 ? 'A' : 'B'}</span>
              <strong>렌즈 {index === 0 ? 'A' : 'B'}</strong>
              <span>{lens.displayName}의 글</span>
            </header>
            <div className="evidence-lens-card__sentences">
              {lens.sentences.slice(0, 3).map((sentence) => <p key={sentence.id}>{sentence.text}</p>)}
            </div>
            <p className="evidence-lens-card__meta">{lens.position} · {lens.interest}</p>
          </article>
        ))}
        <aside className="evidence-comparison-rail" aria-label="분류한 근거 요약">
          <span className="evidence-comparison-rail__arrow" aria-hidden="true">↔</span>
          <strong>비교 포인트</strong>
          <dl>
            {categoryCounts.map(({ category, count }) => (
              <div key={category}>
                <dt>{categoryLabels[category]}</dt>
                <dd>{count} / {sentences.length}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <div className="evidence-board__legend" aria-label="근거 분류 안내">
        <span className="evidence-progress" role="status" aria-live="polite">분류 완료 {supportedCount} / {sentences.length}</span>
        <span className="evidence-total" aria-hidden="true">10개 문장</span>
        <span>혼합 문장은 문장 부분을 모두 선택</span>
      </div>
      <section className="evidence-board__workspace" aria-labelledby="evidence-workspace-title">
        <header className="evidence-board__workspace-heading">
          <div>
            <h2 id="evidence-workspace-title">문장 카드</h2>
            <p>카드를 열어 근거 종류를 고르고, 표시한 문장은 아래 보드에 모입니다.</p>
          </div>
          <span className="evidence-board__selected-count">선택한 근거 <strong>{selectedEvidence.length}</strong> / {sentences.length}</span>
        </header>
        <div className="evidence-category-columns" aria-label="근거 종류별 모음">
          {categoryCounts.map(({ category, count }) => {
            const categorySentences = selectedEvidence.filter((sentence) => effectiveSelections[sentence.id]?.categoryIds.includes(category));
            return (
              <article className={`evidence-category-column evidence-category-column--${category}`} key={category}>
                <header>
                  <h3>{categoryLabels[category]}</h3>
                  <span>{count}</span>
                </header>
                {categorySentences.length > 0 ? (
                  <ul>
                    {categorySentences.slice(0, 3).map((sentence) => <li key={sentence.id}>{sentence.text}</li>)}
                  </ul>
                ) : <p>카드를 열어 이 칸에 모아 보세요.</p>}
              </article>
            );
          })}
        </div>
        <section className="evidence-tray" aria-labelledby="evidence-tray-title">
          <div className="evidence-tray__heading">
            <div>
              <h2 id="evidence-tray-title">근거 모음</h2>
              <p>분류한 문장을 다시 읽으며 다음 단계의 비교를 준비하세요.</p>
            </div>
            <span>{selectedEvidence.length}개 모음</span>
          </div>
          {selectedEvidence.length > 0 ? (
            <ul className="evidence-tray__list">
              {selectedEvidence.map((sentence) => (
                <li key={sentence.id}>
                  <span aria-hidden="true">{sentenceLens.get(sentence.id) ?? '?'}</span>
                  <p>{sentence.text}</p>
                </li>
              ))}
            </ul>
          ) : <p className="evidence-tray__empty">아직 모은 문장이 없어요. 문장 카드를 열어 분류해 보세요.</p>}
        </section>
        <ol className="evidence-list" aria-label="분류할 근거 문장">
          {sentences.map((sentence) => {
            const pressed = sentence.id === activeSentence?.id;
            const contextLabel = sentenceOwners.get(sentence.id);
            const saved = effectiveSelections[sentence.id];
            const savedFeedback: EvidenceFeedback | null = saved
              ? evaluateEvidenceSelection(sentence, saved)
              : null;
            const isLatestFeedback = latestFeedback?.sentenceId === sentence.id;
            return (
              <li className={`evidence-list__item${pressed ? ' is-active' : ''}`} key={sentence.id}>
                <SentenceCard sentence={sentence} mode="classify-evidence" pressed={pressed} onToggle={selectSentence} {...(contextLabel ? { contextLabel } : {})}>
                  {cardDetails(sentence)}
                </SentenceCard>
                {savedFeedback ? <FeedbackPanel ref={isLatestFeedback ? feedbackRef : undefined} feedback={savedFeedback} live={isLatestFeedback} /> : null}
              </li>
            );
          })}
        </ol>
      </section>

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
