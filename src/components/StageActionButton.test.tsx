import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { StageActionButton } from './StageActionButton';

afterEach(() => {
  cleanup();
  document.querySelectorAll('.utility-group').forEach((utility) => utility.remove());
});

const rect = (left: number, top: number, right: number, bottom: number): DOMRect => ({
  left, top, right, bottom, x: left, y: top, width: right - left, height: bottom - top,
} as DOMRect);

function renderWithGeometry(utilityRect: DOMRect, actionRect: DOMRect) {
  const utility = document.createElement('div');
  utility.className = 'utility-group';
  document.body.append(utility);
  vi.spyOn(utility, 'getBoundingClientRect').mockReturnValue(utilityRect);
  const view = render(
    <StageActionButton disabled isCurrentRequired={false} guidanceText="다음 활동을 시작하세요." onClick={() => undefined}>
      사건 렌즈 열기
    </StageActionButton>,
  );
  const action = screen.getByRole('button', { name: '사건 렌즈 열기' });
  vi.spyOn(action, 'getBoundingClientRect').mockReturnValue(actionRect);
  const scrollIntoView = vi.fn();
  Object.defineProperty(action, 'scrollIntoView', { configurable: true, value: scrollIntoView });
  view.rerender(
    <StageActionButton disabled={false} isCurrentRequired guidanceText="다음 활동을 시작하세요." onClick={() => undefined}>
      사건 렌즈 열기
    </StageActionButton>,
  );
  return { scrollIntoView, utility };
}

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

  it('scrolls an enabled action to the center only when fixed utilities cover it', () => {
    const { scrollIntoView, utility } = renderWithGeometry(rect(12, 700, 363, 812), rect(16, 735, 359, 779));

    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center', behavior: 'auto' });
    utility.remove();
  });

  it('does not scroll an enabled action when the utility group is separate', () => {
    const { scrollIntoView, utility } = renderWithGeometry(rect(12, 700, 363, 740), rect(16, 750, 359, 794));

    expect(scrollIntoView).not.toHaveBeenCalled();
    utility.remove();
  });

  it('does not scroll a disabled action even when its geometry overlaps', () => {
    const utility = document.createElement('div');
    utility.className = 'utility-group';
    document.body.append(utility);
    vi.spyOn(utility, 'getBoundingClientRect').mockReturnValue(rect(12, 700, 363, 812));
    render(
      <StageActionButton disabled isCurrentRequired guidanceText="다음 활동을 시작하세요." onClick={() => undefined}>
        사건 렌즈 열기
      </StageActionButton>,
    );

    expect(screen.getByRole('button', { name: '사건 렌즈 열기' })).toBeDisabled();
    expect(utility).toBeInTheDocument();
    utility.remove();
  });
});
