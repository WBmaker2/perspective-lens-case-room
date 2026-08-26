import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { casePacks } from '../../content/caseIndex';
import { updateHistory } from '../../content/updateHistory';
import { UpdateHistoryDialog } from './UpdateHistoryDialog';

afterEach(cleanup);

describe('UpdateHistoryDialog', () => {
  it('renders ten rows with case titles and no raw case IDs', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const triggerRef = { current: null };
    render(<UpdateHistoryDialog open entries={updateHistory} casePacks={casePacks} triggerRef={triggerRef} onClose={onClose} />);

    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    expect(dialog.querySelectorAll('.update-history-list__item')).toHaveLength(10);
    expect(within(dialog).getByRole('heading', { name: '운동장 정리 상자' })).toBeInTheDocument();
    expect(within(dialog).queryByText('playground-storage-box')).not.toBeInTheDocument();
    expect(within(dialog).getByText('최초 설계 문서 작성')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: '닫기' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('groups the eight case rows under four accessible case headings', () => {
    const triggerRef = { current: null };
    render(<UpdateHistoryDialog open entries={updateHistory} casePacks={casePacks} triggerRef={triggerRef} onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog', { name: '업데이트 내역' });
    const groups = within(dialog).getAllByRole('group');
    expect(groups).toHaveLength(4);
    expect(groups.map((group) => within(group).getByRole('heading').textContent)).toEqual([
      '운동장 정리 상자',
      '사라진 우산 표찰',
      '동아리 알림 포스터',
      '도서관 창가 자리',
    ]);
    for (const group of groups) {
      expect(within(group).getAllByRole('listitem')).toHaveLength(2);
      expect(within(group).getByText('콘텐츠 검수')).toBeInTheDocument();
      expect(within(group).getByText('표현 수정')).toBeInTheDocument();
    }
  });
});
