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

        expect(result1).toThrow("λ Error: Invalid function");
        expect(result2).toThrow("λ Error: Invalid function");
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

        var add3 = add(3),
            add5 = add3(2);

        expect(add(3)(2)(1)).toEqual(6);
        expect(add3(2, 1)).toEqual(6);
        expect(add3(2)(1)).toEqual(6);
        expect(add5(1)).toEqual(6);
    });

    it("should extend the arity using λ.curry", function() {
        var add = λ.curry(function(arg1, arg2) {
            return arg1 + arg2;
        });

        var add3 = add(3);

        expect(add(1, 2, 3)).toEqual(6);
        expect(add3(1, 2, 3, 4, 5)).toEqual(18);
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

    it("should be able to double numbers in an array using λ.map", function() {
        var items = [1, 2, 3];

        var doubleUp = function (number) {
            return number * 2;
        };

        var result = λ.map(doubleUp, items);

        expect(result).toEqual([2, 4, 6]);
    });

    it("should be able to λ.curry λ.map", function() {
        var items = [1, 2, 3];

        var doubleUp = function (number) {
            return number * 2;
        };

        var doubleMap = λ.map(doubleUp);
        expect(typeof (doubleMap)).toEqual("function");

        var result = doubleMap(items);
        expect(result).toEqual([2, 4, 6]);
    });

    it("should be able to use λ.reduce or λ.reducel", function() {
        expect(λ.reduce).toEqual(λ.reducel);
    });

    it("should be able to cumulate an array of numbers using λ.reduce", function() {
        var items = [1, 2, 3];

        var add = function (arg1, arg2) {
            return arg1 + arg2;
        };

        var result = λ.reduce(add, 0, items);
        expect(result).toEqual(6);
    });

    it("should be able to cumulate an array of strings using λ.reduce", function() {
        var items = ["f", "u", "n", "c"];

        var concatenate = function (arg1, arg2) {
            return arg1 + arg2;
        };

        var result = λ.reduce(concatenate, "", items);
        expect(result).toEqual("func");
    });

    it("should be able to λ.curry λ.reduce", function() {
        var items = [1, 2, 3];

        var multiply = function (arg1, arg2) {
            return arg1 * arg2;
        };

        var multiplyReduceFrom1 = λ.reduce(multiply, 1);
        expect(typeof (multiplyReduceFrom1)).toEqual("function");

        var result = multiplyReduceFrom1(items);
        expect(result).toEqual(6);
    });

    it("should be able to use λ.any or λ.contains", function() {
        expect(λ.any).toEqual(λ.contains);
    });

    it("should be able to λ.curry λ.any", function() {
        var items1 = [1, 2, 3],
            items2 = [1, 3, 5];

        var even = function (item) {
            return item % 2 === 0;
        };

        var anyEven = λ.any(even);
        var containsEven = λ.contains(even);

        expect(anyEven(items1)).toBeTruthy();
        expect(containsEven(items1)).toBeTruthy();
        expect(anyEven(items2)).not.toBeTruthy();
        expect(containsEven(items2)).not.toBeTruthy();
    });

    it("should be able to λ.curry λ.select", function() {
        var items = [1, 2, 3, 4, 5];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var selectEven = λ.select(even);
        var selectOdd = λ.select(odd);

        expect(selectEven(items)).toEqual([2, 4]);
        expect(selectOdd(items)).toEqual([1, 3, 5]);
    });

    it("should be able to λ.clone an array and keep independence", function() {
        var items = [5, 4, 3, 2, 1];

        var clonedItems = λ.clone(items);

        expect(clonedItems).toEqual(items);
        items = [];
        expect(clonedItems).not.toEqual(items);
    });

    it("should be able to λ.curry λ.first", function() {
        var items = [5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var firstEven = λ.first(even);
        var firstOdd = λ.first(odd);

        expect(firstEven(items)).toEqual(4);
        expect(firstOdd(items)).toEqual(5);
    });

    it("should be able to λ.curry λ.last", function() {
        var items = [5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var lastEven = λ.last(even);
        var lastOdd = λ.last(odd);

        expect(lastEven(items)).toEqual(2);
        expect(lastOdd(items)).toEqual(1);
    });

    it("should be able to λ.curry λ.every", function() {
        var items = [2, 4, 6, 8];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var everyEven = λ.every(even);
        var everyOdd = λ.every(odd);

        expect(everyEven(items)).toEqual(true);
        expect(everyOdd(items)).toEqual(false);
    });

    it("should be able to use λ.every or λ.all", function() {
        expect(λ.every).toEqual(λ.all);
    });

    it("should throw an error attempting to λ.compose anything that isn't a function", function() {
        var f = function (a) {
            return "hello " + a;
        };
        var g = 1;

        var result = function () {
            λ.compose(f, g);
        };

        expect(result).toThrow("λ Error: Invalid function to compose");
    });

    it("should be able to λ.compose two functions", function() {
        var f = function (a) {
            return "hello " + a;
        };
        var g = function (a) {
            return a + 1;
        };
        var composed = λ.compose(f, g);

        expect(composed(1)).toEqual("hello 2");
    });

    it("should be able to λ.compose multiple functions", function() {
        var e = function (a) {
            return "hello " + a;
        };
        var f = function (a) {
            return a + 1;
        };
        var g = function (a) {
            return a * 100;
        };
        var composed = λ.compose(e, f, g);

        expect(composed(2)).toEqual("hello 201");
    });

    it("should be able to λ.partition an array of odd and even numbers", function() {
        var items = [1, 2, 3, 4, 5, 6, 7];

        var even = function (item) {
            return item % 2 === 0;
        };

        var result = λ.partition(even, items);

        expect(result).toEqual([[2, 4, 6], [1, 3, 5, 7]]);
    });

    it("should be able to λ.curry λ.partition", function() {
        var items = [7, 6, 5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };
        
        var partitionEven = λ.partition(even);

        var result = partitionEven(items);

        expect(result).toEqual([[6, 4, 2], [7, 5, 3, 1]]);
    });

    it("should convert an object to an array", function() {
        var obj = {
            "p1": "abc",
            "p2": false,
            "p3": null
        };

        var result = λ.toArray(obj);

        expect(result).toEqual([["p1", "abc"], ["p2", false], ["p3", null]]);
        expect(λ.isArray(obj)).toBeFalsy();
        expect(λ.isArray(result)).toBeTruthy();
    });

    it("should be able to λ.curry λ.apply", function() {
        var items = ["Hello", "World"];

        var applyCase = λ.apply("toUpperCase");

        var result = applyCase(items);

        expect(result).toEqual(["HELLO", "WORLD"]);
    });

    it("should be able to λ.curry λ.apply with additional argument", function() {
        var items = ["Hello", "World"];

        var applyIndexOf = λ.apply(["indexOf", "o"]);

        var result = applyIndexOf(items);

        expect(result).toEqual([4, 1]);
    });

    it("should be able to λ.curry λ.apply with multiple arguments", function() {
        var items = ["Hello", "World"];

        var applyIndexOf = λ.apply(["substring", "1", "4"]);

        var result = applyIndexOf(items);

        expect(result).toEqual(["ell", "orl"]);
    });

});