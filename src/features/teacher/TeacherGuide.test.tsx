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

interface CssBlock {
  prelude: string;
  openingBrace: number;
  closingBrace: number;
  body: string;
}

function normalizePrelude(prelude: string) {
  return prelude.replace(/\s+/g, ' ').trim();
}

function findCssBlock(
  css: string,
  targetPrelude: string,
  start = 0,
  end = css.length,
): CssBlock | undefined {
  let cursor = start;
  while (cursor < end) {
    const openingBrace = css.indexOf('{', cursor);
    if (openingBrace === -1 || openingBrace >= end) return undefined;
    const prelude = css.slice(cursor, openingBrace).trim();
    const closingBrace = findClosingBrace(css, openingBrace);
    if (normalizePrelude(prelude) === normalizePrelude(targetPrelude)) {
      return {
        prelude,
        openingBrace,
        closingBrace,
        body: css.slice(openingBrace + 1, closingBrace),
      };
    }
    if (prelude.startsWith('@')) {
      const nestedBlock = findCssBlock(css, targetPrelude, openingBrace + 1, closingBrace);
      if (nestedBlock) return nestedBlock;
    }
    cursor = closingBrace + 1;
  }
  return undefined;
}

function getExactAtRuleBody(css: string, atRulePrelude: string) {
  const block = findCssBlock(css, atRulePrelude);
  if (!block || !block.prelude.startsWith('@')) return undefined;
  return block.body;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasDeclaration(body: string | undefined, property: string, value: string) {
  if (body === undefined) return false;
  return new RegExp(
    `(?:^|;)\\s*${escapeRegExp(property)}\\s*:\\s*${escapeRegExp(value)}\\s*;`,
  ).test(body);
}

function countDeclaration(body: string | undefined, property: string, value: string) {
  if (body === undefined) return 0;
  const declarationPattern = new RegExp(
    `^\\s*${escapeRegExp(property)}\\s*:\\s*${escapeRegExp(value)}\\s*$`,
  );
  return body.split(';').filter((declaration) => declarationPattern.test(declaration)).length;
}

function expectDeclarationMigrationContract({
  originalCss,
  mutatedCss,
  sourceBefore,
  sourceAfter,
  targetBefore,
  targetAfter,
  property,
  value,
}: {
  originalCss: string;
  mutatedCss: string;
  sourceBefore: string | undefined;
  sourceAfter: string | undefined;
  targetBefore: string | undefined;
  targetAfter: string | undefined;
  property: string;
  value: string;
}) {
  expect(mutatedCss).not.toBe(originalCss);
  expect(countDeclaration(sourceAfter, property, value)).toBe(
    countDeclaration(sourceBefore, property, value) - 1,
  );
  expect(countDeclaration(targetAfter, property, value)).toBe(
    countDeclaration(targetBefore, property, value) + 1,
  );
  expect(hasDeclaration(sourceAfter, property, value)).toBe(false);
  expect(hasDeclaration(targetAfter, property, value)).toBe(true);
}

function moveDeclarationToUnrelatedRule(
  css: string,
  sourcePrelude: string,
  targetPrelude: string,
  property: string,
  value: string,
) {
  const source = findCssBlock(css, sourcePrelude);
  const target = findCssBlock(css, targetPrelude);
  if (!source || !target) return css;

  const declaration = new RegExp(
    `\\s*${escapeRegExp(property)}\\s*:\\s*${escapeRegExp(value)}\\s*;`,
  ).exec(source.body);
  if (!declaration || declaration.index === undefined) return css;

  const replacements = [
    {
      start: source.openingBrace + 1,
      end: source.closingBrace,
      replacement: `${source.body.slice(0, declaration.index)}${source.body.slice(
        declaration.index + declaration[0].length,
      )}`,
    },
    {
      start: target.openingBrace + 1,
      end: target.closingBrace,
      replacement: `${target.body}\n    ${property}: ${value};\n`,
    },
  ].sort((left, right) => right.start - left.start);

  let mutatedCss = css;
  for (const replacement of replacements) {
    mutatedCss = `${mutatedCss.slice(0, replacement.start)}${replacement.replacement}${mutatedCss.slice(
      replacement.end,
    )}`;
  }
  return mutatedCss;
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

function getExactSelectorGroupDeclarations(css: string, selectors: string[]) {
  const rules = parseCssRules(css);
  for (let index = rules.length - 1; index >= 0; index -= 1) {
    const rule = rules[index];
    if (rule?.selectors.length === selectors.length
      && selectors.every((selector) => rule.selectors.includes(selector))) {
      return rule.declarations;
    }
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
    const pageBody = getExactAtRuleBody(printCss, '@page');
    expect(hasDeclaration(pageBody, 'size', 'A4 portrait')).toBe(true);
    expect(hasDeclaration(pageBody, 'margin', '12mm')).toBe(true);
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

    const globalPrintDeclarations = getExactSelectorGroupDeclarations(printCss, ['html', 'body']);
    for (const selector of ['html', 'body']) {
      const declarations = globalPrintDeclarations;
      expect(hasDeclaration(declarations, 'background', '#fff !important'), selector).toBe(true);
      expect(hasDeclaration(declarations, 'color', '#111 !important'), selector).toBe(true);
    }
    const printRegionDescendantDeclarations = getExactRuleDeclarations(printCss, '[data-print-region] *');
    expect(hasDeclaration(printRegionDescendantDeclarations, 'color', '#111 !important')).toBe(true);
    expect(hasDeclaration(printRegionDescendantDeclarations, 'background', '#fff !important')).toBe(true);
    expect(printCss).toMatch(/break-inside:\s*avoid;[\s\S]*page-break-inside:\s*avoid;/);
  });

  it('rejects print declaration ownership mutations and proves source-minus-one/target-plus-one count deltas', () => {
    const movedPageSize = moveDeclarationToUnrelatedRule(
      printCss,
      '@page',
      '[data-print-region]',
      'size',
      'A4 portrait',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedPageSize,
      sourceBefore: getExactAtRuleBody(printCss, '@page'),
      sourceAfter: getExactAtRuleBody(movedPageSize, '@page'),
      targetBefore: getExactRuleDeclarations(printCss, '[data-print-region]'),
      targetAfter: getExactRuleDeclarations(movedPageSize, '[data-print-region]'),
      property: 'size',
      value: 'A4 portrait',
    });

    const movedPageMargin = moveDeclarationToUnrelatedRule(
      printCss,
      '@page',
      '[data-print-region]',
      'margin',
      '12mm',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedPageMargin,
      sourceBefore: getExactAtRuleBody(printCss, '@page'),
      sourceAfter: getExactAtRuleBody(movedPageMargin, '@page'),
      targetBefore: getExactRuleDeclarations(printCss, '[data-print-region]'),
      targetAfter: getExactRuleDeclarations(movedPageMargin, '[data-print-region]'),
      property: 'margin',
      value: '12mm',
    });

    const movedGlobalBackground = moveDeclarationToUnrelatedRule(
      printCss,
      'html, body',
      '[data-print-region] *',
      'background',
      '#fff !important',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedGlobalBackground,
      sourceBefore: getExactSelectorGroupDeclarations(printCss, ['html', 'body']),
      sourceAfter: getExactSelectorGroupDeclarations(movedGlobalBackground, ['html', 'body']),
      targetBefore: getExactRuleDeclarations(printCss, '[data-print-region] *'),
      targetAfter: getExactRuleDeclarations(movedGlobalBackground, '[data-print-region] *'),
      property: 'background',
      value: '#fff !important',
    });

    const movedGlobalColor = moveDeclarationToUnrelatedRule(
      printCss,
      'html, body',
      '[data-print-region] *',
      'color',
      '#111 !important',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedGlobalColor,
      sourceBefore: getExactSelectorGroupDeclarations(printCss, ['html', 'body']),
      sourceAfter: getExactSelectorGroupDeclarations(movedGlobalColor, ['html', 'body']),
      targetBefore: getExactRuleDeclarations(printCss, '[data-print-region] *'),
      targetAfter: getExactRuleDeclarations(movedGlobalColor, '[data-print-region] *'),
      property: 'color',
      value: '#111 !important',
    });

    const movedPrintRegionBackground = moveDeclarationToUnrelatedRule(
      printCss,
      '[data-print-region] *',
      'html, body',
      'background',
      '#fff !important',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedPrintRegionBackground,
      sourceBefore: getExactRuleDeclarations(printCss, '[data-print-region] *'),
      sourceAfter: getExactRuleDeclarations(movedPrintRegionBackground, '[data-print-region] *'),
      targetBefore: getExactSelectorGroupDeclarations(printCss, ['html', 'body']),
      targetAfter: getExactSelectorGroupDeclarations(movedPrintRegionBackground, ['html', 'body']),
      property: 'background',
      value: '#fff !important',
    });

    const movedPrintRegionColor = moveDeclarationToUnrelatedRule(
      printCss,
      '[data-print-region] *',
      'html, body',
      'color',
      '#111 !important',
    );
    expectDeclarationMigrationContract({
      originalCss: printCss,
      mutatedCss: movedPrintRegionColor,
      sourceBefore: getExactRuleDeclarations(printCss, '[data-print-region] *'),
      sourceAfter: getExactRuleDeclarations(movedPrintRegionColor, '[data-print-region] *'),
      targetBefore: getExactSelectorGroupDeclarations(printCss, ['html', 'body']),
      targetAfter: getExactSelectorGroupDeclarations(movedPrintRegionColor, ['html', 'body']),
      property: 'color',
      value: '#111 !important',
    });
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
