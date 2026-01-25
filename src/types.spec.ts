import { describe, it } from "vitest";
import { expectTypeOf } from "expect-type";
import { curry, map, filter, compose, fold } from "./index";

describe("Type tests", () => {
    it("curry should preserve function signature", () => {
        const add = curry((a: number, b: number) => a + b);
        expectTypeOf(add).toBeCallableWith(1, 2);
        expectTypeOf(add(1)).toBeFunction();
        expectTypeOf(add(1)(2)).toBeNumber();
    });

    it("map should infer correct types", () => {
        const double = (x: number) => x * 2;
        const result = map(double, [1, 2, 3]);
        expectTypeOf(result).toEqualTypeOf<number[]>();

        const curriedMap = map(double);
        expectTypeOf(curriedMap).toBeFunction();
        expectTypeOf(curriedMap([1, 2, 3])).toEqualTypeOf<number[]>();
    });

    it("filter should preserve array type", () => {
        const isEven = (x: number) => x % 2 === 0;
        const result = filter(isEven, [1, 2, 3, 4]);
        expectTypeOf(result).toEqualTypeOf<number[]>();
    });

    it("compose should infer return type", () => {
        const addOne = (x: number) => x + 1;
        const double = (x: number) => x * 2;
        const toString = (x: number) => String(x);

        const composed = compose(toString, double, addOne);
        expectTypeOf(composed).toBeFunction();
        expectTypeOf(composed).returns.toBeString();
    });

    it("fold should infer accumulator type", () => {
        const sum = (acc: number, x: number) => acc + x;
        const result = fold(sum, 0, [1, 2, 3]);
        expectTypeOf(result).toBeNumber();

        const concat = (acc: string, x: string) => acc + x;
        const stringResult = fold(concat, "", ["a", "b", "c"]);
        expectTypeOf(stringResult).toBeString();
    });
});
