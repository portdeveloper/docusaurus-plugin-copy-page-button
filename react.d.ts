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
  name: string;
  url?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  type?: string;
  [key: string]: unknown;
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
  mcpServer?: McpServerConfig | null;
};

declare const CopyPageButton: ComponentType<CopyPageButtonProps>;
export {CopyPageButton};
export default CopyPageButton;
