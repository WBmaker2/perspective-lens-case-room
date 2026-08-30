import type { StageId } from '../model/session';
import { stageDescriptors } from '../model/ui';

export interface ProgressStepsProps {
  activeStage: StageId;
}

export function ProgressSteps({ activeStage }: ProgressStepsProps) {
  const activeIndex = stageDescriptors.findIndex((stage) => stage.id === activeStage);
  return (
    <nav className="progress" aria-label="학습 단계">
      <ol className="progress__list progress__list--wrap" aria-label="학습 단계">
        {stageDescriptors.map((stage, index) => (
          <li
            className={`progress__item${index < activeIndex ? ' is-complete' : ''}`}
            key={stage.id}
            aria-current={stage.id === activeStage ? 'step' : undefined}
            aria-label={`${stage.label} · ${index < activeIndex ? '완료' : stage.id === activeStage ? '진행 중' : '예정'}`}
            data-complete={index < activeIndex ? 'true' : undefined}
          >
            <span className="progress__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{stage.label}</span>
            {index < activeIndex ? <span className="progress__state" aria-hidden="true">완료</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
