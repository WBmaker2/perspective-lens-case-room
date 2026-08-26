import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const roots = ['src', 'scripts', 'tests'];
const extensions = new Set(['.ts', '.tsx', '.css', '.mjs']);
const offenders = [];

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') return;
    throw error;
  }
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (extensions.has(path.slice(path.lastIndexOf('.'))) && !entry.name.endsWith('.d.ts')) {
      const content = await readFile(path, 'utf8');
      const lines = content === '' ? 0 : content.split('\n').length;
      if (lines >= 500) offenders.push({ path: relative('.', path), lines });
    }
  }
}

for (const root of roots) await walk(root);
if (offenders.length > 0) {
  for (const offender of offenders) console.error(`${offender.path}: ${offender.lines} lines`);
  process.exitCode = 1;
} else {
  console.log('PASS: all checked source files are 499 lines or fewer');
}
