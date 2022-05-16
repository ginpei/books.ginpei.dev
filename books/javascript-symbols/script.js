// @ts-check

/**
 * @typedef {{
 *   elInput: HTMLInputElement;
 *   elList: HTMLElement;
 *   articles: Article[];
 * }} PageProps
 * @typedef {{
 *   html: string;
 *   text: string;
 * }} Article
 */

/**
 * @typedef {{
 *   input: string;
 * }} PageState
 */

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {
  const props = getPageProps();

  props.elInput.addEventListener("input", () => {
    const state = getCurrentState(props);
    render(props, state);
  });
}

/**
 * @returns {Readonly<PageProps>}
 */
function getPageProps() {
  return {
    elInput: document.querySelector("[data-ref='input']"),
    elList: document.querySelector("[data-ref='list']"),
    articles: Array.from(document.querySelectorAll("h2, h3")).map((v) => ({
      html: v.innerHTML,
      text: v.textContent,
    })),
  };
}

/**
 * @param {PageProps} props
 * @returns {Readonly<PageState>}
 */
function getCurrentState(props) {
  return {
    input: props.elInput.value,
  };
}

/**
 * @param {PageProps} props
 * @param {PageState} state
 * @returns {void}
 */
function render(props, state) {
  const elListItems = createListItems(props, state);
  props.elList.innerHTML = "";
  for (const elItem of elListItems) {
    props.elList.append(elItem);
  }
}

/**
 * @param {PageProps} props
 * @param {PageState} state
 */
function createListItems(props, state) {
  const matchedHeadings = state.input
    ? props.articles.filter((v) => isHeadingMatched(v.text, state.input))
    : [];

  const elListItems = matchedHeadings.map((v) => createListItem(v.html));
  return elListItems;
}

/**
 * @param {string} headingText
 * @param {string} input
 */
function isHeadingMatched(headingText, input) {
  return headingText.includes(input);
}

/**
 * @param {string} html
 */
function createListItem(html) {
  const elLink = document.createElement("a");
  elLink.innerHTML = html;
  // elLink.href = "#";

  const el = document.createElement("li");
  el.append(elLink);

  return el;
}
