import { describe, expect, it } from 'vitest';
import { makeCasePackFixture } from '../test/fixtures/casePackFixture';
import { missingUmbrellaTag } from '../content/cases/missingUmbrellaTag';
import { clubNoticePoster } from '../content/cases/clubNoticePoster';
import type { CaseSession, ComparisonDraft } from '../model/session';
import { caseSessionReducer, createInitialSession, getStageGate } from './sessionReducer';

const pack = makeCasePackFixture();
const resolve = () => pack;
const supportedDraftFor = (casePack = missingUmbrellaTag): ComparisonDraft => {
  const categories = ['shared-fact', 'different-expression', 'missing-information'] as const;
  const selected = categories.map((category) => casePack.comparisonOptions.find((option) => option.validFor.includes(category))!);
  return { sharedFactOptionIds: [selected[0]!.id], differentExpressionOptionIds: [selected[1]!.id], missingInformationOptionIds: [selected[2]!.id], supportingSentenceIds: [...new Set(selected.flatMap((option) => option.evidenceSentenceIds))] };
};
const evidenceSelectionsFor = (casePack: typeof pack) => casePack.narrators.flatMap((narrator) => narrator.sentences).map((sentence) => ({ sentenceId: sentence.id, categoryIds: [...sentence.acceptedCategorySets[0]!], selectedSegmentIds: sentence.segments.map((segment) => segment.id) }));
const withEvidence = (casePack: typeof pack, count = 10): CaseSession => {
  const selections = evidenceSelectionsFor(casePack).slice(0, count);
  return { ...createInitialSession(), caseId: casePack.id, stage: 'evidence', evidenceSelections: Object.fromEntries(selections.map((selection) => [selection.sentenceId, selection])) };
};

