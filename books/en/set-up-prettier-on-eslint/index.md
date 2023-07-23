---
layout: base.njk
title: Set up Prettier on ESLint
date: 2023-07-22
---

## Install

```
$ npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

```json
{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Run

```
$ npx eslint --fix .
```
