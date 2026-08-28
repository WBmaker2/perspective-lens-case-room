import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import { sentenceReference } from '../../src/content/learnerLabels';
import type { EvidenceCategory } from '../../src/model/case';

const pack = casePacks.find((item) => item.id === 'club-notice-poster')!;
const categories: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현',
};
const audiences = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님' } as const;
const purposes = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기' } as const;
const categoryInfo = [
  ['sharedFactOptionIds', 'shared-fact', '공통 사실'],
  ['differentExpressionOptionIds', 'different-expression', '다른 표현'],
  ['missingInformationOptionIds', 'missing-information', '빠진 정보'],
] as const;

async function press(locator: Locator, key: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(key);
}

async function assertNoOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

async function assertHitTargets(page: Page) {
  const tooSmall = await page.evaluate(() => {
    const selector = 'button, [role="tab"], a, label:has(input[type="radio"]), label:has(input[type="checkbox"])';
    return Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((element) => {
      const style = window.getComputedStyle(element);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return false;
      return rect.width < 44 || rect.height < 44;
    }).map((element) => { const rect = element.getBoundingClientRect(); return `${element.tagName}.${element.className}:${rect.width}x${rect.height}`; });
  });
  expect(tooSmall).toEqual([]);
}

async function assertUtilityDoesNotCoverCurrentAction(page: Page) {
  const result = await page.evaluate(() => {
    const utility = document.querySelector<HTMLElement>('.utility-group');
    const action = document.querySelector<HTMLElement>('.primary-action.gi-pulse');
    if (!utility || !action) return true;
    const first = utility.getBoundingClientRect();
    const second = action.getBoundingClientRect();
    return first.right <= second.left || second.right <= first.left || first.bottom <= second.top || second.bottom <= first.top;
  });
  expect(result).toBe(true);
}

async function assertReducedAction(page: Page, label: string) {
  const action = page.getByRole('button', { name: label, exact: true });
  await expect(action).toHaveClass(/gi-pulse/);
  await expect(action).toHaveCSS('animation-name', 'none');
  await expect(action).toHaveCSS('outline-width', '3px');
  await expect(page.locator('.action-guidance')).toBeVisible();
}

async function resetAndSelect(page: Page) {
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await press(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
}

async function completeEvidence(page: Page, startIndex = 0) {
  const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  for (const [index, sentence] of sentences.entries()) {
    if (index < startIndex) continue;
    await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true }));
    for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categories[category], exact: true }));
    if (sentence.kind === 'mixed') {
      const segments = page.getByRole('checkbox');
      for (let segmentIndex = 0; segmentIndex < sentence.segments.length; segmentIndex += 1) await press(segments.nth(segmentIndex), 'Space');
    }
    await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  }
}

