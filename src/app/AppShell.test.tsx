import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { playgroundStorageBox } from '../content/cases/playgroundStorageBox';
import { clubNoticePoster } from '../content/cases/clubNoticePoster';
import { createInitialSession } from '../domain/sessionReducer';
import { SAVED_MEMO_KEY, SESSION_KEY } from '../domain/sessionPersistence';
import type { CaseSession, StorageAdapter } from '../model/session';
import { AppShell } from './AppShell';

afterEach(cleanup);

const completeReportSession = (): CaseSession => ({
  ...createInitialSession(),
  caseId: missingUmbrellaTag.id,
  stage: 'report',
  comparisonPhase: 'revised',
  initialHypothesis: 'seen-information',
  readNarratorIds: missingUmbrellaTag.narrators.map((narrator) => narrator.id),
  evidenceSelections: Object.fromEntries(
    missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences).map((sentence) => [sentence.id, {
      sentenceId: sentence.id,
      categoryIds: [...sentence.acceptedCategorySets[0]!],
      selectedSegmentIds: sentence.segments.map((segment) => segment.id),
    }]),
  ),
  initialComparison: {
    sharedFactOptionIds: ['mut-comparison-umbrella'],
    differentExpressionOptionIds: ['mut-comparison-inference'],
    missingInformationOptionIds: ['mut-comparison-owner-blind-spot'],
    supportingSentenceIds: ['mut-a-1', 'mut-b-1', 'mut-a-4', 'mut-b-3'],
  },
  revealedRecordIds: ['mut-r-2', 'mut-r-3', 'mut-r-4'],
  revisedComparison: {
    sharedFactOptionIds: ['mut-comparison-moved'],
    differentExpressionOptionIds: ['mut-comparison-inference'],
    missingInformationOptionIds: ['mut-comparison-return-blind-spot'],
    supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3', 'mut-b-2'],
  },
  revisionEvidenceSentenceIds: ['mut-a-4'],
  rewriteDraft: {
    targetNarratorId: 'umbrella-owner', audienceId: 'classmate', purposeId: 'report', blockIds: ['mut-block-moved-a', 'mut-block-tag-a'],
  },
});

