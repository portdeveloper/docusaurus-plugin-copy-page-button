import React from 'react';
import { createRoot } from 'react-dom/client';
import CopyPageButton from './CopyPageButton';

// Auto-inject the copy page button above the right sidebar on doc pages
if (typeof window !== 'undefined') {
  let root = null;
  let retryCount = 0;
  const maxRetries = 30; // Try for up to 1.5 seconds (30 * 50ms)

  const injectCopyPageButton = () => {
    // Find the right sidebar (table of contents)
    const sidebar = document.querySelector('.theme-doc-toc-desktop') || 
                   document.querySelector('.table-of-contents') ||
                   document.querySelector('[class*="tableOfContents"]') ||
                   document.querySelector('[class*="toc"]');
    
    if (!sidebar) {
      // If sidebar not found and we haven't exceeded retry limit, try again
      if (retryCount < maxRetries) {
        retryCount++;
        // Use shorter intervals for faster response
        const delay = retryCount < 10 ? 20 : 50; // First 10 attempts very fast, then slower
        setTimeout(injectCopyPageButton, delay);
      }
      return;
    }

    // Reset retry count on successful sidebar detection
    retryCount = 0;

    // Check if already injected
    const existingContainer = document.getElementById('copy-page-button-container');
    if (existingContainer) return;

    // Create container
    const container = document.createElement('div');
    container.id = 'copy-page-button-container';
    container.style.marginBottom = '1rem';
    container.style.paddingBottom = '1rem';
    container.style.borderBottom = '1px solid var(--ifm-color-emphasis-200)';

    // Insert before the sidebar
    sidebar.parentNode.insertBefore(container, sidebar);

    // Clean up previous root if it exists
    if (root) {
      try {
        root.unmount();
      } catch (e) {
        // Ignore unmount errors
      }
    }

    // Render the component
    root = createRoot(container);
    root.render(React.createElement(CopyPageButton));
  };

  // Clean up function
  const cleanup = () => {
    const container = document.getElementById('copy-page-button-container');
    if (container) {
      if (root) {
        try {
          root.unmount();
        } catch (e) {
          // Ignore unmount errors
        }
      }
      container.remove();
    }
    retryCount = 0;
  };

  // Inject with retry logic
  const tryInject = () => {
    retryCount = 0;
    injectCopyPageButton();
  };

  // Initial injection - try immediately and on DOM ready
  const attemptImmediateInjection = () => {
    // Try immediate injection first
    tryInject();
    
    // If not successful and DOM not ready, wait for DOM ready
    if (!document.getElementById('copy-page-button-container') && document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryInject);
    }
  };

  attemptImmediateInjection();

  // Listen for Docusaurus route changes using multiple methods
  let lastUrl = location.href;
  
  // Method 1: MutationObserver for DOM changes
  const observer = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      cleanup();
      // Minimal delay to ensure new page content starts rendering
      setTimeout(tryInject, 25);
    }
  });
  observer.observe(document, { subtree: true, childList: true });

  // Method 2: Listen for popstate events (back/forward navigation)
  window.addEventListener('popstate', () => {
    cleanup();
    setTimeout(tryInject, 25);
  });

  // Method 3: Listen for custom Docusaurus events if available
  if (typeof window !== 'undefined' && window.docusaurus) {
    // Docusaurus emits route update events
    document.addEventListener('docusaurus-route-update', () => {
      cleanup();
      setTimeout(tryInject, 25);
    });
  }

  // Method 4: Periodic check as fallback (only if button is missing)
  setInterval(() => {
    if (!document.getElementById('copy-page-button-container')) {
      // Only try to inject if we're on a documentation page
      const isDocPage = document.querySelector('article') || 
                       document.querySelector('.markdown') ||
                       document.querySelector('[class*="docPage"]');
      if (isDocPage) {
        tryInject();
      }
    }
  }, 1000); // Check every second instead of every 2 seconds
} 