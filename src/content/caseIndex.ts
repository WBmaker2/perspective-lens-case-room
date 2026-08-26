import type { CaseId, CasePack } from '../model/case';
import { validateCasePack } from '../domain/validateCasePack';
import { playgroundStorageBox } from './cases/playgroundStorageBox';
import { missingUmbrellaTag } from './cases/missingUmbrellaTag';
import { clubNoticePoster } from './cases/clubNoticePoster';
import { libraryWindowSeat } from './cases/libraryWindowSeat';

const unpublishedCasePacks: readonly CasePack[] = [playgroundStorageBox, missingUmbrellaTag, clubNoticePoster, libraryWindowSeat];

unpublishedCasePacks.forEach((pack) => {
  const issues = validateCasePack(pack);
  if (issues.length > 0) {
    throw new Error(`Invalid case pack '${pack.id}': ${issues.map((item) => `${item.path} (${item.message})`).join('; ')}`);
  }
});

export const casePacks: readonly CasePack[] = Object.freeze(unpublishedCasePacks);

export const getCasePack = (caseId: CaseId): CasePack => {
  const pack = casePacks.find((item) => item.id === caseId);
  if (!pack) throw new Error(`Unknown case pack '${caseId}'.`);
  return pack;
};
