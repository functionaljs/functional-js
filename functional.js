var fjs = (function () {
    "use strict";

    var fjs = {}, hardReturn = "hardReturn;";

    var sliceArgs = function (args) {
        return args.length > 0 ? [].slice.call(args, 0) : [];
    };

    fjs.isFunction = function (obj) {
        return typeof (obj) === "function";
    };

    var checkFunction = function (func) {
        if (!fjs.isFunction(func)) {
            throw "fjs Error: Invalid function";
        }
    };

    fjs.curry = function (func) {
        checkFunction(func);
        return function inner() {
            var _args = sliceArgs(arguments);
            if (_args.length === func.length) {
                return func.apply(null, _args);
            } else if (_args.length > func.length) {
                var initial = func.apply(null, _args);
                return fjs.fold(func, initial, _args.slice(func.length));
            } else {
                return function() {
                    var args = sliceArgs(arguments);
                    return inner.apply(null, _args.concat(args));
                };
            }
        };
    };

    fjs.each = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        if (!fjs.exists(items) || !fjs.isArray(items)) {
            return;
        }
        for (var i = 0; i < items.length; i += 1) {
            if (iterator.call(null, items[i], i) === hardReturn) {
                return;
            }
        }
    });

    fjs.map = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var mapped = [];
        fjs.each(function () {
            mapped.push(iterator.apply(null, arguments));
        }, items);
        return mapped;
    });

    fjs.fold = fjs.foldl = fjs.curry(function (iterator, cumulate, items) {
        checkFunction(iterator);
        fjs.each(function (item) {
            cumulate = iterator.call(null, cumulate, item);
        }, items);
        return cumulate;
    });

    fjs.reduce = fjs.reducel = fjs.foldll = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var cumulate = items[0];
        items.shift();
        return fjs.fold(iterator, cumulate, items);
    });

    fjs.clone = function (items) {
        var clone = [];
        fjs.each(function (item) {
            clone.push(item);
        }, items);
        return clone;
    };

    fjs.first = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var first;
        fjs.each(function (item) {
            if (iterator.call(null, item)) {
                first = item;
                return hardReturn;
            }
        }, items);
        return first;
    });

    fjs.last = fjs.curry(function (iterator, items) {
        var itemsClone = fjs.clone(items);
        return fjs.first(iterator, itemsClone.reverse());
    });

    fjs.every = fjs.all = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var isEvery = true;
        fjs.each(function (item) {
            if (!iterator.call(null, item)) {
                isEvery = false;
                return hardReturn;
            }
        }, items);
        return isEvery;
    });

    fjs.any = fjs.contains = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var isAny = false;
        fjs.each(function (item) {
            if (iterator.call(null, item)) {
                isAny = true;
                return hardReturn;
            }
        }, items);
        return isAny;
    });

    fjs.select = fjs.filter = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var filtered = [];
        fjs.each(function (item) {
            if (iterator.call(null, item)) {
                filtered.push(item);
            }
        }, items);
        return filtered;
    });

    fjs.best = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var compare = function (arg1, arg2) {
            return iterator.call(this, arg1, arg2) ?
                arg1 : arg2;
        };
        return fjs.reduce(compare, items);
    });

    fjs.while = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var result = [];
        fjs.each(function (item) {
            if (iterator.call(null, item)) {
                result.push(item);
            } else {
                return hardReturn;
            }
        }, items);
        return result;
    });

    fjs.compose = function (funcs) {
        var anyInvalid = fjs.any(function (func) {
            return !fjs.isFunction(func);
        });
        funcs = sliceArgs(arguments);
        if (anyInvalid(funcs)) {
            throw "fjs Error: Invalid function to compose";
        }
        return function() {
            var args = arguments;
            var applyEach = fjs.each(function (func) {
                args = [func.apply(null, args)];
            });
            applyEach(funcs.reverse());
            return args[0];
        };
    };

    fjs.partition = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var truthy = [],
            falsy = [];
        fjs.each(function (item) {
            (iterator.call(null, item) ? truthy : falsy).push(item);
        }, items);
        return [truthy, falsy];
    });

    fjs.group = fjs.curry(function (iterator, items) {
        checkFunction(iterator);
        var result = {};
        var group;
        fjs.each(function (item) {
            group = iterator.call(null, item);
            result[group] = result[group] || [];
            result[group].push(item);
        }, items);
        return result;
    });

    fjs.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };

    fjs.toArray = function (obj) {
        return fjs.map(function (key) {
            return [key, obj[key]];
        }, Object.keys(obj));
    };

    fjs.apply = fjs.curry(function (func, items) {
        var args = [];
        if (fjs.isArray(func)) {
            args = [].slice.call(func, 1);
            func = func[0];
        }
        return fjs.map(function (item) {
            return item[func].apply(item, args);
        }, items);
    });

    fjs.assign = fjs.extend = fjs.curry(function (obj1, obj2) {
        fjs.each(function (key) {
            obj2[key] = obj1[key];
        }, Object.keys(obj1));
        return obj2;
    });

    fjs.prop = function (prop) {
        return function (obj) {
            return obj[prop];
        };
    };

    fjs.pluck = fjs.curry(function (prop, items) {
        return fjs.map(fjs.prop(prop), items);
    });

    fjs.exists = function (obj) {
        return obj != null; // jshint ignore:line
    };

    fjs.truthy = function (obj) {
        return fjs.exists(obj) && obj !== false;
    };

    fjs.falsy = function (obj) {
        return !fjs.truthy(obj);
    };

    return fjs;
})();

if (typeof (exports) !== "undefined") {
    if (typeof (module) !== "undefined" && module.exports) {
        exports = module.exports = fjs;
    }
    exports.fjs = fjs;
}
