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
  },
};
