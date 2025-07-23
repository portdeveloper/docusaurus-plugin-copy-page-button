import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function CopyPageButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageContent, setPageContent] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const extractPageContent = () => {
      const mainContent = document.querySelector('main article') || document.querySelector('main .markdown');
      const titleElement = document.querySelector('h1') || document.querySelector('.theme-doc-markdown h1') || document.querySelector('article h1');
      
      if (titleElement) {
        setPageTitle(titleElement.textContent.trim());
      }
      
      if (mainContent) {
        const clone = mainContent.cloneNode(true);
        clone.querySelectorAll('.theme-edit-this-page, .theme-last-updated, .pagination-nav, .theme-doc-breadcrumbs, .theme-doc-footer, button, .copy-code-button').forEach(el => el.remove());
        let content = convertHtmlToMarkdown(clone);
        
        const url = window.location.href;
        content = `# ${pageTitle || 'Documentation Page'}\n\nURL: ${url}\n\n${content}`;
        
        setPageContent(content);
      }
    };

    const timer = setTimeout(extractPageContent, 300);
    return () => clearTimeout(timer);
  }, [currentUrl, pageTitle]);

  useEffect(() => {
    // Track URL changes
    const updateUrl = () => setCurrentUrl(window.location.href);
    updateUrl(); // Set initial URL
    
    // Listen for navigation changes (for SPA routing)
    const observer = new MutationObserver(updateUrl);
    observer.observe(document, { subtree: true, childList: true });
    
    return () => observer.disconnect();
  }, []);

  const convertHtmlToMarkdown = (element) => {
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        const children = Array.from(node.childNodes).map(child => processNode(child)).join('');
        
        switch (tagName) {
          case 'h1':
            return `\n# ${children.trim()}\n\n`;
          case 'h2':
            return `\n## ${children.trim()}\n\n`;
          case 'h3':
            return `\n### ${children.trim()}\n\n`;
          case 'h4':
            return `\n#### ${children.trim()}\n\n`;
          case 'h5':
            return `\n##### ${children.trim()}\n\n`;
          case 'h6':
            return `\n###### ${children.trim()}\n\n`;
          case 'p':
            return children.trim() ? `${children.trim()}\n\n` : '\n';
          case 'strong':
          case 'b':
            return `**${children}**`;
          case 'em':
          case 'i':
            return `*${children}*`;
          case 'code':
            if (node.parentElement && node.parentElement.tagName.toLowerCase() === 'pre') {
              return children;
            }
            return `\`${children}\``;
          case 'pre':
            const codeElement = node.querySelector('code');
            const language = codeElement && codeElement.className ? 
              codeElement.className.replace(/language-|hljs|lang-/g, '').split(' ')[0] : '';
            return `\n\`\`\`${language}\n${children.trim()}\n\`\`\`\n\n`;
          case 'ul':
            return `\n${children}`;
          case 'ol':
            let olChildren = Array.from(node.childNodes)
              .filter(child => child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() === 'li')
              .map((child, index) => `${index + 1}. ${processNode(child).replace(/^- /, '')}`);
            return `\n${olChildren.join('')}`;
          case 'li':
            return `- ${children.trim()}\n`;
          case 'a':
            const href = node.getAttribute('href');
            if (href && !href.startsWith('#') && children.trim()) {
              return `[${children.trim()}](${href})`;
            }
            return children;
          case 'br':
            return '\n';
          case 'div':
          case 'section':
          case 'article':
            return children + '\n';
          case 'blockquote':
            return `\n> ${children.trim()}\n\n`;
          case 'table':
            return `\n${children}\n`;
          case 'thead':
          case 'tbody':
            return children;
          case 'tr':
            return `${children}\n`;
          case 'th':
          case 'td':
            return `| ${children.trim()} `;
          case 'img':
            const src = node.getAttribute('src');
            const alt = node.getAttribute('alt') || '';
            return src ? `![${alt}](${src})` : '';
          default:
            return children;
        }
      }
      
      return '';
    };
    
    return processNode(element)
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
      .replace(/^\n+|\n+$/g, '') // Trim leading/trailing newlines
      .trim();
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy content:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const openInChatGPT = () => {
    const prompt = encodeURIComponent(`Please analyze this documentation page:\n\n${pageContent}`);
    window.open(`https://chat.openai.com/?q=${prompt}`, '_blank');
  };

  const openInClaude = () => {
    const prompt = encodeURIComponent(`Please analyze this documentation page:\n\n${pageContent}`);
    window.open(`https://claude.ai/new?q=${prompt}`, '_blank');
  };

  const viewAsMarkdown = () => {
    const blob = new Blob([pageContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className={styles.copyPageContainer} ref={dropdownRef}>
      <button
        className={styles.copyPageButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
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
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        Copy page
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isOpen ? `${styles.chevron} ${styles.open}` : styles.chevron}
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.copyPageDropdown}>
          <button
            className={styles.dropdownItem}
            onClick={() => {
              copyToClipboard(pageContent);
              setIsOpen(false);
            }}
          >
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <div>
              <div className={styles.itemTitle}>Copy page</div>
              <div className={styles.itemDescription}>Copy the page as Markdown for LLMs</div>
            </div>
          </button>

          <button
            className={styles.dropdownItem}
            onClick={() => {
              viewAsMarkdown();
              setIsOpen(false);
            }}
          >
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <div>
              <div className={styles.itemTitle}>View as Markdown</div>
              <div className={styles.itemDescription}>View this page as plain text</div>
            </div>
          </button>

          <button
            className={styles.dropdownItem}
            onClick={() => {
              openInChatGPT();
              setIsOpen(false);
            }}
          >
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            <div>
              <div className={styles.itemTitle}>Open in ChatGPT</div>
              <div className={styles.itemDescription}>Ask questions about this page</div>
            </div>
          </button>

          <button
            className={styles.dropdownItem}
            onClick={() => {
              openInClaude();
              setIsOpen(false);
            }}
          >
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
              <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <div>
              <div className={styles.itemTitle}>Open in Claude</div>
              <div className={styles.itemDescription}>Ask questions about this page</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
} 