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

const html = /*html*/`
  <div>
    <label>
      Search by symbols:
      <input
        data-ref="input"
        placeholder="_-,;:!?.'&quot;()[]{}@*/\&amp;#%\`^+<=>|~$"
        type="search"
      />
    </label>
    <ul class="searchResult-list" data-ref="list"></ul>
  </div>
`;

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
  prepareElements();

  const props = getPageProps();
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

function prepareElements() {
  const elStyle = createElStyle();
  document.head.append(elStyle);

  const elForm = document.createElement("div");
  elForm.innerHTML = html;

  const elToc = document.querySelector(".baseLayout-toc");
  if (!elToc) {
    throw new Error('`.baseLayout-toc` required');
  }
  elToc.prepend(elForm);
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
      articles.at(-1)?.children.push(article);
    }
  }

  return {
    elInput: querySelector("[data-ref='input']", HTMLInputElement),
    elList: querySelector("[data-ref='list']"),
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
  const matchedHeadings = filterArticles(props.articles, state.input);
  const sortedHeadings = sortArticles(matchedHeadings, state.input);

  const elListItems = sortedHeadings.map((v) =>
    createListItem(v.el, v.children)
  );

  props.elList.innerHTML = "";
  for (const elItem of elListItems) {
    props.elList.append(elItem);
  }
}

/**
 * @param {Article[]} articles
 * @param {string} input
 * @returns {Article[]}
 */
function filterArticles(articles, input) {
  if (!input) {
    return [];
  }

  /** @type {Article[]} */
  const matchedHeadings = [];
  for (const article of articles) {
    const matched = isHeadingMatched(article.symbols, input);
    const matchedChildren = article.children.filter((v) =>
      isHeadingMatched(v.symbols, input)
    );
    if (matched || matchedChildren.length > 0) {
      matchedHeadings.push({ ...article, children: matchedChildren });
    }
  }
  return matchedHeadings;
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
 * @param {Article[]} articles
 * @param {string} input
 * @returns {Article[]}
 */
function sortArticles(articles, input) {
  // move the symbol group to the top
  const [firstChar] = input;
  const bestGroupIndex = articles.findIndex((v) =>
    v.symbols.includes(firstChar)
  );
  if (bestGroupIndex >= 0) {
    const bestGroup = articles[bestGroupIndex];
    articles.splice(bestGroupIndex, 1);
    articles.unshift(bestGroup);
  }

  return articles;
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

/**
 * @template {HTMLElement} T
 * @param {string} selector
 * @param {{ new(): T; prototype: T }} [Constructor]
 * @param {Element | Document} d
 * @returns {T}
 */
function querySelector(selector, Constructor, d = document) {
  const el = d.querySelector(selector);
  if (!(el instanceof (Constructor ?? HTMLElement))) {
    throw new Error(`Expected an HTMLElement for "${selector}"`);
  }
  // @ts-ignore: el is T
  return el;
}
