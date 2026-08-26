import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { playgroundStorageBox } from '../content/cases/playgroundStorageBox';
import { createInitialSession } from '../domain/sessionReducer';
import { SESSION_KEY } from '../domain/sessionPersistence';
import type { StorageAdapter } from '../model/session';
import { AppShell } from './AppShell';

afterEach(cleanup);

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
  });
});
