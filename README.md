# Erma's Nutrition Center — placeholder site

Single-page placeholder for Erma's Nutrition Center and Natural Market (Nassau Bay, TX), hosted on GitHub Pages until the Shopify store launches.

## Editing

- Content lives in `index.html`. Store hours used by the "Open now" badge are in `src/main.js` (`HOURS`).
- Styles are Tailwind CSS compiled to `assets/styles.css`. After changing classes in `index.html`, rebuild:

```bash
npm install
npm run build
```

Commit the rebuilt `assets/styles.css`; GitHub Pages serves the repo as-is.

## Before treating as final

Confirm with the store: hours, farmers market schedule, logo version, permission to use the produce photo, and whether to publish `info@ermasnutritioncenter.com` (not currently shown).
