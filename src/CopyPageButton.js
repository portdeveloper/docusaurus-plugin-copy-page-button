import React, { useState, useEffect, useRef } from "react";
import { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";
const {
  extractPageMarkdownFromDocument,
  getMarkdownRouteUrl,
} = require("./htmlToMarkdown");

const DEFAULT_ACTIONS = ['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'gemini'];
const DEFAULT_MCP_ACTIONS = ['mcp-copy', 'mcp-cursor', 'mcp-vscode'];
const POSITIONING_PROPS = ['position', 'top', 'right', 'bottom', 'left', 'zIndex', 'transform'];
const DROPDOWN_WIDTH = 300;
const DROPDOWN_OFFSET = 8;
const VIEWPORT_PADDING = 8;

// Utility function to merge custom styles with default classes
const mergeStyles = (defaultClassName, customStyleConfig = {}) => {
  const { className: customClassName, style: customStyle } = customStyleConfig;
  
  const finalClassName = customClassName 
    ? `${defaultClassName} ${customClassName}`
    : defaultClassName;
    
  return {
    className: finalClassName,
    style: customStyle || {}
  };
};

// Utility function to separate positioning styles from other styles
const separatePositioningStyles = (styleObject = {}) => {
  const positioning = {};
  const nonPositioning = {};
  
  Object.entries(styleObject).forEach(([key, value]) => {
    if (POSITIONING_PROPS.includes(key)) {
      positioning[key] = value;
    } else {
      nonPositioning[key] = value;
    }
  });
  
  return { positioning, nonPositioning };
};

const getDropdownPosition = (buttonElement) => {
  const rect = buttonElement.getBoundingClientRect();
  const maxLeft = window.innerWidth - DROPDOWN_WIDTH - VIEWPORT_PADDING;

  return {
    top: rect.bottom + DROPDOWN_OFFSET,
    left: Math.max(
      VIEWPORT_PADDING,
      Math.min(rect.right - DROPDOWN_WIDTH, maxLeft)
    ),
  };
};

export default function CopyPageButton({
  customStyles = {},
  enabledActions,
  generateMarkdownRoutes = false,
  markdownUrl,
  mcpServer = null,
  labels = {}
}) {
  const t = (group, field, defaultMessage) => {
    const override = labels?.[group]?.[field];
    if (typeof override === "string") {
      return override;
    }
    return translate({
      id: `copyPageButton.${group}.${field}`,
      message: defaultMessage,
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [pageContent, setPageContent] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Extract custom style configurations
  const containerStyleConfig = customStyles.container || {};
  const buttonStyleConfig = customStyles.button || {};
  const dropdownStyleConfig = customStyles.dropdown || {};
  const dropdownItemStyleConfig = customStyles.dropdownItem || {};

  const updateDropdownPosition = () => {
    if (typeof window === 'undefined' || !buttonRef.current) {
      return false;
    }

    setDropdownPosition(getDropdownPosition(buttonRef.current));
    return true;
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setDropdownPosition(null);
  };

  const handleButtonClick = () => {
    if (isOpen) {
      closeDropdown();
      return;
    }

    updateDropdownPosition();
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return undefined;
    }

    updateDropdownPosition();

    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition, true);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const content = extractPageContent();
    if (content) {
      setPageContent(content);
    }
  }, []);

  const extractPageContent = () => {
    return extractPageMarkdownFromDocument(document, window.location.href);
  };

  const writeTextToClipboard = async (text) => {
    if (!text || text.trim() === '') {
      return;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch (err) {
      // Silently fail
    }
  };

  const copyToClipboard = async (text) => {
    // If no content, try to extract it now
    if (!text || text.trim() === '') {
      const extractedContent = extractPageContent();
      if (extractedContent) {
        setPageContent(extractedContent);
        text = extractedContent;
      } else {
        return;
      }
    }

    await writeTextToClipboard(text);
  };

  // Resolve which URL the AI prompt should reference. Sites that already serve
  // per-page markdown (e.g. an llms.txt setup) can point the AI links at those
  // URLs WITHOUT asking the plugin to generate routes — set `markdownUrl`.
  //   markdownUrl: true       -> built-in `/path` -> `/path.md` transform
  //   markdownUrl: false      -> always use the HTML page URL
  //   markdownUrl: (url)=>str -> custom mapping (direct-component usage only;
  //                              functions can't cross the auto-injection boundary)
  //   markdownUrl: undefined  -> legacy: follow `generateMarkdownRoutes`
  const resolveContextUrl = (pageUrl) => {
    if (typeof markdownUrl === "function") {
      try {
        return markdownUrl(pageUrl) || pageUrl;
      } catch (err) {
        return pageUrl;
      }
    }
    if (markdownUrl === true) {
      return getMarkdownRouteUrl(pageUrl);
    }
    if (markdownUrl === false) {
      return pageUrl;
    }
    return generateMarkdownRoutes ? getMarkdownRouteUrl(pageUrl) : pageUrl;
  };

  // Notify host-site analytics whenever a dropdown action runs, so maintainers
  // can measure how the button is used. Pairs with the `data-copy-page-action`
  // attributes for sites that prefer delegated DOM listeners.
  const emitInteraction = (actionId) => {
    if (typeof document === "undefined") {
      return;
    }
    try {
      document.dispatchEvent(
        new CustomEvent("copy-page-button:action", {
          detail: {
            action: actionId,
            url: typeof window !== "undefined" ? window.location.href : "",
          },
        })
      );
    } catch (err) {
      // Silently fail — analytics must never break the page.
    }
  };

  const openInAI = (baseUrl, queryParam = 'q', extraParams = {}) => {
    try {
      const currentUrl = resolveContextUrl(window.location.href);
      const prompt = `Please read and explain this documentation page: ${currentUrl}

Please provide a clear summary and help me understand the key concepts covered in this documentation.`;
      const params = new URLSearchParams({ [queryParam]: prompt, ...extraParams });
      window.open(`${baseUrl}?${params.toString()}`, "_blank");
    } catch (err) {
      // Silently fail
    }
  };

  const viewAsMarkdown = () => {
    let contentToView = pageContent;

    // If no content, try to extract it now
    if (!contentToView || contentToView.trim() === '') {
      const extractedContent = extractPageContent();
      if (extractedContent) {
        setPageContent(extractedContent);
        contentToView = extractedContent;
      } else {
        return;
      }
    }

    try {
      const blob = new Blob([contentToView], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      // Silently fail
    }
  };

  const normalizeMcpServer = () => {
    if (!mcpServer) {
      return null;
    }

    if (typeof mcpServer === "string") {
      return {
        name: "docs",
        config: { url: mcpServer },
      };
    }

    const { name = "docs", config, ...serverConfig } = mcpServer;
    return {
      name,
      config: config || serverConfig,
    };
  };

  const mcpConfig = normalizeMcpServer();
  const effectiveEnabledActions = enabledActions || (
    mcpConfig ? [...DEFAULT_ACTIONS, ...DEFAULT_MCP_ACTIONS] : DEFAULT_ACTIONS
  );

  const encodeBase64 = (value) => {
    const text = typeof value === "string" ? value : JSON.stringify(value);
    if (typeof TextEncoder !== "undefined") {
      const bytes = new TextEncoder().encode(text);
      let binary = "";
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      return window.btoa(binary);
    }
    return window.btoa(text);
  };

  const buildCursorMcpUrl = () => {
    if (!mcpConfig) {
      return null;
    }
    return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(
      mcpConfig.name
    )}&config=${encodeURIComponent(encodeBase64(mcpConfig.config))}`;
  };

  const buildVscodeMcpUrl = () => {
    if (!mcpConfig) {
      return null;
    }
    return `vscode:mcp/install?${encodeURIComponent(
      JSON.stringify({ name: mcpConfig.name, ...mcpConfig.config })
    )}`;
  };

  const copyMcpConfig = async () => {
    if (!mcpConfig) {
      return;
    }
    await writeTextToClipboard(
      JSON.stringify({ [mcpConfig.name]: mcpConfig.config }, null, 2)
    );
  };

  const openMcpUrl = (url) => {
    if (url) {
      window.open(url, "_self");
    }
  };

  const allDropdownItems = [
    {
      id: "copy",
      title: t("copy", "title", "Copy page"),
      description: t("copy", "description", "Copy the page as Markdown for LLMs"),
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      ),
      action: () => copyToClipboard(pageContent),
    },
    {
      id: "view",
      title: t("view", "title", "View as Markdown"),
      description: t("view", "description", "View this page as plain text"),
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
      ),
      action: viewAsMarkdown,
    },
    {
      id: "chatgpt",
      title: t("chatgpt", "title", "Open in ChatGPT"),
      description: t("chatgpt", "description", "Ask questions about this page"),
      icon: (
        <svg
          width="16"
          height="16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="1.5"
          viewBox="-0.17090198558635983 0.482230148717937 41.14235318283891 40.0339509076386"
        >
          <path
            d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835A9.964 9.964 0 0 0 18.306.5a10.079 10.079 0 0 0-9.614 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.516 3.35 10.078 10.078 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.01L7.04 23.856a7.504 7.504 0 0 1-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .113-.01l8.052 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
            fill="currentColor"
          />
        </svg>
      ),
      action: () => openInAI("https://chatgpt.com/"),
    },
    {
      id: "claude",
      title: t("claude", "title", "Open in Claude"),
      description: t("claude", "description", "Ask questions about this page"),
      icon: (
        <svg
          width="16"
          height="16"
          fill="currentColor"
          fillRule="evenodd"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" />
        </svg>
      ),
      action: () => openInAI("https://claude.ai/new"),
    },
    {
      id: "perplexity",
      title: t("perplexity", "title", "Open in Perplexity"),
      description: t("perplexity", "description", "Ask questions about this page"),
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.49h1.09v6.02L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.196h1.8V13.89l6.143-5.576zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z" />
        </svg>
      ),
      action: () => openInAI("https://www.perplexity.ai/search", "q"),
    },
    {
      id: "gemini",
      title: t("gemini", "title", "Open in Gemini"),
      description: t("gemini", "description", "Ask questions about this page"),
      icon: (
        <svg
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
            fill="currentColor"
          />
        </svg>
      ),
      action: () => openInAI("https://www.google.com/search", "q", { udm: "50" }),
    },
    ...(mcpConfig ? [
      {
        id: "mcp-copy",
        title: t("mcpCopy", "title", "Copy MCP config"),
        description: t("mcpCopy", "description", "Copy MCP server JSON"),
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        ),
        action: copyMcpConfig,
      },
      {
        id: "mcp-cursor",
        title: t("mcpCursor", "title", "Install in Cursor"),
        description: t("mcpCursor", "description", "Open Cursor MCP installer"),
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2 2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        ),
        action: () => openMcpUrl(buildCursorMcpUrl()),
      },
      {
        id: "mcp-vscode",
        title: t("mcpVscode", "title", "Install in VS Code"),
        description: t("mcpVscode", "description", "Open VS Code MCP installer"),
        icon: (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.88V4.12a1.5 1.5 0 0 0-.85-1.533zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
          </svg>
        ),
        action: () => openMcpUrl(buildVscodeMcpUrl()),
      },
    ] : []),
  ];

  // Filter dropdown items based on enabled actions
  const dropdownItems = allDropdownItems.filter(item =>
    effectiveEnabledActions.includes(item.id)
  );

  // Handle positioning styles - if button config has positioning, move it to container
  const { positioning: buttonPositioning, nonPositioning: buttonNonPositioning } = 
    separatePositioningStyles(buttonStyleConfig.style);
  
  // Create final style configs
  const finalContainerConfig = {
    ...containerStyleConfig,
    style: {
      ...containerStyleConfig.style,
      ...buttonPositioning, // Apply button positioning to container
    }
  };
  
  const finalButtonConfig = {
    ...buttonStyleConfig,
    style: buttonNonPositioning, // Apply only non-positioning styles to button
  };

  // Merge custom styles with default styles
  const containerProps = mergeStyles(styles.copyPageContainer, finalContainerConfig);
  const buttonProps = mergeStyles(styles.copyPageButton, finalButtonConfig);
  const dropdownProps = mergeStyles(styles.copyPageDropdown, dropdownStyleConfig);
  const dropdownItemProps = mergeStyles(styles.dropdownItem, dropdownItemStyleConfig);

  return (
    <>
      <div
        className={containerProps.className}
        style={containerProps.style}
        data-copy-page-button-container=""
      >
        <button
          className={buttonProps.className}
          style={buttonProps.style}
          onClick={handleButtonClick}
          aria-expanded={isOpen}
          aria-haspopup="true"
          data-copy-page-button-trigger=""
          ref={buttonRef}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span className={styles.copyPageText}>{t("button", "label", "Copy page")}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={
              isOpen ? `${styles.chevron} ${styles.open}` : styles.chevron
            }
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </button>
      </div>

      {isOpen && dropdownPosition && (
        <div
          className={dropdownProps.className}
          style={{
            position: "fixed",
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 10000,
            ...dropdownProps.style
          }}
          ref={dropdownRef}
        >
          {dropdownItems.map((item) => (
            <button
              key={item.id}
              className={dropdownItemProps.className}
              style={dropdownItemProps.style}
              data-copy-page-action={item.id}
              onClick={() => {
                emitInteraction(item.id);
                item.action();
                closeDropdown();
              }}
            >
              {item.icon}
              <div>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemDescription}>
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
