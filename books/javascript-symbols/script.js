// @ts-check

/**
 * @typedef {{
 *   elInput: HTMLInputElement;
 *   elList: HTMLElement;
 *   articles: Article[];
 * }} PageProps
 * @typedef {{
 *   el: HTMLHeadingElement;
 *   symbols: string;
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
    articles: Array.from(document.querySelectorAll("h2, h3")).map((v) =>
      // @ts-ignore: Argument of type 'Element' is not assignable to parameter of type 'HTMLHeadingElement'.
      createArticle(v)
    ),
  };
}

/**
 * @param {HTMLHeadingElement} el
 * @returns {Article}
 */
function createArticle(el) {
  return {
    el: el,
    symbols: Array.from(el.querySelectorAll("code"))
      .map((v) => v.textContent)
      .join("")
      // @ts-ignore: Property 'replaceAll' does not exist on type 'string'
      .replaceAll("value", "")
      .replaceAll("xxx", "")
      .replaceAll("yyy", ""),
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
  renderList(props, state);
}

/**
 * @param {PageProps} props
 * @param {PageState} state
 */
function renderList(props, state) {
  const matchedHeadings = state.input
    ? props.articles.filter((v) => isHeadingMatched(v.symbols, state.input))
    : [];

  const elListItems = matchedHeadings.map((v) => createListItem(v.el));

  props.elList.innerHTML = "";
  for (const elItem of elListItems) {
    props.elList.append(elItem);
  }
}

/**
 * @param {string} symbols
 * @param {string} input
 */
function isHeadingMatched(symbols, input) {
  if (input.match(/^\s+$/)) {
    return symbols === " ";
  }

  const inputSymbols = input.split(" ").filter((v) => v.length > 0);

  return inputSymbols.some((v) => symbols.includes(v));
}

/**
 * @param {HTMLHeadingElement} elHeading
 */
function createListItem(elHeading) {
  const elLink = document.createElement("a");
  elLink.classList.add("searchResult-itemLink");
  elLink.href = `#${elHeading.id}`;
  elLink.innerHTML = elHeading.innerHTML;

  const elListItem = document.createElement("li");
  elListItem.classList.add("searchResult-item");
  elListItem.append(elLink);

  return elListItem;
}
