import type { StageId } from '../model/session';
import { stageDescriptors } from '../model/ui';

export interface ProgressStepsProps {
  activeStage: StageId;
}

export function ProgressSteps({ activeStage }: ProgressStepsProps) {
  return (
    <nav className="progress" aria-label="학습 단계">
      <ol className="progress__list progress__list--wrap" aria-label="학습 단계">
        {stageDescriptors.map((stage, index) => (
          <li
            className="progress__item"
            key={stage.id}
            aria-current={stage.id === activeStage ? 'step' : undefined}
          >
            <span className="progress__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{stage.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
