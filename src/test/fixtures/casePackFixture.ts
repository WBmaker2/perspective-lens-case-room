import type { CasePack, EvidenceCategory, NarrativeSentence } from '../../model/case';

const feedback = { supported: '잘 뒷받침해요.', 'partially-supported': '일부만 뒷받침해요.', revise: '다시 살펴봐요.' } as const;

const sentence = (id: string, number: number, parts: readonly [string, EvidenceCategory][], kind: NarrativeSentence['kind']): NarrativeSentence => ({
  id, number, text: parts.map(([text]) => text).join(''), kind,
  segments: parts.map(([text, category], index) => ({ id: `${id}-segment-${index + 1}`, text, category })),
  acceptedCategorySets: [parts.map(([, category]) => category)], feedback,
});

export const makeCasePackFixture = (): CasePack => {
  const firstSentences = [
    sentence('box-sentence-1', 1, [['상자에 파란 공이 보인다.', 'observation']], 'observation'),
    sentence('box-sentence-2', 2, [['이름표가 떨어져 있다.', 'observation']], 'observation'),
    sentence('box-sentence-3', 3, [['누군가 서둘렀을 것 같다.', 'inference']], 'inference'),
    sentence('box-sentence-4', 4, [['공을 먼저 챙긴 듯하다.', 'inference']], 'inference'),
    sentence('box-sentence-5', 5, [['조심히 보관해야 한다.', 'evaluation']], 'evaluation'),
  ] as const;
  const secondSentences = [
    sentence('playground-sentence-1', 1, [['상자 옆에 공이 놓여 있다.', 'observation']], 'observation'),
    sentence('playground-sentence-2', 2, [['이름표가 바닥에 있다.', 'observation']], 'observation'),
    sentence('playground-sentence-3', 3, [['친구가 찾으러 올 수 있다.', 'inference']], 'inference'),
    sentence('playground-sentence-4', 4, [['공을 돌려주는 것이 좋겠다.', 'evaluation']], 'evaluation'),
    sentence('playground-sentence-5', 5, [['그래서 상자를 닫았다.', 'observation'], ['잃어버리지 않게 하려는 뜻이다.', 'inference']], 'mixed'),
  ] as const;
  const narrators = [
    { id: 'narrator-caretaker', displayName: '정리 담당 렌즈', roleLabel: '관리자', icon: 'clipboard', borderStyle: 'solid', position: '교실 뒤 수납장', interest: '정리와 보관', purpose: '물건을 안전하게 돌려주기', sentences: firstSentences },
    { id: 'narrator-friend', displayName: '친구 렌즈', roleLabel: '친구', icon: 'ball', borderStyle: 'double', position: '운동장 옆', interest: '친구의 물건', purpose: '상황을 알려주기', sentences: secondSentences },
  ] as const;
  return {
    id: 'playground-storage-box', title: '파란 공이 든 상자', focusQuestion: '같은 사건을 다른 렌즈로 보면 무엇이 달라질까요?', focalContrast: 'seen-vs-inferred', illustrationKey: 'playground-storage-box',
    safetyNote: '모든 인물과 사건은 가상입니다.', originalFiction: true, reviewedOn: '2026-08-26', contentReviewNote: '사실과 해석을 구분하도록 검토했습니다.', expressionRevisionNote: '어린이가 이해하기 쉬운 표현으로 다듬었습니다.',
    neutralRecords: [
      { id: 'record-intake', sequence: 1, text: '파란 공과 이름표가 상자 주변에 있다.', visibility: 'intake', factIds: ['fact-ball', 'fact-tag'] },
      { id: 'record-reveal-one', sequence: 2, text: '공의 주인은 민서다.', visibility: 'reveal', factIds: ['fact-owner'] },
      { id: 'record-reveal-two', sequence: 3, text: '이름표는 바람에 떨어졌다.', visibility: 'reveal', factIds: ['fact-tag-cause'] },
      { id: 'record-reveal-three', sequence: 4, text: '민서는 방과 후에 찾으러 온다.', visibility: 'reveal', factIds: ['fact-return'] },
    ],
    narrators,
    comparisonOptions: [
      { id: 'comparison-shared', label: '공과 이름표를 본다', evidenceSentenceIds: ['box-sentence-1', 'playground-sentence-2'], validFor: ['shared-fact'] },
      { id: 'comparison-expression', label: '서둘렀다고 생각한다', evidenceSentenceIds: ['box-sentence-3'], validFor: ['different-expression', 'missing-information'] },
    ],
    rewriteBlocks: [
      { id: 'rewrite-fact-ball', text: '파란 공을 보았다.', factIds: ['fact-ball'], perspectiveTags: ['seen'] },
      { id: 'rewrite-return', text: '민서가 찾으러 온다.', factIds: ['fact-return'], perspectiveTags: ['future'] },
      { id: 'rewrite-care', text: '상자를 조심히 보관한다.', factIds: ['fact-tag'], perspectiveTags: ['care'] },
      { id: 'rewrite-infer', text: '누군가 서둘렀을 것 같다.', factIds: [], perspectiveTags: ['guess'] },
    ],
    rewriteRules: [
      { targetNarratorId: 'narrator-caretaker', audienceId: 'classmate', purposeId: 'report', requiredFactGroups: [['fact-ball'], ['fact-return']], allowedPerspectiveTags: ['seen', 'future'], contradictoryBlockIds: ['rewrite-infer'], acceptedExampleBlockSets: [['rewrite-fact-ball', 'rewrite-return'], ['rewrite-fact-ball', 'rewrite-care']] },
      { targetNarratorId: 'narrator-friend', audienceId: 'new-reader', purposeId: 'guide', requiredFactGroups: [['fact-tag'], ['fact-return']], allowedPerspectiveTags: ['seen', 'future', 'care'], contradictoryBlockIds: [], acceptedExampleBlockSets: [['rewrite-fact-ball', 'rewrite-return'], ['rewrite-care', 'rewrite-return']] },
    ],
  };
};
