/**
 * Hash-based SPA router.
 * Routes are keyed on the first hash segment.
 * Examples:
 *   #/              -> home
 *   #/builds        -> builds index
 *   #/builds/gorg   -> build detail for gorg
 *   #/guides        -> guides index
 *   #/guides/introduction
 *   #/guides/mods
 *   #/suggestions/mutations
 */

export interface Route {
  page:
    | 'home'
    | 'builds'
    | 'build'
    | 'guides'
    | 'guide'
    | 'suggestions'
    | 'tier-list'
    | 'not-found';
  slug?: string;
}

export function parseHash(hash: string = window.location.hash): Route {
  const h = hash.replace(/^#\/?/, '').replace(/^\/+/, '').split('?')[0];
  if (!h) return { page: 'home' };
  const parts = h.split('/').filter(Boolean);

  switch (parts[0]) {
    case 'builds':
      return parts[1] ? { page: 'build', slug: parts[1] } : { page: 'builds' };
    case 'guides':
      return parts[1] ? { page: 'guide', slug: parts[1] } : { page: 'guides' };
    case 'suggestions':
      return parts[1] ? { page: 'tier-list', slug: parts[1] } : { page: 'suggestions' };
    default:
      return { page: 'not-found' };
  }
}

export function navigate(path: string): void {
  const normalized = path.startsWith('#') ? path : `#${path.startsWith('/') ? '' : '/'}${path}`;
  if (window.location.hash !== normalized) {
    window.location.hash = normalized;
  }
}

export const PAGE_TITLES: Record<Route['page'], string> = {
  home: 'Simple Qud Survival Guide',
  builds: 'Builds',
  build: 'Build',
  guides: 'Guides',
  guide: 'Guide',
  suggestions: 'Suggestions',
  'tier-list': 'Picks',
  'not-found': 'Not found',
};
