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
  sentence('psb-a-1', 1, [['정리 종이 울린 뒤 온유가 공 두 개를 상자 쪽으로 가져왔다.', 'observation']], 'observation'),
  sentence('psb-a-2', 2, [['나는 젖은 줄넘이가 다른 물건을 적실까 봐', 'inference'], [' 옆 바구니에 따로 넣었다.', 'observation']], 'mixed'),
  sentence('psb-a-3', 3, [['온유는 마지막 공을 가지러 다시 운동장 끝으로 갔다.', 'observation']], 'observation'),
  sentence('psb-a-4', 4, [['정리 표를 확인하지 않고 서두르면 상자가 다시 흐트러질 것 같았다.', 'inference']], 'inference'),
  sentence('psb-a-5', 5, [['그래서 오늘 정리는 빠르기보다 꼼꼼함이 더 중요했다.', 'evaluation']], 'evaluation'),
] as const;

const lensB = [
  sentence('psb-b-1', 1, [['정리 종이 울리자 나는 공 두 개를 들고 상자로 갔다.', 'observation']], 'observation'),
  sentence('psb-b-2', 2, [['해솔은 상자 앞에서 줄넘이를 ', 'observation'], ['한참', 'evaluation'], [' 들여다보고 있었다.', 'observation']], 'mixed'),
  sentence('psb-b-3', 3, [['나는 운동장 끝에 남은 공 하나를 가지러 뛰어갔다.', 'observation']], 'observation'),
  sentence('psb-b-4', 4, [['해솔이 빨리 넣지 못해서', 'evaluation'], [' 정리가 늦어지는 줄 알았다.', 'inference']], 'mixed'),
  sentence('psb-b-5', 5, [['그때는 먼저 모두 상자에 넣는 것이 더 효율적이라고 생각했다.', 'evaluation']], 'evaluation'),
] as const;

const sharedFactBlocks = [
  { id: 'psb-block-bell-a', text: '정리 종이 울린 뒤였다.', factIds: ['psb-f-1'], perspectiveTags: ['seen', 'careful'] },
  { id: 'psb-block-bell-b', text: '정리 종이 울리자 상자로 갔다.', factIds: ['psb-f-1'], perspectiveTags: ['seen', 'quick'] },
  { id: 'psb-block-objects-a', text: '공 두 개를 상자 쪽으로 가져왔다.', factIds: ['psb-f-2'], perspectiveTags: ['seen', 'careful'] },
  { id: 'psb-block-objects-b', text: '공 두 개를 들고 상자로 갔다.', factIds: ['psb-f-2'], perspectiveTags: ['seen', 'quick'] },
  { id: 'psb-block-rope-a', text: '젖은 줄넘이를 옆 바구니에 따로 넣었다.', factIds: ['psb-f-3'], perspectiveTags: ['seen', 'careful'] },
  { id: 'psb-block-rope-b', text: '젖은 줄넘이는 옆 바구니로 분리되었다.', factIds: ['psb-f-3'], perspectiveTags: ['seen', 'neutral'] },
  { id: 'psb-block-rope-c', text: '젖은 줄넘이를 옆 바구니에 넣었다.', factIds: ['psb-f-3'], perspectiveTags: ['seen', 'quick'] },
];

