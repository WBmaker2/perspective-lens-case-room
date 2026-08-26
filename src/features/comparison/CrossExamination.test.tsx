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
      />,
    );

    expect(screen.queryByText(/파란 표찰은 걸이 아래로 떨어져 있었다/)).not.toBeInTheDocument();
    await chooseSupportedComparison(user);
    const complete = screen.getByRole('button', { name: '비교 완료' });
    expect(complete).toBeEnabled();
    expect(complete).toHaveClass('gi-pulse');
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByText(/mut-a-1/)).toBeInTheDocument();

    await user.click(complete);
    expect(saved).toHaveLength(1);
    expect(saved[0]).toEqual({ ...supportedDraft(), supportingSentenceIds: missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences.map((sentence) => sentence.id)) });
    expect(saved[0]).not.toBe(supportedDraft());
    expect(evaluateComparison(missingUmbrellaTag, saved[0]!).status).toBe('supported');
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
    await user.click(screen.getByRole('checkbox', { name: /근거 문장.*mut-a-2/ }));
    await user.click(screen.getByRole('checkbox', { name: /근거 문장.*mut-b-4/ }));
    await user.click(screen.getByRole('checkbox', { name: /이유 문장.*mut-a-4/ }));
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
