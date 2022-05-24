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
  eleventyConfig.addFilter("toHomePath", (v) => toHomePath(v));
};

/**
 * @param {unknown} date
 */
function articleDateToString(date) {
  if (!(date instanceof Date)) {
    throw new Error(
      `[articleDateToString] Date object expected but received ${typeof date}: ${JSON.stringify(
        date
      )}`
    );
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

/**
 * @param {string} path
 * @example
 * // {{ page.inputPath | toHomePath }}
 */
function toHomePath(path) {
  if (typeof path !== "string") {
    throw new Error(
      "[getPathLang] String expected but received " +
        `${typeof path}: ${JSON.stringify(path)}`
    );
  }

  const [cur, books, lang] = path.split("/");
  if (cur !== "." || books !== "books" || lang.length !== 2) {
    return "/";
  }

  return `/${lang}/`;
}
