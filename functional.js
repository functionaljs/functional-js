var λ = (function () {
    var λ = {};
    
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