import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { getCasePack } from '../content/caseIndex';
import { loadSession, saveSession } from '../domain/sessionPersistence';
import { caseSessionReducer } from '../domain/sessionReducer';
import type { CaseAction, CaseSession, StorageAdapter } from '../model/session';

const memoryStorage = new Map<string, string>();
const fallbackStorage: StorageAdapter = {
  getItem: (key) => memoryStorage.get(key) ?? null,
  setItem: (key, value) => { memoryStorage.set(key, value); },
  removeItem: (key) => { memoryStorage.delete(key); },
};

function browserStorage(): StorageAdapter {
  if (typeof window === 'undefined') return fallbackStorage;
  try {
    const storage = window.sessionStorage;
    return {
      getItem: (key) => storage.getItem(key),
      setItem: (key, value) => storage.setItem(key, value),
      removeItem: (key) => storage.removeItem(key),
    };
  } catch {
    return fallbackStorage;
  }
}

const reducer = (state: CaseSession, action: CaseAction): CaseSession => caseSessionReducer(state, action, getCasePack);

export interface CaseSessionController {
  session: CaseSession;
  dispatch: React.Dispatch<CaseAction>;
  persistenceWarning: string | null;
  storage: StorageAdapter;
}

export function useCaseSession(storage?: StorageAdapter): CaseSessionController {
  const storageAdapter = useMemo(() => storage ?? browserStorage(), [storage]);
  const [session, dispatch] = useReducer(reducer, storageAdapter, loadSession);
  const [persistenceWarning, setPersistenceWarning] = useState<string | null>(null);
  const lastPersistedSession = useRef(session);

  useEffect(() => {
    if (lastPersistedSession.current === session) return;
    const result = saveSession(storageAdapter, session);
    setPersistenceWarning(result.ok ? null : '진행 상황을 이 기기에 저장하지 못했습니다. 활동은 계속할 수 있습니다.');
    lastPersistedSession.current = session;
  }, [session, storageAdapter]);

  return { session, dispatch, persistenceWarning, storage: storageAdapter };
}
