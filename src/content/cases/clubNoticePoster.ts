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

const makerSentences = [
  sentence('cnp-a-1', 1, [['나는 별빛 동아리 모임을 알리려고 월요일에 포스터를 붙였다.', 'observation']], 'observation'),
  sentence('cnp-a-2', 2, [['포스터에는 이번 주 금요일 방과 후라고 썼다.', 'observation']], 'observation'),
  sentence('cnp-a-3', 3, [['망원경 그림을 크게 넣어', 'observation'], [' 동아리 이름이 잘 보인다고 생각했다.', 'evaluation']], 'mixed'),
  sentence('cnp-a-4', 4, [['늘 과학실에서 모였으니 장소는 모두 알 것이라고 여겼다.', 'inference']], 'inference'),
  sentence('cnp-a-5', 5, [['색이 선명해서 필요한 정보가 충분한 포스터라고 보았다.', 'evaluation']], 'evaluation'),
] as const;

const readerSentences = [
  sentence('cnp-b-1', 1, [['월요일 점심시간에 복도에서 그 포스터를 처음 봤다.', 'observation']], 'observation'),
  sentence('cnp-b-2', 2, [['포스터에는 금요일 방과 후라는 말과 망원경 그림이 있었다.', 'observation']], 'observation'),
  sentence('cnp-b-3', 3, [['정확한 날짜와 모이는 교실은 적혀 있지 않았다.', 'observation']], 'observation'),
  sentence('cnp-b-4', 4, [['망원경 그림만으로는', 'observation'], [' 어느 동아리인지 바로 알기 어렵다고 생각했다.', 'evaluation']], 'mixed'),
  sentence('cnp-b-5', 5, [['처음 보는 사람에게는 설명이 조금 더 필요한 포스터였다.', 'evaluation']], 'evaluation'),
] as const;

const rewriteBlocks = [
  { id: 'cnp-block-date-a', text: '이번 주 금요일인 2026년 8월 28일 방과 후에 모인다.', factIds: ['cnp-f-2', 'cnp-f-3'], perspectiveTags: ['seen'] },
  { id: 'cnp-block-date-b', text: '2026년 8월 28일 금요일 방과 후에 별빛 동아리 모임이 있다.', factIds: ['cnp-f-2', 'cnp-f-3'], perspectiveTags: ['seen'] },
  { id: 'cnp-block-place-a', text: '모임 장소는 과학실이다.', factIds: ['cnp-f-4'], perspectiveTags: ['seen'] },
  { id: 'cnp-block-place-b', text: '금요일 방과 후에는 과학실에서 모인다.', factIds: ['cnp-f-2', 'cnp-f-4'], perspectiveTags: ['seen'] },
] as const;

export const clubNoticePoster: CasePack = {
  id: 'club-notice-poster',
  title: '동아리 알림 포스터',
  focusQuestion: '익숙한 사람과 처음 보는 사람에게 필요한 정보는 어떻게 다를까요?',
  focalContrast: 'familiar-vs-new-reader',
  illustrationKey: 'club-notice-poster',
  safetyNote: '모든 인물과 사건은 가상입니다.',
  originalFiction: true,
  reviewedOn: '2026-08-26',
  contentReviewNote: '포스터의 표시 정보와 독자 배경 정보 연결 검수',
  expressionRevisionNote: '정보 부족을 만든 학생의 능력 비난이 아닌 독자 관점 차이로 표현 수정',
  neutralRecords: [
    { id: 'cnp-r-1', sequence: 1, text: '월요일에 별빛 동아리 포스터가 복도에 붙었다.', visibility: 'intake', factIds: ['cnp-f-1'] },
    { id: 'cnp-r-2', sequence: 2, text: '포스터에는 이번 주 금요일 방과 후라는 말과 망원경 그림이 있다.', visibility: 'reveal', factIds: ['cnp-f-2'] },
    { id: 'cnp-r-3', sequence: 3, text: '이번 주 금요일은 2026년 8월 28일이다.', visibility: 'reveal', factIds: ['cnp-f-3'] },
    { id: 'cnp-r-4', sequence: 4, text: '기존 동아리원은 늘 과학실에서 모였다.', visibility: 'reveal', factIds: ['cnp-f-4'] },
  ],
  narrators: [
    {
      id: 'poster-maker', displayName: '나래', roleLabel: '포스터를 만든 학생', icon: 'poster', borderStyle: 'solid',
      position: '복도 게시판 앞', interest: '동아리 모임을 알리기', purpose: '포스터에 넣은 정보와 그 이유를 돌아보기', sentences: makerSentences,
    },
    {
      id: 'first-reader', displayName: '보람', roleLabel: '처음 본 학생', icon: 'reader', borderStyle: 'double',
      position: '복도 게시판 앞', interest: '처음 보는 포스터에서 모임 정보를 찾기', purpose: '처음 보는 독자에게 필요한 정보를 확인하기', sentences: readerSentences,
    },
  ],
  comparisonOptions: [
    { id: 'cnp-comparison-shared', label: '두 학생 모두 금요일 방과 후와 망원경 그림을 포스터에서 보았다.', evidenceSentenceIds: ['cnp-a-2', 'cnp-b-2'], validFor: ['shared-fact'] },
    { id: 'cnp-comparison-expression', label: '나래는 색과 그림을 강조했고 보람은 날짜와 교실 정보를 찾았다.', evidenceSentenceIds: ['cnp-a-3', 'cnp-b-3'], validFor: ['different-expression'] },
    { id: 'cnp-comparison-room', label: '과학실은 기존 동아리원에게 익숙하지만 처음 보는 보람에게는 드러나지 않은 정보였다.', evidenceSentenceIds: ['cnp-a-4', 'cnp-b-3'], validFor: ['missing-information'] },
    { id: 'cnp-comparison-date', label: '포스터의 이번 주 금요일이라는 표현만으로는 처음 보는 사람에게 정확한 날짜가 부족하다.', evidenceSentenceIds: ['cnp-a-2', 'cnp-b-3'], validFor: ['missing-information'] },
  ],
  rewriteBlocks,
  rewriteRules: [
    {
      targetNarratorId: 'poster-maker', audienceId: 'classmate', purposeId: 'report',
      requiredFactGroups: [['cnp-f-2', 'cnp-f-3'], ['cnp-f-4']], allowedPerspectiveTags: ['seen'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['cnp-block-date-a', 'cnp-block-place-a'],
        ['cnp-block-date-b', 'cnp-block-place-b'],
      ],
    },
    {
      targetNarratorId: 'first-reader', audienceId: 'new-reader', purposeId: 'guide',
      requiredFactGroups: [['cnp-f-2', 'cnp-f-3'], ['cnp-f-4']], allowedPerspectiveTags: ['seen'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['cnp-block-date-a', 'cnp-block-place-b'],
        ['cnp-block-date-b', 'cnp-block-place-a'],
      ],
    },
  ],
};
