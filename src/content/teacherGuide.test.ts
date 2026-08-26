import { describe, expect, it } from 'vitest';
import { teacherGuideSections } from './teacherGuide';

describe('teacher guide content contract', () => {
  it('targets the approved audience, curriculum, duration, and learning levels', () => {
    const text = teacherGuideSections.flatMap((section) => section.items).join(' ');

    expect(text).toContain('초등 5~6학년');
    expect(text).toContain('국어');
    expect(text).toContain('30~40분');
    expect(text).toContain('[6국02-04]');
    expect(text).toContain('[6국02-02]');
    expect(text).toContain('이해');
    expect(text).toContain('적용');
    expect(text).toContain('분석');
    expect(text).toContain('창안');
    expect(text).toContain('관점이 사건을 바라보는 위치·관심·목적과 관련됨을 설명합니다.');
    expect(text).toContain('문장을 관찰 사실, 추론, 평가 표현으로 구분합니다.');
    expect(text).toContain('두 서술의 공통 사실과 서로 다른 해석을 비교합니다.');
    expect(text).toContain('같은 사실을 다른 인물의 관점에서 다시 표현합니다.');
  });

  it('keeps the six learning steps in the approved order', () => {
    const flow = teacherGuideSections.find((section) => section.id === 'flow');
    expect(flow?.items).toEqual([
      '중립 사건 기록 확인',
      '인물별 서술 읽기',
      '사실·추론·평가 표시',
      '공통점·차이점 비교',
      '빠진 정보 확인',
      '다른 관점으로 다시 쓰기',
    ]);
  });

  it('lists each case and its focal contrast', () => {
    const cases = teacherGuideSections.find((section) => section.id === 'cases');
    const text = cases?.items.join(' ') ?? '';

    expect(text).toContain('운동장 정리 상자');
    expect(text).toContain('속도와 꼼꼼함');
    expect(text).toContain('사라진 우산 표찰');
    expect(text).toContain('본 정보와 추측한 정보');
    expect(text).toContain('동아리 알림 포스터');
    expect(text).toContain('익숙한 정보와 독자에게 필요한 정보');
    expect(text).toContain('도서관 창가 자리');
    expect(text).toContain('편안함과 책 보존');
  });

  it('reproduces the three rubric levels and evidence-based multiple answers', () => {
    const rubric = teacherGuideSections.find((section) => section.id === 'rubric');
    const text = rubric?.items.join(' ') ?? '';

    for (const criterion of ['근거 구분', '관점 비교', '다시 쓰기']) {
      expect(text).toContain(`${criterion} · 3단계`);
      expect(text).toContain(`${criterion} · 2단계`);
      expect(text).toContain(`${criterion} · 1단계`);
    }
    expect(text).toContain('문장 ID 또는 문장 번호');
    expect(text).toContain('근거가 뒷받침하는 여러 답은 모두 타당');
    expect(text).toContain('총점은 계산하거나 표시하지 않습니다');
  });

  it('states fictional, emotional-safety, privacy, and no-transmission boundaries', () => {
    const safety = teacherGuideSections.find((section) => section.id === 'safety');
    const text = safety?.items.join(' ') ?? '';

    expect(text).toContain('가상의');
    expect(text).toContain('학생 이름');
    expect(text).toContain('실제 갈등');
    expect(text).toContain('개인적인 감정');
    expect(text).toContain('학교폭력');
    expect(text).toContain('범죄');
    expect(text).toContain('가족 갈등');
    expect(text).toContain('고정된 성격');
    for (const boundary of ['업로드', '서버', '로그인', 'AI 채점', '감정 분석', '원격 분석', '전송']) {
      expect(text).toContain(boundary);
    }
    expect(text).toContain('메모');
    expect(text).toContain('교사용 요약과 인쇄 자료에 포함하지 않습니다');
    expect(text).not.toMatch(/학생에게 실제 갈등을 이야기해 달라고 요청/);
    expect(text).not.toMatch(/학생의 개인적인 감정을 입력해 달라고 요청/);
  });
});
