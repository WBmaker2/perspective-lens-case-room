import { expect, test, type Locator, type Page } from '@playwright/test';
import { casePacks } from '../../src/content/caseIndex';
import type { CaseId, CasePack, EvidenceCategory } from '../../src/model/case';

const CASE_IDS: readonly CaseId[] = [
  'playground-storage-box',
  'missing-umbrella-tag',
  'club-notice-poster',
  'library-window-seat',
];

const categoryLabels: Readonly<Record<EvidenceCategory, string>> = {
  observation: '관찰 사실',
  inference: '인물의 추론',
  evaluation: '평가 표현',
};
const audienceLabels: Readonly<Record<'classmate' | 'new-reader' | 'teacher', string>> = {
  classmate: '같은 반 친구',
  'new-reader': '처음 보는 독자',
  teacher: '선생님',
};
const purposeLabels: Readonly<Record<'report' | 'guide' | 'reflection', string>> = {
  report: '사실 보고',
  guide: '읽기 안내',
  reflection: '생각 돌아보기',
};

async function press(locator: Locator, key: 'Enter' | 'Space' = 'Enter') {
  await locator.focus();
  await locator.press(key);
}

export async function assertNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
}

export async function assertOneCurrentGuidance(page: Page) {
  await expect.poll(() => page.locator('.gi-pulse').count()).toBeLessThanOrEqual(1);
}

const packFor = (caseId: CaseId): CasePack => {
  const pack = casePacks.find((item) => item.id === caseId);
  if (!pack) throw new Error(`Missing case pack ${caseId}`);
  return pack;
};

async function selectRadio(page: Page, name: string | RegExp) {
  await press(page.getByRole('radio', { name }), 'Space');
}

