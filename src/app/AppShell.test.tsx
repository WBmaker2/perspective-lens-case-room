import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  beforeEach(() => sessionStorage.clear());

  it('orients the learner, then advances from intake only after a hypothesis', async () => {
    const user = userEvent.setup();
    render(<AppShell />);

    expect(screen.getByRole('heading', { name: '관점 렌즈 사건실' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '사건 접수' })).toHaveAttribute('data-stage-heading');
    expect(screen.getAllByRole('button', { name: /사건 선택/ })).toHaveLength(4);
    expect(screen.getByRole('button', { name: '렌즈 읽기 시작' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /운동장 정리 상자 사건 선택/ }));
    await user.click(screen.getByRole('radio', { name: /보이는 정보/ }));
    await user.click(screen.getByRole('button', { name: '렌즈 읽기 시작' }));

    expect(screen.getByRole('heading', { name: '렌즈 A/B' })).toHaveAttribute('data-stage-heading');
    expect(sessionStorage.getItem('perspective-lens:session:v1')).toContain('"stage":"lenses"');
  });
});
