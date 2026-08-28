import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { playgroundStorageBox } from '../../content/cases/playgroundStorageBox';
import { LensReader } from './LensReader';

describe('LensReader', () => {
  it('keeps both narratives, mobile tab semantics, and the fixed difference summary', async () => {
    const user = userEvent.setup();
    let readNarratorIds: string[] = [];
    let markedSentenceIds: string[] = [];
    const view = () => (
      <LensReader
        pack={playgroundStorageBox}
        readNarratorIds={readNarratorIds}
        markedSentenceIds={markedSentenceIds}
        onMarkRead={(narratorId) => { readNarratorIds = [...new Set([...readNarratorIds, narratorId])]; }}
        onToggleImportantSentence={(sentenceId) => { markedSentenceIds = [...new Set([...markedSentenceIds, sentenceId])]; }}
        onContinue={() => undefined}
      />
    );
    const { rerender } = render(view());

    playgroundStorageBox.narrators.forEach((narrator) => {
      expect(screen.getByText(narrator.displayName, { exact: true })).toBeInTheDocument();
      expect(screen.getByText(narrator.roleLabel, { exact: true })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: new RegExp(narrator.displayName) })).toBeInTheDocument();
    });
    expect(document.querySelectorAll('[data-border-style]')).toHaveLength(2);
    expect(new Set([...document.querySelectorAll<HTMLElement>('[data-border-style]')].map((node) => node.dataset.borderStyle)).size).toBe(2);
    expect(document.querySelectorAll('ol')).toHaveLength(2);
    expect([...document.querySelectorAll('ol')].every((list) => list.querySelectorAll('li').length === 5)).toBe(true);
    expect(screen.getByRole('tablist', { name: '렌즈 선택' })).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    const panels = screen.getAllByRole('tabpanel');
    expect(panels).toHaveLength(2);
    panels.forEach((panel, index) => expect(panel).toHaveAttribute('aria-labelledby', tabs[index]!.id));
    const summary = screen.getByRole('region', { name: '차이 요약' });
    expect(within(summary).getByText(/위치/)).toBeInTheDocument();
    expect(within(summary).getByText(/관심/)).toBeInTheDocument();
    expect(within(summary).getByText(/목적/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '중요 문장 표시' })).toHaveLength(10);
    expect(screen.getAllByRole('button', { name: '읽음 표시' })).toHaveLength(2);
    expect(screen.getByRole('button', { name: '근거 보드로 이동' })).toBeDisabled();
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(0);

    await user.click(screen.getAllByRole('button', { name: '읽음 표시' })[0]!);
    await user.click(screen.getAllByRole('button', { name: '읽음 표시' })[1]!);
    await user.click(screen.getAllByRole('button', { name: '중요 문장 표시' })[0]!);
    await user.click(screen.getAllByRole('button', { name: '중요 문장 표시' })[5]!);
    rerender(view());

    expect(screen.getAllByRole('button', { name: '읽음 취소' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: '중요 표시 취소' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: '중요 표시 취소' })[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('button', { name: '중요 표시 취소' })[1]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('button', { name: '중요 문장 표시' })).toHaveLength(8);
    expect(screen.getByRole('button', { name: '근거 보드로 이동' })).toBeEnabled();
    expect(document.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByRole('button', { name: '근거 보드로 이동' })).toHaveClass('gi-pulse');

    await user.click(tabs[0]!);
    expect(tabs[0]).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveFocus();
  });
});
