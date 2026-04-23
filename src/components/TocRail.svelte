<script lang="ts">
  import type { Heading } from '$lib/markdown.ts';

  interface Props {
    headings: Heading[];
  }
  let { headings }: Props = $props();

  let activeId = $state('');

  $effect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return;

    const ids = headings.map((h) => h.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const root = document.querySelector('main');
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const next = visible[0]?.id ?? activeId;
        if (next !== activeId) activeId = next;
      },
      { root, rootMargin: '-48px 0px -70% 0px', threshold: 0 },
    );
    for (const el of els) obs.observe(el);

    const scrollEl = root ?? window;
    const onScroll = (): void => {
      if (activeId !== '' && els[0].getBoundingClientRect().top > 80) activeId = '';
    };
    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      obs.disconnect();
      scrollEl.removeEventListener('scroll', onScroll);
    };
  });

  function go(id: string, e: MouseEvent): void {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const root = document.querySelector('main');
    if (root) {
      const top = el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 12;
      root.scrollTo({ top, behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

{#if headings.length > 0}
  <nav class="toc" aria-label="on this page">
    {#each headings as h (h.id)}
      <a
        href="#{h.id}"
        class="tick"
        class:l2={h.level === 2}
        class:l3={h.level >= 3}
        class:active={activeId === h.id}
        onclick={(e) => go(h.id, e)}
      >
        <span class="line" aria-hidden="true"></span>
        <span class="label">{h.text}</span>
      </a>
    {/each}
  </nav>
{/if}

<style>
  .toc {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px 0;
    font-size: 12.5px;
  }
  .tick {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 14px;
    color: var(--text-mute);
    text-decoration: none;
    transition: color var(--t-fast);
  }
  .line {
    display: block;
    height: 1px;
    background: currentColor;
    flex: 0 0 auto;
    transition: width var(--t-fast), background var(--t-fast);
  }
  .l2 .line { width: 24px; }
  .l3 { padding-left: 14px; }
  .l3 .line { width: 14px; }

  .label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 160px;
    opacity: 0;
    transform: translateX(-3px);
    transition: opacity var(--t-fast), transform var(--t-fast), color var(--t-fast);
  }

  .tick:hover,
  .tick:focus-visible {
    color: var(--text);
    outline: none;
  }
  .tick:hover .label,
  .tick:focus-visible .label {
    opacity: 1;
    transform: none;
  }

  .tick.active { color: var(--rust); }
  .tick.active .line { background: var(--rust); }
  .tick.active .label { opacity: 1; transform: none; color: var(--rust); }
</style>
