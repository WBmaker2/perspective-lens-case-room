import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { CasePack, RewriteRuleSet } from '../../model/case';
import type { RewriteFeedback } from '../../model/feedback';
import type { RewriteDraft } from '../../model/session';
import { evaluateRewrite } from '../../domain/evaluateRewrite';
import { StageActionButton } from '../../components/StageActionButton';
import { factReference, perspectiveTagLabels, rewriteBlockReference } from '../../content/learnerLabels';

export interface PerspectiveRewriteProps {
  pack: CasePack;
  draft: RewriteDraft | null;
  onChange: (draft: RewriteDraft) => void;
  onContinue: () => void;
}

interface LocalRewriteDraft {
  targetNarratorId: string;
  audienceId: string;
  purposeId: string;
  blockIds: string[];
}

type RewriteOperation = 'add' | 'move-up' | 'move-down' | 'remove';

interface FocusTarget {
  action: RewriteOperation;
  blockId: string;
}

const audienceLabels: Readonly<Record<RewriteRuleSet['audienceId'], string>> = {
  classmate: '같은 반 친구',
  'new-reader': '처음 보는 독자',
  teacher: '선생님',
};

const purposeLabels: Readonly<Record<RewriteRuleSet['purposeId'], string>> = {
  report: '사실 보고',
  guide: '읽기 안내',
  reflection: '생각 돌아보기',
};

const incompleteFeedback: RewriteFeedback = {
  status: 'revise',
  preservedFactIds: [],
  missingFactGroupIndexes: [],
  contradictoryBlockIds: [],
  matchedPerspectiveTags: [],
  message: '대상, 독자, 목적을 고르고 문장 블록을 조립해 보세요.',
};

const unique = <T,>(values: readonly T[]): T[] => [...new Set(values)];

const initialLocalDraft = (draft: RewriteDraft | null): LocalRewriteDraft => ({
  targetNarratorId: draft?.targetNarratorId ?? '',
  audienceId: draft?.audienceId ?? '',
  purposeId: draft?.purposeId ?? '',
  blockIds: draft?.blockIds ? [...draft.blockIds] : [],
});

const isComplete = (value: LocalRewriteDraft): boolean => (
  value.targetNarratorId.trim().length > 0 && value.audienceId.trim().length > 0 && value.purposeId.trim().length > 0
);

const toDraft = (value: LocalRewriteDraft): RewriteDraft => ({
  targetNarratorId: value.targetNarratorId,
  audienceId: value.audienceId as RewriteDraft['audienceId'],
  purposeId: value.purposeId as RewriteDraft['purposeId'],
  blockIds: [...value.blockIds],
});

const activateWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  action();
};

const controlId = (action: RewriteOperation, blockId: string): string => `rewrite-${action}-${blockId}`;

function FeedbackRows({ pack, feedback }: { pack: CasePack; feedback: RewriteFeedback }) {
  const row = (label: string, values: readonly string[], empty: string) => (
    <div className="rewrite-feedback__row" data-feedback-label={label}>
      <dt>{label}</dt>
      <dd>{values.length > 0 ? values.join(', ') : empty}</dd>
    </div>
  );

  return (
    <section className={`rewrite-feedback rewrite-feedback--${feedback.status}`} aria-labelledby="rewrite-feedback-title">
      <h2 id="rewrite-feedback-title">다시 쓰기 확인</h2>
      <p className="rewrite-feedback__message" role="status">{feedback.message}</p>
      <dl className="rewrite-feedback__rows">
        {row('보존한 사실', feedback.preservedFactIds.map((factId) => factReference(pack, factId)), '아직 선택하지 않았어요.')}
        {row('빠진 사실 묶음', feedback.missingFactGroupIndexes.map((index) => `필요한 묶음 ${index + 1}`), '빠진 묶음이 없어요.')}
        {row('맞은 관점 표지', feedback.matchedPerspectiveTags.map((tag) => perspectiveTagLabels[tag] ?? '기록된 관점'), '아직 맞은 표지가 없어요.')}
        {row('모순된 블록', feedback.contradictoryBlockIds.map((blockId) => rewriteBlockReference(pack, blockId)), '모순된 블록이 없어요.')}
      </dl>
    </section>
  );
}

