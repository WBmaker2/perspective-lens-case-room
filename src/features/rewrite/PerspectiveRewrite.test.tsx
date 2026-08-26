import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { clubNoticePoster } from '../../content/cases/clubNoticePoster';
import { evaluateRewrite } from '../../domain/evaluateRewrite';
import type { CasePack } from '../../model/case';
import type { RewriteDraft } from '../../model/session';
import { PerspectiveRewrite } from './PerspectiveRewrite';

afterEach(cleanup);

const draftFor = (ruleIndex: number, blockIds: readonly string[]): RewriteDraft => {
  const rule = clubNoticePoster.rewriteRules[ruleIndex]!;
  return {
    targetNarratorId: rule.targetNarratorId,
    audienceId: rule.audienceId,
    purposeId: rule.purposeId,
    blockIds: [...blockIds],
  };
};

describe('PerspectiveRewrite', () => {
  it('builds blocks with keyboard controls and keeps one completion pulse for each accepted alternative', async () => {
    const user = userEvent.setup();
    let draft: RewriteDraft | null = null;
    let continued = false;
    const { rerender } = render(
      <PerspectiveRewrite
        pack={clubNoticePoster}
        draft={draft}
        onChange={(next) => { draft = next; }}
        onContinue={() => { continued = true; }}
      />,
    );

    const firstRule = clubNoticePoster.rewriteRules[0]!;
    await user.click(screen.getByRole('radio', { name: '나래' }));
    await user.click(screen.getByRole('radio', { name: '같은 반 친구' }));
    await user.click(screen.getByRole('radio', { name: '사실 보고' }));

    const available = screen.getByRole('list', { name: '사용 가능한 블록' });
    const dateItem = available.querySelector('[data-block-id="cnp-block-date-a"]');
    const placeItem = available.querySelector('[data-block-id="cnp-block-place-a"]');
    expect(dateItem).not.toBeNull();
    expect(placeItem).not.toBeNull();
    const dateAdd = within(dateItem as HTMLElement).getByRole('button', { name: '블록 넣기' });
    dateAdd.focus();
    await user.keyboard('{Enter}');
    await user.click(within(placeItem as HTMLElement).getByRole('button', { name: '블록 넣기' }));

    const assembled = screen.getByRole('list', { name: '조립한 블록' });
    expect(assembled.textContent).toMatch(/금요일/);
    const assembledPlace = assembled.querySelector('[data-block-id="cnp-block-place-a"]');
    expect(assembledPlace).not.toBeNull();
    await user.click(within(assembledPlace as HTMLElement).getByRole('button', { name: '위로 이동' }));
    expect([...assembled.querySelectorAll('li')].map((item) => item.getAttribute('data-block-id'))).toEqual([
      'cnp-block-place-a', 'cnp-block-date-a',
    ]);
    const movedPlace = assembled.querySelector('[data-block-id="cnp-block-place-a"]');
    expect(movedPlace).not.toBeNull();
    await user.click(within(movedPlace as HTMLElement).getByRole('button', { name: '블록 빼기' }));
    expect(assembled.querySelector('[data-block-id="cnp-block-place-a"]')).toBeNull();

    const missing = draftFor(0, ['cnp-block-date-a']);
    rerender(
      <PerspectiveRewrite key="missing" pack={clubNoticePoster} draft={missing} onChange={() => undefined} onContinue={() => undefined} />,
    );
    await waitFor(() => expect(screen.getByRole('button', { name: '관점 전환 완료' })).not.toHaveClass('gi-pulse'));
    expect(screen.getByRole('button', { name: '관점 전환 완료' })).toBeDisabled();

    for (const [ruleIndex, rule] of clubNoticePoster.rewriteRules.entries()) {
      for (const blockIds of rule.acceptedExampleBlockSets) {
        const accepted = draftFor(ruleIndex, blockIds);
        rerender(
          <PerspectiveRewrite key={`${ruleIndex}-${blockIds.join('-')}`} pack={clubNoticePoster} draft={accepted} onChange={() => undefined} onContinue={() => { continued = true; }} />,
        );
        await waitFor(() => expect(screen.getByRole('button', { name: '관점 전환 완료' })).toHaveClass('gi-pulse'));
        const complete = screen.getByRole('button', { name: '관점 전환 완료' });
        expect(complete).toBeEnabled();
        expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
        expect(evaluateRewrite(clubNoticePoster, accepted).status).toBe('supported');
        await user.click(complete);
      }
    }
    expect(continued).toBe(true);

    const contradictoryPack: CasePack = {
      ...clubNoticePoster,
      rewriteRules: [{ ...firstRule, contradictoryBlockIds: ['cnp-block-place-a'] }, clubNoticePoster.rewriteRules[1]!],
    };
    rerender(
      <PerspectiveRewrite key="contradictory" pack={contradictoryPack} draft={draftFor(0, ['cnp-block-date-a', 'cnp-block-place-a'])} onChange={() => undefined} onContinue={() => undefined} />,
    );
    await waitFor(() => expect(screen.getByRole('button', { name: '관점 전환 완료' })).not.toHaveClass('gi-pulse'));
    expect(screen.getByText(/모순된 블록/)).toBeInTheDocument();
    expect(document.querySelectorAll('[draggable="true"]')).toHaveLength(0);
  });

  it('names the four evaluator-derived feedback rows without score-like language', () => {
    render(
      <PerspectiveRewrite
        pack={clubNoticePoster}
        draft={draftFor(0, ['cnp-block-date-a'])}
        onChange={() => undefined}
        onContinue={() => undefined}
      />,
    );

    expect(screen.getByText('보존한 사실')).toBeInTheDocument();
    expect(screen.getByText('빠진 사실 묶음')).toBeInTheDocument();
    expect(screen.getByText('맞은 관점 표지')).toBeInTheDocument();
    expect(screen.getByText('모순된 블록')).toBeInTheDocument();
    expect(screen.queryByText(/점수|순위|승자|정답률/)).not.toBeInTheDocument();
  });
});
