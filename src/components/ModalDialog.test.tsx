import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ModalDialog } from './ModalDialog';

afterEach(cleanup);

describe('ModalDialog', () => {
  it('labels the dialog, traps focus, closes on Escape, and restores its trigger', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.textContent = '열기';
    document.body.append(trigger);
    const triggerRef = { current: trigger };
    const view = (open: boolean) => render(
      <main className="app-shell">
        <button type="button" ref={(node) => { triggerRef.current = node ?? trigger; }}>열기</button>
        <ModalDialog id="settings-dialog" title="읽기 설정" open={open} triggerRef={triggerRef} onClose={onClose}>
          <button type="button">첫 번째</button>
          <button type="button">두 번째</button>
        </ModalDialog>
      </main>,
    );
    view(true);

    const dialog = screen.getByRole('dialog', { name: '읽기 설정' });
    expect(dialog).toHaveAttribute('aria-labelledby', 'settings-dialog-title');
    expect(screen.getByRole('button', { name: '닫기' })).toHaveFocus();
    expect(document.querySelector('.app-shell')).toHaveAttribute('inert');
    expect(document.querySelector('.app-shell')).toHaveAttribute('aria-hidden', 'true');

    await user.tab();
    expect(screen.getByRole('button', { name: '첫 번째' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: '두 번째' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: '닫기' })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: '두 번째' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the visible close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const triggerRef = { current: null };
    render(<ModalDialog id="history-dialog" title="업데이트 내역" open triggerRef={triggerRef} onClose={onClose}><p>내용</p></ModalDialog>);
    await user.click(screen.getByRole('button', { name: '닫기' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
