var λ = (function () {
    "use strict";
    var λ = {}, hardReturn = "hardReturn;";

    var sliceArgs = function (args) {
        return args.length > 0 ? [].slice.call(args, 0) : [];
    };

    var checkFunction = function (func) {
        if (!func || typeof (func) !== "function") {
            throw "λ Error: Invalid function";
        }
    };

    λ.curry = function (func) {
        checkFunction(func);
        return function inner() {
            var _args = sliceArgs(arguments);
            if (_args.length === func.length) {
                return func.apply(null, _args);
            } else if (_args.length > func.length) {
                var initial = func.apply(null, _args);
                return λ.fold(func, initial, _args.slice(func.length));
            } else {
                return function() {
                    var args = sliceArgs(arguments);
                    return inner.apply(null, _args.concat(args));
                };
            }
        };
    };

    λ.each = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        for (var i = 0; i < items.length; i++) {
            if (iterator.call(null, items[i], i) === hardReturn) {
                return;
            }
        }
    });

    λ.map = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var mapped = [];
        λ.each(function () {
            mapped.push(iterator.apply(null, arguments));
        }, items);
        return mapped;
    });

    λ.fold = λ.foldl = λ.curry(function (iterator, cumulate, items) {
        checkFunction(iterator);
        λ.each(function (item) {
            cumulate = iterator.call(null, cumulate, item);
        }, items);
        return cumulate;
    });

    λ.reduce = λ.reducel = λ.foldll = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var cumulate = items[0];
        items.shift();
        return λ.fold(iterator, cumulate, items);
    });

    λ.clone = function (items) {
        var clone = [];
        λ.each(function (item) {
            clone.push(item);
        }, items);
        return clone;
    };

    λ.first = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var first;
        λ.each(function (item) {
            if (iterator.call(null, item)) {
                first = item;
                return hardReturn;
            }
        }, items);
        return first;
    });

    λ.last = λ.curry(function (iterator, items) {
        var itemsClone = λ.clone(items);
        return λ.first(iterator, itemsClone.reverse());
    });

    λ.every = λ.all = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var isEvery = true;
        λ.each(function (item) {
            if (!iterator.call(null, item)) {
                isEvery = false;
                return hardReturn;
            }
        }, items);
        return isEvery;
    });

    λ.any = λ.contains = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var isAny = false;
        λ.each(function (item) {
            if (iterator.call(null, item)) {
                isAny = true;
                return hardReturn;
            }
        }, items);
        return isAny;
    });

    λ.select = λ.filter = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var filtered = [];
        λ.each(function (item) {
            if (iterator.call(null, item)) {
                filtered.push(item);
            }
        }, items);
        return filtered;
    });

    λ.best = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var compare = function (arg1, arg2) {
            return iterator.call(this, arg1, arg2) ?
                arg1 : arg2;
        };
        return λ.reduce(compare, items);
    });

    λ.while = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var result = [];
        λ.each(function (item) {
            if (iterator.call(null, item)) {
                result.push(item);
            } else {
                return hardReturn;
            }
        }, items);
        return result;
    });

    λ.compose = function (funcs) {
        var hasInvalid = λ.any(function (func) {
            return typeof (func) !== "function";
        });
        funcs = sliceArgs(arguments);
        if (hasInvalid(funcs)) {
            throw "λ Error: Invalid function to compose";
        }
        return function() {
            var args = arguments;
            var applyEach = λ.each(function (func) {
                args = [func.apply(null, args)];
            });
            applyEach(funcs.reverse());
            return args[0];
        };
    };

    λ.partition = λ.curry(function (iterator, items) {
        checkFunction(iterator);
        var truthy = [],
            falsy = [],
            partitionEach;
        partitionEach = λ.each(function (item) {
            (iterator.call(null, item) ? truthy : falsy).push(item);
        });
        partitionEach(items);
        return [truthy, falsy];
    });

    λ.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };

    λ.toArray = function (obj) {
        return λ.map(function (key) {
            return [key, obj[key]];
        }, Object.keys(obj));
    };

    λ.apply = λ.curry(function (func, items) {
        var args = [];
        if (λ.isArray(func)) {
            args = [].slice.call(func, 1);
            func = func[0];
        }
        return λ.map(function (item) {
            return item[func].apply(item, args);
        }, items);
    });

    λ.assign = λ.extend = λ.curry(function (obj1, obj2) {
        λ.each(function (key) {
            obj2[key] = obj1[key];
        }, Object.keys(obj1));
        return obj2;
    });

    λ.prop = function (prop) {
        return function (obj) {
            return obj[prop];
        };
    };

    λ.pluck = λ.curry(function (prop, items) {
        return λ.map(λ.prop(prop), items);
    });

    λ.exists = function (obj) {
        return obj != null; // jshint ignore:line
    };

    λ.truthy = function (obj) {
        return λ.exists(obj) && obj !== false;
    };

    λ.falsy = function (obj) {
        return !λ.truthy(obj);
    };

    return λ;
})();

if (typeof (exports) !== "undefined") {
    if (typeof (module) !== "undefined" && module.exports) {
        exports = module.exports = λ;
    }
    exports.λ = λ;
}
