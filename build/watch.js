/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const chokidar = require("chokidar");
const { buildDocs } = require("./docs");

async function watchDocs() {
  chokidar
    .watch(path.resolve(__dirname, "../src/docs"), {
      ignoreInitial: true,
    })
    .on("all", async () => {
      console.info("Compiling docs...");
      await buildDocs();
    });
}

module.exports = { watchDocs, default: watchDocs() };
