var λ = (function () {
    var λ = {};

    var sliceArgs = function (args) {
        return args.length > 0 ? [].slice.call(args, 0) : [];
    };

    λ.curry = function (func) {
        if (!func || typeof (func) !== "function") {
            throw "λ Error: No function to curry";
        }
        return function inner() {
            var _args = sliceArgs(arguments);
            if (_args.length === func.length) {
                return func.apply(null, _args);
            } else if (_args.length > func.length) {
                var initial = func.apply(null, _args);
                return λ.reduce(func, initial, _args.slice(func.length));
            } else {
                return function() {
                    var args = sliceArgs(arguments);
                    return inner.apply(null, _args.concat(args));
                };
            }
        };
    };

    λ.each = λ.curry(function (iterator, items) {
        if (!items || typeof (iterator) !== "function") {
            return;
        }
        for (var i = 0; i < items.length; i++) {
            iterator(items[i]);
        }
    });

    λ.map = λ.curry(function (iterator, items) {
        var mapped = [],
            mapEach;
        if (!items || typeof (iterator) !== "function") {
            return;
        }
        mapEach = λ.each(function () {
            mapped.push(iterator.apply(null, arguments));
        });
        mapEach(items);
        return mapped;
    });

    λ.reduce = λ.reducel = λ.curry(function (iterator, initial, items) {
        var cumulate = initial,
            reduceEach;
        if (!items || typeof (iterator) !== "function") {
            return;
        }
        reduceEach = λ.each(function (item) {
            cumulate = iterator.call(null, cumulate, item);
        });
        reduceEach(items);
        return cumulate;
    });

    λ.first = λ.curry(function (iterator, items) {
        var first;
        if (typeof (iterator) !== "function") {
            throw "λ Error: Invalid function";
        }
        λ.each(function (item) {
            if (!first && iterator.call(null, item)) {
                first = item;
            }
        }, items);
        return first;
    });

    λ.last = λ.curry(function (iterator, items) {
        var last;
        if (typeof (iterator) !== "function") {
            throw "λ Error: Invalid function";
        }
        λ.each(function (item) {
            if (iterator.call(null, item)) {
                last = item;
            }
        }, items);
        return last;
    });

    λ.any = λ.curry(function (iterator, items) {
        var anyEach, 
            isAny = false;
        if (typeof (iterator) !== "function") {
            throw "λ Error: Invalid function";
        }
        anyEach = λ.each(function (item) {
            if (iterator.call(null, item)) {
                isAny = true;
                return;
            }
        });
        anyEach(items);
        return isAny;
    });

    λ.select = λ.curry(function (iterator, items) {
        var filtered = [],
            filterEach;
        if (typeof (iterator) !== "function") {
            throw "λ Error: Invalid function";
        }
        filterEach = λ.each(function (item) {
            if (iterator.call(null, item)) {
                filtered.push(item);
            }
        });
        filterEach(items);
        return filtered;
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
        var truthy = [], 
            falsy = [],
            partitionEach;
        if (typeof (iterator) !== "function") {
            throw "λ Error: Invalid function";
        }
        partitionEach = λ.each(function (item) {
            (iterator.call(null, item) ? truthy : falsy).push(item);
        });
        partitionEach(items);
        return [truthy, falsy];
    });

    return λ;
})();

if (typeof (exports) !== "undefined") {
    if (typeof (module) !== "undefined" && module.exports) {
        exports = module.exports = λ;
    }
    exports.λ = λ;
}