async function completeComparison(page: Page) {
  const chosen = categoryInfo.map(([keyName, validFor, groupName]) => {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`No ${validFor} option`);
    return { keyName, validFor, groupName, option };
  });
  for (const { groupName, option } of chosen) await press(page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true }), 'Space');
  for (const sentenceId of new Set(chosen.flatMap(({ option }) => option.evidenceSentenceIds))) await press(page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) }), 'Space');
  await press(page.getByRole('button', { name: '비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '추가 기록 열기', exact: true }));
  const changed = chosen.map((item) => ({
    ...item,
    alternate: pack.comparisonOptions.find((option) => option.validFor.includes(item.validFor) && option.id !== item.option.id),
  })).find((item) => item.alternate);
  if (!changed?.alternate) throw new Error(`No alternate comparison option in ${pack.id}`);
  const changedGroup = page.getByRole('group', { name: changed.groupName });
  await press(changedGroup.getByRole('checkbox', { name: changed.option.label, exact: true }), 'Space');
  await press(changedGroup.getByRole('checkbox', { name: changed.alternate.label, exact: true }), 'Space');
  for (const sentenceId of new Set(changed.alternate.evidenceSentenceIds)) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)}`) }), 'Space');
  await press(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '관점 전환 시작', exact: true }));
}

async function completeRewrite(page: Page) {
  const rule = pack.rewriteRules[0]!;
  await press(page.getByRole('radio', { name: pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName }), 'Space');
  await press(page.getByRole('radio', { name: audiences[rule.audienceId] }), 'Space');
  await press(page.getByRole('radio', { name: purposes[rule.purposeId] }), 'Space');
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) {
    const block = pack.rewriteBlocks.find((item) => item.id === blockId);
    if (!block) throw new Error(`No rewrite block ${blockId}`);
    await press(page.locator('.rewrite-block').filter({ hasText: block.text }).getByRole('button', { name: /^블록 넣기/ }));
  }
  await press(page.getByRole('button', { name: '관점 전환 완료', exact: true }));
}

async function driveFlow(page: Page, checkStage: (stage: string) => Promise<void>) {
  await resetAndSelect(page);
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await checkStage('intake');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  await checkStage('lenses');
  const tabs = page.getByRole('tab');
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await expect(page.getByRole('button', { name: '읽음 취소', exact: true }).first()).toBeVisible();
  await press(tabs.nth(1));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await expect(page.getByRole('button', { name: '중요 표시 취소', exact: true }).first()).toBeVisible();
  await press(tabs.nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
  await checkStage('evidence');
  await completeEvidence(page);
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));
  await checkStage('comparison-initial');
  await completeComparison(page);
  await checkStage('rewrite');
  await completeRewrite(page);
  await checkStage('report');
}

test('375px portrait and 640px CSS viewport reflow keep controls usable', async ({ page }) => {
  for (const width of [375, 640]) {
    await page.setViewportSize({ width, height: 812 });
    await driveFlow(page, async () => {
      await assertNoOverflow(page);
      await assertHitTargets(page);
      await assertUtilityDoesNotCoverCurrentAction(page);
      await expect.poll(() => page.locator('.gi-pulse').count()).toBeLessThanOrEqual(1);
    });
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await resetAndSelect(page);
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  await expect(page.locator('.lens-panel[data-active="true"]')).toHaveCount(1);
  await expect(page.getByRole('tablist', { name: '렌즈 선택' })).toBeVisible();
  await press(page.getByRole('tab').nth(1));
  await expect(page.locator('.lens-panel[data-active="true"]')).toHaveCount(1);
  await expect(page.getByRole('region', { name: '차이 요약' })).toBeVisible();
});

test('reduced motion replaces every required-action aura with static guidance', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await resetAndSelect(page);
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await assertReducedAction(page, '사건 렌즈 열기');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  const tabs = page.getByRole('tab');
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(tabs.nth(1));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(tabs.nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await assertReducedAction(page, '근거 보드로 이동');
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
  const first = pack.narrators[0].sentences[0]!;
  await press(page.getByRole('button', { name: sentenceReference(pack, first.id), exact: true }));
  for (const category of [...new Set(first.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categories[category], exact: true }));
  await assertReducedAction(page, '근거 표시하기');
  await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  await completeEvidence(page, 1);
  await assertReducedAction(page, '교차 조사 시작');
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));
  const chosen = categoryInfo.map(([keyName, validFor, groupName]) => {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor))!;
    return { keyName, validFor, groupName, option };
  });
  for (const { groupName, option } of chosen) await press(page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true }), 'Space');
  for (const sentenceId of new Set(chosen.flatMap(({ option }) => option.evidenceSentenceIds))) await press(page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) }), 'Space');
  await assertReducedAction(page, '비교 완료');
  await press(page.getByRole('button', { name: '비교 완료', exact: true }));
  await assertReducedAction(page, '추가 기록 열기');
  await press(page.getByRole('button', { name: '추가 기록 열기', exact: true }));
  const changed = chosen.map((item) => ({
    ...item,
    alternate: pack.comparisonOptions.find((option) => option.validFor.includes(item.validFor) && option.id !== item.option.id),
  })).find((item) => item.alternate);
  if (!changed?.alternate) throw new Error(`No alternate comparison option in ${pack.id}`);
  const changedGroup = page.getByRole('group', { name: changed.groupName });
  await press(changedGroup.getByRole('checkbox', { name: changed.option.label, exact: true }), 'Space');
  await press(changedGroup.getByRole('checkbox', { name: changed.alternate.label, exact: true }), 'Space');
  for (const sentenceId of new Set(changed.alternate.evidenceSentenceIds)) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)}`) }), 'Space');
  await assertReducedAction(page, '수정 비교 완료');
  await press(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await assertReducedAction(page, '관점 전환 시작');
  await press(page.getByRole('button', { name: '관점 전환 시작', exact: true }));
  await completeRewrite(page);
  await expect(page.locator('.gi-pulse')).toHaveCount(0);
});
