const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" });

  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  const md = markdownIt({
    html: true,
    linkify: true,
  });
  md.use(markdownItAnchor, {});
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(syntaxHighlight);
};
