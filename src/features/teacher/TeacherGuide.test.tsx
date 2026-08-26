import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { playgroundStorageBox } from '../../content/cases/playgroundStorageBox';
import { createPrintViewModel } from '../../content/teacherGuide';
import { TeacherGuide } from './TeacherGuide';

const printCss = readFileSync(resolve(process.cwd(), 'src/styles/print.css'), 'utf8');

interface CssRule {
  selectors: string[];
  declarations: string;
}

function findClosingBrace(css: string, openingBrace: number) {
  let depth = 1;
  for (let index = openingBrace + 1; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') depth -= 1;
    if (depth === 0) return index;
  }
  return css.length;
}

function parseCssRules(css: string): CssRule[] {
  const rules: CssRule[] = [];
  let cursor = 0;
  while (cursor < css.length) {
    const openingBrace = css.indexOf('{', cursor);
    if (openingBrace === -1) break;
    const prelude = css.slice(cursor, openingBrace).trim();
    const closingBrace = findClosingBrace(css, openingBrace);
    const body = css.slice(openingBrace + 1, closingBrace);
    if (prelude.startsWith('@')) {
      rules.push(...parseCssRules(body));
    } else {
      rules.push({
        selectors: prelude.split(',').map((selector) => selector.trim()),
        declarations: body,
      });
    }
    cursor = closingBrace + 1;
  }
  return rules;
}

function getExactRuleDeclarations(css: string, selector: string) {
  const rules = parseCssRules(css);
  for (let index = rules.length - 1; index >= 0; index -= 1) {
    const rule = rules[index];
    if (rule?.selectors.includes(selector)) return rule.declarations;
  }
  return undefined;
}

function hasDisplayDeclaration(css: string, selector: string, value: string) {
  const declarations = getExactRuleDeclarations(css, selector);
  return declarations !== undefined
    && new RegExp(`display\\s*:\\s*${value}\\s*!important\\s*;`).test(declarations);
}

function hasNoBreakDeclarations(css: string, selector: string) {
  const declarations = getExactRuleDeclarations(css, selector);
  return declarations?.includes('break-inside: avoid;') === true
    && declarations.includes('page-break-inside: avoid;');
}

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
    const hiddenSelectors = [
      '.app-header',
      '.app-shell__orientation',
      '.progress',
      '.utility-group',
      '.teacher-guide__actions',
      '.modal-dialog-backdrop',
      '.case-report__dialog-backdrop',
      '[role="tablist"]',
      '[role="tab"]',
      'button',
      '.action-guidance',
      '.gi-pulse',
    ];
    for (const selector of hiddenSelectors) {
      expect(hasDisplayDeclaration(printCss, selector, 'none'), selector).toBe(true);
    }
    expect(hasDisplayDeclaration(printCss, '[data-print-region]', 'block')).toBe(true);

    const noBreakSelectors = [
      '[data-print-region] .teacher-guide__section--rubric li',
      '[data-print-region] .teacher-guide__narrator',
      '[data-print-region] .case-report__section',
      '[data-print-region] .case-report__snapshot',
      '[data-print-region] .case-report__evidence-row',
    ];
    for (const selector of noBreakSelectors) {
      expect(hasNoBreakDeclarations(printCss, selector), selector).toBe(true);
    }

    expect(printCss).toMatch(/html,[\s\S]*body\s*\{[\s\S]*background:\s*#fff\s*!important;[\s\S]*color:\s*#111\s*!important;/);
    expect(printCss).toMatch(/\[data-print-region\]\s+\*\s*\{[\s\S]*color:\s*#111\s*!important;[\s\S]*background:\s*#fff\s*!important;/);
    expect(printCss).toMatch(/break-inside:\s*avoid;[\s\S]*page-break-inside:\s*avoid;/);
  });

  it('rejects known false-pass print stylesheet mutations', () => {
    expect(hasDisplayDeclaration(printCss, '.modal-dialog-backdrop', 'none')).toBe(true);
    const removedGlobalBackdrop = printCss.replace('  .modal-dialog-backdrop,\n', '');
    expect(removedGlobalBackdrop).not.toBe(printCss);
    expect(hasDisplayDeclaration(removedGlobalBackdrop, '.modal-dialog-backdrop', 'none')).toBe(false);

    const replacedGlobalDisplay = printCss.replace(
      '    display: none !important;\n  }\n\n  .app-shell > *',
      '    visibility: hidden;\n  }\n\n  .app-shell > *',
    );
    expect(replacedGlobalDisplay).not.toBe(printCss);
    expect(hasDisplayDeclaration(replacedGlobalDisplay, '.modal-dialog-backdrop', 'none')).toBe(false);

    const rubricRuleStart = printCss.indexOf('  [data-print-region] .teacher-guide__section--rubric li,');
    const rubricRuleEnd = printCss.indexOf('\n  }', rubricRuleStart) + '\n  }'.length;
    expect(rubricRuleStart).toBeGreaterThanOrEqual(0);
    expect(rubricRuleEnd).toBeGreaterThan(rubricRuleStart);
    const rubricRule = printCss.slice(rubricRuleStart, rubricRuleEnd);
    const removedNoBreakDeclarations = `${printCss.slice(0, rubricRuleStart)}${rubricRule.replace(
      '    break-inside: avoid;\n    page-break-inside: avoid;\n',
      '',
    )}${printCss.slice(rubricRuleEnd)}`;
    expect(removedNoBreakDeclarations).not.toBe(printCss);
    expect(hasNoBreakDeclarations(removedNoBreakDeclarations, '[data-print-region] .case-report__section')).toBe(false);
  });
});
