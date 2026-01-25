import type { AnyFunction, CurriedFunction } from "./types";
import { isFunction } from "./typeChecks";

export function curry<T extends AnyFunction>(func: T): CurriedFunction<T> {
    if (!isFunction(func)) {
        throw new Error("fjs Error: Invalid function");
    }

    if (func.length === 2) {
        const curried2 = function (a: any, b?: any, ...rest: any[]): any {
            if (arguments.length >= 2) {
                if (rest.length === 0) {
                    return func(a, b);
                }
                let accumulated = func(a, b);
                for (let i = 0; i < rest.length; i++) {
                    accumulated = (func as AnyFunction)(accumulated, rest[i], i);
                }
                return accumulated;
            }
            return (next: any, ...more: any[]) => curried2(a, next, ...more);
        };
        return curried2 as CurriedFunction<T>;
    }

    if (func.length === 3) {
        const curried3 = function (a: any, b?: any, c?: any, ...rest: any[]): any {
            if (arguments.length >= 3) {
                if (rest.length === 0) {
                    return func(a, b, c);
                }
                let accumulated = func(a, b, c);
                for (let i = 0; i < rest.length; i++) {
                    accumulated = (func as AnyFunction)(accumulated, rest[i], i);
                }
                return accumulated;
            }
            if (arguments.length === 2) {
                return (next: any, ...more: any[]) => curried3(a, b, next, ...more);
            }
            return function (nextB: any, nextC?: any, ...more: any[]): any {
                if (arguments.length >= 2) {
                    return curried3(a, nextB, nextC, ...more);
                }
                return (next: any, ...moreNext: any[]) => curried3(a, nextB, next, ...moreNext);
            };
        };
        return curried3 as CurriedFunction<T>;
    }

    function curried(...args: any[]): any {
        if (args.length === 0) {
            return curried;
        }

        if (args.length >= func.length) {
            if (args.length === func.length) {
                return func(...args);
            }

            let accumulated = func(...args.slice(0, func.length));
            const remaining = args.slice(func.length);

            for (let i = 0; i < remaining.length; i++) {
                accumulated = (func as AnyFunction)(accumulated, remaining[i], i);
            }

            return accumulated;
        }

        return (...nextArgs: any[]) => curried(...args, ...nextArgs);
    }

    return curried as CurriedFunction<T>;
}
