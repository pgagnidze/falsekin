import { marked } from 'marked';
import { rewriteAssetUrls } from './assets.ts';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export interface Heading {
  level: number;
  text: string;
  id: string;
}

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, '');
}

function slugify(s: string): string {
  return stripTags(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function uniquify(base: string, seen: Map<string, number>): string {
  const n = seen.get(base) ?? 0;
  seen.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

const HEADING_HTML_RE = /<h([2-4])>([\s\S]*?)<\/h\1>/g;

const RENDER_CACHE = new Map<string, string>();

export function renderMarkdown(md: string): string {
  const cached = RENDER_CACHE.get(md);
  if (cached !== undefined) return cached;
  const raw = marked.parse(md) as string;
  const seen = new Map<string, number>();
  const withIds = raw.replace(HEADING_HTML_RE, (_m, level, inner) => {
    const id = uniquify(slugify(inner), seen);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  const out = rewriteAssetUrls(withIds);
  RENDER_CACHE.set(md, out);
  return out;
}

export function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  const seen = new Map<string, number>();
  for (const m of md.matchAll(/^(#{2,4})\s+(.+)$/gm)) {
    const level = m[1].length;
    const raw = m[2].trim();
    out.push({
      level,
      text: stripTags(raw).trim(),
      id: uniquify(slugify(raw), seen),
    });
  }
  return out;
}
