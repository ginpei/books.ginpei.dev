---
layout: base.njk
title: (WIP) JavaScript の記号
date: 0000-00-00
---

<!--
方針
- 書いていないもの、もっと書き足したいものは見出しに "[TODO]"
- もっと書き足したい箇所に "(WIP)"
- 文法が異なるものは見出しを分けたい、が？
- 見出しの次のリンクの順：syntax, section (or chapter), MDN, その他
- syntaxは*斜体*
- 見出しの日本語は MDN 準拠
  - ただし演算子はそう記述
- 根拠が個人の感想であるものは、括弧で括って `<small>` でタグ付け
- 見出しで使うコードの識別子名：
  - `key` - 変数
  - `value` - 値
  - `f` - 関数
  - `function () {}` 関数宣言（式、文）
  - 悩み中：`prop`, `param`
- JS でないものは見出し末尾に出所を括弧で提示
- エラーになるコード例はそれをコメントで提示 `// ⛔ XxxError: ...`
- エラーは Node.js v18 で得られるもの
- とりあえず最後まで節 `###` を立てる
- multipage じゃない方にする（最後に一括置換でいい）
-->

{% raw %}

<style>
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
</style>

<script src="./script.js"></script>
<script src="https://fue.ginpei.dev/fue-button/latest/fue-button.js"></script>

<fue-button book-id="HsCH6wIHbEmT0PtcDgSu" layout="right bottom"></fue-button>

<label>
  Search by symbols:
  <input
    data-ref="input"
    placeholder="_-,;:!?.'&quot;()[]{}@*/\&amp;#%`^+<=>|~$"
    type="search"
  />
</label>
<ul class="searchResult-list" data-ref="list"></ul>

## ` `&nbsp;空白

*white space* 空白、スペース、ホワイトスペース

- [12.2 White Space - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-white-space)
- [12.3 Line Terminators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-line-terminators)
- [字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar)

トークンの区切りとして扱われる。ただのスペースの他タブやいくつかの空白文字を含み、いずれも差はない。多くの場合は改行も同じような扱いで、つまり 1 行に全て書いても良いし全ての区切りで改行しても良い。インデントも任意。

```js
function f(a, b, c) { return a + b * c; }

function
   g
(
   a
,
   b
,
   c
)
{
return           a
 +
  b
   *
    c
     ;
}
```

ただし改行は一部の箇所では異なる挙動をする事がある。（先の例でも `return` と `a` の間で改行すると変わる。）　改行を参照。

## ` `&nbsp;改行

*line break*, *line feed*, *carriage return* 改行、ラインフィード、キャリッジリターン

- [12.2 White Space - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-white-space)
- [12.3 Line Terminators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-line-terminators)
- [12.9 Automatic Semicolon Insertion - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)
- [字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar)

基本的には空白 ` ` と同じで、トークンの区切りとして扱われる。ただし文法上空白を置ける箇所でも一部は許可されていなかったり、セミコロン `;`  の自動挿入関係で異なる解釈をされる場合がある。

改行を置けないのは、例えば文字列リテラル `""`, `''` の途中や行コメント。

解釈が変わるのは、例えば非同期関数の `async` と `function` の間。ここに改行を置くと自動挿入の仕組みによりセミコロンがあると暗黙的に解釈され、`async` は構文ではなく変数等の識別子として解釈される。多くの場合はそんな変数を用意していないだろうから参照エラーになる。（例：ReferenceError: async is not defined）

```js
// 👍
// 複数の空白を置いても問題ない
async           function asyncFunction() {}

// 👎
// 改行を置くとセミコロンが挿入され変数 `async` を参照する
// （参照するだけで何もしないが、もし参照先がないならエラー）
async
      function ordinaryFunction() {}
```

特に `return` 後の改行に注意。`return` 直後にセミコロンが自動挿入され関数は何も返さない（あるいは `undefined` を返す）。可読性のため改行したければ括弧で括ってから改行しよう。

```js
// 👎
function ng(someLongParameter, anotherLongParameter) {
  const yetAnotherLongVariable = 1;
  return
    someLongParameter +
    anotherLongParameter +
    yetAnotherLongVariable;
}

// 👍
function ok(someLongParameter, anotherLongParameter) {
  const yetAnotherLongVariable = 1;
  return (
    someLongParameter +
    anotherLongParameter +
    yetAnotherLongVariable
  );
}
```

## `_` アンダースコア

*underscore*, *underbar*, *lodash* アンダースコア、アンダーバー、ローダッシュ

### `_key` 変数や関数の名前

- [12.6 Names and Keywords - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-names-and-keywords)

変数や関数の名前として利用できる。特に意味はなく他の文字 `abc` やダラー `$` と同じ。名前の先頭でも利用可能。

```js
const MAX_VALUE = 1024;

const obj = {
  _somePrivateFunction() {}
};

const _ = 1;
```

