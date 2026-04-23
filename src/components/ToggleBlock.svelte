<script lang="ts">
  import type { Snippet } from 'svelte';
  interface Props {
    summary: string;
    children: Snippet;
    open?: boolean;
  }
  let { summary, children, open = false }: Props = $props();
</script>

<details {open}>
  <summary>{summary}</summary>
  <div class="body">{@render children()}</div>
</details>

<style>
  details {
    background: var(--bg-panel);
    border: 1px solid var(--line);
    padding: 10px 14px;
    margin-bottom: 8px;
  }
  summary {
    cursor: pointer;
    font-size: 12.5px;
    list-style: none;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text);
  }
  summary::-webkit-details-marker { display: none; }
  summary::before {
    content: '[+]';
    color: var(--rust);
    font-weight: 700;
  }
  details[open] summary::before { content: '[-]'; }
  .body { padding-top: 10px; font-size: 13px; color: var(--text-soft); }
  .body :global(ul) { padding-left: 20px; margin-top: 6px; }
  .body :global(li) { margin-bottom: 3px; }
  .body :global(code) {
    display: block;
    font-size: 11px;
    background: var(--bg-void);
    padding: 10px 12px;
    margin-top: 10px;
    border-left: 2px solid var(--rust);
    word-break: break-all;
    color: var(--text-mute);
    line-height: 1.5;
  }
</style>
