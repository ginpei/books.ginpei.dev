---
layout: base.njk
title: Eleventy
---

# Eleventy

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

## レイアウト

`_includes/` 以下に `*.njk` を設置。`layout:` で指定。

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