アンダースコアで単語を区切る命名を[スネークケース](https://en.wikipedia.org/wiki/Snake_case)と呼ぶ。JavaScript では大文字で区切る[キャメルケース](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9)が一般的。

アンダースコアで始まる名前を外部からアクセスされたくないプロパティに用いる、という文化がある。これは現在は[プライベートクラスメンバー `this.#key`](#%23prop%2C-%23f()-%7B%7D-プライベートメンバーの宣言) で実現できる。`_key` はあくまで文化やコーディング規約であり言語的な制限はないため、人間が読んで「何かおかしいぞ」と判断する。また JavaScript エンジンが内部的に用意するプロパティは 2 つのアンダースコアを接頭辞とすることがある。（`__proto__` など。）

この記号 `_` を名前空間として利用するライブラリーがある。（JavaScript 本体の機能ではない。）

- [Underscore.js](https://underscorejs.org/)
- [Lodash](https://lodash.com/)

```js
_.flatten([1, [2], [3, [[4]]]]);
_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
```

[JavaScript の仕様書 (ECMAScript 2023) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/)では "underscore" の表記が出現する。

### `1_000` 数値区切り文字

- [12.8.3 Numeric Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-numeric-literals)

`1234` といった数値に混ぜこんで利用できる。

数値としては単に無視されるので、区切る位置は任意。

```js
const a = 1_000_000_000; // 1000000000
const b = 10_0000_0000; // 1000000000
const c = 1_2_3; // 123
```

数字の途中でのみ利用可能。`123_` のように末尾に置くと文法エラーになる。（例：SyntaxError: Numeric separators are not allowed at the end of numeric literals）　`_123` と先頭に置くと変数等の名として認識される。用意されていなければ参照エラーになる。（例：ReferenceError: _123 is not defined）

## `-` ハイフン

*hyphen*, *minus*, *dash* ハイフン、マイナス、ダッシュ（「ダッシュ」は本来もっと長い記号。）

```js
const a = "-5" - - -1; // => -6
//         ^   ^ ^ ^
//         |   | | └- 符号付き整数 `-1` のうち `-`
//         |   | └--- 単項マイナス演算子の `-`
//         |   └----- 引き算演算子の `-`
//         └--------- 文字列 `"-1"` のうち `"-"`
```

### `value - value` 引き算演算子

- [*AdditiveExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AdditiveExpression)
- [13.8.2 The Subtraction Operator ( `-` ) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-subtraction-operator-minus)
- [減算 (-) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Subtraction)
- [Table 13: ToNumber Conversions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#table-tonumber-conversions)

`value - value` など。左辺から右辺を引く。

左辺や右辺が数値でない場合、数値へ変換してから計算される。[変換方法は値の型による - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#table-tonumber-conversions)。

```js
const a = true - 0; // => 1
const b = false - 0; // => 0
const c = null - 0; // => 0
const d = undefined - 0; // => NaN
```

文字列は `Number()` コンストラクターを関数として使う（`new` を付けない）場合と同じ方法で変換される。

```js
const e = "1" - 0; // => 1
const f = "a" - 0; // => NaN
```

オブジェクトは基本的に `NaN` になるが、`valueOf()` や `toString()` が実装されている場合はそれらが利用される。<small>（どこの変換作業で `NaN` になるんだろ？）</small>

```js
const g = {} - 0; // => NaN
const h = { valueOf: () => 1 } - 0; // => 1
const i = { toString: () => "1" } - 0; // => 1
const j = { [Symbol.toPrimitive]: () => 1 } - 0 // => 1
```

[big int `123n`](#0n-数値リテラルの一部（bigint）) でも利用できるが、数値（や数値へ変換されるもの）と混ぜるとエラー。

```js
const k = 1n - 0n; // => 1n

// ⛔ TypeError: Cannot mix BigInt and other types, use explicit conversions
const l = 1n - 0;
```

シンボルは数値へ変換できないのでエラーになる。

```js
// ⛔ TypeError: Cannot convert a Symbol value to a number
const m = Symbol() - 0;
```

### `-value` 単項マイナス演算子

- [*UnaryExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UnaryExpression)
- [13.5.5 Unary `-` Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-unary-minus-operator)
- [単項マイナス (-) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unary_negation)

`-value` や `- 1` など。左辺を持たず右辺のみを取り演算する単項演算子。右辺の数値の符号 (+/-) を反転させる。

### `-1` 数値リテラルの一部（符号付き整数）

- [*SignedInteger* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SignedInteger)
- [12.8.3 Numeric Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-numeric-literals)
- [6.1.6 Numeric Types - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-numeric-types)
- [字句文法 - JavaScript | MDN - 数値リテラル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%95%B0%E5%80%A4%E3%83%AA%E3%83%86%E3%83%A9%E3%83%AB)
- [符号付数値表現 - Wikipedia](https://ja.wikipedia.org/wiki/%E7%AC%A6%E5%8F%B7%E4%BB%98%E6%95%B0%E5%80%A4%E8%A1%A8%E7%8F%BE)
- [Is Negative Zero (-0) a Number in JavaScript? | by Dr. Derek Austin 🥳 | Coding at Dawn | Medium](https://medium.com/coding-at-dawn/is-negative-zero-0-a-number-in-javascript-c62739f80114)

`-1` など。数字との間に空白を挟んだ `- 1` の場合は文法上単項演算子のマイナス `-` になる。

ちなみに JavaScript には `-0` という値がある。これは基本的に `0`, `+0` と同じで `-0 === +0` も `true` となるが、いくつかの限定された場面で `+0` と異なる挙動をする。

```js
const a = 1 / 0; // Infinity
const b = 1 / +0; // Infinity
const c = 1 / -0; // -Infinity
```

### `value--` 後置き減算演算子

- [*UpdateExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UpdateExpression)
- [13.4.3 Postfix Decrement Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-postfix-decrement-operator)
- [デクリメント (--) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Decrement)

変数 `value` を 1 減算した結果を `value` に代入し、減算前の値を評価値として返す。`--value` との違いに注意。

```js
let a = 10;
const b = a--;
console.log(a, b); // => 10, 9
```

演算後の評価値と変数に格納されている値が異なるのはカンマ `,` を使って確認できる。

### `--value` 前置き減算演算子

- [*UpdateExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UpdateExpression)
- [13.4.5 Prefix Decrement Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-prefix-decrement-operator)
- [デクリメント (--) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Decrement)

変数 `value` を 1 減算した結果を `value` に代入し、その値を評価値として返す。`value--` との違いに注意。

```js
let a = 10;
const b = --a;
console.log(a, b); // => 9, 9
```

`--value` は `value -= 1` と同じと考えてよい。<small>（近年は `-=` で代入を明示する方が好まれるように思う。）</small>

変数が `const` の場合は再代入できないので実行時にエラーになる。（例：TypeError: Assignment to constant variable.）

### [TODO] `key -= value` 代入演算子のひとつ

- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)

## `,` カンマ

*comma* カンマ、コンマ

### `a, b` カンマ演算子

- [13.16 Comma Operator ( `,` ) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-comma-operator)
- [カンマ演算子 (,) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comma_Operator)

左辺を評価し、その後右辺を評価しその値を返す。

```js
const a = 1, 2 + 3, 4; // => 4
```

<small>（minify 後のコードでにはよく出てくる程度で、普通使わないと思う。）</small>

`for` 文の初期化式で使われることがある。<small>（良いやり方ではないと思う。）</small>

```js
for (let i = 0, count = 0; i < str.length && count < MAX; i++) {
  const c = str.charAt(i);
  if (isSomething(c)) {
    count++;
  }
}
```

### `[value, value]` 配列初期化子の一部

- [13.2.4 Array Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-array-initializer)

いわゆる配列リテラルで要素を区切るのに用いる。末尾に置いても良い。

```js
const a = [1, 2, 3]; // => [1, 2, 3]
const b = [
  "foo",
  "bar",
  "baz",
]; // => ["foo", "bar", "baz"]
```

また要素なしも許可されている。与えられなかった要素は `undefined` ではなく空 (empty) となる。空は `length` に含まれるものの、例えば `map()` 等のコールバックで呼ばれなかったりする。`fill()` で上書きは可能。一方イテレーターには含まれるので `for-of` を使うのが良い。

```js
const a = [1, 2, 3,,]; // => [ 1, 2, 3, <1 empty item> ]
const b = [, 1,,, 4]; // => [ <1 empty item>, 1, <2 empty items>, 4 ]

console.log(b.length); // => 5

b.forEach((v, i) => console.log(v, i))
// => 1 1
// => 4 4

for (const v of b) {
  console.log(v)
}
// => undefined
// => 1
// => undefined
// => undefined
// => 4
// => undefined
```

### `{ prop: value, prop: value }` オブジェクト初期化子の一部

- [13.2.5 Object Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-object-initializer)

いわゆるオブジェクトリテラルで要素を区切るのに用いる。末尾に置いても良い。

```js
const a = { foo: 123, bar: 456 };
const b = {
  foo: 123,
  bar: 456,
};
```

### `function (param, param) {}` 関数仮引数の一部

- [15.1 Parameter Lists - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-parameter-lists)

各種関数宣言における仮引数の区切り文字。

```js
function f(a, b) {}
const g = (v, i) => v * i;
```

最近の JavaScript （[ECMAScript 2017](https://262.ecma-international.org/8.0/#prod-FormalParameters) 以降）では区切りだけでなく末尾にも置ける。

```js
function longFunctionName(
  logNameParameter,
  anotherLongParameter,
) {
  // ...
}
```

### `f(value, value)` 関数呼び出しの一部

- [13.3 Left-Hand-Side Expressions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-left-hand-side-expressions)

各種関数呼び出しにおける引数の区切り文字。

```js
f(a, b);
obj.prop(a, b);
super(a, b);
```

最近の JavaScript （[ECMAScript 2017](https://262.ecma-international.org/8.0/#prod-Arguments) 以降）では区切りだけでなく末尾にも置ける。

```js
const someNiceResult = longFunctionName(
  logNameParameter,
  anotherLongParameter,
);
```

## `;` セミコロン

*semicolon* セミコロン

### `value;` 文の終端

- [14 ECMAScript Language: Statements and Declarations - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-ecmascript-language-statements-and-declarations)
- [12.9 Automatic Semicolon Insertion - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)
- [16.2 Modules - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-modules)
- [字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar)

終端として各種の文 (statement) や宣言 (declaration) の末尾に出現する記号。

```js
var a = 1;   // VariableStatement 変数文
const b = 2; // LexicalDeclaration 字句宣言
;            // EmptyStatement 空文
a = 2;       // ExpressionStatement 式文
f();         // ExpressionStatement 式文
continue;    // ContinueStatement
break;       // BreakStatement
return;      // ReturnStatement
throw new Error("Hoi"); // ThrowStatement
import "sub.js";        // ImportDeclaration
export f;               // ExportDeclaration
if (true) f();          // IfStatement + ExpressionStatement
```

ブロック文 `{…}` や関数宣言の末尾には出現しない。

```js
if (true) {}     // IfStatement + BlockStatement
while (false) {} // WhileStatement + BlockStatement
function f() {}  // FunctionDeclaration
```

文の区切り（文と文の間に置く）ではなく文の一部である。従って本来は必須であるが、必要な箇所にない場合、コードの解釈において自動挿入されあるものとして扱われる場合がある。

```js
// 👍
// 文法上正しい
const a = 1;
const b = 2;

// 👍
// 文の定義に沿わないが、自動挿入の仕組みにより文法上正しい
const c = 3
const d = 4
```

特に `return` 直後の改行は予期せぬ自動挿入のため不具合となりがち。[空白 ` ` の章を参照](#空白)。

### `for (let i = 0; i < length; i++)` `for` 文の一部

- [14.7.4 The for Statement - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-for-statement)
- [for - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for)

`for (<初期化>; <条件>; <更新>)` のように、`for` 文のうち繰り返しの制御を記述する部分を分かつのに用いられる。

```js
const arr = [11, 22, 33];
for (let i = 0; i < arr.length; i++) {
  const item = arr[i];
  console.log(item);
}
```

<small>（現代では `for` 文はそのほとんどの場面で [`for-of` 文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of)を使うべきだと思う。）</small>

## `:` コロン

*colon* コロン

### `{ key: value }` プロパティ定義

- [*PropertyDefinition* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-PropertyDefinition)
- [13.2.5 Object Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-object-initializer)

オブジェクトリテラルでプロパティを定義する。右側に値を与えるが、式ならその評価結果になる。

```js
const obj = {
  a: "abc",
  b: 1 + 2 - 3 * 4 / 5 ** 6 % 7,
  c: Math.random(), // 関数を実行した結果（数値）
  d: Math.random,   // 関数オブジェクト自体（`obj.d()` で呼び出し可能）
  e: function() {},
  f: () => -1,
  nest: {
    foo: {
      baf: {
        boo: {},
      },
    },
  },
};
```

右側の評価はオブジェクト生成と代入の前に行われるので、再帰構造を表現することはできない。

```js
// ⛔ まだ `obj.a` はない
// ReferenceError: obj is not defined
const obj = { a: obj.a };
```

右側が変数で、その名前がプロパティ名と同じ場合、省略することができる。

```js
const foo = "abc";
const bar = 1;

const obj = {
  foo: foo, // 省略しない場合
  bar,      // 省略した場合
};

const a = obj.foo; // => "abc"
const b = obj.bar; // => 1
```

左側プロパティ名は変数名に利用できるものの他、数値リテラル、文字列リテラルも利用可能。与えた名前がドットを用いたプロパティアクセス `obj.key` で利用できないものは、角括弧を用いたプロパティアクセス `obj[key]` で参照できる。なお数値は文字列へ変換される。

```js
const obj = {
  abc: "abc",
  123: 123,
  "Hello World!": true,
};

const a = obj[123]; // 123
const b = obj["123"]; // 123
const c = obj["Hello World!"]; // true
```

その条件から外れる命名を行いたい場合、計算プロパティ名 `{ [key]: value }` が利用できる。

### [TODO] `case key:` `case` 節

- [14.12 The switch Statement - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-switch-statement)

### [TODO] `default:` `default` 節

- [14.12 The switch Statement - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-switch-statement)

### [TODO] `{ prop: value }` オブジェクト初期化子の一部

- [13.2.5 Object Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-object-initializer)

### [TODO] `{ prop: key } = obj`, `function ({ prop: key }) {}` 分割代入の一部

- [13.15.5 Destructuring Assignment - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-assignment)

### `key: type` 型指定

- [TypeScript: Documentation - TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

JavaScript ではなく TypeScript の文法。

### `key:` ラベル

- [14.13 Labelled Statements - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-labelled-statements)
- [label - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label)

`break` や `continue` で「ジャンプ」する先の位置を定義する文法。

古の言語にある GOTO の仕組み。<small>（JavaScript では黎明期から現代に至るまでまず使われていない。）</small>

<small>（使うな。）</small>

## `!` エクスクラメーション

*exclamation* エクスクラメーション、感嘆符、びっくり

### `!value` 論理否定演算子

- [13.5.7 Logical NOT Operator ( `!` ) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-logical-not-operator)
- [論理否定 (!) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

右辺の真偽 `true`, `false` を反転させる演算子。真偽値ではない場合、まず変換してから反転させる。

### `!!value` 二重の論理否定演算子

論理否定演算子 `!` をふたつ続けたもの。そういう仕様があるわけではない。

`!!value` は `!(!value)` と同じ。まず右側の `!value` を評価し、その結果を `!` でもう一度反転させる。論理値ではないものを論理値へ変換するのに使われる。

```js
const a = 1; // truthy だが `true` ではない
const b = !!a; // `true` となる

const c = ""; // falsy だが `false` ではない
const d = !!c; // `false` となる
```

"truthy" とは真偽値へ変換した際に `true` となるもののこと。同じく "falsy" は `false` となるもの。`0` や空文字列 `""` は falsy だが、空のオブジェクト `{}` や配列 `[]` は truthy 。

[`Boolean` コンストラクター - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-boolean-objects)を関数として使う（`new` を付けない）ことで、この `!!` の代替とできる。<small>（その方が明瞭で良いと思う。）</small>

```js
const a = Boolean(1); // => true
const b = Boolean(""); // => false
```

### `value != value` 不等価演算子

- [13.11 Equality Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-equality-operators)
- [不等価 (!=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Inequality)

`!==` と同じようなもの。ただし左右の値をふわっと変換してよさげに比較する。

変換については `==` を参照。

<small>（`==` と同様、使うのを避け厳密な比較 `!==` を用いるべき。）</small>

### `value !== value` 厳密不等価演算子

- [13.11 Equality Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密不等価 (!==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_inequality)

左右の値を比較して同じでなければ `true` 、そうでなければ `false` を返す。

比較については `===` を参照。

### `value!` non-null assertion

- [TypeScript: Documentation - Everyday Types - Non-null Assertion Operator (Postfix `!` )](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)

JavaScript ではなく TypeScript の機能。nullable な値を非 nullable な値として扱う。<small>（API 境界を越えるなどの特殊な場合にのみ使う。）</small>

## `?` クエスチョン

*question* クエスチョン、疑問符、はてな

### `condition ? value : value` 条件演算子

- [13.14 Conditional Operator ( `? :` ) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-conditional-operator)
- [条件 (三項) 演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

`<条件> ? <真の場合の評価値> : <偽の場合の評価値>` の形を取る。3 つの項を取る唯一の演算子なので「三項演算子」とも呼ばれる。（二項演算子、単項演算子は複数ある。）

```js
const a = true ? 1 : 2; // => 1
const b = false ? 1 : 2; // => 2
```

### `value ?? value` Null 合体演算子

左辺が nullish 、つまり `null` か `undefined` である場合に右辺を、そうでなければ左辺を返す。

```js
const a = null ?? 1; // => 1
const b = undefined ?? 1; // => 1
const c = 0 ?? 1; // => 0
const d = "" ?? 1; // => ""

const obj = { a: 0 };
const f = obj.a ?? 1; // => 0
const g = obj.b ?? 1; // => 1
```

<small>（利用者入力値の初期値を与えたり、`?.` と組み合わせて利用する場面が多いと思う。）</small>

かつては `||` を用いて次のように書くことが多かった。この書き方は `null`, `undefined` 以外の falsy な値に対応できないという問題があった。

```js
const a = null || 1; // => 1
const b = undefined || 1; // => 1
const c = 0 || 1; // => 1
const d = "" || 1; // => 1

const obj = { a: 0 };
const f = obj.a || 1; // => 1
const g = obj.b || 1; // => 1
```

### `obj?.prop` オプショナルチェイン構文

- [13.3 Left-Hand-Side Expressions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-left-hand-side-expressions)
- [13.3.9 Optional Chains - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-optional-chains)

左側が `null` または `undefined` であれば `undefined` を、そうでない場合は左側を receiver として右側の名前のプロパティを返す。<small>（receiver という表現で正確だろうか？）</small>　なお `null` の場合でも `null` ではなく `undefined` が返る点に注意。

```js
const obj = { a: 1, c: null };

const a = obj.a?.toFixed(2); // => "1.00"
const b = obj.b?.toFixed(2); // => undefined
const c = obj.c?.toFixed(2); // => undefined
```

`??` と組み合わせると nullish な場合の初期値を与えることができる。

```js
const obj = { a: 1, c: null };

const b = obj.b?.toFixed(2) ?? "0.00"; // => "0.00"
```

存在しないプロパティを `?.` ではなく `.` で利用すると型エラーになる。（例：TypeError: Cannot read properties of undefined (reading 'toFixed')）

```js
const obj = { a: 1, c: null };

// 得るだけは問題なし
// （もちろん得られる値はない）
const d = obj.b; // => undefined

// ⛔ 型エラーになる
const e = obj.b.toFixed(2);
```

かつては `&&` を用いて次のように書くことが多かった。この書き方は `null`, `undefined` 以外の falsy な値に対応できないという問題があった。

```js
const obj = { a: 1, c: 0 };

const a = obj.a && obj.a.toFixed(2); // => "1.00"
const b = obj.b && obj.b.toFixed(2); // => undefined
const c = obj.c && obj.c.toFixed(2); // => 0
```

あらゆるプロパティアクセス `obj.prop` を置き換え得るわけではなく、例えば `obj?.prop = value` のように代入の左辺に置くのは禁止されており、文法エラーになる。（例：SyntaxError: Invalid left-hand side in assignment）

`?.` の 2 文字でひとつの塊なので、`? .` のように空白を挟むことはできない。`obj ?. foo` のように前後に空白を置くことは可能。

### `f?.()`, `obj?.[value]` オプショナルチェイン構文

- [13.3 Left-Hand-Side Expressions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-left-hand-side-expressions)

プロパティアクセス用のオプショナルチェイン構文 `obj?.prop` と同様、左側が nullish かどうかで判断される構文。

`new` と組み合わせた `new f?.()` は構文エラーになる。（例：SyntaxError: Invalid tagged template on optional chain）

テンプレートリテラルとの組み合わせ <code>f?.&#x60;xxx&#x60;</code> は、[字句解析 - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-OptionalChain)の仕様上は許可されているものの[文法エラーを発生する - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-left-hand-side-expressions-static-semantics-early-errors)よう定められている。（例：SyntaxError: Invalid optional chain from new expression）<small>（用語の扱いが不正確かもしれない。エラーになるのはマジ。)</small>

### [TODO] `key ??= value` 代入演算子のひとつ

- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)

## `.` ドット

*dot*, *period*, *full stop* ドット、ピリオド、フルストップ、終止符、点

### `obj.prop` プロパティアクセス

- [13.3 Left-Hand-Side Expressions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-left-hand-side-expressions)
- [13.3.2 Property Accessors - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-property-accessors)
- [プロパティアクセサー - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Property_Accessors)

オブジェクトのプロパティにアクセスする。

```js
const obj = { a: 1 };

const a = obj.a; // => 1
```

`obj.prop` は `obj["prop"]` に置き換えられる。

### `0.0` 数値リテラルの一部（小数点）

`3.14` のようにして小数点となる。

`.` 部分の左右は省略可能で、`1.` ないし `.1` という表現も可能。ただし両方を省略した `.` だけでは駄目。

数値直後の `.` は小数点として扱われるため、Number のプロパティを `123.toString()` のように参照することはできない。代わりに `123..toString()` であれば `123.` までが数値、その次の `.` からがプロパティ参照となり利用可能。

### `0..prop` 数値リテラルとプロパティアクセス

`0.` が数値（小数点ありかつ小数点以下の数字なし）で、それとプロパティアクセス `obj.prop` の組み合わせ。つまり `(0.).prop` 。`..` という構文はない。

### [TODO] `{ ...key } = value`, `[...arr] = key`, `function (...arr) {}` 分割代入（スプレッド構文）

- [*AssignmentRestProperty* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentRestProperty)
- [*BindingRestProperty* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-BindingRestProperty)
- [13.15.5 Destructuring Assignment - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-assignment)
- [14.3.3 Destructuring Binding Patterns - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-binding-patterns)
- [12.7 Punctuators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-punctuators)

構文であり演算子ではない。

通称スプレッド構文。

WIP

### [TODO] `{ ...obj }` オブジェクトのプロパティ展開（スプレッド構文）

- [*PropertyDefinition* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-PropertyDefinition)
- [13.2.5 Object Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-object-initializer)

### [TODO] `[...arr]` 配列の項目展開（スプレッド構文）

- [*SpreadElement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SpreadElement)
- [13.2.4 Array Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-array-initializer)

### [TODO] `f(...arr)` 関数の引数展開（スプレッド構文）

- [*ArgumentList* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ArgumentList)
- [13.3.8 Argument Lists - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-argument-lists)

## `'`, `"` シングルクォート、ダブルクォート

*quote*, *single quote*, *double quote* クォート、シングルクォート、ダブルクォート、引用符、二重引用符

### [TODO] `"abc"`, `'abc'` 文字列リテラル

- [*StringLiteral* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-StringLiteral)
- [12.8.4 String Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-string-literals)

### `{ "abc": 1 }`, `{ 'abc': 1 }` プロパティ定義

[プロパティ定義 `{ key: value }`](#%7B-key%3A-value-%7D-%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E5%AE%9A%E7%BE%A9) の一種。

なお JSON の場合は必ず二重引用符で括る。

## `(`, `)` 丸括弧

*paren(s)*, *parenthesis (plural: parentheses)* パーレン、丸括弧、小括弧

- [よく使う括弧の名前（日本語、英語）を調べてみたよ。ブラケット、ブレースとか。 | Ginpen.com](https://ginpen.com/2014/02/20/brackets/)

### [TODO] `()` 演算順序の優先度変更（括弧付き式）

- [*ParenthesizedExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ParenthesizedExpression)

### [TODO] `f()` 関数呼び出し

- [*CallExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-CallExpression)

### [TODO] `obj.f()` メソッド呼び出し

- [*CallExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-CallExpression)

### `f().prop` 関数呼び出しとプロパティアクセス

関数呼び出し `f()` とプロパティアクセス `obj.prop` の組み合わせ。`().` という構文はない。

<small>（読みづらいので `f()` の結果は一度変数に代入してから `obj.prop` でプロパティアクセスするべきだと思う。）</small>

### [TODO] `super()` スーパークラスのコンストラクター呼び出し

- [*SuperCall* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SuperCall)

### [TODO] `new F()` コンストラクター実行

- [MemberExpression - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MemberExpression)

### [TODO] `function () {}` 定義の一部

- [*FunctionDeclaration* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-FunctionDeclaration)
- [*FunctionExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-FunctionExpression)
- [15.2 Function Definitions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-function-definitions)

### `{ f() {} }` メソッド定義の一部

- [*MethodDefinition* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MethodDefinition)

オブジェクトリテラルのプロパティとして関数を値に持つものを定義するもの。

```js
const obj = {
  f() {
    // ...
  },
};
```

かつては関数式を用いて書いていた。

```js
const obj = {
  f: function() {
    // ...
  },
};
```

### [TODO] `{ key: function() {} }` 関数式の一部

- [*FunctionExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-FunctionExpression)

### `{ [key]() {} }` メソッド定義の一部

- [*ComputedPropertyName* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ComputedPropertyName)
- [*MethodDefinition* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MethodDefinition)

計算プロパティ名 `[key]` を用いたメソッド定義 `{ key(){} }`の方法。

```js
const methodName = "foo";
const obj = {
  [methodName]() {
    // ...
  },
};

obj[methodName]();
// obj.foo() と同じ
```

メソッド名をシンボルにする場合に有用。（JavaScript の細かい機能を利用する際に必要となることがある。）

```js
const obj = {
  [Symbol.toPrimitive]() {
    return 10;
  },
};

const a = 100 + obj; // => 110
```

### [TODO] `import(key)` 動的インポート

- [*ImportCall* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ImportCall)
- [動的インポート - import - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)

### `(function () {})()` 即時実行関数式、IIFE

- [IIFE (即時実行関数式) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/IIFE)

IIFE = Immediately Invoked Function Expression.

`function` から始めると関数宣言文になるところを、括弧で括ることで関数式として文の一部へ組み込みそのまま関数を呼び出す小技。<small>（現代ではあまり使わないと思う。）</small>

```js
// 関数文
// （セミコロン `;` 不要）
function f() {}

// 関数式
const a = function() { alert("a"); };
a();

// 即時実行関数式
(function() { alert("b"); })();
```

必ずしも括弧である必要はなく、関数文ではなく関数式とできれば何でも良い。

```js
+function(){}();
!function(){}();
(function(){}());
```

効能はスコープを用意できること。その用途は主に 2 つで、ファイルスコープの代わりと `do` 式の代わり。

JavaScript のコードを普通にウェブページで読み込むとグローバル空間を共有してしまうので、ファイルを丸ごとこの即時実行関数で括ることでファイル単位のスコープを作成する。

```js
// window.a, window.f から見えてしまう
var a = 123;
function f() {}
```

```js
(function() {
  // window.a, window.f とは関係ない
  var a = 123;
  function f() {}
})();
```

ファイルスコープのある [JavaScript モジュール](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules) (ES Modules) や Node.js では無意味なので利用されない。またバンドラー（`require()` や `import` から複数のファイルをひとつにまとめるツール。webpack 等）があるならツールが面倒を見てくれるので、気にする必要がない。

後者の `do` 式は、ある値を得るのに複数の工程が必要なときにメソッドチェインや関数呼び出しの入れ子の代わりに利用できる言語機能。現在の JavaScript にはないが新仕様として[検討](https://github.com/tc39/proposal-do-expressions)されている。

```js
let a = (function() {
  let tmp = f();
  return tmp * tmp + 1
})();

// ⛔ 文法エラー
// 現在はまだ使えません
let x = do {
  let tmp = f();
  tmp * tmp + 1
};
```

<small>（`do` 式の代わりにするのは読みづらいのであまり良くないと思う。）</small>

### [TODO] `if ()` if 文の一部

- [*IfStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-IfStatement)
- [*WhileStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-WhileStatement)
- [*DoWhileStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-DoWhileStatement)
- [*SwitchStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SwitchStatement)

### [TODO] `with()` with 文の一部

- [*WithStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-WithStatement)

### `delete(key)`, `void(key)`, `typeof(key)` 括弧式

- [*UnaryExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UnaryExpression)
- [13.5.1 The delete Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-delete-operator)
- [13.5.2 The void Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-void-operator)
- [13.5.3 The typeof Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-typeof-operator)

`delete`, `void`, `typeof` は本来はいずれも括弧不要の単項演算子。

```js
const a = delete obj.prop; // => true or false
const b = void obj; // => undefined
const c = typeof obj; // => "object"
```

しかし括弧を付け関数のように書いても動く。（通常空白でトークンの区切りを表すところを括弧で代用したことになる。）

```js
const a = delete(obj.prop); // => true or false
const b = void(obj); // => undefined
const c = typeof(obj); // => "object"
```

## `[`, `]` 角括弧

*square bracket(s)* スクウェアブラケット、角括弧、四角括弧

- [よく使う括弧の名前（日本語、英語）を調べてみたよ。ブラケット、ブレースとか。 | Ginpen.com](https://ginpen.com/2014/02/20/brackets/)

### [TODO] `[value, value]` 配列リテラル

- [*ArrayLiteral* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ArrayLiteral)
- [13.2.4 Array Initializer - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-array-initializer)

### [TODO] `arr[number]` 配列要素アクセス

### [TODO] `arr[number][number]` 2 次元配列要素アクセス

`arr[number]` の結果が配列のとき、さらにその配列の要素へアクセスする。N 次元配列であれば N 回 `[number]` 部分が繰り返される。`[][]` のような構文があるわけではない。

### [TODO] `obj[key]` プロパティアクセス

- [*MemberExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MemberExpression)
- [13.3.2 Property Accessors - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-property-accessors)

### [TODO] `[key] = value` 分割代入

- [*ArrayAssignmentPattern* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ArrayAssignmentPattern)
- [13.15.5 Destructuring Assignment - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-assignment)

### [TODO] `function f([key]) {}` 分割代入

- [*ArrayBindingPattern* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ArrayBindingPattern)
- [14.3.3 Destructuring Binding Patterns - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-binding-patterns)

### [TODO] `{ [key]: value }` 計算プロパティ名

- [*ComputedPropertyName* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ComputedPropertyName)

### `@param {type} [key]` 省略可能な引数

- [`@param` and `@returns` - TypeScript: Documentation - JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#param-and-returns)

JavaScript ではなく TypeScript の仕様。`@param` を参照。

ややこしいが、TypeScript ではなく JavaScript のコード (`*.js`) で TypeScript のような型を記述するの際、関数引数が任意であることを TypeScript コンパイラーへ伝える。TypeScript の `key?` に相当。

```js
/**
 * @param {string} p1 必須
 * @param {string} [p2] 任意
 */
function f(p1, p2) {}
```

```ts
function f(p1: string, p2?: string) {}
```

### `function f(key [, key])` 省略可能な引数

JavaScript ではなくソフトウェア界隈の習慣。引数が省略可能であるという仕様を表現するときに角括弧で括る。

例えば以下のように説明されている場合、引数 `aaa` は必須だが、`bbb`, `ccc` は省略可能である。

```
foo(aaa [, bbb [, ccc]]);
```

Linux の `grep` コマンドも以下のような説明がある。

<pre>
<code>grep [<u>OPTION</u>...] <u>PATTERNS</u> [<u>FILE</u>...]</code>
</pre>

この場合コマンド名 `grep` の他に引数 `PATTERNS` は必須で、`[OPTION...]` や `[FILE...]` は書かなくても必要に応じて与えても良い。

## `{`, `}` 波括弧

*brace(s)* ブレース、波括弧、にょろ括弧

- [よく使う括弧の名前（日本語、英語）を調べてみたよ。ブラケット、ブレースとか。 | Ginpen.com](https://ginpen.com/2014/02/20/brackets/)

### [TODO] `{ }` ブロック文

- [*BlockStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-BlockStatement)

### [TODO] `if() {}`, `else {}`, `for() {}` `if` 文等とブロック文

- [*IfStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-IfStatement)
- [*BlockStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-BlockStatement)
- [*ForStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ForStatement)

### [TODO] `function() {}` 関数宣言の一部

- [*FunctionExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-FunctionExpression)
- [*FunctionDeclaration* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-FunctionDeclaration)

### [TODO] `try {}`, `catch() {}`, `finally {}` `try` 文等の一部

- [*TryStatement* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TryStatement)
- [*Catch* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-Catch)
- [*Finally* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-Finally)

### [TODO] `obj = {}` オブジェクトリテラル

- [*ObjectLiteral* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ObjectLiteral)

### `f({})` オブジェクトリテラルと関数呼び出し

オブジェクトリテラル `{}` で記述したオブジェクトを引数へ与えて関数を呼び出す。そういう文法があるわけではない。

```js
function f(obj) {};

// オブジェクトリテラルをそのまま引数に与える
f({ foo: 1 });

// オブジェクトリテラルで生成したオブジェクトを
// 変数へ代入してから引数へ与える
const a = { foo: 1 };
f(a);
```

めちゃくちゃ長いこともある。

```js
someInitializer({
  option1: "foo",
  option2: "bar",
  option3: {
    valueSet: [
      { type: 1, value: "haha" },
      { type: 2, value: "hehe" },
      { type: 3, value: "hihi" },
    ],
  },
  // …
});
```

### [TODO] `{key} = obj`, `function f({key}) {}`, `({key}) => value` 分割代入

- [13.15.5 Destructuring Assignment - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-assignment)

### [TODO] <code>&#96;${value}&#96;</code> 値の埋め込み（テンプレートリテラル）

- [*TemplateHead* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TemplateHead)
- [*TemplateMiddle* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TemplateMiddle)
- [*TemplateTail* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TemplateTail)

### `<div>{value}<div>` 値の埋め込み（React/JSX）

- [JSX の導入 – React](https://ja.reactjs.org/docs/introducing-jsx.html)

JavaScript ではなく React/JSX の仕様。変数や値を出力 DOM へ埋め込む。

```jsx
const a = "World";
const b = <div>Hello {a}!</div>;
// => <div>Hello World!</div>
```

### `<MyComponent onClick={onClick} />` 値の埋め込み（React/JSX）

- [JSX の導入 – React](https://ja.reactjs.org/docs/introducing-jsx.html)

JavaScript ではなく React/JSX の仕様。変数や値を出力 DOM へ埋め込む。

```jsx
const f = () => console.log("Clicked");
const a = <button onClick={f}>Click me</button>;
```

### `<div>{{value}}<div>` 値の埋め込み（Vue.js、他）

- [テンプレート構文 — Vue.js](https://jp.vuejs.org/v2/guide/syntax.html)
- [Expressions | Handlebars](https://handlebarsjs.com/guide/expressions.html)
- [Variables - Nunjucks](https://mozilla.github.io/nunjucks/templating.html#variables)

JavaScript ではなく Vue.js や Handlebars 、Nunjucks 等々の仕様。変数や値を出力 DOM へ埋め込む。<small>（多数のテンプレート言語がこの二重波括弧を採用している。）</small>

```jsx
<span>Message: {{ msg }}</span>
```

## `@` アットマーク

*at sign* アットマーク、単価記号

現在の JavaScript では（まだ）使用されていない記号。

### `/** @type {type} */`, `/** @param {type} key */` 型情報 (TypeScript/JSDoc)

- [TypeScript: Documentation - JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

JavaScript ではなく TypeScript の機能であり JSDoc の仕様。変数や引数に型情報を与える。

TypeScript コンパイラーは JavaScript のファイル (`*.js`) 中の JSDoc 形式で記述されたコメントを読み、型情報を得ることができる。型情報はエディターの補完や、コマンドラインの `tsc` で矛盾がないかの検証で利用できる。

```js
/** @type {string[]} */
const a = [];
```

```js
/**
 * @param {Date} date
 * @returns {string}
 */
function toDateString(date) {
  return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;
}
```

### `@key`, `@f()` デコレーター (TypeScript)

- [TypeScript: Documentation - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [tc39/proposal-decorators: Decorators for ES6 classes](https://github.com/tc39/proposal-decorators)

JavaScript ではなく TypeScript の機能。クラスやプロパティを装飾 (*decorate*) して拡張された意味を与える。

```ts
class Line {
  @validate
  @Reflect.metadata("design:type", Point)
  set start(value: Point) {
    // …
  }
}
```

<small>（使ったことない、よくわかっていない。Vue.js でよく使われている印象。）</small>

<small>（翻訳するなら装飾子？　修飾子 (*modifier*) と紛らわしい）</small>

現在の JavaScript の仕様ではないが、検討中の[仕様案](https://github.com/tc39/proposal-hashbang)がある。そのうち正式に JavaScript の文法になるかもしれない。

```js
@defineElement("my-class")
class C extends HTMLElement {
  @reactive accessor clicked = false;
}
```
## `*` アスタリスク

*asterisk*, *star* アスタリスク、スター、星

- [アスタリスク - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%B9%E3%82%AF)

フォントによって星のとげ？の数が 6 個だったり 5 個だったりする。

### [TODO] `value * value` 掛け算演算子

- [*MultiplicativeOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MultiplicativeOperator)

掛け算を行う。

```js
const a = 5 * 8; // => 40
```

(WIP)

### [TODO] `value ** value` べき乗演算子

- [*ExponentiationExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ExponentiationExpression)
- [べき乗 (**) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Exponentiation)
- [冪乗 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%86%AA%E4%B9%97)

べき乗、つまり `n` の `m` 乗 (*n<sup>m</sum>*) を計算する演算子。<small>（漢字では「<ruby>冪<rp>（</rp><rt>べき</rt><rp>）</rp></ruby>乗」と書けるが普通はひらがなにする。）</small>

「`n` の `m` 乗」とは「`n` を `m` 回かける」という意味。

```js
const a = 2 ** 1; // => 2
const b = 2 ** 2; // => 4
const c = 2 ** 3; // => 8
```

```js
const a = 10 ** 1; // => 10
const b = 10 ** 2; // => 100
const c = 10 ** 3; // => 1000

const d = 10 ** -1; // => 0.1
const e = 10 ** -2; // => 0.01

const f = 10 ** 0; // => 1
```

ちなみに名前の雰囲気が近い算法に[「<ruby>階<rp>（</rp><rt>かい</rt><rp>）</rp></ruby>乗」(*n!*)](https://ja.wikipedia.org/wiki/%E9%9A%8E%E4%B9%97) というのがある。こちらは JavaScript には該当する文法はない。

(WIP)

```js
const a = (-1) ** 2; // => 1

// ⛔ SyntaxError: Unary operator used immediately before exponentiation expression. Parenthesis must be used to disambiguate operator precedence
const b = -1 ** 2;
```

### [TODO] `key *= value` 乗算代入

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [乗算代入 (*=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Multiplication_assignment)

(WIP)

```js
let a = 3;
a *= 4; // => 12
```

### [TODO] `key **= value` べき乗代入

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [べき乗代入 (**=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Exponentiation_assignment)

(WIP)

```js
let a = 3;
a **= 3; // => 27
```

### [TODO] `function* () {}` ジェネレーター関数

- [*GeneratorDeclaration* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-GeneratorDeclaration)
- [*GeneratorExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-GeneratorExpression)
- [*GeneratorMethod* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-GeneratorMethod)
- [15.5 Generator Function Definitions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-generator-function-definitions)
- [function* 宣言 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function*)

(WIP)

```js
function* f() {
  yield 1;
  yield 2;
}

const it = f();

const a = it.next();
a.value; // => 1
a.done; // => false

const b = it.next();
b.value; // => 2
b.done; // => false

const c = it.next();
c.value; // => undefined
c.done; // => true
```

```js
function* f() {
  yield 1;
  yield 2;
}

const it = f();

const a = [...it]; // => [1, 2]
```

```js
function* f() {
  yield 1;
  yield 2;
}

const it = f();

for (const value of it) {
  console.log(value);
  // => 1
  // => 2
}
```

## `/` スラッシュ

*slash*, *forward slash* スラッシュ、前方スラッシュ

### [TODO] `value / value`

- [MultiplicativeOperator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MultiplicativeOperator)
- [13.7 Multiplicative Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-multiplicative-operators)
- [除算 (/) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Division)

(WIP)

```js
const a = 12 / 3; // => 4
```

### [TODO] `key /= value` 除算代入

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [除算代入 (/=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Division_assignment)

```js
let a = 12;
a /= 3; // => 4
```

### [TODO] `// xxx` 一行コメント

- [*SingleLineComment* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SingleLineComment)
- [12.4 Comments - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-comments)
- [コメント - 字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88)

### [TODO] `/*`, `*/` 複数行コメント

- [*MultiLineComment* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-MultiLineComment)
- [12.4 Comments - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-comments)
- [コメント - 字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar#%E3%82%B3%E3%83%A1%E3%83%B3%E3%83%88)

### [TODO] `/xxx/`. `/xxx/ig` 正規表現

- [*RegularExpressionLiteral* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-RegularExpressionLiteral)

(WIP)

行コメント `//` の方が優先されるので、空の正規表現をリテラルで表現することはできない。`/(?:)/` で代用することはできる。

## `\` バックスラッシュ

*backslash* バックスラッシュ、後方スラッシュ

環境によっては円記号 `￥` になる場合がある。

### `"\n"`, `"\r"` 改行文字

- [Table 40: String Single Character Escape Sequences - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#table-string-single-character-escape-sequences)
- [改行コード - Wikipedia](https://ja.wikipedia.org/wiki/%E6%94%B9%E8%A1%8C%E3%82%B3%E3%83%BC%E3%83%89)
- [キャリッジ・リターン - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AA%E3%83%83%E3%82%B8%E3%83%BB%E3%83%AA%E3%82%BF%E3%83%BC%E3%83%B3)

文字列リテラル `"xxx"` 中には改行を含めることができないので、エスケープした `"\n"` を使う。（なおテンプレートリテラル <code>&#96;xxx&#96;</code> 中では利用可能。）

`"\n"` はラインフィード LINE FEED (LF) 、`"\r"` はキャリッジリターン CARRIAGE RETURN (CR) 。<small>（通常 `"\n"` のみを使うと思う。）</small>

CR は、本来は改行ではなく同じ行の先頭へ戻るコード。<small>（どうやら Return キーの語源である。）</small>　Node.js では利用できるかもしれない。

```js
> console.log("123\rX")
X23
undefined
```

なおエスケープすることで利用自体は可能。

```js
const a = "\
";
a.length; // => 0
```

(WIP)

### `"\t"` タブ文字

- [Table 40: String Single Character Escape Sequences - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#table-string-single-character-escape-sequences)
- [タブキー - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%BF%E3%83%96%E3%82%AD%E3%83%BC)

明示的にタブ文字を表現したい場合にエスケープした `"\t"` を利用できる。

タブ文字は改行と違い文字列リテラル中でも利用可能だが、エディターの自動変換（タブキーを押しても複数の空白文字が入力される等）も作用するため入力が難しい場合がある。

### `"\\"` バックスラッシュ

- [Table 40: String Single Character Escape Sequences - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#table-string-single-character-escape-sequences)

例えば `"\n"` で改行になるが、この "\n" という文字自体を表現したい場合、バックスラッシュをエスケープして `"\\n"` とすると画面にも "\n" が表示される。

複数回アンエスケープされる場合にも必要。

```js
const a = new RegExp("\\n");

const b = `
`;
a.test(b); // => true
```

### [TODO] `"\u0000"` Unicode エスケープシーケンス

- [25.5.2.4 UnicodeEscape ( `C` ) - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-unicodeescape)

`\u0061` と `\u{61}` は `a` になる。（`"a".charCodeAt(0).toString(16)` つまり "a" の文字コードは 0x61 。）

(WIP)

## `&` アンパサンド

*ampersand*, *and* アンパサンド、アンド

- [アンパサンド - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%91%E3%82%B5%E3%83%B3%E3%83%89)

### `value & value` ビット論理積

- [*BitwiseANDExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-BitwiseANDExpression)
- [13.12 Binary Bitwise Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-binary-bitwise-operators)
- [ビット論理積 (&) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)

ビット、つまり 2 進数の計算で、両辺が `1` である箇所を `1` に、それ以外を `0` にする。

ちなみに JavaScript では `0b10` のような形で 2 進数を表現できる。

```js
const a = 0b0101; // => 5
const b = 0b1100; // => 12
const c = a & b; // => 4 (0b0100)
```

### `value && value` 論理積

- [*LogicalANDExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-LogicalANDExpression)
- [13.13 Binary Logical Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-binary-logical-operators)
- [論理積 (&&) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND)

左辺が truthy の場合は右辺、そうでなければ左辺を返す。条件分岐でよく利用される。

```js
// 両方が OK なら
if (he.isOk() && she.isOk()) {
  he.marry(she);
}
```

他の言語では真偽値 `true` か `false` を返すものが多いが、JavaScript では与えられた 2 項のいずれかを返す点に注意。

```js
const a = true && 123; // => 123
const b = false && 123; // => false

const c = 1 && 123; // => 123
const d = 0 && 123; // => 0
```

真偽値として欲しい場合 `Boolean()` を用いるとよい。

```js
const a = Boolean(true && 123); // => true
const b = Boolean(false && 123); // => false

const c = Boolean(1 && 123); // => true
const d = Boolean(0 && 123); // => false
```

かつて、オプションが与えられた場合にのみ処理実行、のような用途でも使われていた。

```js
const obj = { a: [1, 2, 3], b: undefined };

if (obj.a && obj.a.length > 1) {
  // …
}

if (obj.b && obj.b.length > 1) {
  // …
}
```

現代ではオプショナルチェイン `?.` で実現できる。

```js
const obj = { a: [1, 2, 3], b: undefined };

if (obj.a?.length > 0) {
  // …
}

if (obj.b?.length > 0) {
  // …
}
```

### [TODO] `key &= value` 代入演算子のひとつ

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [ビット論理積代入 (&=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_AND_assignment)

(WIP)

```js
const a = 0b0101; // => 5
let b = 0b1100; // => 12
b &= a; // 4 (0b0100)
```

### [TODO] `key &&= value` 論理積代入

- [*AssignmentExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentExpression)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [論理積代入 (&&=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment)

(WIP)

```js
let a = true;
a &&= false; // false

let b = false;
b &&= true; // false
```

### `&lt;`, `&gt;`, `&#96;`, `&#x20;` エンティティ

- [Entity (エンティティ) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Entity)

JavaScript ではなく HTML。文字のエスケープ表現。HTML のタグ `<h1>` を画面に出力したい場合に利用できる。

次の 4 つが特に有名。

- `&lt;` : `<` (less than)
- `&gt;` : `>` (greater than)
- `&amp;` : `&` (ampersand)
- `&quot;` : `"` (quote)

文字コードの数値を利用して任意の文字を表現することもできる。

- `&#39;` : `'`
- `&#96;` : <code>&#96;</code>
- `&#27700;` : <code>&#27700;</code>
- `&#x1F363;` : <code>&#x1F363;</code>


## `#` 番号記号

*number sign*, *hash*, *sharp sign* 番号記号、ナンバー、ハッシュ、シャープ（音楽のシャープ ♯ は傾きが異なる。）

### `#prop`, `#f() {}` プライベートメンバーの宣言

- [15.7 Class Definitions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-class-definitions)
- [プライベートクラス機能 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [JavaScript classes: Private class fields | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/mdn-javascript_classes_private_class_fields)

クラスインスタンスの外部からアクセスできないプロパティやメソッドを宣言する文法。名前の接頭辞ではなく構文。

`#prop` のように `#` で始まるメンバーを宣言すると `this` 以外からのアクセスができなくなる。なお `this` を代入した変数からは利用可能。

```js
class Foo {
  #prop;

  constructor() {
    this.#prop = 1;
  }

  get prop() {
    return this.#prop;
  }
}

const obj = new Foo();
console.log(obj.prop); // => 1

// ⛔ 文法エラー
// SyntaxError: Private field '#prop' must be declared in an enclosing class
console.log(obj.#prop);
```

`#prop` というプロパティ自体は computed property names `["#prop"]` 及びブラケットを用いたプロパティアクセス `obj["#prop"]` で作成可能。

```js
class Foo {
  ["#prop"];

  constructor() {
    this["#prop"] = 1;
  }
}

const obj = new Foo();
console.log(obj["#prop"]); // => 1
```

名前の接頭辞ではなく構文なので、`["#prop"]` では得られない。

```js
class Foo {
  #prop;

  constructor() {
    this.#prop = 1;
  }
}

const obj = new Foo();
console.log(obj["#prop"]); // => undefined
console.log("#prop" in obj); // => false
```

### `this.#prop`, `this.#f()` プライベートメンバーへのアクセス

- [15.7 Class Definitions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-class-definitions)
- [プライベートクラス機能 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [JavaScript classes: Private class fields | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/mdn-javascript_classes_private_class_fields)

プライベートメンバーへアクセスする文法。名前の接頭辞ではなく構文。

ドット `.` は通常の[メンバー構文 `obj.prop`](#obj.prop-プロパティアクセス)で、`#prop` の部分がプライベートメンバーへアクセスする構文。

[プライベートメンバーの宣言 `#prop`, `#f() {}`](#%23prop%2C-%23f()-%7B%7D-プライベートメンバーの宣言) を参照。

### `https://example.com/#key` URL フラグメント識別子

- [RFC 1630 - Universal Resource Identifiers in WWW: A Unifying Syntax for the Expression of Names and Addresses of Objects on the Network as used in the World-Wide Web](https://datatracker.ietf.org/doc/html/rfc1630)
- [location.hash - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Location/hash)
- [URL.hash - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/URL/hash)

JavaScript ではなく URL の仕様。通称 URL ハッシュ。

JavaScript では DOM API の `window.location.hash` や `URL.hash` がある。

### `#!/usr/bin/env node` シバン

- [ハッシュバンコメント - 字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar)
- [tc39/proposal-hashbang: #! for JS](https://github.com/tc39/proposal-hashbang)
- [シバン (Unix) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%90%E3%83%B3_(Unix))

JavaScript ではなく Linux/UNIX のシェルの機能。ハッシュバンとも。スクリプトを実行するインタープリターを指定する。

Node.js 用の `*.js` ファイルに実行権限を与えて利用する場合に必要。

```js
#!/usr/bin/env node
process.stdout.write("OK\n");
```

1 行目の `#!…` を書かないとエラー。

```
./a.js: line 1: syntax error near unexpected token `"OK\n"'
./a.js: line 1: `process.stdout.write("OK\n");'
```

"#" がハッシュ *hash* 、"!" がバン *bang* （ドカーン）で組み合わせてハッシュバン（グ) *hashbang* 、縮めてシバン *shebang* 。

本来 JavaScript の仕様ではないが、実はコメントとして無視するような特別扱いをする[仕様案](https://github.com/tc39/proposal-hashbang)があり、Chrome や Firefox 、Node.js では実装済み。

### `https://example.com/#!/path` URL ハッシュバン

JavaScript ではなく URL の文化。<small>（なんとなくこちらはシバンよりハッシュバン（あるいはハッシュバング）とよく呼ばれてる気がする。気のせいかも。）</small>

URL の[フラグメント識別子 `#`](#https%3A%2F%2Fexample.com%2F%23key-url-フラグメント識別子) の後、`!` に続けてパスを記述するもの。

例：

- `https://example.com/#!path/to/file`
- `https://example.com/index.html#!path/to/file`

URL としては `#` 以降はフラグメント識別子以上の意味は持たない。サーバー側では何もせず常に同じリソースを返却し、クライアント側で `#!/path` 部分を解釈して適切な画面の描画を行う。

<small>（HTML5 初期ないし以前の、JavaScript から URL を強力に操作できなかった頃に [SPA](https://developer.mozilla.org/ja/docs/Glossary/SPA) 用に支持された文化という認識。現在は利用されないと思う。）</small>

## `%` パーセント

*percent* パーセント、百分率記号

### [TODO] `value % value` 剰余

- [*MultiplicativeOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-MultiplicativeOperator)
- [13.7 Multiplicative Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-multiplicative-operators)
- [剰余 (%) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Remainder)

割った余りを求める。

```js
const a = 10 % 3; // 1
```

(WIP)

### [TODO] `key %= value` 剰余代入

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [剰余代入 (%=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Remainder_assignment)

```js
let a = 10;
a %= 3; // => 1
```

(WIP)

## <code>`</code> バックチック

*backtick*, *back quote*, *grave* バックチック、バックティック、バッククォート、グレイブ、ちょん

- [Backtick - Wikipedia](https://en.wikipedia.org/wiki/Backtick)

### <code>&#96;abc&#96;</code> テンプレートリテラル

- [*NoSubstitutionTemplate* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-NoSubstitutionTemplate)
- [*TemplateHead* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TemplateHead)
- [*TemplateTail* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-TemplateTail)
- [13.2.8 Template Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-template-literals)
- [テンプレートリテラル (テンプレート文字列) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals)

基本的には文字列リテラル `"abc"` と同じ。加えて改行を加えたり、`${key}` のようにして値を埋め込んだりできる。

```js
const a = `abc`;
```

```js
const title = "Hello World!";

const el = document.createElement("div");
el.innerHTML = `
  <div>
    <h1>${title}</h1>
  </div>
`;
```

入れ子も可能。

```js
const names = ["Alice", "Bob", "Charlie"];
const html = `
  <ul>
    ${names.map((name) => `
      <li>${name}</li>
    `)}
  </ul>
`;
```

### [TODO] <code>f&#96;abc&#96;</code> タグ付きテンプレートリテラル

- [タグ付きテンプレート - テンプレートリテラル (テンプレート文字列) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals#%E3%82%BF%E3%82%B0%E4%BB%98%E3%81%8D%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)

テンプレートリテラルに対して接頭辞のようにして、文字列を作成する関数を指定できる。

```js
function myTag(strings, ...values) {
  console.log(strings); // ["aaa", "bbb", "ccc"]
  console.log(values); // [111, 222]
  return "OK";
}

const a = myTag`aaa${111}bbb${222}ccc`; // => "OK"
```

## `^` キャレット

*caret*, *hat* キャレット、ハット、三角、とんがり

- [キャレット - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AC%E3%83%83%E3%83%88)

### [TODO] `value ^ value` ビット排他的論理和

- [*BitwiseXORExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-BitwiseXORExpression)
- [13.12 Binary Bitwise Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-binary-bitwise-operators)
- [ビット排他的論理和 (^) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR)

(WIP)

XOR する。

```js
const a = 0b00000101; // => 5
const b = 0b00001100; // => 12

const c = a ^ b; // => 9
const d = 0b00001001; // => 9
```

### [TODO] `key ^= value` ビット排他的論理和代入

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [ビット排他的論理和代入 (^=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR_assignment)

(WIP)

XOR する。

```js
let a = 0b00000101; // => 5
const b = 0b00001100; // => 12

a ^=  b; // => 9
const d = 0b00001001; // => 9
```

### `^` 先頭（正規表現）

- [正規表現 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions)

JavaScript ではなく正規表現のパターン。（行の）先頭を意味する。また正規表現以外に転用される。

```js
const rx = /^a/;

rx.test("abc"); // => true;
rx.test("xabc"); // => false;
```

[CSS の属性セレクター](https://developer.mozilla.org/ja/docs/Web/CSS/Attribute_selectors#%E6%A7%8B%E6%96%87)でも、属性の値が `xxx` で始まる、という書き方ができる。

```css
a { color: blue; }
a[href^="mailto:"] { color: red; }
```

```html
<a href="https://example.com">Blue</a>
<a href="mailto:me@example.com">Red</a>
```


## `+` プラス

*plus* プラス、足す、足し算

### [TODO] `value + value` 加算演算子

- [*AdditiveExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AdditiveExpression)
- [13.8 Additive Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-additive-operators)
- [加算 (+) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Addition)

(WIP)

```js
const a = 3 + 4; // => 7
```

### `+value` 単項プラス演算子

- [*UnaryExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UnaryExpression)
- [13.5.4 Unary + Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-unary-plus-operator)
- [単項プラス (+) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unary_plus)

単項 `-` 演算子と対になるもの。符号 (+/-) を変化させないため、実質意味はない。

が、与えられた値を数値へ変換する機能がある。

```js
const a = +-1; // => -1
const b = +true; // => 1
const c = +false; // => 0
const d = +"123"; // => 123
const e = +"abc"; // => NaN
```

### [TODO] `+1` 数値リテラルの一部（符号付き整数）

- [*SignedInteger* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-SignedInteger)

### `key++` 後置き加算演算子

- [*UpdateExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UpdateExpression)
- [13.4.2 Postfix Increment Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-postfix-increment-operator)
- [インクリメント (++) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment)

変数 `key` を `1` 加算した結果を `key` に代入し、減算前の値を評価値として返す。前置き `--key` との違いに注意。

```js
let a = 10;
const b = a++;
console.log(a, b); // => 11, 10
```

`for` 文でよく使う。<small>（現代では `for` より `for-of` 文を使うべき場面が多いので、見る機会は減った。）</small>

```js
const arr = ["A", "B", "C"];
for (let i = 0; i < arr.length; i++) {
  const item = arr[i];
  console.log(i, item);
}
```

### `++key` 前置き加算演算子

- [*UpdateExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-UpdateExpression)
- [13.4.4 Prefix Increment Operator - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-prefix-increment-operator)
- [インクリメント (++) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Increment)

変数 `key` を `1` 加算した結果を `key` に代入し、その値を評価値として返す。後置き `key++` との違いに注意。

```js
let a = 10;
const b = ++a;
console.log(a, b); // => 11, 11
```

### [TODO] `key += value` 加算代入演算子

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [加算代入 (+=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Addition_assignment)

(WIP)

```js
let a = 1;
a += 2; // => 3
```

## [TODO] `<` 小なり

*less-than sign* 小なり、不等号

- [よく使う括弧の名前（日本語、英語）を調べてみたよ。ブラケット、ブレースとか。 | Ginpen.com](https://ginpen.com/2014/02/20/brackets/)

### [TODO] `value < value` 小なり演算子

- [*RelationalExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-RelationalExpression)
- [13.10 Relational Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-relational-operators)
- [小なり (<) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than)

```js
const a = 4 < 5; // => true
const b = 5 < 5; // => false

const c = -6 < -5; // => true
const d = -5 < -5; // => false
```

普通は `if` 文の条件で使う。

```js
// 最小値より小さいなら修正
if (n < min) {
  n = min;
}
```

### [TODO] `value <= value` 小なりイコール演算子

- [*RelationalExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-RelationalExpression)
- [13.10 Relational Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-relational-operators)
- [小なりイコール (<=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal)

```js
const a = 4 <= 5; // => true
const b = 5 <= 5; // => true
const c = 6 <= 5; // => false

const d = -6 <= -5; // => true
const e = -5 <= -5; // => true
const f = -4 <= -5; // => false
```

普通は `if` 文の条件で使う。

```js
// 範囲内ならよし
if (n <= max) {
  return true;
}
```

### [TODO] `value << value` 左シフト演算子

- [*ShiftExpression* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ShiftExpression)
- [13.9 Bitwise Shift Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-bitwise-shift-operators)
- [左シフト (<<) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Left_shift)

ビット操作。

```js
const a = 1 << 1; // => 2
const b = 1 << 2; // => 4
const c = 1 << 3; // => 8
const d = 1 << 4; // => 16
const d = 1 << 10; // => 1024
```

2 進数で見るとわかりやすい。

```js
const a = 0b0001 << 1 === 0b0010; // => true;
const b = 0b0001 << 2 === 0b0100; // => true;
const c = 0b0001 << 3 === 0b1000; // => true;

const d = 0b0_0000_0101 << 4 === 0b0_0101_0000; // => true;
```

### [TODO] `key <<= value` 左シフト代入演算子

- [*AssignmentOperator* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-AssignmentOperator)
- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)
- [左シフト代入 (<<=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Left_shift_assignment)

```js
let a = 1;
a <<= 10; // => 1024
```

### `<!--` HTML コメント

- [SingleLineHTMLOpenComment - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
- [B.1.1 HTML-like Comments - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-html-like-comments)

単行コメント `//` と同じ。

JavaScript のコードを HTML コードへ埋め込む際、かつてまだ JavaScript が全てのブラウザーで対応されていなかった頃、JS コード部分が露出するのを避ける目的で「念のため」HTML コメントにしていた時代の名残。

```html
<script>
<!--
window.alert("Hello World!");
-->
</script>
```

Node.js も対応している。

<small>（わざわざ使わないでください。）</small>

### [TODO] `<div>` 要素やコンポーネント (React/JSX)

- [JSX の導入 – React](https://ja.reactjs.org/docs/introducing-jsx.html)

JavaScript ではなく React/JSX の仕様。

## [TODO] `=` イコール

*equal* イコール、等号

### [TODO] `key = value`

### [TODO] `value == value`

- [13.11 Equality Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-equality-operators)
- [等価 (==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Equality)

### [TODO] `value === value`

- [13.11 Equality Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密等価 (===) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality)

### `() => {}` アロー関数式

- [*ArrowFunction* - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#prod-ArrowFunction)
- [15.3 Arrow Function Definitions - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-arrow-function-definitions)
- [アロー関数式 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

左側に引数、右側に関数の本文を書く。

```js
const f = (x) => { return x + 1; };

// 通常の関数式の場合（比較用）
const f = function (x) { return x + 1; };
```

引数が 1 つの場合、丸括弧 `()` を省略できる。また右側も、`return` のみの場合は波括弧 `{}` と `return` を省略できる。


```js
const f = x => { return x + 1; };
const g = (x) => x + 1;
const h = x => x + 1;
```

`=>` の前に改行を置くと文法エラーになる。

```js
// ⛔ SyntaxError: Unexpected token '=>'
f = x
      => x + 1;
```

アロー関数は通常の関数とは `this` の扱いが異なる等の違いがある。（なお括弧の有無は関係ない。）

```js
const creator = {
  name: "CREATOR",
  create() {
    return {
      name: "CREATURE",
      f: function() { return this.name; },
      af: () => this.name,
    };
  },
};

const obj = creator.create();
obj.f(); // => "CREATURE"、関数実行時の `this`
obj.af(); // => "CREATOR"、関数作成時の `this`
```

## [TODO] `>` 大なり

*greater-than sign* 大なり、不等号

- [よく使う括弧の名前（日本語、英語）を調べてみたよ。ブラケット、ブレースとか。 | Ginpen.com](https://ginpen.com/2014/02/20/brackets/)

## [TODO] `|` バー

*bar*, *vertical bar*, *pipe* バー、垂直バー、パイプ

### [TODO] `value | value`

### [TODO] `value |> xxx` パイプライン演算子

### [TODO] `value || value`

### [TODO] `key |= value` 代入演算子のひとつ

- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)

### [TODO] `key ||= value` 代入演算子のひとつ

- [13.15 Assignment Operators - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-assignment-operators)

## [TODO] `~` チルダ

*tilde* チルダ、チルド、波線符号、波、にょろ

- [チルダ - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%AB%E3%83%80)

## `$` ダラー

*dollar* ダラー、ドル、お金

### `$key` 変数や関数の名前

- [12.6 Names and Keywords - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-names-and-keywords)

変数や関数の名前として利用できる。特に意味はなく他の文字 `abc` やアンダースコア `_` と同じ。名前の先頭でも利用可能。

```js
const $name = document.querySelector("#name");

const cache$12345 = {};

const $ = 1;
```

<small>（機械的に生成されるものの命名に用いる文化があると聞いたことがあるがどうだろうか。）</small>

この記号 `$` を名前空間や接頭辞として利用するライブラリー、フレームワークがある。（JavaScript 本体の機能ではない。）　もちろん jQuery が飛びぬけて有名。

- [jQuery](https://jquery.com/)
- [Svelte • Cybernetically enhanced web apps](https://svelte.dev/)

```js
// jQuery
$(() => {
  const $name = $("#name");
});
```

```html
<!-- Svelte -->
<h1>The count is {$count}</h1>
```

### [TODO] <code>&#96;${xxx}&#96;</code>

### [TODO] `$0`, `$1`, ...

## その他

せっかくなので記号ではないが特殊な用途のものも紹介します。

### `0x00`, `0o00`, `0b00` 数値リテラルの一部（進数）

- [12.8.3 Numeric Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-numeric-literals)

数値への接頭辞 `0x`, `0X` (HexIntegerLiteral) は 16 進数を意味する。同じく `0o`, `0O` (OctalIntegerLiteral) は 8 進数、`0b`, `0B` (BinaryIntegerLiteral) は 2 進数となる。

```js
const a = 0x10; // => 16
const b = 0o10; // => 8
const c = 0b10; // => 2
const d =   10; // => 10
```

### `0e0` 数値リテラルの一部（指数）

- [BigInt - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [12.8.3 Numeric Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-numeric-literals)

例えば `3e2` のようにして指数を表現する。この場合は `3 * 10 ** 2` となる。

```js
const a = 1e0; // => 1
const b = 1e1; // => 10
const c = 1e2; // => 100
const d = 1e-1; // => 0.1

const pi = 314e-2; // => 3.14
```

### `0n` 数値リテラルの一部（bigint）

- [12.8.3 Numeric Literals - ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-literals-numeric-literals)
- [BigInt - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

`123n` のように接尾辞を与えると、数値が bigint (BigInt) になる。通常の数値 number とは一部異なる。

```js
const a = 123 === 123n; // => false
```

{% endraw %}
