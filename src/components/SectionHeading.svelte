<script lang="ts">
  interface Props {
    label: string;
    count?: string;
    id?: string;
  }
  let { label, count, id }: Props = $props();
</script>

<h2 {id}>
  {label}
  <span class="ornament"></span>
  {#if count}<span class="count">{count}</span>{/if}
</h2>

<style>
  h2 {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--rust-hot);
    margin: 32px 0 10px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ornament {
    flex: 1;
    border-top: 1px solid var(--line);
  }
  .count {
    font-size: 10px;
    color: var(--text-mute);
    font-weight: 400;
    letter-spacing: 0.1em;
  }
</style>
