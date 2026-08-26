import type { CasePack, RewriteBlock, RewriteRuleSet } from '../model/case';
import type { RewriteFeedback, FeedbackStatus } from '../model/feedback';
import type { RewriteDraft } from '../model/session';

const MESSAGES: Readonly<Record<FeedbackStatus, string>> = {
  supported: '필요한 사실을 모두 보존하고 관점에 맞게 다시 썼어요.',
  'partially-supported': '필요한 사실 일부가 빠졌어요. 빠진 사실을 더 넣어 보세요.',
  revise: '모순되거나 관점에 맞지 않는 표현이 있어요. 블록의 근거와 관점을 다시 확인해 보세요.',
};

const uniqueInOrder = (values: readonly string[]): string[] => [...new Set(values)];

const emptyFeedback = (message = MESSAGES.revise): RewriteFeedback => ({
  status: 'revise',
  preservedFactIds: [],
  missingFactGroupIndexes: [],
  contradictoryBlockIds: [],
  matchedPerspectiveTags: [],
  message,
});

const makeFeedback = (
  status: FeedbackStatus,
  preservedFactIds: readonly string[],
  missingFactGroupIndexes: readonly number[],
  contradictoryBlockIds: readonly string[],
  matchedPerspectiveTags: readonly string[],
): RewriteFeedback => ({
  status,
  preservedFactIds,
  missingFactGroupIndexes,
  contradictoryBlockIds,
  matchedPerspectiveTags,
  message: MESSAGES[status],
});

const matchingRule = (pack: CasePack, draft: RewriteDraft): RewriteRuleSet | undefined =>
  pack.rewriteRules.find(
    (rule) =>
      rule.targetNarratorId === draft.targetNarratorId &&
      rule.audienceId === draft.audienceId &&
      rule.purposeId === draft.purposeId,
  );

export function evaluateRewrite(pack: CasePack, draft: RewriteDraft): RewriteFeedback {
  const rule = matchingRule(pack, draft);
  if (!rule) return emptyFeedback();

  const blocksById = new Map(pack.rewriteBlocks.map((block) => [block.id, block]));
  const hasUnknownBlock = draft.blockIds.some((id) => !blocksById.has(id));
  const selectedBlockIds = uniqueInOrder(draft.blockIds).filter((id) => blocksById.has(id));
  const selectedBlocks = selectedBlockIds.map((id) => blocksById.get(id) as RewriteBlock);
  const preservedFactIds = uniqueInOrder(selectedBlocks.flatMap((block) => block.factIds));
  const matchedPerspectiveTags = uniqueInOrder(selectedBlocks.flatMap((block) => block.perspectiveTags));
  const disallowedPerspective = selectedBlocks.some((block) =>
    block.perspectiveTags.some((tag) => !rule.allowedPerspectiveTags.includes(tag)),
  );
  const contradictoryBlockIds = selectedBlockIds.filter((id) => rule.contradictoryBlockIds.includes(id));
  const factSet = new Set(preservedFactIds);
  const missingFactGroupIndexes = rule.requiredFactGroups.reduce<number[]>((missing, group, index) => {
    if (!group.every((factId) => factSet.has(factId))) missing.push(index);
    return missing;
  }, []);

  if (hasUnknownBlock || disallowedPerspective || contradictoryBlockIds.length > 0) {
    return makeFeedback('revise', preservedFactIds, missingFactGroupIndexes, contradictoryBlockIds, matchedPerspectiveTags);
  }
  return makeFeedback(
    missingFactGroupIndexes.length === 0 ? 'supported' : 'partially-supported',
    preservedFactIds,
    missingFactGroupIndexes,
    contradictoryBlockIds,
    matchedPerspectiveTags,
  );
}
