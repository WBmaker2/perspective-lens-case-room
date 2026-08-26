import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StageActionButton } from './StageActionButton';

describe('StageActionButton', () => {
  it('pulses and shows guidance only for an enabled current action', () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <StageActionButton disabled={false} isCurrentRequired guidanceText="다음 활동을 시작하세요." onClick={onClick}>
        사건 렌즈 열기
      </StageActionButton>,
    );

    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toHaveClass('gi-pulse');
    expect(screen.getByText('다음 활동을 시작하세요.')).toBeVisible();

    rerender(
      <StageActionButton disabled={true} isCurrentRequired guidanceText="다음 활동을 시작하세요." onClick={onClick}>
        사건 렌즈 열기
      </StageActionButton>,
    );
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).not.toHaveClass('gi-pulse');
    expect(screen.queryByText('다음 활동을 시작하세요.')).not.toBeInTheDocument();

    rerender(
      <StageActionButton disabled={false} isCurrentRequired={false} guidanceText="다음 활동을 시작하세요." onClick={onClick}>
        사건 렌즈 열기
      </StageActionButton>,
    );
    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).not.toHaveClass('gi-pulse');
    expect(screen.queryByText('다음 활동을 시작하세요.')).not.toBeInTheDocument();
  });
});
