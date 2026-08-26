import type { CasePack, EvidenceCategory, NarrativeSentence } from '../../model/case';

const feedback = {
  supported: '문장의 근거를 잘 찾았어요.',
  'partially-supported': '문장 일부의 근거를 다시 살펴봐요.',
  revise: '보이는 사실과 생각을 구분해 다시 살펴봐요.',
} as const;

const sentence = (
  id: string,
  number: number,
  parts: readonly [string, EvidenceCategory][],
  kind: NarrativeSentence['kind'],
): NarrativeSentence => ({
  id,
  number,
  text: parts.map(([text]) => text).join(''),
  kind,
  segments: parts.map(([text, category], index) => ({ id: `${id}-segment-${index + 1}`, text, category })),
  acceptedCategorySets: [parts.map(([, category]) => category)],
  feedback,
});

const readerSentences = [
  sentence('lws-a-1', 1, [['나는 창가 자리에서 책을 읽고 있었고 창문은 열려 있었다.', 'observation']], 'observation'),
  sentence('lws-a-2', 2, [['바람이 들어와서', 'observation'], [' 답답하지 않고 편안했다.', 'evaluation']], 'mixed'),
  sentence('lws-a-3', 3, [['하준이 먼저 창문을 닫았다.', 'observation']], 'observation'),
  sentence('lws-a-4', 4, [['책장이 조금 흔들렸지만 책이 상할 정도는 아니라고 생각했다.', 'inference']], 'inference'),
  sentence('lws-a-5', 5, [['내게는 읽기 편한 공기를 유지하는 일이 더 중요했다.', 'evaluation']], 'evaluation'),
] as const;

const closerSentences = [
  sentence('lws-b-1', 1, [['창가 전시대의 책장이 바람에 여러 번 들렸다.', 'observation']], 'observation'),
  sentence('lws-b-2', 2, [['창문 옆에는 비 오는 날 책을 보호하려면 창문을 닫으라는 안내가 있었다.', 'observation']], 'observation'),
  sentence('lws-b-3', 3, [['빗방울이 들어오면 책이 젖을 수 있다고 판단했다.', 'inference']], 'inference'),
  sentence('lws-b-4', 4, [['나는 창문을 닫은 뒤 서윤에게 이유를 설명했다.', 'observation']], 'observation'),
  sentence('lws-b-5', 5, [['그때는 시원함보다 책을 보호하는 일이 더 급하다고 보았다.', 'evaluation']], 'evaluation'),
] as const;

const rewriteBlocks = [
  { id: 'lws-block-open-a', text: '14:00에 창문이 열려 있었다.', factIds: ['lws-f-1'], perspectiveTags: ['seen'] },
  { id: 'lws-block-open-b', text: '창가의 창문은 열려 있었다.', factIds: ['lws-f-1'], perspectiveTags: ['seen', 'neutral'] },
  { id: 'lws-block-wind-a', text: '14:04 바람에 전시 책장이 들렸다.', factIds: ['lws-f-2'], perspectiveTags: ['seen'] },
  { id: 'lws-block-wind-b', text: '바람이 불어 전시 책장이 여러 번 들렸다.', factIds: ['lws-f-2'], perspectiveTags: ['seen', 'careful'] },
  { id: 'lws-block-close-a', text: '14:05 하준이 창문을 닫았다.', factIds: ['lws-f-4'], perspectiveTags: ['seen'] },
  { id: 'lws-block-close-b', text: '하준은 창문을 닫은 뒤 이유를 설명했다.', factIds: ['lws-f-4'], perspectiveTags: ['seen', 'sequence'] },
];

