<script lang="ts">
  import Hero from '$components/Hero.svelte';
  import Panel from '$components/Panel.svelte';
  import SectionHeading from '$components/SectionHeading.svelte';
  import SnippetRow from '$components/SnippetRow.svelte';
  import SectionCard from '$components/SectionCard.svelte';
  import { SNIPPETS, SNIPPETS_OUTRO, CLOSING_REMARK } from '$lib/snippets.ts';
  import { INTRO_HTML } from '../content/home/intro.ts';

  // prettier-ignore
  const ASCII_LOGO = `  ░█▀▀░█▀█░█░░░█▀▀░█▀▀░█░█░▀█▀░█▀█
  ░█▀▀░█▀█░█░░░▀▀█░█▀▀░█▀▄░░█░░█░█
  ░<span class="r">▀</span>░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀░▀`;
</script>

<Hero asciiLogo={ASCII_LOGO} />

<Panel title="What is Caves of Qud?">
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html INTRO_HTML}
</Panel>

<SectionHeading label="snippets from qud" />
<div class="snippets">
  {#each SNIPPETS as snip, i (i)}
    <SnippetRow sprite={snip.sprite} alt={snip.alt} quoteHtml={snip.quote} />
  {/each}
</div>

<p class="snippets-outro">{SNIPPETS_OUTRO}</p>

<SectionHeading label="getting started" />
<p class="closing">{CLOSING_REMARK}</p>
<div class="section-grid">
  <SectionCard
    route="/guides/introduction"
    label="01 · guides"
    name="Read the intro"
    descHtml="Joppa survival, early quests, combat priorities."
  />
  <SectionCard
    route="/guides/tweaks"
    label="02 · setup"
    name="Tweak the game"
    descHtml="In-game options and keybinds. Mods are one click away if you want them."
  />
  <SectionCard
    route="/suggestions"
    label="03 · suggestions"
    name="Browse my picks"
    descHtml={`Mutations & cybernetics, graded <span style="color:var(--gold)">S</span> → <span style="color:var(--text-mute)">D</span>.`}
  />
</div>

<style>
  .snippets {
    display: grid;
    gap: 10px;
    margin-bottom: 14px;
  }
  .snippets-outro {
    color: var(--text-soft);
    font-style: italic;
    margin: 10px 0 18px;
  }
  .closing {
    color: var(--text-soft);
    margin: 0 0 14px;
  }
  .section-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
</style>
