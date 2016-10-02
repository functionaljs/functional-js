# functional.js (fjs) [![Build Status](https://travis-ci.org/functionaljs/functional-js.png?branch=master)](https://travis-ci.org/functionaljs/functional-js) [![npm version](https://badge.fury.io/js/functional.js.png)](https://npmjs.org/package/functional.js) [![devDependency Status](https://david-dm.org/functionaljs/functional-js/dev-status.png)](https://david-dm.org/functionaljs/functional-js#info=devDependencies)

<img align="right" src="http://functionaljs.com/css/images/logo@2x.png">

**functional.js is a functional JavaScript library.**

It facilitates [currying](http://en.wikipedia.org/wiki/Currying) and [point-free / tacit](http://en.wikipedia.org/wiki/Tacit_programming) programming, with optional lambda expressions.

### Documentation

Visit [functionaljs.com](http://functionaljs.com/) for the full documentation including curry, each, map, reduce, fold, apply, every, any, select, pluck, toArray, first, last, best, partition, group, while and more.

### Curry function example

```javascript
var add = fjs.curry(function(a, b) {
    return a + b;
});

var add3 = add(3);

add(1, 2, 3); // => 6
add3(1, 2, 3, 4, 5); // => 18
```

### Curry expression example

```javascript
var add = fjs.curry("a, b => a + b");

var add3 = add(3);

add(1, 2, 3); // => 6
add3(1, 2, 3, 4, 5); // => 18
```

### Curry ES6 example

```javascript
const add = fjs.curry((a, b) => a + b);

const add3 = add(3);

add(1, 2, 3); // => 6
add3(1, 2, 3, 4, 5); // => 18
```

### Real world example

```javascript
var converter = fjs.curry(function(rate, symbol, input) {
    var output = input * rate;
    return symbol + output.toFixed(2);
});

var poundsToUSD = converter(1.52, "$");
var poundsToEUR = converter(1.27, "€");

poundsToUSD(100); // => "$152.00"
poundsToEUR(50); // => "€63.50"
```

## License

[MIT License](http://ilee.mit-license.org)
