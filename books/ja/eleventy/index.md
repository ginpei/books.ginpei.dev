---
layout: base.njk
title: Eleventy
date: 2021-05-23
---

静的サイトジェネレーター。

- [Eleventy, a simpler static site generator](https://www.11ty.dev/)
- [@11ty/eleventy - npm](https://www.npmjs.com/package/@11ty/eleventy)

## 初期設定

### インストール

```
$ npm install -D @11ty/eleventy
```

### ビルド

何か markdown ファイルを用意しておく。場所は差し当たりどこでも良い。パスとファイル名から URL が用意される。

ビルド。

```
$ npx @11ty/eleventy
```

`_site/` 以下に出力される。

### サーバー

`--serve` を与えるとウェブサーバーが起動する。ファイル変更を監視し自動で再出力、ブラウザーで開いていれば再読み込みまでしてくれる。便利。

ポートは `8080` 。あるいは `--port 3000` のように指定。

### スクリプト

`package.json`:

```json
{
  "scripts": {
    "build": "eleventy",
    "start": "eleventy --serve"
…
```

## テンプレートとレイアウト

`_includes/` 以下に `*.njk` を設置。`layout:` で指定。

なお `njk` は Nunjucks （ヌンチャク）。

- [Nunjucks](https://mozilla.github.io/nunjucks/)

### 実装

`_includes/basicLayout.njk`:

{% raw %}

```html
---
title: (Not titled)
---

<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{ title }}</title>
</head>
<body>
  <main>
    {{ content | safe }}
  </main>
</body>
</html>
```

{% endraw %}

### 利用

```md
---
layout: basicLayout.njk
title: Hello World!
---

# Hello World!
```

### 変数とエスケープ

- [Layouts — Eleventy](https://www.11ty.dev/docs/layouts/)
- https://mozilla.github.io/nunjucks/templating.html#raw

{% raw %}
`{{xxx}}` で Nunjucks の変数の埋め込みになる。`{{title}}` とか。

文章やコード例として画面に `{{` を表示したい場合は `{% raw %}`  と <code>{<!-- -->% endraw %}</code> で括る。
{% endraw %}

## カスタマイズ

`.eleventy.js` を設置してカスタマイズできる。

例：

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      linkify: true,
    })
  );

  eleventyConfig.addPlugin(syntaxHighlight);
};
```

### URL を自動リンク

markdown-it の `linkify` 機能を有効化する。

- https://github.com/markdown-it/markdown-it#init-with-presets-and-options

文章中に出現する `https://example.com` のような文字列を URL としてリンクさせる。スキームなしの `example.com` には反応しない。

```js
const markdownIt = require("markdown-it");

// …

eleventyConfig.setLibrary(
  "md",
  markdownIt({
    html: true,
    linkify: true,
  })
);
```

### ソースコードのシンタックスハイライト

公式プラグインを利用。中身は [Prism.js](https://prismjs.com/) らしい。

```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// …

eleventyConfig.addPlugin(syntaxHighlight);
```

加えてハイライト用の CSS をレイアウトで読み込む。

```html
<link rel="stylesheet" href="https://unpkg.com/prismjs@1.28.0/themes/prism-okaidia.css">
```

テーマ一覧。

- https://unpkg.com/browse/prismjs@latest/themes/

### 更新日を表示

- [Content Dates — Eleventy](https://www.11ty.dev/docs/dates/)

更新日を自動で得る方法はないので、各記事 `*.md` に `date` を設定してテンプレートで表示する。書式は YAML が対応する `YYYY-MM-DD` 等にする。（例えば月を 1 桁で書くと駄目。）

```md
---
title: なんかすごいおもしろい記事
date: 2021-05-21
---
```

{% raw %}
```html
{% if date %}
  <time>{{ date }}</time>
{% endif %}
```
{% endraw %}

書式を守ると JavaScript の `Date` オブジェクトになる。`.eleventy.js` に整形フィルターを追加する。

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("toDate", (v) => articleDateToString(v));
…
```

```js
/**
 * @param {unknown} date
 */
function articleDateToString(date) {
  if (!(date instanceof Date)) {
    throw new Error(
      "[articleDateToString] Date object expected but received " +
        `${typeof date}: ${JSON.stringify(date)}`
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
```

{% raw %}
```html
{% if date %}
<time class="baseLayout-time">
  {{ date | toDate }}
</time>
{% endif %}
```
{% endraw %}
