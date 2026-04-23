<script lang="ts">
  import { findBuild } from '$lib/builds.ts';
  import { video, sprite } from '$lib/assets.ts';
  import { KIN_META } from '$lib/types.ts';
  import BuildReadout from '$components/BuildReadout.svelte';
  import StatBox from '$components/StatBox.svelte';
  import AttrBar from '$components/AttrBar.svelte';
  import ToggleBlock from '$components/ToggleBlock.svelte';
  import Callout from '$components/Callout.svelte';
  import NotFound from './NotFound.svelte';

  interface Props {
    slug: string;
  }
  let { slug }: Props = $props();

  const build = $derived(findBuild(slug));
  const kin = $derived(build ? KIN_META[build.kin] : null);
  const isTrueKin = $derived(build?.kin === 'true-kin');
  let copied = $state(false);
  let copiedTimer: ReturnType<typeof setTimeout> | null = null;

  async function copyBuildCode(): Promise<void> {
    if (!build) return;
    try {
      await navigator.clipboard.writeText(build.buildCode);
      copied = true;
      if (copiedTimer) clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => (copied = false), 1500);
    } catch {
      /* noop */
    }
  }
</script>

{#if !build}
  <NotFound />
{:else}
  <BuildReadout {build} onCopyCode={copyBuildCode} {copied} />

  <div class="three-col">
    <StatBox title="attributes">
      <AttrBar name="STR" value={build.attributes.str} />
      <AttrBar name="AGI" value={build.attributes.agi} />
      <AttrBar name="TOU" value={build.attributes.tou} />
      <AttrBar name="INT" value={build.attributes.int} />
      <AttrBar name="WIL" value={build.attributes.wil} />
      <AttrBar name="EGO" value={build.attributes.ego} />
    </StatBox>

    <StatBox title="build summary">
      <div class="kv"><span>caste</span><span class="val">{build.casteOrCalling}</span></div>
      <div class="kv"><span>kin</span><span class="val" style:color={kin?.color}>{kin?.label}</span></div>
      <div class="kv"><span>form</span><span class="val">{build.form}</span></div>
      {#if build.difficulty}
        <div class="kv"><span>difficulty</span><span class="val" style:color="var(--green)">{build.difficulty}</span></div>
      {/if}
    </StatBox>

    {#if build.cybernetics}
      <StatBox title="cybernetics">
        {#each build.cybernetics as c (c.slot + c.name)}
          <div class="kv">
            <span>{c.slot.toLowerCase()}</span>
            <span class="val">
              {#if c.sprite}<img class="mini" src={sprite(c.sprite)} alt="">{/if}{c.name}
            </span>
          </div>
        {/each}
      </StatBox>
    {/if}
    {#if build.mutations}
      <StatBox title="mutations">
        {#each build.mutations as m (m.name)}
          <div class="kv">
            <span class="ent-mutant">·</span>
            <span class="val">
              {#if m.sprite}<img class="mini" src={sprite(m.sprite)} alt="">{/if}{m.name}
            </span>
          </div>
        {/each}
      </StatBox>
    {/if}
  </div>

  <ToggleBlock summary={`Stats from ${build.casteOrCalling} ${isTrueKin ? 'caste' : 'calling'}`}>
    <ul>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {#each build.casteStats as s}<li>{@html s}</li>{/each}
    </ul>
  </ToggleBlock>

  <ToggleBlock summary="Build code, paste into Library">
    <code>{build.buildCode}</code>
  </ToggleBlock>

  <h3 class="sub">Description</h3>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="section">{@html build.descriptionHtml}</div>

  <h3 class="sub">Strategy</h3>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="section">{@html build.strategyHtml}</div>

  {#if build.strategyVideo}
    <video class="strategy-video" controls muted loop playsinline preload="metadata">
      <source src={video(build.strategyVideo)} type="video/webm" />
      <track kind="captions" />
    </video>
  {/if}

  <h3 class="sub">{isTrueKin ? 'Cybernetics Path' : 'Mutation Progression'}</h3>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="section">{@html build.progressionHtml}</div>

  <h3 class="sub">Gear Strategy</h3>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="section">{@html build.gearHtml}</div>

  {#if build.closingCalloutHtml}
    <Callout>
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html build.closingCalloutHtml}
    </Callout>
  {/if}

  {#if build.attributionHtml}
    <Callout icon="i">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html build.attributionHtml}
    </Callout>
  {/if}
{/if}

<style>
  .three-col {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 10px;
    margin-bottom: 18px;
  }
  .kv {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 12.5px;
  }
  .kv span:first-child { color: var(--text-soft); }
  .kv .val { color: var(--text); text-align: right; }
  .kv .val img.mini {
    display: inline-block;
    height: 14px;
    width: auto;
    image-rendering: pixelated;
    vertical-align: middle;
    margin-right: 5px;
  }

  h3.sub {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    margin: 22px 0 8px;
  }
  h3.sub::before { content: '▸ '; color: var(--rust); }

  .section :global(p) { margin-bottom: 10px; color: var(--text); }
  .section :global(ul) { padding-left: 22px; margin: 8px 0 14px; }
  .section :global(li) { margin-bottom: 4px; font-size: 13.5px; }
  .section :global(li::marker) { content: '▸ '; color: var(--rust); }
  .strategy-video {
    width: 100%;
    max-width: 720px;
    margin: 12px 0 20px;
    border: 1px solid var(--line-on);
    background: var(--bg-void);
  }

  code {
    display: block;
    font-family: var(--mono);
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
