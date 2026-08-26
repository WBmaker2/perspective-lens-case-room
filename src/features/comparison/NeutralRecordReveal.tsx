import type { NeutralRecord } from '../../model/case';

export interface NeutralRecordRevealProps {
  records: readonly NeutralRecord[];
  labelledBy: string;
}

export function NeutralRecordReveal({ records, labelledBy }: NeutralRecordRevealProps) {
  const orderedRecords = [...records].sort((left, right) => left.sequence - right.sequence);
  return (
    <section className="neutral-record-reveal" aria-labelledby={labelledBy} aria-label="추가 기록">
      <ol className="neutral-record-list" aria-label="추가 중립 기록">
        {orderedRecords.map((record) => (
          <li className="neutral-record" key={record.id} aria-label={`중립 기록 ${record.sequence}`} data-record-id={record.id} data-record-sequence={record.sequence}>
            <span className="neutral-record__marker" aria-hidden="true">{String(record.sequence).padStart(2, '0')}</span>
            <span>{record.text}</span>
          </li>
        ))}
      </ol>
      <p className="neutral-record-announcement" role="status" aria-live="polite" aria-label="추가 기록 안내">
        {orderedRecords.length > 0 ? orderedRecords.map((record) => record.text).join(' ') : '아직 공개된 추가 기록이 없습니다.'}
      </p>
    </section>
  );
}
