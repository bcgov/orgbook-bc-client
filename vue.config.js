module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "OrgBook BC";
      return args;
    });
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
          target: "https://orgbook.gov.bc.ca",
          // target: "http://localhost:8080",
        },
      },
    },
  },
  pwa: {
    name: "OrgBook BC",
    themeColor: "#003366",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "003366",
  },
};
