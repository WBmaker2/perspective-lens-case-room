import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { playgroundStorageBox } from '../content/cases/playgroundStorageBox';
import { clubNoticePoster } from '../content/cases/clubNoticePoster';
import { createInitialSession } from '../domain/sessionReducer';
import { READING_PREFERENCES_KEY, SAVED_MEMO_KEY, SESSION_KEY } from '../domain/sessionPersistence';
import type { CaseSession, StorageAdapter } from '../model/session';
import { AppShell } from './AppShell';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

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
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

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
    await user.click(screen.getByRole('checkbox', { name: '이유 문장 · 가람 문장 4' }));
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
    render(<AppShell storage={storage} persistentStorage={storage} />);

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
    localStorage.setItem(SAVED_MEMO_KEY, '저장해 둔 메모');
    render(<AppShell />);

    await user.click(screen.getByRole('button', { name: '다른 사건 접수' }));
    expect(JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}').stage).toBe('report');
    await user.click(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: '사건 접수' })).toBeInTheDocument());
    const persisted = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') as CaseSession;
    expect(persisted).toMatchObject({ caseId: null, stage: 'intake', initialHypothesis: null });
    expect(localStorage.getItem(SAVED_MEMO_KEY)).toBe('저장해 둔 메모');
  });

  it('recovers an incomplete persisted report with a backward review action', async () => {
    const user = userEvent.setup();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      ...createInitialSession(),
      caseId: missingUmbrellaTag.id,
      stage: 'report',
    }));
    render(<AppShell />);

    expect(screen.getByRole('alert')).toHaveTextContent('이전 답변이 모두 확인되지 않아 보고서를 만들 수 없어요.');
    await user.click(screen.getByRole('button', { name: '이전 비교 단계 다시 확인' }));
    expect(screen.getByRole('heading', { name: '교차 조사' })).toBeInTheDocument();
  });

  it('keeps incomplete-report reset behind the same explicit confirmation', async () => {
    const user = userEvent.setup();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'report' }));
    localStorage.setItem(SAVED_MEMO_KEY, '저장해 둔 메모');
    render(<AppShell />);

    const trigger = screen.getByRole('button', { name: '다른 사건 접수' });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: '현재 기록을 지울까요?' })).toBeInTheDocument();
    expect(sessionStorage.getItem(SESSION_KEY)).toContain('"stage":"report"');
    await user.click(screen.getByRole('button', { name: '취소' }));
    expect(trigger).toHaveFocus();
    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: '사건 접수' })).toBeInTheDocument());
    expect(localStorage.getItem(SAVED_MEMO_KEY)).toBe('저장해 둔 메모');
  });

  it('keeps fixed utilities available without changing the active case session', async () => {
    const user = userEvent.setup();
    const session = completeReportSession();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    render(<AppShell />);
    const before = sessionStorage.getItem(SESSION_KEY);
    const updates = screen.getByRole('button', { name: '업데이트 내역' });
    expect(updates).toHaveAttribute('aria-haspopup', 'dialog');
    expect(updates).toHaveAttribute('aria-expanded', 'false');

    await user.click(updates);
    expect(updates).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument();
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(before);
    await user.click(screen.getByRole('button', { name: '닫기' }));
    expect(updates).toHaveFocus();

    const settings = screen.getByRole('button', { name: '읽기 설정' });
    await user.click(settings);
    await user.click(screen.getByRole('radio', { name: '22px' }));
    const shell = document.querySelector<HTMLElement>('.app-shell');
    expect(shell?.style.getPropertyValue('--reading-size')).toBe('22px');
    expect(shell?.style.getPropertyValue('--reading-line-height')).toBe('1.8');
    expect(shell?.style.getPropertyValue('--reading-width')).toBe('68ch');
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(before);
    expect(localStorage.getItem(READING_PREFERENCES_KEY)).toContain('22');
    await user.keyboard('{Escape}');
    expect(settings).toHaveFocus();
  });

  it('keeps the reset dialog exclusive from fixed utility dialogs', async () => {
    const user = userEvent.setup();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(completeReportSession()));
    render(<AppShell />);

    const resetTrigger = screen.getByRole('button', { name: '다른 사건 접수' });
    await user.click(resetTrigger);
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    expect(screen.getByRole('dialog', { name: '현재 기록을 지울까요?' })).toBeInTheDocument();
    expect(document.querySelector('.app-shell')).toHaveAttribute('inert');

    const updates = document.querySelector<HTMLButtonElement>('.utility-button[aria-controls="update-history-dialog"]');
    expect(updates).not.toBeNull();
    await user.click(updates!);
    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    expect(screen.queryByRole('dialog', { name: '업데이트 내역' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '취소' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(resetTrigger).toHaveFocus();
    expect(document.querySelector('.app-shell')).not.toHaveAttribute('inert');
  });

  it('uses separate injected session and persistent adapters', async () => {
    const user = userEvent.setup();
    const sessionData = new Map<string, string>();
    const localData = new Map<string, string>();
    const adapter = (data: Map<string, string>): StorageAdapter => ({
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => { data.set(key, value); },
      removeItem: (key) => { data.delete(key); },
    });
    sessionData.set(SESSION_KEY, JSON.stringify({ ...createInitialSession(), caseId: clubNoticePoster.id, stage: 'rewrite' }));
    render(<AppShell storage={adapter(sessionData)} persistentStorage={adapter(localData)} />);

    await user.click(screen.getByRole('button', { name: '읽기 설정' }));
    await user.click(screen.getByRole('radio', { name: '22px' }));
    expect(sessionData.has(READING_PREFERENCES_KEY)).toBe(false);
    expect(sessionData.has(SAVED_MEMO_KEY)).toBe(false);
    expect(localData.has(READING_PREFERENCES_KEY)).toBe(true);
  });

  it('opens the teacher summary without changing the learner session and restores focus on close', async () => {
    const user = userEvent.setup();
    const session = completeReportSession();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    const print = vi.spyOn(window, 'print').mockImplementation(() => undefined);
    render(<AppShell />);

    const before = sessionStorage.getItem(SESSION_KEY);
    const trigger = screen.getByRole('button', { name: '교사용 활동 요약' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).not.toHaveClass('gi-pulse');
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: '교사용 활동 요약' });
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(before);
    expect(within(dialog).getAllByRole('region').map((region) => region.getAttribute('data-guide-section'))).toEqual([
      'safety', 'overview', 'goals', 'flow', 'cases', 'rubric',
    ]);
    expect(document.querySelector('[data-print-region]')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: '인쇄하기' }));
    expect(print).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(before);
    await user.click(within(dialog).getByRole('button', { name: '닫기' }));
    expect(trigger).toHaveFocus();
    expect(sessionStorage.getItem(SESSION_KEY)).toBe(before);
  });

  it('includes selected narrator material, excludes incomplete reports, and includes complete reports', async () => {
    const user = userEvent.setup();
    const incomplete = { ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'report' as const };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(incomplete));
    const first = render(<AppShell />);
    await user.click(screen.getByRole('button', { name: '교사용 활동 요약' }));
    const incompletePrint = document.querySelector<HTMLElement>('[data-print-region]');
    expect(incompletePrint).toHaveTextContent(missingUmbrellaTag.title);
    expect(incompletePrint).toHaveTextContent('가람');
    expect(incompletePrint).toHaveTextContent('문장 1');
    expect(incompletePrint).not.toHaveAttribute('data-print-report');
    first.unmount();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(completeReportSession()));
    render(<AppShell />);
    await user.click(screen.getByRole('button', { name: '교사용 활동 요약' }));
    const completePrint = document.querySelector<HTMLElement>('[data-print-region]');
    expect(completePrint).toHaveAttribute('data-print-report', 'included');
    expect(completePrint).toHaveTextContent('사건 보고서');
    localStorage.setItem(SAVED_MEMO_KEY, '이 메모는 인쇄하면 안 됩니다.');
    expect(completePrint).not.toHaveTextContent('이 메모는 인쇄하면 안 됩니다.');
  });
});
