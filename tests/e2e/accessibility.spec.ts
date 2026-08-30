import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import { sentenceReference } from '../../src/content/learnerLabels';
import type { EvidenceCategory } from '../../src/model/case';

const pack = casePacks.find((item) => item.id === 'missing-umbrella-tag')!;
const categories: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현',
};
const audiences = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님' } as const;
const purposes = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기' } as const;

async function key(locator: Locator, keyName: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(keyName);
}

async function noSeriousAxe(page: Page) {
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
}

async function assertStage(page: Page, title: string) {
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await expect(page.locator('[data-stage-heading]')).toHaveCount(1);
  await expect(page.locator('[data-stage-heading]')).toBeFocused();
  await expect(page.getByRole('navigation', { name: '학습 단계' })).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
}

async function selectComparison(page: Page) {
  const categoryInfo = [
    ['sharedFactOptionIds', 'shared-fact', '공통 사실'],
    ['differentExpressionOptionIds', 'different-expression', '다른 표현'],
    ['missingInformationOptionIds', 'missing-information', '빠진 정보'],
  ] as const;
  const chosen = categoryInfo.map(([keyName, validFor, groupName]) => {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`No comparison option for ${validFor}`);
    return { keyName, groupName, option };
  });
  for (const { groupName, option } of chosen) {
    await key(page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true }), 'Space');
  }
  const evidenceIds = new Set(chosen.flatMap(({ option }) => option.evidenceSentenceIds));
  for (const sentenceId of evidenceIds) {
    await key(page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) }), 'Space');
  }
  return chosen;
}

async function completeEvidence(page: Page, startIndex = 0) {
  const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  for (const [index, sentence] of sentences.entries()) {
    if (index < startIndex) continue;
    await key(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true }));
    for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await key(page.getByRole('button', { name: categories[category], exact: true }));
    if (sentence.kind === 'mixed') {
      const segments = page.getByRole('checkbox');
      for (let segmentIndex = 0; segmentIndex < sentence.segments.length; segmentIndex += 1) await key(segments.nth(segmentIndex), 'Space');
    }
    await key(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  }
}

