import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const readText = (relativePath: string) => readFileSync(resolve(repoRoot, relativePath), 'utf8');

describe('CI and Pages workflow contracts', () => {
  it('defines the canonical Ubuntu pull-request Playwright gate', () => {
    const workflowPath = resolve(repoRoot, '.github/workflows/e2e.yml');
    expect(existsSync(workflowPath)).toBe(true);

    const workflow = readText('.github/workflows/e2e.yml');
    expect(workflow).toContain('name: Playwright E2E');
    expect(workflow).toMatch(/pull_request:\s*\n\s+branches:\s+\[main\]/);
    expect(workflow).toContain('workflow_dispatch:');
    expect(workflow).toContain('permissions:\n  contents: read');
    expect(workflow).toContain('runs-on: ubuntu-latest');
    expect(workflow).toContain('node-version: 22');
    expect(workflow).toContain('cache: npm');

    const installIndex = workflow.indexOf('run: npm ci');
    const browserIndex = workflow.indexOf('run: npx playwright install --with-deps chromium');
    const buildIndex = workflow.indexOf('run: npm run build');
    const e2eIndex = workflow.indexOf('run: npx playwright test');
    expect(installIndex).toBeGreaterThan(-1);
    expect(browserIndex).toBeGreaterThan(installIndex);
    expect(buildIndex).toBeGreaterThan(browserIndex);
    expect(e2eIndex).toBeGreaterThan(buildIndex);
    expect(workflow).not.toContain('pages: write');
    expect(workflow).not.toContain('id-token: write');
  });

  it('runs the Pages E2E gate before artifact upload and preserves deployment needs', () => {
    const workflow = readText('.github/workflows/pages.yml');
    expect(workflow).toContain('pages: write');
    expect(workflow).toContain('id-token: write');
    expect(workflow).toMatch(/deploy:\s*\n\s+needs: build/);

    const buildIndex = workflow.indexOf('run: npm run build');
    const browserIndex = workflow.indexOf('run: npx playwright install --with-deps chromium');
    const e2eIndex = workflow.indexOf('run: npx playwright test');
    const uploadIndex = workflow.indexOf('name: Upload Pages artifact');
    expect(buildIndex).toBeGreaterThan(-1);
    expect(browserIndex).toBeGreaterThan(buildIndex);
    expect(e2eIndex).toBeGreaterThan(browserIndex);
    expect(uploadIndex).toBeGreaterThan(e2eIndex);
    expect(workflow).toContain('path: dist');
  });

  it('documents Ubuntu CI and the safe external Terminal fallback', () => {
    const readme = readText('README.md');
    expect(readme).toMatch(/GitHub Actions.*Ubuntu.*정식/s);
    expect(readme).toMatch(/Pages.*E2E.*통과/s);
    expect(readme).toContain('cd "/Volumes/ External Drive 256G/Dev2/codex/perspective-lens-case-room"');
    expect(readme).toContain('npx playwright test --workers=1');
    expect(readme).toContain('MachPortRendezvousServer');
    expect(readme).toContain('Permission denied (1100)');
    expect(readme).toContain('4173');
    expect(readme).toMatch(/외부 (Terminal|셸|iTerm)/);
    expect(readme).not.toMatch(/--no-sandbox|--single-process/);
  });
});
