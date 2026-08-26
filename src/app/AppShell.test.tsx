import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import type { StorageAdapter } from '../model/session';
import { AppShell } from './AppShell';

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
    expect(screen.getByRole('button', { name: '렌즈 읽기 시작' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /운동장 정리 상자 사건 선택/ }));
    await user.click(screen.getByRole('radio', { name: /보이는 정보/ }));
    await user.click(screen.getByRole('button', { name: '렌즈 읽기 시작' }));

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
    expect(screen.getByRole('button', { name: '렌즈 읽기 시작' })).toBeEnabled();
  });
});
