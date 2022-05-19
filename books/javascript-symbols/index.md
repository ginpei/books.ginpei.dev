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
  border-color: lightgray;
  border-style: solid solid none;
  border-width: thin;
}
  .searchResult-item:last-child {
    border-bottom-style: solid;
  }

.searchResult-itemLink {
  display: block;
  padding: 0.5em;
}
  .searchResult-itemLink:hover {
    background-color: #9ff1;
  }
</style>

# {{title}}

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

- [ECMAScript® 2023 Language Specification - 12 ECMAScript Language: Lexical Grammar](https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar)
- [ECMAScript® 2023 Language Specification - 12.2 White Space](https://tc39.es/ecma262/#sec-white-space)
- [ECMAScript® 2023 Language Specification - 12.3 Line Terminators](https://tc39.es/ecma262/#sec-line-terminators)
- [ECMAScript® 2023 Language Specification - 12.9 Automatic Semicolon Insertion](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)
- [字句文法 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Lexical_grammar)

トークンの区切りとして扱われる。ただのスペースの他タブやいくつかの空白文字を含み、いずれも差はない。

多くの場合は改行も同じような扱いで、つまり 1 行に全て書いても良いし全ての区切りで改行しても良い。インデントも任意。

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

ただし改行は、セミコロン `;`  の自動挿入関係で異なる解釈をされる場合がある。例えば非同期関数の `async` と `function` の間には空白が必要である。ここに改行を置くと、自動挿入の仕組みによりセミコロンがあると暗黙的に解釈されるため、`async` は構文ではなく変数等の識別子として解釈される。多くの場合その結果として参照エラーになる。（例：ReferenceError: async is not defined）

```js
// 👍
// 複数の空白を置いても問題ない
async           function asyncFunction() {}

// 👎
// 改行を置くとセミコロンが挿入され変数 `async` を参照する
// （参照するだけで何もしないが参照先がないとエラー）
async
      function ordinaryFunction() {}
```

特に `return` 後の改行に注意。`return` 直後にセミコロンが自動挿入され関数は `undefined` を返す。（先の例でも `return` と `a` の間で改行すると駄目。）　可読性のため改行したければ括弧で括ってから改行しよう。

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
```

アンダースコアで単語を区切る命名を[スネークケース](https://en.wikipedia.org/wiki/Snake_case)と呼ぶ。JavaScript では大文字で区切る[キャメルケース](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%A1%E3%83%AB%E3%82%B1%E3%83%BC%E3%82%B9)が一般的。

アンダースコアで始まる名前は外部からアクセスされたくないものに用いられることが多い。ただし言語的に制限はないので、人間が読んで「何かおかしいぞ」と判断する。また JavaScript エンジンが内部的に用意するプロパティは 2 つのアンダースコアを接頭辞とすることがある。（`__proto__` など。）

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
const a = 5 - - -1; // => 4
//          ^ ^ ^
//          | | └- 符号付き整数 `-1` のうち `-`
//          | └--- 単項マイナス演算子の `-`
//          └----- 引き算演算子の `-`
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

`--value` は `value -= 1` と同じと考えてよい。（近年は `-=` で代入を明示する方が好まれるように思う。）

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

## `,` カンマ

*comma* カンマ、コンマ

### `a, b` カンマ演算子

- [ECMAScript® 2023 Language Specification - 13.16 Comma Operator ( `,` )](https://tc39.es/ecma262/#sec-comma-operator)
- [カンマ演算子 (,) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Comma_Operator)

左辺を評価し、その後右辺を評価しその値を返す。

```js
const a = 1, 2 + 3, 4; // => 4
```

（minify 後のコードでにはよく出てくる程度で、普通使わないと思う。）

`for` 文の初期化式で使われることがある。（良いやり方ではないと思う。）

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

各種関数宣言における仮引数の区切り文字。

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

文の区切り（文と文の間に置く）ではなく文の一部であり本来必須だが、必要な箇所になければコードの解釈において自動挿入され、あるものとして扱われる場合がある。

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

（現代では `for` 文はそのほとんどの場面で [`for-of` 文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of)を使うべきだと思う。）

## `:` コロン

*colon* コロン

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

[`Boolean` コンストラクター](https://tc39.es/ecma262/#sec-boolean-objects)を関数として使うことで、この `!!` の代替とできる。（その方が明瞭で良いと思う。）

```js
const a = Boolean(1); // => true
```

### `value != value` 不等価演算子

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [不等価 (!=) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Inequality)

`!==` と同じようなもの。ただし左右の値をふわっと変換してよさげに比較する。

変換については `==` を参照。

（`==` と同様、使うのを避け厳密な比較を行うのが良いと思う。）

### `value !== value` 厳密不等価演算子

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密不等価 (!==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_inequality)

左右の値を比較して同じでなければ `true` 、そうでなければ `false` を返す。

比較については `===` を参照。

### `value!` non-null assertion

- [TypeScript: Documentation - Everyday Types - Non-null Assertion Operator (Postfix `!` )](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-)

JavaScript ではなく TypeScript の機能。nullable な値を非 nullable な値として扱う。API 境界を越えるなどの特殊な場合にのみ使う。

## `?` クエスチョン

*question* クエスチョン、疑問符、はてな

### `condition ? value : value` 条件演算子

- [条件 (三項) 演算子 - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [ECMAScript® 2023 Language Specification - 13.14 Conditional Operator ( `? :` )](https://tc39.es/ecma262/#sec-conditional-operator)

`<条件> ? <真の場合の評価値> : <偽の場合の評価値>` の形を取る。3 つの項を取る唯一の演算子なので「三項演算子」とも呼ばれる。

```js
const a = true ? 1 : 2; // => 1
const b = false ? 1 : 2; // => 2
```

### `value ?? value` Null 合体演算子

左辺が nullish 、つまり `null` か `undefined` である場合に左辺を、そうでなければ右辺を返す。 `?.` と組み合わせて利用する場面も多い。

```js
const a = null ?? 1; // => 1
const b = undefined ?? 1; // => 1
const c = 0 ?? 1; // => 0
const d = "" ?? 1; // => ""

const obj = { a: 1 };
const e = obj.a?.toFixed(2); ?? "0.00";
```

### `obj?.prop` オプショナルチェイン演算子

左辺が `null` または `undefined` でない場合、左辺を receiver として右辺で与えられるプロパティを返す。

```js
const obj = { a: 1 };

const a = obj.a?.toFixed(2); // => "1.00"
const b = obj.b?.toFixed(2); // => undefined
```

本来存在いないプロパティを利用すると参照エラーになる。

```js
// 得るだけは問題なし
const c = obj.b; // => undefined

// ⛔ 参照エラーになる
const d = obj.b.toFixed(2);
```

かつては `&&` を用いてこう書くことが多かった。

```js
const obj = { a: 1 };

const a = obj.a && obj.a.toFixed(2); // => "1.00"
const b = obj.b && obj.b.toFixed(2); // => undefined
```

2 文字でひとつの演算子なので、`? .` のように空白を挟むことはできない。

## `.` ドット

*dot*, *period*, *full stop* ドット、ピリオド、フルストップ、終止符、点

→ `?.`

### `0.0` 数値リテラルの一部（小数点）

`3.14` のようにして小数点となる。

`.` 部分の左右は省略可能で、`1.` ないし `.1` という表現も可能。ただし両方を省略した `.` だけでは駄目。

数値直後の `.` は小数点として扱われるため、Number のプロパティを `123.toString()` のように参照することはできない。代わりに `123..toString()` であれば `123.` までが数値、その次の `.` からがプロパティ参照となり利用可能。

### `{ ...obj }`, `[...arr]`, `f(...arr)` スプレッド構文

構文であり演算子ではない。

## `'`, `"` シングルクォート、ダブルクォート

*quote*, *single quote*, *double quote* クォート、シングルクォート、ダブルクォート、引用符、二重引用符

## `(`, `)` 丸括弧

*paren(s)*, *parenthesis (parentheses)* パーレン、丸括弧、小括弧

## `[`, `]` 角括弧

*square bracket(s)* スクウェアブラケット、角括弧、四角括弧

## `{`, `}` 波括弧

*bracket(s)* ブラケット、波括弧、にょろ括弧

## `@` アットマーク

*at*, *at sign* アットマーク、単価記号

## `*` アスタリスク

*asterisk*, *star* アスタリスク、スター、星

- [アスタリスク - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%82%B9%E3%82%BF%E3%83%AA%E3%82%B9%E3%82%AF)

### `value * value`
### `value ** value`

## `/` スラッシュ

*slash*, *forward slash* スラッシュ、前方スラッシュ

### `value / value`
### `/xxx/` 正規表現
### `/*`, `*/` 複数行コメント

- [ECMAScript® 2023 Language Specification - 12.4 Comments](https://tc39.es/ecma262/#sec-comments)

### `// xxx` 一行コメント

- [ECMAScript® 2023 Language Specification - 12.4 Comments](https://tc39.es/ecma262/#sec-comments)

## `\` バックスラッシュ

*backslash* バックスラッシュ、後方スラッシュ

### `"\n"`, `"\r"` 改行文字

- [ECMAScript® 2023 Language Specification - Table 73: JSON Single Character Escape Sequences](https://tc39.es/ecma262/#table-json-single-character-escapes)
- [改行コード - Wikipedia](https://ja.wikipedia.org/wiki/%E6%94%B9%E8%A1%8C%E3%82%B3%E3%83%BC%E3%83%89)
- [キャリッジ・リターン - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AA%E3%83%83%E3%82%B8%E3%83%BB%E3%83%AA%E3%82%BF%E3%83%BC%E3%83%B3)

`"\n"` はラインフィード LINE FEED (LF) 、`"\r"` はキャリッジリターン CARRIAGE RETURN (CR) 。（通常 `"\n"` のみを使うと思う。）

CR は、本来は改行ではなく同じ行の先頭へ戻るコード。（どうやら Return キーの語源である。）　Node.js で利用できるかもしれない。

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

## `&` アンパサンド

*ampersand*, *and* アンパサンド、アンド

- [アンパサンド - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%B3%E3%83%91%E3%82%B5%E3%83%B3%E3%83%89)

### `value & value`
### `value && value`
### `&xxx;` 実態参照

JavaScript ではなく HTML。

## `#` 番号記号

*number sign*, *hash*, *sharp sign* 番号記号、ナンバー、ハッシュ、シャープ（音楽のシャープ ♯ は傾きが異なる。）

## `%` パーセント

*percent* パーセント、百分率記号

## <code>`</code> バックチック

*backtick*, *back quote*, *grave* バックチック、バッククォート、グレイブ、ちょん

- [Backtick - Wikipedia](https://en.wikipedia.org/wiki/Backtick)

## `^` キャレット

*caret*, *hat* キャレット、ハット、三角、とんがり

- [キャレット - Wikipedia](https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%A3%E3%83%AC%E3%83%83%E3%83%88)

## `+` プラス

*plus* プラス、足す、足し算

## `<` 小なり

*less-than sign* 小なり、不等号

## `=` イコール

*equal* イコール、等号

### `key = value`

### `value == value`

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [等価 (==) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Equality)

### `value === value`

- [ECMAScript® 2023 Language Specification - 13.11 Equality Operators](https://tc39.es/ecma262/#sec-equality-operators)
- [厳密等価 (===) - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Strict_equality)

### `() => value` アロー関数の一部

左側に引数、右側に関数の内容を書く。

```js
const f = (x) => x + 1;
```

## `>` 大なり

*greater-than sign* 大なり、不等号

→ `=>`

## `|` バー

*bar*, *vertical bar*, *pipe* バー、垂直バー、パイプ

### `value | value`
### `value |> xxx` パイプライン演算子
### `value || value`

## `~` チルダ

*tilde* チルダ、チルド、波線符号、波、にょろ

- [チルダ - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%AB%E3%83%80)

## `$` ダラー

*dollar* ダラー、ドル、お金

### `$key` 変数や関数の名前

- [ECMAScript® 2023 Language Specification - 12.6 Names and Keywords](https://tc39.es/ecma262/#sec-names-and-keywords)

変数や関数の名前として利用できる。特に意味はなく他の文字 `abc` やアンダースコア `_` と同じ。名前の先頭でも利用可能。

```js
const $name = document.querySelector("#name");

const cache$12345 = {};
```

（機械的に生成されるものの命名に用いる文化があると聞いたことがあるがどうだろうか。）

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
### `$0`, `$1`, ...

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
