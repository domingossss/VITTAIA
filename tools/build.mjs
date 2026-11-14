import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const staging = resolve(root, '.build-staging');
const destination = resolve(root, 'dist');

// Somente estas duas pastas geradas podem ser limpas pelo processo.
if (staging !== resolve(root, '.build-staging') || destination !== resolve(root, 'dist')) {
  throw new Error('Destino de publicação inválido.');
}

await rm(staging, { recursive: true, force: true });
await mkdir(staging, { recursive: true });
for (const source of ['index.html', 'styles', 'js', 'assets']) {
  await cp(resolve(root, source), resolve(staging, source), { recursive: true });
}
// A origem já foi copiada com sucesso antes da substituição da pasta publicada.
await rm(destination, { recursive: true, force: true });
await cp(staging, destination, { recursive: true });
await rm(staging, { recursive: true, force: true });
console.log('Site preparado em dist/. Edite os arquivos da raiz, não a cópia gerada.');
