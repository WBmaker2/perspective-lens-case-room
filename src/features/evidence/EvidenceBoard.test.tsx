import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { playgroundStorageBox } from '../../content/cases/playgroundStorageBox';
import type { EvidenceSelection } from '../../model/session';
import { EvidenceBoard } from './EvidenceBoard';

describe('EvidenceBoard', () => {
  it('supports keyboard classification, mixed segments, numbered feedback, and the ten-sentence gate', async () => {
    const user = userEvent.setup();
    let selections: Record<string, EvidenceSelection> = {};
    let continued = false;
    const view = () => (
      <EvidenceBoard
        pack={playgroundStorageBox}
        selections={selections}
        onRecord={(selection) => { selections = { ...selections, [selection.sentenceId]: selection }; }}
        onContinue={() => { continued = true; }}
      />
    );
    const { rerender } = render(view());

    expect(screen.getByRole('heading', { name: '근거 보드' })).toBeInTheDocument();
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);
    const firstSentence = screen.getAllByRole('button', { name: /문장 1/ })[0]!;
    firstSentence.focus();
    await user.keyboard('{Enter}');
    rerender(view());
    await user.click(screen.getByRole('button', { name: '관찰 사실' }));
    expect(screen.getByRole('button', { name: '근거 표시하기' })).toHaveClass('gi-pulse');
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));
    rerender(view());
    expect(screen.getByRole('status')).toHaveTextContent('1번 문장');

    const mixed = playgroundStorageBox.narrators[0].sentences[1]!;
    const mixedButton = screen.getAllByRole('button', { name: new RegExp(`문장 ${mixed.number}`) })[0]!;
    await user.click(mixedButton);
    rerender(view());
    const mixedGroup = screen.getAllByRole('group', { name: `문장 ${mixed.number}` })[0]!;
    const mixedCheckboxes = within(mixedGroup).getAllByRole('checkbox');
    expect(mixedCheckboxes).toHaveLength(mixed.segments.length);
    expect(screen.getByRole('button', { name: '근거 표시하기' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: '인물의 추론' }));
    await user.click(screen.getByRole('button', { name: '관찰 사실' }));
    await user.click(mixedCheckboxes[0]!);
    await user.click(mixedCheckboxes[1]!);
    expect(screen.getByRole('button', { name: '근거 표시하기' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));
    rerender(view());
    expect(screen.getByRole('status')).toHaveTextContent(`${mixed.number}번 문장`);

    const allSentences = playgroundStorageBox.narrators.flatMap((narrator) => narrator.sentences);
    allSentences.slice(2).forEach((sentence) => {
      selections[sentence.id] = {
        sentenceId: sentence.id,
        categoryIds: [...sentence.acceptedCategorySets[0]!],
        selectedSegmentIds: sentence.segments.map((segment) => segment.id),
      };
    });
    rerender(view());
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '교차 조사 시작' }));
    expect(continued).toBe(true);
  });
});
