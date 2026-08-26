import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import type { CaseSession, ComparisonDraft } from '../model/session';
import { caseSessionReducer, createInitialSession, getStageGate } from './sessionReducer';

const pack = makeCasePackFixture();
const resolve = () => pack;
const supportedDraftFor = (casePack = missingUmbrellaTag): ComparisonDraft => {
  const categories = ['shared-fact', 'different-expression', 'missing-information'] as const;
  const selected = categories.map((category) => casePack.comparisonOptions.find((option) => option.validFor.includes(category))!);
  return { sharedFactOptionIds: [selected[0]!.id], differentExpressionOptionIds: [selected[1]!.id], missingInformationOptionIds: [selected[2]!.id], supportingSentenceIds: [...new Set(selected.flatMap((option) => option.evidenceSentenceIds))] };
};

describe('caseSessionReducer', () => {
  it('keeps intake gated until a case is selected and requires a hypothesis for lenses', () => {
    const initial = createInitialSession();
    expect(initial.stage).toBe('intake');
    expect(getStageGate(initial, pack).ready).toBe(false);
    const selected = caseSessionReducer(initial, { type: 'SELECT_CASE', caseId: pack.id }, resolve);
    expect(getStageGate(selected, pack).ready).toBe(true);
    const next = caseSessionReducer(selected, { type: 'ADVANCE_STAGE' }, resolve);
    expect(next.stage).toBe('lenses');
    expect(caseSessionReducer(next, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('lenses');
  });

  it('clones and preserves initial and revised comparison snapshots', () => {
    const session: CaseSession = { ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'comparison' };
    const draft = supportedDraftFor();
    const afterInitial = caseSessionReducer(session, { type: 'SAVE_INITIAL_COMPARISON', draft }, () => missingUmbrellaTag);
    const revised = { ...draft, supportingSentenceIds: [...draft.supportingSentenceIds] };
    const revealId = missingUmbrellaTag.neutralRecords.find((record) => record.visibility === 'reveal')!.id;
    const afterReveal = caseSessionReducer(afterInitial, { type: 'REVEAL_RECORDS', recordIds: [revealId] }, () => missingUmbrellaTag);
    const afterRevision = caseSessionReducer(afterReveal, { type: 'SAVE_REVISED_COMPARISON', draft: revised, revisionEvidenceSentenceIds: ['mut-a-4'] }, () => missingUmbrellaTag);
    expect(afterRevision.initialComparison).toEqual(draft);
    expect(afterRevision.revisedComparison).toEqual(revised);
    expect(afterRevision.initialComparison).not.toBe(afterRevision.revisedComparison);
  });

  it('adds revealed records without changing the initial comparison', () => {
    const draft = supportedDraftFor();
    const session: CaseSession = { ...createInitialSession(), caseId: missingUmbrellaTag.id, comparisonPhase: 'reveal', initialComparison: draft };
    const revealId = missingUmbrellaTag.neutralRecords.find((record) => record.visibility === 'reveal')!.id;
    const next = caseSessionReducer(session, { type: 'REVEAL_RECORDS', recordIds: [revealId] }, () => missingUmbrellaTag);
    expect(next.revealedRecordIds).toEqual([revealId]);
    expect(next.initialComparison).toEqual(draft);
  });
});
