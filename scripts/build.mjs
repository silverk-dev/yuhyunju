// Only website pages and assets enter the public deployment.
import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'exhibitions.html', 'exhibition.html', 'about.html', 'research.html', 'css', 'js', 'images']) {
  await cp(join(root, file), join(output, file), { recursive: true });
}
// Avoid browsers retaining old editable scripts after a deployment.
await writeFile(join(output, '_headers'), '/js/*\n  Cache-Control: public, max-age=0, must-revalidate\n/css/*\n  Cache-Control: public, max-age=0, must-revalidate\n');
for (const file of ['index.html','exhibitions.html','exhibition.html','about.html','research.html']) {
  const html = await readFile(join(output, file), 'utf8');
  if (!html.includes('js/data.js')) throw new Error(`Missing content script: ${file}`);
}
console.log('Static portfolio prepared in dist/');