describe('caseSessionReducer', () => {
  it('evidence gate stays closed at 9, rejects revise, then opens at all 10 supported selections', () => {
    const selections = evidenceSelectionsFor(pack);
    const nine = withEvidence(pack, 9);
    expect(getStageGate(nine, pack).ready).toBe(false);
    const bad = { ...nine, evidenceSelections: { ...nine.evidenceSelections, [selections[9]!.sentenceId]: { ...selections[9]!, categoryIds: [] } } };
    expect(getStageGate(bad, pack).ready).toBe(false);
    const complete = withEvidence(pack);
    expect(getStageGate(complete, pack).ready).toBe(true);
    expect(caseSessionReducer(complete, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('comparison');
  });

  it('reveal rejects unsupported initial and invalid IDs, then succeeds with a real record', () => {
    const draft = supportedDraftFor();
    const unsupported = { ...draft, supportingSentenceIds: [] };
    const session: CaseSession = { ...createInitialSession(), caseId: missingUmbrellaTag.id, stage: 'comparison', comparisonPhase: 'reveal', initialComparison: unsupported };
    expect(caseSessionReducer(session, { type: 'REVEAL_RECORDS', recordIds: ['missing'] }, () => missingUmbrellaTag)).toBe(session);
    const ready = { ...session, initialComparison: draft };
    expect(caseSessionReducer(ready, { type: 'REVEAL_RECORDS', recordIds: ['missing'] }, () => missingUmbrellaTag)).toBe(ready);
    const revealId = missingUmbrellaTag.neutralRecords.find((record) => record.visibility === 'reveal')!.id;
    expect(caseSessionReducer(ready, { type: 'REVEAL_RECORDS', recordIds: [revealId] }, () => missingUmbrellaTag).comparisonPhase).toBe('revised');
  });

  it('revision rejects unsupported drafts and invalid reasons, then accepts supported revision', () => {
    const draft = supportedDraftFor();
    const revealId = missingUmbrellaTag.neutralRecords.find((record) => record.visibility === 'reveal')!.id;
    const session: CaseSession = { ...createInitialSession(), caseId: missingUmbrellaTag.id, initialComparison: draft, comparisonPhase: 'revised', revealedRecordIds: [revealId] };
    const unsupported = { ...draft, supportingSentenceIds: [] };
    expect(caseSessionReducer(session, { type: 'SAVE_REVISED_COMPARISON', draft: unsupported, revisionEvidenceSentenceIds: ['mut-a-4'] }, () => missingUmbrellaTag)).toBe(session);
    expect(caseSessionReducer(session, { type: 'SAVE_REVISED_COMPARISON', draft, revisionEvidenceSentenceIds: ['unknown'] }, () => missingUmbrellaTag)).toBe(session);
    expect(caseSessionReducer(session, { type: 'SAVE_REVISED_COMPARISON', draft, revisionEvidenceSentenceIds: [] }, () => missingUmbrellaTag)).toBe(session);
    expect(caseSessionReducer(session, { type: 'SAVE_REVISED_COMPARISON', draft, revisionEvidenceSentenceIds: ['mut-a-4'] }, () => missingUmbrellaTag).revisedComparison).toEqual(draft);
  });

  it('rewrite gate accepts a supported fixture set and rejects its real contradiction', () => {
    const rule = pack.rewriteRules[0];
    const draft = { targetNarratorId: rule.targetNarratorId, audienceId: rule.audienceId, purposeId: rule.purposeId, blockIds: [...rule.acceptedExampleBlockSets[0]!] };
    const session: CaseSession = { ...createInitialSession(), caseId: pack.id, stage: 'rewrite', rewriteDraft: draft };
    expect(getStageGate(session, pack).ready).toBe(true);
    expect(caseSessionReducer(session, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('report');

    const contradictoryDraft = { ...draft, blockIds: [...draft.blockIds, ...rule.contradictoryBlockIds] };
    const contradictorySession = { ...session, rewriteDraft: contradictoryDraft };
    expect(getStageGate(contradictorySession, pack).ready).toBe(false);
    expect(caseSessionReducer(contradictorySession, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('rewrite');
  });

  it('report gate reevaluates the supported rewrite instead of trusting stage', () => {
    const rule = clubNoticePoster.rewriteRules[1];
    const draft = { targetNarratorId: rule.targetNarratorId, audienceId: rule.audienceId, purposeId: rule.purposeId, blockIds: [...rule.acceptedExampleBlockSets[0]!] };
    const session: CaseSession = { ...createInitialSession(), caseId: clubNoticePoster.id, stage: 'report', rewriteDraft: { ...draft, blockIds: [] } };
    expect(getStageGate(session, clubNoticePoster).ready).toBe(false);
    expect(getStageGate({ ...session, rewriteDraft: draft }, clubNoticePoster).ready).toBe(true);
  });

  it('ADVANCE_STAGE cannot skip gates and advances a valid intake stage', () => {
    const empty = createInitialSession();
    expect(caseSessionReducer(empty, { type: 'ADVANCE_STAGE' }, resolve)).toBe(empty);
    const selected = caseSessionReducer(empty, { type: 'SELECT_CASE', caseId: pack.id }, resolve);
    const hypothesized = caseSessionReducer(selected, { type: 'SET_INITIAL_HYPOTHESIS', hypothesis: 'seen-information' }, resolve);
    expect(caseSessionReducer(hypothesized, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('lenses');
  });
  it('keeps intake gated until a case is selected and requires a hypothesis for lenses', () => {
    const initial = createInitialSession();
    expect(initial.stage).toBe('intake');
    expect(getStageGate(initial, pack).ready).toBe(false);
    const selected = caseSessionReducer(initial, { type: 'SELECT_CASE', caseId: pack.id }, resolve);
    expect(getStageGate(selected, pack)).toEqual({ ready: false, reason: 'initial-hypothesis-required' });
    expect(caseSessionReducer(selected, { type: 'ADVANCE_STAGE' }, resolve).stage).toBe('intake');
    const hypothesized = caseSessionReducer(selected, { type: 'SET_INITIAL_HYPOTHESIS', hypothesis: 'seen-information' }, resolve);
    expect(getStageGate(hypothesized, pack).ready).toBe(true);
    const next = caseSessionReducer(hypothesized, { type: 'ADVANCE_STAGE' }, resolve);
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

  it('drives every valid gate forward from intake to report without skipping', () => {
    const resolveMissing = () => missingUmbrellaTag;
    let state = caseSessionReducer(createInitialSession(), { type: 'SELECT_CASE', caseId: missingUmbrellaTag.id }, resolveMissing);
    state = caseSessionReducer(state, { type: 'SET_INITIAL_HYPOTHESIS', hypothesis: 'seen-information' }, resolveMissing);
    for (const narrator of missingUmbrellaTag.narrators) {
      state = caseSessionReducer(state, { type: 'MARK_LENS_READ', narratorId: narrator.id }, resolveMissing);
      for (const sentence of narrator.sentences) state = caseSessionReducer(state, { type: 'TOGGLE_IMPORTANT_SENTENCE', sentenceId: sentence.id }, resolveMissing);
    }
    state = caseSessionReducer(state, { type: 'ADVANCE_STAGE' }, resolveMissing);
    for (const selection of evidenceSelectionsFor(missingUmbrellaTag)) state = caseSessionReducer(state, { type: 'RECORD_EVIDENCE', selection }, resolveMissing);
    state = caseSessionReducer(state, { type: 'ADVANCE_STAGE' }, resolveMissing);
    const draft = supportedDraftFor();
    state = caseSessionReducer(state, { type: 'SAVE_INITIAL_COMPARISON', draft }, resolveMissing);
    const revealId = missingUmbrellaTag.neutralRecords.find((record) => record.visibility === 'reveal')!.id;
    state = caseSessionReducer(state, { type: 'REVEAL_RECORDS', recordIds: [revealId] }, resolveMissing);
    state = caseSessionReducer(state, { type: 'SAVE_REVISED_COMPARISON', draft, revisionEvidenceSentenceIds: [missingUmbrellaTag.narrators[0].sentences[0]!.id] }, resolveMissing);
    expect(state.revisedComparison).toEqual(draft);
    state = caseSessionReducer(state, { type: 'ADVANCE_STAGE' }, resolveMissing);
    const rule = missingUmbrellaTag.rewriteRules[0];
    state = caseSessionReducer(state, { type: 'SET_REWRITE_DRAFT', draft: { targetNarratorId: rule.targetNarratorId, audienceId: rule.audienceId, purposeId: rule.purposeId, blockIds: [...rule.acceptedExampleBlockSets[0]!] } }, resolveMissing);
    expect(getStageGate(state, missingUmbrellaTag).ready).toBe(true);
    state = caseSessionReducer(state, { type: 'ADVANCE_STAGE' }, resolveMissing);
    expect(state.stage).toBe('rewrite');
    state = caseSessionReducer(state, { type: 'ADVANCE_STAGE' }, resolveMissing);
    expect(state.stage).toBe('report');
  });
});
