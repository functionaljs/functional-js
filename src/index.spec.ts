import { describe, it, expect } from "vitest";
import * as fjs from "./index";

describe("functional-js", () => {
    it("should export all functions", () => {
        expect(fjs).toBeDefined();
        expect(fjs.curry).toBeDefined();
        expect(fjs.compose).toBeDefined();
        expect(fjs.map).toBeDefined();
    });

    describe("curry", () => {
        it("should throw an error with non-function input", () => {
            expect(() => fjs.curry(undefined as any)).toThrow("fjs Error: Invalid function");
            expect(() => fjs.curry(1 as any)).toThrow("fjs Error: Invalid function");
        });

        it("should curry a string concatenation function", () => {
            const concatenate = fjs.curry((word1: string, word2: string) => word1 + " " + word2);
            const concatenateHello = concatenate("Hello");
            const result = concatenateHello("World");
            expect(result).toEqual("Hello World");
        });

        it("should curry an addition function with multiple args", () => {
            const add = fjs.curry((arg1: number, arg2: number, arg3: number) => arg1 + arg2 + arg3);
            const add3 = add(3);
            const add5 = add3(2);

            expect(add(3)(2)(1)).toEqual(6);
            expect(add3(2, 1)).toEqual(6);
            expect(add3(2)(1)).toEqual(6);
            expect(add5(1)).toEqual(6);
        });


        it("should ignore extra arguments beyond function arity", () => {
            const add = fjs.curry((a: number, b: number) => a + b);
            expect(add(1, 2)).toEqual(3);
            expect(add(1, 2, 999)).toEqual(3);
            expect(add(1, 2, 999, 888)).toEqual(3);
        });

        it("should ignore extra arguments for 3-arg functions", () => {
            const addAndMult = fjs.curry((x: number, y: number, z: number) => (x + y) * z);
            expect(addAndMult(2, 6, 3)).toEqual(24);
            expect(addAndMult(2, 6, 3, 1)).toEqual(24);
            expect(addAndMult(2, 6, 3, 1, 2)).toEqual(24);
            expect(addAndMult(2, 6, 3, 1, 2, 3)).toEqual(24);
        });

        it("should ignore extra arguments for n-arg functions", () => {
            const sum4 = fjs.curry((a: number, b: number, c: number, d: number) => a + b + c + d);
            expect(sum4(1, 2, 3, 4)).toEqual(10);
            expect(sum4(1, 2, 3, 4, 5)).toEqual(10);
            expect(sum4(1, 2, 3, 4, 5, 6, 7)).toEqual(10);
        });


        it("should curry 3-arg with partial two args", () => {
            const add3 = fjs.curry((a: number, b: number, c: number) => a + b + c);
            const add3Partial = add3(1, 2);
            expect(add3Partial(3)).toEqual(6);
        });

        it("should curry 4-arg with generic path", () => {
            const add4 = fjs.curry((a: number, b: number, c: number, d: number) => a + b + c + (d || 0));
            expect(add4(1, 2, 3, 4)).toEqual(10);
            expect(add4(1)(2)(3)(4)).toEqual(10);
        });

        it("should return function for zero-arg call in generic path", () => {
            const add4 = fjs.curry((a: number, b: number, c: number, d: number) => a + b + c + d);
            const result = add4();
            expect(fjs.isFunction(result)).toBeTruthy();
        });

        it("should return curried function when called with no args", () => {
            const add = fjs.curry((a: number, b: number) => a + b);
            const result = add();
            expect(fjs.isFunction(result)).toBeTruthy();
        });
    });

    describe("each", () => {
        it("should iterate over array items", () => {
            const result: string[] = [];
            const items = ["f", "u", "n", "c"];
            const addTo = (item: string) => result.push(item);

            fjs.each(addTo, items);
            expect(result).toEqual(items);
        });

        it("should be curryable", () => {
            const result: string[] = [];
            const items = ["f", "u", "n", "c"];
            const addTo = (item: string) => result.push(item);
            const addToResult = fjs.each(addTo);

            expect(fjs.isFunction(addToResult)).toBeTruthy();
            addToResult(items);
            expect(result).toEqual(["f", "u", "n", "c"]);
        });

        it("should handle null param", () => {
            const nothing = (item: any) => item;
            const doNothing = fjs.each(nothing);
            expect(() => doNothing(null as any)).not.toThrow();
        });

        it("should pass the current index", () => {
            const result: number[] = [];
            const items = ["f", "u", "n", "c"];
            fjs.each((_item, i) => result.push(i), items);
            expect(result).toEqual([0, 1, 2, 3]);
        });
    });

    describe("map", () => {
        it("should double numbers in an array", () => {
            const items = [1, 2, 3];
            const doubleUp = (number: number) => number * 2;
            const result = fjs.map(doubleUp, items);
            expect(result).toEqual([2, 4, 6]);
        });

        it("should be curryable", () => {
            const items = [1, 2, 3];
            const doubleUp = (number: number) => number * 2;
            const doubleMap = fjs.map(doubleUp);

            expect(fjs.isFunction(doubleMap)).toBeTruthy();
            const result = doubleMap(items);
            expect(result).toEqual([2, 4, 6]);
        });

        it("should use current index", () => {
            const items = [1, 2, 3];
            const timesIndex = (number: number, i: number) => number * i;
            const result = fjs.map(timesIndex, items);
            expect(result).toEqual([0, 2, 6]);
        });

        it("should handle non-array input", () => {
            const result = fjs.map((x: number) => x * 2, null as any);
            expect(result).toEqual([]);
        });
    });

    describe("reduce", () => {
        it("should have aliases", () => {
            expect(fjs.reduce).toEqual(fjs.reducel);
            expect(fjs.reduce).toEqual(fjs.foldll);
        });

        it("should cumulate an array of numbers", () => {
            const items = [1, 2, 3];
            const add = (arg1: number, arg2: number) => arg1 + arg2;
            const result = fjs.reduce(add, items);
            expect(result).toEqual(6);
        });

        it("should cumulate an array of strings", () => {
            const items = ["f", "u", "n", "c"];
            const concatenate = (arg1: string, arg2: string) => arg1 + arg2;
            const result = fjs.reduce(concatenate, items);
            expect(result).toEqual("func");
        });

        it("should use current index", () => {
            const items = [1, 2, 3, 4];
            const add = (arg1: number, arg2: number, i: number) => arg1 + arg2 + i;
            const result = fjs.reduce(add, items);
            expect(result).toEqual(13);
        });

        it("should be curryable", () => {
            const items = [1, 2, 3];
            const multiply = (arg1: number, arg2: number) => arg1 * arg2;
            const multiplyReduce = fjs.reduce(multiply);

            expect(fjs.isFunction(multiplyReduce)).toBeTruthy();
            const result = multiplyReduce(items);
            expect(result).toEqual(6);
        });
    });

    describe("fold", () => {
        it("should have alias", () => {
            expect(fjs.fold).toEqual(fjs.foldl);
        });

        it("should be curryable", () => {
            const items = [1, 2, 3];
            const multiply = (arg1: number, arg2: number) => arg1 * arg2;
            const multiplyFoldFrom10 = fjs.fold(multiply, 10);

            expect(fjs.isFunction(multiplyFoldFrom10)).toBeTruthy();
            const result = multiplyFoldFrom10(items);
            expect(result).toEqual(60);
        });

        it("should return initial value for non-array input", () => {
            const result = fjs.fold((acc: number, x: number) => acc + x, 10, null as any);
            expect(result).toEqual(10);
        });

        it("should allow curried two-step invocation", () => {
            const sum = (acc: number, x: number) => acc + x;
            const withInitial = fjs.fold(sum)(10);
            const result = withInitial([1, 2, 3]);
            expect(result).toEqual(16);
        });

        it("should allow curried direct invocation", () => {
            const sum = (acc: number, x: number) => acc + x;
            const result = fjs.fold(sum)(10, [1, 2, 3]);
            expect(result).toEqual(16);
        });
    });

    describe("best", () => {
        it("should be curryable", () => {
            const items = [1, -4, 2, 3];
            const biggest = (arg1: number, arg2: number) => arg1 > arg2;
            const smallest = (arg1: number, arg2: number) => arg1 < arg2;
            const biggestAndBest = fjs.best(biggest);
            const bestSmallest = fjs.best(smallest);

            expect(fjs.isFunction(biggestAndBest)).toBeTruthy();
            expect(fjs.isFunction(bestSmallest)).toBeTruthy();
            expect(biggestAndBest(items)).toEqual(3);
            expect(bestSmallest(items)).toEqual(-4);
        });

        it("should get the longest word", () => {
            const words = ["simply", "the", "best"];
            const longest = fjs.best((arg1: string, arg2: string) => arg1.length > arg2.length);

            expect(fjs.isFunction(longest)).toBeTruthy();
            expect(longest(words)).toEqual("simply");
        });
    });

    describe("whilst", () => {
        it("should get even numbers until odd", () => {
            const even = (item: number) => item % 2 === 0;
            const whileEven = fjs.whilst(even);

            expect(whileEven([2])).toEqual([2]);
            expect(whileEven([2, 4, 5, 6])).toEqual([2, 4]);
            expect(whileEven([1, 4, 6, 8])).toEqual([]);
        });
    });

    describe("any", () => {
        it("should have alias", () => {
            expect(fjs.any).toEqual(fjs.contains);
        });

        it("should be curryable", () => {
            const items1 = [1, 2, 3];
            const items2 = [1, 3, 5];
            const even = (item: number) => item % 2 === 0;
            const anyEven = fjs.any(even);
            const containsEven = fjs.contains(even);

            expect(anyEven(items1)).toBeTruthy();
            expect(containsEven(items1)).toBeTruthy();
            expect(anyEven(items2)).not.toBeTruthy();
            expect(containsEven(items2)).not.toBeTruthy();
        });
    });

    describe("select/filter", () => {
        it("should be curryable", () => {
            const items = [1, 2, 3, 4, 5];
            const even = (item: number) => item % 2 === 0;
            const odd = (item: number) => item % 2 !== 0;
            const selectEven = fjs.select(even);
            const selectOdd = fjs.select(odd);

            expect(selectEven(items)).toEqual([2, 4]);
            expect(selectOdd(items)).toEqual([1, 3, 5]);
        });

        it("should handle non-array input", () => {
            const result = fjs.filter((x: number) => x > 0, undefined as any);
            expect(result).toEqual([]);
        });

        it("should use predicate with index", () => {
            const result = fjs.filter((value: number, index: number) => value + index > 3, [
                1,
                2,
                3
            ]);
            expect(result).toEqual([3]);
        });
    });

    describe("clone", () => {
        it("should clone an array and keep independence", () => {
            const items = [5, 4, 3, 2, 1];
            const clonedItems = fjs.clone(items);

            expect(clonedItems).toEqual(items);
            items.length = 0;
            expect(clonedItems).not.toEqual(items);
        });

        it("should handle undefined input", () => {
            const result = fjs.clone(undefined as any);
            expect(result).toEqual([]);
        });
    });

    describe("first/head/take", () => {
        it("should have aliases", () => {
            expect(fjs.first).toEqual(fjs.head);
            expect(fjs.first).toEqual(fjs.take);
        });

        it("should be curryable", () => {
            const items = [5, 4, 3, 2, 1];
            const even = (item: number) => item % 2 === 0;
            const odd = (item: number) => item % 2 !== 0;
            const firstEven = fjs.first(even);
            const firstOdd = fjs.first(odd);

            expect(firstEven(items)).toEqual(4);
            expect(firstOdd(items)).toEqual(5);
        });
    });

    describe("rest/tail/drop", () => {
        it("should have aliases", () => {
            expect(fjs.rest).toEqual(fjs.tail);
            expect(fjs.rest).toEqual(fjs.drop);
        });

        it("should be curryable", () => {
            const items = [5, 4, 3, 2, 1];
            const even = (item: number) => item % 2 === 0;
            const odd = (item: number) => item % 2 !== 0;
            const restEven = fjs.rest(even);
            const restOdd = fjs.rest(odd);

            expect(restEven(items)).toEqual([2]);
            expect(restOdd(items)).toEqual([3, 1]);
        });
    });

    describe("last", () => {
        it("should be curryable", () => {
            const items = [5, 4, 3, 2, 1];
            const even = (item: number) => item % 2 === 0;
            const odd = (item: number) => item % 2 !== 0;
            const lastEven = fjs.last(even);
            const lastOdd = fjs.last(odd);

            expect(lastEven(items)).toEqual(2);
            expect(lastOdd(items)).toEqual(1);
        });
    });

    describe("every/all", () => {
        it("should have alias", () => {
            expect(fjs.every).toEqual(fjs.all);
        });

        it("should be curryable", () => {
            const items = [2, 4, 6, 8];
            const even = (item: number) => item % 2 === 0;
            const odd = (item: number) => item % 2 !== 0;
            const everyEven = fjs.every(even);
            const everyOdd = fjs.every(odd);

            expect(everyEven(items)).toEqual(true);
            expect(everyOdd(items)).toEqual(false);
        });
    });

    describe("compose", () => {
        it("should throw an error with non-function", () => {
            const f = (a: string) => "hello " + a;
            const g = 1;
            expect(() => fjs.compose(f as any, g as any)).toThrow(
                "fjs Error: Invalid function to compose"
            );
        });

        it("should compose two functions", () => {
            const f = (a: number) => "hello " + a;
            const g = (a: number) => a + 1;
            const composed = fjs.compose(f, g);

            expect(composed(1)).toEqual("hello 2");
        });

        it("should compose multiple functions", () => {
            const e = (a: number) => "hello " + a;
            const f = (a: number) => a + 1;
            const g = (a: number) => a * 100;
            const composed = fjs.compose(e, f, g);

            expect(composed(2)).toEqual("hello 201");
        });

        it("should return the same value when called with same argument", () => {
            const f = (a: number) => "hello " + a;
            const g = (a: number) => a + 1;
            const composed = fjs.compose(f, g);
            expect(composed(1)).toEqual(composed(1));
        });
    });

    describe("partition", () => {
        it("should partition odd and even numbers", () => {
            const items = [1, 2, 3, 4, 5, 6, 7];
            const even = (item: number) => item % 2 === 0;
            const result = fjs.partition(even, items);

            expect(result).toEqual([
                [2, 4, 6],
                [1, 3, 5, 7]
            ]);
        });

        it("should be curryable", () => {
            const items = [7, 6, 5, 4, 3, 2, 1];
            const even = (item: number) => item % 2 === 0;
            const partitionEven = fjs.partition(even);
            const result = partitionEven(items);

            expect(result).toEqual([
                [6, 4, 2],
                [7, 5, 3, 1]
            ]);
        });
    });

    describe("group", () => {
        it("should be curryable", () => {
            const items = ["Lee", "Ryan", "Leona", "Sarah", "Rob", "Liam"];
            const firstLetter = (item: string) => item.charAt(0);
            const groupFirstLetter = fjs.group(firstLetter);
            const result = groupFirstLetter(items);

            expect(result).toEqual({
                L: ["Lee", "Leona", "Liam"],
                R: ["Ryan", "Rob"],
                S: ["Sarah"]
            });
        });
    });

    describe("pluck", () => {
        it("should be curryable", () => {
            const items = [
                { p1: "abc", p2: false, p3: 123 },
                { p1: "cab", p2: true, p3: 312 },
                { p1: "bca", p2: false, p3: 231 }
            ];

            const pluck1 = fjs.pluck("p1");
            const result1 = pluck1(items);
            const pluck2 = fjs.pluck("p2");
            const result2 = pluck2(items);

            expect(result1).toEqual(["abc", "cab", "bca"]);
            expect(result2).toEqual([false, true, false]);
        });
    });

    describe("toArray", () => {
        it("should convert object to array", () => {
            const obj = { p1: "abc", p2: false, p3: null };
            const result = fjs.toArray(obj);

            expect(result).toEqual([
                ["p1", "abc"],
                ["p2", false],
                ["p3", null]
            ]);
            expect(fjs.isArray(obj)).toBeFalsy();
            expect(fjs.isArray(result)).toBeTruthy();
        });
    });

    describe("apply", () => {
        it("should be curryable", () => {
            const items = ["Hello", "World"];
            const applyCase = fjs.apply("toUpperCase");
            const result = applyCase(items);
            expect(result).toEqual(["HELLO", "WORLD"]);
        });

        it("should work with additional argument", () => {
            const items = ["Hello", "World"];
            const applyIndexOf = fjs.apply(["indexOf", "o"]);
            const result = applyIndexOf(items);
            expect(result).toEqual([4, 1]);
        });

        it("should work with multiple arguments", () => {
            const items = ["Hello", "World"];
            const applyIndexOf = fjs.apply(["substring", "1", "4"]);
            const result = applyIndexOf(items);
            expect(result).toEqual(["ell", "orl"]);
        });

        it("should return property value when not a function", () => {
            const items = ["Hello", "World"];
            const applyLength = fjs.apply("length");
            const result = applyLength(items);
            expect(result).toEqual([5, 5]);
        });
    });

    describe("assign/extend", () => {
        it("should have alias", () => {
            expect(fjs.assign).toEqual(fjs.extend);
        });

        it("should do basic assign", () => {
            const obj1 = { prop1: "obj1prop1", prop2: "obj1prop2" };
            const obj2 = { prop2: "obj2prop2", prop3: "obj2prop3" };
            const result = fjs.assign(obj1, obj2);

            expect(result).toEqual({
                prop1: "obj1prop1",
                prop2: "obj1prop2",
                prop3: "obj2prop3"
            });
        });

        it("should be curryable", () => {
            const obj1 = { prop1: "obj1prop1", prop2: "obj1prop2" };
            const obj2 = { prop2: "obj2prop2", prop3: "obj2prop3", prop4: "obj2prop4" };

            const assignToObj1 = fjs.assign(obj1);
            const result1 = assignToObj1(obj2);
            const result2 = fjs.assign(obj1, obj2);

            expect(result1).toEqual({
                prop1: "obj1prop1",
                prop2: "obj1prop2",
                prop3: "obj2prop3",
                prop4: "obj2prop4"
            });
            expect(result1).toEqual(result2);
        });
    });

    describe("nub/unique/distinct", () => {
        it("should have aliases", () => {
            expect(fjs.nub).toEqual(fjs.unique);
            expect(fjs.nub).toEqual(fjs.distinct);
        });

        it("should remove duplicate elements", () => {
            const base = ["John", "Jane", "Jane", "Jane", "Joe", "John", "Joe"];
            const expected = ["John", "Jane", "Joe"];
            const actual = fjs.nub((arg1: string, arg2: string) => arg1 === arg2, base);

            expect(actual).toEqual(expected);
        });

        it("should return one item for list of one", () => {
            const base = [1];
            const actual = fjs.nub((arg1: number, arg2: number) => arg1 === arg2, base);
            expect(actual).toEqual(base);
        });

        it("should return empty for empty list", () => {
            const empty: number[] = [];
            const actual = fjs.nub((arg1: number, arg2: number) => arg1 === arg2, empty);
            expect(actual).toEqual(empty);
        });

        it("should be curryable", () => {
            const base = [1, 2, 4, 5, 5, 5, 6, 7, 8, 8];
            const expected = [1, 2, 4, 5, 6, 7, 8];
            const nubByEquality = fjs.nub((arg1: number, arg2: number) => arg1 === arg2);
            const actual = nubByEquality(base);

            expect(actual).toEqual(expected);
        });

        it("should work with complex comparator", () => {
            const base = [
                { value1: 1, value2: 2 },
                { value1: 9, value2: 2 },
                { value1: 3, value2: 1 },
                { value1: 1, value2: 4 },
                { value1: 44, value2: 4 }
            ];
            const expected = [
                { value1: 1, value2: 2 },
                { value1: 3, value2: 1 },
                { value1: 1, value2: 4 }
            ];

            const actual = fjs.nub(
                (arg1: any, arg2: any) => arg1.value2 === arg2.value2,
                base
            );

            expect(actual).toEqual(expected);
        });

        it("should use strictEquals for fast path", () => {
            const base = [1, 2, 2, 3, 3];
            const actual = fjs.nub(fjs.strictEquals, base);
            expect(actual).toEqual([1, 2, 3]);
        });
    });

    describe("type checks", () => {
        describe("exists", () => {
            it("should have correct return values", () => {
                expect(fjs.exists(undefined)).toBeFalsy();
                expect(fjs.exists(null)).toBeFalsy();

                expect(fjs.exists(1)).toBeTruthy();
                expect(fjs.exists(-1)).toBeTruthy();
                expect(fjs.exists(0)).toBeTruthy();
                expect(fjs.exists("abc")).toBeTruthy();
                expect(fjs.exists("")).toBeTruthy();
                expect(fjs.exists(true)).toBeTruthy();
                expect(fjs.exists(false)).toBeTruthy();
                expect(fjs.exists([])).toBeTruthy();
                expect(fjs.exists({})).toBeTruthy();
                expect(fjs.exists(() => {})).toBeTruthy();
            });
        });

        describe("truthy", () => {
            it("should have correct return values", () => {
                expect(fjs.truthy(undefined)).toBeFalsy();
                expect(fjs.truthy(null)).toBeFalsy();
                expect(fjs.truthy(false)).toBeFalsy();

                expect(fjs.truthy(1)).toBeTruthy();
                expect(fjs.truthy(0)).toBeTruthy();
                expect(fjs.truthy("abc")).toBeTruthy();
                expect(fjs.truthy("")).toBeTruthy();
                expect(fjs.truthy(true)).toBeTruthy();
                expect(fjs.truthy([])).toBeTruthy();
                expect(fjs.truthy({})).toBeTruthy();
                expect(fjs.truthy(() => {})).toBeTruthy();
            });
        });

        describe("falsy", () => {
            it("should have correct return values", () => {
                expect(fjs.falsy(undefined)).toBeTruthy();
                expect(fjs.falsy(null)).toBeTruthy();
                expect(fjs.falsy(false)).toBeTruthy();

                expect(fjs.falsy(1)).toBeFalsy();
                expect(fjs.falsy(0)).toBeFalsy();
                expect(fjs.falsy("abc")).toBeFalsy();
                expect(fjs.falsy("")).toBeFalsy();
                expect(fjs.falsy(true)).toBeFalsy();
                expect(fjs.falsy([])).toBeFalsy();
                expect(fjs.falsy({})).toBeFalsy();
                expect(fjs.falsy(() => {})).toBeFalsy();
            });
        });
    });

    describe("reduce edge cases", () => {
        it("should throw on empty array without initial value", () => {
            expect(() => fjs.reduce((a: number, b: number) => a + b, [])).toThrow(
                "fjs Error: Cannot reduce empty array without initial value"
            );
        });
    });

    describe("filter/select uncurried usage", () => {
        it("should work with uncurried filter", () => {
            const isEven = (x: number) => x % 2 === 0;
            const result = fjs.filter(isEven, [1, 2, 3, 4, 5]);
            expect(result).toEqual([2, 4]);
        });

        it("should work with single-param filter on non-numeric arrays", () => {
            const isLong = (s: string) => s.length > 3;
            const result = fjs.filter(isLong, ["hi", "hello", "hey", "world"]);
            expect(result).toEqual(["hello", "world"]);
        });
    });

    describe("shuffle", () => {
        it("should return a new array", () => {
            const items = [1, 2, 3, 4];
            const result = fjs.shuffle(items);
            expect(result).toEqual(expect.arrayContaining(items));
            expect(result).not.toBe(items);
        });
    });

    describe("utilities", () => {
        it("should return identity", () => {
            expect(fjs.identity(5)).toEqual(5);
        });

        it("should return constant function", () => {
            const alwaysTrue = fjs.constant(true);
            expect(alwaysTrue()).toEqual(true);
        });

        it("should tap and return input", () => {
            let count = 0;
            const result = fjs.tap((value: number) => {
                count = value;
            })(10);
            expect(result).toEqual(10);
            expect(count).toEqual(10);
        });
    });

    describe("pipe and flow", () => {
        it("should pipe values left-to-right", () => {
            const result = fjs.pipe(
                2,
                (x: number) => x + 1,
                (x: number) => x * 3
            );
            expect(result).toEqual(9);
        });

        it("should flow functions left-to-right", () => {
            const fn = fjs.flow(
                (x: number) => x + 1,
                (x: number) => x * 3
            );
            expect(fn(2)).toEqual(9);
        });
    });

    describe("array ops", () => {
        it("should flatMap and chain", () => {
            const result = fjs.flatMap((x: number) => [x, x * 2], [1, 2, 3]);
            const chainResult = fjs.chain((x: number) => [x, x * 2], [1, 2]);
            expect(result).toEqual([1, 2, 2, 4, 3, 6]);
            expect(chainResult).toEqual([1, 2, 2, 4]);
        });

        it("should flatten nested arrays", () => {
            expect(fjs.flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
        });

        it("should zip and zipWith arrays", () => {
            expect(fjs.zip([1, 2], ["a", "b", "c"])).toEqual([
                [1, "a"],
                [2, "b"]
            ]);

            const result = fjs.zipWith(
                (a: number, b: number) => a + b,
                [1, 2],
                [10, 20, 30]
            );
            expect(result).toEqual([11, 22]);
        });

        it("should uniq and uniqBy", () => {
            expect(fjs.uniq([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
            const result = fjs.uniqBy((x: { id: number }) => x.id, [
                { id: 1, name: "a" },
                { id: 1, name: "b" },
                { id: 2, name: "c" }
            ]);
            expect(result).toEqual([
                { id: 1, name: "a" },
                { id: 2, name: "c" }
            ]);
        });

        it("should handle edge cases in flatMap", () => {
            const result = fjs.flatMap((x: number) => {
                if (x === 2) return null as any;
                if (x === 3) return undefined as any;
                if (x === 4) return 42 as any;
                return [x, x * 2];
            }, [1, 2, 3, 4, 5]);
            expect(result).toEqual([1, 2, 5, 10]);

            expect(fjs.flatMap((x: number) => [x], null as any)).toEqual([]);
            expect(fjs.flatMap((x: number) => [x], undefined as any)).toEqual([]);
        });

        it("should handle edge cases in flatten", () => {
            const result = fjs.flatten([
                [1, 2],
                null as any,
                undefined as any,
                42 as any,
                [3, 4]
            ]);
            expect(result).toEqual([1, 2, 3, 4]);

            expect(fjs.flatten(null as any)).toEqual([]);
            expect(fjs.flatten(undefined as any)).toEqual([]);
        });
    });

    describe("object ops", () => {
        it("should pick and omit keys", () => {
            const obj = { a: 1, b: 2, c: 3 };
            expect(fjs.pick(["a", "c"], obj)).toEqual({ a: 1, c: 3 });
            expect(fjs.omit(["b"], obj)).toEqual({ a: 1, c: 3 });
        });

        it("should get path and assoc/dissoc", () => {
            const nested = { user: { name: "Alice", age: 30 } };
            expect(fjs.path(["user", "name"], nested)).toEqual("Alice");
            expect(fjs.path(["user", "missing"], nested)).toBeUndefined();
            expect(fjs.path(["user"], null as any)).toBeUndefined();
            const updated = fjs.assoc("age", 31, nested.user);
            expect(updated).toEqual({ name: "Alice", age: 31 });
            expect(fjs.dissoc("age", updated)).toEqual({ name: "Alice" });
        });
    });

    describe("async utilities", () => {
        it("should map, filter, reduce, fold, and each asynchronously", async () => {
            const data = [1, 2, 3];
            const mapped = await fjs.mapAsync(async (x: number) => {
                await Promise.resolve();
                return x * 2;
            }, data);
            expect(mapped).toEqual([2, 4, 6]);

            const filtered = await fjs.filterAsync(async (x: number) => {
                await Promise.resolve();
                return x > 1;
            }, data);
            expect(filtered).toEqual([2, 3]);

            const reduced = await fjs.reduceAsync(async (acc: number, x: number) => {
                await Promise.resolve();
                return acc + x;
            }, data);
            expect(reduced).toEqual(6);

            const folded = await fjs.foldAsync(
                async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                },
                10,
                data
            );
            expect(folded).toEqual(16);

            let total = 0;
            await fjs.eachAsync(async (x: number) => {
                await Promise.resolve();
                total += x;
            }, data);
            expect(total).toEqual(6);
        });

        it("should map, filter, and reduce in a single async pipeline", async () => {
            const data = [1, 2, 3, 4];
            const result = await fjs.mapFilterReduceAsync(
                async (x: number) => {
                    await Promise.resolve();
                    return x * 2;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x > 4;
                },
                async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                },
                0,
                data
            );
            expect(result).toEqual(14);

            const pipeline = fjs.mapFilterReduceAsync(
                async (x: number) => {
                    await Promise.resolve();
                    return x * 2;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x > 4;
                },
                async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                },
                0
            );
            expect(await pipeline(data)).toEqual(14);
        });

        it("should map, filter, and reduce with parallel async pipeline", async () => {
            const data = [1, 2, 3, 4];
            const result = await fjs.mapFilterReduceAsyncParallel(
                async (x: number) => {
                    await Promise.resolve();
                    return x * 2;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x > 4;
                },
                async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                },
                0,
                data
            );
            expect(result).toEqual(14);

            const pipeline = fjs.mapFilterReduceAsyncParallel(
                async (x: number) => {
                    await Promise.resolve();
                    return x * 2;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x > 4;
                },
                async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                },
                0
            );
            expect(await pipeline(data)).toEqual(14);
        });

        it("should pipe and flow async functions", async () => {
            const result = await fjs.pipeAsync(
                2,
                async (x: number) => {
                    await Promise.resolve();
                    return x + 1;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x * 3;
                }
            );
            expect(result).toEqual(9);

            const fn = fjs.flowAsync(
                async (x: number) => {
                    await Promise.resolve();
                    return x + 1;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x * 3;
                }
            );
            expect(await fn(2)).toEqual(9);

            const composed = fjs.composeAsync(
                async (x: number) => {
                    await Promise.resolve();
                    return x + 1;
                },
                async (x: number) => {
                    await Promise.resolve();
                    return x * 3;
                }
            );
            expect(await composed(2)).toEqual(7);
        });

        it("should throw on reduceAsync with empty array", async () => {
            await expect(
                fjs.reduceAsync(async (acc: number, x: number) => {
                    await Promise.resolve();
                    return acc + x;
                }, [])
            ).rejects.toThrow("fjs Error: Cannot reduce empty array without initial value");
        });
    });

    describe("additional type checks", () => {
        it("should detect arguments and built-in types", () => {
            const isArgs = (function () {
                return fjs.isArguments(arguments);
            })();

            expect(isArgs).toBeTruthy();
            expect(fjs.isDate(new Date())).toBeTruthy();
            expect(fjs.isNumber(123)).toBeTruthy();
            expect(fjs.isRegExp(/a/)).toBeTruthy();
            expect(fjs.isString("abc")).toBeTruthy();
        });

        it("should detect objects and functions", () => {
            const fn = () => {};
            expect(fjs.isObject({})).toBeTruthy();
            expect(fjs.isObject(fn)).toBeTruthy();
        });
    });
});