export async function completeEvidenceWithKeyboard(page: Page, pack: CasePack) {
  const allSentences = pack.narrators.flatMap((narrator) => narrator.sentences);
  const sentenceButtons = page.getByRole('button', { name: /^문장 \d+/ });
  await expect(sentenceButtons).toHaveCount(allSentences.length);
  for (const [index, sentence] of allSentences.entries()) {
    await press(sentenceButtons.nth(index));
    for (const category of [...new Set(sentence.acceptedCategorySets[0] ?? [])]) {
      await press(page.getByRole('button', { name: categoryLabels[category], exact: true }));
    }
    if (sentence.kind === 'mixed') {
      const segments = page.getByRole('checkbox');
      await expect(segments).toHaveCount(sentence.segments.length);
      for (let segmentIndex = 0; segmentIndex < sentence.segments.length; segmentIndex += 1) {
        await press(segments.nth(segmentIndex), 'Space');
      }
    }
    const record = page.getByRole('button', { name: '근거 표시하기', exact: true });
    await expect(record).toBeEnabled();
    await expect(record).toHaveClass(/gi-pulse/);
    await assertOneCurrentGuidance(page);
    await press(record);
  }
  const proceed = page.getByRole('button', { name: '교차 조사 시작', exact: true });
  await expect(proceed).toBeEnabled();
  await expect(proceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await expect.poll(() => page.evaluate(() => {
    const value = sessionStorage.getItem('perspective-lens:session:v1');
    return value ? Object.keys(JSON.parse(value).evidenceSelections ?? {}).length : 0;
  })).toBe(allSentences.length);
  await page.reload();
  await expect(page.getByRole('heading', { name: '근거 보드' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const value = sessionStorage.getItem('perspective-lens:session:v1');
    const parsed = value ? JSON.parse(value) : {};
    return { caseId: parsed.caseId, count: Object.keys(parsed.evidenceSelections ?? {}).length };
  })).toEqual({ caseId: pack.id, count: allSentences.length });
  await assertNoHorizontalOverflow(page);
  await assertOneCurrentGuidance(page);
  await press(page.getByRole('button', { name: '교차 조사 시작', exact: true }));
}

type DraftSelection = {
  sharedFactOptionIds: string[];
  differentExpressionOptionIds: string[];
  missingInformationOptionIds: string[];
};
const draftKeys = [
  ['sharedFactOptionIds', 'shared-fact', '공통 사실'],
  ['differentExpressionOptionIds', 'different-expression', '다른 표현'],
  ['missingInformationOptionIds', 'missing-information', '빠진 정보'],
] as const;

export function firstDraft(pack: CasePack): DraftSelection {
  const result: DraftSelection = { sharedFactOptionIds: [], differentExpressionOptionIds: [], missingInformationOptionIds: [] };
  for (const [key, validFor] of draftKeys) {
    const option = pack.comparisonOptions.find((item) => item.validFor.includes(validFor));
    if (!option) throw new Error(`No ${validFor} option in ${pack.id}`);
    result[key].push(option.id);
  }
  return result;
}

export async function chooseComparison(page: Page, pack: CasePack, selection: DraftSelection) {
  for (const [key, , groupName] of draftKeys) {
    const group = page.getByRole('group', { name: groupName });
    for (const optionId of selection[key]) {
      const option = pack.comparisonOptions.find((item) => item.id === optionId);
      if (!option) throw new Error(`No option ${optionId}`);
      const checkbox = group.getByRole('checkbox', { name: option.label, exact: true });
      if (!(await checkbox.isChecked())) await press(checkbox, 'Space');
    }
  }
  const requiredSentenceIds = new Set(
    Object.values(selection).flatMap((ids) => ids.flatMap((id) => pack.comparisonOptions.find((option) => option.id === id)?.evidenceSentenceIds ?? [])),
  );
  for (const sentenceId of requiredSentenceIds) {
    const reason = page.getByRole('checkbox', { name: new RegExp(`근거 문장.*${sentenceId}`) });
    if (!(await reason.isChecked())) await press(reason, 'Space');
  }
}

export async function completeCaseWithKeyboard(page: Page, caseId: CaseId) {
  const pack = packFor(caseId);
  await page.goto('/');
  await page.evaluate(() => { sessionStorage.clear(); localStorage.clear(); });
  await page.reload();
  await expect(page.getByRole('heading', { name: '사건 접수' })).toBeVisible();
  await press(page.getByRole('button', { name: `${pack.title} 사건 선택` }));
  await selectRadio(page, /보이는 정보/);
  const intakeProceed = page.getByRole('button', { name: '사건 렌즈 열기', exact: true });
  await expect(intakeProceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(intakeProceed);

  await expect(page.getByRole('heading', { name: '렌즈 A/B' })).toBeVisible();
  const readButtons = page.getByRole('button', { name: '읽음 표시', exact: true });
  await expect(readButtons).toHaveCount(2);
  await press(readButtons.nth(0));
  await press(readButtons.nth(1));
  const importantButtons = page.getByRole('button', { name: '중요 문장 표시', exact: true });
  await press(importantButtons.nth(0));
  await press(importantButtons.nth(pack.narrators[0].sentences.length));
  const lensProceed = page.getByRole('button', { name: '근거 보드로 이동', exact: true });
  await expect(lensProceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(lensProceed);

  await expect(page.getByRole('heading', { name: '근거 보드' })).toBeVisible();
  await completeEvidenceWithKeyboard(page, pack);
  await expect(page.getByRole('heading', { name: '교차 조사' })).toBeVisible();
  const initial = firstDraft(pack);
  await chooseComparison(page, pack, initial);
  const initialProceed = page.getByRole('button', { name: '비교 완료', exact: true });
  await expect(initialProceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(initialProceed);

  await expect(page.getByRole('heading', { name: '처음 생각' })).toBeVisible();
  for (const record of pack.neutralRecords.filter((item) => item.visibility === 'reveal')) {
    await expect(page.getByRole('listitem', { name: `중립 기록 ${record.sequence}` })).toHaveCount(0);
  }
  const reveal = page.getByRole('button', { name: '추가 기록 열기', exact: true });
  await expect(reveal).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(reveal);
  for (const record of pack.neutralRecords.filter((item) => item.visibility === 'reveal')) {
    await expect(page.getByRole('listitem', { name: `중립 기록 ${record.sequence}` })).toBeVisible();
  }

  const change = draftKeys.map(([key, validFor, groupName]) => ({
    key, groupName, from: initial[key][0], to: pack.comparisonOptions.find((option) => option.validFor.includes(validFor) && option.id !== initial[key][0]),
  })).find((item) => item.to);
  if (!change?.to) throw new Error(`No alternate comparison option in ${pack.id}`);
  const changeGroup = page.getByRole('group', { name: change.groupName });
  const fromOption = pack.comparisonOptions.find((option) => option.id === change.from);
  if (!fromOption) throw new Error(`No initial option ${change.from}`);
  await press(changeGroup.getByRole('checkbox', { name: fromOption.label, exact: true }), 'Space');
  await press(changeGroup.getByRole('checkbox', { name: change.to.label, exact: true }), 'Space');
  const revised: DraftSelection = {
    sharedFactOptionIds: [...initial.sharedFactOptionIds],
    differentExpressionOptionIds: [...initial.differentExpressionOptionIds],
    missingInformationOptionIds: [...initial.missingInformationOptionIds],
  };
  revised[change.key] = [change.to.id];
  await chooseComparison(page, pack, revised);
  await press(page.getByRole('checkbox', { name: new RegExp(`이유 문장.*${pack.narrators[0].sentences[0].id}`) }), 'Space');
  const revisionProceed = page.getByRole('button', { name: '수정 비교 완료', exact: true });
  await expect(revisionProceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(revisionProceed);
  const rewriteStart = page.getByRole('button', { name: '관점 전환 시작', exact: true });
  await expect(rewriteStart).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(rewriteStart);

  await expect(page.getByRole('heading', { name: '관점 전환' })).toBeVisible();
  const rule = pack.rewriteRules[0];
  await selectRadio(page, pack.narrators.find((lens) => lens.id === rule.targetNarratorId)!.displayName);
  await selectRadio(page, audienceLabels[rule.audienceId]);
  await selectRadio(page, purposeLabels[rule.purposeId]);
  for (const blockId of rule.acceptedExampleBlockSets[0] ?? []) {
    await press(page.getByRole('button', { name: new RegExp(`블록 넣기.*${blockId}`) }));
  }
  const rewriteProceed = page.getByRole('button', { name: '관점 전환 완료', exact: true });
  await expect(rewriteProceed).toHaveClass(/gi-pulse/);
  await assertOneCurrentGuidance(page);
  await press(rewriteProceed);

  await expect(page.getByRole('heading', { name: '사건 보고서' })).toBeVisible();
  for (const heading of ['사용한 근거', '처음 생각과 수정한 생각', '관점 전환에서 유지한 사실', '남은 질문']) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await expect(page.locator('.gi-pulse')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/점수|승자|정답 점수|score|winner/i);
}

test.describe('complete four fictional cases with keyboard-only controls', () => {
  for (const caseId of CASE_IDS) {
    test(caseId, async ({ page }) => {
      await completeCaseWithKeyboard(page, caseId);
    });
  }
});
