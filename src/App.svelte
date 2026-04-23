<script lang="ts">
  import { parseHash, type Route } from '$lib/routing.ts';
  import { NAV } from '$lib/nav.ts';
  import { BUILDS } from '$lib/builds.ts';
  import Header from '$components/Header.svelte';
  import Sidebar from '$components/Sidebar.svelte';
  import Home from '$pages/Home.svelte';
  import Builds from '$pages/Builds.svelte';
  import BuildDetail from '$pages/BuildDetail.svelte';
  import Guides from '$pages/Guides.svelte';
  import GuidePage from '$pages/GuidePage.svelte';
  import Suggestions from '$pages/Suggestions.svelte';
  import TierListPage from '$pages/TierListPage.svelte';
  import NotFound from '$pages/NotFound.svelte';

  const SIDEBAR_KEY = 'falsekin-sidebar-collapsed';

  const GUIDE_TITLES: Record<string, string> = {
    introduction: 'Introduction',
    mods: 'Mods',
    tweaks: 'Tweaks',
  };

  const TIER_TITLES: Record<string, string> = {
    mutations: 'Mutations',
    cybernetics: 'Cybernetics',
  };

  let route: Route = $state(parseHash());
  let collapsed = $state(
    typeof window !== 'undefined' && localStorage.getItem(SIDEBAR_KEY) === '1',
  );
  let mobileOpen = $state(false);

  $effect(() => {
    const handler = (): void => {
      route = parseHash();
      window.scrollTo(0, 0);
      mobileOpen = false;
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  });

  const pageTitle = $derived.by(() => {
    switch (route.page) {
      case 'home': return 'Home';
      case 'builds': return 'Builds';
      case 'build': {
        const b = BUILDS.find((x) => x.slug === route.slug);
        return b ? b.name : 'Build';
      }
      case 'guides': return 'Guides';
      case 'guide': return GUIDE_TITLES[route.slug ?? ''] ?? 'Guide';
      case 'suggestions': return 'Suggestions';
      case 'tier-list': return TIER_TITLES[route.slug ?? ''] ?? 'Picks';
      default: return 'Not found';
    }
  });

  $effect(() => {
    document.title = `${pageTitle} · falsekin`;
  });

  function toggleCollapsed(): void {
    collapsed = !collapsed;
    localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
  }

  function toggleMobile(): void {
    mobileOpen = !mobileOpen;
  }
  function closeMobile(): void {
    mobileOpen = false;
  }

  const currentRoute = $derived.by(() => {
    switch (route.page) {
      case 'home': return '/';
      case 'builds': return '/builds';
      case 'build': return `/builds/${route.slug}`;
      case 'guides': return '/guides';
      case 'guide': return `/guides/${route.slug}`;
      case 'suggestions': return '/suggestions';
      case 'tier-list': return `/suggestions/${route.slug}`;
      default: return '';
    }
  });
</script>

<div class="app" class:collapsed class:mobile-open={mobileOpen}>
  <Sidebar
    items={NAV}
    {currentRoute}
    {collapsed}
    onToggleCollapse={toggleCollapsed}
    {mobileOpen}
    onMobileClose={closeMobile}
  />
  {#if mobileOpen}
    <button
      class="backdrop"
      onclick={closeMobile}
      aria-label="Close navigation"
    ></button>
  {/if}
  <div class="main-col">
    <Header title={pageTitle} onMobileToggle={toggleMobile} />
    <main>
      {#if route.page === 'home'}
        <Home />
      {:else if route.page === 'builds'}
        <Builds />
      {:else if route.page === 'build' && route.slug}
        <BuildDetail slug={route.slug} />
      {:else if route.page === 'guides'}
        <Guides />
      {:else if route.page === 'guide' && route.slug}
        <GuidePage slug={route.slug} />
      {:else if route.page === 'suggestions'}
        <Suggestions />
      {:else if route.page === 'tier-list' && route.slug}
        <TierListPage slug={route.slug} />
      {:else}
        <NotFound />
      {/if}
    </main>
  </div>
</div>

<style>
  .app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    grid-template-columns: var(--side-w) minmax(0, 1fr);
    z-index: 2;
    transition: grid-template-columns var(--t-norm);
  }
  .app.collapsed { --side-w: var(--side-w-collapsed); }

  .main-col {
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  main {
    flex: 1;
    padding: 20px clamp(16px, 3vw, 36px);
    min-width: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 90;
    animation: fadeIn var(--t-norm) ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 760px) {
    .app { grid-template-columns: 1fr; }
    .app.collapsed { --side-w: 1fr; }
    .backdrop { display: block; }
    main { padding: 16px 14px; }
  }
</style>
