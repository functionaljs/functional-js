# functional.js Documentation Site

This directory contains the documentation website for functional.js, deployed to [functionaljs.com](https://functionaljs.com) via GitHub Pages.

## Deployment

The site is automatically deployed to GitHub Pages from the `/docs/` directory on the `master` branch.

## Custom Domain

The custom domain `functionaljs.com` is configured via the `CNAME` file.

## Local Development

To preview the site locally, simply open `index.html` in a web browser, or use a local server:

```bash
npx serve docs
```

Then visit `http://localhost:3000`

## Technology

The site is built with:
- Vanilla HTML/CSS/JavaScript (no build step required)
- Google Fonts (Inter & Fira Code)
- Responsive design with mobile support

## Files

- `index.html` - Main documentation page with features, examples, and performance benchmarks
- `api.html` - Complete API reference with left-hand navigation menu
- `styles.css` - All styles and responsive design
- `script.js` - Interactive features (smooth scroll, nav behaviour, API sidebar)
- `logo.svg` - Lambda logo with gradient
- `lambda.svg` - Original lambda symbol
- `CNAME` - Custom domain configuration (functionaljs.com)
- `.nojekyll` - Disables Jekyll processing on GitHub Pages
- `robots.txt` - Search engine crawling directives
- `sitemap.xml` - Site structure for search engines
- `llms.txt` - AI assistant documentation reference (from repo root)
- `assets/` - Performance benchmark images
- `README.md` - This file
- `SETUP.md` - Detailed GitHub Pages setup instructions
