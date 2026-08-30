import { describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from './cases/missingUmbrellaTag';
import type { NarrativeSentence } from '../model/case';
import {
  comparisonCategoryGuidance,
  evidenceCategoryGuidance,
  evidenceCategoryLabels,
  factReference,
  feedbackStatusLabels,
  perspectiveTagLabels,
  rewriteBlockReference,
  sentenceOwner,
  sentenceReference,
  sentenceReferences,
} from './learnerLabels';

describe('learner labels', () => {
  it('turns a sentence ID into a narrator and sentence number', () => {
    expect(sentenceReference(missingUmbrellaTag, 'mut-a-4')).toBe('가람 문장 4');
    expect(sentenceReference(missingUmbrellaTag, 'unknown-id')).toBe('근거 문장');
  });

  it('uses Korean feedback labels instead of domain status tokens', () => {
    expect(feedbackStatusLabels.supported).toBe('잘 연결했어요');
    expect(feedbackStatusLabels['partially-supported']).toBe('조금 더 연결해 봐요');
    expect(feedbackStatusLabels.revise).toBe('다시 살펴봐요');
  });

  it('formats evidence, perspective, fact, and block references for learners', () => {
    expect(sentenceReferences(missingUmbrellaTag, ['mut-a-4', 'mut-b-3'])).toBe('가람 문장 4 · 다온 문장 3');
    expect(sentenceReferences(missingUmbrellaTag, [])).toBe('없음');
    expect(sentenceOwner(missingUmbrellaTag, missingUmbrellaTag.narrators[1].sentences[0]!)).toBe('다온');
    const unknownSentence: NarrativeSentence = { ...missingUmbrellaTag.narrators[1].sentences[0]!, id: 'unknown-id' };
    expect(sentenceOwner(missingUmbrellaTag, unknownSentence)).toBe('서술자');
    expect(factReference(missingUmbrellaTag, 'mut-f-3')).toBe('다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다.');
    expect(factReference(missingUmbrellaTag, 'unknown-id')).toBe('기록된 사실');
    expect(rewriteBlockReference(missingUmbrellaTag, 'mut-block-tag-a')).toBe('파란 표찰은 걸이 아래로 떨어져 있었다.');
    expect(rewriteBlockReference(missingUmbrellaTag, 'unknown-id')).toBe('문장 조각');
    expect(evidenceCategoryLabels.observation).toBe('관찰 사실');
    expect(evidenceCategoryGuidance.observation).toEqual({
      label: '관찰 사실',
      description: '글에서 확인한 일을 말해요.',
    });
    expect(evidenceCategoryGuidance.inference.description).toBe('보인 정보로 이어서 생각한 내용이에요.');
    expect(evidenceCategoryGuidance.evaluation.description).toBe('좋다·중요하다처럼 판단이 담긴 말이에요.');
    expect(comparisonCategoryGuidance.sharedFactOptionIds).toEqual({
      label: '공통 사실',
      description: '두 글에 모두 나온 일을 골라요.',
      validFor: 'shared-fact',
    });
    expect(comparisonCategoryGuidance.differentExpressionOptionIds.description).toBe('같은 일을 다르게 말한 부분을 골라요.');
    expect(comparisonCategoryGuidance.missingInformationOptionIds.description).toBe('한 글에만 나와 다른 글에는 빠진 일을 골라요.');
    expect(perspectiveTagLabels.seen).toBe('보이는 정보를 살핀 관점');
  });
});
