<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    title: string;
    children: Snippet;
  }
  let { title, children }: Props = $props();
</script>

<div class="stat-box">
  <div class="stat-box-title">{title}</div>
  {@render children()}
</div>

<style>
  .stat-box {
    background: var(--bg-panel);
    border: 1px solid var(--line);
    padding: 14px 16px;
  }
  .stat-box-title {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--line-on);
    padding-bottom: 8px;
    border-bottom: 1px dashed var(--line-mid);
    margin-bottom: 10px;
  }
  .stat-box-title::before { content: '┃ '; color: var(--rust); margin-right: 2px; }
</style>
