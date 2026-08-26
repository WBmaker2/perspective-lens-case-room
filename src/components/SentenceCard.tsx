import type { ReactNode } from 'react';
import type { NarrativeSentence } from '../model/case';

export interface SentenceCardProps {
  sentence: NarrativeSentence;
  mode: 'mark-important' | 'classify-evidence';
  pressed: boolean;
  onToggle: (sentenceId: string) => void;
  children?: ReactNode;
}

export function SentenceCard({ sentence, mode, pressed, onToggle, children }: SentenceCardProps) {
  const textId = `${sentence.id}-text`;
  const isClassification = mode === 'classify-evidence';

  return (
    <div
      className={`sentence-card sentence-card--${mode}${pressed ? ' is-pressed' : ''}`}
      role="group"
      aria-label={`문장 ${sentence.number}`}
      data-sentence-id={sentence.id}
      data-sentence-number={sentence.number}
    >
      {isClassification ? (
        <button
          className="sentence-card__select"
          type="button"
          aria-pressed={pressed}
          aria-describedby={textId}
          onClick={() => onToggle(sentence.id)}
        >
          <span className="sentence-card__number" aria-hidden="true">{sentence.number}</span>
          <span className="sentence-card__copy">
            <span className="sentence-card__accessible-label">문장 {sentence.number}</span>
            <span id={textId}>{sentence.text}</span>
          </span>
        </button>
      ) : (
        <div className="sentence-card__mark-row">
          <span className="sentence-card__number" aria-hidden="true">{sentence.number}</span>
          <p className="sentence-card__text" id={textId}>{sentence.text}</p>
          <button
            className="important-toggle"
            type="button"
            aria-pressed={pressed}
            aria-describedby={textId}
            onClick={() => onToggle(sentence.id)}
          >
            중요 문장 표시
          </button>
        </div>
      )}
      {isClassification && pressed && children ? (
        <div className="sentence-card__details">{children}</div>
      ) : null}
    </div>
  );
}
