import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressSteps } from './ProgressSteps';

describe('ProgressSteps', () => {
  it('keeps six stages in a wrapping, non-interactive orientation', () => {
    render(<ProgressSteps activeStage="lenses" />);

    const list = screen.getByRole('list', { name: '학습 단계' });
    expect(list).toHaveClass('progress__list', 'progress__list--wrap');
    expect(within(list).getAllByRole('listitem')).toHaveLength(6);
    expect(list.querySelectorAll('a, button, [tabindex]')).toHaveLength(0);
    expect(within(list).getByText('렌즈 A/B', { exact: true }).parentElement).toHaveAttribute('aria-current', 'step');
  });

  it('marks stages before the current step as complete without changing the current step', () => {
    render(<ProgressSteps activeStage="comparison" />);

    const items = within(screen.getAllByRole('list', { name: '학습 단계' })[1]!).getAllByRole('listitem');
    expect(items.slice(0, 3).every((item) => item.getAttribute('data-complete') === 'true')).toBe(true);
    expect(items[3]).not.toHaveAttribute('data-complete');
    expect(items[3]).toHaveAttribute('aria-current', 'step');
    expect(items[0]).toHaveAccessibleName('사건 접수 · 완료');
    expect(items[3]).toHaveAccessibleName('교차 조사 · 진행 중');
  });
});
