import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const out = resolve(root, 'dist-operations-preview');
if (!existsSync(resolve(dist, 'preview/operations/index.html'))) throw new Error('Run the Astro build first.');
rmSync(out, { recursive: true, force: true });
mkdirSync(resolve(out, 'preview'), { recursive: true });
cpSync(resolve(dist, 'preview/operations'), resolve(out, 'preview/operations'), { recursive: true });
cpSync(resolve(dist, '_astro'), resolve(out, '_astro'), { recursive: true });
mkdirSync(resolve(out, 'assets'));
for (const file of ['logo-mark.svg', 'studio-room-wide.jpg']) cpSync(resolve(dist, 'assets', file), resolve(out, 'assets', file));
cpSync(resolve(dist, 'assets/fonts'), resolve(out, 'assets/fonts'), { recursive: true });
// The current manuscript stays out of the public source repository. Supply it only
// while packaging the explicitly authorized, owner-only book-download preview.
const bookFile = process.env.REVIEW_BOOK_PDF;
if (bookFile) {
  const pdf = readFileSync(resolve(bookFile));
  if (pdf.subarray(0, 5).toString() !== '%PDF-') throw new Error('REVIEW_BOOK_PDF must be a PDF.');
  writeFileSync(resolve(out, 'assets/the-org-age-of-ai-current-draft.pdf'), pdf);
}
const downloadPage = readFileSync(resolve(out, 'preview/operations/book/download/index.html'), 'utf8');
if (downloadPage.includes('/assets/the-org-age-of-ai-current-draft.pdf') && !bookFile) {
  throw new Error('This build links the private book PDF; provide REVIEW_BOOK_PDF when exporting.');
}
writeFileSync(resolve(out, 'index.html'), readFileSync(resolve(dist, 'preview/operations/index.html')));
writeFileSync(resolve(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`Isolated review export: ${out}`);
