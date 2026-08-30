import type { StageId } from '../model/session';
import { stageDescriptors } from '../model/ui';

export interface StageStatusProps {
  activeStage: StageId;
  caseTitle?: string;
}

const stageGuidance: Readonly<Record<StageId, string>> = {
  intake: '사건을 고르고 첫 생각을 기록해 보세요.',
  lenses: '두 렌즈를 읽고 중요한 문장을 표시해 보세요.',
  evidence: '각 문장을 읽고 근거 종류를 골라 보세요.',
  comparison: '공통점·차이점·빠진 정보를 근거와 연결해 보세요.',
  rewrite: '사실을 지키며 다른 관점의 문장을 조립해 보세요.',
  report: '사용한 근거와 달라진 생각을 돌아보세요.',
};

export function StageStatus({ activeStage, caseTitle }: StageStatusProps) {
  const activeIndex = stageDescriptors.findIndex((stage) => stage.id === activeStage);
  const stageNumber = activeIndex >= 0 ? activeIndex + 1 : 1;
  const descriptor = stageDescriptors[activeIndex] ?? stageDescriptors[0]!;

  return (
    <aside className="stage-status" aria-label="현재 학습 단계" data-stage={activeStage}>
      <span className="stage-status__step">현재 단계 {stageNumber}/{stageDescriptors.length}</span>
      <div className="stage-status__copy">
        <strong>{descriptor.label}</strong>
        {caseTitle ? <span className="stage-status__case">{caseTitle}</span> : null}
        <p>{stageGuidance[activeStage]}</p>
      </div>
    </aside>
  );
}
