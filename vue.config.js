module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "OrgBook BC";
        return args;
      })
  },
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
          target: "https://dev.orgbook.gov.bc.ca",
        },
      },
    },
  },
};
