import { mkdirSync } from 'node:fs';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import type { EvidenceCategory } from '../../src/model/case';

const pack = casePacks.find((item) => item.id === 'missing-umbrella-tag')!;
const categoryLabels: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현',
};
const audiences = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님' } as const;
const purposes = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기' } as const;

async function press(locator: Locator, key: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(key);
}

async function assertNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

async function captureEvidence(page: Page, heading: string, relativePath: string) {
  await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  await assertNoHorizontalOverflow(page);
  mkdirSync('docs/qa/evidence', { recursive: true });
  await page.screenshot({ path: relativePath, fullPage: true });
}

async function startIntake(page: Page) {
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await press(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
}

async function startEvidence(page: Page) {
  await startIntake(page);
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  const tabs = page.getByRole('tab');
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(tabs.nth(1));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(tabs.nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
}

async function classify(page: Page, index: number) {
  const sentence = pack.narrators.flatMap((narrator) => narrator.sentences)[index]!;
  await press(page.getByRole('button', { name: /^문장 \d+/ }).nth(index));
  for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categoryLabels[category], exact: true }));
  if (sentence.kind === 'mixed') {
    const segments = page.getByRole('checkbox');
    for (let segmentIndex = 0; segmentIndex < sentence.segments.length; segmentIndex += 1) await press(segments.nth(segmentIndex), 'Space');
  }
  await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
}

async function completeAllEvidence(page: Page, startIndex: number) {
  const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  for (let index = startIndex; index < sentences.length; index += 1) await classify(page, index);
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));
}

async function completeComparisonAndRewrite(page: Page) {
  const categories: readonly ['sharedFactOptionIds' | 'differentExpressionOptionIds' | 'missingInformationOptionIds', 'shared-fact' | 'different-expression' | 'missing-information', string][] = [
    ['sharedFactOptionIds', 'shared-fact', '공통 사실'],
    ['differentExpressionOptionIds', 'different-expression', '다른 표현'],
    ['missingInformationOptionIds', 'missing-information', '빠진 정보'],
  ];
  const chosen = categories.map(([, validFor, groupName]) => {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`No ${validFor} option`);
    return { groupName, option };
  });
  for (const { groupName, option } of chosen) await press(page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true }), 'Space');
  for (const sentenceId of new Set(chosen.flatMap(({ option }) => option.evidenceSentenceIds))) await press(page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceId}`) }), 'Space');
  await press(page.getByRole('button', { name: '비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '추가 기록 열기', exact: true }));

  const changed = pack.comparisonOptions.find((option) => option.validFor.includes('shared-fact') && option.id !== chosen[0]!.option.id)!;
  const shared = page.getByRole('group', { name: '공통 사실' });
  await press(shared.getByRole('checkbox', { name: chosen[0]!.option.label, exact: true }), 'Space');
  await press(shared.getByRole('checkbox', { name: changed.label, exact: true }), 'Space');
  for (const sentenceId of new Set(changed.evidenceSentenceIds)) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceId}`) });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${pack.narrators[0].sentences[0]!.id}`) }), 'Space');
  await press(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '관점 전환 시작', exact: true }));

  const rule = pack.rewriteRules[0]!;
  await press(page.getByRole('radio', { name: pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName }), 'Space');
  await press(page.getByRole('radio', { name: audiences[rule.audienceId] }), 'Space');
  await press(page.getByRole('radio', { name: purposes[rule.purposeId] }), 'Space');
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) await press(page.getByRole('button', { name: new RegExp(`블록 넣기.*${blockId}`) }));
  await press(page.getByRole('button', { name: '관점 전환 완료', exact: true }));
}

test('captures the three learner stages and reduced-motion current action', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await startIntake(page);
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await captureEvidence(page, '사건 접수', 'docs/qa/evidence/375-intake.png');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  const tabs = page.getByRole('tab');
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(tabs.nth(1));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(tabs.nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
  await classify(page, 0);
  await captureEvidence(page, '근거 보드', 'docs/qa/evidence/375-evidence.png');
  await completeAllEvidence(page, 1);
  await completeComparisonAndRewrite(page);
  await captureEvidence(page, '사건 보고서', 'docs/qa/evidence/375-report.png');
  await expect(page.locator('.gi-pulse')).toHaveCount(0);

  await startEvidence(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await classify(page, 0);
  const action = page.getByRole('button', { name: '근거 표시하기', exact: true });
  await expect(action).toHaveCSS('animation-name', 'none');
  await expect(action).toHaveCSS('outline-width', '3px');
  await expect(action).toBeVisible();
  await captureEvidence(page, '근거 보드', 'docs/qa/evidence/reduced-motion-current-action.png');
});
