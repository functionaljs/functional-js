# functional.js (λ) [![Build Status](https://travis-ci.org/leecrossley/functional-js.png?branch=master)](https://travis-ci.org/leecrossley/functional-js) [![npm version](https://badge.fury.io/js/functional.js.png)](https://npmjs.org/package/functional.js) [![devDependency Status](https://david-dm.org/leecrossley/functional-js/dev-status.png)](https://david-dm.org/leecrossley/functional-js#info=devDependencies)

functional.js is a functional JavaScript library. It facilitates [currying](http://en.wikipedia.org/wiki/Currying) and [point-free / tacit](http://en.wikipedia.org/wiki/Tacit_programming) programming.


## Getting started

### Using npm

```
npm install functional.js
```

To then include functional.min.js in your app:

```
var λ = require("functional.js");
```

### Direct dependency

Download the minified version [here](http://bit.ly/funcmin), reference the js file and λ will become a global variable.

### Using client side

There are possible issues with using the "λ" character client side. There shouldn't be, but there are. If you experience issues, there is an alternative client version, functional.min.client.js which uses "lambda" instead of "λ". Download the minified client version [here](http://bit.ly/funcclient), reference the js file and lambda will become a global variable.

## Examples

### Basic λ.curry example

```javascript
var concatenate = λ.curry(function(word1, word2) {
    return word1 + " " + word2;
});

var concatenateHello = concatenate("Hello");
var result = concatenateHello("World");

expect(result).toEqual("Hello World");
```

### Another λ.curry example

```javascript
var add = λ.curry(function(arg1, arg2, arg3) {
    return arg1 + arg2 + arg3;
});

var add3 = add(3),
    add5 = add3(2);

expect(add(3)(2)(1)).toEqual(6);
expect(add3(2, 1)).toEqual(6);
expect(add3(2)(1)).toEqual(6);
expect(add5(1)).toEqual(6);
```

### Extending arity with λ.curry example

```javascript
var add = λ.curry(function(arg1, arg2) {
    return arg1 + arg2;
});

var add3 = add(3);

expect(add(1, 2, 3)).toEqual(6);
expect(add3(1, 2, 3, 4, 5)).toEqual(18);
```

### Curried λ.each example

```javascript
var result = [],
    items = ["f", "u", "n", "c"];

var addTo = function (item) {
    return result.push(item);
};

var addToResult = λ.each(addTo);
expect(typeof (addToResult)).toEqual("function");

addToResult(items);
expect(result).toEqual(["f", "u", "n", "c"]);
```

### Curried λ.map example

```javascript
var items = [1, 2, 3];

var doubleUp = function (number) {
    return number * 2;
};

var doubleMap = λ.map(doubleUp);
expect(typeof (doubleMap)).toEqual("function");

var result = doubleMap(items);
expect(result).toEqual([2, 4, 6]);
```

### Curried λ.reduce example

```javascript
var items = [1, 2, 3];

var multiply = function (arg1, arg2) {
    return arg1 * arg2;
};

var multiplyReduceFrom1 = λ.reduce(multiply, 1);
expect(typeof (multiplyReduceFrom1)).toEqual("function");

var result = multiplyReduceFrom1(items);
expect(result).toEqual(6);
```

### Curried λ.any example

```javascript
var items1 = [1, 2, 3],
    items2 = [1, 3, 5];

var even = function (item) {
    return item % 2 === 0;
};

var anyEven = λ.any(even);

expect(anyEven(items1)).toBeTruthy();
expect(anyEven(items2)).not.toBeTruthy();
```

### Curried λ.select example

```javascript
var items = [1, 2, 3, 4, 5];

var even = function (item) {
    return item % 2 === 0;
};
var odd = function (item) {
    return item % 2 !== 0;
};

var selectEven = λ.select(even);
var selectOdd = λ.select(odd);

expect(selectEven(items)).toEqual([2, 4]);
expect(selectOdd(items)).toEqual([1, 3, 5]);
```

### Curried λ.first example

```javascript
var items = [5, 4, 3, 2, 1];

var even = function (item) {
    return item % 2 === 0;
};
var odd = function (item) {
    return item % 2 !== 0;
};

var firstEven = λ.first(even);
var firstOdd = λ.first(odd);

expect(firstEven(items)).toEqual(2);
expect(firstOdd(items)).toEqual(1);
```

### Curried λ.last example

```javascript
var items = [5, 4, 3, 2, 1];

var even = function (item) {
    return item % 2 === 0;
};
var odd = function (item) {
    return item % 2 !== 0;
};

var lastEven = λ.last(even);
var lastOdd = λ.last(odd);

expect(lastEven(items)).toEqual(2);
expect(lastOdd(items)).toEqual(1);
```

### Curried λ.best example

```javascript
var words = ["simply", "the", "best"];

var longest = λ.best(function (arg1, arg2) {
    return arg1.length > arg2.length;
});

expect(typeof (longest)).toEqual("function");
expect(longest(words)).toEqual("simply");
```

### Curried λ.every example

```javascript
var items = [2, 4, 6, 8];

var even = function (item) {
    return item % 2 === 0;
};
var odd = function (item) {
    return item % 2 !== 0;
};

var everyEven = λ.every(even);
var everyOdd = λ.every(odd);

expect(everyEven(items)).toEqual(true);
expect(everyOdd(items)).toEqual(false);
```

### Multiple λ.compose example

```javascript
var e = function (a) {
    return "hello " + a;
};
var f = function (a) {
    return a + 1;
};
var g = function (a) {
    return a * 100;
};
var composed = λ.compose(e, f, g);

expect(composed(2)).toEqual("hello 201");
```

### Curried λ.partition example

```javascript
var items = [7, 6, 5, 4, 3, 2, 1];

var even = function (item) {
    return item % 2 === 0;
};

var partitionEven = λ.partition(even);

var result = partitionEven(items);

expect(result).toEqual([[6, 4, 2], [7, 5, 3, 1]]);
```

### λ.toArray example (featuring λ.isArray)

```javascript
var obj = {
    "p1": "abc",
    "p2": false,
    "p3": null
};

var result = λ.toArray(obj);

expect(result).toEqual([["p1", "abc"], ["p2", false], ["p3", null]]);
expect(λ.isArray(obj)).toBeFalsy();
expect(λ.isArray(result)).toBeTruthy();
```

### λ.apply example

```javascript
var items = ["Hello", "World"];

var applyCase = λ.apply("toUpperCase");

var result = applyCase(items);

expect(result).toEqual(["HELLO", "WORLD"]);
```

### λ.apply (multiple argument) example

```javascript
var items = ["Hello", "World"];

var applyIndexOf = λ.apply(["substring", "1", "4"]);

var result = applyIndexOf(items);

expect(result).toEqual(["ell", "orl"]);
```

### Basic λ.assign (λ.extend) example

```javascript
var obj1 = {
    prop1: "obj1prop1",
    prop2: "obj1prop2"
};
var obj2 = {
    prop2: "obj2prop2",
    prop3: "obj2prop3"
};

var result = λ.assign(obj1, obj2);

expect(result).toEqual({
    prop1: "obj1prop1",
    prop2: "obj1prop2",
    prop3: "obj2prop3"
});
```

### Extend λ.assign arity with λ.curry example

```javascript
var obj1 = {
    prop1: "obj1prop1",
    prop2: "obj1prop2"
};
var obj2 = {
    prop2: "obj2prop2",
    prop3: "obj2prop3",
    prop4: "obj2prop4"
};
var obj3 = {
    prop4: "obj3prop4",
    prop5: "obj3prop5"
};

var assignToObj1 = λ.assign(obj1);
var result1 = assignToObj1(obj2, obj3);

var result2 = λ.assign(obj1, obj2, obj3);

expect(result1).toEqual({
    prop1: "obj1prop1",
    prop2: "obj1prop2",
    prop3: "obj2prop3",
    prop4: "obj2prop4",
    prop5: "obj3prop5"
});
expect(result1).toEqual(result2);
```

### λ.pluck with λ.curry example

```javascript
var items = [{
    "p1": "abc",
    "p2": 123
}, {
    "p1": "cab",
    "p2": 312
},{
    "p1": "bca",
    "p2": 231
}];

var pluck1 = λ.pluck("p1");
var result1 = pluck1(items);

expect(result1).toEqual(["abc", "cab", "bca"]);
```

### λ.exists example

```javascript
expect(λ.exists(undefined)).toBeFalsy();
expect(λ.exists(null)).toBeFalsy();

expect(λ.exists(1)).toBeTruthy();
expect(λ.exists("abc")).toBeTruthy();
```

### λ.truthy example

```javascript
expect(λ.truthy(false)).toBeFalsy();
expect(λ.truthy(null)).toBeFalsy();

expect(λ.truthy(true)).toBeTruthy();
expect(λ.truthy("abc")).toBeTruthy();
```

### λ.falsy example

```javascript
expect(λ.falsy(false)).toBeTruthy();
expect(λ.falsy(null)).toBeTruthy();

expect(λ.falsy(true)).toBeFalsy();
expect(λ.falsy("abc")).toBeFalsy();
```

## License

[MIT License](http://ilee.mit-license.org)
