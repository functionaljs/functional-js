# functional.js (fjs) [![Build Status](https://travis-ci.org/leecrossley/functional-js.png?branch=master)](https://travis-ci.org/leecrossley/functional-js) [![npm version](https://badge.fury.io/js/functional.js.png)](https://npmjs.org/package/functional.js) [![devDependency Status](https://david-dm.org/leecrossley/functional-js/dev-status.png)](https://david-dm.org/leecrossley/functional-js#info=devDependencies)

<img align="right" src="http://functionaljs.com/css/images/logo@2x.png">

**functional.js is a functional JavaScript library.**

It facilitates [currying](http://en.wikipedia.org/wiki/Currying) and [point-free / tacit](http://en.wikipedia.org/wiki/Tacit_programming) programming.

### Documentation

Visit [functionaljs.com](http://functionaljs.com/) for the full documentation.

### Curry function example

```javascript
var add = fjs.curry(function(arg1, arg2) {
    return arg1 + arg2;
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

## License

[MIT License](http://ilee.mit-license.org)
