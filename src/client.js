import React from "react";
import { createRoot } from "react-dom/client";
import CopyPageButton from "./CopyPageButton";

if (typeof window !== "undefined") {
  let root = null;
  let lastUrl = location.href;

  const getPluginOptions = () => {
    return (typeof window !== "undefined" && window.__COPY_PAGE_BUTTON_OPTIONS__) || {};
  };

  const injectCopyPageButton = () => {
    const sidebar =
      document.querySelector(".theme-doc-toc-desktop") ||
      document.querySelector(".table-of-contents") ||
      document.querySelector('[class*="tableOfContents"]') ||
      document.querySelector('[class*="toc"]');

    if (!sidebar) {
      setTimeout(injectCopyPageButton, 100);
      return;
    }

    let container = document.getElementById("copy-page-button-container");
    if (container && sidebar.contains(container)) return;

    if (container) {
      cleanup();
    }

    container = document.createElement("div");
    container.id = "copy-page-button-container";

    // Apply custom positioning styles to the container if provided
    const pluginOptions = getPluginOptions();
    const customStyles = pluginOptions.customStyles || {};
    const buttonStyles = customStyles.button?.style || {};
    
    // Check if button config has positioning styles that should be applied to container
    const positioningProps = ['position', 'top', 'right', 'bottom', 'left', 'zIndex', 'transform'];
    positioningProps.forEach(prop => {
      if (buttonStyles[prop] !== undefined) {
        container.style[prop] = buttonStyles[prop];
      }
    });
    
    // Also apply container-specific styles
    const containerStyles = customStyles.container?.style || {};
    Object.assign(container.style, containerStyles);

    sidebar.insertBefore(container, sidebar.firstChild);

    if (root) {
      try {
        root.unmount();
      } catch (e) {
        // Ignore unmount errors
      }
    }
    root = createRoot(container);
    
    const renderOptions = getPluginOptions();
    root.render(React.createElement(CopyPageButton, { customStyles: renderOptions.customStyles }));
  };

  const cleanup = () => {
    const container = document.getElementById("copy-page-button-container");
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

  const handleRouteChange = () => {
    cleanup();
    if (window.innerWidth <= 996) {
      // Mobile/tablet: delay to wait for sidebar re-rendering
      setTimeout(injectCopyPageButton, 100);
    } else {
      injectCopyPageButton();
    }
  };

  // Initial injection
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectCopyPageButton);
  } else {
    injectCopyPageButton();
  }

  // Handle responsive layout changes
  window.addEventListener("resize", () => {
    setTimeout(() => {
      const container = document.getElementById("copy-page-button-container");
      const sidebar =
        document.querySelector(".theme-doc-toc-desktop") ||
        document.querySelector(".table-of-contents") ||
        document.querySelector('[class*="tableOfContents"]') ||
        document.querySelector('[class*="toc"]');

      const sidebarVisible =
        sidebar &&
        sidebar.offsetWidth > 0 &&
        sidebar.offsetHeight > 0 &&
        window.getComputedStyle(sidebar).display !== "none";

      const buttonProperlyAttached =
        container && sidebar && sidebar.contains(container);

      if (sidebarVisible && !buttonProperlyAttached) {
        cleanup();
        injectCopyPageButton();
      } else if (!sidebarVisible && buttonProperlyAttached) {
        cleanup();
      }
    }, 300);
  });

  // Handle browser navigation
  window.addEventListener("popstate", handleRouteChange);

  // Handle Docusaurus route changes
  if (typeof window !== "undefined" && window.docusaurus) {
    document.addEventListener("docusaurus-route-update", handleRouteChange);
  }

  // Targeted URL change detection for SPA routing
  const checkUrlChange = () => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      handleRouteChange();
    }
  };

  // Check for URL changes every 100ms - much more efficient than MutationObserver
  setInterval(checkUrlChange, 100);

  // Also intercept pushState/replaceState for immediate detection
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    setTimeout(checkUrlChange, 0);
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    setTimeout(checkUrlChange, 0);
  };
}
