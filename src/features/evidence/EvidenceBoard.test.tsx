import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { playgroundStorageBox } from '../../content/cases/playgroundStorageBox';
import type { EvidenceSelection } from '../../model/session';
import { EvidenceBoard } from './EvidenceBoard';

afterEach(cleanup);

const sentenceElement = (sentenceId: string): HTMLElement => {
  const element = document.querySelector<HTMLElement>(`[data-sentence-id="${sentenceId}"]`);
  if (!element) throw new Error(`문장 카드를 찾지 못했습니다: ${sentenceId}`);
  return element;
};

const categoryLabels = { observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현' } as const;
const categoryOrder = ['observation', 'inference', 'evaluation'] as const;

const submitSupportedSentence = async (user: ReturnType<typeof userEvent.setup>, sentence: typeof playgroundStorageBox.narrators[number]['sentences'][number]) => {
  const card = within(sentenceElement(sentence.id));
  await user.click(card.getByRole('button', { name: new RegExp(`문장 ${sentence.number}`) }));
  for (const category of categoryOrder.filter((item) => sentence.acceptedCategorySets[0]!.includes(item))) {
    await user.click(screen.getByRole('button', { name: categoryLabels[category] }));
  }
  if (sentence.kind === 'mixed') {
    for (const checkbox of within(sentenceElement(sentence.id)).getAllByRole('checkbox')) await user.click(checkbox);
  }
  await user.click(screen.getByRole('button', { name: '근거 표시하기' }));
};

describe('EvidenceBoard', () => {
  it('shows the two-lens rail, live category counts, and an empty evidence tray before classification', () => {
    render(
      <EvidenceBoard
        pack={playgroundStorageBox}
        selections={{}}
        onRecord={() => undefined}
        onContinue={() => undefined}
      />,
    );

    expect(screen.getByRole('region', { name: '두 렌즈 요약' })).toBeInTheDocument();
    for (const lens of playgroundStorageBox.narrators) expect(screen.getByText(`${lens.displayName}의 글`)).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: '분류한 근거 요약' })).toHaveTextContent(/관찰 사실\s*0 \/ 10/);
    expect(screen.getByRole('heading', { name: '문장 카드' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '근거 모음' })).toBeInTheDocument();
    expect(screen.getByText('아직 모은 문장이 없어요. 문장 카드를 열어 분류해 보세요.')).toBeInTheDocument();
  });

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
    const initialProgress = screen.getByText('분류 완료 0 / 10');
    expect(initialProgress).toBeInTheDocument();
    expect(initialProgress).toHaveAttribute('aria-live', 'polite');
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);
    const firstSentence = screen.getAllByRole('button', { name: /문장 1/ })[0]!;
    firstSentence.focus();
    await user.keyboard('{Enter}');
    rerender(view());
    await user.click(screen.getByRole('button', { name: '관찰 사실' }));
    expect(screen.getByRole('button', { name: '근거 표시하기' })).toHaveClass('gi-pulse');
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));
    rerender(view());
    const updatedProgress = screen.getByText('분류 완료 1 / 10');
    expect(updatedProgress).toBeInTheDocument();
    expect(updatedProgress).toHaveAttribute('aria-live', 'polite');
    expect(document.querySelector('[role="status"][data-feedback-sentence]')).toHaveTextContent('1번 문장');

    const mixed = playgroundStorageBox.narrators[0].sentences[1]!;
    const mixedButton = screen.getAllByRole('button', { name: new RegExp(`문장 ${mixed.number}`) })[0]!;
    await user.click(mixedButton);
    rerender(view());
    const mixedGroup = screen.getByRole('group', { name: `해솔 문장 ${mixed.number}` });
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
    expect(document.querySelector('[role="status"][data-feedback-sentence]')).toHaveTextContent(`${mixed.number}번 문장`);

    const allSentences = playgroundStorageBox.narrators.flatMap((narrator) => narrator.sentences);
    for (const sentence of allSentences.slice(2)) await submitSupportedSentence(user, sentence);
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toHaveClass('gi-pulse');
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '교차 조사 시작' }));
    expect(continued).toBe(true);
  });

  it('returns focus to updated feedback for repeated submissions of the same sentence', async () => {
    const user = userEvent.setup();
    const recorded: EvidenceSelection[] = [];
    render(
      <EvidenceBoard
        pack={playgroundStorageBox}
        selections={{}}
        onRecord={(selection) => recorded.push(selection)}
        onContinue={() => undefined}
      />,
    );

    const firstSentence = playgroundStorageBox.narrators[0].sentences[0]!;
    const card = within(sentenceElement(firstSentence.id));
    await user.click(card.getByRole('button', { name: /문장 1/ }));
    await user.click(screen.getByRole('button', { name: '인물의 추론' }));
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));

    const firstFeedback = document.querySelector<HTMLElement>('[role="status"][data-feedback-sentence]');
    expect(firstFeedback).not.toBeNull();
    expect(firstFeedback).toHaveTextContent(`${firstSentence.number}번 문장: ${firstSentence.feedback.revise}`);
    expect(firstFeedback).toHaveFocus();

    await user.click(screen.getByRole('button', { name: '인물의 추론' }));
    await user.click(screen.getByRole('button', { name: '관찰 사실' }));
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));

    const secondFeedback = document.querySelector<HTMLElement>('[role="status"][data-feedback-sentence]');
    expect(secondFeedback).not.toBeNull();
    expect(secondFeedback).toHaveTextContent(`${firstSentence.number}번 문장: ${firstSentence.feedback.supported}`);
    expect(secondFeedback).toHaveFocus();
    expect(recorded).toHaveLength(2);
  });

  it('derives numbered feedback and status from persisted selections after remount', () => {
    const sentence = playgroundStorageBox.narrators[0].sentences[0]!;
    const selections: Record<string, EvidenceSelection> = {
      [sentence.id]: {
        sentenceId: sentence.id,
        categoryIds: ['observation'],
        selectedSegmentIds: sentence.segments.map((segment) => segment.id),
      },
    };
    const view = () => (
      <EvidenceBoard pack={playgroundStorageBox} selections={selections} onRecord={() => undefined} onContinue={() => undefined} />
    );
    const { unmount } = render(view());

    const persistedFeedback = document.querySelector<HTMLElement>(`[data-feedback-sentence="${sentence.number}"]`);
    expect(persistedFeedback).not.toBeNull();
    expect(persistedFeedback).toHaveTextContent(`${sentence.number}번 문장: ${sentence.feedback.supported}`);
    expect(persistedFeedback).toHaveClass('feedback-panel--supported');
    expect(screen.queryByText('분류가 저장되었습니다.')).not.toBeInTheDocument();

    unmount();
    render(view());
    const remountedFeedback = document.querySelector<HTMLElement>(`[data-feedback-sentence="${sentence.number}"]`);
    expect(remountedFeedback).not.toBeNull();
    expect(remountedFeedback).toHaveTextContent(`${sentence.number}번 문장: ${sentence.feedback.supported}`);
    expect(remountedFeedback).toHaveAttribute('data-feedback-sentence', String(sentence.number));
  });

  it('records all ten normalized selections through the UI and opens the gate only at ten', async () => {
    const user = userEvent.setup();
    const recorded: EvidenceSelection[] = [];
    let continued = false;
    render(
      <EvidenceBoard
        pack={playgroundStorageBox}
        selections={{}}
        onRecord={(selection) => recorded.push(selection)}
        onContinue={() => { continued = true; }}
      />,
    );

    const allSentences = playgroundStorageBox.narrators.flatMap((narrator) => narrator.sentences);
    for (const sentence of allSentences.slice(0, 9)) await submitSupportedSentence(user, sentence);

    expect(recorded).toHaveLength(9);
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toBeDisabled();
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);
    for (const [index, selection] of recorded.entries()) {
      const sentence = allSentences[index]!;
      expect(selection).toEqual({
        sentenceId: sentence.id,
        categoryIds: categoryOrder.filter((category) => sentence.acceptedCategorySets[0]!.includes(category)),
        selectedSegmentIds: sentence.segments.map((segment) => segment.id),
      });
    }

    await submitSupportedSentence(user, allSentences[9]!);
    expect(recorded).toHaveLength(10);
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toBeEnabled();
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByRole('button', { name: '교차 조사 시작' })).toHaveClass('gi-pulse');
    expect(document.querySelector('[role="status"][data-feedback-sentence]')).toHaveFocus();
    await user.click(screen.getByRole('button', { name: '교차 조사 시작' }));
    expect(continued).toBe(true);
  });
});
