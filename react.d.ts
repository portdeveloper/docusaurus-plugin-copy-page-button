import type {ComponentType, CSSProperties} from 'react';

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

export type CopyPageButtonProps = {
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
   * - `true` — derive a `/path.md` URL from the current page.
   * - `false` — always use the HTML page URL.
   * - function — custom mapping, e.g. to match an existing llms.txt layout.
   * - omitted — follows `generateMarkdownRoutes`.
   */
  markdownUrl?: boolean | ((pageUrl: string) => string);
  mcpServer?: McpServerOption | null;
  labels?: CopyPageButtonLabels;
};

declare const CopyPageButton: ComponentType<CopyPageButtonProps>;
export {CopyPageButton};
export default CopyPageButton;
