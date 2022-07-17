// @ts-check

/**
 * @typedef {{
 *   elInput: HTMLInputElement;
 *   elList: HTMLElement;
 *   articles: Article[];
 * }} PageProps
 * @typedef {{
 *   children: Article[];
 *   el: HTMLHeadingElement;
 *   level: 2 | 3;
 *   symbols: string;
 * }} Article
 */

/**
 * @typedef {{
 *   input: string;
 * }} PageState
 */

const css = /*css*/`
  .searchResult-list {
    padding: 0;
    list-style-type: none;
  }
    .searchResult-list:empty {
      display: none;
    }

  .searchResult-item {
    border-color: lightgray lightgray transparent;
    border-style: solid;
    border-width: thin;
  }
    .searchResult-item:last-child {
      border-bottom-color: lightgray;
    }

  .searchResult-itemLink {
    display: block;
    padding: 0.5em;
  }
    .searchResult-itemLink:hover {
      background-color: #9ff1;
    }

  .searchResult-childList  .searchResult-item {
    border: none;
  }
  .searchResult-childList {
    list-style: none;
    margin-bottom: 1px;
    margin-right: 1px;
    padding-left: 1rem;
  }
`;

document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded() {
  const props = getPageProps();

  const elStyle = createElStyle();
  document.head.append(elStyle);

  props.elInput.addEventListener("input", () => {
    const state = getCurrentState(props);
    render(props, state);
  });
}

function createElStyle() {
  const el = document.createElement("style");
  el.textContent = css;
  return el;
}

/**
 * @returns {Readonly<PageProps>}
 */
function getPageProps() {
  const articles = [];
  for (const el of document.querySelectorAll("h2, h3")) {
    if (!(el instanceof HTMLHeadingElement)) {
      throw new Error("HTMLHeadingElement expected");
    }

    const article = createArticle(el);
    if (article.level === 2) {
      articles.push(article);
    } else {
      articles.at(-1).children.push(article);
    }
  }

  return {
    elInput: document.querySelector("[data-ref='input']"),
    elList: document.querySelector("[data-ref='list']"),
    articles,
  };
}

/**
 * @param {HTMLHeadingElement} el
 * @returns {Article}
 */
function createArticle(el) {
  return {
    children: [],
    el: el,
    level: el.tagName === "H2" ? 2 : 3,
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
  /** @type {Article[]} */
  const matchedHeadings = [];
  if (state.input) {
    for (const article of props.articles) {
      const matched = isHeadingMatched(article.symbols, state.input);
      const matchedChildren = article.children.filter((v) =>
        isHeadingMatched(v.symbols, state.input)
      );
      if (matched || matchedChildren.length > 0) {
        matchedHeadings.push({ ...article, children: matchedChildren });
      }
    }
  }

  const elListItems = matchedHeadings.map((v) =>
    createListItem(v.el, v.children)
  );

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
 * @param {Article[]} children
 */
function createListItem(elHeading, children) {
  const elLink = document.createElement("a");
  elLink.classList.add("searchResult-itemLink");
  elLink.href = `#${elHeading.id}`;
  elLink.innerHTML = elHeading.innerHTML;

  const elListItem = document.createElement("li");
  elListItem.classList.add("searchResult-item");
  elListItem.append(elLink);

  if (children.length > 0) {
    const elList = document.createElement("ul");
    elList.classList.add("searchResult-childList");
    for (const child of children) {
      elList.append(createListItem(child.el, child.children));
    }
    elListItem.append(elList);
  }

  return elListItem;
}
