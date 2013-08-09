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
    
    it("should λ.curry an addition function with multiple args and λ.curry the λ.curry", function() {
        var add = λ.curry(function(arg1, arg2, arg3) {
            return arg1 + arg2 + arg3;
        }); 

        var add3 = add(3);
        var add5 = add3(2);
        
        var result = add5(1);
        
        expect(result).toEqual(6);
    });
    
    it("should ignore any additional arguments when using λ.curry", function() {
        var add = λ.curry(function(arg1, arg2) {
            return arg1 + arg2;
        });

        var result = add(1, 2, 3);

        expect(result).toEqual(3);
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
    
    it("should be able to λ.curry λ.each", function() {
        var result = [],
            items = ["f", "u", "n", "c"];

        var addTo = function (item) {
            return result.push(item);
        };

        var addToResult = λ.each(addTo);
        expect(typeof (addToResult)).toEqual("function");
        
        addToResult(items);
        expect(result).toEqual(["f", "u", "n", "c"]);
    });
});