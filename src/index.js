const path = require("path");

module.exports = function copyPageButtonPlugin() {
  return {
    name: "copy-page-button-plugin",

    getClientModules() {
      return [path.resolve(__dirname, "./client.js")];
    },
  };
};
