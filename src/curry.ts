import type { AnyFunction, CurriedFunction } from "./types";
import { isFunction } from "./typeChecks";

export function curry<T extends AnyFunction>(func: T): CurriedFunction<T> {
    if (!isFunction(func)) {
        throw new Error("fjs Error: Invalid function");
    }

    if (func.length === 2) {
        const curried2 = function (a: any, b?: any): any {
            if (arguments.length >= 2) {
                return func(a, b);
            }
            return (next: any) => curried2(a, next);
        };
        return curried2 as CurriedFunction<T>;
    }

    if (func.length === 3) {
        const curried3 = function (a: any, b?: any, c?: any): any {
            if (arguments.length >= 3) {
                return func(a, b, c);
            }
            if (arguments.length === 2) {
                return (next: any) => curried3(a, b, next);
            }
            return function (nextB: any, nextC?: any): any {
                if (arguments.length >= 2) {
                    return curried3(a, nextB, nextC);
                }
                return (next: any) => curried3(a, nextB, next);
            };
        };
        return curried3 as CurriedFunction<T>;
    }

    function curried(...args: any[]): any {
        if (args.length === 0) {
            return curried;
        }

        if (args.length >= func.length) {
            return func(...args.slice(0, func.length));
        }

        return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    }

    return curried as CurriedFunction<T>;
}
