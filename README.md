# functional.js (λ)

[![Build Status](https://travis-ci.org/leecrossley/functional-js.png?branch=master)](https://travis-ci.org/leecrossley/functional-js)

functional.js is (go on, guess) a functional js library. It facilitates [currying](http://en.wikipedia.org/wiki/Currying) and [point-free / tacit](http://en.wikipedia.org/wiki/Tacit_programming) programming in JavaScript.

### λ.curry example

```javascript
var concatenate = λ.curry(function(word1, word2) {
    return word1 + " " + word2;
}); 

var concatenateHello = concatenate("Hello");
var result = concatenateHello("World");

expect(result).toEqual("Hello World");
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