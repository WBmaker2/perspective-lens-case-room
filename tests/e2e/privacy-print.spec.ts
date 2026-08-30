import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import { sentenceReference } from '../../src/content/learnerLabels';
import type { EvidenceCategory } from '../../src/model/case';

const BASE_ORIGIN = 'http://127.0.0.1:4173';
const pack = casePacks.find((item) => item.id === 'playground-storage-box')!;
const categoryLabels: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실', inference: '인물의 추론', evaluation: '평가 표현',
};
const audiences = { classmate: '같은 반 친구', 'new-reader': '처음 보는 독자', teacher: '선생님' } as const;
const purposes = { report: '사실 보고', guide: '읽기 안내', reflection: '생각 돌아보기' } as const;

async function press(locator: Locator, key: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(key);
}

async function reachRewrite(page: Page) {
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await press(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
  await press(page.getByRole('radio', { name: /보이는 정보/ }), 'Space');
  await press(page.getByRole('button', { name: '사건 렌즈 열기', exact: true }));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '읽음 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(0));
  await press(page.getByRole('button', { name: '중요 문장 표시', exact: true }).nth(pack.narrators[0].sentences.length - 1));
  await press(page.getByRole('button', { name: '근거 보드로 이동', exact: true }));
  const sentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  for (const sentence of sentences) {
    await press(page.getByRole('button', { name: sentenceReference(pack, sentence.id), exact: true }));
    for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) await press(page.getByRole('button', { name: categoryLabels[category], exact: true }));
    if (sentence.kind === 'mixed') {
      const segments = page.getByRole('checkbox');
      for (let segmentIndex = 0; segmentIndex < sentence.segments.length; segmentIndex += 1) await press(segments.nth(segmentIndex), 'Space');
    }
    await press(page.getByRole('button', { name: '근거 표시하기', exact: true }));
  }
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));
  const info = [
    ['shared-fact', '공통 사실'],
    ['different-expression', '다른 표현'],
    ['missing-information', '빠진 정보'],
  ] as const;
  const chosen = info.map(([validFor, groupName]) => {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`No comparison option ${validFor}`);
    return { groupName, option };
  });
  for (const { groupName, option } of chosen) await press(page.getByRole('group', { name: groupName }).getByRole('checkbox', { name: option.label, exact: true }), 'Space');
  for (const sentenceId of new Set(chosen.flatMap(({ option }) => option.evidenceSentenceIds))) await press(page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) }), 'Space');
  await press(page.getByRole('button', { name: '비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '추가 기록 열기', exact: true }));
  const changed = pack.comparisonOptions.find((option) => option.validFor.includes('shared-fact') && option.id !== chosen[0]!.option.id)!;
  const shared = page.getByRole('group', { name: '공통 사실' });
  await press(shared.getByRole('checkbox', { name: chosen[0]!.option.label, exact: true }), 'Space');
  await press(shared.getByRole('checkbox', { name: changed.label, exact: true }), 'Space');
  for (const sentenceId of new Set(changed.evidenceSentenceIds)) {
    const checkbox = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceReference(pack, sentenceId)}`) });
    if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
  }
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${sentenceReference(pack, pack.narrators[0].sentences[0]!.id)}`) }), 'Space');
  await press(page.getByRole('button', { name: '수정 비교 완료', exact: true }));
  await press(page.getByRole('button', { name: '관점 전환 시작', exact: true }));
}

async function completeReport(page: Page) {
  const rule = pack.rewriteRules[0]!;
  await press(page.getByRole('radio', { name: pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName }), 'Space');
  await press(page.getByRole('radio', { name: audiences[rule.audienceId] }), 'Space');
  await press(page.getByRole('radio', { name: purposes[rule.purposeId] }), 'Space');
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) {
    const block = pack.rewriteBlocks.find((item) => item.id === blockId);
    if (!block) throw new Error(`No rewrite block ${blockId}`);
    await press(page.locator('.rewrite-block').filter({ hasText: block.text }).getByRole('button', { name: /^문장 조각 넣기/ }));
  }
  await press(page.getByRole('button', { name: '관점 전환 완료', exact: true }));
  await expect(page.getByRole('heading', { name: '사건 보고서' })).toBeVisible();
}

test('keeps requests local and storage within the three-key privacy whitelist', async ({ page }) => {
  const requests: Array<{ url: string; resourceType: string }> = [];
  page.on('request', (request) => requests.push({ url: request.url(), resourceType: request.resourceType() }));
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  const favicon = await page.request.get(new URL('favicon.svg', page.url()).toString());
  expect(favicon.status()).toBe(200);
  expect(favicon.headers()['content-type']).toMatch(/image\/svg\+xml/i);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.locator('input[name*="name" i], input[name*="identity" i]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/학생 이름|사용자 이름|이름을 입력|실제 갈등/);
  await reachRewrite(page);
  const memo = page.getByRole('textbox', { name: '개인 메모' });
  await memo.fill('저장하지 않을 개인 메모');
  const newContext = await page.context().browser()!.newContext();
  const newPage = await newContext.newPage();
  await newPage.goto(BASE_ORIGIN);
  await expect(newPage.locator('body')).not.toContainText('저장하지 않을 개인 메모');
  await newContext.close();
  await memo.fill('저장할 메모');
  await press(page.getByRole('button', { name: '이 기기에 메모 저장', exact: true }));
  await page.reload();
  await expect(page.getByRole('textbox', { name: '개인 메모' })).toHaveValue('저장할 메모');
  await press(page.getByRole('button', { name: '저장된 메모 삭제', exact: true }));
  await expect(page.getByRole('textbox', { name: '개인 메모' })).toHaveValue('');
  const keyState = await page.evaluate(() => ({
    session: Array.from({ length: sessionStorage.length }, (_, index) => sessionStorage.key(index)),
    local: Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index)),
  }));
  expect(keyState.session).toEqual(['perspective-lens:session:v1']);
  expect(keyState.local).toEqual([]);
  for (const request of requests) {
    const url = new URL(request.url);
    expect(url.origin).toBe(new URL(page.url()).origin);
    expect(request.resourceType).not.toBe('websocket');
    expect(request.url).not.toMatch(/analytics|collect|api\/|fonts?|google|sentry/i);
  }
});

test('print media hides controls and exposes teacher guide, both lenses, and completed report', async ({ page }) => {
  await reachRewrite(page);
  await completeReport(page);
  await press(page.getByRole('button', { name: '교사용 활동 요약', exact: true }));
  await expect(page.getByRole('dialog', { name: '교사용 활동 요약' })).toBeVisible();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-print-region]')).toBeVisible();
  await expect(page.locator('[data-print-region] .teacher-guide__section')).toHaveCount(6);
  await expect(page.locator('[data-print-region] .teacher-guide__narrator')).toHaveCount(2);
  await expect(page.locator('[data-print-region] [data-print-report="included"]')).toBeVisible();
  await expect(page.locator('.app-header')).toBeHidden();
  await expect(page.locator('.progress')).toBeHidden();
  await expect(page.locator('.utility-group')).toBeHidden();
  await expect(page.locator('[data-print-region] button')).toHaveCount(0);
  await expect(page.locator('button:visible, input:visible, textarea:visible, select:visible')).toHaveCount(0);
});
