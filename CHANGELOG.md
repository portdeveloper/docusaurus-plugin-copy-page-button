# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 0.5.1 — 2026-05-15

### Fixed

- ChatGPT button now opens `chatgpt.com` directly instead of relying on the legacy `chat.openai.com` redirect.
- Gemini button now routes to Google's AI Mode (`google.com/search?udm=50`), which actually prefills the prompt — the previous `gemini.google.com/guided-learning?query=` URL silently ignored the query parameter.

## 0.5.0 — 2026-04-30

### Added

- Added optional markdown URL generation for Docusaurus docs pages with `generateMarkdownRoutes`.
