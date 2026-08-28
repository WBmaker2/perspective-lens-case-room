import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../../content/cases/missingUmbrellaTag';
import { evaluateComparison } from '../../domain/evaluateComparison';
import type { ComparisonDraft } from '../../model/session';
import { CrossExamination } from './CrossExamination';

afterEach(cleanup);

const supportedDraft = (): ComparisonDraft => {
  const categories = ['shared-fact', 'different-expression', 'missing-information'] as const;
  const selected = categories.map((category) => missingUmbrellaTag.comparisonOptions.find((option) => option.validFor.includes(category))!);
  return {
    sharedFactOptionIds: [selected[0]!.id],
    differentExpressionOptionIds: [selected[1]!.id],
    missingInformationOptionIds: [selected[2]!.id],
    supportingSentenceIds: [...new Set(selected.flatMap((option) => option.evidenceSentenceIds))],
  };
};

const chooseSupportedComparison = async (user: ReturnType<typeof userEvent.setup>) => {
  const choices = [
    ['공통 사실', 'mut-comparison-umbrella'],
    ['다른 표현', 'mut-comparison-inference'],
    ['빠진 정보', 'mut-comparison-owner-blind-spot'],
  ] as const;
  for (const [group, optionId] of choices) {
    const fieldset = screen.getByRole('group', { name: group });
    await user.click(fieldset.querySelector<HTMLInputElement>(`[data-option-id="${optionId}"]`)!);
  }
  for (const checkbox of screen.getAllByRole('checkbox', { name: /근거 문장/ })) await user.click(checkbox);
};

