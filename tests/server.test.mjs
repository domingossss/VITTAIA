import test from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('prévia entrega módulos JavaScript e bloqueia arquivos internos', async (t) => {
  const port = await new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const selected = probe.address().port;
      probe.close(() => resolve(selected));
    });
  });
  const child = spawn(process.execPath, [fileURLToPath(new URL('../tools/serve.mjs', import.meta.url))], {
    env: { ...process.env, PORT: String(port) }, stdio: ['ignore', 'pipe', 'pipe'],
  });
  t.after(() => child.kill());
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('A prévia não iniciou.')), 15000);
    child.once('error', reject);
    child.stdout.on('data', (chunk) => {
      if (chunk.toString().includes('VITTAIA:')) { clearTimeout(timeout); resolve(); }
    });
  });
  const origin = `http://127.0.0.1:${port}`;
  assert.equal((await fetch(origin)).status, 200);
  const module = await fetch(origin + '/js/main.js');
  assert.equal(module.status, 200);
  assert.match(module.headers.get('content-type'), /javascript/);
  assert.equal((await fetch(origin + '/.git/config')).status, 403);
  assert.equal((await fetch(origin + '/package.json')).status, 403);
});
