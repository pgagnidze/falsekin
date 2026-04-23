/** Vite's `base` (e.g. '/' in dev, '/falsekin/' on GitHub Pages). Always ends in '/'. */
const BASE = import.meta.env.BASE_URL;

/** Build a URL for any file under /public, accounting for the deploy base path. */
export function asset(path: string): string {
  return BASE + path.replace(/^\//, '');
}

/** Build a URL for a sprite filename stored in /public/assets. */
export function sprite(filename: string | undefined): string {
  if (!filename) return '';
  return asset(`assets/${filename}`);
}

/** Build a URL for a video filename stored in /public/videos. */
export function video(filename: string | undefined): string {
  if (!filename) return '';
  return asset(`videos/${filename}`);
}

/**
 * Rewrite root-absolute /assets/ and /videos/ URLs in HTML to include the deploy base.
 * Used after marked renders markdown, markdown authors write `/assets/foo.png`
 * for editor convenience and we patch the prefix at render time.
 */
export function rewriteAssetUrls(html: string): string {
  return html.replace(/(src|href)="\/(assets|videos)\//g, `$1="${BASE}$2/`);
}
