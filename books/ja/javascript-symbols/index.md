---
layout: base.njk
title: (WIP) JavaScript の記号
---

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

- [ECMAScript® 2023 Language Specification - 12.2 White Space](https://tc39.es/ecma262/#sec-white-space)
- [ECMAScript® 2023 Language Specification - 12.3 Line Terminators](https://tc39.es/ecma262/#sec-line-terminators)
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

- [ECMAScript® 2023 Language Specification - 12.2 White Space](https://tc39.es/ecma262/#sec-white-space)
- [ECMAScript® 2023 Language Specification - 12.3 Line Terminators](https://tc39.es/ecma262/#sec-line-terminators)
- [ECMAScript® 2023 Language Specification - 12.9 Automatic Semicolon Insertion](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)
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

- [ECMAScript® 2023 Language Specification - 12.6 Names and Keywords](https://tc39.es/ecma262/#sec-names-and-keywords)

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

[JavaScript の仕様書 (ECMAScript 2023)](https://tc39.es/ecma262/)では "underscore" の表記が出現する。

### `1_000` 数値区切り文字

- [ECMAScript® 2023 Language Specification - 12.8.3 Numeric Literals](https://tc39.es/ecma262/#sec-literals-numeric-literals)

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

- [ECMAScript® 2023 Language Specification - 13.8.2 The Subtraction Operator ( `-` )](https://tc39.es/ecma262/#sec-subtraction-operator-minus)
- [減算 (-) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Subtraction)

`value - value` など。左辺から右辺を引く。

### `-value` 単項マイナス演算子

- [ECMAScript® 2023 Language Specification - 13.5.5 Unary `-` Operator](https://tc39.es/ecma262/#sec-unary-minus-operator)
- [単項マイナス (-) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Unary_negation)

`-value` や `- 1` など。左辺を持たず右辺のみを取り演算する単項演算子。右辺の数値の符号 (+/-) を反転させる。

### `-1` 数値リテラルの一部（符号付き整数）

- [ECMAScript® 2023 Language Specification - 12.8.3 Numeric Literals](https://tc39.es/ecma262/#sec-literals-numeric-literals)
- [ECMAScript® 2023 Language Specification - 6.1.6 Numeric Types](https://tc39.es/ecma262/#sec-numeric-types)
- [符号付数値表現 - Wikipedia](https://ja.wikipedia.org/wiki/%E7%AC%A6%E5%8F%B7%E4%BB%98%E6%95%B0%E5%80%A4%E8%A1%A8%E7%8F%BE)
- [Is Negative Zero (-0) a Number in JavaScript? | by Dr. Derek Austin 🥳 | Coding at Dawn | Medium](https://medium.com/coding-at-dawn/is-negative-zero-0-a-number-in-javascript-c62739f80114)

`-1` など。数字との間に空白を挟んだ `- 1` の場合は文法上単項演算子のマイナス `-` になる。

ちなみに JavaScript には `-0` という値がある。これは基本的に `0`, `+0` と同じで `-0 === +0` も `true` となるが、いくつかの限定された場面で `+0` と異なる挙動をする。

```js
const a = 1 / 0; // Infinity
const b = 1 / +0; // Infinity
const c = 1 / -0; // -Infinity
```

### `--value` 前置き減算演算子

- [ECMAScript® 2023 Language Specification - 13.4.5 Prefix Decrement Operator](https://tc39.es/ecma262/#sec-prefix-decrement-operator)

変数 `value` を 1 減算した結果を `value` に代入し、その値を評価値として返す。`value--` との違いに注意。

```js
let a = 10;
const b = --a;
console.log(a, b); // => 9, 9
```

`--value` は `value -= 1` と同じと考えてよい。<small>（近年は `-=` で代入を明示する方が好まれるように思う。）</small>

変数が `const` の場合は再代入できないので実行時にエラーになる。（例：TypeError: Assignment to constant variable.）

### `value--` 後置き減算演算子

- [ECMAScript® 2023 Language Specification - 13.4.3 Postfix Decrement Operator](https://tc39.es/ecma262/#sec-postfix-decrement-operator)

変数 `value` を 1 減算した結果を `value` に代入し、減算前の値を評価値として返す。`--value` との違いに注意。

```js
let a = 10;
const b = a--;
console.log(a, b); // => 10, 9
```

演算後の評価値と変数に格納されている値が異なるのはカンマ `,` を使って確認できる。

### `key -= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

## `,` カンマ

*comma* カンマ、コンマ

### `a, b` カンマ演算子

- [ECMAScript® 2023 Language Specification - 13.16 Comma Operator ( `,` )](https://tc39.es/ecma262/#sec-comma-operator)
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

- [ECMAScript® 2023 Language Specification - 13.2.4 Array Initializer](https://tc39.es/ecma262/#sec-array-initializer)

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

- [ECMAScript® 2023 Language Specification - 13.2.5 Object Initializer](https://tc39.es/ecma262/#sec-object-initializer)

いわゆるオブジェクトリテラルで要素を区切るのに用いる。末尾に置いても良い。

```js
const a = { foo: 123, bar: 456 };
const b = {
  foo: 123,
  bar: 456,
};
```

### `function (param, param) {}` 関数仮引数の一部

- [ECMAScript® 2023 Language Specification - 15.1 Parameter Lists](https://tc39.es/ecma262/#sec-parameter-lists)

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

- [ECMAScript® 2023 Language Specification - 13.3 Left-Hand-Side Expressions](https://tc39.es/ecma262/#sec-left-hand-side-expressions)

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

→ `&xxx;` HTML の実体参照

### `value;` 文の終端

- [ECMAScript® 2023 Language Specification - 14 ECMAScript Language: Statements and Declarations](https://tc39.es/ecma262/#sec-ecmascript-language-statements-and-declarations)
- [ECMAScript® 2023 Language Specification - 12.9 Automatic Semicolon Insertion](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)
- [ECMAScript® 2023 Language Specification - 16.2 Modules](https://tc39.es/ecma262/#sec-modules)
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

- [ECMAScript® 2023 Language Specification - 14.7.4 The for Statement](https://tc39.es/ecma262/#sec-for-statement)
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

→ `condition ? value : value` 条件演算子

### `case key:` `case` 節

- [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-switch-statement)

TODO

### `default:` `default` 節

- [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-switch-statement)

TODO

### `{ prop: value }` オブジェクト初期化子の一部

- [ECMAScript® 2023 Language Specification - 13.2.5 Object Initializer](https://tc39.es/ecma262/#sec-object-initializer)

TODO

### `{ prop: key } = obj`, `function ({ prop: key }) {}` 分割代入の一部

- [ECMAScript® 2023 Language Specification](https://tc39.es/ecma262/#sec-destructuring-assignment)

TODO

### `key: type` 型指定

- [TypeScript: Documentation - TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

JavaScript ではなく TypeScript の文法。

### `key:` ラベル

- [ECMAScript® 2023 Language Specification - 14.13 Labelled Statements](https://tc39.es/ecma262/#sec-labelled-statements)
- [label - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/label)

`break` や `continue` で「ジャンプ」する先の位置を定義する文法。

古の言語にある GOTO の仕組み。<small>（JavaScript では黎明期から現代に至るまでまず使われていない。）</small>

<small>（使うな。）</small>

## `!` エクスクラメーション

*exclamation* エクスクラメーション、感嘆符、びっくり

### `!value` 論理否定演算子

- [ECMAScript® 2023 Language Specification - 13.5.7 Logical NOT Operator ( `!` )](https://tc39.es/ecma262/#sec-logical-not-operator)
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

[`Boolean` コンストラクター](https://tc39.es/ecma262/#sec-boolean-objects)を関数として使う（`new` を付けない）ことで、この `!!` の代替とできる。<small>（その方が明瞭で良いと思う。）</small>

```js
const a = Boolean(1); // => true
```

### `value != value` 不等価演算子

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [不等価 (!=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Inequality)

`!==` と同じようなもの。ただし左右の値をふわっと変換してよさげに比較する。

変換については `==` を参照。

<small>（`==` と同様、使うのを避け厳密な比較 `!==` を用いるべき。）</small>

### `value !== value` 厳密不等価演算子

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密不等価 (!==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_inequality)

左右の値を比較して同じでなければ `true` 、そうでなければ `false` を返す。

比較については `===` を参照。

### `value!` non-null assertion

- [TypeScript: Documentation - Everyday Types - Non-null Assertion Operator (Postfix `!` )](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)

JavaScript ではなく TypeScript の機能。nullable な値を非 nullable な値として扱う。<small>（API 境界を越えるなどの特殊な場合にのみ使う。）</small>

## `?` クエスチョン

*question* クエスチョン、疑問符、はてな

### `condition ? value : value` 条件演算子

- [ECMAScript® 2023 Language Specification - 13.14 Conditional Operator ( `? :` )](https://tc39.es/ecma262/#sec-conditional-operator)
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

- [ECMAScript® 2023 Language Specification - 13.3 Left-Hand-Side Expressions](https://tc39.es/ecma262/#sec-left-hand-side-expressions)
- [ECMAScript® 2023 Language Specification - 13.3.9 Optional Chains](https://tc39.es/ecma262/#sec-optional-chains)

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

- [ECMAScript® 2023 Language Specification - 13.3 Left-Hand-Side Expressions](https://tc39.es/ecma262/#sec-left-hand-side-expressions)

プロパティアクセス用のオプショナルチェイン構文 `obj?.prop` と同様、左側が nullish かどうかで判断される構文。

`new` と組み合わせた `new f?.()` は構文エラーになる。（例：SyntaxError: Invalid tagged template on optional chain）

テンプレートリテラルとの組み合わせ <code>f?.&#x60;xxx&#x60;</code> は、[字句解析](https://tc39.es/ecma262/#prod-OptionalChain)の仕様上は許可されているものの[文法エラーを発生する](https://tc39.es/ecma262/#sec-left-hand-side-expressions-static-semantics-early-errors)よう定められている。（例：SyntaxError: Invalid optional chain from new expression）<small>（用語の扱いが不正確かもしれない。エラーになるのはマジ。)</small>

### `key ??= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

## `.` ドット

*dot*, *period*, *full stop* ドット、ピリオド、フルストップ、終止符、点

→ `?.`

### `obj.prop` メンバー構文（プロパティアクセサー）

- [ECMAScript® 2023 Language Specification - 13.3 Left-Hand-Side Expressions](https://tc39.es/ecma262/#sec-left-hand-side-expressions)
- [ECMAScript® 2023 Language Specification - 13.3.2 Property Accessors](https://tc39.es/ecma262/#sec-property-accessors)
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

### `{ ...key } = value`, `[...arr] = key`, `function (...arr) {}` 分割代入（スプレッド構文）

- [ECMAScript® 2023 Language Specification - 14.3.3 Destructuring Binding Patterns](https://tc39.es/ecma262/#sec-destructuring-binding-patterns)
- [ECMAScript® 2023 Language Specification - 12.7 Punctuators](https://tc39.es/ecma262/#sec-punctuators)

構文であり演算子ではない。

通称スプレッド構文。

TODO

### `{ ...obj }`, `[...arr]`, `f(...arr)` 展開（スプレッド構文）

TODO

## `'`, `"` シングルクォート、ダブルクォート

*quote*, *single quote*, *double quote* クォート、シングルクォート、ダブルクォート、引用符、二重引用符

TODO

## `(`, `)` 丸括弧

*paren(s)*, *parenthesis (plural: parentheses)* パーレン、丸括弧、小括弧

### `()` 演算順序のあれ

TODO

### `f().prop` 関数呼び出しとプロパティアクセス

関数呼び出し `f()` とプロパティアクセス `obj.prop` の組み合わせ。`().` という構文はない。

TODO

## `[`, `]` 角括弧

*square bracket(s)* スクウェアブラケット、角括弧、四角括弧

TODO

## `{`, `}` 波括弧

*bracket(s)* ブラケット、波括弧、にょろ括弧

TODO

## `@` アットマーク

*at*, *at sign* アットマーク、単価記号

TODO

## `*` アスタリスク

*asterisk*, *star* アスタリスク、スター、星

- [アスタリスク - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%B9%E3%82%AF)

### `value * value`

TODO

### `value ** value`

TODO

### `key *= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)


TODO

### `key **= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

## `/` スラッシュ

*slash*, *forward slash* スラッシュ、前方スラッシュ

### `value / value`

TODO

### `key /= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

### `/xxx/` 正規表現

TODO

### `/*`, `*/` 複数行コメント

- [ECMAScript® 2023 Language Specification - 12.4 Comments](https://tc39.es/ecma262/#sec-comments)

TODO

### `// xxx` 一行コメント

- [ECMAScript® 2023 Language Specification - 12.4 Comments](https://tc39.es/ecma262/#sec-comments)

TODO

## `\` バックスラッシュ

*backslash* バックスラッシュ、後方スラッシュ

### `"\n"`, `"\r"` 改行文字

- [ECMAScript® 2023 Language Specification - Table 73: JSON Single Character Escape Sequences](https://tc39.es/ecma262/#table-json-single-character-escapes)
- [改行コード - Wikipedia](https://ja.wikipedia.org/wiki/%E6%94%B9%E8%A1%8C%E3%82%B3%E3%83%BC%E3%83%89)
- [キャリッジ・リターン - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AA%E3%83%83%E3%82%B8%E3%83%BB%E3%83%AA%E3%82%BF%E3%83%BC%E3%83%B3)

`"\n"` はラインフィード LINE FEED (LF) 、`"\r"` はキャリッジリターン CARRIAGE RETURN (CR) 。<small>（通常 `"\n"` のみを使うと思う。）</small>

CR は、本来は改行ではなく同じ行の先頭へ戻るコード。<small>（どうやら Return キーの語源である。）</small>　Node.js で利用できるかもしれない。

```js
> console.log("123\rX")
X23
undefined
```

### `"\t"` タブ文字

- [ECMAScript® 2023 Language Specification - Table 73: JSON Single Character Escape Sequences](https://tc39.es/ecma262/#table-json-single-character-escapes)

### `"\u0000"` Unicode エスケープシーケンス

- [ECMAScript® 2023 Language Specification - 25.5.2.4 UnicodeEscape ( `C` )](https://tc39.es/ecma262/#sec-unicodeescape)

`\u0061` と `\u{61}` は `a` になる。（`"a".charCodeAt(0).toString(16)` つまり "a" の文字コードは 0x61 。）

### `"\` 文字列リテラル中の改行

```js
const s = "foo\
bar";`
```

TODO

## `&` アンパサンド

*ampersand*, *and* アンパサンド、アンド

- [アンパサンド - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%91%E3%82%B5%E3%83%B3%E3%83%89)

### `value & value`

TODO

### `value && value`

TODO

### `key &= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

### `key &&= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

### `&xxx;`, `&#0000`, `&#x0000;` 文字参照

- [Entity (エンティティ) - MDN Web Docs 用語集: ウェブ関連用語の定義 | MDN](https://developer.mozilla.org/ja/docs/Glossary/Entity)

JavaScript ではなく HTML。

## `#` 番号記号

*number sign*, *hash*, *sharp sign* 番号記号、ナンバー、ハッシュ、シャープ（音楽のシャープ ♯ は傾きが異なる。）

→ `&#0000`, `&#x0000;` 文字参照

### `#prop`, `#f() {}` プライベートメンバーの宣言

- [ECMAScript® 2023 Language Specification - 15.7 Class Definitions](https://tc39.es/ecma262/#sec-class-definitions)
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

- [ECMAScript® 2023 Language Specification - 15.7 Class Definitions](https://tc39.es/ecma262/#sec-class-definitions)
- [プライベートクラス機能 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [JavaScript classes: Private class fields | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/mdn-javascript_classes_private_class_fields)

プライベートメンバーへアクセスする文法。名前の接頭辞ではなく構文。

ドット `.` は通常の[メンバー構文 `obj.prop`](#obj.prop-メンバー構文（プロパティアクセサー）)で、`#prop` の部分がプライベートメンバーへアクセスする構文。

[プライベートメンバーの宣言 `#prop`, `#f() {}`](#%23prop%2C-%23f()-%7B%7D-プライベートメンバーの宣言) を参照。

### `https://example.com/#key` URL フラグメント識別子

- [RFC 1630 - Universal Resource Identifiers in WWW: A Unifying Syntax for the Expression of Names and Addresses of Objects on the Network as used in the World-Wide Web](https://datatracker.ietf.org/doc/html/rfc1630)
- [location.hash - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Location/hash)
- [URL.hash - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/URL/hash)

JavaScript ではなく URL の仕様。通称 URL ハッシュ。

JavaScript では DOM API の `window.location.hash` や `URL.hash` がある。

### `https://example.com/#!/path` ハッシュバング

JavaScript ではなく URL の文化。

URL の[フラグメント識別子 `#`](#https%3A%2F%2Fexample.com%2F%23key-url-フラグメント識別子) の後、`!` に続けてパスを記述するもの。

URL としては `#` 以降はフラグメント識別子以上の意味は持たないためネットワーク上は意味はなく、クライアント側で `!/path` 部分を解釈して画面の描画を行う。

<small>（HTML5 以前、JavaScript から URL を強力に操作できなかった頃に支持された文化という認識。）</small>

### `#!/usr/bin/env node` シバン

- [シバン (Unix) - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%90%E3%83%B3_(Unix))

JavaScript ではなく Linux/UNIX のシェルの機能。

シェルスクリプトを実行するインタープリターを指定する。

## `%` パーセント

*percent* パーセント、百分率記号

TODO

## <code>`</code> バックチック

*backtick*, *back quote*, *grave* バックチック、バッククォート、グレイブ、ちょん

- [Backtick - Wikipedia](https://en.wikipedia.org/wiki/Backtick)

TODO

## `^` キャレット

*caret*, *hat* キャレット、ハット、三角、とんがり

- [キャレット - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AC%E3%83%83%E3%83%88)

TODO

## `+` プラス

*plus* プラス、足す、足し算

TODO

## `<` 小なり

*less-than sign* 小なり、不等号

TODO

## `=` イコール

*equal* イコール、等号

TODO

### `key = value`

TODO

### `value == value`

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [等価 (==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Equality)

TODO

### `value === value`

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密等価 (===) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality)

TODO

### `() => value` アロー関数の一部

左側に引数、右側に関数の内容を書く。

```js
const f = (x) => x + 1;
```

TODO

## `>` 大なり

*greater-than sign* 大なり、不等号

→ `=>`

TODO

## `|` バー

*bar*, *vertical bar*, *pipe* バー、垂直バー、パイプ

TODO

### `value | value`

TODO

### `value |> xxx` パイプライン演算子

TODO

### `value || value`

TODO

### `key |= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

### `key ||= value` 代入演算子のひとつ

- [ECMAScript® 2023 Language Specification - 13.15 Assignment Operators](https://tc39.es/ecma262/#sec-assignment-operators)

TODO

## `~` チルダ

*tilde* チルダ、チルド、波線符号、波、にょろ

- [チルダ - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%AB%E3%83%80)

TODO

## `$` ダラー

*dollar* ダラー、ドル、お金

### `$key` 変数や関数の名前

- [ECMAScript® 2023 Language Specification - 12.6 Names and Keywords](https://tc39.es/ecma262/#sec-names-and-keywords)

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

### <code>&#96;${xxx}&#96;</code>

TODO

### `$0`, `$1`, ...

TODO

## その他

せっかくなので記号ではないが特殊な用途のものも紹介します。

### `0x00`, `0o00`, `0b00` 数値リテラルの一部（進数）

- [ECMAScript® 2023 Language Specification - 12.8.3 Numeric Literals](https://tc39.es/ecma262/#sec-literals-numeric-literals)

数値への接頭辞 `0x`, `0X` (HexIntegerLiteral) は 16 進数を意味する。同じく `0o`, `0O` (OctalIntegerLiteral) は 8 進数、`0b`, `0B` (BinaryIntegerLiteral) は 2 進数となる。

```js
const a = 0x10; // => 16
const b = 0o10; // => 8
const c = 0b10; // => 2
const d =   10; // => 10
```

### `0e0` 数値リテラルの一部（指数）

- [BigInt - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [ECMAScript® 2023 Language Specification - 12.8.3 Numeric Literals](https://tc39.es/ecma262/#sec-literals-numeric-literals)

例えば `3e2` のようにして指数を表現する。この場合は `3 * 10 ** 2` となる。

```js
const a = 1e0; // => 1
const b = 1e1; // => 10
const c = 1e2; // => 100
const d = 1e-1; // => 0.1

const pi = 314e-2; // => 3.14
```

### `function* () {}` ジェネレーター関数

- [ECMAScript® 2023 Language Specification - 15.5 Generator Function Definitions](https://tc39.es/ecma262/#sec-generator-function-definitions)

### `0n` 数値リテラルの一部（bigint）

- [ECMAScript® 2023 Language Specification - 12.8.3 Numeric Literals](https://tc39.es/ecma262/#sec-literals-numeric-literals)
- [BigInt - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

`123n` のように接尾辞を与えると、数値が bigint (BigInt) になる。通常の数値 number とは一部異なる。

```js
const a = 123 === 123n; // => false
```
