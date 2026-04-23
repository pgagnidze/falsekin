import type { Build } from './types.ts';
import { sprite as spriteUrl } from './assets.ts';

/** Inline sprite chip used inside prose HTML strings. */
function chip(sprite: string, label: string): string {
  return `<span class="chip"><img src="${spriteUrl(sprite)}" alt="${label}">${label}</span>`;
}

export const BUILDS: Build[] = [
  {
    slug: 'gorg',
    name: 'Gorg',
    kin: 'true-kin',
    form: 'Humanoid',
    casteOrCalling: 'Priest of All Suns',
    sprite: 'priestOfAllSuns.png',
    tagline: `Priest of All Suns trader with a ${chip('Musket.png', 'musket')}, a cudgel, and enough Ego to talk trouble down. Kite, intimidate, heal, repeat.`,
    attributes: { str: 18, agi: 20, tou: 18, int: 19, wil: 16, ego: 19 },
    cybernetics: [{ slot: 'Face', name: 'Night Vision', sprite: 'Night_vision_identified.png' }],
    casteStats: [
      '+3 Ego, +2 to saves vs. bleeding',
      'Cudgel, Physic, Nostrums, Persuasion, Snake Oiler, Intimidate',
      'Wilderness Lore: Jungles',
    ],
    buildCode:
      'H4sIAAAAAAAAE81V247TMBB936+wIh7Tqi0IKqQ+lHIR7IK6m6ogoX1wkiGxcO3IHoPCqv/OON1NcwGiRdpVKyVNz5kZn5wZ1zdnjAUZ38EPMFZoFbxkwWw8Gc8m8/FsFoSejp2QaYOfEj85UDudOgmW0K/0k7Gb6l4Tm7IAn/Hl6mK8yrnhCYJ55cvZ8aVL/fUOlEYK+1glhGxpLexiWY5WESUUIdseFl4cVYVs5SQ6AwsFDg2XIVu7WIrkHMqN/g5qoZyUlcBKS8qRk4o7bYQ8wfsKe001euLqJajkXbivujEO2LlQTb7n3y21r7734X/aF7n4JN1r6Ro07zba11wbARaZ/saWUrLIKfsILi4RjYgdgj05I7vSBr1ca6HQrp1Jcm4hba3orUYDKsOc8Odhk1hmQgosCZ+38I12Wa7A2l7Ge4UgpchAJf4tXrTIz0LKQv8EQ8yzFvMm0x6roX1DPC+iAhQSP3o6b+FXsONCCZURN2kwMb3ksiCwFf9Ac7IqYzAKUCSnNyg9bYOTIr1to2kDsSAhQVJ//Ec/fJojRHHHtbyoTyLLcSsqw8NOoHZVN6cdfMuN4BUTvOU0PQ12Xz9fP0JDnUW9E7+g5k+vr3+RONheRac61fYaGmgB2AdpC6fVTu0GG62og9Gfch6qI7nWFiLkBmmzX+iE+3k8va78Q+bwcddJ82t90EXB73HU0f36bP8b9yCFQ78JAAA=',
    strategyVideo: 'gorg-strategy.webm',
    difficulty: 'beginner',
    descriptionHtml: `<p>This build excels in trade and treating diseases/infections while having enough combat capability to handle early-game threats.</p>`,
    strategyHtml: `
      <p>Get a ${chip('Musket.png', 'musket')} and ${chip('Lead_slug.png', 'lead slugs')} early. Your Snake Oiler skill and high Ego make this affordable. Engage enemies at range with your ${chip('Musket.png', 'musket')}. When they get too close:</p>
      <ul>
        <li>Use <span class="ent-gold">Menacing Stare</span> / Intimidate to make them back off</li>
        <li>Enable sprint to create distance</li>
        <li>Retreat and heal up</li>
        <li>Wait for skill cooldowns</li>
        <li>Re-engage from range</li>
      </ul>
    `,
    progressionHtml: `
      <p>Start with a ${chip('Medassist_module_identified.png', 'Medassist Module')} to auto-apply tonics. Next, grab an ${chip('Equipment_rack_identified.png', 'Equipment Rack')} for slots. Follow with ${chip('Translucent_skin_identified.png', 'Translucent')} or ${chip('Transparent_skin_identified.png', 'Transparent Skin')} for ${chip('32px-Dv_symbol.png', 'DV')}, then ranged implants like ${chip('Rapid_release_finger_flexors_identified.png', 'Rapid Release Finger Flexors')} and ${chip('Stabilizer_arm_locks_identified.png', 'Stabilizer Arm Locks')}.</p>
      <p>See my <a href="#/suggestions/cybernetics">Cybernetics picks</a> for detailed implant suggestions.</p>
    `,
    gearHtml: `
      <ul>
        <li>Use cudgel weapons; you start with the skill ${chip('Twohanded_steel_war_hammer.png', 'two-handed war hammer')}</li>
        <li>Focus on ${chip('32px-Av_symbol.png', 'AV')} equipment early game</li>
        <li>Switch to ${chip('32px-Dv_symbol.png', 'DV')} later, since True Kin can stack AV via tactics</li>
        <li>Stock up on ${chip('Salve_injector_milky.png', 'salve injectors')} and ${chip('Witchwood_bark.png', 'witchwood barks')}</li>
      </ul>
    `,
    closingCalloutHtml: `Early-game survival depends on keeping your distance and using ranged attacks. Don't be afraid to run away; most enemies can't catch you while sprinting.`,
    updated: '2026-04-22',
  },
  {
    slug: 'affine',
    name: 'Affine',
    kin: 'mutant',
    form: 'Humanoid',
    casteOrCalling: 'Nomad',
    sprite: 'nomad.png',
    tagline: `Nomad who tightens ${chip('Carapace_mutation.png', 'Carapace')} for walls of ${chip('32px-Av_symbol.png', 'AV')}, leaks ${chip('Corrosive_gas_generation_mutation.png', 'Corrosive Gas')} on retreat, and lets the cloud finish the fight. The most forgiving ramp into Qud.`,
    attributes: { str: 18, agi: 20, tou: 18, int: 18, wil: 16, ego: 14 },
    mutations: [
      { name: 'Carapace', sprite: 'Carapace_mutation.png' },
      { name: 'Corrosive Gas Generation', sprite: 'Corrosive_gas_generation_mutation.png' },
      { name: 'Double-muscled', sprite: 'Doublemuscled_mutation.png' },
      { name: 'Night Vision', sprite: 'Night_vision_mutation.png' },
      { name: 'Mental Mirror', sprite: 'Mental_mirror_mutation.png' },
    ],
    casteStats: [
      '+2 Toughness',
      'Wayfaring',
      'Wilderness Lore: Salt Dunes',
      'Harvestry',
      'Weathered',
      '+200 reputation with the Issachari tribe',
      `Starts with a ${chip('Recycling_suit_identified.png', 'recycling suit')}`,
    ],
    buildCode:
      'H4sIAAAAAAAAE81WW2/aMBR+76+woj0GRBGaqko8sPSybgWxBrFJUx+c5Cix5tiRL50Y4r/32NAsgW2sm0AgEcL5jr/z+VwsL88ICXJawhMozaQILknQ7/a6/d5Ft98PQgcnlvGsgZ8j3ltDpcwsB43Wr/iXkKV/1sBsUYFb8eXhvhsVVNHUgHrn6HT3k83c9xaENOg29gtCMtIayoQvOlGMC6qQzNeBhz9VhSSy3FgFQwHWKMpDMrUJZ+lHWMzkNxBDYTn3Ar2WjBqKKl60oeWNea2wK+TYEVeHQMoXd8c6toYayMh7W1LRdNpJ4gZa+d9V+I85jG1ykils6dqbwY2345zIkmZHSJwvFPLqk0vdlrK9ySsrJOw1DBo4pJ6hHs71Z9l4J5te3aQ2QikVTaFB7H3mVDEqDLq4rW2BkbQeOm+YV+FfBpRKSc2egNxSTXCEQK2xYwm4klg66JRWpxyyo4WdsLwwZM70Mfc6BmEoJ2OGOVf/H7V+fzz8nI6MUSyxBk5vULel7Z3UqWTC6KlVaUE19txlq2ZBbBSI3BRov2iWIRjljDOzcGXotYCZtHkhQLtBf9tC7oQBzlkOIoUdvs+M80p+B7Wz7DqXaBvUpkaDBbSKK/DN0BkMWvYHKCkTTORbB1GCuxy506nlf6BGiaw2smQ/oMZPrmF+J3Fv4wi8pTnu0c3N3eS6iVSwO7gBVj3zxd2yV0oKnOf4V2sOVZVCSg2xocpgf9zL1J9Jp1eZP8jcf3vZWuZifZBVRV9xjcHn49nqGXKs4wmTCwAA',
    strategyVideo: 'affine-strategy.webm',
    difficulty: 'beginner',
    descriptionHtml: `<p>This build is ideal for beginners due to its forgiving defensive strategy. It excels in early-game survival through a powerful combination of defense and passive damage.</p>`,
    strategyHtml: `
      <p>Approach enemies, release ${chip('Corrosive_gas_generation_mutation.png', 'Corrosive Gas')}, and tighten the ${chip('Carapace_mutation.png', 'Carapace')} immediately after. Let enemies come closer while protected by high ${chip('32px-Av_symbol.png', 'AV')} from the tightened ${chip('Carapace_mutation.png', 'Carapace')}. If things get dangerous:</p>
      <ul>
        <li>Sprint away</li>
        <li>Enemies pursuing you will continue taking gas damage</li>
        <li>Create distance and wait for gas cooldown</li>
        <li>Start again</li>
      </ul>
    `,
    progressionHtml: `
      <p>Get one extra mutation early. Mutation points come easily at low levels. Upgrade priority:</p>
      <ul>
        <li>${chip('Carapace_mutation.png', 'Carapace')} first: your defensive core</li>
        <li>${chip('Doublemuscled_mutation.png', 'Double-muscled')} second: strength boost</li>
        <li>${chip('Corrosive_gas_generation_mutation.png', 'Corrosive Gas')} last: damage scaling</li>
      </ul>
      <p>See my <a href="#/suggestions/mutations">Mutations picks</a> for detailed suggestions.</p>
    `,
    gearHtml: `
      <ul>
        <li>Build around ${chip('32px-Dv_symbol.png', 'DV')} equipment since ${chip('Carapace_mutation.png', 'Carapace')} already handles your ${chip('32px-Av_symbol.png', 'AV')} needs</li>
        <li>Natural defensive balance: avoid hits when possible, absorb those that land</li>
        <li>You can sell your ${chip('Recycling_suit_identified.png', 'recycling suit')} since ${chip('Carapace_mutation.png', 'Carapace')} replaces it; use the money for gear if needed</li>
      </ul>
    `,
    attributionHtml: `AFFINE initially created this build (<a href="https://www.qudzoo.com/builds/64849c9296a61b5fd8b0bf8b" target="_blank" rel="noopener">qudzoo.com</a>). Attributes tweaked here to account for the early pistol skill tree, which improves the economy.`,
    updated: '2026-04-22',
  },
];

export function findBuild(slug: string): Build | undefined {
  return BUILDS.find((b) => b.slug === slug);
}
