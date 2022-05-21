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
- [`git push`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push) ではなく GitHub の [release](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#release) で公開

## 作業手順

1. ビルドスクリプト (`npm run build`)
2. GitHub Actions のセットアップ

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

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-20.04
    permissions:
      contents: write
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: ${{ github.ref == 'refs/heads/main' }}
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: _site/
```
{% endraw %} 

## 他の GitHub Actions

- [GitHub Pages action · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages-action) （今回利用したもの）
- [Deploy to GitHub Pages · Actions · GitHub Marketplace](https://github.com/marketplace/actions/deploy-to-github-pages)
- [GitHub Pages · Actions · GitHub Marketplace](https://github.com/marketplace/actions/github-pages)
