import { createElement } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressSteps } from '../components/ProgressSteps';
import { safetyCopy } from './safetyCopy';

describe('safety copy and progress orientation', () => {
  it('keeps the fictional, non-evaluative learning boundary explicit', () => {
    expect(safetyCopy.fictionalCase).toBe('모든 사건과 인물은 가상입니다.');
    expect(safetyCopy.notForRealPeople).toBe('실제 인물을 평가하는 도구가 아닙니다.');
    expect(safetyCopy.multipleSupportedAnswers).toBe('근거가 있는 여러 답을 인정합니다.');
  });

  it('shows six named stages with one current stage', () => {
    render(createElement(ProgressSteps, { activeStage: 'lenses' }));

    expect(screen.getByRole('list', { name: '학습 단계' })).toBeInTheDocument();
    ['사건 접수', '렌즈 A/B', '근거 보드', '교차 조사', '관점 전환', '사건 보고서'].forEach((label) => {
      expect(screen.getByText(label, { exact: true })).toBeInTheDocument();
    });
    expect(document.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
    expect(screen.getByText('렌즈 A/B', { exact: true }).parentElement).toHaveAttribute('aria-current', 'step');
  });
});
