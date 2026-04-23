<script lang="ts">
  import { renderMarkdown } from '$lib/markdown.ts';
  interface Props {
    markdown?: string;
    html?: string;
  }
  let { markdown, html }: Props = $props();
  const content = $derived(markdown !== undefined ? renderMarkdown(markdown) : (html ?? ''));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
<div class="prose">{@html content}</div>

<style>
  /* styles live in global.css under .prose */
</style>
