import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const readme = readFileSync(resolve(repoRoot, 'README.md'), 'utf8');
const checklist = readFileSync(resolve(repoRoot, 'docs/qa/manual-accessibility-checklist.md'), 'utf8');

describe('local release-readiness packet', () => {
  it('documents the app, boundaries, local commands, and exact evidence paths', () => {
    for (const command of ['npm run dev', 'npm run build', 'npm test', 'npm run test:e2e', 'npm run lint', 'npm run lint:filesize']) {
      expect(readme).toContain(command);
    }
    for (const id of ['playground-storage-box', 'missing-umbrella-tag', 'club-notice-poster', 'library-window-seat']) {
      expect(readme).toContain(id);
    }
    for (const key of [
      'perspective-lens:session:v1',
      'perspective-lens:saved-memo:v1',
      'perspective-lens:reading-prefs:v1',
    ]) {
      expect(readme).toContain(key);
    }
    for (const boundary of ['서버 없음', 'AI 없음', '분석/추적 없음', 'GitHub Pages', '.github/workflows/pages.yml']) {
      expect(readme).toContain(boundary);
    }
    for (const check of ['375px', '200%', '키보드만', 'VoiceOver', '모션 감소', 'A4']) {
      expect(readme).toContain(check);
    }
    for (const path of [
      'docs/qa/evidence/375-intake.png',
      'docs/qa/evidence/375-evidence.png',
      'docs/qa/evidence/375-report.png',
      'docs/qa/evidence/reduced-motion-current-action.png',
    ]) {
      expect(readme).toContain(path);
    }
    expect(readme).toMatch(/업데이트 내역/);
    expect(readme).toMatch(/개선.*행|행.*개선/s);
    for (const stage of ['사건 접수', '렌즈 A/B', '근거 보드', '교차 조사(처음 생각)', '중립 기록 열기·수정 비교', '관점 전환', '사건 보고서']) {
      expect(readme).toContain(stage);
    }
    expect(readme).toMatch(/중립 기록은 처음 비교를 저장하기 전까지 숨겨져/);
    expect(readme).toMatch(/점수 없이.*사실.*이유 문장|사실.*이유 문장.*점수 없이/s);
  });

  it('records twelve concrete manual accessibility checks with a literal environment', () => {
    const rows = checklist.match(/^\s*- \[[ xX]\] /gm) ?? [];
    expect(rows).toHaveLength(12);
    for (const item of [
      'Command+F5',
      '랜드마크',
      '렌즈 탭',
      '문장 번호',
      '정중한 피드백',
      'Escape',
      '키보드만',
      '375×812',
      '200%',
      'Reduce Motion',
      'A4',
      '개인정보',
    ]) {
      expect(checklist).toContain(item);
    }
    expect(checklist).toMatch(/2026-08-\d{2}.*KST/);
    expect(checklist).toMatch(/(Chrome|Safari|Firefox) [0-9]+/);
    expect(checklist).toMatch(/macOS [0-9]+/);
    expect(checklist).toMatch(/PASS/);
    expect(checklist).not.toMatch(/TBD|TODO|작성 예정|____/i);
  });
});
