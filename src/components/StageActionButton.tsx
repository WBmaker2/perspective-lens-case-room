import { useId, type ReactNode } from 'react';

export interface StageActionButtonProps {
  children: ReactNode;
  disabled: boolean;
  isCurrentRequired: boolean;
  guidanceText: string;
  onClick: () => void;
}

export function StageActionButton({ children, disabled, isCurrentRequired, guidanceText, onClick }: StageActionButtonProps) {
  const guidanceId = useId();
  const showGuidance = !disabled && isCurrentRequired;
  return (
    <div className="stage-action-control">
      <button
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
