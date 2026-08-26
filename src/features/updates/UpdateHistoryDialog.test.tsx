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
    expect(within(dialog).getAllByRole('listitem')).toHaveLength(10);
    expect(within(dialog).getAllByText('운동장 정리 상자')).toHaveLength(2);
    expect(within(dialog).queryByText('playground-storage-box')).not.toBeInTheDocument();
    expect(within(dialog).getByText('최초 설계 문서 작성')).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: '닫기' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
