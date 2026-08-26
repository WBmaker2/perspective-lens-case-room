import type { RefObject } from 'react';
import { casePacks } from '../../content/caseIndex';
import { updateHistory } from '../../content/updateHistory';
import type { CasePack } from '../../model/case';
import type { UpdateEntry } from '../../model/ui';
import { ModalDialog } from '../../components/ModalDialog';

export interface UpdateHistoryDialogProps {
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  entries?: readonly UpdateEntry[];
  casePacks?: readonly CasePack[];
}

export function UpdateHistoryDialog({ open, triggerRef, onClose, entries = updateHistory, casePacks: packs = casePacks }: UpdateHistoryDialogProps) {
  const titleById = new Map(packs.map((pack) => [pack.id, pack.title]));
  return (
    <ModalDialog id="update-history-dialog" title="업데이트 내역" open={open} triggerRef={triggerRef} onClose={onClose}>
      <ol className="update-history-list" aria-label="업데이트 기록">
        {entries.map((entry, index) => (
          <li className="update-history-list__item" key={`${entry.date}-${entry.category}-${'caseId' in entry ? entry.caseId : 'base'}-${index}`}>
            <div className="update-history-list__meta">
              <time dateTime={entry.date}>{entry.date}</time>
              <span>{entry.category}</span>
              {'caseId' in entry ? <span>{titleById.get(entry.caseId) ?? '사건'}</span> : null}
            </div>
            <p>{entry.summary}</p>
          </li>
        ))}
      </ol>
    </ModalDialog>
  );
}
