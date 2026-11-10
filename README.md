# Student Sports

Static React + Vite storefront. The production build is a folder of HTML, CSS, and JavaScript, so it deploys on any static host.

## Local

```sh
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```sh
npm run build
npm run preview
```

`npm run build` writes the site to `dist/`. Upload that folder, or connect the repo and use the settings below.

## Deploy

Build command: `npm run build`  
Output directory: `dist`  
Node: 20 or newer

- **Vercel** — import the repo. Vite is detected automatically. `vercel.json` sends every path back to `index.html`, so `/shop` and `/product/...` keep working after a refresh.
- **Netlify** — publish directory `dist`. `netlify.toml` already sets the build and the SPA redirect.
- **Cloudflare Pages** — same build command and `dist` output. `public/_redirects` is copied into the build.
- **Any static host** — upload the contents of `dist`. `404.html` is a copy of `index.html`, which covers hosts that serve the 404 file for unknown paths.

Deploy the folder that contains this `package.json` (the inner `perfectly-crafted-canvas-main` folder), not the zip wrapper above it.
