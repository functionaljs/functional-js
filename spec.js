/*global fjs*/

describe("functional", function() {

    it("should have a global fjs object", function() {
        expect(fjs).toBeDefined();
    });

    it("should throw an error calling fjs.curry with non function or expression", function() {
        var result1 = function () {
            fjs.curry();
        };
        var result2 = function () {
            fjs.curry(1);
        };

        expect(result1).toThrow("fjs Error: Invalid function");
        expect(result2).toThrow("fjs Error: Invalid function");
    });

    it("should fjs.curry a string concatenation function", function() {
        var concatenate = fjs.curry(function(word1, word2) {
            return word1 + " " + word2;
        });

        var concatenateHello = concatenate("Hello");
        var result = concatenateHello("World");

        expect(result).toEqual("Hello World");
    });

    it("should fjs.curry a string concatenation expression", function() {
        var concatenate = fjs.curry("a, b => a + b");

        var concatenateHello = concatenate("Hello");
        var result = concatenateHello("World");

        expect(result).toEqual("HelloWorld");
    });

    it("should fjs.curry an addition function with multiple args and fjs.curry the fjs.curry", function() {
        var add = fjs.curry(function(arg1, arg2, arg3) {
            return arg1 + arg2 + arg3;
        });

        var add3 = add(3),
            add5 = add3(2);

        expect(add(3)(2)(1)).toEqual(6);
        expect(add3(2, 1)).toEqual(6);
        expect(add3(2)(1)).toEqual(6);
        expect(add5(1)).toEqual(6);
    });

    it("should extend the arity using fjs.curry", function() {
        var add = fjs.curry(function(arg1, arg2) {
            return arg1 + arg2;
        });

        var add3 = add(3);

        expect(add(1, 2, 3)).toEqual(6);
        expect(add3(1, 2, 3, 4, 5)).toEqual(18);
    });

    it("should extend the arity using expression", function() {
        var add = fjs.curry("a, b => a + b");

        var add3 = add(3);

        expect(add(1, 2, 3)).toEqual(6);
        expect(add3(1, 2, 3, 4, 5)).toEqual(18);
    });

    it("should be able to add items to an array using fjs.each", function() {
        var result = [],
            items = ["f", "u", "n", "c"];

        var addTo = function (item) {
            return result.push(item);
        };

        fjs.each(addTo, items);

        expect(result).toEqual(items);
    });

    it("should be able to fjs.curry fjs.each", function() {
        var result = [],
            items = ["f", "u", "n", "c"];

        var addTo = function (item) {
            return result.push(item);
        };

        var addToResult = fjs.each(addTo);
        expect(fjs.isFunction(addToResult)).toBeTruthy();

        addToResult(items);
        expect(result).toEqual(["f", "u", "n", "c"]);
    });

    it("should handle null param to fjs.each", function() {
        var nothing = function (item) {
            return item;
        };

        var doNothing = fjs.each(nothing);

        var result = function () {
            doNothing(null);
        };

        expect(result).not.toThrow();
    });

    it("should be able to double numbers in an array using fjs.map", function() {
        var items = [1, 2, 3];

        var doubleUp = function (number) {
            return number * 2;
        };

        var result = fjs.map(doubleUp, items);

        expect(result).toEqual([2, 4, 6]);
    });

    it("should be able to fjs.curry fjs.map", function() {
        var items = [1, 2, 3];

        var doubleUp = function (number) {
            return number * 2;
        };

        var doubleMap = fjs.map(doubleUp);
        expect(fjs.isFunction(doubleMap)).toBeTruthy();

        var result = doubleMap(items);
        expect(result).toEqual([2, 4, 6]);
    });

    it("should be able to fjs.curry fjs.map expression", function() {
        var items = [1, 2, 3];

        var doubleMap = fjs.map("n => n * 2");

        var result = doubleMap(items);
        expect(result).toEqual([2, 4, 6]);
    });

    it("should be able to use fjs.reduce, fjs.reducel or fjs.foldll", function() {
        expect(fjs.reduce).toEqual(fjs.reducel);
        expect(fjs.reduce).toEqual(fjs.foldll);
    });

    it("should be able to cumulate an array of numbers using fjs.reduce", function() {
        var items = [1, 2, 3];

        var add = function (arg1, arg2) {
            return arg1 + arg2;
        };

        var result = fjs.reduce(add, items);
        expect(result).toEqual(6);
    });

    it("should be able to cumulate an array of strings using fjs.reduce", function() {
        var items = ["f", "u", "n", "c"];

        var concatenate = function (arg1, arg2) {
            return arg1 + arg2;
        };

        var result = fjs.reduce(concatenate, items);
        expect(result).toEqual("func");
    });

    it("should be able to fjs.curry fjs.reduce", function() {
        var items = [1, 2, 3];

        var multiply = function (arg1, arg2) {
            return arg1 * arg2;
        };

        var multiplyReduce = fjs.reduce(multiply);
        expect(fjs.isFunction(multiplyReduce)).toBeTruthy();

        var result = multiplyReduce(items);
        expect(result).toEqual(6);
    });

    it("should be able to fjs.curry fjs.reduce expression", function() {
        var items = [1, 2, 3];

        var multiply = function (arg1, arg2) {
            return arg1 * arg2;
        };

        var multiplyReduce = fjs.reduce("a, b => a * b");

        var result = multiplyReduce(items);
        expect(result).toEqual(6);
    });

    it("should be able to use fjs.fold or fjs.foldl", function() {
        expect(fjs.fold).toEqual(fjs.foldl);
    });

    it("should be able to fjs.curry fjs.fold", function() {
        var items = [1, 2, 3];

        var multiply = function (arg1, arg2) {
            return arg1 * arg2;
        };

        var multiplyFoldFrom10 = fjs.fold(multiply, 10);
        expect(fjs.isFunction(multiplyFoldFrom10)).toBeTruthy();

        var result = multiplyFoldFrom10(items);
        expect(result).toEqual(60);
    });

    it("should be able to fjs.curry fjs.best", function() {
        var items = [1, -4, 2, 3];

        var biggest = function (arg1, arg2) {
            return arg1 > arg2;
        };

        var smallest = function (arg1, arg2) {
            return arg1 < arg2;
        };

        var biggestAndBest = fjs.best(biggest);
        var bestSmallest = fjs.best(smallest);

        expect(fjs.isFunction(biggestAndBest)).toBeTruthy();
        expect(fjs.isFunction(bestSmallest)).toBeTruthy();

        expect(biggestAndBest(items)).toEqual(3);
        expect(bestSmallest(items)).toEqual(-4);
    });

    it("should be able to fjs.curry fjs.best to get the longest word", function() {
        var words = ["simply", "the", "best"];

        var longest = fjs.best(function (arg1, arg2) {
            return arg1.length > arg2.length;
        });

        expect(fjs.isFunction(longest)).toBeTruthy();

        expect(longest(words)).toEqual("simply");
    });

    it("should be able to fjs.curry fjs.while to get even numbers until odd", function() {
        var even = function (item) {
            return item % 2 === 0;
        };

        var whileEven = fjs.while(even);

        expect(whileEven([2])).toEqual([2]);
        expect(whileEven([2, 4, 5, 6])).toEqual([2, 4]);
        expect(whileEven([1, 4, 6, 8])).toEqual([]);
    });

    it("should be able to use fjs.any or fjs.contains", function() {
        expect(fjs.any).toEqual(fjs.contains);
    });

    it("should be able to fjs.curry fjs.any", function() {
        var items1 = [1, 2, 3],
            items2 = [1, 3, 5];

        var even = function (item) {
            return item % 2 === 0;
        };

        var anyEven = fjs.any(even);
        var containsEven = fjs.contains(even);

        expect(anyEven(items1)).toBeTruthy();
        expect(containsEven(items1)).toBeTruthy();
        expect(anyEven(items2)).not.toBeTruthy();
        expect(containsEven(items2)).not.toBeTruthy();
    });

    it("should be able to fjs.curry fjs.select", function() {
        var items = [1, 2, 3, 4, 5];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var selectEven = fjs.select(even);
        var selectOdd = fjs.select(odd);

        expect(selectEven(items)).toEqual([2, 4]);
        expect(selectOdd(items)).toEqual([1, 3, 5]);
    });

    it("should be able to fjs.clone an array and keep independence", function() {
        var items = [5, 4, 3, 2, 1];

        var clonedItems = fjs.clone(items);

        expect(clonedItems).toEqual(items);
        items = [];
        expect(clonedItems).not.toEqual(items);
    });

    it("should be able to fjs.curry fjs.first", function() {
        var items = [5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var firstEven = fjs.first(even);
        var firstOdd = fjs.first(odd);

        expect(firstEven(items)).toEqual(4);
        expect(firstOdd(items)).toEqual(5);
    });

    it("should be able to fjs.curry fjs.last", function() {
        var items = [5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var lastEven = fjs.last(even);
        var lastOdd = fjs.last(odd);

        expect(lastEven(items)).toEqual(2);
        expect(lastOdd(items)).toEqual(1);
    });

    it("should be able to fjs.curry fjs.every", function() {
        var items = [2, 4, 6, 8];

        var even = function (item) {
            return item % 2 === 0;
        };
        var odd = function (item) {
            return item % 2 !== 0;
        };

        var everyEven = fjs.every(even);
        var everyOdd = fjs.every(odd);

        expect(everyEven(items)).toEqual(true);
        expect(everyOdd(items)).toEqual(false);
    });

    it("should be able to use fjs.every or fjs.all", function() {
        expect(fjs.every).toEqual(fjs.all);
    });

    it("should throw an error attempting to fjs.compose anything that isn't a function", function() {
        var f = function (a) {
            return "hello " + a;
        };
        var g = 1;

        var result = function () {
            fjs.compose(f, g);
        };

        expect(result).toThrow("fjs Error: Invalid function to compose");
    });

    it("should be able to fjs.compose two functions", function() {
        var f = function (a) {
            return "hello " + a;
        };
        var g = function (a) {
            return a + 1;
        };
        var composed = fjs.compose(f, g);

        expect(composed(1)).toEqual("hello 2");
    });

    it("should be able to fjs.compose multiple functions", function() {
        var e = function (a) {
            return "hello " + a;
        };
        var f = function (a) {
            return a + 1;
        };
        var g = function (a) {
            return a * 100;
        };
        var composed = fjs.compose(e, f, g);

        expect(composed(2)).toEqual("hello 201");
    });

    it("should be able to fjs.partition an array of odd and even numbers", function() {
        var items = [1, 2, 3, 4, 5, 6, 7];

        var even = function (item) {
            return item % 2 === 0;
        };

        var result = fjs.partition(even, items);

        expect(result).toEqual([[2, 4, 6], [1, 3, 5, 7]]);
    });

    it("should be able to fjs.curry fjs.partition", function() {
        var items = [7, 6, 5, 4, 3, 2, 1];

        var even = function (item) {
            return item % 2 === 0;
        };

        var partitionEven = fjs.partition(even);

        var result = partitionEven(items);

        expect(result).toEqual([[6, 4, 2], [7, 5, 3, 1]]);
    });

    it("should be able to fjs.curry fjs.group", function() {
        var items = ["Lee", "Ryan", "Leona", "Sarah", "Rob", "Liam"];

        var firstLetter = function (item) {
            return item.charAt(0);
        };

        var groupFirstLetter = fjs.group(firstLetter);

        var result = groupFirstLetter(items);

        expect(result).toEqual({"L": [ "Lee", "Leona", "Liam" ],
            "R": [ "Ryan", "Rob" ], "S": [ "Sarah" ]});
    });

    it("should be able to fjs.curry fjs.pluck", function() {
        var items = [{
            "p1": "abc",
            "p2": false,
            "p3": 123
        }, {
            "p1": "cab",
            "p2": true,
            "p3": 312
        },{
            "p1": "bca",
            "p2": false,
            "p3": 231
        }];

        var pluck1 = fjs.pluck("p1");
        var result1 = pluck1(items);
        var pluck2 = fjs.pluck("p2");
        var result2 = pluck2(items);

        expect(result1).toEqual(["abc", "cab", "bca"]);
        expect(result2).toEqual([false, true, false]);
    });

    it("should convert an object to an array", function() {
        var obj = {
            "p1": "abc",
            "p2": false,
            "p3": null
        };

        var result = fjs.toArray(obj);

        expect(result).toEqual([["p1", "abc"], ["p2", false], ["p3", null]]);
        expect(fjs.isArray(obj)).toBeFalsy();
        expect(fjs.isArray(result)).toBeTruthy();
    });

    it("should be able to fjs.curry fjs.apply", function() {
        var items = ["Hello", "World"];

        var applyCase = fjs.apply("toUpperCase");

        var result = applyCase(items);

        expect(result).toEqual(["HELLO", "WORLD"]);
    });

    it("should be able to fjs.curry fjs.apply with additional argument", function() {
        var items = ["Hello", "World"];

        var applyIndexOf = fjs.apply(["indexOf", "o"]);

        var result = applyIndexOf(items);

        expect(result).toEqual([4, 1]);
    });

    it("should be able to fjs.curry fjs.apply with multiple arguments", function() {
        var items = ["Hello", "World"];

        var applyIndexOf = fjs.apply(["substring", "1", "4"]);

        var result = applyIndexOf(items);

        expect(result).toEqual(["ell", "orl"]);
    });

    it("should be able to use fjs.assign or fjs.extend", function() {
        expect(fjs.assign).toEqual(fjs.extend);
    });

    it("should be able to do a basic fjs.assign", function() {
        var obj1 = {
            prop1: "obj1prop1",
            prop2: "obj1prop2"
        };
        var obj2 = {
            prop2: "obj2prop2",
            prop3: "obj2prop3"
        };

        var result = fjs.assign(obj1, obj2);

        expect(result).toEqual({
            prop1: "obj1prop1",
            prop2: "obj1prop2",
            prop3: "obj2prop3"
        });
    });

    it("should be able to fjs.curry fjs.assign and extend the arity", function() {
        var obj1 = {
            prop1: "obj1prop1",
            prop2: "obj1prop2"
        };
        var obj2 = {
            prop2: "obj2prop2",
            prop3: "obj2prop3",
            prop4: "obj2prop4"
        };
        var obj3 = {
            prop4: "obj3prop4",
            prop5: "obj3prop5"
        };

        var assignToObj1 = fjs.assign(obj1);
        var result1 = assignToObj1(obj2, obj3);

        var result2 = fjs.assign(obj1, obj2, obj3);

        expect(result1).toEqual({
            prop1: "obj1prop1",
            prop2: "obj1prop2",
            prop3: "obj2prop3",
            prop4: "obj2prop4",
            prop5: "obj3prop5"
        });
        expect(result1).toEqual(result2);
    });

    it("should have correct return values for fjs.exists", function() {
        expect(fjs.exists(undefined)).toBeFalsy();
        expect(fjs.exists(null)).toBeFalsy();

        expect(fjs.exists(1)).toBeTruthy();
        expect(fjs.exists(-1)).toBeTruthy();
        expect(fjs.exists(0)).toBeTruthy();
        expect(fjs.exists("abc")).toBeTruthy();
        expect(fjs.exists("")).toBeTruthy();
        expect(fjs.exists(Number.MAX_VALUE)).toBeTruthy();
        expect(fjs.exists(Number.MIN_VALUE)).toBeTruthy();
        expect(fjs.exists(NaN)).toBeTruthy();
        expect(fjs.exists(0144)).toBeTruthy();
        expect(fjs.exists(0xFF)).toBeTruthy();
        expect(fjs.exists(0.1)).toBeTruthy();
        expect(fjs.exists(-0.1)).toBeTruthy();
        expect(fjs.exists(3e5)).toBeTruthy();
        expect(fjs.exists(true)).toBeTruthy();
        expect(fjs.exists(false)).toBeTruthy();
        expect(fjs.exists(Infinity)).toBeTruthy();
        expect(fjs.exists(Number.POSITIVE_INFINITY)).toBeTruthy();
        expect(fjs.exists(Number.NEGATIVE_INFINITY)).toBeTruthy();
        expect(fjs.exists(new Date())).toBeTruthy();
        expect(fjs.exists([])).toBeTruthy();
        expect(fjs.exists({})).toBeTruthy();
        expect(fjs.exists(function() { })).toBeTruthy();
    });

    it("should have correct return values for fjs.truthy", function() {
        expect(fjs.truthy(undefined)).toBeFalsy();
        expect(fjs.truthy(null)).toBeFalsy();
        expect(fjs.truthy(false)).toBeFalsy();

        expect(fjs.truthy(1)).toBeTruthy();
        expect(fjs.truthy(-1)).toBeTruthy();
        expect(fjs.truthy(0)).toBeTruthy();
        expect(fjs.truthy("abc")).toBeTruthy();
        expect(fjs.truthy("")).toBeTruthy();
        expect(fjs.truthy(Number.MAX_VALUE)).toBeTruthy();
        expect(fjs.truthy(Number.MIN_VALUE)).toBeTruthy();
        expect(fjs.truthy(NaN)).toBeTruthy();
        expect(fjs.truthy(0144)).toBeTruthy();
        expect(fjs.truthy(0xFF)).toBeTruthy();
        expect(fjs.truthy(0.1)).toBeTruthy();
        expect(fjs.truthy(-0.1)).toBeTruthy();
        expect(fjs.truthy(3e5)).toBeTruthy();
        expect(fjs.truthy(true)).toBeTruthy();
        expect(fjs.truthy(Infinity)).toBeTruthy();
        expect(fjs.truthy(Number.POSITIVE_INFINITY)).toBeTruthy();
        expect(fjs.truthy(Number.NEGATIVE_INFINITY)).toBeTruthy();
        expect(fjs.truthy(new Date())).toBeTruthy();
        expect(fjs.truthy([])).toBeTruthy();
        expect(fjs.truthy({})).toBeTruthy();
        expect(fjs.truthy(function() { })).toBeTruthy();
    });

    it("should have correct return values for fjs.falsy", function() {
        expect(fjs.falsy(undefined)).toBeTruthy();
        expect(fjs.falsy(null)).toBeTruthy();
        expect(fjs.falsy(false)).toBeTruthy();

        expect(fjs.falsy(1)).toBeFalsy();
        expect(fjs.falsy(-1)).toBeFalsy();
        expect(fjs.falsy(0)).toBeFalsy();
        expect(fjs.falsy("abc")).toBeFalsy();
        expect(fjs.falsy("")).toBeFalsy();
        expect(fjs.falsy(Number.MAX_VALUE)).toBeFalsy();
        expect(fjs.falsy(Number.MIN_VALUE)).toBeFalsy();
        expect(fjs.falsy(NaN)).toBeFalsy();
        expect(fjs.falsy(0144)).toBeFalsy();
        expect(fjs.falsy(0xFF)).toBeFalsy();
        expect(fjs.falsy(0.1)).toBeFalsy();
        expect(fjs.falsy(-0.1)).toBeFalsy();
        expect(fjs.falsy(3e5)).toBeFalsy();
        expect(fjs.falsy(true)).toBeFalsy();
        expect(fjs.falsy(Infinity)).toBeFalsy();
        expect(fjs.falsy(Number.POSITIVE_INFINITY)).toBeFalsy();
        expect(fjs.falsy(Number.NEGATIVE_INFINITY)).toBeFalsy();
        expect(fjs.falsy(new Date())).toBeFalsy();
        expect(fjs.falsy([])).toBeFalsy();
        expect(fjs.falsy({})).toBeFalsy();
        expect(fjs.falsy(function() { })).toBeFalsy();
    });

});
