const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

/**
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */
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
  eleventyConfig.addFilter("toDate", (v) => articleDateToString(v));
};

/**
 * @param {unknown} date
 */
function articleDateToString(date) {
  if (!(date instanceof Date)) {
    throw new Error("Date object expected");
  }

  return [
    date.getFullYear(),
    toTwoDigits(date.getMonth() + 1),
    toTwoDigits(date.getDate()),
  ].join("-");
}

/**
 * @param {number} number
 */
function toTwoDigits(number) {
  return number.toString().padStart(2, "0");
}
