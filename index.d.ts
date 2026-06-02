import type {CSSProperties} from 'react';

type ActionId =
  | 'copy'
  | 'view'
  | 'chatgpt'
  | 'claude'
  | 'perplexity'
  | 'gemini'
  | 'mcp-copy'
  | 'mcp-cursor'
  | 'mcp-vscode';

type StyleConfig = {
  className?: string;
  style?: CSSProperties;
};

type McpServerConfig = {
  name?: string;
  config?: Record<string, unknown>;
  url?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  type?: string;
  [key: string]: unknown;
};

type McpServerOption = string | McpServerConfig;

type LabelGroup = {
  title?: string;
  description?: string;
};

export type CopyPageButtonLabels = {
  button?: {label?: string};
  copy?: LabelGroup;
  view?: LabelGroup;
  chatgpt?: LabelGroup;
  claude?: LabelGroup;
  perplexity?: LabelGroup;
  gemini?: LabelGroup;
  mcpCopy?: LabelGroup;
  mcpCursor?: LabelGroup;
  mcpVscode?: LabelGroup;
};

export type CopyPageButtonPluginOptions = {
  customStyles?: {
    container?: StyleConfig;
    button?: StyleConfig;
    dropdown?: StyleConfig;
    dropdownItem?: StyleConfig;
  };
  enabledActions?: ActionId[];
  generateMarkdownRoutes?: boolean;
  /**
   * Which URL the "Open in ChatGPT/Claude/…" actions reference.
   * - `true`  — derive a `/path.md` URL from the current page (use when the
   *   site already serves per-page markdown, e.g. an llms.txt setup, without
   *   asking this plugin to generate routes).
   * - `false` — always use the HTML page URL.
   * - omitted — follows `generateMarkdownRoutes`.
   *
   * For a non-standard markdown layout, render the React component directly
   * (see README "Option 4") and pass a `(pageUrl) => string` function — that
   * form can't be expressed here because it can't cross the auto-injection
   * boundary (the options are JSON-serialized into the page).
   */
  markdownUrl?: boolean;
  injectButton?: boolean;
  placement?: 'auto' | 'toc' | 'article';
  mcpServer?: McpServerOption | null;
  labels?: CopyPageButtonLabels;
};

export default function copyPageButtonPlugin(
  context: unknown,
  options?: CopyPageButtonPluginOptions
): unknown;
