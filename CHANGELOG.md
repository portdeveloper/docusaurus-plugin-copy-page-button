# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

## 0.8.1 — 2026-06-05

### Fixed

- Corrected the malformed "Open in Perplexity" icon. The previous SVG path didn't match the Perplexity mark; it now uses the official logo. ([#5](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues/5))

## 0.8.0 — 2026-06-02

### Added

- New `markdownUrl` option to control which URL the "Open in ChatGPT/Claude/…" actions reference, independent of `generateMarkdownRoutes`. Sites that already publish per-page markdown (e.g. an llms.txt setup) can set `markdownUrl: true` to point the AI links at `/path.md` without this plugin generating any files. Accepts `true` / `false`, or a `(pageUrl) => string` function when rendering the React component directly.
- Interaction tracking hooks. A `copy-page-button:action` event now fires on `document` for every dropdown action (`detail: { action, url }`), and the rendered DOM exposes `data-copy-page-button-container`, `data-copy-page-button-trigger`, and `data-copy-page-action="<id>"` attributes for delegated analytics listeners.

### Fixed

- `placement: "auto"` is now deterministic across loads. Previously, if the ToC sidebar hadn't mounted by the first injection attempt, the button could stay stuck in the in-article fallback for the rest of the page's life — and since that timing varied per load, placement looked inconsistent. The button now migrates from the article fallback up into the sidebar as soon as it appears.

## 0.7.0 — 2026-05-26

### Added

- Localization support with two override paths. (1) New `labels` plugin option lets sites pass title/description strings directly in `docusaurus.config.js` — works for any site, including one-site-per-language setups where each site has its own `defaultLocale`. (2) All visible labels and descriptions ("Copy page", "View as Markdown", "Open in ChatGPT", etc.) also go through Docusaurus's `translate()`, so standard multi-locale sites can override them per locale via `i18n/<locale>/code.json`. Default English text is unchanged. See README "Localization" section for the full ID list.

### Fixed

- TypeScript declarations now accept all supported `mcpServer` forms, including URL strings and objects that rely on the default server name.

## 0.6.2 — 2026-05-22

### Fixed

- Dropdown positioning is calculated before the menu first renders, preventing the first interaction from briefly showing the menu in the viewport's top-left corner.

## 0.6.1 — 2026-05-21

### Fixed

- Auto placement no longer injects a copy button into generic custom pages that only expose a `main` element. The no-ToC fallback now targets docs/article containers only.

## 0.6.0 — 2026-05-21

### Added

- Added Perplexity as a first-class AI action.
- Added optional MCP actions for copying MCP server config and opening Cursor or VS Code MCP install links when `mcpServer` is configured.
- Added `placement` option with `auto`, `toc`, and `article` modes.
- Added `injectButton: false` for sites that want to render the React component manually while still using build-time markdown route generation.
- Added a stable `docusaurus-plugin-copy-page-button/react` component entrypoint with TypeScript declarations.
- Added TypeScript declarations for plugin options.

### Fixed

- Auto placement now uses article placement on mobile or when the table of contents is hidden, avoiding invisible buttons inside hidden desktop ToC containers.
- Removed global breadcrumb width overrides from the component stylesheet so manual component usage does not alter host site breadcrumbs.

## 0.5.2 — 2026-05-16

### Fixed

- No-ToC fallback now injects the button inline after the breadcrumbs instead of as a `position: fixed` overlay in the viewport corner. Pages with `hideTableOfContents` or naturally empty TOCs now get the button at the top of the article column.
- Reserve `min-height: 56px` on the sidebar-mode container so the button slot is sized before React mounts, reducing layout shift on first paint.
- Button and dropdown items inherit `--ifm-font-family-base` instead of falling back to the browser's default button font.
- Replaced the chained `setTimeout` polling with a `MutationObserver` on `document.body` so the button appears the moment the TOC or article mounts. Periodic check remains as a safety net.

Reported by @Simek in [facebook/react-native-website#5085](https://github.com/facebook/react-native-website/pull/5085).

## 0.5.1 — 2026-05-15

### Fixed

- ChatGPT button now opens `chatgpt.com` directly instead of relying on the legacy `chat.openai.com` redirect.
- Gemini button now routes to Google's AI Mode (`google.com/search?udm=50`), which actually prefills the prompt — the previous `gemini.google.com/guided-learning?query=` URL silently ignored the query parameter.

## 0.5.0 — 2026-04-30

### Added

- Added optional markdown URL generation for Docusaurus docs pages with `generateMarkdownRoutes`.
