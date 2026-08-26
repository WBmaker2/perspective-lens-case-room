import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { casePacks } from '../../content/caseIndex';
import { createInitialSession } from '../../domain/sessionReducer';
import type { CaseSession } from '../../model/session';
import { CaseIntake } from './CaseIntake';

describe('CaseIntake', () => {
  it('lets a learner choose one fictional case and an initial hypothesis', async () => {
    const user = userEvent.setup();
    let session: CaseSession = createInitialSession();
    const onSelectCase = (caseId: CaseSession['caseId']) => {
      if (caseId) session = { ...createInitialSession(), caseId };
    };
    const onSelectHypothesis = (hypothesis: NonNullable<CaseSession['initialHypothesis']>) => {
      session = { ...session, initialHypothesis: hypothesis };
    };
    const onContinue = () => undefined;
    const view = () => (
      <CaseIntake
        casePacks={casePacks}
        session={session}
        onSelectCase={onSelectCase}
        onSelectHypothesis={onSelectHypothesis}
        onContinue={onContinue}
      />
    );
    const { rerender, container } = render(view());

    expect(screen.getAllByRole('button', { name: /사건 선택/ })).toHaveLength(4);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /운동장 정리 상자 사건 선택/ }));
    rerender(view());

    expect(screen.getByRole('img', { name: /운동장 정리 상자/ })).toBeInTheDocument();
    const timeline = screen.getByRole('list', { name: '시간 기록' });
    expect(within(timeline).getAllByRole('listitem')).toHaveLength(4);
    expect(within(timeline).getByText('15:20 정리 종이 울렸다.')).toBeInTheDocument();
    expect(within(timeline).getAllByText('교차 조사 뒤 공개', { exact: true })).toHaveLength(3);
    casePacks[0]!.neutralRecords.filter((record) => record.visibility === 'reveal').forEach((record) => {
      expect(container.textContent).not.toContain(record.text);
    });

    expect(screen.getByText(casePacks[0]!.focusQuestion)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(container.querySelectorAll('input[type="text"], input[type="file"], textarea')).toHaveLength(0);
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toBeDisabled();
    expect(container.querySelectorAll('.gi-pulse')).toHaveLength(0);

    await user.click(screen.getByRole('radio', { name: /보이는 정보/ }));
    rerender(view());
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toBeEnabled();
    expect(container.querySelectorAll('.gi-pulse')).toHaveLength(1);
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toHaveClass('gi-pulse');
  });
});
