<script lang="ts">
  import { BUILDS } from '$lib/builds.ts';
  import { navigate } from '$lib/routing.ts';
  import { sprite } from '$lib/assets.ts';

  const truekin = $derived(BUILDS.filter((b) => b.kin === 'true-kin'));
  const mutants = $derived(BUILDS.filter((b) => b.kin === 'mutant'));

  function go(e: MouseEvent, slug: string): void {
    e.preventDefault();
    navigate(`/builds/${slug}`);
  }
</script>

<p class="intro">Two beginner-friendly characters you can paste straight into your game via the Library. See the <a href="#/guides/introduction" class="link">Introduction</a> for how to load a build code.</p>

<h3 class="group">True Kin</h3>
<div class="list">
  {#each truekin as b (b.slug)}
    <a class="row" href={`#/builds/${b.slug}`} onclick={(e) => go(e, b.slug)}>
      <div class="portrait"><img src={sprite(b.sprite)} alt=""></div>
      <div>
        <div class="n">{b.name} <span class="caste">· {b.casteOrCalling}</span></div>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <div class="t">{@html b.tagline}</div>
      </div>
      <span class="arr">→</span>
    </a>
  {/each}
</div>

<h3 class="group">Mutated Human</h3>
<div class="list">
  {#each mutants as b (b.slug)}
    <a class="row" href={`#/builds/${b.slug}`} onclick={(e) => go(e, b.slug)}>
      <div class="portrait"><img src={sprite(b.sprite)} alt=""></div>
      <div>
        <div class="n">{b.name} <span class="caste">· {b.casteOrCalling}</span></div>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        <div class="t">{@html b.tagline}</div>
      </div>
      <span class="arr">→</span>
    </a>
  {/each}
</div>

<style>
  .intro { color: var(--text-soft); margin-bottom: 18px; }
  .link { color: var(--rust-hot); border-bottom: 1px dotted var(--rust-deep); }
  .link:hover { border-bottom-color: var(--rust-hot); }

  h3.group {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--line-on);
    margin: 20px 0 8px;
  }
  h3.group::before { content: '┃ '; color: var(--rust); }

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
  .caste { font-weight: 400; color: var(--text-soft); font-size: 13px; }
  .t { font-size: 12.5px; color: var(--text-soft); margin-top: 2px; }
  .arr { color: var(--text-mute); font-size: 14px; transition: color var(--t-fast); }
  .row:hover .arr { color: var(--rust); }
</style>
