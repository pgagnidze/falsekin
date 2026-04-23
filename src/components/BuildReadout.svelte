<script lang="ts">
  import { KIN_META, type Build } from '$lib/types.ts';
  import { sprite } from '$lib/assets.ts';

  interface Props {
    build: Build;
    onCopyCode?: () => void;
    copied?: boolean;
  }
  let { build, onCopyCode, copied = false }: Props = $props();

  const kin = $derived(KIN_META[build.kin]);
</script>

<div class="readout">
  <div class="portrait"><img src={sprite(build.sprite)} alt={build.name}></div>
  <div>
    <h1>{build.name} <span class="hy">·</span> <span class="caste">{build.casteOrCalling}</span></h1>
    <div class="tags">
      <span class="tag" style:color={kin.color} style:border-color={kin.color}>{kin.label}</span>
      <span class="tag">{build.form}</span>
    </div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <p class="mute">{@html build.tagline}</p>
  </div>
  <button class="copy-btn" class:copied onclick={onCopyCode} title="Copy build code">
    {copied ? 'copied!' : 'copy code'}
  </button>
</div>

<style>
  .readout {
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 22px;
    padding: 22px 22px 22px 26px;
    background: var(--bg-panel);
    border: 1px solid var(--line-on);
    position: relative;
    margin-bottom: 20px;
    align-items: center;
  }
  .readout::before,
  .readout::after {
    content: '';
    position: absolute;
    top: 6px;
    width: 12px;
    height: 12px;
    border-top: 2px solid var(--rust);
    pointer-events: none;
  }
  .readout::before {
    left: 6px;
    border-left: 2px solid var(--rust);
  }
  .readout::after {
    right: 6px;
    border-right: 2px solid var(--rust);
  }
  .portrait {
    width: 104px; height: 104px;
    border: 1px solid var(--line-on);
    padding: 10px;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 0 24px rgba(0,0,0,0.55);
  }
  .portrait img { max-width: 100%; max-height: 100%; image-rendering: pixelated; }
  h1 {
    font-family: var(--mono);
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.005em;
    color: var(--text);
    margin-bottom: 6px;
  }
  .hy { color: var(--rust); font-weight: 500; }
  .caste {
    color: var(--text-soft);
    font-weight: 500;
    font-size: 16px;
  }
  .tags { margin-bottom: 6px; }
  .tag {
    display: inline-block;
    font-size: 10.5px;
    color: var(--text);
    border: 1px solid var(--line-on);
    padding: 2px 8px;
    margin-right: 4px;
    background: var(--bg);
    letter-spacing: 0.1em;
  }
  .mute { font-size: 12.5px; color: var(--text-soft); margin: 4px 0 0; }

  .copy-btn {
    font-family: var(--mono);
    font-size: 11.5px;
    padding: 8px 12px;
    border: 1px solid var(--rust);
    background: transparent;
    color: var(--rust-hot);
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: all var(--t-fast);
  }
  .copy-btn::before { content: '[ '; }
  .copy-btn::after  { content: ' ]'; }
  .copy-btn:hover { background: var(--rust); color: var(--bg); }
  .copy-btn.copied {
    background: var(--rust);
    color: var(--bg);
    border-color: var(--rust);
  }

  @media (max-width: 640px) {
    .readout {
      grid-template-columns: 72px minmax(0, 1fr);
      gap: 14px;
      padding: 18px 16px;
    }
    .portrait { width: 72px; height: 72px; padding: 6px; }
    .copy-btn { grid-column: 1 / -1; justify-self: start; }
    h1 { font-size: 20px; }
    .caste { font-size: 14px; display: block; margin-top: 2px; }
  }
</style>
