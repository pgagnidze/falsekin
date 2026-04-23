<script lang="ts">
  import type { NavItem } from '$lib/types.ts';
  import { navigate } from '$lib/routing.ts';
  import { asset } from '$lib/assets.ts';

  interface Props {
    items: NavItem[];
    currentRoute: string;
    collapsed: boolean;
    onToggleCollapse: () => void;
    mobileOpen?: boolean;
    onMobileClose?: () => void;
  }
  let { items, currentRoute, collapsed, onToggleCollapse, mobileOpen = false, onMobileClose }: Props = $props();

  function isActive(route: string): boolean {
    if (route === '/') return currentRoute === '/';
    return currentRoute === route || currentRoute.startsWith(route + '/');
  }

  const COLOR_VARS: Record<string, string> = {
    gold: 'var(--gold)',
    pink: 'var(--pink)',
    green: 'var(--green)',
    cyan: 'var(--cyan)',
  };

  function handleNav(e: MouseEvent, route: string): void {
    e.preventDefault();
    navigate(route);
    onMobileClose?.();
  }

  function pixelSprite(art: string): string {
    const rows = art.trim().split('\n');
    const parts: string[] = [];
    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      let x = 0;
      while (x < row.length) {
        if (row[x] === '#') {
          let len = 1;
          while (x + len < row.length && row[x + len] === '#') len++;
          parts.push(`<rect x="${x}" y="${y}" width="${len}" height="1"/>`);
          x += len;
        } else {
          x++;
        }
      }
    }
    return parts.join('');
  }
</script>

