import type { CaseId, CasePack, InitialHypothesis } from '../../model/case';
import type { CaseSession } from '../../model/session';
import { safetyCopy } from '../../content/safetyCopy';
import { CaseIllustration } from '../../components/CaseIllustration';
import { StageActionButton } from '../../components/StageActionButton';

export interface CaseIntakeProps {
  casePacks: readonly CasePack[];
  session: CaseSession;
  onSelectCase: (caseId: CaseId) => void;
  onSelectHypothesis: (hypothesis: InitialHypothesis) => void;
  onContinue: () => void;
}

const hypotheses: readonly { id: InitialHypothesis; label: string }[] = [
  { id: 'seen-information', label: '보이는 정보가 가장 중요하다고 생각한다.' },
  { id: 'priority', label: '인물이 먼저 해야 할 일이 가장 중요하다고 생각한다.' },
  { id: 'evaluative-language', label: '표현에 담긴 판단이 사건을 가장 잘 보여 준다고 생각한다.' },
];

export function CaseIntake({ casePacks, session, onSelectCase, onSelectHypothesis, onContinue }: CaseIntakeProps) {
  const selectedPack = session.caseId ? casePacks.find((pack) => pack.id === session.caseId) ?? null : null;
  const records = selectedPack?.neutralRecords ?? [];
  const intakeRecords = records.filter((record) => record.visibility === 'intake').sort((a, b) => a.sequence - b.sequence);
  const revealCount = records.filter((record) => record.visibility === 'reveal').length;
  const gateMessage = !selectedPack
    ? '먼저 사건과 첫 생각을 골라 주세요.'
    : !session.initialHypothesis
      ? '첫 생각을 하나 골라 주세요.'
      : null;

  return (
    <section className="stage-content intake" aria-labelledby="intake-title">
      <div className="stage-heading-block">
        <p className="eyebrow">CASE INTAKE / 01</p>
        <h1 id="intake-title" data-stage-heading tabIndex={-1}>사건 접수</h1>
        <p className="lead">중립적인 기록을 확인하고, 두 렌즈를 읽기 전 첫 생각을 골라 보세요.</p>
      </div>

      <div className="case-picker" aria-labelledby="case-picker-title">
        <div className="section-label-row">
          <h2 id="case-picker-title">사건 선택</h2>
          <span className="muted">4개의 가상 사건</span>
        </div>
        <div className="case-picker__list">
          {casePacks.map((pack) => {
            const selected = pack.id === session.caseId;
            return (
              <button
                className={`case-choice${selected ? ' is-selected' : ''}`}
                type="button"
                key={pack.id}
                aria-label={`${pack.title} 사건 선택 · ${pack.focusQuestion}`}
                aria-pressed={selected}
                onClick={() => onSelectCase(pack.id)}
              >
                <span className="case-choice__title">{pack.title}</span>
                <span className="case-choice__question">{pack.focusQuestion}</span>
                <span className="case-choice__action">{selected ? '선택됨' : '사건 선택'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedPack && (
        <div className="intake-workspace">
          <div className="intake-anchor">
            <CaseIllustration illustrationKey={selectedPack.illustrationKey} />
            <div>
              <p className="eyebrow">SELECTED CASE</p>
              <h2>{selectedPack.title}</h2>
              <p className="focus-question">{selectedPack.focusQuestion}</p>
            </div>
          </div>

          <section className="timeline" aria-labelledby="timeline-title">
            <div className="section-label-row">
              <h2 id="timeline-title">시간 기록</h2>
              <span className="muted">먼저 보이는 기록만</span>
            </div>
            <ol className="timeline__list" aria-label="시간 기록">
              {intakeRecords.map((record) => (
                <li className="timeline__item timeline__item--visible" key={record.id}>
                  <span className="timeline__marker" aria-hidden="true">{String(record.sequence).padStart(2, '0')}</span>
                  <span>{record.text}</span>
                </li>
              ))}
              {Array.from({ length: revealCount }, (_, index) => (
                <li className="timeline__item timeline__item--locked" key={`locked-${index + 1}`}>
                  <span className="timeline__marker" aria-hidden="true">{String(intakeRecords.length + index + 1).padStart(2, '0')}</span>
                  <span aria-label="교차 조사 뒤 공개">교차 조사 뒤 공개</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="hypothesis" aria-labelledby="hypothesis-title">
            <fieldset>
              <legend id="hypothesis-title">첫 생각을 골라 보세요</legend>
              <p className="supporting-copy">정답을 맞히는 단계가 아니라, 나중에 생각이 어떻게 달라졌는지 살펴보기 위한 기록입니다.</p>
              <div className="hypothesis__options">
                {hypotheses.map((hypothesis) => (
                  <label className="hypothesis__option" key={hypothesis.id}>
                    <input
                      type="radio"
                      name="initial-hypothesis"
                      value={hypothesis.id}
                      checked={session.initialHypothesis === hypothesis.id}
                      onChange={() => onSelectHypothesis(hypothesis.id)}
                    />
                    <span>{hypothesis.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <aside className="safety-note" aria-label="활동 안내">
            <strong>{safetyCopy.fictionalCase}</strong>
            <span>{safetyCopy.notForRealPeople}</span>
            <span>{safetyCopy.multipleSupportedAnswers}</span>
          </aside>

        </div>
      )}
      <div className="stage-action-row">
        <StageActionButton
          disabled={!selectedPack || !session.initialHypothesis}
          isCurrentRequired={Boolean(selectedPack && session.initialHypothesis)}
          guidanceText="사건과 첫 생각을 골랐어요. 사건 렌즈를 열어 보세요."
          onClick={onContinue}
        >
          사건 렌즈 열기
        </StageActionButton>
      </div>
      {gateMessage ? <p className="gate-hint intake__gate-hint" role="status">{gateMessage}</p> : null}
    </section>
  );
}
