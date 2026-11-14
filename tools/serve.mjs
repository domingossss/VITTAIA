import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 5173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
};

http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const allowed = pathname === '/' || pathname === '/index.html' ||
      ['/styles/', '/js/', '/assets/'].some((prefix) => pathname.startsWith(prefix));
    const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!allowed || !file.startsWith(root + sep) || pathname.split('/').some((part) => part.startsWith('.'))) {
      response.writeHead(403).end('Acesso não permitido.');
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Arquivo não encontrado.');
    response.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Content-Length', info.size);
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(404).end('Arquivo não encontrado.');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`VITTAIA: http://127.0.0.1:${port}`);
  console.log('Edite os arquivos da raiz e atualize o navegador para ver as alterações.');
});
