/* DEFINE PATH/PLUGIN
================================================ */
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConf = require("./webpack.common");
const outputFile = "[name].[chunkhash].";
const assetFile = "[contenthash]";
const htmlMinifyOption = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
};

/* MODULE EXPORT(BASIC SETTING)
================================================ */
module.exports = () =>
  merge(commonConf({ outputFile, assetFile, htmlMinifyOption }), {
    mode: "production",

/* MINIFICATION & OPTIMIZATION
================================================ */
    optimization: {
      minimizer: [
        new TerserWebpackPlugin(),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
        // new ImageMinimizerPlugin({
        //   generator: [
        //     {
        //       preset: "webp",
        //       implementation: ImageMinimizerPlugin.squooshGenerate,
        //       options: {
        //         encodeOptions: {
        //           /* 各種libSquooshのオプション設定 */
        //           webp: {
        //             quality: 70,
        //           },
        //         },
        //       },
        //     },
        //   ],
        // }),
        // new ImageMinimizerPlugin({
        //   minimizer: {
        //     implementation: ImageMinimizerPlugin.squooshMinify,
        //     filename: "images/[name][contenthash][ext]",
        //     options: {
        //       encodeOptions: {
        //         /* 各種libSquooshのオプション設定 */
        //         mozjpeg: {
        //           quality: 70,
        //         },
        //       },
        //     },
        //   },
        // }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.svgoMinify,
            filename: "images/[name][contenthash][ext]",
            options: {
              encodeOptions: {
                /* Pass over SVGs multiple times to ensure all optimizations are applied. False by default */
                multipass: true,
                plugins: [
                  /* set of built-in plugins enabled by default */
                  /* see: https://github.com/svg/svgo#default-preset */
                  "preset-default",
                ],
              },
            },
          },
        }),
      ],
    },
  });