describe('AppShell', () => {
  beforeEach(() => sessionStorage.clear());

  it('orients the learner, then advances from intake only after a hypothesis', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    expect(screen.getByRole('heading', { name: '관점 렌즈 사건실' })).toBeInTheDocument();
    const intakeHeading = screen.getByRole('heading', { name: '사건 접수' });
    expect(intakeHeading).toHaveAttribute('data-stage-heading');
    expect(intakeHeading).toHaveFocus();
    expect(screen.getByText('모든 사건과 인물은 가상입니다.', { exact: true })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /사건 선택/ })).toHaveLength(4);
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /운동장 정리 상자 사건 선택/ }));
    await user.click(screen.getByRole('radio', { name: /보이는 정보/ }));
    await user.click(screen.getByRole('button', { name: '사건 렌즈 열기' }));

    const lensesHeading = screen.getByRole('heading', { name: '렌즈 A/B' });
    expect(lensesHeading).toHaveAttribute('data-stage-heading');
    expect(lensesHeading).toHaveFocus();
    expect(sessionStorage.getItem('perspective-lens:session:v1')).toContain('"stage":"lenses"');
  });

  it('shows a storage warning without blocking the learner flow', async () => {
    const user = userEvent.setup();
    const failingStorage: StorageAdapter = {
      getItem: () => null,
      setItem: () => { throw new Error('storage blocked'); },
      removeItem: () => undefined,
    };
    render(<AppShell storage={failingStorage} />);

    await user.click(screen.getByRole('button', { name: /운동장 정리 상자 사건 선택/ }));

    expect(screen.getByText('진행 상황을 이 기기에 저장하지 못했습니다. 활동은 계속할 수 있습니다.', { exact: true })).toBeInTheDocument();
    await user.click(screen.getByRole('radio', { name: /보이는 정보/ }));
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toBeEnabled();
  });

  it('records evidence through the AppShell reducer and persists the normalized selection', async () => {
    const user = userEvent.setup();
    const sentence = playgroundStorageBox.narrators[0].sentences[0]!;
    const evidenceSession = {
      ...createInitialSession(),
      caseId: playgroundStorageBox.id,
      stage: 'evidence' as const,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(evidenceSession));
    render(<AppShell />);

    const card = document.querySelector<HTMLElement>(`[data-sentence-id="${sentence.id}"]`);
    expect(card).not.toBeNull();
    await user.click(within(card!).getByRole('button', { name: /문장 1/ }));
    await user.click(screen.getByRole('button', { name: '관찰 사실' }));
    await user.click(screen.getByRole('button', { name: '근거 표시하기' }));

    await waitFor(() => {
      const persisted = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof evidenceSession;
      expect(persisted.evidenceSelections[sentence.id]).toEqual({
        sentenceId: sentence.id,
        categoryIds: ['observation'],
        selectedSegmentIds: sentence.segments.map((segment) => segment.id),
      });
    });
  });

  it('connects comparison save and reveal controls to the reducer actions', async () => {
    const user = userEvent.setup();
    const comparisonSession = {
      ...createInitialSession(),
      caseId: missingUmbrellaTag.id,
      stage: 'comparison' as const,
      comparisonPhase: 'initial' as const,
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(comparisonSession));
    render(<AppShell />);

    const selectOption = (group: string, optionId: string) => {
      const fieldset = screen.getByRole('group', { name: group });
      const checkbox = fieldset.querySelector<HTMLInputElement>(`[data-option-id="${optionId}"]`);
      if (!checkbox) throw new Error(`비교 옵션을 찾지 못했습니다: ${optionId}`);
      return user.click(checkbox);
    };
    await selectOption('공통 사실', 'mut-comparison-umbrella');
    await selectOption('다른 표현', 'mut-comparison-inference');
    await selectOption('빠진 정보', 'mut-comparison-owner-blind-spot');
    for (const checkbox of screen.getAllByRole('checkbox', { name: /근거 문장/ })) await user.click(checkbox);
    await user.click(screen.getByRole('button', { name: '비교 완료' }));

    await waitFor(() => {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof comparisonSession & { initialComparison: unknown };
      expect(saved.comparisonPhase).toBe('reveal');
      expect(saved.initialComparison).not.toBeNull();
    });
    expect(screen.queryByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '추가 기록 열기' }));
    await waitFor(() => {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof comparisonSession & { revealedRecordIds: string[] };
      expect(saved.comparisonPhase).toBe('revised');
      expect(saved.revealedRecordIds).toHaveLength(3);
    });
    expect(screen.getByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).toBeInTheDocument();

    const comparisonGroup = screen.getByRole('group', { name: '공통 사실' });
    await user.click(comparisonGroup.querySelector<HTMLInputElement>('[data-option-id="mut-comparison-umbrella"]')!);
    await user.click(comparisonGroup.querySelector<HTMLInputElement>('[data-option-id="mut-comparison-moved"]')!);
    await user.click(screen.getByRole('checkbox', { name: /이유 문장.*mut-a-4/ }));
    const saveRevision = screen.getByRole('button', { name: '수정 비교 완료' });
    expect(saveRevision).toBeEnabled();
    await user.click(saveRevision);

    await waitFor(() => {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof comparisonSession & {
        revisedComparison: { sharedFactOptionIds: string[] };
        revisionEvidenceSentenceIds: string[];
      };
      expect(saved.revisedComparison.sharedFactOptionIds).toEqual(['mut-comparison-moved']);
      expect(saved.revisionEvidenceSentenceIds).toEqual(['mut-a-4']);
    });
    expect(screen.getByRole('button', { name: '관점 전환 시작' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '관점 전환 시작' }));
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '관점 전환' })).toBeInTheDocument();
      const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as typeof comparisonSession;
      expect(saved.stage).toBe('rewrite');
    });
  });

  it('connects rewrite draft, completion, and memo to the same supplied adapter', async () => {
    const user = userEvent.setup();
    const data = new Map<string, string>();
    const storage: StorageAdapter = {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => { data.set(key, value); },
      removeItem: (key) => { data.delete(key); },
    };
    data.set(SESSION_KEY, JSON.stringify({ ...createInitialSession(), caseId: clubNoticePoster.id, stage: 'rewrite' }));
    render(<AppShell storage={storage} />);

    await user.click(screen.getByRole('radio', { name: '나래' }));
    await user.click(screen.getByRole('radio', { name: '같은 반 친구' }));
    await user.click(screen.getByRole('radio', { name: '사실 보고' }));
    const available = screen.getByRole('list', { name: '사용 가능한 블록' });
    for (const blockId of clubNoticePoster.rewriteRules[0]!.acceptedExampleBlockSets[0]!) {
      const item = available.querySelector(`[data-block-id="${blockId}"]`);
      expect(item).not.toBeNull();
      await user.click(within(item as HTMLElement).getByRole('button', { name: new RegExp(`블록 넣기.*${blockId}`) }));
    }
    await waitFor(() => {
      const saved = JSON.parse(data.get(SESSION_KEY) ?? '{}') as { rewriteDraft: { blockIds: string[] } };
      expect(saved.rewriteDraft.blockIds).toEqual([...clubNoticePoster.rewriteRules[0]!.acceptedExampleBlockSets[0]!]);
    });
    expect(screen.getByRole('button', { name: '관점 전환 완료' })).toHaveClass('gi-pulse');

    const memo = screen.getByRole('textbox', { name: '개인 메모' });
    await user.type(memo, '이 메모는 명시적으로 저장할 때만 남아요.');
    expect(data.has(SAVED_MEMO_KEY)).toBe(false);
    await user.click(screen.getByRole('button', { name: '이 기기에 메모 저장' }));
    expect(data.get(SAVED_MEMO_KEY)).toBe('이 메모는 명시적으로 저장할 때만 남아요.');
    expect(screen.getAllByRole('status').filter((status) => status.textContent?.includes('이 기기에 메모를 저장했어요.'))).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: '관점 전환 완료' }));
    await waitFor(() => expect((JSON.parse(data.get(SESSION_KEY) ?? '{}') as { stage: string }).stage).toBe('report'));
  });

  it('revisits the report through the shell without losing stored answers', async () => {
    const user = userEvent.setup();
    const session = completeReportSession();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    render(<AppShell />);

    await user.click(screen.getAllByRole('button', { name: /근거 문장 1/ })[0]!);
    await waitFor(() => expect(screen.getByRole('heading', { name: '렌즈 A/B' })).toBeInTheDocument());
    const persisted = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as CaseSession;
    expect(persisted.stage).toBe('lenses');
    expect(persisted.initialComparison).toEqual(session.initialComparison);
    expect(persisted.revisedComparison).toEqual(session.revisedComparison);
    expect(persisted.rewriteDraft).toEqual(session.rewriteDraft);
  });

  it('confirms report reset while preserving an explicitly saved memo', async () => {
    const user = userEvent.setup();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(completeReportSession()));
    sessionStorage.setItem(SAVED_MEMO_KEY, '저장해 둔 메모');
    render(<AppShell />);

    await user.click(screen.getByRole('button', { name: '다른 사건 접수' }));
    expect(JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}').stage).toBe('report');
    await user.click(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: '사건 접수' })).toBeInTheDocument());
    const persisted = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as CaseSession;
    expect(persisted).toMatchObject({ caseId: null, stage: 'intake', initialHypothesis: null });
    expect(sessionStorage.getItem(SAVED_MEMO_KEY)).toBe('저장해 둔 메모');
  });
});
