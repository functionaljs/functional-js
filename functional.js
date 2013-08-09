var λ = (function () {
    var λ = {};
    
    λ.curry = function (func) {
        if (!func || typeof (func) !== "function") {
            throw "λ Error: No function to curry";
        }
        return function inner() {
            var _args = arguments.length >= 1 ? [].slice.call(arguments, 0) : [];
            if (_args.length >= func.length) {
                return func.apply(null, _args);
            } else {
                return function() {
                    var args = arguments.length >= 1 ? [].slice.call(arguments, 0) : [];
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
    
    return λ;
})();