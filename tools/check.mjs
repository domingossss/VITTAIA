import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? files(path) : path;
  }))).flat();
}

const html = await readFile(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) throw new Error('Existem IDs repetidos no HTML.');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(match[1])) throw new Error(`Seção não encontrada: ${match[1]}`);
}

async function checkReference(from, reference) {
  if (/^(?:https?:|data:|#)/.test(reference)) return;
  const path = resolve(dirname(from), reference.split(/[?#]/)[0]);
  await stat(path).catch(() => { throw new Error(`Arquivo ausente em ${relative(root, from)}: ${reference}`); });
}

for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  await checkReference(resolve(root, 'index.html'), match[1]);
}
for (const file of [...await files(resolve(root, 'styles')), ...await files(resolve(root, 'js'))]) {
  const content = await readFile(file, 'utf8');
  if (file.endsWith('.css')) {
    for (const match of content.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/g)) {
      await checkReference(file, match[2]);
    }
  }
  if (file.endsWith('.js')) {
    for (const match of content.matchAll(/from\s+['"]([^'"]+)['"]/g)) await checkReference(file, match[1]);
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr);
  }
}
console.log('OK: HTML, âncoras, imagens, estilos, importações e sintaxe JavaScript.');
