/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const { glob } = require("glob");
const fm = require("front-matter");
const mk = require("marked");

async function mdToJson(mdDir, jsonFile) {
  glob(path.resolve(__dirname, mdDir), async (err, files) => {
    if (err) {
      throw err;
    }

    const docs = await Promise.all(
      files.map(async (file) => {
        const doc = await readFile(file, "utf-8");
        const content = fm(doc);
        return {
          ...content,
          html: mk(content.body, { breaks: true }),
          path: path.relative(path.resolve(__dirname, mdDir), file),
        };
      })
    );

    await writeFile(
      path.resolve(__dirname, jsonFile),
      JSON.stringify(docs)
    );
  });
}

async function buildDocs() {
  mdToJson("../src/docs/**/*.md", "../src/assets/docs.json");
  mdToJson("../src/entityDescriptions/**/*.md", "../src/assets/entities.json");
}

module.exports = { buildDocs, default: buildDocs() };
