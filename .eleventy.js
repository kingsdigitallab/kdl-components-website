const kdlFilters = require("kdl-components/src/kdl/filters");
const pluginSEO = require("eleventy-plugin-seo");
const Nunjucks = require("nunjucks");
const path = require("node:path");
const sass = require("sass");

require("dotenv").config();

module.exports = (eleventyConfig) => {
  const kdlComponentsPath = "./node_modules/kdl-components/src";
  const nunjucksEnvironment = new Nunjucks.Environment([
    new Nunjucks.FileSystemLoader(kdlComponentsPath),
    new Nunjucks.FileSystemLoader("./src/_includes"),
  ]);
  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  eleventyConfig.addWatchTarget(kdlComponentsPath);

  eleventyConfig.setTemplateFormats(["html", "njk", "md"]);
  eleventyConfig.addPassthroughCopy({
    [`${kdlComponentsPath}/kdl/assets`]: "/assets",
    public: "/",
  });

  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/config.js"));

  eleventyConfig.addFilter("toLocaleDate", kdlFilters.toLocaleDate);
  eleventyConfig.addFilter("filter", kdlFilters.filter);

  // https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    style: "compressed",
    compile: async function (inputContent, inputPath) {
      const parsed = path.parse(inputPath);
      const result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      return (_) => {
        return result.css;
      };
    },
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    pathPrefix: "kdl-components-website",
  };
};