export function PerspectiveRewrite({ pack, draft, onChange, onContinue }: PerspectiveRewriteProps) {
  const [local, setLocal] = useState<LocalRewriteDraft>(() => initialLocalDraft(draft));
  const focusTarget = useRef<FocusTarget | null>(null);

  useLayoutEffect(() => {
    const requestedTarget = focusTarget.current;
    if (!requestedTarget) return;
    const target = document.getElementById(controlId(requestedTarget.action, requestedTarget.blockId));
    if (target instanceof HTMLButtonElement && !target.disabled) {
      target.focus({ preventScroll: true });
    } else {
      // A missing/disabled operation should never strand keyboard focus on body.
      document.querySelector<HTMLButtonElement>('.rewrite-operation:not(:disabled)')?.focus({ preventScroll: true });
    }
    focusTarget.current = null;
  }, [local.blockIds]);

  const update = (next: LocalRewriteDraft, nextFocusTarget: FocusTarget | null = null) => {
    setLocal(next);
    if (isComplete(next)) onChange(toDraft(next));
    focusTarget.current = nextFocusTarget;
  };

  const changeSelection = (key: 'targetNarratorId' | 'audienceId' | 'purposeId', value: string) => {
    update({ ...local, [key]: value, blockIds: [...local.blockIds] });
  };

  const addBlock = (blockId: string) => {
    if (local.blockIds.includes(blockId)) return;
    update(
      { ...local, blockIds: [...local.blockIds, blockId] },
      { action: 'remove', blockId },
    );
  };

  const removeBlock = (index: number) => {
    const blockId = local.blockIds[index];
    if (!blockId) return;
    update(
      { ...local, blockIds: local.blockIds.filter((_, itemIndex) => itemIndex !== index) },
      { action: 'add', blockId },
    );
  };

  const moveBlock = (index: number, offset: -1 | 1) => {
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= local.blockIds.length) return;
    const blockIds = [...local.blockIds];
    const [moved] = blockIds.splice(index, 1);
    if (moved) blockIds.splice(nextIndex, 0, moved);
    if (moved) {
      update(
        { ...local, blockIds },
        { action: offset === -1 ? 'move-down' : 'move-up', blockId: moved },
      );
    }
  };

  const availableAudiences = unique(pack.rewriteRules.map((rule) => rule.audienceId));
  const availablePurposes = unique(pack.rewriteRules.map((rule) => rule.purposeId));
  const completeDraft = isComplete(local) ? toDraft(local) : null;
  const feedback = completeDraft ? evaluateRewrite(pack, completeDraft) : incompleteFeedback;
  const blocksById = new Map(pack.rewriteBlocks.map((block) => [block.id, block]));
  const assembledEntries = local.blockIds
    .map((id, index) => ({ block: blocksById.get(id), index }))
    .filter((entry): entry is { block: (typeof pack.rewriteBlocks)[number]; index: number } => entry.block !== undefined);

  return (
    <section className="stage-content rewrite-stage" aria-labelledby="rewrite-title">
      <div className="stage-heading-block">
        <p className="eyebrow">PERSPECTIVE REWRITE</p>
        <h1 id="rewrite-title" data-stage-heading tabIndex={-1}>관점 전환</h1>
        <p className="lead">같은 사건의 사실을 지키면서, 다른 사람에게 맞는 순서와 표현으로 다시 조립해 보세요.</p>
      </div>

      <div className="rewrite-choices">
        <fieldset className="rewrite-choice-group">
          <legend>대상 인물</legend>
          <div className="rewrite-choice-list">
            {pack.narrators.map((narrator) => (
              <label className="rewrite-choice" key={narrator.id}>
                <input
                  type="radio"
                  aria-label={narrator.displayName}
                  name="rewrite-target"
                  value={narrator.id}
                  checked={local.targetNarratorId === narrator.id}
                  onChange={() => changeSelection('targetNarratorId', narrator.id)}
                />
                <span><strong>{narrator.displayName}</strong><small>{narrator.roleLabel}</small></span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="rewrite-choice-group">
          <legend>독자</legend>
          <div className="rewrite-choice-list">
            {availableAudiences.map((audience) => (
              <label className="rewrite-choice" key={audience}>
                <input
                  type="radio"
                  name="rewrite-audience"
                  value={audience}
                  checked={local.audienceId === audience}
                  onChange={() => changeSelection('audienceId', audience)}
                />
                <span>{audienceLabels[audience]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="rewrite-choice-group">
          <legend>목적</legend>
          <div className="rewrite-choice-list">
            {availablePurposes.map((purpose) => (
              <label className="rewrite-choice" key={purpose}>
                <input
                  type="radio"
                  name="rewrite-purpose"
                  value={purpose}
                  checked={local.purposeId === purpose}
                  onChange={() => changeSelection('purposeId', purpose)}
                />
                <span>{purposeLabels[purpose]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="rewrite-block-workspace">
        <section className="rewrite-block-panel" aria-labelledby="available-blocks-title">
          <h2 id="available-blocks-title">사용할 수 있는 문장 블록</h2>
          <ul className="rewrite-block-list" aria-label="사용 가능한 블록">
            {pack.rewriteBlocks.map((block) => (
              <li className="rewrite-block" key={block.id} data-block-id={block.id}>
                <span className="rewrite-block__text">{block.text}</span>
                <button
                  className="rewrite-operation"
                  id={controlId('add', block.id)}
                  data-rewrite-action="add"
                  data-block-id={block.id}
                  type="button"
                  aria-label={`블록 넣기: ${block.text}`}
                  onKeyDown={(event) => activateWithKeyboard(event, () => addBlock(block.id))}
                  onClick={() => addBlock(block.id)}
                  disabled={local.blockIds.includes(block.id)}
                >
                  블록 넣기
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rewrite-block-panel" aria-labelledby="assembled-blocks-title">
          <h2 id="assembled-blocks-title">내가 조립한 문장</h2>
          <ol className="rewrite-block-list rewrite-block-list--assembled" aria-label="조립한 블록">
            {assembledEntries.map(({ block, index }, displayIndex) => (
              <li className="rewrite-block" key={block.id} data-block-id={block.id}>
                <span className="rewrite-block__order" aria-hidden="true">{displayIndex + 1}</span>
                <span className="rewrite-block__text">{block.text}</span>
                <div className="rewrite-block__actions">
                  <button
                    className="rewrite-operation"
                    id={controlId('move-up', block.id)}
                    data-rewrite-action="move-up"
                    data-block-id={block.id}
                    type="button"
                    aria-label={`위로 이동: ${block.text}`}
                    onKeyDown={(event) => activateWithKeyboard(event, () => moveBlock(index, -1))}
                    onClick={() => moveBlock(index, -1)}
                    disabled={displayIndex === 0}
                  >
                    위로 이동
                  </button>
                  <button
                    className="rewrite-operation"
                    id={controlId('move-down', block.id)}
                    data-rewrite-action="move-down"
                    data-block-id={block.id}
                    type="button"
                    aria-label={`아래로 이동: ${block.text}`}
                    onKeyDown={(event) => activateWithKeyboard(event, () => moveBlock(index, 1))}
                    onClick={() => moveBlock(index, 1)}
                    disabled={displayIndex === assembledEntries.length - 1}
                  >
                    아래로 이동
                  </button>
                  <button
                    className="rewrite-operation"
                    id={controlId('remove', block.id)}
                    data-rewrite-action="remove"
                    data-block-id={block.id}
                    type="button"
                    aria-label={`블록 빼기: ${block.text}`}
                    onKeyDown={(event) => activateWithKeyboard(event, () => removeBlock(index))}
                    onClick={() => removeBlock(index)}
                  >
                    블록 빼기
                  </button>
                </div>
              </li>
            ))}
          </ol>
          {assembledEntries.length === 0 ? <p className="muted">아래 목록에서 블록을 넣으면 여기에 순서대로 놓여요.</p> : null}
        </section>
      </div>

      <FeedbackRows pack={pack} feedback={feedback} />
      <div className="stage-action-row rewrite-actions">
        <StageActionButton
          disabled={feedback.status !== 'supported'}
          isCurrentRequired={feedback.status === 'supported'}
          guidanceText="필요한 사실과 관점이 모두 맞아요. 다음 단계로 가세요."
          onClick={onContinue}
        >
          관점 전환 완료
        </StageActionButton>
      </div>
      {feedback.status !== 'supported' ? <p className="gate-hint">필요한 사실을 모두 보존하고 모순 없는 블록을 골라야 완료할 수 있어요.</p> : null}
    </section>
  );
}
