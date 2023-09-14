/* DEFINE PATH/PLUGIN
================================================ */
const path = require("path");
const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";
/* eslint-disable-next-line no-unused-vars */
const htmlMinifyOption = false;

/* MODULE EXPORT(BASIC SETTING)
================================================ */
module.exports = () =>
  merge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: "development",
    devtool: "source-map" /* only for dev-mode: */,
    /*------DEV SERVER-------*/
    devServer: {
      open: ["/index.html"],
      port: 8888,
      static: path.resolve(__dirname, "./dist/"),
      liveReload: true,
      /* publicPath: '', */
      /* watchContentBase: true,  ファイルを監視するかどうか */
      /* writeToDisk: true,   バンドルされたファイルを出力するかどうか。お好みで。 */
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    },

    /* ADDED PLUGINS
================================================ */
    plugins: [],
  });
