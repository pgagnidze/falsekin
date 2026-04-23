<script lang="ts">
  interface Props {
    name: string;
    value: number;
  }
  let { name, value }: Props = $props();
</script>

<div class="attr">
  <span class="n">{name}</span>
  <span class="v">{value}</span>
</div>

<style>
  .attr {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 4px 0;
    font-size: 13px;
    border-bottom: 1px dashed var(--line);
  }
  .attr:last-child { border-bottom: 0; }
  .n {
    color: var(--text-soft);
    font-weight: 500;
    letter-spacing: 0.12em;
    font-size: 11px;
  }
  .v {
    font-family: var(--mono);
    color: var(--rust-hot);
    font-weight: 600;
    font-size: 16px;
    font-variant-numeric: tabular-nums;
  }
</style>
