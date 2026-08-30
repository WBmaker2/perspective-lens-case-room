import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StageStatus } from './StageStatus';

describe('StageStatus', () => {
  it('explains the current step and the next learner action', () => {
    render(<StageStatus activeStage="intake" />);

    const status = screen.getByRole('complementary', { name: '현재 학습 단계' });
    expect(status).toHaveTextContent('현재 단계 1/6');
    expect(status).toHaveTextContent('사건 접수');
    expect(status).toHaveTextContent('사건을 고르고 첫 생각을 기록해 보세요.');
  });

  it('includes the selected case without replacing the action guidance', () => {
    render(<StageStatus activeStage="comparison" caseTitle="사라진 우산 표찰" />);

    const status = screen.getAllByRole('complementary', { name: '현재 학습 단계' }).at(-1);
    expect(status).toHaveTextContent('사라진 우산 표찰');
    expect(status).toHaveTextContent('현재 단계 4/6');
    expect(status).toHaveTextContent('두 글에서 공통 사실·다른 표현·빠진 정보를 찾아 근거 문장과 연결해 보세요.');
  });

  it('names the evidence categories in learner language', () => {
    render(<StageStatus activeStage="evidence" />);

    expect(screen.getAllByRole('complementary', { name: '현재 학습 단계' }).at(-1)).toHaveTextContent(
      '문장을 읽고, 사실·생각·판단 중 어디에 해당하는지 골라 보세요.',
    );
  });
});