async function reach(page: Page) {
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await key(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
  await key(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await page.locator('[data-stage-heading]').focus();
}

test('axe, semantics, tabs, announcements, and dialogs cover the full learner path', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await reach(page);
  await assertStage(page, '사건 접수');
  await noSeriousAxe(page);
  await key(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  await assertStage(page, '렌즈 A/B');
  await noSeriousAxe(page);

  const tabs = page.getByRole('tab');
  await key(tabs.nth(0));
  await tabs.nth(0).press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await tabs.nth(1).press('ArrowLeft');
  await expect(tabs.nth(0)).toBeFocused();
  await key(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await key(tabs.nth(1));
  await key(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await key(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await key(tabs.nth(0));
  await key(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await key(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));

  await assertStage(page, '근거 보드');
  await noSeriousAxe(page);
  const firstSentence = page.getByRole('button', { name: sentenceReference(pack, pack.narrators[0].sentences[0]!.id), exact: true });
  await expect(firstSentence).toHaveAttribute('aria-pressed', 'false');
  await key(firstSentence);
  await expect(firstSentence).toHaveAttribute('aria-pressed', 'true');
  for (const category of [...new Set(pack.narrators[0].sentences[0]!.acceptedCategorySets[0] ?? [])]) await key(page.getByRole('button', { name: categories[category], exact: true }));
  await key(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  await expect(page.locator('[role="status"][data-feedback-sentence]').filter({ hasText: /1번 문장/ })).toHaveAttribute('aria-live', 'polite');
  await expect(page.locator('[role="status"][data-feedback-sentence]').filter({ hasText: /1번 문장/ })).toHaveCount(1);
  await completeEvidence(page, 1);
  await key(page.getByRole('button', { name: '교차 조사 시작', exact: true }));

  await assertStage(page, '교차 조사');
  await noSeriousAxe(page);
  const initial = await selectComparison(page);
  await key(page.getByRole('button', { name: '비교 완료', exact: true }));
  await assertStage(page, '교차 조사');
  await noSeriousAxe(page);
  await expect(page.getByRole('heading', { name: '처음 생각' })).toBeVisible();
  await expect(page.getByRole('button', { name: '추가 기록 열기', exact: true })).toHaveClass(/gi-pulse/);
  await key(page.getByRole('button', { name: '추가 기록 열기', exact: true }));
  await noSeriousAxe(page);

  const changed = pack.comparisonOptions.find((option) => option.validFor.includes('shared-fact') && option.id !== initial[0]!.option.id)!;
  const shared = page.getByRole('group', { name: '공통 사실' });
  await key(shared.getByRole('checkbox', { name: initial[0]!.option.label, exact: true }), 'Space');
  await key(shared.getByRole('checkbox', { name: changed.label, exact: true }), 'Space');
  const changedEvidence = new Set(changed.evidenceSentenceIds);
  for (const sentenceId of changedEvidence) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) });
    if (!(await checkbox.isChecked())) await key(checkbox, 'Space');
  }
  await key(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)}`) }), 'Space');
  await noSeriousAxe(page);

  await key(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await key(page.getByRole('button', { name: '관점 전환 시작', exact: true }));
  await assertStage(page, '관점 전환');
  await noSeriousAxe(page);
  const rule = pack.rewriteRules[0]!;
  await key(page.getByRole('radio', { name: pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName }), 'Space');
  await key(page.getByRole('radio', { name: audiences[rule.audienceId] }), 'Space');
  await key(page.getByRole('radio', { name: purposes[rule.purposeId] }), 'Space');
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) {
    const block = pack.rewriteBlocks.find((item) => item.id === blockId);
    if (!block) throw new Error(`No rewrite block ${blockId}`);
    await key(page.locator('.rewrite-block').filter({ hasText: block.text }).getByRole('button', { name: /^블록 넣기/ }));
  }
  await key(page.getByRole('button', { name: '관점 전환 완료', exact: true }));
  await assertStage(page, '사건 보고서');
  await noSeriousAxe(page);
  await expect(page.getByRole('heading', { name: '오늘 배운 점' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '다음에 해 볼 일' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '오늘 배운 점' }).locator('..')).toContainText('위치·관심·목적');
  await expect(page.getByRole('heading', { name: '다음에 해 볼 일' }).locator('..')).toContainText('무엇을 추측했지?');
  await expect(page.locator('main')).not.toContainText(/\b(?:mut|psb|cna|lws)-[a-z0-9-]+\b/);
  await expect(page.locator('.gi-pulse')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/점수|승자|winner|score/i);

  for (const [triggerName, dialogName] of [
    ['읽기 설정', '읽기 설정'],
    ['업데이트 내역', '업데이트 내역'],
    ['교사용 활동 요약', '교사용 활동 요약'],
  ] as const) {
    const trigger = page.getByRole('button', { name: triggerName, exact: true });
    await key(trigger);
    const dialog = page.getByRole('dialog', { name: dialogName });
    await expect(dialog).toBeVisible();
    await noSeriousAxe(page);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }

  const resetTrigger = page.getByRole('button', { name: '다른 사건 접수', exact: true });
  await key(resetTrigger);
  const resetDialog = page.getByRole('dialog', { name: '현재 기록을 지울까요?' });
  await expect(resetDialog).toBeVisible();
  await noSeriousAxe(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Escape');
  await expect(resetDialog).toHaveCount(0);
  await expect.poll(() => page.locator('.case-report__background').getAttribute('inert')).toBeNull();
  await expect(resetTrigger).toBeFocused();
});

test('keeps tablet progress and utility controls readable at the desktop breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 761, height: 900 });
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();

  const utility = page.locator('.utility-group');
  const progress = page.locator('.progress');
  await expect(utility).toBeVisible();
  await expect(progress).toBeVisible();

  const [utilityBox, progressBox] = await Promise.all([utility.boundingBox(), progress.boundingBox()]);
  expect(utilityBox).not.toBeNull();
  expect(progressBox).not.toBeNull();
  const intersects = Boolean(utilityBox && progressBox && !(
    utilityBox.x + utilityBox.width <= progressBox.x ||
    progressBox.x + progressBox.width <= utilityBox.x ||
    utilityBox.y + utilityBox.height <= progressBox.y ||
    progressBox.y + progressBox.height <= utilityBox.y
  ));
  expect(intersects).toBe(false);

  const caseRows = await page.locator('.case-choice').evaluateAll((elements) => (
    new Set(elements.map((element) => Math.round(element.getBoundingClientRect().top))).size
  ));
  expect(caseRows).toBe(2);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
