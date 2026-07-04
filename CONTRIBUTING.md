# Contributing

Thanks for your interest in improving **docusaurus-plugin-copy-page-button**! Contributions of all kinds are welcome — bug reports, feature ideas, docs fixes, and pull requests.

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Ways to contribute

- 🐛 [Report a bug](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues)
- 💡 [Request a feature](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues/new)
- 📖 Improve the documentation
- 🔧 Submit a pull request

## Issue-first policy

**Every pull request must be linked to an issue.** Before writing code, open an issue (or find an existing one) so the change can be discussed and agreed on first. This avoids duplicated effort and makes sure the change fits the direction of the project.

In your PR description, reference the issue with a closing keyword, e.g. `Closes #42`. PRs without a linked issue may be closed with a request to open one. Trivial fixes (typos, obvious one-line bugs) are the only exception — but when in doubt, open an issue.

## Development setup

This is a pure Docusaurus plugin with no build step — changes to the source files under `src/` are immediately usable.

```bash
git clone https://github.com/portdeveloper/docusaurus-plugin-copy-page-button.git
cd docusaurus-plugin-copy-page-button
npm install
```

### Testing changes in a real site

Link the package into a local Docusaurus project to try your changes end to end:

```bash
# in this repo
npm link

# in your Docusaurus project
npm link docusaurus-plugin-copy-page-button
```

Then add the plugin to `docusaurus.config.js`:

```js
module.exports = {
  plugins: ["docusaurus-plugin-copy-page-button"],
};
```

Start the dev server (`npm start`). Restart it after editing plugin source, since the button is injected client-side.

## Running the tests

```bash
npm test
```

Tests use the built-in Node test runner (`node --test`) and live in `test/`. Please add or update tests when you change behavior in the markdown conversion or route generation logic (`src/htmlToMarkdown.js`, `src/index.js`).

You can also verify the package contents before publishing:

```bash
npm run pack:check
```

## Project layout

| File | Purpose |
| --- | --- |
| `src/index.js` | Plugin entry point; registers with Docusaurus and passes options to the client |
| `src/client.js` | Client-side injection logic that adds the button to the sidebar |
| `src/CopyPageButton.js` | React component for the button and dropdown |
| `src/htmlToMarkdown.js` | HTML → markdown conversion |
| `src/styles.module.css` | Button and dropdown styles |
| `test/` | Node test-runner tests |

See [AGENTS.md](./AGENTS.md) for a deeper architecture overview.

## Pull request guidelines

- Link the PR to an issue (`Closes #NN`) — see the [issue-first policy](#issue-first-policy) above.
- Keep PRs focused on a single change.
- Match the existing code style — no build tooling or formatter is enforced, so follow the surrounding conventions.
- Use clear commit messages. [Conventional Commits](https://www.conventionalcommits.org/) prefixes (`feat:`, `fix:`, `docs:`) are appreciated and keep the changelog readable.
- Update `README.md` and `index.d.ts` / `react.d.ts` if you add or change configuration options.
- Make sure `npm test` passes before opening the PR.

## Reporting bugs

When filing a bug, please include:

- The plugin version and your `@docusaurus/core` version
- Your `docusaurus.config.js` plugin configuration
- Steps to reproduce, and what you expected vs. what happened
- A link to the affected docs site if it's public

## Questions

For anything else, open an issue or reach out on Telegram: **@portdev**.
