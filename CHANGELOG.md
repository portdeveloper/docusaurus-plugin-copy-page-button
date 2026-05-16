# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
