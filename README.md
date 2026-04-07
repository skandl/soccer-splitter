# Soccer Splitter

Static single-page app for splitting a list of names into groups (`index.html`).

## Host on GitHub Pages

1. Push this repository to GitHub.
2. Open the repo on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. Merge or push to `main` (or `master`). The **Deploy GitHub Pages** workflow uploads the repo root as the site.
5. After the workflow succeeds, the site URL is:

   `https://<your-username>.github.io/<repository-name>/`

   The app loads from `index.html` at the root, so the short URL above is enough (no path suffix).

If Pages was never used on this repo before, GitHub may ask you to approve the `github-pages` environment the first time the workflow runs.

## QA / CI

Pull requests and pushes to `main` / `master` run **Playwright** end-to-end tests against a local static server (`python3 -m http.server`).

Locally:

```bash
npm ci
npx playwright install chromium
npm test
```

## Requirements

Product behavior is summarized in [REQUIREMENTS.md](REQUIREMENTS.md).
