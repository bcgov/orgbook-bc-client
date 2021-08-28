/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "i18n",
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/style.scss";
        `,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    devServer: {
      proxy: {
        "/api": {
          target: "http://dev.orgbook.gov.bc.ca",
        },
      },
    },
    //   module: {
    //     rules: [
    //       {
    //         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    //         use: [
    //           {
    //             loader: "url-loader",
    //             options: {
    //               name: "[name].[ext]",
    //               outputPath: "fonts/",
    //             },
    //           },
    //         ],
    //         include: [
    //           path.resolve(
    //             __dirname,
    //             "./node_modules/@bcgov/bc-sans/fonts/BCSans-Regular.woff"
    //           ),
    //           path.resolve(
    //             __dirname,
    //             "./node_modules/@bcgov/bc-sans/fonts/BCSans-Bold.woff"
    //           ),
    //         ],
    //         exclude: [
    //           path.resolve(__dirname, "./src/assets/img/logo.svg"),
    //           path.resolve(__dirname, "./src/assets/img/logo-banner.svg"),
    //         ],
    //       },
    //     ],
    //   },
  },
};
