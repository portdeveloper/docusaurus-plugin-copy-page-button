# Docusaurus Copy Page Button Plugin

[![npm version](https://badge.fury.io/js/docusaurus-plugin-copy-page-button.svg)](https://www.npmjs.com/package/docusaurus-plugin-copy-page-button)
[![npm downloads](https://img.shields.io/npm/dm/docusaurus-plugin-copy-page-button.svg)](https://www.npmjs.com/package/docusaurus-plugin-copy-page-button)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Mentioned in Awesome Docusaurus](https://awesome.re/mentioned-badge.svg)](https://github.com/webbertakken/awesome-docusaurus)

**[Live Demo](https://portdeveloper.github.io/copy-page-button-showcase/)** · **[Read the story](https://portdeveloper.github.io/articles/how-a-button-i-built-for-one-docs-site-ended-up-on-twenty.html)**

<img src="https://github.com/user-attachments/assets/8e7351ba-0cab-489c-bbcf-543603c3bcf1" alt="Docusaurus Copy Page Button Plugin Preview" width="418" height="448" />

**Extract Docusaurus documentation content as markdown for AI tools like ChatGPT, Claude, Perplexity, and Gemini**

A lightweight Docusaurus plugin that adds a "Copy page" button to your documentation site. Perfect for developers who want to quickly extract documentation content for AI assistance, code reviews, or content analysis.

## Used by

Shipping in production on documentation sites across the ecosystem:

<p>
  <a href="https://ethereum.github.io/execution-apis/" title="Ethereum Execution APIs"><img src="https://github.com/ethereum.png" width="56" height="56" alt="Ethereum"/></a>
  <a href="https://docs.sui.io" title="Sui (Mysten Labs)"><img src="https://github.com/MystenLabs.png" width="56" height="56" alt="Sui"/></a>
  <a href="https://dev.flare.network" title="Flare"><img src="https://github.com/flare-foundation.png" width="56" height="56" alt="Flare"/></a>
  <a href="https://docs.kaia.io" title="Kaia"><img src="https://github.com/kaiachain.png" width="56" height="56" alt="Kaia"/></a>
  <a href="https://docs.nillion.com" title="Nillion"><img src="https://github.com/NillionNetwork.png" width="56" height="56" alt="Nillion"/></a>
  <a href="https://docs.chroniclelabs.org" title="Chronicle"><img src="https://github.com/chronicleprotocol.png" width="56" height="56" alt="Chronicle"/></a>
  <a href="https://docs.cardano.org" title="Cardano"><img src="https://github.com/cardano-foundation.png" width="56" height="56" alt="Cardano"/></a>
  <a href="https://docs.arbitrum.io" title="Arbitrum"><img src="https://github.com/OffchainLabs.png" width="56" height="56" alt="Arbitrum"/></a>
  <a href="https://pptr.dev" title="Puppeteer"><img src="https://github.com/puppeteer.png" width="56" height="56" alt="Puppeteer"/></a>
  <a href="https://reactnative.dev" title="React Native"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/3840px-React-icon.svg.png" width="56" height="56" alt="React Native"/></a>
  <a href="https://developer.playcanvas.com" title="PlayCanvas"><img src="https://github.com/playcanvas.png" width="56" height="56" alt="PlayCanvas"/></a>
</p>

Source-confirmed public docs sites:

- [1claw Docs](https://docs.1claw.xyz)
- [Agent Layer](https://agent-layer.dev)
- [Arbitrum](https://docs.arbitrum.io)
- [Besu](https://besu.hyperledger.org)
- [Cardano](https://docs.cardano.org)
- [Chronicle](https://docs.chroniclelabs.org)
- [Ethereum execution-apis](https://ethereum.github.io/execution-apis/)
- [FitFileViewer](https://nick2bad4u.github.io/FitFileViewer/)
- [Flare](https://dev.flare.network)
- [Hashi](https://mystenlabs.github.io/hashi/design/)
- [Kaia](https://docs.kaia.io)
- [Nillion](https://docs.nillion.com)
- [Ovineko](https://ovineko.com)
- [PlayCanvas](https://developer.playcanvas.com)
- [Puppeteer](https://pptr.dev)
- [React Native](https://reactnative.dev)
- [Seal](https://seal-docs.wal.app)
- [Sui](https://docs.sui.io)
- [SuiNS](https://docs.suins.io)
- [ThunderID](https://thunderid.dev)
- [Uptime Watcher](https://nick2bad4u.github.io/Uptime-Watcher/)
- [Walrus](https://docs.wal.app)
- [Ai DIY](https://docs.yiw.me)

Using this plugin? Open a PR to add your project.

In review for [Ceramic docs](https://github.com/ceramicnetwork/docs-docusaurus/pull/114), [Cypress documentation](https://github.com/cypress-io/cypress-documentation/pull/6462), [Dagger docs](https://github.com/dagger/dagger/pull/13045), [Fastify docs](https://github.com/fastify/website/pull/433), [Ionic docs](https://github.com/ionic-team/ionic-docs/pull/4499), [Jest docs](https://github.com/jestjs/jest/pull/16179), [Logto docs](https://github.com/logto-io/docs/pull/1400), [pnpm docs](https://github.com/pnpm/pnpm.io/pull/806), [Puffer Finance docs](https://github.com/PufferFinance/website-docs/pull/103), [Redux Toolkit docs](https://github.com/reduxjs/redux-toolkit/pull/5299), [Seeed Studio Wiki](https://github.com/Seeed-Studio/wiki-documents/pull/4682), [SRS docs](https://github.com/ossrs/srs-docs/pull/93), [StreamElements docs](https://github.com/StreamElements/docs/pull/86), [Temporal docs](https://github.com/temporalio/documentation/pull/4618), [tRPC docs](https://github.com/trpc/trpc/pull/7379), and [Uniswap docs](https://github.com/Uniswap/docs/pull/1132).

## Why Use This Plugin?

- **AI-Ready Content**: Instantly convert documentation pages to clean markdown for ChatGPT, Claude, Perplexity, or other AI tools
- **Developer Productivity**: Copy entire documentation pages without manual selection and cleanup
- **Zero Configuration**: Works out of the box - just install and go
- **Documentation Workflow**: Streamline the process of getting documentation context for AI assistance

## Features

- 📋 **Copy page as markdown** - Clean page content extraction
- 👁️ **View as markdown** - Preview extracted content in new tab
- 🤖 **AI integration** - Direct "Open in ChatGPT", "Open in Claude", "Open in Perplexity", and "Open in Gemini" buttons
- ⚙️ **Configurable actions** - Show/hide specific dropdown actions (perfect for private sites)
- ⚡ **Auto-injection** - Automatically adds to the docs page (no configuration needed)
- 🧩 **Theme integration** - Import the React component directly when your site needs exact placement or no layout shift
- 🔌 **Optional MCP actions** - Add Cursor and VS Code MCP install links when your docs expose an MCP server
- 🎨 **Theme-aware** - Supports light/dark themes
- 🎨 **Customizable styling** - Easy custom CSS classes and inline styles
- 📱 **Mobile-friendly** - Responsive design
- 🛠️ **Zero-config** - Works out of the box with sensible defaults

## Installation

```bash
npm install docusaurus-plugin-copy-page-button
```

## Usage

### Option 1: Auto-injection

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: ["docusaurus-plugin-copy-page-button"],
};
```

The button automatically appears in the table of contents sidebar when one is visible. On mobile and no-TOC pages, it falls back to the top of the article.

### Option 2: Choose placement

Use `placement: "article"` if your theme header, sidebar, or table of contents layout makes the sidebar placement awkward:

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        placement: "article",
      },
    ],
  ],
};
```

Available values:
- `"auto"` - sidebar on desktop when visible, article on mobile/no-TOC pages
- `"toc"` - table of contents only
- `"article"` - top of the article column

### Option 3: Custom positioning

Use custom styles to position the button differently:

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        customStyles: {
          button: {
            style: {
              position: "fixed",
              top: "20px",
              right: "20px",
            },
          },
        },
      },
    ],
  ],
};
```

### Option 4: Render the React component yourself

For high-traffic docs sites that want zero client-side placement shift, disable auto-injection and render the button from a swizzled Docusaurus theme component.

```js
// docusaurus.config.js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        injectButton: false,
        generateMarkdownRoutes: true,
      },
    ],
  ],
};
```

```tsx
// src/theme/DocItem/Layout/index.tsx
import CopyPageButton from "docusaurus-plugin-copy-page-button/react";

export default function DocItemLayout(props) {
  return (
    <>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <CopyPageButton generateMarkdownRoutes />
      </div>
      {/* render your normal Docusaurus DocItem layout here */}
    </>
  );
}
```

This path is best when maintainers care about first paint, exact visual placement, or avoiding any post-hydration DOM insertion.

## Configuration

### Enabled Actions

You can control which actions appear in the dropdown menu using the `enabledActions` option. This is particularly useful for private documentation sites where the AI tool links (ChatGPT/Claude/Perplexity/Gemini) won't work properly.

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        // Only show copy and view actions (hide AI tools)
        enabledActions: ['copy', 'view'],
      },
    ],
  ],
};
```

**Available actions:**
- `'copy'` - Copy page as Markdown
- `'view'` - View as Markdown in new tab
- `'chatgpt'` - Open in ChatGPT
- `'claude'` - Open in Claude
- `'perplexity'` - Open in Perplexity
- `'gemini'` - Open in Gemini
- `'mcp-copy'` - Copy MCP server JSON (shown when `mcpServer` is configured)
- `'mcp-cursor'` - Install MCP server in Cursor (shown when `mcpServer` is configured)
- `'mcp-vscode'` - Install MCP server in VS Code (shown when `mcpServer` is configured)

**Default:** Standard actions are enabled: `['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'gemini']`. MCP actions are enabled automatically only when `mcpServer` is configured.

**Example configurations:**

```js
// Only copy functionality
enabledActions: ['copy']

// Copy and view only (no AI tools)
enabledActions: ['copy', 'view']

// All standard AI actions (default)
enabledActions: ['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'gemini']
```

### MCP server actions

If your documentation site exposes an MCP server, configure it to add MCP actions to the dropdown:

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        mcpServer: {
          name: "my-docs",
          url: "https://docs.example.com/mcp",
        },
      },
    ],
  ],
};
```

The plugin can copy the MCP JSON config and generate install links for Cursor and VS Code. Cursor install links follow Cursor's MCP deeplink format, and VS Code install links use `vscode:mcp/install`.

For URL-only MCP servers, you can also pass the URL string directly:

```js
mcpServer: "https://docs.example.com/mcp"
```

The shorthand uses `docs` as the server name.

### Custom Styling

You can customize the appearance of the copy page button by passing a `customStyles` option:

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        customStyles: {
          button: {
            className: "my-custom-button",
            style: {
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "8px",
            },
          },
          dropdown: {
            className: "my-custom-dropdown",
            style: {
              backgroundColor: "#f8f9fa",
              border: "2px solid #4CAF50",
            },
          },
          dropdownItem: {
            style: {
              padding: "12px 20px",
              fontSize: "16px",
            },
          },
          container: {
            className: "my-button-container",
          },
        },
      },
    ],
  ],
};
```

#### Available Style Targets

- **`button`** - The main copy page button (positioning styles like `position`, `top`, `left` are automatically applied to the container)
- **`dropdown`** - The dropdown menu that appears when clicking the button
- **`dropdownItem`** - Individual items in the dropdown menu
- **`container`** - The wrapper container around the button

#### Style Options

Each target accepts:
- **`className`** - CSS class name(s) to add to the element
- **`style`** - Inline styles object (React style format)

Custom styles are merged with the default styles, so you only need to specify what you want to change.

#### Example: Custom positioning

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        customStyles: {
          button: {
            style: {
              position: "fixed",
              top: "100px",
              left: "100px",
              zIndex: 1000,
            },
          },
        },
      },
    ],
  ],
};
```

**Note**: Positioning styles (`position`, `top`, `right`, `bottom`, `left`, `zIndex`, `transform`) specified in the `button` configuration are automatically applied to the container element for proper positioning control.

#### Example: Styling without positioning

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        customStyles: {
          button: {
            style: {
              backgroundColor: "transparent",
              border: "2px solid #007acc",
              color: "#007acc",
              borderRadius: "12px",
              fontWeight: "bold",
            },
          },
        },
      },
    ],
  ],
};
```

### Localization

Two ways to translate the visible labels, each suited to a different site shape.

#### Option A — `labels` plugin option (works for any site, including monolingual or one-site-per-language setups)

Pass label overrides directly in your `docusaurus.config.js`. The `labels` object wins over everything else when set:

```js
module.exports = {
  plugins: [
    [
      "docusaurus-plugin-copy-page-button",
      {
        labels: {
          button: { label: "ページをコピー" },
          copy: {
            title: "ページをコピー",
            description: "このページを Markdown としてコピー",
          },
          view: { title: "Markdown で表示" },
          chatgpt: { title: "ChatGPT で開く" },
          claude: { title: "Claude で開く" },
          perplexity: { title: "Perplexity で開く" },
          gemini: { title: "Gemini で開く" },
        },
      },
    ],
  ],
};
```

Override only the keys you need — anything you leave out falls back to the default English (or to an `i18n/<locale>/code.json` entry; see Option B).

This is the right option when each language has its own Docusaurus site (each with its own `defaultLocale`), because Docusaurus's `<Translate>` machinery only applies to non-default locales and `labels` sidesteps that constraint.

#### Option B — Docusaurus i18n (standard multi-locale sites)

For a site with `i18n: { defaultLocale, locales }` covering multiple locales, all visible strings also flow through Docusaurus's `translate()` calls. Add the translation IDs to `i18n/<locale>/code.json` for each non-default locale:

```json
{
  "copyPageButton.button.label": { "message": "コピー" },
  "copyPageButton.copy.title": { "message": "ページをコピー" },
  "copyPageButton.copy.description": { "message": "このページを Markdown としてコピー" },
  "copyPageButton.view.title": { "message": "Markdown で表示" },
  "copyPageButton.chatgpt.title": { "message": "ChatGPT で開く" },
  "copyPageButton.claude.title": { "message": "Claude で開く" },
  "copyPageButton.perplexity.title": { "message": "Perplexity で開く" },
  "copyPageButton.gemini.title": { "message": "Gemini で開く" }
}
```

> **Note:** `docusaurus write-translations` only scans your site's source code, not `node_modules`. The plugin's IDs won't be auto-extracted; copy them in manually from the table below.

Available translation IDs:

| ID | Default English |
|---|---|
| `copyPageButton.button.label` | `Copy page` (visible button text) |
| `copyPageButton.copy.title` / `.description` | `Copy page` / `Copy the page as Markdown for LLMs` |
| `copyPageButton.view.title` / `.description` | `View as Markdown` / `View this page as plain text` |
| `copyPageButton.chatgpt.title` / `.description` | `Open in ChatGPT` / `Ask questions about this page` |
| `copyPageButton.claude.title` / `.description` | `Open in Claude` / `Ask questions about this page` |
| `copyPageButton.perplexity.title` / `.description` | `Open in Perplexity` / `Ask questions about this page` |
| `copyPageButton.gemini.title` / `.description` | `Open in Gemini` / `Ask questions about this page` |
| `copyPageButton.mcpCopy.title` / `.description` | `Copy MCP config` / `Copy MCP server JSON` |
| `copyPageButton.mcpCursor.title` / `.description` | `Install in Cursor` / `Open Cursor MCP installer` |
| `copyPageButton.mcpVscode.title` / `.description` | `Install in VS Code` / `Open VS Code MCP installer` |

## Markdown URL routes

Set `generateMarkdownRoutes: true` to emit a plain-markdown URL for each generated documentation page:

```js
module.exports = {
  plugins: [["docusaurus-plugin-copy-page-button", { generateMarkdownRoutes: true }]],
};
```

For a Docusaurus page rendered at `build/page/index.html`, the plugin writes `build/page.md`, so static hosts serve it at `https://your-docs.com/page.md`. Users can now share `https://your-docs.com/page.md` directly with Claude, ChatGPT, or any tool that can fetch URLs as context. When this option is enabled, the AI tool actions also point at the `.md` URL.

## Local Development

To test this plugin locally during development:

### 1. Clone and setup

```bash
git clone https://github.com/portdeveloper/docusaurus-plugin-copy-page-button.git
cd docusaurus-plugin-copy-page-button
npm install
```

### 2. Link the package

```bash
npm link
```

### 3. Use in your Docusaurus project

Navigate to your Docusaurus project and link the local plugin:

```bash
cd /path/to/your/docusaurus/project
npm link docusaurus-plugin-copy-page-button
```

### 4. Configure in docusaurus.config.js

Add the plugin to your config:

```js
module.exports = {
  plugins: ["docusaurus-plugin-copy-page-button"],
};
```

### 5. Start development server

```bash
npm start
```

The locally linked plugin will now be active in your Docusaurus site. Any changes you make to the plugin source will require restarting the Docusaurus development server.

## How It Works

The plugin intelligently extracts page content by:

1. **Smart Content Selection**: Automatically identifies the main documentation content area
2. **Clean Extraction**: Removes navigation, sidebars, headers, footers, and UI elements
3. **Markdown Conversion**: Converts HTML to properly formatted markdown with preserved structure
4. **AI-Optimized Format**: Includes page title, URL, and clean content perfect for AI tool input

## Use Cases

- **AI-Assisted Development**: Quickly share documentation context with ChatGPT, Claude, Perplexity, or Gemini for coding help
- **Code Reviews**: Extract relevant documentation for code review discussions
- **Content Analysis**: Analyze documentation structure and content for improvements
- **Knowledge Sharing**: Easily share specific documentation sections with team members
- **Documentation Migration**: Extract content for migrating to other documentation platforms

## SEO Keywords

Docusaurus plugin, copy page button, extract documentation, markdown conversion, AI tools integration, ChatGPT documentation, Claude AI, Perplexity AI, Gemini AI, MCP, content extraction, developer tools, documentation productivity, React plugin, JavaScript documentation tools.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Support

- 🐛 [Report Issues](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues)
- 💡 [Request Features](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button/issues/new)
- 📖 [Documentation](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button#readme)

## Reach out to me for faster replies!

My telegram username is portdev, feel free to dm me whenever (and bug me if I don't reply)

## License

MIT © [portdeveloper](https://github.com/portdeveloper)
