# Docusaurus Copy Page Button Plugin

<img src="https://github.com/user-attachments/assets/2b91c2c9-97e7-4854-82dd-e1b6caa6511e" alt="Docusaurus Copy Page Button Plugin Preview" width="449" height="392" />

A lightweight Docusaurus plugin that adds a "Copy page" button to your documentation site, making it easy for users to extract page content as markdown for use with LLMs and AI tools.

## Features

- 📋 **Copy page as markdown** - Clean page content extraction
- 👁️ **View as markdown** - Preview extracted content in modal
- 🤖 **AI integration** - Direct "Open in ChatGPT" and "Open in Claude" buttons
- ⚡ **Auto-injection** - Automatically adds to navbar (no configuration needed)
- 🎨 **Theme-aware** - Supports light/dark themes
- 🎨 **Customizable styling** - Easy custom CSS classes and inline styles
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

## Configuration

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
