describe("functional", function() {
    it("should have a global λ object", function() {
        expect(λ).toBeDefined();
    });
    
    it("should be able to add items to an array using λ.each", function() {
        var result = [],
            items = ["f", "u", "n", "c"];

        var addTo = function (item) {
            return result.push(item);
        };

        λ.each(addTo, items);
        
        expect(result).toEqual(items);
    });
});