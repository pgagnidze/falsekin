<script lang="ts">
  import { sprite } from '$lib/assets.ts';

  interface Props {
    asciiLogo?: string;
    tagline?: string;
    /** background image filename in /assets; defaults to cavebg.jpg */
    bg?: string;
  }

  let {
    asciiLogo,
    tagline = 'simple qud survival guide',
    bg = 'cavebg.jpg',
  }: Props = $props();

  const bgUrl = $derived(`url(${sprite(bg)})`);
</script>

<section class="hero">
  <div class="bg" style:background-image={bgUrl}></div>
  <div class="tint"></div>

  <div class="content">
    {#if asciiLogo}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      <pre class="ascii-logo">{@html asciiLogo}</pre>
    {/if}
    <div class="tagline">{tagline}</div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    margin-bottom: 24px;
    padding: 32px 24px;
    border: 1px solid var(--line-on);
    background: var(--bg);
    overflow: hidden;
  }
  .bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.32;
    filter: hue-rotate(-12deg) saturate(0.6);
    -webkit-mask-image: linear-gradient(180deg, black 30%, rgba(0, 0, 0, 0.3) 100%);
    mask-image: linear-gradient(180deg, black 30%, rgba(0, 0, 0, 0.3) 100%);
  }
  .tint {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10, 37, 36, 0.65) 0%, rgba(10, 37, 36, 0.92) 100%),
      radial-gradient(ellipse at top, rgba(239, 154, 65, 0.14) 0%, transparent 55%);
  }
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .ascii-logo {
    font-family: var(--mono);
    font-size: clamp(8px, 1vw, 12px);
    line-height: 1.1;
    color: var(--text);
    text-shadow: 0 0 14px rgba(210, 100, 58, 0.3);
    white-space: pre;
    letter-spacing: 0;
    margin: 0 0 14px;
  }
  .ascii-logo :global(.r) {
    color: var(--rust-hot);
  }
  .tagline {
    color: var(--text-mute);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
</style>
