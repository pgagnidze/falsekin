<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    /** single character icon */
    icon?: string;
    children: Snippet;
  }
  let { icon = '!', children }: Props = $props();
</script>

<div class="callout">
  <div class="ic">{icon}</div>
  <div class="body">{@render children()}</div>
</div>

<style>
  .callout {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 12px;
    padding: 12px 16px;
    background: var(--rust-bg);
    border: 1px solid var(--rust);
    margin: 14px 0;
    font-size: 13px;
  }
  .ic {
    width: 20px; height: 20px;
    border: 1px solid var(--rust);
    display: flex; align-items: center; justify-content: center;
    color: var(--rust);
    font-weight: 700;
    font-size: 11px;
  }
  .body :global(p) { margin: 0; }
</style>
