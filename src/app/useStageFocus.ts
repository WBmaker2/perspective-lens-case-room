import { useEffect, useRef } from 'react';
import type { StageId } from '../model/session';

export function useStageFocus(stage: StageId, focusKey: string = stage) {
  const previousFocusKey = useRef<string | null>(null);

  useEffect(() => {
    if (previousFocusKey.current === focusKey) return;
    previousFocusKey.current = focusKey;
    const heading = document.querySelector<HTMLElement>('[data-stage-heading]');
    heading?.focus({ preventScroll: true });
  }, [focusKey]);
}
