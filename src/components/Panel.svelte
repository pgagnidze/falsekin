<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    children: Snippet;
  }
  let { title, children }: Props = $props();
</script>

<div class="panel">
  <div class="panel-title">[ {title} ]</div>
  <div class="panel-body">{@render children()}</div>
</div>

<style>
  .panel {
    position: relative;
    border: 1px solid var(--line-on);
    background: var(--bg-panel);
    padding: 18px 22px 22px;
    margin-bottom: 20px;
  }
  .panel::before,
  .panel::after {
    content: '';
    position: absolute;
    top: 6px;
    width: 12px;
    height: 12px;
    border-top: 2px solid var(--rust);
    pointer-events: none;
  }
  .panel::before {
    left: 6px;
    border-left: 2px solid var(--rust);
  }
  .panel::after {
    right: 6px;
    border-right: 2px solid var(--rust);
  }
  .panel-title {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rust-hot);
    padding-bottom: 12px;
    margin-bottom: 14px;
    border-bottom: 1px dashed var(--line);
  }
  .panel-body :global(p) { margin-bottom: 12px; }
  .panel-body :global(p:last-child) { margin-bottom: 0; }
</style>
