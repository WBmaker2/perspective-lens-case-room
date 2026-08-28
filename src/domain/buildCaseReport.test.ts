import { describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { createInitialSession } from './sessionReducer';
import { buildCaseReport } from './buildCaseReport';
import type { CaseSession } from '../model/session';

const completeUmbrellaSession = (): CaseSession => {
  const evidenceSelections = Object.fromEntries(
    missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences).map((sentence) => [
      sentence.id,
      {
        sentenceId: sentence.id,
        categoryIds: [...sentence.acceptedCategorySets[0]!],
        selectedSegmentIds: sentence.segments.map((segment) => segment.id),
      },
    ]),
  );

  return {
    ...createInitialSession(),
    caseId: missingUmbrellaTag.id,
    stage: 'report',
    comparisonPhase: 'revised',
    initialHypothesis: 'seen-information',
    readNarratorIds: missingUmbrellaTag.narrators.map((narrator) => narrator.id),
    markedSentenceIds: ['mut-a-1', 'mut-b-1'],
    evidenceSelections,
    initialComparison: {
      sharedFactOptionIds: ['mut-comparison-umbrella'],
      differentExpressionOptionIds: ['mut-comparison-inference'],
      missingInformationOptionIds: ['mut-comparison-owner-blind-spot'],
      supportingSentenceIds: ['mut-a-1', 'mut-b-1', 'mut-a-4', 'mut-b-3', 'mut-a-4'],
    },
    revealedRecordIds: ['mut-r-2', 'mut-r-3', 'mut-r-4'],
    revisedComparison: {
      sharedFactOptionIds: ['mut-comparison-moved'],
      differentExpressionOptionIds: ['mut-comparison-inference'],
      missingInformationOptionIds: ['mut-comparison-return-blind-spot'],
      supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3', 'mut-b-2'],
    },
    revisionEvidenceSentenceIds: ['mut-a-4'],
    rewriteDraft: {
      targetNarratorId: 'umbrella-owner',
      audienceId: 'classmate',
      purposeId: 'report',
      blockIds: ['mut-block-moved-a', 'mut-block-tag-a'],
    },
  };
};

describe('buildCaseReport', () => {
  it('derives an ordered evidence-centered report without a score-like property', () => {
    const model = buildCaseReport(completeUmbrellaSession(), missingUmbrellaTag);

    expect(model.learningTakeaway).toBeTypeOf('string');
    expect(model.learningTakeaway).not.toBe('');
    expect(model.learningTakeaway).toContain('가람과 다온');
    expect(model.nextStep).toBeTypeOf('string');
    expect(model.nextStep).not.toBe('');
    expect(model.nextStep).toContain('무엇을 보았지?');
    expect(model.nextStep).toContain('무엇을 추측했지?');

    expect(model.evidence).toEqual(
      missingUmbrellaTag.narrators.flatMap((narrator) => narrator.sentences).map((sentence) => ({
        sentenceId: sentence.id,
        sentenceNumber: sentence.number,
        status: 'supported',
      })),
    );
    expect(model.initialHypothesis).toBe('seen-information');
    expect(model.initialComparison).toEqual({
      sharedFactOptionIds: ['mut-comparison-umbrella'],
      differentExpressionOptionIds: ['mut-comparison-inference'],
      missingInformationOptionIds: ['mut-comparison-owner-blind-spot'],
      supportingSentenceIds: ['mut-a-1', 'mut-b-1', 'mut-a-4', 'mut-b-3', 'mut-a-4'],
    });
    expect(model.revisedComparison).toEqual({
      sharedFactOptionIds: ['mut-comparison-moved'],
      differentExpressionOptionIds: ['mut-comparison-inference'],
      missingInformationOptionIds: ['mut-comparison-return-blind-spot'],
      supportingSentenceIds: ['mut-a-2', 'mut-b-4', 'mut-a-4', 'mut-b-3', 'mut-b-2'],
    });
    expect(model.changedOptionIds).toEqual([
      'mut-comparison-umbrella',
      'mut-comparison-moved',
      'mut-comparison-owner-blind-spot',
      'mut-comparison-return-blind-spot',
    ]);
    expect(model.revisionEvidenceSentenceIds).toEqual(['mut-a-4']);
    expect(model.preservedFactIds).toEqual(['mut-f-3', 'mut-f-2']);
    expect(model.perspectiveTags).toEqual(['seen']);
    expect(model.remainingQuestions).toContain('가람은 파란 표찰이 걸이 아래로 떨어진 것을 보지 못했다.');
    expect(model).not.toHaveProperty('score');
    expect(model).not.toHaveProperty('total');
    expect(model).not.toHaveProperty('rank');
    expect(model).not.toHaveProperty('winner');
  });

  it('clones comparison arrays for the returned report model', () => {
    const model = buildCaseReport(completeUmbrellaSession(), missingUmbrellaTag);
    const session = completeUmbrellaSession();

    expect(model.initialComparison).not.toBe(session.initialComparison);
    expect(model.revisedComparison).not.toBe(session.revisedComparison);
    expect(model.initialComparison.sharedFactOptionIds).not.toBe(session.initialComparison!.sharedFactOptionIds);
    expect(model.revisedComparison.supportingSentenceIds).not.toBe(session.revisedComparison!.supportingSentenceIds);
    const cloned = structuredClone(model);
    expect(cloned.learningTakeaway).toBe(model.learningTakeaway);
    expect(cloned.nextStep).toBe(model.nextStep);
  });

  it('throws a developer error instead of returning a partial report', () => {
    const incomplete = { ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'report' as const };

    expect(() => buildCaseReport(incomplete, missingUmbrellaTag)).toThrow(/complete case session/i);
  });

  it('requires the complete reveal-record set while accepting duplicate or reordered IDs', () => {
    const complete = completeUmbrellaSession();
    const revealIds = missingUmbrellaTag.neutralRecords
      .filter((record) => record.visibility === 'reveal')
      .map((record) => record.id);

    expect(() => buildCaseReport({ ...complete, revealedRecordIds: [] }, missingUmbrellaTag)).toThrow(/revealed records/i);
    expect(() => buildCaseReport({ ...complete, revealedRecordIds: [revealIds[0]!] }, missingUmbrellaTag)).toThrow(/revealed records/i);
    expect(() => buildCaseReport({ ...complete, revealedRecordIds: [...revealIds, 'unknown'] }, missingUmbrellaTag)).toThrow(/revealed records/i);
    expect(() => buildCaseReport({ ...complete, revealedRecordIds: [...revealIds].reverse().concat(revealIds[0]!) }, missingUmbrellaTag)).not.toThrow();
  });
});