export const libraryWindowSeat: CasePack = {
  id: 'library-window-seat',
  title: '도서관 창가 자리',
  focusQuestion: '편안함과 책 보존에 대한 관심은 같은 장면을 어떻게 다르게 보이게 할까요?',
  focalContrast: 'comfort-vs-preservation',
  illustrationKey: 'library-window-seat',
  safetyNote: '모든 인물과 사건은 가상입니다.',
  originalFiction: true,
  reviewedOn: '2026-08-26',
  contentReviewNote: '창문·바람·책 보호 기록과 두 서술의 시간 순서 검수',
  expressionRevisionNote: '창문 닫기를 성격 평가가 아닌 편안함과 보존의 관심 차이로 표현 수정',
  neutralRecords: [
    { id: 'lws-r-1', sequence: 1, text: '14:00 창문이 열려 있었다.', visibility: 'intake', factIds: ['lws-f-1'] },
    { id: 'lws-r-2', sequence: 2, text: '14:04 바람에 전시 책장이 들렸다.', visibility: 'reveal', factIds: ['lws-f-2'] },
    { id: 'lws-r-3', sequence: 3, text: '창문 옆에 비 오는 날 책 보호 안내가 있다.', visibility: 'reveal', factIds: ['lws-f-3'] },
    { id: 'lws-r-4', sequence: 4, text: '14:05 하준이 창문을 닫고 이어서 이유를 설명했다.', visibility: 'reveal', factIds: ['lws-f-4'] },
  ],
  narrators: [
    { id: 'window-reader', displayName: '서윤', roleLabel: '창가에서 읽던 학생', icon: 'reader', borderStyle: 'solid', position: '도서관 창가 자리', interest: '읽기 편한 공기', purpose: '편안함을 느낀 장면과 생각을 구분하기', sentences: readerSentences },
    { id: 'window-closer', displayName: '하준', roleLabel: '창문을 닫은 학생', icon: 'window', borderStyle: 'double', position: '창가 전시대 옆', interest: '책을 보존하기', purpose: '책 보호를 위해 확인한 정보와 판단을 설명하기', sentences: closerSentences },
  ],
  comparisonOptions: [
    { id: 'lws-comparison-window', label: '두 학생 모두 창문이 열려 있고 바람이 들어온 장면을 보았다.', evidenceSentenceIds: ['lws-a-1', 'lws-b-1'], validFor: ['shared-fact'] },
    { id: 'lws-comparison-interest', label: '서윤은 편안함을, 하준은 책 보존을 더 먼저 살폈다.', evidenceSentenceIds: ['lws-a-5', 'lws-b-5'], validFor: ['different-expression'] },
    { id: 'lws-comparison-range', label: '서윤은 책이 당장 상하지 않을 것이라 생각했고 하준은 젖을 가능성을 판단했다.', evidenceSentenceIds: ['lws-a-4', 'lws-b-3'], validFor: ['different-expression', 'missing-information'] },
    { id: 'lws-comparison-sequence', label: '하준은 창문을 닫은 뒤 서윤에게 이유를 설명했다.', evidenceSentenceIds: ['lws-b-4'], validFor: ['shared-fact'] },
  ],
  rewriteBlocks,
  rewriteRules: [
    {
      targetNarratorId: 'window-reader', audienceId: 'classmate', purposeId: 'report',
      requiredFactGroups: [['lws-f-1'], ['lws-f-2'], ['lws-f-4']], allowedPerspectiveTags: ['seen', 'neutral', 'careful', 'sequence'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [['lws-block-open-a', 'lws-block-wind-a', 'lws-block-close-a'], ['lws-block-open-b', 'lws-block-wind-b', 'lws-block-close-b']],
    },
    {
      targetNarratorId: 'window-closer', audienceId: 'new-reader', purposeId: 'reflection',
      requiredFactGroups: [['lws-f-1'], ['lws-f-2'], ['lws-f-4']], allowedPerspectiveTags: ['seen', 'neutral', 'careful', 'sequence'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [['lws-block-open-a', 'lws-block-wind-b', 'lws-block-close-b'], ['lws-block-open-b', 'lws-block-wind-a', 'lws-block-close-a']],
    },
  ],
};
