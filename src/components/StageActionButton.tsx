import { useEffect, useId, useRef, type ReactNode } from 'react';

export interface StageActionButtonProps {
  children: ReactNode;
  disabled: boolean;
  isCurrentRequired: boolean;
  guidanceText: string;
  onClick: () => void;
}

export function StageActionButton({ children, disabled, isCurrentRequired, guidanceText, onClick }: StageActionButtonProps) {
  const guidanceId = useId();
  const actionRef = useRef<HTMLButtonElement>(null);
  const showGuidance = !disabled && isCurrentRequired;

  useEffect(() => {
    if (!showGuidance || typeof document === 'undefined') return;
    const action = actionRef.current;
    const utility = document.querySelector<HTMLElement>('.utility-group');
    if (!action || !utility || typeof action.scrollIntoView !== 'function') return;
    const actionRect = action.getBoundingClientRect();
    const utilityRect = utility.getBoundingClientRect();
    const overlaps = !(
      actionRect.right <= utilityRect.left ||
      utilityRect.right <= actionRect.left ||
      actionRect.bottom <= utilityRect.top ||
      utilityRect.bottom <= actionRect.top
    );
    if (overlaps) action.scrollIntoView({ block: 'center', behavior: 'auto' });
  }, [showGuidance]);

  return (
    <div className="stage-action-control">
      <button
        ref={actionRef}
        className={`primary-action${showGuidance ? ' gi-pulse' : ''}`}
        type="button"
        disabled={disabled}
        aria-describedby={showGuidance ? guidanceId : undefined}
        onClick={onClick}
      >
        {children}
      </button>
      {showGuidance ? <p className="action-guidance" id={guidanceId} role="status">{guidanceText}</p> : null}
    </div>
  );
}
