# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `zola serve` — run the site locally with Zola's dev server.
- `zola build` — compile the site and validate content/templates.
- `zola check` — validate links, anchors, and site integrity.
- Preview integration uses `.claude/launch.json`, which runs `zola serve --interface 127.0.0.1 --port ${PORT}` with `autoPort` enabled because port `1111` may already be in use.

There is no package manager, test framework, or lint command configured in this project. For changes to templates, Sass, content, or static JavaScript, use `zola build` as the baseline verification and browser preview for observable UI changes.

## Project Overview

This is a Zola 0.22.x personal blog theme project. The site is currently focused on a liquid-glass visual style, long-form posts, and short-form moments similar to WeChat timeline posts.

Zola configuration lives in `zola.toml`:

- Sass compilation is enabled via `compile_sass = true`; the main stylesheet is `sass/main.scss` and compiles to `main.css`.
- Search index generation is enabled, but the custom search UI currently builds its own JSON payload in `templates/search.html` and uses `static/js/search.js`.
- Taxonomies are `tags` and `categories`.
- Markdown highlighting uses `catppuccin-mocha`.
- Site metadata such as author and tagline is in `[extra]`.

## Content Model

Content is organized under `content/`:

- `content/_index.md` is the homepage section and uses `templates/index.html`; it is sorted by date and paginated by 10.
- `content/posts/_index.md` is the long-form posts section; it uses `templates/section.html`, `templates/page.html`, sorts by date, and paginates by 10.
- `content/moments/_index.md` is the short-form timeline section; it uses `templates/moments.html` and `templates/moment.html` without pagination.
- `content/search/_index.md` renders the custom search page through `templates/search.html`.

Posts and moments use TOML front matter. Posts normally include `title`, `date`, `updated`, `description`, and taxonomies. Moments are short entries with `title`, `date`, `updated`, tags, categories, and brief body content.

## Template Architecture

- `templates/base.html` defines the document shell, top dock navigation, footer, liquid-glass SVG filters, global stylesheet, remote pixel-title font loading, and the global `static/js/code-copy.js` script.
- `templates/macros.html` provides reusable `page_card` and taxonomy pill macros. Post cards expose a `data-search-text` attribute for reusable client-side search/filtering behavior.
- `templates/index.html` renders the homepage as a direct latest-post listing with previous/next pagination; the homepage intentionally stays simple and does not load a filter/search UI.
- `templates/section.html` renders the posts archive grid and numbered pagination with left/right arrows.
- `templates/page.html` renders full post pages with metadata, tags, and prose content.
- `templates/static-page.html` renders static sections such as About.
- `templates/moments.html` renders all moments as a timeline using `.moment-card` panels.
- `templates/search.html` embeds JSON for posts and moments and provides a Posts/Moments toggle; `static/js/search.js` defaults to Posts and filters only the selected kind.

## Styling and Frontend Behavior

The theme styling is centralized in `sass/main.scss`. The liquid-glass effect is built around `.glass-panel`, translucent backgrounds, inset edge highlights, and SVG filters defined in `base.html`: `filter#liquid-glass` for general panels and `filter#dock-liquid-glass` for the sticky top dock. The dock intentionally uses `backdrop-filter: blur(...) url(#dock-liquid-glass)` so content passing behind it appears refracted/distorted; Safari falls back to blur-only through `-webkit-backdrop-filter`.

Homepage and archive pages intentionally stay quiet: the homepage directly lists latest posts, the Posts page is a plain archive without a large search box, and post grids use two columns on desktop and one column on smaller screens. Post cards should stay lightweight and currently show only the published date, title, description, and tags.

Page hero titles use a pixel-style treatment via `--pixel-font` and the `Press Start 2P` font loaded in `base.html`. The homepage title preserves its original letter casing through the `home-page` body class; non-home page hero titles and article/static-page titles are forced uppercase, including About.

Static JavaScript files are small and framework-free:

- `static/js/post-filter.js` filters visible post cards using each card's `data-search-text`; it is currently not loaded by the simplified homepage or Posts archive.
- `static/js/search.js` powers the dedicated search page and keeps Posts and Moments searches separate.
- `static/js/code-copy.js` adds Copy buttons to fenced code blocks inside `.prose pre`; inline code is not affected.

When changing UI behavior or styles, verify with browser preview in addition to `zola build`, especially for the dock, post cards, moments timeline, pagination, search toggles, and code-copy buttons.
