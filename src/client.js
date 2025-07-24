import React from 'react';
import { createRoot } from 'react-dom/client';
import CopyPageButton from './CopyPageButton';

// Auto-inject the copy page button aligned to the sidebar
if (typeof window !== 'undefined') {
  let root = null;

  const injectCopyPageButton = () => {
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

    // Check if already injected AND properly attached to this sidebar
    let container = document.getElementById('copy-page-button-container');
    if (container && sidebar.contains(container)) return;

    // Clean up any orphaned container
    if (container) {
      cleanup();
    }

    // Create new container
    container = document.createElement('div');
    container.id = 'copy-page-button-container';
    
    // Insert the container as the first child of the sidebar
    sidebar.insertBefore(container, sidebar.firstChild);

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
  };

  // Initial injection - immediate since we target body
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCopyPageButton);
  } else {
    injectCopyPageButton();
  }

  // Only re-inject when sidebar state actually changes
  window.addEventListener('resize', () => {
    setTimeout(() => {
      const container = document.getElementById('copy-page-button-container');
      const sidebar = document.querySelector('.theme-doc-toc-desktop') || 
                     document.querySelector('.table-of-contents') ||
                     document.querySelector('[class*="tableOfContents"]') ||
                     document.querySelector('[class*="toc"]');
      
      // Check if sidebar is visible
      const sidebarVisible = sidebar && 
                            sidebar.offsetWidth > 0 && 
                            sidebar.offsetHeight > 0 && 
                            window.getComputedStyle(sidebar).display !== 'none';
      
      // Check if button is properly attached to the visible sidebar
      const buttonProperlyAttached = container && 
                                    sidebar && 
                                    sidebar.contains(container);
      
      console.log('Resize check:', { sidebarVisible, buttonProperlyAttached, hasSidebar: !!sidebar, hasContainer: !!container });
      
      // Only act if there's a mismatch
      if (sidebarVisible && !buttonProperlyAttached) {
        // Sidebar is visible but button is missing or orphaned - inject it
        console.log('Injecting button - sidebar visible but button not properly attached');
        cleanup(); // Clean up any orphaned container first
        injectCopyPageButton();
      } else if (!sidebarVisible && buttonProperlyAttached) {
        // Sidebar is hidden but button still exists - clean up
        console.log('Cleaning up button - sidebar hidden but button still attached');
        cleanup();
      }
    }, 300);
  });

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