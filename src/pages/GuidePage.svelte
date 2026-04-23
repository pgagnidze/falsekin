<script lang="ts">
  import Prose from '$components/Prose.svelte';
  import Callout from '$components/Callout.svelte';
  import TocRail from '$components/TocRail.svelte';
  import NotFound from './NotFound.svelte';
  import introMd from '../content/guides/introduction.md?raw';
  import tweaksMd from '../content/guides/tweaks.md?raw';
  import { MODS, MODS_INTRO, MODS_CALLOUT, workshopUrl } from '$lib/mods.ts';
  import { extractHeadings } from '$lib/markdown.ts';

  interface Props {
    slug: string;
  }
  let { slug }: Props = $props();

  const KNOWN_SLUGS = new Set(['introduction', 'mods', 'tweaks']);

  const proseContent = $derived.by(() => {
    if (slug === 'introduction') return introMd;
    if (slug === 'tweaks') return tweaksMd;
    return undefined;
  });
  const isMods = $derived(slug === 'mods');
  const known = $derived(KNOWN_SLUGS.has(slug));
  const headings = $derived.by(() =>
    proseContent !== undefined ? extractHeadings(proseContent) : [],
  );
</script>

{#if !known}
  <NotFound />
{:else if isMods}
  <p class="intro">{MODS_INTRO}</p>
  <div class="list">
    {#each MODS as m (m.workshopId)}
      <a class="row" href={workshopUrl(m.workshopId)} target="_blank" rel="noopener">
        <div class="n">{m.title}</div>
        <div class="d">{m.description}</div>
        <span class="arr">↗</span>
      </a>
    {/each}
  </div>
  <Callout>{MODS_CALLOUT}</Callout>
{:else if proseContent !== undefined}
  <div class="doc">
    <div class="doc-body">
      <Prose markdown={proseContent} />
    </div>
    <aside class="doc-toc">
      <TocRail {headings} />
    </aside>
  </div>
{/if}

<style>
  .intro { color: var(--text-soft); margin-bottom: 14px; }
  .list { display: grid; gap: 8px; margin-bottom: 20px; }
  .row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 6px 14px;
    padding: 12px 14px;
    background: var(--bg-panel);
    border: 1px solid var(--line);
    transition: border-color var(--t-fast);
  }
  .row:hover { border-color: var(--line-on); }
  .n { font-size: 14px; font-weight: 600; color: var(--text); grid-column: 1; }
  .d { font-size: 12.5px; color: var(--text-soft); grid-column: 1 / span 2; }
  .arr { color: var(--text-mute); align-self: start; grid-column: 2; grid-row: 1; }
  .row:hover .arr { color: var(--rust); }

  .doc {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 48px;
    align-items: start;
  }
  .doc-body { max-width: 90ch; min-width: 0; }
  .doc-toc {
    position: sticky;
    top: 8px;
    align-self: start;
  }

  @media (max-width: 1100px) {
    .doc { grid-template-columns: minmax(0, 1fr); gap: 0; }
    .doc-toc { display: none; }
  }
</style>
