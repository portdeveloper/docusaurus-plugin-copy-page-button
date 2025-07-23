import React from 'react';
import { createRoot } from 'react-dom/client';
import CopyPageButton from './CopyPageButton';

// Auto-inject the copy page button above the right sidebar on doc pages
if (typeof window !== 'undefined') {
  const injectCopyPageButton = () => {
    // Find the right sidebar (table of contents)
    const sidebar = document.querySelector('.theme-doc-toc-desktop') || document.querySelector('.table-of-contents');
    if (!sidebar) return;

    // Check if already injected
    if (document.getElementById('copy-page-button-container')) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'copy-page-button-container';
    container.style.marginBottom = '1rem';
    container.style.paddingBottom = '1rem';
    container.style.borderBottom = '1px solid var(--ifm-color-emphasis-200)';

    // Insert before the sidebar
    sidebar.parentNode.insertBefore(container, sidebar);

    // Render the component
    const root = createRoot(container);
    root.render(React.createElement(CopyPageButton));
  };

  // Inject immediately and on DOM ready
  const tryInject = () => {
    injectCopyPageButton();
    // Retry once more after a short delay if not found
    if (!document.getElementById('copy-page-button-container')) {
      setTimeout(injectCopyPageButton, 50);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInject);
  } else {
    tryInject();
  }

  // Also inject after navigation (for SPA routing)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      tryInject();
    }
  }).observe(document, { subtree: true, childList: true });
} 