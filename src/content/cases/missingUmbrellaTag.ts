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

const lensA = [
  sentence('mut-a-1', 1, [['미술실에서 나오며 노란 우산을 복도 걸이에 걸었다.', 'observation']], 'observation'),
  sentence('mut-a-2', 2, [['돌아왔을 때 내가 걸어 둔 자리는 비어 있었다.', 'observation']], 'observation'),
  sentence('mut-a-3', 3, [['조금 전 안내 담당 다온이 우산 걸이 앞에 서 있었다.', 'observation']], 'observation'),
  sentence('mut-a-4', 4, [['다온이 내 우산인 줄 모르고 다른 곳으로 옮겼을지도 모른다고 생각했다.', 'inference']], 'inference'),
  sentence('mut-a-5', 5, [['내 눈에는 우산이 갑자기 사라진 것처럼 보였다.', 'evaluation']], 'evaluation'),
] as const;

const lensB = [
  sentence('mut-b-1', 1, [['복도 우산 걸이에 이름표가 없는 노란 우산 한 개가 남아 있었다.', 'observation']], 'observation'),
  sentence('mut-b-2', 2, [['수업이 끝난 뒤에도 주인이 바로 찾으러 오지 않았다.', 'observation']], 'observation'),
  sentence('mut-b-3', 3, [['통로에 두면 누군가 부딪힐 수 있다고 생각했다.', 'inference']], 'inference'),
  sentence('mut-b-4', 4, [['나는 분실물 기록에 적고 안내 책상으로 옮겼다.', 'observation']], 'observation'),
  sentence('mut-b-5', 5, [['이름표가 없어서', 'observation'], [' 주인을 바로 알기 어려운 우산이었다.', 'inference']], 'mixed'),
] as const;

const rewriteBlocks = [
  { id: 'mut-block-moved-a', text: '우산은 복도 걸이에서 안내 책상으로 옮겨졌다.', factIds: ['mut-f-3'], perspectiveTags: ['seen'] },
  { id: 'mut-block-moved-b', text: '이름표 없는 우산을 안내 책상으로 옮겼다.', factIds: ['mut-f-3'], perspectiveTags: ['seen'] },
  { id: 'mut-block-tag-a', text: '파란 표찰은 걸이 아래로 떨어져 있었다.', factIds: ['mut-f-2'], perspectiveTags: ['seen'] },
  { id: 'mut-block-tag-b', text: '우산 표찰이 걸이 아래에 남아 있었다.', factIds: ['mut-f-2'], perspectiveTags: ['seen'] },
] as const;

export const missingUmbrellaTag: CasePack = {
  id: 'missing-umbrella-tag',
  title: '사라진 우산 표찰',
  focusQuestion: '같은 우산 장면에서 본 정보와 추론은 어떻게 다를까요?',
  focalContrast: 'seen-vs-inferred',
  illustrationKey: 'missing-umbrella-tag',
  safetyNote: '모든 인물과 사건은 가상입니다.',
  originalFiction: true,
  reviewedOn: '2026-08-26',
  contentReviewNote: '표찰 공개 순서와 본 정보·추론의 문장 근거 검수',
  expressionRevisionNote: '우산 이동을 잘못이나 절도가 아닌 정보 차이로 표현 수정',
  neutralRecords: [
    { id: 'mut-r-1', sequence: 1, text: '13:15 가람이 확인하러 왔을 때 우산 걸이 한 자리가 비어 있었다.', visibility: 'intake', factIds: ['mut-f-4'] },
    { id: 'mut-r-2', sequence: 2, text: '가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다.', visibility: 'reveal', factIds: ['mut-f-1'] },
    { id: 'mut-r-3', sequence: 3, text: '다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다.', visibility: 'reveal', factIds: ['mut-f-3'] },
    { id: 'mut-r-4', sequence: 4, text: '파란 표찰은 우산 걸이 아래로 떨어져 있었다.', visibility: 'reveal', factIds: ['mut-f-2'] },
  ],
  narrators: [
    {
      id: 'umbrella-owner', displayName: '가람', roleLabel: '우산 주인', icon: 'umbrella', borderStyle: 'solid',
      position: '미술실 복도 우산 걸이 앞', interest: '내 우산의 위치를 확인하기', purpose: '내가 본 장면과 생각을 구분해 알리기', sentences: lensA,
    },
    {
      id: 'information-helper', displayName: '다온', roleLabel: '안내 담당', icon: 'info', borderStyle: 'double',
      position: '복도 우산 걸이와 안내 책상 사이', interest: '이름표 없는 물건을 안전하게 보관하기', purpose: '본 정보에 따라 분실물을 기록하기', sentences: lensB,
    },
  ],
  comparisonOptions: [
    { id: 'mut-comparison-umbrella', label: '가람과 다온 모두 노란 우산을 보았다.', evidenceSentenceIds: ['mut-a-1', 'mut-b-1'], validFor: ['shared-fact'] },
    { id: 'mut-comparison-moved', label: '우산의 위치가 복도 걸이와 안내 책상 사이에서 달라졌다.', evidenceSentenceIds: ['mut-a-2', 'mut-b-4'], validFor: ['shared-fact'] },
    { id: 'mut-comparison-owner-blind-spot', label: '가람은 파란 표찰이 걸이 아래로 떨어진 것을 보지 못했다.', evidenceSentenceIds: ['mut-a-4'], validFor: ['missing-information'] },
    { id: 'mut-comparison-return-blind-spot', label: '다온은 가람이 곧 돌아올 계획을 알지 못했다.', evidenceSentenceIds: ['mut-b-2'], validFor: ['missing-information'] },
    { id: 'mut-comparison-inference', label: '우산이 옮겨진 까닭은 처음에는 추론으로만 연결되었다.', evidenceSentenceIds: ['mut-a-4', 'mut-b-3'], validFor: ['different-expression', 'missing-information'] },
  ],
  rewriteBlocks,
  rewriteRules: [
    {
      targetNarratorId: 'umbrella-owner', audienceId: 'classmate', purposeId: 'report',
      requiredFactGroups: [['mut-f-3'], ['mut-f-2']], allowedPerspectiveTags: ['seen', 'inference'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['mut-block-moved-a', 'mut-block-tag-a'],
        ['mut-block-moved-a', 'mut-block-tag-b'],
      ],
    },
    {
      targetNarratorId: 'information-helper', audienceId: 'new-reader', purposeId: 'reflection',
      requiredFactGroups: [['mut-f-3'], ['mut-f-2']], allowedPerspectiveTags: ['seen', 'inference'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['mut-block-moved-b', 'mut-block-tag-a'],
        ['mut-block-moved-b', 'mut-block-tag-b'],
      ],
    },
  ],
};
