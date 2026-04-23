import type { Mod } from './types.ts';

export const MODS: Mod[] = [
  {
    title: "You see a cave spider and that's okay",
    workshopId: '2228844006',
    description:
      'You do not stop exploring the caves when encountering cute cave spiders.',
  },
  {
    title: 'Show Parasang',
    workshopId: '3295825499',
    description:
      'This little UX mod indicates which zone of a parasang you are in.',
  },
  {
    title: 'Ping',
    workshopId: '3360010074',
    description:
      'Cute little traveling companion to carry your items and be with you to cheer you up.',
  },
];

export const MODS_INTRO =
  'You can install mods by subscribing to the Steam workshop items and enabling them from the game.';

export const MODS_CALLOUT = 'Keep mods minimal to avoid update conflicts.';

export function workshopUrl(id: string): string {
  return `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
}
