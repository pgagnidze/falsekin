<script lang="ts">
  interface LinkItem {
    label: string;
    href: string;
  }

  interface Props {
    title: string;
    onMobileToggle?: () => void;
  }

  let { title, onMobileToggle }: Props = $props();

  const QUD_LINKS: LinkItem[] = [
    { label: 'caves of qud', href: 'https://www.cavesofqud.com/' },
    { label: 'wiki', href: 'https://wiki.cavesofqud.com/wiki/Caves_of_Qud_Wiki' },
    { label: 'view source', href: 'https://github.com/pgagnidze/falsekin' },
  ];
</script>

<header class="hdr">
  <button
    class="hamburger"
    onclick={onMobileToggle}
    aria-label="Open navigation"
    title="Open navigation"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
  <h1 class="title">{title}</h1>
  <div class="links">
    {#each QUD_LINKS as l}
      <a href={l.href} target="_blank" rel="noopener">{l.label}</a>
    {/each}
  </div>
</header>

<style>
  .hdr {
    height: var(--header-h);
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0 clamp(14px, 3vw, 28px);
    background: var(--bg-panel);
    flex-shrink: 0;
  }

  .hamburger {
    display: none;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    color: var(--text);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: -6px;
    flex-shrink: 0;
  }
  .hamburger svg { width: 20px; height: 20px; }
  .hamburger:hover { color: var(--rust-hot); }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.04em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
  }
  .links a {
    color: var(--text-mute);
    font-size: 12px;
    transition: color var(--t-fast);
  }
  .links a:hover { color: var(--rust-hot); }

  @media (max-width: 760px) {
    .hamburger { display: flex; }
    .links { gap: 10px; }
    .links a { font-size: 11.5px; }
    .links a:first-child { display: none; }
    .hdr { padding: 0 14px; gap: 8px; }
  }

  @media (max-width: 440px) {
    .links a:nth-child(2) { display: none; }
  }
</style>
