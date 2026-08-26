import type { CaseId } from '../model/case';

export interface CaseIllustrationProps {
  illustrationKey: CaseId;
  label?: string;
}

const titles: Record<CaseId, string> = {
  'playground-storage-box': '운동장 정리 상자 그림',
  'missing-umbrella-tag': '사라진 우산 표찰 그림',
  'club-notice-poster': '동아리 알림 포스터 그림',
  'library-window-seat': '도서관 창가 자리 그림',
};

export function CaseIllustration({ illustrationKey, label }: CaseIllustrationProps) {
  const title = label ?? titles[illustrationKey];
  const titleId = `illustration-title-${illustrationKey}`;

  return (
    <svg
      className={`case-illustration case-illustration--${illustrationKey}`}
      role="img"
      aria-labelledby={titleId}
      viewBox="0 0 320 190"
      focusable="false"
    >
      <title id={titleId}>{title}</title>
      <rect x="18" y="18" width="284" height="154" rx="22" fill="currentColor" opacity="0.06" />
      {illustrationKey === 'playground-storage-box' && (
        <>
          <path d="M86 78h148l-10 70H96z" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M78 77h164l-12-21H90z" fill="none" stroke="currentColor" strokeWidth="5" />
          <circle cx="130" cy="108" r="19" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M129 89v38M110 108h39M113 144h95" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {illustrationKey === 'missing-umbrella-tag' && (
        <>
          <path d="M160 52v91M160 52c-26 0-48 21-48 47h96c0-26-22-47-48-47Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
          <path d="M160 143c0 17 18 19 18 4v-4M94 144h44M207 127l24 25M231 127l-24 25" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="104" cy="132" r="10" fill="none" stroke="currentColor" strokeWidth="5" />
        </>
      )}
      {illustrationKey === 'club-notice-poster' && (
        <>
          <rect x="104" y="42" width="112" height="105" rx="6" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M121 72h78M121 90h48M121 122h64" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <circle cx="181" cy="104" r="14" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M151 147v14M169 147v14" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {illustrationKey === 'library-window-seat' && (
        <>
          <path d="M84 44h126v105H84zM147 44v105M84 97h126" fill="none" stroke="currentColor" strokeWidth="5" />
          <path d="M62 149h192M106 149v13M212 149v13" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="m54 63 18 10-18 10M266 63l-18 10 18 10" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
