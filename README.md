Just a mod for Never ending legacy.

**Latest version: `coloniesV3.3.0.js`**

## What it adds

Neighbouring peoples you can meet, trade with, ally with or fight; a realm map with towns, cities and
expedition sites you found yourself; libraries, archives and scribes; a market with drifting prices,
taxes and upkeep; forms of government and laws; education, science and health.

Everything is drawn by the mod at load time, so nothing extra is fetched from another site.

## To run

Click the version you want, then in the top right hit **Raw**. Copy the link and paste it into the
mods tab.

## Offline

Download the version you want, then copy `coloniesV#.#.#.js` into the zip's Game folder (next to
`data.js` and `index.html`).
In that folder, run `python -m http.server 8000`, then open http://localhost:8000/index.html.
In **Use mods**, enter:

```
data.js
coloniesV#.#.#.js
```

For example `coloniesV3.3.0.js`.

## Version history

| Version | Notes |
| --- | --- |
| v0.1 (`colonies.js`) | First release. Colonies you can meet, barter with, demand tribute from, pact with or fight. Ports a handful of Homosapient Legacy things: origins, eggs, spice, medical herbs, torches, boiling. |
| v0.3 (`coloniesV2.js`) | Colonies grow stronger as you advance. Trade pacts and embassies, builders, and buildings from early to late game. |
| v0.4.1 (`coloniesV2.0.1.js`) | Generals; defenses from palisades to bunkers; weapons from muskets to bombers. The sprite sheet is inlined, so the mod needs no external image. |
| v3.0.0 | Rewritten. A real realm map of your territory, towns and cities founded on tiles, expedition sites, libraries, archives and scribes; colony cards with marriage, alliances, annexation, spies, sabotage and incited feuds. |
| v3.1.0 | Economy: silver, drifting market prices with shortages and gluts, buying and selling, influence for sale, town upkeep and yearly realm income. |
| v3.2.0 | Government (forms of rule and laws) and Science (education, research and health) views. |
| v3.3.0 | Interface pass, no rule changes. The view switcher stays pinned while you scroll and each view keeps its own scroll position. Colony and town cards flow in a responsive grid instead of one long stack. The realm map sits beside its details on a wide tab and stacks on a narrow one, and shows which tile is under the pointer. Updates repaint once per frame instead of once per event, and the map image and reach overlay are cached. Saves from v3.2.0 load unchanged. |
