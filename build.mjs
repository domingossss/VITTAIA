import { build, context } from 'esbuild';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Compila os módulos para um script que também funciona ao abrir index.html diretamente.
process.chdir(dirname(fileURLToPath(import.meta.url)));
const watch = process.argv.includes('--watch');
const options = {
  entryPoints: ['js/main.js'],
  outfile: 'js/site.js',
  bundle: true,
  format: 'iife',
  target: 'es2020',
  minify: !watch,
  logLevel: 'info',
};

const require = createRequire(import.meta.url);
const cli = resolve(dirname(require.resolve('@tailwindcss/cli/package.json')), 'dist/index.mjs');
const css = spawn(process.execPath, [
  cli, '-i', './styles/main.css', '-o', './styles/site.css',
  watch ? '--watch' : '--minify',
], { stdio: 'inherit' });
const cssDone = new Promise((resolve, reject) => {
  css.on('error', reject);
  css.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`Tailwind: ${code}`)));
});

let js;
try {
  if (watch) {
    js = await context(options);
    await js.watch();
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.once(signal, async () => {
        css.kill();
        await js.dispose();
        process.exit(0);
      });
    }
    console.log('CSS e JavaScript: acompanhando alterações.');
  } else {
    await build(options);
  }
  await cssDone;
  await js?.dispose();
} catch (error) {
  css.kill();
  await js?.dispose();
  console.error(error);
  process.exitCode = 1;
}
