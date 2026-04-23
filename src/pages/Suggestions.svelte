<script lang="ts">
  import { navigate } from '$lib/routing.ts';
  import { sprite } from '$lib/assets.ts';

  interface Pick {
    slug: 'mutations' | 'cybernetics';
    name: string;
    tagline: string;
    sprite: string;
  }

  const PICKS: Pick[] = [
    {
      slug: 'mutations',
      name: 'Mutations',
      tagline: 'Physical and Mental mutations graded S to D, with mutation-point cost and a short review.',
      sprite: 'Carapace_mutation.png',
    },
    {
      slug: 'cybernetics',
      name: 'Cybernetics',
      tagline: 'True Kin implants graded S to D, with slot, compute cost, and a short review.',
      sprite: 'Motorized_treads_identified.png',
    },
  ];

  function go(e: MouseEvent, slug: string): void {
    e.preventDefault();
    navigate(`/suggestions/${slug}`);
  }
</script>

<p class="intro">
  These are just my preferences that worked out nicely. There's no right way to play, take what
  works for you, ignore what doesn't, and find your path through this fascinating world.
</p>

<div class="list">
  {#each PICKS as p (p.slug)}
    <a class="row" href={`#/suggestions/${p.slug}`} onclick={(e) => go(e, p.slug)}>
      <div class="portrait"><img src={sprite(p.sprite)} alt=""></div>
      <div>
        <div class="n">{p.name}</div>
        <div class="t">{p.tagline}</div>
      </div>
      <span class="arr">→</span>
    </a>
  {/each}
</div>

<style>
  .intro { color: var(--text-soft); margin-bottom: 18px; font-style: italic; }

  .list { display: grid; gap: 8px; margin-bottom: 20px; }
  .row {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 14px;
    align-items: center;
    padding: 12px 14px;
    background: var(--bg-panel);
    border: 1px solid var(--line);
    transition: border-color var(--t-fast);
  }
  .row:hover { border-color: var(--line-on); }
  .portrait {
    width: 48px; height: 48px;
    background: var(--bg);
    border: 1px solid var(--line-mid);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .portrait img { max-width: 100%; max-height: 100%; image-rendering: pixelated; }
  .n { font-size: 15px; font-weight: 600; color: var(--text); }
  .t { font-size: 12.5px; color: var(--text-soft); margin-top: 2px; }
  .arr { color: var(--text-mute); font-size: 14px; transition: color var(--t-fast); }
  .row:hover .arr { color: var(--rust); }
</style>