<aside class="sidebar" class:collapsed class:mobile-open={mobileOpen}>
  <div class="brand">
    <a
      href="#/"
      class="brand-full"
      title="falsekin"
      aria-label="falsekin home"
      onclick={(e) => handleNav(e, '/')}
    >
      <img src={asset('falsekin.png')} alt="" class="brand-logo" />
      <span class="brand-name">falsekin</span>
    </a>
    <button
      class="brand-toggle-collapse"
      onclick={onToggleCollapse}
      title="Collapse sidebar"
      aria-label="Collapse sidebar"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
    </button>
    <button
      class="brand-toggle-expand"
      onclick={onToggleCollapse}
      title="Expand sidebar"
      aria-label="Expand sidebar"
    >
      <img src={asset('falsekin.png')} alt="" class="brand-logo brand-logo-icon" />
      <svg class="expand-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
    </button>
  </div>

  <nav class="nav">
    {#each items as item}
      <a
        class="item"
        class:active={isActive(item.route)}
        href={'#' + item.route}
        style:--item-color={item.color ? COLOR_VARS[item.color] : undefined}
        onclick={(e) => handleNav(e, item.route)}
        title={collapsed ? item.label : undefined}
      >
        <svg
          class="icon"
          viewBox="0 0 16 16"
          fill="currentColor"
          shape-rendering="crispEdges"
          aria-hidden="true">{@html pixelSprite(item.icon)}</svg>
        <span class="label">{item.label}</span>
        {#if item.aux}<span class="aux">{item.aux}</span>{/if}
      </a>
    {/each}
  </nav>
</aside>

<style>
  .sidebar {
    background: var(--bg-panel);
    border-right: 1px solid var(--line);
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-size: 13px;
  }

  .brand {
    height: var(--header-h);
    border-bottom: 1px solid var(--line);
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }

  .brand-full {
    position: absolute;
    inset: 0;
    padding: 0 10px 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text);
    transition: opacity var(--t-norm), color var(--t-fast);
  }
  .brand-full:hover { color: var(--rust-hot); }
  .brand-full:hover .brand-logo { border-color: var(--rust); box-shadow: 0 0 10px rgba(210, 100, 58, 0.25); }

  .brand-logo {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    image-rendering: pixelated;
    background: var(--bg);
    border: 1px solid var(--line-mid);
    border-radius: 50%;
    object-fit: contain;
    padding: 2px;
    transition: border-color var(--t-fast), box-shadow var(--t-fast);
  }

  .brand-name {
    font-weight: 600;
    letter-spacing: 0.04em;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
  }

  .brand-toggle-collapse {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-mute);
    transition: opacity var(--t-norm), color var(--t-fast);
  }
  .brand-toggle-collapse:hover { color: var(--text); }
  .brand-toggle-collapse svg { width: 16px; height: 16px; }

  .brand-toggle-expand {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-mute);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--t-norm), color var(--t-fast);
  }
  .brand-toggle-expand:hover { color: var(--text); }
  .brand-toggle-expand .brand-logo-icon {
    transition: opacity var(--t-fast);
  }
  .brand-toggle-expand .expand-arrow {
    position: absolute;
    width: 16px;
    height: 16px;
    opacity: 0;
    transition: opacity var(--t-fast);
  }

  .sidebar.collapsed .brand-full,
  .sidebar.collapsed .brand-toggle-collapse {
    opacity: 0;
    pointer-events: none;
  }
  .sidebar.collapsed .brand-toggle-expand {
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar.collapsed .brand-toggle-expand:hover .brand-logo-icon { opacity: 0; }
  .sidebar.collapsed .brand-toggle-expand:hover .expand-arrow { opacity: 1; }

  .nav {
    flex: 1;
    padding: 8px 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 12px;
    margin: 1px 8px;
    color: var(--text-soft);
    white-space: nowrap;
    border-radius: var(--r-md);
    position: relative;
    transition:
      background var(--t-fast),
      color var(--t-fast),
      padding var(--t-norm),
      margin var(--t-norm),
      gap var(--t-norm),
      border-radius var(--t-norm);
  }
  .item:hover { background: var(--bg-elev); color: var(--text); }

  .item::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: var(--item-color, var(--rust));
    border-radius: 0 2px 2px 0;
    opacity: 0;
    transition: opacity var(--t-fast), left var(--t-norm), border-radius var(--t-norm);
  }
  .item.active {
    background: var(--bg-elev);
    color: var(--item-color, var(--rust-hot));
  }
  .item.active::before { opacity: 1; }

  .icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    opacity: 0.75;
    color: var(--item-color, currentColor);
    image-rendering: pixelated;
    transition: opacity var(--t-fast);
  }
  .item.active .icon,
  .item:hover .icon { opacity: 1; }

  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    opacity: 1;
    transition: max-width var(--t-norm), opacity var(--t-norm);
  }

  .aux {
    font-size: 10px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    overflow: hidden;
    max-width: 100px;
    opacity: 1;
    transition: max-width var(--t-norm), opacity var(--t-norm);
  }

  /* padding+margin on both axes must sum to the expanded values (6px, 8+12=20px) so height/icon don't jump */
  .sidebar.collapsed .item {
    margin: 1px 0;
    padding: 6px calc((var(--side-w-collapsed) - 16px) / 2);
    gap: 0;
    border-radius: 0;
  }
  .sidebar.collapsed .item::before {
    left: 0;
    border-radius: 0;
  }
  .sidebar.collapsed .label,
  .sidebar.collapsed .aux {
    max-width: 0;
    opacity: 0;
  }

  @media (max-width: 760px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: min(280px, 84vw);
      z-index: 100;
      transform: translateX(-100%);
      transition: transform var(--t-norm);
      box-shadow: 2px 0 18px rgba(0, 0, 0, 0.6);
    }
    .sidebar.mobile-open { transform: translateX(0); }
    .brand-toggle-collapse,
    .brand-toggle-expand { display: none; }

    /* force expanded layout regardless of desktop collapsed state */
    .sidebar.collapsed .brand-full { opacity: 1; pointer-events: auto; }
    .sidebar.collapsed .item {
      margin: 1px 8px;
      padding: 6px 12px;
      gap: 10px;
      border-radius: var(--r-md);
    }
    .sidebar.collapsed .item::before {
      left: -8px;
      border-radius: 0 2px 2px 0;
    }
    .sidebar.collapsed .label,
    .sidebar.collapsed .aux {
      max-width: 200px;
      opacity: 1;
    }
  }
</style>
