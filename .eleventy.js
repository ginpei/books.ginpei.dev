const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" });

  // https://github.com/markdown-it/markdown-it#init-with-presets-and-options
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
    })
  );

  eleventyConfig.addPlugin(syntaxHighlight);
};
