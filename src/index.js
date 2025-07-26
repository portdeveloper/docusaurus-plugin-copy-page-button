const path = require("path");

module.exports = function copyPageButtonPlugin(context, options = {}) {
  const { customStyles = {}, ...otherOptions } = options;
  
  // Store options globally for client access
  if (typeof global !== 'undefined') {
    global.__COPY_PAGE_BUTTON_OPTIONS__ = {
      customStyles,
      ...otherOptions
    };
  }
  
  return {
    name: "copy-page-button-plugin",

    getClientModules() {
      return [path.resolve(__dirname, "./client.js")];
    },

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            innerHTML: `
              window.__COPY_PAGE_BUTTON_OPTIONS__ = ${JSON.stringify({
                customStyles,
                ...otherOptions
              })};
            `
          }
        ]
      };
    },
  };
};
