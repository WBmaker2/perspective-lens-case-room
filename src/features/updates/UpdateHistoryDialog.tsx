import type { RefObject } from 'react';
import { casePacks } from '../../content/caseIndex';
import { updateHistory } from '../../content/updateHistory';
import type { CasePack } from '../../model/case';
import type { CaseId } from '../../model/case';
import type { UpdateEntry } from '../../model/ui';
import { ModalDialog } from '../../components/ModalDialog';

export interface UpdateHistoryDialogProps {
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  entries?: readonly UpdateEntry[];
  casePacks?: readonly CasePack[];
}

function HistoryRow({ entry }: { entry: UpdateEntry }) {
  return (
    <li className="update-history-list__item">
      <div className="update-history-list__meta">
        <time dateTime={entry.date}>{entry.date}</time>
        <span>{entry.category}</span>
      </div>
      <p>{entry.summary}</p>
    </li>
  );
}

export function UpdateHistoryDialog({ open, triggerRef, onClose, entries = updateHistory, casePacks: packs = casePacks }: UpdateHistoryDialogProps) {
  const titleById = new Map(packs.map((pack) => [pack.id, pack.title]));
  const baseEntries = entries.filter((entry) => !('caseId' in entry));
  const caseGroups = new Map<CaseId, UpdateEntry[]>();
  for (const entry of entries) {
    if (!('caseId' in entry)) continue;
    const group = caseGroups.get(entry.caseId) ?? [];
    group.push(entry);
    caseGroups.set(entry.caseId, group);
  }
  return (
    <ModalDialog id="update-history-dialog" title="업데이트 내역" open={open} triggerRef={triggerRef} onClose={onClose}>
      <ol className="update-history-list" aria-label="업데이트 기록">
        {baseEntries.map((entry, index) => <HistoryRow key={`${entry.date}-${entry.category}-${index}`} entry={entry} />)}
        {[...caseGroups.entries()].map(([caseId, group], index) => {
          const title = titleById.get(caseId) ?? '사건';
          const headingId = `update-history-case-${index + 1}`;
          return (
            <li className="update-history-group-wrapper" key={caseId}>
              <section className="update-history-group" role="group" aria-labelledby={headingId}>
                <h3 id={headingId}>{title}</h3>
                <ol className="update-history-group__list">
                  {group.map((entry, entryIndex) => <HistoryRow key={`${entry.date}-${entry.category}-${entryIndex}`} entry={entry} />)}
                </ol>
              </section>
            </li>
          );
        })}
      </ol>
    </ModalDialog>
  );
}
