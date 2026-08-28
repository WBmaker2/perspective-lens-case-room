import type { CasePack, EvidenceCategory, NarrativeSentence } from '../model/case';
import type { FeedbackStatus } from '../model/feedback';

export const feedbackStatusLabels: Readonly<Record<FeedbackStatus, string>> = Object.freeze({
  supported: '잘 연결했어요',
  'partially-supported': '조금 더 연결해 봐요',
  revise: '다시 살펴봐요',
});

export const evidenceCategoryLabels: Readonly<Record<EvidenceCategory, string>> = Object.freeze({
  observation: '관찰 사실',
  inference: '인물의 추론',
  evaluation: '평가 표현',
});

export const perspectiveTagLabels: Readonly<Record<string, string>> = Object.freeze({
  seen: '보이는 정보를 살핀 관점',
  inference: '추론한 내용을 살핀 관점',
  careful: '차분하게 확인한 관점',
  neutral: '중립적으로 정리한 관점',
  sequence: '시간 순서를 살핀 관점',
  quick: '빠르게 핵심을 잡은 관점',
});

const findSentence = (pack: CasePack, sentenceId: string) => {
  for (const narrator of pack.narrators) {
    const sentence = narrator.sentences.find((item) => item.id === sentenceId);
    if (sentence) return { narrator, sentence };
  }
  return undefined;
};

export const sentenceReference = (pack: CasePack, sentenceId: string): string => {
  const found = findSentence(pack, sentenceId);
  return found ? `${found.narrator.displayName} 문장 ${found.sentence.number}` : '근거 문장';
};

export const sentenceReferences = (pack: CasePack, sentenceIds: readonly string[]): string => {
  const references = sentenceIds
    .map((sentenceId) => findSentence(pack, sentenceId))
    .filter((found): found is NonNullable<ReturnType<typeof findSentence>> => found !== undefined)
    .map(({ narrator, sentence }) => `${narrator.displayName} 문장 ${sentence.number}`);
  return references.length > 0 ? references.join(' · ') : '없음';
};

export const factReference = (pack: CasePack, factId: string): string => {
  const neutralRecord = [...pack.neutralRecords]
    .sort((left, right) => left.sequence - right.sequence)
    .find((record) => record.factIds.includes(factId));
  if (neutralRecord) return neutralRecord.text;
  return pack.rewriteBlocks.find((block) => block.factIds.includes(factId))?.text ?? '기록된 사실';
};

export const rewriteBlockReference = (pack: CasePack, blockId: string): string => (
  pack.rewriteBlocks.find((block) => block.id === blockId)?.text ?? '문장 블록'
);

export const sentenceOwner = (pack: CasePack, sentence: NarrativeSentence): string => (
  findSentence(pack, sentence.id)?.narrator.displayName ?? '서술자'
);
