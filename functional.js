var λ = (function () {
    var λ = {};
    
    λ.curry = function (func) {
        if (!func || typeof (func) !== "function") {
            throw "λ Error: No function to curry";
        }
        return function() {
            var _args = arguments.length >= 1 ? [].slice.call(arguments, 0) : [];
            if (_args.length >= func.length) {
                return func.apply(this, _args);
            }
            return function() {
                var args, combinedArgs;
                args =  arguments.length >= 1 ? [].slice.call(arguments, 0) : [];
                combinedArgs = _args.concat(args);
                return func.apply(this, combinedArgs);
            };
        };
    };
    
    λ.each = function (iterator, items) {
        if (!items || typeof (iterator) !== "function") {
            return;
        }
        for (var i = 0; i < items.length; i++) {
            iterator(items[i]);
        }
    };
    
    return λ;
})();