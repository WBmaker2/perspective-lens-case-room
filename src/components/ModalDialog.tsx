import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { acquireModalLock, isActiveModal, releaseModalLock, useActiveModal, type ModalLockToken } from './modalCoordinator';

export interface ModalDialogProps {
  id: string;
  title: string;
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function ModalDialog({ id, title, open, triggerRef, children, onClose, showCloseButton = true }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [token] = useState<ModalLockToken>(() => Symbol('modal-lock'));
  const wasOpenRef = useRef(open);
  const active = useActiveModal(token);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    acquireModalLock(token);

    const dialog = dialogRef.current;
    const getFocusable = (): HTMLElement[] => dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      : [];
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isActiveModal(token)) return;
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !isActiveModal(token)) return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }
      const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey) {
        if (currentIndex <= 0) {
          event.preventDefault();
          focusable[focusable.length - 1]?.focus();
        }
      } else if (currentIndex === focusable.length - 1 || currentIndex < 0) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      releaseModalLock(token);
    };
  }, [open, onClose, triggerRef, token]);

  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div className="modal-dialog-backdrop">
      <div
        ref={dialogRef}
        className="modal-dialog"
        id={id}
        role="dialog"
        aria-modal={active ? 'true' : undefined}
        inert={!active ? true : undefined}
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
      >
        <div className="modal-dialog__heading">
          <h2 id={`${id}-title`}>{title}</h2>
          {showCloseButton ? <button className="modal-dialog__close" type="button" onClick={onClose}>닫기</button> : null}
        </div>
        <div className="modal-dialog__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
