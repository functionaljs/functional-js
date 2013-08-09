var λ = (function () {
    var λ = {};
    
    λ.curry = function (func) {
        if (!func || typeof (func) !== "function") {
            throw "λ Error: No function to curry";
        }
        // TODO actually analyse args and do the curry
        return func;
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