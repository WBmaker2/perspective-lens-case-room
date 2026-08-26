import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import type { CaseSession, ComparisonDraft } from '../model/session';
import { caseSessionReducer, createInitialSession, getStageGate } from './sessionReducer';

const pack = makeCasePackFixture();
const resolve = () => pack;
const supportedDraft: ComparisonDraft = {
  sharedFactOptionIds: ['comparison-shared'], differentExpressionOptionIds: [], missingInformationOptionIds: [],
  supportingSentenceIds: ['box-sentence-1', 'playground-sentence-2'],
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
    const session: CaseSession = { ...createInitialSession(), caseId: pack.id, stage: 'comparison' };
    const afterInitial = caseSessionReducer(session, { type: 'SAVE_INITIAL_COMPARISON', draft: supportedDraft }, resolve);
    const revised = { ...supportedDraft, supportingSentenceIds: [...supportedDraft.supportingSentenceIds] };
    const afterRevision = caseSessionReducer(afterInitial, { type: 'SAVE_REVISED_COMPARISON', draft: revised, revisionEvidenceSentenceIds: ['box-sentence-1'] }, resolve);
    expect(afterRevision.initialComparison).toEqual(supportedDraft);
    expect(afterRevision.revisedComparison).toEqual(revised);
    expect(afterRevision.initialComparison).not.toBe(afterRevision.revisedComparison);
  });

  it('adds revealed records without changing the initial comparison', () => {
    const session: CaseSession = { ...createInitialSession(), caseId: pack.id, initialComparison: supportedDraft };
    const next = caseSessionReducer(session, { type: 'REVEAL_RECORDS', recordIds: ['record-reveal-one'] }, resolve);
    expect(next.revealedRecordIds).toEqual(['record-reveal-one']);
    expect(next.initialComparison).toEqual(supportedDraft);
  });
});
