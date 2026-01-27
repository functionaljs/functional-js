# GitHub Pages Setup Guide

This guide walks through the steps to deploy the functional.js documentation site to GitHub Pages with the custom domain `functionaljs.com`.

## Prerequisites

- Repository: `functionaljs/functional-js`
- Custom domain: `functionaljs.com` (approved for the org)
- Branch: `master`
- Source directory: `/docs/`

## GitHub Repository Settings

1. Go to your repository settings: `https://github.com/functionaljs/functional-js/settings/pages`

2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `master`
   - **Folder**: `/docs`
   - Click **Save**

3. Under **Custom domain**:
   - Enter: `functionaljs.com`
   - Click **Save**
   - Wait for DNS check to complete (may take a few minutes)
   - Enable **Enforce HTTPS** once DNS check passes

## DNS Configuration

Configure your DNS provider with the following records for `functionaljs.com`:

### Option 1: Using GitHub's IP addresses (A records)

Add these A records:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Option 2: Using CNAME (if using subdomain)

If deploying to `www.functionaljs.com`:
```
CNAME: www -> functionaljs.github.io
```

### Apex domain (functionaljs.com)

For the apex domain, use A records (Option 1) and optionally add:
```
CNAME: www.functionaljs.com -> functionaljs.com
```

## Verification

After DNS propagates (can take up to 48 hours, usually much faster):

1. Visit `https://functionaljs.com` - should show the documentation site
2. HTTPS should be enforced automatically
3. Check that the CNAME file is present in the deployed site

## Troubleshooting

### DNS not propagating

Check DNS status:
```bash
dig functionaljs.com +noall +answer
nslookup functionaljs.com
```

### HTTPS not working

- Wait for DNS check to complete in GitHub settings
- DNS must fully propagate before HTTPS can be enabled
- Check that "Enforce HTTPS" is enabled in repository settings

### 404 errors

- Ensure the `/docs/` directory is on the `master` branch
- Verify GitHub Pages source is set to `master` branch and `/docs` folder
- Check GitHub Pages deployment status in the Actions tab

## Files in /docs/

The following files are included in the documentation site:

- `index.html` - Main homepage with features, examples, and performance benchmarks
- `api.html` - Complete API reference with left-hand navigation
- `styles.css` - All stylesheets for both pages
- `script.js` - JavaScript functionality (navigation, sidebar, smooth scroll)
- `logo.svg` - Lambda logo with gradient colors
- `lambda.svg` - Original lambda symbol
- `CNAME` - Contains the custom domain (`functionaljs.com`)
- `.nojekyll` - Tells GitHub Pages not to use Jekyll processing
- `robots.txt` - Search engine crawling directives
- `sitemap.xml` - Site structure for search engines (includes all pages and sections)
- `llms.txt` - AI assistant documentation reference
- `assets/` - Benchmark performance images
- `README.md` - Documentation about the docs site
- `SETUP.md` - This file

## npm Package Exclusion

The `/docs/` directory is automatically excluded from the npm package because:

1. The `package.json` has a `files` field that only includes:
   - `dist`
   - `src`
   - `README.md`
   - `LICENSE`
   - `llms.txt`

2. Any directories not in this list are excluded from the published npm package

## Deployment Workflow

1. Make changes to files in `/docs/`
2. Commit and push to `master` branch
3. GitHub Pages automatically deploys within 1-2 minutes
4. Visit `https://functionaljs.com` to see updates

No build step or GitHub Actions workflow required!
