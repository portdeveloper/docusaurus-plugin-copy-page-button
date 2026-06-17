const fs = require("fs");
const path = require("path");
const { extractPageMarkdownFromHtml } = require("./htmlToMarkdown");

const trimRoutePath = (routePath) => {
  return String(routePath || "")
    .split("?")[0]
    .split("#")[0]
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
};

const stripBaseUrl = (routePath, baseUrl) => {
  const trimmed = trimRoutePath(routePath);
  const base = trimRoutePath(baseUrl);
  if (!base) {
    return trimmed;
  }
  if (trimmed === base) {
    return "";
  }
  if (trimmed.startsWith(`${base}/`)) {
    return trimmed.slice(base.length + 1);
  }
  return trimmed;
};

const getHtmlOutputPath = (outDir, routePath, baseUrl) => {
  const trimmed = stripBaseUrl(routePath, baseUrl);
  if (!trimmed) {
    return path.join(outDir, "index.html");
  }
  if (path.extname(trimmed)) {
    return path.join(outDir, trimmed);
  }
  // Docusaurus emits `<route>/index.html` by default, but `<route>.html`
  // when the site sets `trailingSlash: false`. Prefer whichever exists so
  // markdown generation works under both layouts.
  const nestedPath = path.join(outDir, trimmed, "index.html");
  if (fs.existsSync(nestedPath)) {
    return nestedPath;
  }
  const flatPath = path.join(outDir, `${trimmed}.html`);
  if (fs.existsSync(flatPath)) {
    return flatPath;
  }
  return nestedPath;
};

const getMarkdownOutputPath = (outDir, routePath, baseUrl) => {
  const trimmed = stripBaseUrl(routePath, baseUrl);
  if (!trimmed) {
    return path.join(outDir, "index.md");
  }
  if (path.extname(trimmed)) {
    return path.join(outDir, trimmed.replace(/\.[^/.]+$/, ".md"));
  }
  return path.join(outDir, `${trimmed}.md`);
};

const joinUrlPaths = (...parts) => {
  const joined = parts
    .filter(Boolean)
    .map((part) => String(part).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
  return `/${joined}`;
};

const getPageUrl = (siteConfig = {}, routePath) => {
  const pagePath = joinUrlPaths(
    siteConfig.baseUrl || "/",
    stripBaseUrl(routePath || "/", siteConfig.baseUrl || "/")
  );
  if (!siteConfig.url) {
    return pagePath;
  }
  return new URL(pagePath, siteConfig.url).toString();
};

const getRoutePathFromHtmlPath = (outDir, htmlPath) => {
  const relativePath = path.relative(outDir, htmlPath);
  if (relativePath === "index.html") {
    return "/";
  }
  if (path.basename(relativePath) === "index.html") {
    return `/${path.dirname(relativePath).split(path.sep).join("/")}`;
  }
  return `/${relativePath.split(path.sep).join("/")}`;
};

const getHtmlRoutePaths = (outDir) => {
  const routePaths = [];
  const visit = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        routePaths.push(getRoutePathFromHtmlPath(outDir, entryPath));
      }
    });
  };

  visit(outDir);
  return routePaths;
};

module.exports = function copyPageButtonPlugin(context, options = {}) {
  const {
    customStyles = {},
    enabledActions,
    generateMarkdownRoutes = false,
    markdownUrl,
    injectButton = true,
    placement = 'auto',
    mcpServer = null,
    ...otherOptions
  } = options;

  return {
    name: "copy-page-button-plugin",

    getClientModules() {
      return injectButton ? [path.resolve(__dirname, "./client.js")] : [];
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.__COPY_PAGE_BUTTON_OPTIONS__ = ${JSON.stringify({
                customStyles,
                enabledActions,
                generateMarkdownRoutes,
                // Functions can't survive JSON serialization into the injected
                // script, so the auto-injection path supports the boolean form.
                // Use the React component directly for a function `markdownUrl`.
                markdownUrl: typeof markdownUrl === "function" ? undefined : markdownUrl,
                placement,
                mcpServer,
                ...otherOptions
              })};
            `
          }
        ]
      };
    },

    postBuild({ siteConfig, routesPaths, outDir }) {
      if (!generateMarkdownRoutes) {
        return;
      }

      // Docusaurus content payloads vary by docs plugin/version, so read emitted HTML to match the runtime extractor.
      const routePaths = Array.isArray(routesPaths)
        ? routesPaths
        : getHtmlRoutePaths(outDir);
      const generatedPaths = new Set();
      routePaths.forEach((routePath) => {
        const htmlPath = getHtmlOutputPath(outDir, routePath, siteConfig.baseUrl);
        if (!fs.existsSync(htmlPath)) {
          return;
        }

        const markdownPath = getMarkdownOutputPath(
          outDir,
          routePath,
          siteConfig.baseUrl
        );
        if (generatedPaths.has(markdownPath)) {
          return;
        }

        const markdown = extractPageMarkdownFromHtml(
          fs.readFileSync(htmlPath, "utf8"),
          getPageUrl(siteConfig, routePath),
          { requireDocContent: true }
        );
        if (!markdown.trim()) {
          return;
        }

        fs.mkdirSync(path.dirname(markdownPath), { recursive: true });
        fs.writeFileSync(markdownPath, `${markdown.trim()}\n`);
        generatedPaths.add(markdownPath);
      });
    },
  };
};
