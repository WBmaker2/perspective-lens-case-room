import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { playgroundStorageBox } from '../../content/cases/playgroundStorageBox';
import { createPrintViewModel } from '../../content/teacherGuide';
import { TeacherGuide } from './TeacherGuide';

const printCss = readFileSync(resolve(process.cwd(), 'src/styles/print.css'), 'utf8');

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TeacherGuide', () => {
  it('shows all six sections safety-first and prints exactly once per activation', async () => {
    const user = userEvent.setup();
    const triggerRef = { current: null };
    const onClose = vi.fn();
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    const viewModel = createPrintViewModel(playgroundStorageBox, null);
    render(<TeacherGuide open triggerRef={triggerRef} onClose={onClose} viewModel={viewModel} />);

    const dialog = screen.getByRole('dialog', { name: '교사용 활동 요약' });
    const sections = within(dialog).getAllByRole('region');
    expect(sections.map((section) => section.getAttribute('data-guide-section'))).toEqual([
      'safety', 'overview', 'goals', 'flow', 'cases', 'rubric',
    ]);
    expect(within(dialog).getByText('모든 사건과 인물은 가상의 이야기와 인물입니다.')).toBeInTheDocument();
    expect(within(dialog).getByRole('button', { name: '인쇄하기' })).toHaveClass('teacher-guide__print-button');

    await user.click(within(dialog).getByRole('button', { name: '인쇄하기' }));
    expect(print).toHaveBeenCalledTimes(1);
  });

  it('renders selected-case material with visible narrator names, numbers, and complete text', () => {
    const viewModel = createPrintViewModel(playgroundStorageBox, null);
    render(<TeacherGuide open triggerRef={{ current: null }} onClose={vi.fn()} viewModel={viewModel} />);

    const printRegion = document.querySelector<HTMLElement>('[data-print-region]');
    expect(printRegion).not.toBeNull();
    expect(printRegion).toHaveTextContent(playgroundStorageBox.title);
    for (const narrator of playgroundStorageBox.narrators) {
      expect(printRegion).toHaveTextContent(narrator.displayName);
      for (const sentence of narrator.sentences) {
        expect(printRegion).toHaveTextContent(`문장 ${sentence.number}`);
        expect(printRegion).toHaveTextContent(sentence.text);
      }
    }
    expect(printRegion).not.toHaveTextContent('개인 메모');
  });

  it('keeps the print region fixed-content-only when no case is selected', () => {
    const viewModel = createPrintViewModel(null, null);
    render(<TeacherGuide open triggerRef={{ current: null }} onClose={vi.fn()} viewModel={viewModel} />);

    const printRegion = document.querySelector<HTMLElement>('[data-print-region]');
    expect(printRegion).not.toBeNull();
    expect(printRegion).toHaveTextContent('교사용 활동 요약');
    expect(printRegion).toHaveTextContent('안전·개인정보 약속');
    expect(printRegion).not.toHaveAttribute('data-print-report');
  });

  it('keeps the print stylesheet contract explicit and mutation-sensitive', () => {
    expect(printCss).toMatch(/@page\s*\{[\s\S]*size:\s*A4 portrait;[\s\S]*margin:\s*12mm;[\s\S]*\}/);
    expect(printCss).toMatch(/@media\s+print\s*\{/);
    expect(printCss).toMatch(/\[data-print-region\]\s*\{[\s\S]*display:\s*block\s*!important;[\s\S]*\}/);
    expect(printCss).toMatch(/\.app-header[\s\S]*\.app-shell__orientation[\s\S]*\.progress[\s\S]*\.utility-group/);
    expect(printCss).toMatch(/\[role="tablist"\]/);
    expect(printCss).toMatch(/\[role="tab"\]/);
    expect(printCss).toMatch(/\.modal-dialog-backdrop/);
    expect(printCss).toMatch(/button,\s*\.action-guidance,\s*\.gi-pulse/);
    expect(printCss).toMatch(/html,[\s\S]*body\s*\{[\s\S]*background:\s*#fff\s*!important;[\s\S]*color:\s*#111\s*!important;/);
    expect(printCss).toMatch(/\[data-print-region\]\s+\*\s*\{[\s\S]*color:\s*#111\s*!important;[\s\S]*background:\s*#fff\s*!important;/);
    expect(printCss).toMatch(/break-inside:\s*avoid;[\s\S]*page-break-inside:\s*avoid;/);
  });
});
