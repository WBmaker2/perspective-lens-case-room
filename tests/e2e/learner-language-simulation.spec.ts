import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import { sentenceReference } from '../../src/content/learnerLabels';
import type { EvidenceCategory } from '../../src/model/case';

const pack = casePacks.find((item) => item.id === 'playground-storage-box')!;
const categories: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실',
  inference: '인물의 추론',
  evaluation: '평가 표현',
};
const categoryInfo = [
  ['sharedFactOptionIds', 'shared-fact', '공통 사실'],
  ['differentExpressionOptionIds', 'different-expression', '다른 표현'],
  ['missingInformationOptionIds', 'missing-information', '빠진 정보'],
] as const;
const audiences = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님' } as const;
const purposes = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기' } as const;

async function press(locator: Locator, key: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(key);
}

async function resetAndOpenEvidence(page: Page) {
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await press(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('tab', { name: '렌즈 B', exact: true }));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('tab', { name: '렌즈 A', exact: true }));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
}

async function completeEvidence(page: Page, firstIndex: number) {
  const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  for (const [index, sentence] of sentences.entries()) {
    if (index < firstIndex) continue;
    await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true }));
    for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) {
      await press(page.getByRole('button', { name: categories[category], exact: true }), 'Space');
    }
    if (sentence.kind === 'mixed') {
      for (const checkbox of await page.getByRole('checkbox').all()) await press(checkbox, 'Space');
    }
    await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  }
}

type DraftSelection = {
  sharedFactOptionIds: string[];
  differentExpressionOptionIds: string[];
  missingInformationOptionIds: string[];
};

function firstDraft(): DraftSelection {
  const draft: DraftSelection = { sharedFactOptionIds: [], differentExpressionOptionIds: [], missingInformationOptionIds: [] };
  for (const [key, validFor] of categoryInfo) {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`비교 항목을 찾지 못했습니다: ${validFor}`);
    draft[key].push(option.id);
  }
  return draft;
}

async function chooseComparison(page: Page, selection: DraftSelection) {
  const selectedOptions = categoryInfo.map(([key, , groupName]) => {
    const optionId = selection[key][0];
    const option = pack.comparisonOptions.find((item) => item.id === optionId);
    if (!option) throw new Error(`비교 항목을 찾지 못했습니다: ${optionId}`);
    return { key, groupName, option };
  });
  for (const { groupName, option } of selectedOptions) {
    const checkbox = page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
  for (const sentenceId of new Set(selectedOptions.flatMap(({ option }) => option.evidenceSentenceIds))) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
}

async function completeRevisionAndRewrite(page: Page, initial: DraftSelection) {
  await press(page.getByRole('button', { name: '비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '추가 기록 열기', exact: true }));
  await expect(page.getByText('사실만 적힌 기록 · 순서대로 열림')).toBeVisible();
  const changed = categoryInfo.map(([key, validFor, groupName]) => ({
    key,
    groupName,
    from: initial[key][0],
    alternate: pack.comparisonOptions.find((option) => option.validFor.includes(validFor) && option.id !== initial[key][0]),
  })).find((item) => item.alternate);
  if (!changed?.alternate) throw new Error('대체 비교 항목을 찾지 못했습니다.');
  const group = page.getByRole('group', { name: changed.groupName });
  const from = pack.comparisonOptions.find((option) => option.id === changed.from);
  if (!from) throw new Error(`처음 비교 항목을 찾지 못했습니다: ${changed.from}`);
  await press(group.getByRole('checkbox', { name: from.label, exact: true }), 'Space');
  await press(group.getByRole('checkbox', { name: changed.alternate.label, exact: true }), 'Space');
  const revised = { ...initial, [changed.key]: [changed.alternate.id] } as DraftSelection;
  await chooseComparison(page, revised);
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)}`) }), 'Space');
  await press(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '관점 전환 시작', exact: true }));
  const rule = pack.rewriteRules[0]!;
  await press(page.getByRole('radio', { name: pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName }), 'Space');
  await press(page.getByRole('radio', { name: audiences[rule.audienceId] }), 'Space');
  await press(page.getByRole('radio', { name: purposes[rule.purposeId] }), 'Space');
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) {
    const block = pack.rewriteBlocks.find((item) => item.id === blockId);
    if (!block) throw new Error(`문장 조각을 찾지 못했습니다: ${blockId}`);
    await press(page.locator('.rewrite-block').filter({ hasText: block.text }).getByRole('button', { name: /^문장 조각 넣기/ }));
  }
  await press(page.getByRole('button', { name: '관점 전환 완료', exact: true }));
}

test('shows child-friendly language and recovers from a wrong evidence choice', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  await page.setViewportSize({ width: 375, height: 812 });
  await resetAndOpenEvidence(page);

  await expect(page.getByText('두 사람이 본 단서')).toBeVisible();
  await expect(page.getByText('문장을 고른 뒤, 사실·생각·판단 중 어디에 해당하는지 골라 보세요.')).toBeVisible();
  await expect(page.getByText(/관찰 사실: 글에서 확인한 일/)).toBeVisible();

  const first = pack.narrators[0].sentences[0]!;
  await press(page.getByRole('button', { name: sentenceReference(pack, first.id), exact: true }));
  await press(page.getByRole('button', { name: '인물의 추론', exact: true }), 'Space');
  await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  await expect(page.locator('[data-feedback-sentence]')).toContainText(first.feedback.revise);
  await press(page.getByRole('button', { name: '인물의 추론', exact: true }), 'Space');
  await press(page.getByRole('button', { name: '관찰 사실', exact: true }), 'Space');
  await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  await completeEvidence(page, 1);
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));

  await expect(page.getByText('두 글에서 공통 사실·다른 표현·빠진 정보를 찾고, 왜 그렇게 골랐는지 보여 주는 문장과 연결해 보세요.')).toBeVisible();
  await expect(page.getByText('두 글에 모두 나온 일을 골라요.')).toBeVisible();
  await expect(page.getByText('같은 일을 다르게 말한 부분을 골라요.')).toBeVisible();
  const initial = firstDraft();
  await chooseComparison(page, initial);
  await expect(page.getByRole('button', { name: '비교 완료', exact: true })).toHaveClass(/gi-pulse/);
  await completeRevisionAndRewrite(page, initial);

  await expect(page.getByRole('heading', { name: '사건 보고서' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '오늘 배운 점' }).locator('..')).toContainText('사실과 생각을 근거로 나누어 보았어요.');
  await expect(page.locator('.gi-pulse')).toHaveCount(0);
  for (const width of [640, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await expect(page.getByRole('heading', { name: '사건 보고서' })).toBeVisible();
  }
  expect(consoleErrors).toEqual([]);
});

test('keeps simulation as a documented opportunity decision, not a new runtime model', async ({ page }) => {
  await page.goto('/');
  const runtimeSignals = await page.evaluate(() => ({
    canvasCount: document.querySelectorAll('canvas').length,
    webglCanvasCount: document.querySelectorAll('canvas[data-renderer="webgl"]').length,
    sliderCount: document.querySelectorAll('[role="slider"], input[type="range"]').length,
    simulationMarkers: document.querySelectorAll('[data-simulation], [data-variable], [data-seed], [data-clock]').length,
  }));
  expect(runtimeSignals).toEqual({ canvasCount: 0, webglCanvasCount: 0, sliderCount: 0, simulationMarkers: 0 });
  await expect(page.locator('main')).not.toContainText('시뮬레이션');
});
