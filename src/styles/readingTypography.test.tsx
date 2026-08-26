/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const layoutCss = readFileSync(resolve(process.cwd(), 'src/styles/layout.css'), 'utf8');
const componentsCss = readFileSync(resolve(process.cwd(), 'src/styles/components.css'), 'utf8');

const coreRules = [
  ['렌즈', layoutCss, '.narrative-sentence p'],
  ['근거', componentsCss, '.sentence-card__copy'],
  ['교차 조사', componentsCss, '.comparison-option'],
  ['관점 전환', componentsCss, '.rewrite-block__text'],
  ['사건 보고서', componentsCss, '.case-report__intro'],
] as const;

function ruleBody(css: string, selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return css.match(new RegExp(`[^{}]*${escapedSelector}(?=[,\\s{])[^{}]*\\{([^}]*)\\}`))?.[1] ?? '';
}

describe('core reading typography', () => {
  it('wires each learner-readable stage body to the shared preference variables', () => {
    for (const [stage, css, selector] of coreRules) {
      const body = ruleBody(css, selector);
      expect(body, stage).toMatch(/font-size:\s*var\(--reading-size/);
      expect(body, stage).toMatch(/line-height:\s*var\(--reading-line-height/);
    }
  });
});
