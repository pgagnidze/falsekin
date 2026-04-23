<script lang="ts">
  import NotFound from './NotFound.svelte';
  import { findTierList } from '$lib/tier-lists.ts';
  import { sprite } from '$lib/assets.ts';
  import type { Tier, TierEntry } from '$lib/types.ts';

  interface Props {
    slug: string;
  }
  let { slug }: Props = $props();

  const list = $derived(findTierList(slug));

  const TIER_ORDER: Tier[] = ['S', 'A', 'B', 'C', 'D'];
  const TIER_COLOR: Record<Tier, string> = {
    S: 'var(--gold)',
    A: 'var(--green)',
    B: 'var(--cyan)',
    C: 'var(--text-soft)',
    D: 'var(--text-mute)',
    untagged: 'var(--text-dim)',
  };

  let activeGroup = $state<string | null>(null);
  let activeTier = $state<Tier | 'all'>('all');
  let activeSlot = $state<string>('all');

  function parseSlots(s: string | undefined): string[] {
    return s ? s.split(',').map((x) => x.trim()) : [];
  }

  function groupByTier(entries: TierEntry[]): Record<Tier, TierEntry[]> {
    const out: Record<Tier, TierEntry[]> = {
      S: [], A: [], B: [], C: [], D: [], untagged: [],
    };
    for (const e of entries) out[e.tier].push(e);
    return out;
  }

  const availableSlots = $derived.by(() => {
    if (!list || !list.entries) return [];
    const set = new Set<string>();
    for (const e of list.entries) for (const s of parseSlots(e.slot)) set.add(s);
    return Array.from(set).sort();
  });

  const groups = $derived.by(() => {
    if (!list) return [];
    const entryMatches = (e: TierEntry): boolean =>
      activeSlot === 'all' || parseSlots(e.slot).includes(activeSlot);
    const filter = (entries: TierEntry[]): TierEntry[] => entries.filter(entryMatches);
    if (list.groups) {
      const gs = activeGroup && activeGroup !== 'all'
        ? list.groups.filter((g) => g.label === activeGroup)
        : list.groups;
      return gs.map((g) => ({ label: g.label, byTier: groupByTier(filter(g.entries)) }));
    }
    return [{ label: list.title, byTier: groupByTier(filter(list.entries ?? [])) }];
  });
</script>

{#if !list}
  <NotFound />
{:else}
  <div class="controls">
    <div class="chipset" role="tablist" aria-label="Tier">
      <button class="fchip" class:on={activeTier === 'all'} onclick={() => (activeTier = 'all')}>any</button>
      {#each TIER_ORDER as t (t)}
        <button
          class="fchip"
          class:on={activeTier === t}
          onclick={() => (activeTier = t)}
          style:color={TIER_COLOR[t]}
        >{t === 'untagged' ? '-' : t}</button>
      {/each}
    </div>

    {#if list.groups}
      <div class="chipset" role="tablist" aria-label="Group">
        <button
          class="fchip"
          class:on={activeGroup === null || activeGroup === 'all'}
          onclick={() => (activeGroup = null)}
        >any</button>
        {#each list.groups as g (g.label)}
          <button
            class="fchip"
            class:on={activeGroup === g.label}
            onclick={() => (activeGroup = g.label)}
          >{g.label.toLowerCase()}</button>
        {/each}
      </div>
    {/if}

    {#if availableSlots.length > 0}
      <div class="chipset" role="tablist" aria-label="Slot">
        <button class="fchip" class:on={activeSlot === 'all'} onclick={() => (activeSlot = 'all')}>any</button>
        {#each availableSlots as s (s)}
          <button
            class="fchip"
            class:on={activeSlot === s}
            onclick={() => (activeSlot = s)}
          >{s.toLowerCase()}</button>
        {/each}
      </div>
    {/if}
  </div>

  {#each groups as group (group.label)}
    {#if list.groups}<h3 class="groupname">{group.label}</h3>{/if}

    {#each TIER_ORDER as tier (tier)}
      {#if (activeTier === 'all' || activeTier === tier) && group.byTier[tier].length > 0}
        <div class="tier-block">
          <div class="tier-head">
            <span class="tlabel" style:color={TIER_COLOR[tier]}>{tier === 'untagged' ? '-' : tier}</span>
            <span class="tcount">{group.byTier[tier].length}</span>
            <span class="tbar" style:background={TIER_COLOR[tier]}></span>
          </div>
          <div class="entries">
            {#each group.byTier[tier] as entry (entry.name)}
              <div class="entry">
                {#if entry.sprite}
                  <div class="spr"><img src={sprite(entry.sprite)} alt=""></div>
                {:else}
                  <div class="spr spr-empty">?</div>
                {/if}
                <div>
                  <div class="title">
                    {entry.name}
                    {#if entry.cost !== undefined}<span class="cost">({entry.cost})</span>{/if}
                    {#if entry.slot}<span class="slot">{entry.slot}</span>{/if}
                    {#if entry.wiki}<a class="wlink" href={entry.wiki} target="_blank" rel="noopener">wiki ↗</a>{/if}
                  </div>
                  <div class="rev">{entry.review}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  {/each}
{/if}

<style>
  .controls { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
  .chipset { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
  .fchip {
    font-size: 11px;
    padding: 4px 10px;
    border: 1px solid var(--line);
    background: var(--bg-panel);
    color: var(--text-soft);
    letter-spacing: 0.08em;
    transition: border-color var(--t-fast), color var(--t-fast), background var(--t-fast);
  }
  .fchip:hover { border-color: var(--line-on); color: var(--text); }
  .fchip.on { border-color: var(--rust); color: var(--rust-hot); background: var(--rust-bg); }

  h3.groupname {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text);
    margin: 24px 0 12px;
  }
  h3.groupname::before { content: '┃ '; color: var(--rust); }

  .tier-block { margin-bottom: 24px; }
  .tier-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding-bottom: 4px;
  }
  .tlabel {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.12em;
    min-width: 24px;
  }
  .tcount { font-size: 11px; color: var(--text-mute); }
  .tbar { flex: 1; height: 1px; opacity: 0.25; }

  .entries { display: grid; gap: 8px; }
  .entry {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 14px;
    align-items: flex-start;
    padding: 12px 14px;
    background: var(--bg-panel);
    border: 1px solid var(--line);
    transition: border-color var(--t-fast);
  }
  .entry:hover { border-color: var(--line-on); }
  .spr {
    width: 40px; height: 40px;
    background: var(--bg);
    border: 1px solid var(--line-mid);
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spr img { max-width: 100%; max-height: 100%; image-rendering: pixelated; }
  .spr-empty { color: var(--text-dim); font-size: 14px; }
  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 8px;
  }
  .cost { color: var(--rust); font-size: 12px; font-weight: 500; }
  .slot { color: var(--text-mute); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; }
  .wlink { color: var(--text-mute); font-size: 11px; margin-left: auto; }
  .wlink:hover { color: var(--rust); }
  .rev { font-size: 13px; color: var(--text-soft); line-height: 1.55; }
</style>
