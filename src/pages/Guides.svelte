<script lang="ts">
  import SectionCard from '$components/SectionCard.svelte';
</script>

<div class="grid">
  <SectionCard
    route="/guides/introduction"
    label="▲ intro"
    name="Introduction"
    descHtml={`Joppa survival walkthrough, early quests, combat priorities, common pitfalls. <span class="ent-location">Live and drink, traveler.</span>`}
  />
  <SectionCard
    route="/guides/mods"
    label="⚙ mods"
    name="Mods"
    descHtml="Three low-friction Steam workshop mods that improve quality of life."
  />
  <SectionCard
    route="/guides/tweaks"
    label="⚙ tweaks"
    name="Tweaks"
    descHtml="In-game options for pixel-perfect display plus keybinds for movement, combat, inventory, and trade."
  />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 12px;
  }
</style>
