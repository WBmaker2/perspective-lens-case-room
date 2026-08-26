import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { missingUmbrellaTag } from '../../content/cases/missingUmbrellaTag';
import { buildCaseReport } from '../../domain/buildCaseReport';
import type { CaseReportModel } from '../../domain/buildCaseReport';
import { createInitialSession } from '../../domain/sessionReducer';
import { CaseReport } from './CaseReport';

const model: CaseReportModel = buildCaseReport({
  ...createInitialSession(),
  caseId: missingUmbrellaTag.id,
  stage: 'report',
  comparisonPhase: 'revised',
  initialHypothesis: 'seen-information',
  evidenceSelections: Object.fromEntries(
    missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences).map((sentence) => [sentence.id, {
      sentenceId: sentence.id,
      categoryIds: [...sentence.acceptedCategorySets[0]!],
      selectedSegmentIds: sentence.segments.map((segment) => segment.id),
    }]),
  ),
  initialComparison: {
    sharedFactOptionIds: ['mut-comparison-umbrella'],
    differentExpressionOptionIds: ['mut-comparison-inference'],
    missingInformationOptionIds: ['mut-comparison-owner-blind-spot'],
    supportingSentenceIds: ['mut-a-1', 'mut-b-1', 'mut-a-4', 'mut-b-3'],
  },
  revisedComparison: {
    sharedFactOptionIds: ['mut-comparison-moved'],
    differentExpressionOptionIds: ['mut-comparison-inference'],
    missingInformationOptionIds: ['mut-comparison-return-blind-spot'],
    supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3', 'mut-b-2'],
  },
  revealedRecordIds: ['mut-r-2', 'mut-r-3', 'mut-r-4'],
  revisionEvidenceSentenceIds: ['mut-a-4'],
  rewriteDraft: {
    targetNarratorId: 'umbrella-owner', audienceId: 'classmate', purposeId: 'report', blockIds: ['mut-block-moved-a', 'mut-block-tag-a'],
  },
}, missingUmbrellaTag);

describe('CaseReport', () => {
  afterEach(cleanup);

  it('renders the four ordered report sections and revisits evidence by stage', async () => {
    const user = userEvent.setup();
    const onRevisitStage = vi.fn();
    const onReset = vi.fn();
    render(<CaseReport model={model} pack={missingUmbrellaTag} onRevisitStage={onRevisitStage} onReset={onReset} />);

    const headings = screen.getAllByRole('heading').map((heading) => heading.textContent);
    expect(headings).toEqual([
      '사건 보고서',
      '사용한 근거',
      '처음 생각과 수정한 생각',
      '관점 전환에서 유지한 사실',
      '남은 질문',
    ]);

    await user.click(screen.getAllByRole('button', { name: /근거 문장 1/ })[0]!);
    expect(onRevisitStage).toHaveBeenCalledWith('lenses');
  });

  it('opens a cancellable reset dialog and only resets after explicit confirmation', async () => {
    const user = userEvent.setup();
    const onRevisitStage = vi.fn();
    const onReset = vi.fn();
    render(<CaseReport model={model} pack={missingUmbrellaTag} onRevisitStage={onRevisitStage} onReset={onReset} />);

    const trigger = screen.getByRole('button', { name: '다른 사건 접수' });
    await user.click(trigger);
    expect(onReset).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: '현재 기록을 지울까요?' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '취소' }));
    expect(onReset).not.toHaveBeenCalled();
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    await user.click(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
