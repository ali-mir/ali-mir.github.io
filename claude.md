# Ali Mir Personal Website

Personal portfolio and blog at ali-mir.com, built with SvelteKit and Tailwind CSS, deployed to GitHub Pages.

## Tech Stack

- **Framework**: SvelteKit with static adapter for pre-rendering
- **Styling**: Tailwind CSS with PostCSS
- **Content**: Markdown files parsed with Marked at build time
- **Language**: JavaScript/TypeScript (optional typing via jsconfig)
- **Deployment**: GitHub Pages via `gh-pages` package

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Build static site to /build
npm run preview    # Preview production build
npm run check      # Type check with svelte-check
npm run format     # Format code with Prettier
npm run gh-pages   # Build and deploy to GitHub Pages
```

## Project Structure

```
src/
├── app.html              # HTML template
├── app.css               # Global styles (Tailwind directives + custom)
├── lib/                  # Shared components (minimal)
└── routes/
    ├── +layout.svelte    # Global layout
    ├── +layout.ts        # Prerender + trailing slash config
    ├── +page.svelte      # Home/about page
    └── writing/
        ├── +page.svelte          # Writing index
        ├── [slug]/+page.svelte   # Blog post template
        ├── [slug]/+page.server.ts # Markdown loading logic
        └── *.md                   # Blog post content files
static/                   # Static assets (favicon, CNAME, images)
build/                    # Generated static output (do not edit)
```

## Writing Blog Posts

1. Create a new `.md` file in `src/routes/writing/`
2. Use the filename as the URL slug (e.g., `my-post.md` → `/writing/my-post/`)
3. Format with heading + date:
   ```markdown
   # Post Title
   ## Month Year

   Content here...
   ```
4. Add entry to `src/routes/writing/+page.svelte` in the posts array

## Styling Conventions

- Color palette: `#C44B4F` (red accent), `#4C5355` (text), `#536c73` (links)
- Blog content uses centered layout with constrained width (9/12)
- Use Tailwind utilities; custom classes defined in `app.css`

## Deployment

The site deploys to the `gh-pages` branch. Run `npm run gh-pages` to build and deploy. The custom domain `ali-mir.com` is configured via `static/CNAME`.

## Notes

- All routes are pre-rendered at build time (`prerender = true`)
- Trailing slashes are enforced on all URLs
- `.nojekyll` disables Jekyll processing on GitHub Pages
