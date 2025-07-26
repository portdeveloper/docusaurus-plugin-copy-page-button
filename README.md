# Docusaurus Copy Page Button Plugin

A lightweight Docusaurus plugin that adds a "Copy page" button to your documentation site, making it easy for users to extract page content as markdown for use with LLMs and AI tools.

## Features

- 📋 **Copy page as markdown** - Clean page content extraction
- 👁️ **View as markdown** - Preview extracted content in modal
- 🤖 **AI integration** - Direct "Open in ChatGPT" and "Open in Claude" buttons
- ⚡ **Auto-injection** - Automatically adds to navbar (no configuration needed)
- 🎨 **Theme-aware** - Supports light/dark themes
- 📱 **Mobile-friendly** - Responsive design
- 🛠️ **Zero-config** - Works out of the box with sensible defaults

## Installation

```bash
npm install docusaurus-plugin-copy-page-button
```

## Usage

### Option 1: Auto-injection (Recommended)

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: ["docusaurus-plugin-copy-page-button"],
};
```

The button will automatically appear in your navbar!

### Option 2: Manual component usage

Import and use the component manually:

```jsx
import CopyPageButton from "docusaurus-plugin-copy-page-button";

// In your custom navbar or anywhere else
<CopyPageButton />
```

**Note**: The component currently doesn't accept props - all features are enabled by default with fixed settings.

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

1. Selecting the main content area
2. Removing navigation, sidebars, and UI elements
3. Cleaning up admonition blocks (`:::` → spaces)
4. Formatting as clean markdown with title and URL

## License

MIT
