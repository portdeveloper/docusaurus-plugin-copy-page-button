const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const copyPageButtonPlugin = require("../src/index.js");

const PAGE_HTML = `<!DOCTYPE html>
<html>
  <body>
    <div class="main-wrapper">
      <main>
        <article>
          <h1>Hello</h1>
          <p>Some documentation content.</p>
        </article>
      </main>
    </div>
  </body>
</html>`;

const SITE_CONFIG = { baseUrl: "/", url: "https://example.com" };

const makeOutDir = () =>
  fs.mkdtempSync(path.join(os.tmpdir(), "copy-page-button-test-"));

const runPostBuild = (outDir, routePath) => {
  const plugin = copyPageButtonPlugin(
    {},
    { generateMarkdownRoutes: true }
  );
  plugin.postBuild({
    siteConfig: SITE_CONFIG,
    routesPaths: [routePath],
    outDir,
  });
};

test("generates markdown for the default `<route>/index.html` layout", () => {
  const outDir = makeOutDir();
  const htmlPath = path.join(outDir, "guide", "index.html");
  fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
  fs.writeFileSync(htmlPath, PAGE_HTML);

  runPostBuild(outDir, "/guide");

  assert.ok(
    fs.existsSync(path.join(outDir, "guide.md")),
    "expected guide.md to be generated"
  );
});

test("generates markdown for the flat `<route>.html` layout (trailingSlash: false)", () => {
  const outDir = makeOutDir();
  // trailingSlash: false makes Docusaurus emit a flat file, not a directory.
  fs.writeFileSync(path.join(outDir, "guide.html"), PAGE_HTML);

  runPostBuild(outDir, "/guide");

  assert.ok(
    fs.existsSync(path.join(outDir, "guide.md")),
    "expected guide.md to be generated for the flat layout"
  );
});
