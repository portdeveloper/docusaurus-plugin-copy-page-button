# Docusaurus Copy Page Button Plugin

A lightweight Docusaurus plugin that adds a "Copy page" button to your documentation site, making it easy for users to extract page content as markdown for use with LLMs and AI tools.

## Features

- 📋 **Copy page as markdown** - Clean page content extraction
- 👁️ **View as markdown** - Preview extracted content
- 🤖 **AI integration** - Direct links to ChatGPT and Claude
- ⚡ **Auto-injection** - Automatically adds to navbar
- 🎨 **Theme-aware** - Supports light/dark themes
- 📱 **Mobile-friendly** - Responsive design

## Installation

```bash
npm install docusaurus-plugin-copy-page-button
```

## Usage

### Option 1: Auto-injection (Recommended)

Add the plugin to your `docusaurus.config.js`:

```js
module.exports = {
  plugins: ['docusaurus-plugin-copy-page-button'],
};
```

The button will automatically appear in your navbar!

### Option 2: Manual component usage

Import and use the component manually:

```jsx
import { CopyPageButton } from 'docusaurus-plugin-copy-page-button';

// In your custom navbar or anywhere else
<CopyPageButton 
  buttonText="Copy page"
  enableChatGPT={true}
  enableClaude={true}
  enableMarkdownView={true}
  customPrompt="Please analyze this documentation:"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonText` | `string` | `'Copy page'` | Text displayed on the button |
| `enableChatGPT` | `boolean` | `true` | Show ChatGPT integration |
| `enableClaude` | `boolean` | `true` | Show Claude integration |
| `enableMarkdownView` | `boolean` | `true` | Show markdown preview option |
| `customPrompt` | `string` | `'Please analyze this documentation page:'` | Custom AI prompt |

## How It Works

The plugin intelligently extracts page content by:

1. Selecting the main content area
2. Removing navigation, sidebars, and UI elements
3. Cleaning up admonition blocks (`:::` → spaces)
4. Formatting as clean markdown with title and URL

## License

MIT
