<script lang="ts">
  import { sprite as spriteUrl } from '$lib/assets.ts';

  interface Props {
    sprite: string;
    alt?: string;
    /** HTML (may contain spans) */
    quoteHtml: string;
  }
  let { sprite, alt = '', quoteHtml }: Props = $props();
</script>

<div class="snippet">
  <div class="sprite-tile"><img src={spriteUrl(sprite)} {alt}></div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <p>{@html quoteHtml}</p>
</div>

<style>
  .snippet {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 16px;
    align-items: flex-start;
    padding: 12px 14px;
    background: var(--bg-elev);
    border: 1px solid var(--line);
  }
  .sprite-tile {
    width: 48px; height: 48px;
    background: var(--bg);
    border: 1px solid var(--line-mid);
    display: flex; align-items: center; justify-content: center;
    padding: 3px;
  }
  .sprite-tile img { max-width: 100%; max-height: 100%; image-rendering: pixelated; }
  p { font-size: 13.5px; margin: 0; }
</style>
