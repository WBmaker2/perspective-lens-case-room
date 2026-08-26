import type { RefObject } from 'react';
import type { CasePack } from '../../model/case';
import type { PrintViewModel, TeacherGuideSection } from '../../content/teacherGuide';
import { ModalDialog } from '../../components/ModalDialog';
import { CaseReport } from '../report/CaseReport';

export interface TeacherGuideProps {
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  viewModel: PrintViewModel;
}

const focalContrastLabels: Readonly<Record<CasePack['focalContrast'], string>> = {
  priority: '속도와 꼼꼼함',
  'seen-vs-inferred': '본 정보와 추측한 정보',
  'familiar-vs-new-reader': '익숙한 정보와 독자에게 필요한 정보',
  'comfort-vs-preservation': '편안함과 책 보존',
};

function GuideSection({ section, prefix }: { section: TeacherGuideSection; prefix: string }) {
  const headingId = `${prefix}-${section.id}-heading`;
  return (
    <section className={`teacher-guide__section teacher-guide__section--${section.id}`} role="region" data-guide-section={section.id} aria-labelledby={headingId}>
      <h3 id={headingId}>{section.heading}</h3>
      <ul>
        {section.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function SelectedCaseMaterial({ pack, prefix }: { pack: CasePack; prefix: string }) {
  const headingId = `${prefix}-selected-case-heading`;
  return (
    <div className="teacher-guide__selected-case">
      <h2 id={headingId}>선택한 사건 자료</h2>
      <p className="teacher-guide__case-title"><strong>{pack.title}</strong> · 초점: {focalContrastLabels[pack.focalContrast]}</p>
      <div className="teacher-guide__narrators">
        {pack.narrators.map((narrator) => (
          <article className="teacher-guide__narrator" key={narrator.id}>
            <h3>{narrator.displayName}</h3>
            <p>{narrator.roleLabel}</p>
            <ol>
              {narrator.sentences.map((sentence) => (
                <li key={sentence.id} data-sentence-id={sentence.id}>
                  <span className="teacher-guide__sentence-number">문장 {sentence.number}</span>
                  <span>{sentence.text}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

function ReportForPrint({ viewModel }: { viewModel: PrintViewModel }) {
  if (!viewModel.currentReport || !viewModel.currentPack) return null;
  return (
    <section className="teacher-guide__print-report" data-print-report="included" aria-labelledby="teacher-print-report-heading">
      <h2 id="teacher-print-report-heading">완료한 사건 보고서</h2>
      <CaseReport
        model={viewModel.currentReport}
        pack={viewModel.currentPack}
        printMode
        onRevisitStage={() => undefined}
        onReset={() => undefined}
      />
    </section>
  );
}

function PrintComposition({ viewModel }: { viewModel: PrintViewModel }) {
  return (
    <article
      className="teacher-print-region"
      data-print-region
      {...(viewModel.currentReport ? { 'data-print-report': 'included' } : {})}
    >
      <header className="teacher-print-region__header">
        <p className="eyebrow">TEACHER ACTIVITY SUMMARY</p>
        <h1>{viewModel.title}</h1>
        <p className="teacher-print-region__meta">대상: 초등 5~6학년 · 교과: 국어 · 차시: {viewModel.duration}</p>
      </header>
      <div className="teacher-print-region__sections">
        {viewModel.sections.map((section) => <GuideSection key={section.id} section={section} prefix="teacher-print" />)}
      </div>
      {viewModel.currentPack ? <SelectedCaseMaterial pack={viewModel.currentPack} prefix="teacher-print" /> : null}
      <ReportForPrint viewModel={viewModel} />
    </article>
  );
}

export function TeacherGuide({ open, triggerRef, onClose, viewModel }: TeacherGuideProps) {
  const print = () => window.print();
  return (
    <>
      <ModalDialog
        id="teacher-guide-dialog"
        title="교사용 활동 요약"
        open={open}
        triggerRef={triggerRef}
        onClose={onClose}
      >
        <div className="teacher-guide">
          <p className="teacher-guide__intro">수업 전에 활동의 목표와 안전·개인정보 경계를 확인하세요. 인쇄 자료에는 학습자가 작성한 메모를 포함하지 않습니다.</p>
          <div className="teacher-guide__sections">
            {viewModel.sections.map((section) => <GuideSection key={section.id} section={section} prefix="teacher-guide" />)}
          </div>
          {viewModel.currentPack ? <SelectedCaseMaterial pack={viewModel.currentPack} prefix="teacher-guide" /> : null}
          <div className="teacher-guide__actions">
            <button className="teacher-guide__print-button" type="button" onClick={print}>인쇄하기</button>
          </div>
        </div>
      </ModalDialog>
      {open ? <PrintComposition viewModel={viewModel} /> : null}
    </>
  );
}
