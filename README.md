# falsekin

A simple Caves of Qud survival guide. Curated, opinionated, spoiler-light. Two beginner builds (Gorg, Affine), an introduction guide, tweaks + mods references, and picks (tier lists) for mutations and cybernetics.

Originally a [Notion site](https://falsekin.notion.site/qud-survival-guide); ported to a standalone Svelte SPA with a Qud-native visual identity (petroleum-teal palette, IBM Plex Mono, ASCII-framed panels, ANSI-coloured entity highlights).

Unofficial fan project. Not affiliated with Freehold Games.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173/
npm run check    # svelte-check
npm run build    # static bundle into dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` triggers a Cloudflare Pages build and deploys to [falsekin.pages.dev](https://falsekin.pages.dev). No workflow file needed - Cloudflare Pages is connected directly to the repo.

## Content sources

- Game sprites and lore: <https://wiki.cavesofqud.com> (CC-BY-SA)
- Build recipes and tier reviews: written by the guide author
- Some build guidance derived from [qudzoo.com](https://qudzoo.com) by AFFINE

## License

Code: MIT. Game-related sprites and lore belong to Freehold Games and the Caves of Qud wiki community under their respective licenses.
