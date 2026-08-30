import { describe, expect, it } from 'vitest';
import { createReportLearningCopy } from './reportCopy';

describe('createReportLearningCopy', () => {
  it('names the two narrators and gives a next reading routine', () => {
    const copy = createReportLearningCopy(['가람', '다온']);

    expect(copy.takeaway).toContain('가람과 다온');
    expect(copy.takeaway).toContain('위치·관심·목적');
    expect(copy.takeaway).toContain('사실과 생각을 근거로 나누어 보았어요.');
    expect(copy.takeaway.split('. ')).toHaveLength(2);
    expect(copy.nextStep).toContain('무엇을 보았지?');
    expect(copy.nextStep).toContain('무엇을 추측했지?');
  });
});
