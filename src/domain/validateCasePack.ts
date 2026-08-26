import type { CasePack } from '../model/case';

export type CasePackIssueCode =
  | 'duplicate-id' | 'broken-reference' | 'sentence-text-mismatch' | 'missing-category'
  | 'missing-reveal-record' | 'insufficient-alternatives' | 'unsafe-verdict-field'
  | 'invalid-date' | 'missing-review-note';

export interface CasePackValidationIssue { code: CasePackIssueCode; path: string; message: string; }

const issue = (code: CasePackIssueCode, path: string, message: string): CasePackValidationIssue => ({ code, path, message });

export const validateCasePack = (pack: CasePack): readonly CasePackValidationIssue[] => {
  const issues: CasePackValidationIssue[] = [];
  const ids = new Map<string, string>();
  const addId = (id: string, path: string) => {
    const previous = ids.get(id);
    if (previous) issues.push(issue('duplicate-id', path, `ID '${id}' duplicates ${previous}.`));
    else ids.set(id, path);
  };
  const facts = new Set<string>();
  const sentenceIds = new Set<string>();
  const narratorIds = new Set<string>();
  const blockIds = new Set<string>();
  const coveredCategories = new Set<'observation' | 'inference' | 'evaluation'>();

  pack.neutralRecords.forEach((record, index) => {
    addId(record.id, `neutralRecords[${index}].id`);
    record.factIds.forEach((id) => facts.add(id));
  });
  pack.narrators.forEach((narrator, narratorIndex) => {
    addId(narrator.id, `narrators[${narratorIndex}].id`); narratorIds.add(narrator.id);
    narrator.sentences.forEach((sentence, sentenceIndex) => {
      addId(sentence.id, `narrators[${narratorIndex}].sentences[${sentenceIndex}].id`); sentenceIds.add(sentence.id);
      if (sentence.segments.map((segment) => segment.text).join('') !== sentence.text) {
        issues.push(issue('sentence-text-mismatch', `narrators[${narratorIndex}].sentences[${sentenceIndex}]`, 'Segments must reconstruct sentence text exactly.'));
      }
      sentence.segments.forEach((segment) => coveredCategories.add(segment.category));
      sentence.segments.forEach((segment, segmentIndex) => addId(segment.id, `narrators[${narratorIndex}].sentences[${sentenceIndex}].segments[${segmentIndex}].id`));
    });
  });
  (['observation', 'inference', 'evaluation'] as const).forEach((category) => {
    if (!coveredCategories.has(category)) issues.push(issue('missing-category', 'narrators', `Evidence category '${category}' is missing.`));
  });
  pack.comparisonOptions.forEach((option, index) => addId(option.id, `comparisonOptions[${index}].id`));
  pack.rewriteBlocks.forEach((block, index) => { addId(block.id, `rewriteBlocks[${index}].id`); blockIds.add(block.id); });

  const reference = (value: string, valid: Set<string>, path: string) => {
    if (!valid.has(value)) issues.push(issue('broken-reference', path, `Reference '${value}' does not resolve.`));
  };
  pack.comparisonOptions.forEach((option, index) => option.evidenceSentenceIds.forEach((id, refIndex) => reference(id, sentenceIds, `comparisonOptions[${index}].evidenceSentenceIds[${refIndex}]`)));
  pack.neutralRecords.forEach((record, index) => record.factIds.forEach((id, refIndex) => reference(id, facts, `neutralRecords[${index}].factIds[${refIndex}]`)));
  pack.rewriteBlocks.forEach((block, index) => block.factIds.forEach((id, refIndex) => reference(id, facts, `rewriteBlocks[${index}].factIds[${refIndex}]`)));
  pack.rewriteRules.forEach((rule, index) => {
    reference(rule.targetNarratorId, narratorIds, `rewriteRules[${index}].targetNarratorId`);
    rule.requiredFactGroups.forEach((group, groupIndex) => group.forEach((id, idIndex) => reference(id, facts, `rewriteRules[${index}].requiredFactGroups[${groupIndex}][${idIndex}]`)));
    rule.contradictoryBlockIds.forEach((id, idIndex) => reference(id, blockIds, `rewriteRules[${index}].contradictoryBlockIds[${idIndex}]`));
    rule.acceptedExampleBlockSets.forEach((set, setIndex) => set.forEach((id, idIndex) => reference(id, blockIds, `rewriteRules[${index}].acceptedExampleBlockSets[${setIndex}][${idIndex}]`)));
  });
  if (pack.neutralRecords.filter((record) => record.visibility === 'reveal').length < 3) issues.push(issue('missing-reveal-record', 'neutralRecords', 'At least three reveal records are required.'));
  if (pack.comparisonOptions.length < 2) issues.push(issue('insufficient-alternatives', 'comparisonOptions', 'At least two comparison alternatives are required.'));
  const date = pack.reviewedOn;
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00Z`) : null;
  if (!parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) issues.push(issue('invalid-date', 'reviewedOn', 'reviewedOn must be a valid ISO calendar date.'));
  if (!pack.contentReviewNote.trim() || !pack.expressionRevisionNote.trim()) issues.push(issue('missing-review-note', 'reviewNotes', 'Content and expression review notes must be nonblank.'));

  const forbidden = new Set(['liar', 'truthScore', 'winner']);
  const scan = (value: unknown, path: string) => {
    if (!value || typeof value !== 'object') return;
    Object.entries(value).forEach(([key, child]) => {
      if (forbidden.has(key)) issues.push(issue('unsafe-verdict-field', `${path}.${key}`, `Forbidden verdict field '${key}'.`));
      scan(child, `${path}.${key}`);
    });
  };
  scan(pack, 'pack');
  return issues;
};
