import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const layoutCss = readFileSync(resolve(process.cwd(), 'src/styles/layout.css'), 'utf8');

describe('narrow viewport layout contract', () => {
  it('reserves the stacked utility group and separates persistence warnings', () => {
    const narrowMedia = layoutCss.slice(layoutCss.lastIndexOf('@media (max-width: 260px)'));
    expect(narrowMedia).toMatch(/--utility-stack-height:\s*calc\(132px\s*\+\s*0\.9rem\s*\+\s*0\.7rem\s*\+\s*2px\);/);
    expect(narrowMedia).toMatch(/--utility-warning-reserve:\s*6rem;/);
    expect(narrowMedia).toMatch(/\.app-shell\s*\{[\s\S]*padding-bottom:\s*calc\(var\(--utility-stack-height\)\s*\+\s*var\(--utility-warning-reserve\)\s*\+\s*1rem\s*\+\s*16px\s*\+\s*env\(safe-area-inset-bottom\)\);/);
    expect(narrowMedia).toMatch(/\.utility-group\s*\{[\s\S]*bottom:\s*max\(1rem,\s*env\(safe-area-inset-bottom\)\);/);
    expect(narrowMedia).toMatch(/\.utility-warning\s*\{[\s\S]*bottom:\s*calc\(var\(--utility-stack-height\)\s*\+\s*1rem\s*\+\s*0\.5rem\s*\+\s*env\(safe-area-inset-bottom\)\);/);
    expect(layoutCss).toMatch(/\.utility-button\s*\{[\s\S]*min-width:\s*44px[\s\S]*min-height:\s*44px[\s\S]*cursor:\s*pointer;/);
    expect(narrowMedia).toMatch(/\.utility-button\s*\{[\s\S]*width:\s*100%;/);
  });

  it('keeps each lens narrative item full-width around its SentenceCard', () => {
    const narrativeRule = layoutCss.match(/\.narrative-sentence\s*\{([^}]*)\}/)?.[1] ?? '';
    expect(narrativeRule).toMatch(/display:\s*block;/);
    expect(narrativeRule).toMatch(/min-width:\s*0;/);
    expect(narrativeRule).not.toMatch(/grid-template-columns|align-items|gap:/);

    const narrowMedia = layoutCss.slice(layoutCss.lastIndexOf('@media (max-width: 480px)'));
    expect(narrowMedia).not.toMatch(/\.narrative-sentence\s*\{[\s\S]*grid-template-columns/);
  });

  it('keeps learner progress and setting values visually secondary', () => {
    expect(layoutCss).toMatch(/\.evidence-progress\s*\{[\s\S]*font-variant-numeric:\s*tabular-nums;/);
    expect(layoutCss).toMatch(/\.reading-setting-value\s*\{[\s\S]*font-size:\s*0\.72em;/);
  });
});
