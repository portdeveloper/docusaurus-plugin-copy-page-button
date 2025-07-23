import React from 'react';
import { createRoot } from 'react-dom/client';
import CopyPageButton from './CopyPageButton';

// Auto-inject the copy page button into the navbar
if (typeof window !== 'undefined') {
  const injectCopyPageButton = () => {
    // Find the navbar
    const navbar = document.querySelector('.navbar__items--right');
    if (!navbar) return;

    // Check if already injected
    if (document.getElementById('copy-page-button-container')) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'copy-page-button-container';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.marginLeft = '0.5rem';

    // Insert before the last item (usually Discord link)
    const lastItem = navbar.lastElementChild;
    navbar.insertBefore(container, lastItem);

    // Render the component
    const root = createRoot(container);
    root.render(React.createElement(CopyPageButton));
  };

  // Inject when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCopyPageButton);
  } else {
    injectCopyPageButton();
  }

  // Also inject after navigation (for SPA routing)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(injectCopyPageButton, 100);
    }
  }).observe(document, { subtree: true, childList: true });
} 