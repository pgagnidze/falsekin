export type Kin = 'true-kin' | 'mutant';
export type Tier = 'S' | 'A' | 'B' | 'C' | 'D' | 'untagged';

export const KIN_META: Record<Kin, { color: string; label: string; routeSegment: string }> = {
  'true-kin': { color: 'var(--gold)', label: 'True Kin', routeSegment: 'truekin' },
  mutant: { color: 'var(--pink)', label: 'Mutant', routeSegment: 'mutant' },
};

export interface Attributes {
  str: number;
  agi: number;
  tou: number;
  int: number;
  wil: number;
  ego: number;
}

export interface SpriteRef {
  /** filename under /public/assets, e.g. 'Musket.png' */
  src: string;
  alt: string;
  /** short name shown inline if used as a chip */
  label?: string;
}

export interface BuildCybernetic {
  slot: string;
  name: string;
  sprite?: string;
}

export interface BuildMutation {
  name: string;
  sprite?: string;
}

export interface BuildStrategyStep {
  text: string;
}

export interface Build {
  slug: string;
  name: string;
  kin: Kin;
  form: string;
  casteOrCalling: string;
  /** sprite filename in /assets/*.png */
  sprite: string;
  tagline: string;

  attributes: Attributes;

  /** only for True Kin */
  cybernetics?: BuildCybernetic[];
  /** only for Mutants */
  mutations?: BuildMutation[];

  /** Caste/calling bonus list */
  casteStats: string[];

  /** base64 or text Build Code (from Qud export) */
  buildCode: string;

  /** long-form content (may contain inline HTML for sprite chips & entity highlights) */
  descriptionHtml: string;
  strategyHtml: string;
  progressionHtml: string;
  gearHtml: string;

  /** tip bubble at bottom of the page */
  closingCalloutHtml?: string;

  /** attribution callout (e.g. "AFFINE initially created this build") */
  attributionHtml?: string;

  /** clip embedded under Strategy (filename in /public/videos/) */
  strategyVideo?: string;

  /** difficulty hint for metadata */
  difficulty?: 'beginner' | 'intermediate' | 'advanced';

  /** ISO date */
  updated?: string;
}

export interface TierEntry {
  name: string;
  tier: Tier;
  /** cost in points (mutations) or compute (cybernetics) */
  cost?: number;
  /** slot for cybernetics (Hands, Face, Back, Skull, etc) */
  slot?: string;
  review: string;
  /** sprite filename */
  sprite?: string;
  /** link to wiki */
  wiki?: string;
}

export interface TierList {
  slug: 'mutations' | 'cybernetics';
  title: string;
  /** top-level grouping before tier, for mutations: Physical | Mental */
  groups?: { label: string; entries: TierEntry[] }[];
  /** for cybernetics the whole list is one group */
  entries?: TierEntry[];
}

export interface Mod {
  title: string;
  workshopId: string;
  description: string;
}

export interface Snippet {
  sprite: string;
  quote: string;
  alt?: string;
}

export interface NavItem {
  route: string;
  label: string;
  /** 16x16 pixel sprite, '#' = pixel on, '.' = transparent */
  icon: string;
  /** optional inline color style e.g. Kin-color for builds */
  color?: 'gold' | 'pink' | 'green' | 'cyan';
  /** small label on the right (e.g. true kin, mutant) */
  aux?: string;
}
