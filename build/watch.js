/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const chokidar = require("chokidar");
const { buildDocs } = require("./docs");

async function chooseDir(dir){
  chokidar
    .watch(path.resolve(__dirname, dir), {
      ignoreInitial: true,
    })
    .on("all", async () => {
      console.info("Compiling docs...");
      await buildDocs();
    });
}

async function watchDocs() {
  chooseDir("../src/docs");
  chooseDir("../src/entityDescriptions");
}

module.exports = { watchDocs, default: watchDocs() };