export const playgroundStorageBox: CasePack = {
  id: 'playground-storage-box',
  title: '운동장 정리 상자',
  focusQuestion: '같은 정리 장면에서 빠르기와 꼼꼼함은 어떻게 다르게 보일까요?',
  focalContrast: 'priority',
  illustrationKey: 'playground-storage-box',
  safetyNote: '모든 인물과 사건은 가상입니다.',
  originalFiction: true,
  reviewedOn: '2026-08-26',
  contentReviewNote: '중립 기록과 10개 문장의 사실·추론·평가 연결 검수',
  expressionRevisionNote: '빠르기와 꼼꼼함을 우열이 아닌 관심 차이로 표현 수정',
  neutralRecords: [
    { id: 'psb-r-1', sequence: 1, text: '15:20 정리 종이 울렸다.', visibility: 'intake', factIds: ['psb-f-1'] },
    { id: 'psb-r-2', sequence: 2, text: '온유가 공 두 개와 운동장 끝의 공 하나를 가져왔다.', visibility: 'reveal', factIds: ['psb-f-2'] },
    { id: 'psb-r-3', sequence: 3, text: '해솔이 젖은 줄넘이를 옆 바구니로 분리하고 표찰을 확인했다.', visibility: 'reveal', factIds: ['psb-f-3'] },
    { id: 'psb-r-4', sequence: 4, text: '15:27 상자 뚜껑이 닫혔다.', visibility: 'reveal', factIds: ['psb-f-4'] },
  ],
  narrators: [
    {
      id: 'cleanup-lead', displayName: '해솔', roleLabel: '정리 담당', icon: 'clipboard', borderStyle: 'solid',
      position: '운동장 정리 상자 앞', interest: '물건을 안전하게 정리하기', purpose: '정리 표와 물건 상태를 확인하기', sentences: lensA,
    },
    {
      id: 'last-player', displayName: '온유', roleLabel: '놀이를 마친 학생', icon: 'ball', borderStyle: 'double',
      position: '운동장 끝과 상자 사이', interest: '남은 공을 찾아 정리를 마치기', purpose: '빠르게 물건을 상자에 넣기', sentences: lensB,
    },
  ],
  comparisonOptions: [
    { id: 'psb-comparison-shared-bell', label: '정리 종이 울린 뒤 정리 행동이 시작되었다.', evidenceSentenceIds: ['psb-a-1', 'psb-b-1'], validFor: ['shared-fact'] },
    { id: 'psb-comparison-shared-objects', label: '공을 상자 쪽으로 가져갔다.', evidenceSentenceIds: ['psb-a-1', 'psb-b-1'], validFor: ['shared-fact'] },
    { id: 'psb-comparison-care', label: '물건이 젖지 않도록 살피는 데 관심이 있다.', evidenceSentenceIds: ['psb-a-2', 'psb-b-2'], validFor: ['different-expression', 'missing-information'] },
    { id: 'psb-comparison-speed', label: '먼저 모두 넣는 빠르기에 관심이 있다.', evidenceSentenceIds: ['psb-a-5', 'psb-b-5'], validFor: ['different-expression', 'missing-information'] },
    { id: 'psb-comparison-missing-effort', label: '온유가 먼 공을 가지러 간 노력은 해솔의 설명에 드러나지 않는다.', evidenceSentenceIds: ['psb-b-3'], validFor: ['missing-information'] },
  ],
  rewriteBlocks: sharedFactBlocks,
  rewriteRules: [
    {
      targetNarratorId: 'cleanup-lead', audienceId: 'classmate', purposeId: 'report',
      requiredFactGroups: [['psb-f-1'], ['psb-f-2'], ['psb-f-3']],
      allowedPerspectiveTags: ['seen', 'careful', 'neutral'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['psb-block-bell-a', 'psb-block-objects-a', 'psb-block-rope-a'],
        ['psb-block-bell-a', 'psb-block-objects-a', 'psb-block-rope-b'],
      ],
    },
    {
      targetNarratorId: 'last-player', audienceId: 'new-reader', purposeId: 'reflection',
      requiredFactGroups: [['psb-f-1'], ['psb-f-2'], ['psb-f-3']],
      allowedPerspectiveTags: ['seen', 'quick', 'neutral'], contradictoryBlockIds: [],
      acceptedExampleBlockSets: [
        ['psb-block-bell-b', 'psb-block-objects-b', 'psb-block-rope-b'],
        ['psb-block-bell-b', 'psb-block-objects-b', 'psb-block-rope-c'],
      ],
    },
  ],
};
