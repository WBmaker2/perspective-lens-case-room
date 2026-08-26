import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

export interface ReportResetControlProps {
  onReset: () => void;
  children: (triggerRef: RefObject<HTMLButtonElement | null>, openDialog: () => void) => ReactNode;
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Shared, confirmed reset UI for the normal and incomplete-report states. */
export function ReportResetControl({ onReset, children }: ReportResetControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    if (isOpen) {
      background.setAttribute('inert', '');
      background.setAttribute('aria-hidden', 'true');
    } else {
      background.removeAttribute('inert');
      background.removeAttribute('aria-hidden');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    const dialog = dialogRef.current;
    const getFocusable = (): HTMLElement[] => dialog
      ? Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
      : [];
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
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
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const confirm = () => {
    setIsOpen(false);
    onReset();
  };

  return (
    <>
      <div ref={backgroundRef} className="case-report__background">
        {children(triggerRef, () => setIsOpen(true))}
      </div>
      {isOpen ? (
        <div className="case-report__dialog-backdrop">
          <div
            className="case-report__dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-reset-title"
            aria-describedby="case-reset-description"
            tabIndex={-1}
          >
            <h2 id="case-reset-title">현재 기록을 지울까요?</h2>
            <p id="case-reset-description">진행 중인 답과 저장하지 않은 메모가 지워집니다. 따로 저장한 메모는 남아 있어요.</p>
            <div className="case-report__dialog-actions">
              <button type="button" onClick={close}>취소</button>
              <button type="button" onClick={confirm}>현재 기록 지우고 새 사건 접수</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
