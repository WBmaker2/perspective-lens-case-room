import type { CaseId } from './case';
import type { StageId } from './session';

export interface ReadingPreferences {
  fontSize: 18 | 20 | 22;
  lineHeight: 1.6 | 1.8 | 2;
  readingWidth: 'narrow' | 'standard';
}

export type UpdateEntry =
  | {
      date: `${number}-${number}-${number}`;
      category: '설계' | '개발' | '개선';
      summary: string;
    }
  | {
      date: `${number}-${number}-${number}`;
      category: '콘텐츠 검수' | '표현 수정';
      caseId: CaseId;
      summary: string;
    };

export const DEFAULT_READING_PREFERENCES: ReadingPreferences = {
  fontSize: 20,
  lineHeight: 1.8,
  readingWidth: 'standard',
};

export interface AppViewModel {
  session: import('./session').CaseSession;
  selectedPack: import('./case').CasePack | null;
  gate: { ready: boolean; reason: string };
}

export interface StageDescriptor {
  id: StageId;
  label: string;
}

export const stageDescriptors: readonly StageDescriptor[] = [
  { id: 'intake', label: '사건 접수' },
  { id: 'lenses', label: '렌즈 A/B' },
  { id: 'evidence', label: '근거 보드' },
  { id: 'comparison', label: '교차 조사' },
  { id: 'rewrite', label: '관점 전환' },
  { id: 'report', label: '사건 보고서' },
];

export const stageLabel = (stage: StageId): string => stageDescriptors.find((item) => item.id === stage)?.label ?? stage;
