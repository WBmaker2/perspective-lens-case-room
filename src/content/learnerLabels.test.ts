import { describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from './cases/missingUmbrellaTag';
import type { NarrativeSentence } from '../model/case';
import {
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
    expect(rewriteBlockReference(missingUmbrellaTag, 'unknown-id')).toBe('문장 블록');
    expect(evidenceCategoryLabels.observation).toBe('관찰 사실');
    expect(perspectiveTagLabels.seen).toBe('보이는 정보를 살핀 관점');
  });
});
