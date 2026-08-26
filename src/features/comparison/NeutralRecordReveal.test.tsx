import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { missingUmbrellaTag } from '../../content/cases/missingUmbrellaTag';
import { NeutralRecordReveal } from './NeutralRecordReveal';

afterEach(cleanup);

describe('NeutralRecordReveal', () => {
  it('orders records by sequence and announces the revealed text politely', () => {
    const records = [...missingUmbrellaTag.neutralRecords].filter((record) => record.visibility === 'reveal').reverse();
    render(<NeutralRecordReveal records={records} labelledBy="neutral-title" />);

    expect(screen.getByRole('region', { name: '추가 기록' })).toHaveAttribute('aria-labelledby', 'neutral-title');
    expect(screen.getAllByRole('listitem', { name: /중립 기록/ }).map((item) => item.textContent)).toEqual([
      '02가람은 미술실에서 나오며 노란 우산을 복도 걸이에 두었다.',
      '03다온은 이름표 없는 우산을 분실물 기록에 적고 안내 책상으로 옮겼다.',
      '04파란 표찰은 우산 걸이 아래로 떨어져 있었다.',
    ]);
    expect(screen.getByRole('status', { name: '추가 기록 안내' })).toHaveAttribute('aria-live', 'polite');
  });
});
