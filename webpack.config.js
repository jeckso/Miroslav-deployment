const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    login: "./js/login.js",
    expert: "./js/expert.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/javascripts")
  }
};
