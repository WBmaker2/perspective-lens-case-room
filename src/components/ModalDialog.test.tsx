import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef } from 'react';
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

  it('does not move focus to a trigger on the initial closed mount', () => {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.textContent = '열기';
    document.body.append(trigger);
    const triggerRef = { current: trigger };
    function StageHeading() {
      const headingRef = useRef<HTMLHeadingElement>(null);
      useEffect(() => headingRef.current?.focus(), []);
      return <h1 ref={headingRef} data-stage-heading tabIndex={-1}>사건 접수</h1>;
    }
    render(
      <main className="app-shell">
        <StageHeading />
        <ModalDialog id="closed-dialog" title="닫힌 대화상자" open={false} triggerRef={triggerRef} onClose={vi.fn()}>
          <button type="button">첫 번째</button>
        </ModalDialog>
      </main>,
    );

    expect(screen.getByRole('heading', { name: '사건 접수' })).toHaveFocus();
  });

  it('keeps the background locked until the last open instance closes', () => {
    const firstTriggerRef = { current: null };
    const secondTriggerRef = { current: null };
    const shell = document.createElement('main');
    shell.className = 'app-shell';
    shell.setAttribute('inert', '');
    shell.setAttribute('aria-hidden', 'false');
    document.body.append(shell);
    const view = render(
      <>
        <ModalDialog id="first-dialog" title="첫 대화상자" open triggerRef={firstTriggerRef} onClose={vi.fn()}>
          <button type="button">첫 번째 확인</button>
        </ModalDialog>
        <ModalDialog id="second-dialog" title="둘째 대화상자" open triggerRef={secondTriggerRef} onClose={vi.fn()}>
          <button type="button">둘째 확인</button>
        </ModalDialog>
      </>,
    );

    expect(screen.getAllByRole('dialog', { hidden: true })).toHaveLength(2);
    expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).toHaveLength(1);
    expect(shell).toHaveAttribute('inert');
    expect(shell).toHaveAttribute('aria-hidden', 'true');

    view.rerender(
      <ModalDialog id="second-dialog" title="둘째 대화상자" open triggerRef={secondTriggerRef} onClose={vi.fn()}>
        <button type="button">둘째 확인</button>
      </ModalDialog>,
    );
    expect(shell).toHaveAttribute('inert');
    expect(shell).toHaveAttribute('aria-hidden', 'true');

    view.rerender(<></>);
    expect(shell).toHaveAttribute('inert');
    expect(shell).toHaveAttribute('aria-hidden', 'false');
  });

  it('focuses the newly active dialog after a stacked modal closes', async () => {
    const firstTriggerRef = { current: null };
    const secondTriggerRef = { current: null };
    const view = render(
      <>
        <ModalDialog id="first-dialog" title="첫 대화상자" open triggerRef={firstTriggerRef} onClose={vi.fn()}>
          <button type="button">첫 번째 확인</button>
        </ModalDialog>
        <ModalDialog id="second-dialog" title="둘째 대화상자" open triggerRef={secondTriggerRef} onClose={vi.fn()}>
          <button type="button">둘째 확인</button>
        </ModalDialog>
      </>,
    );

    const dialogs = screen.getAllByRole('dialog', { hidden: true });
    expect(dialogs).toHaveLength(2);
    expect(dialogs[0]).toHaveAttribute('inert');
    expect(dialogs[0]).toHaveAttribute('aria-hidden', 'true');
    expect(dialogs[1]).toHaveAttribute('aria-modal', 'true');
    expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).toHaveLength(1);

    view.rerender(
      <ModalDialog id="first-dialog" title="첫 대화상자" open triggerRef={firstTriggerRef} onClose={vi.fn()}>
        <button type="button">첫 번째 확인</button>
      </ModalDialog>,
    );

    await waitFor(() => {
      const activeDialog = screen.getByRole('dialog', { name: '첫 대화상자' });
      expect(activeDialog).toHaveAttribute('aria-modal', 'true');
      expect(activeDialog).not.toHaveAttribute('inert');
      expect(screen.getByRole('button', { name: '닫기' })).toHaveFocus();
      expect(document.querySelectorAll('[role="dialog"][aria-modal="true"]')).toHaveLength(1);
    });
  });
});
