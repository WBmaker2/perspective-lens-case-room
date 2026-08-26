import type { CaseReportModel } from '../domain/buildCaseReport';
import type { CasePack } from '../model/case';

export interface TeacherGuideSection {
  id: 'overview' | 'goals' | 'flow' | 'cases' | 'rubric' | 'safety';
  heading: string;
  items: readonly string[];
}

export interface PrintViewModel {
  title: string;
  duration: '30~40분';
  sections: readonly TeacherGuideSection[];
  currentPack: CasePack | null;
  currentReport: CaseReportModel | null;
}

export const TEACHER_GUIDE_TITLE = '관점 렌즈 사건실 · 교사용 활동 요약';

/**
 * Fixed teacher-facing copy. It deliberately has no dependency on a learner
 * session or memo so that a printout remains safe to share in a classroom.
 * Safety is first in this visual list; the TypeScript union order is not a
 * presentation order.
 */
export const teacherGuideSections: readonly TeacherGuideSection[] = [
  {
    id: 'safety',
    heading: '안전·개인정보 약속',
    items: [
      '모든 사건과 인물은 가상의 이야기와 인물입니다.',
      '이 자료는 실제 인물을 평가하는 도구가 아닙니다.',
      '학생 이름을 입력하거나 공개하도록 요청하지 않습니다.',
      '실제 갈등이나 개인적인 감정을 이야기하도록 요청하지 않습니다.',
      '학교폭력·범죄·가족 갈등을 미션으로 삼지 않습니다.',
      '인물에게 고정된 성격 꼬리표를 붙이지 않습니다.',
      '학생 글·사진·파일을 업로드하지 않으며 서버·로그인 없이 활동합니다.',
      'AI 채점이나 감정 분석을 하지 않습니다.',
      '원격 분석을 하지 않으며 활동 내용을 외부로 전송하지 않습니다.',
      '학생이 적은 메모 텍스트는 교사용 요약과 인쇄 자료에 포함하지 않습니다.',
      '점수나 총점은 계산하거나 표시하지 않으며, 근거가 뒷받침하는 여러 답은 모두 타당할 수 있습니다.',
    ],
  },
  {
    id: 'overview',
    heading: '활동 개요',
    items: [
      '대상: 초등 5~6학년',
      '교과: 국어',
      '권장 시간: 30~40분',
      '핵심 질문: 같은 사건도 말하는 사람의 위치와 관심에 따라 어떻게 다르게 표현될까요?',
      '독창적인 가상 이야기에서 두 인물의 서술을 읽고, 근거를 연결해 관점의 차이를 비교합니다.',
    ],
  },
  {
    id: 'goals',
    heading: '교육과정·학습 목표',
    items: [
      '[6국02-04] 글에 나타난 관점이나 내용의 차이를 비교하며 읽고 문제 해결에 활용하기',
      '[6국02-02] 글의 맥락과 표현을 바탕으로 생략되거나 드러나지 않은 내용을 추론하기',
      '이해: 관점이 사건을 바라보는 위치·관심·목적과 관련됨을 설명합니다.',
      '적용: 문장을 관찰 사실, 추론, 평가 표현으로 구분합니다.',
      '분석: 두 서술의 공통 사실과 서로 다른 해석을 비교합니다.',
      '창안: 같은 사실을 다른 인물의 관점에서 다시 표현합니다.',
    ],
  },
  {
    id: 'flow',
    heading: '활동 흐름',
    items: [
      '중립 사건 기록 확인',
      '인물별 서술 읽기',
      '사실·추론·평가 표시',
      '공통점·차이점 비교',
      '빠진 정보 확인',
      '다른 관점으로 다시 쓰기',
    ],
  },
  {
    id: 'cases',
    heading: '사건 카드와 초점',
    items: [
      '운동장 정리 상자 — 속도와 꼼꼼함',
      '사라진 우산 표찰 — 본 정보와 추측한 정보',
      '동아리 알림 포스터 — 익숙한 정보와 독자에게 필요한 정보',
      '도서관 창가 자리 — 편안함과 책 보존',
    ],
  },
  {
    id: 'rubric',
    heading: '관찰 루브릭과 답 안내',
    items: [
      '근거 구분 · 3단계: 사실·추론·평가를 문장 부분까지 구분합니다.',
      '근거 구분 · 2단계: 문장 단위로 대체로 구분합니다.',
      '근거 구분 · 1단계: 느낌으로만 판단합니다.',
      '관점 비교 · 3단계: 위치·관심·빠진 정보를 함께 설명합니다.',
      '관점 비교 · 2단계: 차이 한 가지를 설명합니다.',
      '관점 비교 · 1단계: 한 인물의 옳고 그름만 판단합니다.',
      '다시 쓰기 · 3단계: 사실을 유지하며 관점 표현을 바꿉니다.',
      '다시 쓰기 · 2단계: 일부 사실이 빠지지만 관점은 드러납니다.',
      '다시 쓰기 · 1단계: 원문을 거의 그대로 복사합니다.',
      '답을 안내할 때는 문장 ID 또는 문장 번호를 확인하고, 그 근거로 생각의 연결을 설명합니다.',
      '본문 문장의 근거가 뒷받침하는 여러 답은 모두 타당할 수 있습니다. 하나의 절대 정답을 제시하지 않습니다. 총점은 계산하거나 표시하지 않습니다.',
    ],
  },
] as const;

export const TEACHER_GUIDE_SECTIONS = teacherGuideSections;

export function createPrintViewModel(
  currentPack: CasePack | null,
  currentReport: CaseReportModel | null,
): PrintViewModel {
  return {
    title: TEACHER_GUIDE_TITLE,
    duration: '30~40분',
    sections: teacherGuideSections,
    currentPack,
    currentReport,
  };
}

export const buildPrintViewModel = createPrintViewModel;
