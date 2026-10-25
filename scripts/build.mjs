// Publish exactly one HTML file plus the existing styles, scripts and images.
import { mkdir, cp, readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
// Remove only obsolete generated HTML files when rebuilding an older local dist/.
for (const name of ['exhibitions.html', 'exhibition.html', 'about.html', 'research.html']) {
  try { await unlink(join(output, name)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const file of ['index.html', 'css', 'js', 'images']) {
  await cp(join(root, file), join(output, file), { recursive: true });
}
await writeFile(join(output, '_headers'), '/js/*\n  Cache-Control: public, max-age=0, must-revalidate\n/css/*\n  Cache-Control: public, max-age=0, must-revalidate\n');
// Rewrites preserve all original query parameters (language and exhibition id).
const legacy = ['exhibitions','exhibition','critique','about','research'];
await writeFile(join(output, '_redirects'), legacy.flatMap(page => [
  `/${page} /index.html 200!`, `/${page}.html /index.html 200!`
]).join('\n') + '\n');
const html = await readFile(join(output, 'index.html'), 'utf8');
for (const script of ['router','data','translations','i18n','main','exhibitions']) {
  if (!html.includes(`js/${script}.js`)) throw new Error(`Missing script: ${script}`);
}
for (const page of legacy) if (!html.includes(`id="view-${page}"`)) throw new Error(`Missing view: ${page}`);
const htmlFiles = (await readdir(output)).filter(name => name.endsWith('.html'));
if (htmlFiles.length !== 1 || htmlFiles[0] !== 'index.html') throw new Error('Expected only index.html in dist/');
console.log('Single-HTML portfolio prepared in dist/; legacy links preserved.');
