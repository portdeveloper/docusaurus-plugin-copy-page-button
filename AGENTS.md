# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## Project Overview

This is a Docusaurus plugin that adds a "Copy page" button to documentation sites, allowing users to extract page content as markdown for use with LLMs and AI tools.

## Key Architecture

### Core Components

- **src/index.js** - Main plugin entry point that registers the plugin with Docusaurus and passes options to the client-side code
- **src/CopyPageButton.js** - React component that renders the copy button and dropdown with actions (copy, view, open in AI tools)
- **src/client.js** - Client-side injection logic that automatically adds the button to the Docusaurus sidebar
- **src/styles.module.css** - CSS styles for the copy button and dropdown

### Plugin Architecture

This is a client-side Docusaurus plugin that:
1. Registers itself via the main plugin function in `src/index.js`
2. Uses `getClientModules()` to inject client-side code
3. Uses `injectHtmlTags()` to pass configuration options to the browser
4. Auto-injects the copy button into the table of contents sidebar

### Client-Side Injection Strategy

The plugin uses a sophisticated injection system in `src/client.js`:
- **Fast injection** for SPA navigation when sidebar already exists
- **Reliable injection** for page refreshes with retry logic and timeout handling
- **Responsive handling** for layout changes and mobile/desktop transitions
- **Route change detection** using multiple strategies (popstate, docusaurus events, URL monitoring)

### Content Extraction

The `CopyPageButton.js` component includes comprehensive markdown conversion logic that:
- Extracts main content from Docusaurus article containers
- Removes navigation, UI elements, and buttons
- Converts HTML to clean markdown with proper formatting
- Handles code blocks, tables, lists, and admonitions
- Cleans up various text encoding issues

## Development Workflow

Since this is a pure Docusaurus plugin with no build step:
- No npm scripts for building, testing, or linting
- Changes to source files are immediately usable
- Test by linking the package locally and using in a Docusaurus project

## Documentation Outreach PRs

Before opening a PR to add this plugin to another documentation site, screen the target repository's base branch for overlapping features.

Required checks:
- Search for existing page-level copy or AI actions, including `CopyPageButton`, `DocActionsDropdown`, `copy as markdown`, `copy page`, `Open in ChatGPT`, `Open in Claude`, `Open in Gemini`, and `docusaurus-plugin-copy-page-button`.
- Search for adjacent LLM documentation export features, including `llms.txt`, `llms-full.txt`, `docusaurus-plugin-llms`, `markdown-export`, and custom `llm` or `llms` plugins.
- Check whether this account already opened a PR in that repository with `docusaurus-plugin-copy-page-button`.

Do not open a PR when the site already has an equivalent page-level copy/open-in-AI UI. If the site only has `llms.txt` or static markdown exports, the PR may still be useful, but the PR body must explicitly mention the existing feature and explain that this plugin adds a page-level copy/open UI instead of a corpus export.

### Repository policy pre-flight (do this BEFORE opening any outreach PR)

Never open an outreach PR blindly. In addition to the feature-overlap screen above, check the target repo's contribution rules and health — a clean feature-fit is not enough if the repo will auto-close the PR or the project is dead:

- **CONTRIBUTING.md / PR template** — read `CONTRIBUTING.md` (root or `.github/`) and any `.github/PULL_REQUEST_TEMPLATE*`. Follow the template.
- **CLA / DCO** — flag any CLA-assistant / EasyCLA (common in OpenJS, CNCF, LF, Meta, Microsoft, Salesforce orgs) or DCO `Signed-off-by` requirement. If DCO, commit with `git commit -s`. Note the CLA so the user knows to sign it.
- **Issue-first policy** — many projects explicitly close feature PRs opened without a pre-approved issue. If so, **open a short enhancement issue and wait for maintainer go-ahead instead of filing the PR cold.**
- **Commit / PR-title conventions** — use Conventional Commits (`docs:` / `feat:`) or semantic PR titles where the repo enforces them (commitlint, semantic-pr, label-required CI).
- **Project health** — skip / deprioritize repos that are archived, in wind-down/rename, superseded by a successor repo, or stale (no commits in many months). Consider the successor repo instead.

Record per-target policy findings (proposal-first gates, CLA orgs, dead/renamed projects) in memory so they aren't re-discovered every cycle.

### Build-verify + draft + confirm (filing workflow)

1. Fork with a custom `--fork-name` (default names collide across targets); verify the fork via `gh api repos/<fork> -q .fork` (the fork command may print no stdout but still succeed).
2. Add the plugin to the `plugins` array and pin it in the docs `package.json` `dependencies`; update the lockfile so the target's frozen-lockfile CI passes.
3. Run `docusaurus build` locally and confirm it succeeds. The button mounts client-side, so it will NOT appear in static HTML — a clean build is the pass criterion. If the build fails, prove it fails identically WITHOUT the change (pre-existing) before proceeding, and do not claim a passing build in the PR body if you could not run one.
4. Write the PR body to `/home/ubuntu/pr-drafts/<target>.md` and wait for explicit user confirmation before running `gh pr create`. Never draft-in-chat and file in one step.

### Local Testing Process
1. `npm link` in this repository
2. `npm link docusaurus-plugin-copy-page-button` in target Docusaurus project
3. Add plugin to `docusaurus.config.js`
4. Start Docusaurus development server to test changes

## Configuration Options

The plugin accepts a `customStyles` option for styling the button, dropdown, and container elements. Positioning styles from button config are automatically moved to the container for proper layout control.

## Browser Environment Requirements

- Only runs in browser environment (uses `ExecutionEnvironment.canUseDOM`)
- Requires React 18+ and Docusaurus 3.0+ (specified in peerDependencies)
- Uses modern browser APIs like clipboard and DOM manipulation
