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
      '오늘 배운 점',
      '다음에 해 볼 일',
      '남은 질문',
    ]);

    await user.click(screen.getAllByRole('button', { name: /근거 문장 1/ })[0]!);
    expect(onRevisitStage).toHaveBeenCalledWith('lenses');

    await user.click(screen.getByRole('button', { name: /처음 비교.*가람.*문장 1/ }));
    await user.click(screen.getByRole('button', { name: /수정한 비교.*가람.*문장 2/ }));
    expect(onRevisitStage).toHaveBeenCalledWith('lenses');
    expect(screen.getByText('다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다.')).toBeInTheDocument();
    expect(screen.getByText('파란 표찰은 우산 걸이 아래로 떨어져 있었다.')).toBeInTheDocument();
    expect(screen.getByText('보이는 정보를 살핀 관점')).toBeInTheDocument();
    expect(screen.queryByText('mut-f-3')).not.toBeInTheDocument();
    expect(screen.queryByText(/근거 문장 ID|연결한 근거 문장 ID|missing-umbrella/)).not.toBeInTheDocument();
    const evidenceButton = screen.getByRole('button', { name: '가람 근거 문장 4 다시 보기' });
    const reasonButton = screen.getByRole('button', { name: '가람 이유 문장 4 다시 보기' });
    expect(evidenceButton).toHaveAccessibleName('가람 근거 문장 4 다시 보기');
    expect(reasonButton).toHaveAccessibleName('가람 이유 문장 4 다시 보기');
    expect(evidenceButton).not.toHaveAccessibleName(/mut-a-4/);
    expect(reasonButton).not.toHaveAccessibleName(/mut-a-4/);
  });

  it('re-enters the exact sentence from a report reason reference', async () => {
    const user = userEvent.setup();
    const onRevisitSentence = vi.fn();
    render(
      <CaseReport
        model={model}
        pack={missingUmbrellaTag}
        onRevisitStage={vi.fn()}
        onRevisitSentence={onRevisitSentence}
        onReset={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: '오늘 배운 점' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '다음에 해 볼 일' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '가람 이유 문장 4 다시 보기' }));
    expect(onRevisitSentence).toHaveBeenCalledWith('mut-a-4');
  });

  it('namespaces print headings and keeps every ARIA reference unique', () => {
    render(
      <>
        <CaseReport model={model} pack={missingUmbrellaTag} onRevisitStage={vi.fn()} onReset={vi.fn()} />
        <CaseReport model={model} pack={missingUmbrellaTag} printMode onRevisitStage={vi.fn()} onReset={vi.fn()} />
      </>,
    );

    const normalReport = document.querySelector<HTMLElement>('.case-report:not(.case-report--print)');
    const printReport = document.querySelector<HTMLElement>('.case-report--print');
    expect(normalReport).toHaveAttribute('aria-labelledby', 'report-title');
    expect(normalReport?.querySelector('#report-title')).toHaveAttribute('data-stage-heading');
    expect(printReport).toHaveAttribute('aria-labelledby', 'teacher-print-report-title');
    expect(printReport?.querySelector('#teacher-print-report-title')).not.toHaveAttribute('data-stage-heading');

    const ids = [...document.querySelectorAll<HTMLElement>('[id]')].map((element) => element.id).filter(Boolean);
    expect(new Set(ids).size).toBe(ids.length);
    for (const element of document.querySelectorAll<HTMLElement>('[aria-labelledby]')) {
      for (const id of element.getAttribute('aria-labelledby')!.split(/\s+/)) {
        expect(document.querySelectorAll(`#${CSS.escape(id)}`)).toHaveLength(1);
      }
    }
  });

  it('uses static sentence guidance in the print copy', () => {
    render(<CaseReport model={model} pack={missingUmbrellaTag} printMode onRevisitStage={vi.fn()} onReset={vi.fn()} />);

    const printReport = document.querySelector<HTMLElement>('.case-report--print');
    expect(printReport).toHaveTextContent('인물별 문장 번호와 근거 연결 상태를 참고하세요.');
    expect(printReport).not.toHaveTextContent(/버튼을 누르세요|클릭|다시 보기/);
    expect(printReport).toHaveTextContent('가람 근거 문장 1');
    expect(printReport).toHaveTextContent('잘 연결했어요');
    expect(printReport?.querySelectorAll('.case-report__sentence-reference')).not.toHaveLength(0);
    expect(printReport?.querySelectorAll('.case-report__sentence-button')).toHaveLength(0);
    expect(printReport).not.toHaveTextContent(/근거 문장 ID|연결한 근거 문장 ID|mut-[a-z]+-[0-9]+/);
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

  it('traps reset-dialog focus and makes the report background unavailable', async () => {
    const user = userEvent.setup();
    render(<CaseReport model={model} pack={missingUmbrellaTag} onRevisitStage={vi.fn()} onReset={vi.fn()} />);

    const trigger = screen.getByRole('button', { name: '다른 사건 접수' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: '현재 기록을 지울까요?' });
    expect(screen.getByRole('button', { name: '취소' })).toHaveFocus();
    const background = document.querySelector('.case-report__background');
    expect(background).toHaveAttribute('inert');
    expect(background).toHaveAttribute('aria-hidden', 'true');

    await user.tab();
    expect(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: '취소' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: '현재 기록 지우고 새 사건 접수' })).toHaveFocus();
    expect(dialog).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
