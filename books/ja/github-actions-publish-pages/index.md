---
layout: base.njk
title: GitHub Actions で GitHub Pages へ公開する
---

# {{title}}

この GitHub Actions を使う。

- [GitHub Pages action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages-action)

## 方針

- ジェネレーターは [Eleventy](../eleventy/)
  - そうでなければ適宜読み替えてください
- `books/` ディレクトリーに Markdown ファイル等のコンテンツが置かれる
- `main` ブランチへの [`git push`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push) で公開

## 作業手順

1. ビルドスクリプト (`npm run build`)
2. GitHub Actions のセットアップ
3. リポジトリーの GitHub Pages 設定
4. 独自ドメインの設定（必要なら）

### ビルドスクリプト (`npm run build`)

`package.json` で npm script `build` を用意する。

```json
{
  "scripts": {
    "build": "eleventy --input=books/ --formats=html,md,css,png",
  },
…
```

これで `npm run build` が使えるようになった。

### GitHub Actions のセットアップ

プロジェクトのディレクトリーに `.github/workflows/github-pages.yml` を以下の内容で作成。

{% raw %}
```yml
name: GitHub Pages

on: push

jobs:
  publish:
    if: ${{ github.ref == 'refs/heads/main' }}
    runs-on: ubuntu-20.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: "npm"

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: _site/
```
{% endraw %} 

### リポジトリーの GitHub Pages 設定

GitHub で該当リポジトリーを開いて Settings > 左メニュー Pages > Source にて、`gh-pages` のブランチを選択する。

"(None)" のままだと、この設定ページに "Your site is ready to be published at ..." というメッセージ（青色）が表示されるものの公開が完了しない。"Your site is published at ..." というメッセージ（緑色）になれば完了。

### 独自ドメインの設定（必要なら）

- [Configuring a custom domain for your GitHub Pages site - GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

いわゆる `CNAME` の設定。

まず利用中のドメイン管理サービスで、該当ドメインに `CNAME` で振り先が `<GitHubアカウント名>.github.io` 、例えば `ginpei` なら `ginpei.github.io` になるよう設定しておく。

次に設定ファイルを用意する。`static/CNAME` （拡張子なし）を作成し、該当ドメイン名を記述する。

```
my-site.example.com
```

このファイル `CNAME` は出力ディレクトリーのルートに置かれる必要がある。Eleventy の設定 `.eleventy.js` で以下のようにして、`static/` 以下のファイルを含めるようにする。

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "/" });
…
```

これでビルド時に `_site/CNAME` が用意される。GitHub Pages はこのファイルを読み DNS 設定を行う。

設定後には TLS 証明書が発効され、それも完了すると `https://` で利用できるようになる。割と時間がかかるっぽい。"Enforce HTTPS" の設定をしておくと良さそう。

## エラーと対策

### なんか動いてない気がする

GitHub で該当リポジトリーを開いて Actions からログが閲覧できる。エラーが起きていないか確認する。

### CSS や画像が読み込まれない

Eleventy を `--serve` オプションで起動するとルート `/index.html` で動作する一方、GitHub Pages ではリポジトリー名がパスに含まれるため `/foo-bar/index.html` のようになる。

WIP

## 他の GitHub Actions

- [GitHub Pages action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages-action) （今回利用したもの）
- [Deploy to GitHub Pages · Actions · GitHub Marketplace](https://github.com/marketplace/actions/deploy-to-github-pages)
- [GitHub Pages · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages)
