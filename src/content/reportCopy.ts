export interface ReportLearningCopy {
  takeaway: string;
  nextStep: string;
}

export function createReportLearningCopy(narratorNames: readonly string[]): ReportLearningCopy {
  const first = narratorNames[0] ?? '첫 번째 서술자';
  const second = narratorNames[1] ?? '두 번째 서술자';
  return {
    takeaway: first + '과 ' + second + '의 글을 비교하며, 같은 사건도 본 위치·관심·목적에 따라 다르게 표현할 수 있고 사실과 생각을 근거로 나눌 수 있다는 점을 배웠어요.',
    nextStep: '다음 글을 읽을 때 “무엇을 보았지?”, “무엇을 중요하게 여겼지?”, “무엇을 추측했지?”를 차례로 물어보세요.',
  };
}
