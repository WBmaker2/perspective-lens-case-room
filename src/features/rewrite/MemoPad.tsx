import { useState } from 'react';
import type { CaseId } from '../../model/case';
import type { StorageAdapter } from '../../model/session';
import { deleteSavedMemo, loadSavedMemo, saveMemo } from '../../domain/sessionPersistence';

export interface MemoPadProps {
  caseId: CaseId;
  storage: StorageAdapter;
  onPersistenceMessage: (message: string) => void;
}

const messageFor = (ok: boolean, action: 'save' | 'delete', reason?: string): string => {
  if (ok) return action === 'save' ? '이 기기에 메모를 저장했어요.' : '저장된 메모를 삭제했어요.';
  if (reason === 'quota') return '저장 공간이 부족해 메모를 저장하지 못했어요. 메모는 화면에 남아 있으니 학습을 계속하세요.';
  return action === 'save'
    ? '이 기기에 메모를 저장하지 못했어요. 메모는 화면에 남아 있으니 학습을 계속하세요.'
    : '저장된 메모를 삭제하지 못했어요. 화면의 메모는 그대로 두었어요.';
};

export function MemoPad({ caseId, storage, onPersistenceMessage }: MemoPadProps) {
  const [memo, setMemo] = useState(() => loadSavedMemo(storage) ?? '');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const announce = (ok: boolean, action: 'save' | 'delete', reason?: string) => {
    const message = messageFor(ok, action, reason);
    setStatusMessage(message);
    onPersistenceMessage(message);
  };

  const save = () => {
    const result = saveMemo(storage, memo);
    announce(result.ok, 'save', result.reason);
  };

  const remove = () => {
    const result = deleteSavedMemo(storage);
    announce(result.ok, 'delete', result.reason);
    if (result.ok) setMemo('');
  };

  return (
    <section className="memo-pad" data-case-id={caseId} aria-labelledby="memo-pad-title">
      <div className="section-label-row">
        <h2 id="memo-pad-title">나만의 메모</h2>
        <span className="muted">이 사건에서 떠오른 생각</span>
      </div>
      <textarea
        aria-label="개인 메모"
        value={memo}
        onChange={(event) => setMemo(event.target.value)}
        rows={5}
        placeholder="근거를 보고 떠오른 생각을 적어 보세요."
      />
      <p className="memo-pad__privacy">저장하지 않은 메모는 이 탭을 닫으면 사라집니다. 메모는 다시 쓰기 판단이나 결과에 반영되지 않아요.</p>
      <div className="memo-pad__actions">
        <button type="button" onClick={save}>이 기기에 메모 저장</button>
        <button type="button" onClick={remove}>저장된 메모 삭제</button>
      </div>
      {statusMessage ? <p className="memo-pad__status" role="status" aria-live="polite">{statusMessage}</p> : null}
    </section>
  );
}
