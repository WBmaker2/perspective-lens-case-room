import { useSyncExternalStore } from 'react';

export type ModalLockToken = symbol;

type BackgroundSnapshot = {
  element: HTMLElement;
  inert: boolean;
  hidden: string | null;
};

const locks = new Set<ModalLockToken>();
const listeners = new Set<() => void>();
let backgroundSnapshots: BackgroundSnapshot[] = [];

const getBackgrounds = (): HTMLElement[] => {
  const shells = Array.from(document.querySelectorAll<HTMLElement>('.app-shell'));
  if (shells.length > 0) return shells;
  return Array.from(document.body.children)
    .filter((element) => !element.classList.contains('modal-dialog-backdrop'))
    .filter((element) => !element.classList.contains('case-report__dialog-backdrop'))
    .filter((element): element is HTMLElement => element instanceof HTMLElement);
};

const notify = () => {
  for (const listener of listeners) listener();
};

const lockBackground = () => {
  for (const element of getBackgrounds()) {
    element.setAttribute('inert', '');
    element.setAttribute('aria-hidden', 'true');
  }
};

export function acquireModalLock(existingToken?: ModalLockToken): ModalLockToken {
  if (locks.size === 0) {
    backgroundSnapshots = getBackgrounds().map((element) => ({
      element,
      inert: element.hasAttribute('inert'),
      hidden: element.getAttribute('aria-hidden'),
    }));
  }
  const token = existingToken ?? Symbol('modal-lock');
  locks.add(token);
  lockBackground();
  notify();
  return token;
}

export function releaseModalLock(token: ModalLockToken): void {
  if (!locks.delete(token)) return;
  if (locks.size === 0) {
    for (const { element, inert, hidden } of backgroundSnapshots) {
      if (inert) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
      if (hidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', hidden);
    }
    backgroundSnapshots = [];
  }
  notify();
}

export function hasModalLock(): boolean {
  return locks.size > 0;
}

export function isActiveModal(token: ModalLockToken | null): boolean {
  if (!token || locks.size === 0) return false;
  let active: ModalLockToken | undefined;
  for (const current of locks) active = current;
  return active === token;
}

const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useActiveModal(token: ModalLockToken | null): boolean {
  return useSyncExternalStore(
    subscribe,
    () => isActiveModal(token),
    () => false,
  );
}
