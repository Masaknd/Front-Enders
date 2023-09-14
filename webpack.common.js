/* DEFINE PATH/PLUGIN
================================================ */
const path = require("path");
/* eslint-disable-next-line no-unused-vars */
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, "./src/js/*.js")],
  {
    ignore: path.resolve(__dirname, "./src/js/**/_*.js"),
  }
)();
const CopyPlugin = require("copy-webpack-plugin");

/* MODULE EXPORT(BASIC SETTING)
================================================ */
module.exports = ({ outputFile, assetFile, htmlMinifyOption }) => ({
  entry: entries,
  /* EXTRACT FILES
  ----------------------------------------------------------------- */
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: `js/${outputFile}.js`,
  },
  /* RESOLVE FILE NAME
  ----------------------------------------------------------------- */
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "@image": path.resolve(__dirname, "./src/image/"),
    },
  },
  stats: {
    children: true,
  },

  /* ADDED MODULES
================================================ */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "> .25%, not dead" }],
              "@babel/preset-react",
            ],
            // plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            // options: {
            //   importLoaders: 1,
            // },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js'),
                plugins: [["autoprefixer", { grid: true }]],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        generator: {
          filename: `images/${assetFile}[ext]`,
        },
        type: "asset/resource",
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        generator: {
          filename: "fonts/[name][ext]",
        },
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },

  /* ADDED PLUGINS
================================================ */
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
      description: "this is index page",
      inject: "body",
      chunks: ["main"],
      minify: htmlMinifyOption,
    }),

    /* その他（font etc）ファイルの移動 */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "dist/fonts"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
});