describe('CrossExamination', () => {
  it('saves a fresh evidence-linked initial snapshot with one completion pulse', async () => {
    const user = userEvent.setup();
    const saved: ComparisonDraft[] = [];
    render(
      <CrossExamination
        pack={missingUmbrellaTag}
        phase="initial"
        initialDraft={null}
        revisedDraft={null}
        onSaveInitial={(draft) => saved.push(draft)}
        onReveal={() => undefined}
        onSaveRevision={() => undefined}
        onContinue={() => undefined}
        revealedRecordIds={[]}
        revisionEvidenceSentenceIds={[]}
      />,
    );

    expect(screen.queryByText(/파란 표찰은 걸이 아래로 떨어져 있었다/)).not.toBeInTheDocument();
    await chooseSupportedComparison(user);
    const complete = screen.getByRole('button', { name: '비교 완료' });
    expect(complete).toBeEnabled();
    expect(complete).toHaveClass('gi-pulse');
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByText('잘 연결했어요')).toBeInTheDocument();
    expect(screen.getByText(/가람 문장 1/)).toBeInTheDocument();
    expect(screen.queryByText(/근거 문장 ID|mut-a-1|missing-umbrella/)).not.toBeInTheDocument();

    await user.click(complete);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      sharedFactOptionIds: ['mut-comparison-umbrella'],
      differentExpressionOptionIds: ['mut-comparison-inference'],
      missingInformationOptionIds: ['mut-comparison-owner-blind-spot'],
      supportingSentenceIds: missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id)),
    });
    expect(evaluateComparison(missingUmbrellaTag, saved[0]!).status).toBe('supported');
  });

  it('passes a fresh snapshot with fresh nested arrays and leaves the source draft unchanged', async () => {
    const user = userEvent.setup();
    const source = supportedDraft();
    const saved: ComparisonDraft[] = [];
    render(
      <CrossExamination
        pack={missingUmbrellaTag}
        phase="initial"
        initialDraft={source}
        revisedDraft={null}
        onSaveInitial={(draft) => saved.push(draft)}
        onReveal={() => undefined}
        onSaveRevision={() => undefined}
        onContinue={() => undefined}
        revealedRecordIds={[]}
        revisionEvidenceSentenceIds={[]}
      />,
    );

    await user.click(screen.getByRole('button', { name: '비교 완료' }));

    const callbackDraft = saved[0]!;
    expect(callbackDraft).not.toBe(source);
    expect(callbackDraft.sharedFactOptionIds).not.toBe(source.sharedFactOptionIds);
    expect(callbackDraft.differentExpressionOptionIds).not.toBe(source.differentExpressionOptionIds);
    expect(callbackDraft.missingInformationOptionIds).not.toBe(source.missingInformationOptionIds);
    expect(callbackDraft.supportingSentenceIds).not.toBe(source.supportingSentenceIds);

    const mutableCallbackDraft = callbackDraft as unknown as { sharedFactOptionIds: string[]; supportingSentenceIds: string[] };
    mutableCallbackDraft.sharedFactOptionIds.push('mut-comparison-moved');
    mutableCallbackDraft.supportingSentenceIds.push('mut-a-5');
    expect(source.sharedFactOptionIds).toEqual(['mut-comparison-umbrella']);
    expect(source.supportingSentenceIds).not.toContain('mut-a-5');
  });

  it('hydrates a persisted revised comparison on first mount and keeps the initial thought read-only', () => {
    const initial = supportedDraft();
    const revised: ComparisonDraft = {
      ...initial,
      sharedFactOptionIds: ['mut-comparison-moved'],
      supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3'],
    };
    render(
      <CrossExamination
        pack={missingUmbrellaTag}
        phase="revised"
        initialDraft={initial}
        revisedDraft={revised}
        onSaveInitial={() => undefined}
        onReveal={() => undefined}
        onSaveRevision={() => undefined}
        onContinue={() => undefined}
        revealedRecordIds={['mut-r-2', 'mut-r-3', 'mut-r-4']}
        revisionEvidenceSentenceIds={['mut-a-4']}
      />,
    );

    expect(screen.getByRole('button', { name: '관점 전환 시작' })).toHaveClass('gi-pulse');
    expect(screen.queryByRole('button', { name: '수정 비교 완료' })).not.toBeInTheDocument();
    expect(screen.getByRole('group', { name: '공통 사실' }).querySelector<HTMLInputElement>('[data-option-id="mut-comparison-moved"]')).toBeChecked();
    expect(screen.getByRole('group', { name: '공통 사실' }).querySelector<HTMLInputElement>('[data-option-id="mut-comparison-umbrella"]')).not.toBeChecked();
    expect(screen.getByRole('heading', { name: '처음 생각' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '처음 생각' }).parentElement?.parentElement).toHaveTextContent('가람과 다온 모두 노란 우산을 보았다.');
  });

  it('does not reveal records or mark revision saved without reducer-backed IDs', () => {
    const revised: ComparisonDraft = {
      ...supportedDraft(),
      sharedFactOptionIds: ['mut-comparison-moved'],
      supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3'],
    };
    render(
      <CrossExamination
        pack={missingUmbrellaTag}
        phase="revised"
        initialDraft={supportedDraft()}
        revisedDraft={revised}
        onSaveInitial={() => undefined}
        onReveal={() => undefined}
        onSaveRevision={() => undefined}
        onContinue={() => undefined}
        revealedRecordIds={[]}
        revisionEvidenceSentenceIds={[]}
      />,
    );

    expect(screen.queryByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '관점 전환 시작' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '수정 비교 완료' })).toBeDisabled();
  });

  it('reveals ordered records, edits a cloned revision, and keeps the first thought unchanged', async () => {
    const user = userEvent.setup();
    const initial = supportedDraft();
    let phase: 'initial' | 'reveal' | 'revised' = 'reveal';
    let revised: ComparisonDraft | null = null;
    let revealedRecordIds: readonly string[] = [];
    let reasons: readonly string[] = [];
    let continued = false;
    const view = () => (
      <CrossExamination
        pack={missingUmbrellaTag}
        phase={phase}
        initialDraft={initial}
        revisedDraft={revised}
        revealedRecordIds={revealedRecordIds}
        revisionEvidenceSentenceIds={reasons}
        onSaveInitial={() => undefined}
        onReveal={(ids) => {
          revealedRecordIds = ids;
          phase = 'revised';
          rerender(view());
        }}
        onSaveRevision={(draft, sentenceIds) => {
          revised = draft;
          reasons = sentenceIds;
          rerender(view());
        }}
        onContinue={() => { continued = true; }}
      />
    );
    const { rerender } = render(view());

    expect(screen.getByRole('button', { name: '추가 기록 열기' })).toHaveClass('gi-pulse');
    expect(screen.queryByText(/파란 표찰은 걸이 아래로 떨어져 있었다/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '추가 기록 열기' }));
    expect(screen.getByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).toBeInTheDocument();
    const records = screen.getAllByRole('listitem', { name: /중립 기록/ });
    expect(records.map((item) => item.textContent)).toEqual([
      '02가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다.',
      '03다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다.',
      '04파란 표찰은 우산 걸이 아래로 떨어져 있었다.',
    ]);
    expect(screen.getByRole('status', { name: '추가 기록 안내' })).toHaveAttribute('aria-live', 'polite');

    const changed = missingUmbrellaTag.comparisonOptions.find((option) => option.id === 'mut-comparison-moved')!;
    const differentGroup = screen.getByRole('group', { name: '공통 사실' });
    await user.click(differentGroup.querySelector<HTMLInputElement>('[data-option-id="mut-comparison-umbrella"]')!);
    await user.click(differentGroup.querySelector<HTMLInputElement>(`[data-option-id="${changed.id}"]`)!);
    await user.click(screen.getByRole('checkbox', { name: /근거 문장 · 가람 문장 2/ }));
    await user.click(screen.getByRole('checkbox', { name: /근거 문장 · 다온 문장 4/ }));
    await user.click(screen.getByRole('checkbox', { name: /이유 문장 · 가람 문장 4/ }));
    expect(screen.getByRole('button', { name: '수정 비교 완료' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '수정 비교 완료' }));
    expect(revised).toEqual(expect.objectContaining({ sharedFactOptionIds: expect.any(Array) }));
    expect(screen.getByRole('heading', { name: '처음 생각' })).toBeInTheDocument();
    expect(screen.getAllByText('가람과 다온 모두 노란 우산을 보았다.')).toHaveLength(2);
    expect(screen.getByRole('button', { name: '관점 전환 시작' })).toHaveClass('gi-pulse');
    await user.click(screen.getByRole('button', { name: '관점 전환 시작' }));
    expect(continued).toBe(true);
  });
});
