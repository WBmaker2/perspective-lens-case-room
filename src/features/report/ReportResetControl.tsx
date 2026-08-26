import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { hasModalLock } from '../../components/modalCoordinator';
import { ModalDialog } from '../../components/ModalDialog';

export interface ReportResetControlProps {
  onReset: () => void;
  children: (triggerRef: RefObject<HTMLButtonElement | null>, openDialog: () => void) => ReactNode;
}

/** Shared, confirmed reset UI for the normal and incomplete-report states. */
export function ReportResetControl({ onReset, children }: ReportResetControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const backgroundSnapshotRef = useRef<{ inert: boolean; hidden: string | null } | null>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    if (isOpen) {
      if (!backgroundSnapshotRef.current) {
        backgroundSnapshotRef.current = {
          inert: background.hasAttribute('inert'),
          hidden: background.getAttribute('aria-hidden'),
        };
      }
      background.setAttribute('inert', '');
      background.setAttribute('aria-hidden', 'true');
      return;
    }
    const snapshot = backgroundSnapshotRef.current;
    if (!snapshot) return;
    if (snapshot.inert) background.setAttribute('inert', '');
    else background.removeAttribute('inert');
    if (snapshot.hidden === null) background.removeAttribute('aria-hidden');
    else background.setAttribute('aria-hidden', snapshot.hidden);
    backgroundSnapshotRef.current = null;
  }, [isOpen]);
  const openResetDialog = () => {
    if (hasModalLock()) return;
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  const confirm = () => { setIsOpen(false); onReset(); };

  return (
    <>
      <div className="case-report__background" ref={backgroundRef}>
        {children(triggerRef, openResetDialog)}
      </div>
      <ModalDialog
        id="case-reset-dialog"
        title="현재 기록을 지울까요?"
        open={isOpen}
        triggerRef={triggerRef}
        onClose={close}
        showCloseButton={false}
      >
        <p id="case-reset-description">진행 중인 답과 저장하지 않은 메모가 지워집니다. 따로 저장한 메모는 남아 있어요.</p>
        <div className="case-report__dialog-actions">
          <button type="button" onClick={close}>취소</button>
          <button type="button" onClick={confirm}>현재 기록 지우고 새 사건 접수</button>
        </div>
      </ModalDialog>
    </>
  );
}
