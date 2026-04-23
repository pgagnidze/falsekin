<script lang="ts">
  import { navigate } from '$lib/routing.ts';
  interface Props {
    route: string;
    label: string;
    name: string;
    /** HTML allowed for inline entity spans */
    descHtml: string;
  }
  let { route, label, name, descHtml }: Props = $props();
  function handleClick(e: MouseEvent): void {
    e.preventDefault();
    navigate(route);
  }
</script>

<a class="sec-card" href={'#' + route} onclick={handleClick}>
  <div class="label">{label}</div>
  <div class="name">{name}</div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="desc">{@html descHtml}</div>
</a>

<style>
  .sec-card {
    display: block;
    padding: 18px 18px 14px;
    background: var(--bg-panel);
    border: 1px solid var(--line);
    position: relative;
    transition: border-color var(--t-fast), transform var(--t-fast);
  }
  .sec-card::before,
  .sec-card::after {
    content: '';
    position: absolute;
    top: 6px;
    width: 10px;
    height: 10px;
    border-top: 2px solid var(--line-on);
    pointer-events: none;
    transition: border-color var(--t-fast);
  }
  .sec-card::before {
    left: 6px;
    border-left: 2px solid var(--line-on);
  }
  .sec-card::after {
    right: 6px;
    border-right: 2px solid var(--line-on);
  }
  .sec-card:hover { border-color: var(--line-on); transform: translateY(-1px); }
  .sec-card:hover::before,
  .sec-card:hover::after { border-color: var(--rust); }
  .label {
    font-size: 10px;
    color: var(--rust);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .name { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
  .desc { font-size: 12px; color: var(--text-soft); }
</style>
