import { useEffect, useRef } from 'react';
import type { StageId } from '../model/session';

export function useStageFocus(stage: StageId) {
  const previousStage = useRef<StageId | null>(null);

  useEffect(() => {
    if (previousStage.current === stage) return;
    previousStage.current = stage;
    const heading = document.querySelector<HTMLElement>('[data-stage-heading]');
    heading?.focus({ preventScroll: true });
  }, [stage]);
}
