# functional.js

[![Build Status](https://travis-ci.org/leecrossley/functional-js.png?branch=master)](https://travis-ci.org/leecrossley/functional-js)

functional.js is (go on, guess) a functional js library. It facilitates [currying](http://en.wikipedia.org/wiki/Currying) and [point-free / tacit](http://en.wikipedia.org/wiki/Tacit_programming) programming in JavaScript.

## Currying example using functional.js

```javascript
var concatenate = λ.curry(function(word1, word2) {
    return word1 + " " + word2;
}); 

var concatenateHello = concatenate("Hello");
var result = concatenateHello("World");

expect(result).toEqual("Hello World");
```