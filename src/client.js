import React from 'react';
import { createRoot } from 'react-dom/client';
import CopyPageButton from './CopyPageButton';

// Auto-inject the copy page button aligned to the sidebar
if (typeof window !== 'undefined') {
  let root = null;

  const injectCopyPageButton = () => {
    // Check if already injected
    let container = document.getElementById('copy-page-button-container');
    if (container) return;

    // Find the sidebar (table of contents)
    const sidebar = document.querySelector('.theme-doc-toc-desktop') || 
                   document.querySelector('.table-of-contents') ||
                   document.querySelector('[class*="tableOfContents"]') ||
                   document.querySelector('[class*="toc"]');

    if (!sidebar) {
      // If no sidebar found, retry after a short delay
      setTimeout(injectCopyPageButton, 100);
      return;
    }

    // Create container positioned relative to sidebar
    container = document.createElement('div');
    container.id = 'copy-page-button-container';
    
    // Position it fixed relative to the sidebar's current viewport position
    const sidebarRect = sidebar.getBoundingClientRect();
    
    Object.assign(container.style, {
      position: 'fixed', // Fixed so it doesn't move when scrolling
      top: sidebarRect.top + 'px', // 60px above sidebar (viewport relative)
      left: sidebarRect.left + 'px', // 20px to the left of sidebar
      zIndex: '9999',
      transition: 'all 0.2s ease'
    });
    
    // Insert into body
    document.body.appendChild(container);

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

    // Update position only on resize to maintain sidebar alignment
    const updatePositionOnResize = () => {
      if (container && sidebar) {
        const sidebarRect = sidebar.getBoundingClientRect();
        container.style.top = (sidebarRect.top - 60) + 'px';
        container.style.left = (sidebarRect.left - 20) + 'px';
      }
    };

    // Only listen for resize (not scroll) to keep alignment on window resize
    window.addEventListener('resize', updatePositionOnResize);
    
    // Store cleanup function
    container._cleanup = () => {
      window.removeEventListener('resize', updatePositionOnResize);
    };
  };

  // Clean up function
  const cleanup = () => {
    const container = document.getElementById('copy-page-button-container');
    if (container) {
      if (container._cleanup) {
        container._cleanup();
      }
      if (root) {
        try {
          root.unmount();
        } catch (e) {
          // Ignore unmount errors
        }
      }
      container.remove();
    }
  };

  // Initial injection - immediate since we target body
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCopyPageButton);
  } else {
    injectCopyPageButton();
  }

  // Listen for Docusaurus route changes using multiple methods
  let lastUrl = location.href;
  
  // Method 1: MutationObserver for DOM changes
  const observer = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      cleanup();
      injectCopyPageButton(); // Instant re-injection
    }
  });
  observer.observe(document, { subtree: true, childList: true });

  // Method 2: Listen for popstate events (back/forward navigation)
  window.addEventListener('popstate', () => {
    cleanup();
    injectCopyPageButton();
  });

  // Method 3: Listen for custom Docusaurus events if available
  if (typeof window !== 'undefined' && window.docusaurus) {
    // Docusaurus emits route update events
    document.addEventListener('docusaurus-route-update', () => {
      cleanup();
      injectCopyPageButton();
    });
  }
} 