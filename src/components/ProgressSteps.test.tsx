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
});
