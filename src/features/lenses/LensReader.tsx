import { useState } from 'react';
import type { CasePack, NarratorLens } from '../../model/case';

export interface LensReaderProps {
  pack: CasePack;
  readNarratorIds: readonly string[];
  markedSentenceIds: readonly string[];
  onMarkRead: (narratorId: string) => void;
  onToggleImportantSentence: (sentenceId: string) => void;
  onContinue: () => void;
}

const iconPaths: Record<NarratorLens['icon'], string> = {
  clipboard: 'M106 58h108v88H106z M132 58v-12h56v12 M132 84h56 M132 108h36',
  ball: 'M160 50a50 50 0 1 0 0 100a50 50 0 1 0 0-100 M125 65c18 14 52 14 70 0 M116 119c25-17 63-17 88 0',
  umbrella: 'M105 98a55 55 0 0 1 110 0H105 M160 98v43c0 16 22 17 22 2',
  info: 'M160 54a50 50 0 1 0 0 100a50 50 0 1 0 0-100 M160 91v41 M160 76v1',
  poster: 'M112 50h96v106h-96z M130 77h60 M130 101h36 M130 128h52',
  reader: 'M107 56h45c12 0 20 8 20 20v63h-45c-12 0-20-8-20-20z M213 56h-45c-12 0-20 8-20 20v63h45c12 0 20-8 20-20z',
  window: 'M105 52h110v102H105z M160 52v102 M105 103h110 M82 154h156',
  book: 'M104 59c19-7 38-5 56 7v87c-18-12-37-14-56-7z M216 59c-19-7-38-5-56 7v87c18-12 37-14 56-7z',
};

function LensIcon({ lens }: { lens: NarratorLens }) {
  return (
    <svg className="lens-identity__icon" role="img" aria-label={`${lens.displayName} 아이콘`} viewBox="0 0 320 190" focusable="false">
      <path d={iconPaths[lens.icon]} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LensPanel({
  lens,
  isActive,
  isRead,
  markedSentenceIds,
  onMarkRead,
  onToggleImportantSentence,
}: {
  lens: NarratorLens;
  isActive: boolean;
  isRead: boolean;
  markedSentenceIds: readonly string[];
  onMarkRead: (narratorId: string) => void;
  onToggleImportantSentence: (sentenceId: string) => void;
}) {
  const panelTitleId = `${lens.id}-panel-title`;
  return (
    <section
      className={`lens-panel lens-panel--${lens.borderStyle}`}
      data-border-style={lens.borderStyle}
      data-active={isActive}
      data-narrator-id={lens.id}
      role="tabpanel"
      aria-labelledby={`${lens.id}-tab`}
      id={`${lens.id}-panel`}
    >
      <header className="lens-identity">
        <LensIcon lens={lens} />
        <div className="lens-identity__text">
          <p className="eyebrow">{lens.roleLabel}</p>
          <h2 id={panelTitleId}>{lens.displayName}</h2>
          <span className="lens-identity__position">{lens.position}</span>
        </div>
        <button
          className={`read-toggle${isRead ? ' is-read' : ''}`}
          type="button"
          aria-pressed={isRead}
          onClick={() => onMarkRead(lens.id)}
        >
          읽음 표시
        </button>
      </header>
      <ol className="narrative-list" aria-label={`${lens.displayName} 서술 문장`}>
        {lens.sentences.map((sentence) => {
          const marked = markedSentenceIds.includes(sentence.id);
          return (
            <li className={`narrative-sentence${marked ? ' is-marked' : ''}`} key={sentence.id}>
              <span className="narrative-sentence__number" aria-hidden="true">{sentence.number}</span>
              <p id={`${sentence.id}-text`}>{sentence.text}</p>
              <button
                className="important-toggle"
                type="button"
                aria-pressed={marked}
                aria-describedby={`${sentence.id}-text`}
                onClick={() => onToggleImportantSentence(sentence.id)}
              >
                중요 문장 표시
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function LensReader({ pack, readNarratorIds, markedSentenceIds, onMarkRead, onToggleImportantSentence, onContinue }: LensReaderProps) {
  const [activeLens, setActiveLens] = useState({ packId: pack.id, narratorId: pack.narrators[0].id });
  const activeNarratorId = activeLens.packId === pack.id && pack.narrators.some((lens) => lens.id === activeLens.narratorId)
    ? activeLens.narratorId
    : pack.narrators[0].id;

  const complete = pack.narrators.every((lens) => {
    const read = readNarratorIds.includes(lens.id);
    const marked = lens.sentences.some((sentence) => markedSentenceIds.includes(sentence.id));
    return read && marked;
  });

  return (
    <section className="stage-content lenses" aria-labelledby="lenses-title">
      <div className="stage-heading-block">
        <p className="eyebrow">LENS A / B / 02</p>
        <h1 id="lenses-title" data-stage-heading tabIndex={-1}>렌즈 A/B</h1>
        <p className="lead">같은 사건을 본 두 인물의 문장을 나란히 읽고, 중요한 문장을 골라 보세요.</p>
      </div>

      <div className="lens-tabs" role="tablist" aria-label="렌즈 선택">
        {pack.narrators.map((lens, index) => {
          const selected = lens.id === activeNarratorId;
          return (
            <button
              className={`lens-tab${selected ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${lens.id}-panel`}
              id={`${lens.id}-tab`}
              tabIndex={selected ? 0 : -1}
              key={lens.id}
              onKeyDown={(event) => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft' && event.key !== 'ArrowUp') return;
                event.preventDefault();
                const nextIndex = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? (index + 1) % pack.narrators.length : (index + pack.narrators.length - 1) % pack.narrators.length;
                const nextLens = pack.narrators[nextIndex]!;
                setActiveLens({ packId: pack.id, narratorId: nextLens.id });
                document.getElementById(`${nextLens.id}-tab`)?.focus();
              }}
              onClick={() => setActiveLens({ packId: pack.id, narratorId: lens.id })}
            >
              {index === 0 ? '렌즈 A' : '렌즈 B'}
            </button>
          );
        })}
      </div>

      <div className="lens-grid">
        {pack.narrators.map((lens) => (
          <LensPanel
            key={lens.id}
            lens={lens}
            isActive={lens.id === activeNarratorId}
            isRead={readNarratorIds.includes(lens.id)}
            markedSentenceIds={markedSentenceIds}
            onMarkRead={onMarkRead}
            onToggleImportantSentence={onToggleImportantSentence}
          />
        ))}
      </div>

      <section className="difference-summary" role="region" aria-labelledby="difference-summary-title">
        <div className="section-label-row">
          <h2 id="difference-summary-title">차이 요약</h2>
          <span className="muted">관점의 메타데이터</span>
        </div>
        <dl className="difference-summary__list">
          <div><dt>위치</dt><dd>{pack.narrators[0].position} · {pack.narrators[1].position}</dd></div>
          <div><dt>관심</dt><dd>{pack.narrators[0].interest} · {pack.narrators[1].interest}</dd></div>
          <div><dt>목적</dt><dd>{pack.narrators[0].purpose} · {pack.narrators[1].purpose}</dd></div>
        </dl>
      </section>

      <div className="stage-action-row">
        <p className="gate-hint" role="status">두 렌즈에 읽음 표시를 하고, 각 렌즈에서 중요 문장을 하나 이상 골라 주세요.</p>
        <button className="primary-action" type="button" disabled={!complete} onClick={onContinue}>
          렌즈 읽기 완료
        </button>
      </div>
    </section>
  );
}
