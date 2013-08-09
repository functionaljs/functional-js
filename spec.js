describe("functional", function() {
    
    it("should have a global λ object", function() {
        expect(λ).toBeDefined();
    });
    
    it("should throw an error attempting to λ.curry anything that isn't a function", function() {
        var result1 = function () {
            λ.curry();
        };
        var result2 = function () {
            λ.curry("I am a string");
        };
        
        expect(result1).toThrow("λ Error: No function to curry");
        expect(result2).toThrow("λ Error: No function to curry");
    });
    
    it("should λ.curry a string concatenation function", function() {
        var concatenate = λ.curry(function(word1, word2) {
            return word1 + " " + word2;
        }); 

        var concatenateHello = concatenate("Hello");
        var result = concatenateHello("World");
        
        expect(result).toEqual("Hello World");
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