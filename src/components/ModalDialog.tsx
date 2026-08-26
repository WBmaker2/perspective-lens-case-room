import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';

export interface ModalDialogProps {
  id: string;
  title: string;
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  children: ReactNode;
  onClose: () => void;
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function ModalDialog({ id, title, open, triggerRef, children, onClose }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const lockedBackgroundsRef = useRef<Array<{ element: HTMLElement; inert: boolean; hidden: string | null }>>([]);

  useEffect(() => {
    const backgrounds = Array.from(document.querySelectorAll<HTMLElement>('.app-shell')).length > 0
      ? Array.from(document.querySelectorAll<HTMLElement>('.app-shell'))
      : Array.from(document.body.children)
        .filter((element) => !element.classList.contains('modal-dialog-backdrop'))
        .filter((element): element is HTMLElement => element instanceof HTMLElement);
    const unlockBackground = () => {
      for (const { element, inert, hidden } of lockedBackgroundsRef.current) {
        if (inert) element.setAttribute('inert', '');
        else element.removeAttribute('inert');
        if (hidden === null) element.removeAttribute('aria-hidden');
        else element.setAttribute('aria-hidden', hidden);
      }
      lockedBackgroundsRef.current = [];
    };

    if (!open) {
      unlockBackground();
      triggerRef.current?.focus();
      return undefined;
    }

    lockedBackgroundsRef.current = backgrounds.map((element) => ({
      element,
      inert: element.hasAttribute('inert'),
      hidden: element.getAttribute('aria-hidden'),
    }));
    for (const element of backgrounds) {
      element.setAttribute('inert', '');
      element.setAttribute('aria-hidden', 'true');
    }

    const dialog = dialogRef.current;
    const getFocusable = (): HTMLElement[] => dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      : [];
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
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
      unlockBackground();
    };
  }, [open, onClose, triggerRef]);

  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div className="modal-dialog-backdrop">
      <div
        ref={dialogRef}
        className="modal-dialog"
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
      >
        <div className="modal-dialog__heading">
          <h2 id={`${id}-title`}>{title}</h2>
          <button className="modal-dialog__close" type="button" onClick={onClose}>닫기</button>
        </div>
        <div className="modal-dialog__body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
