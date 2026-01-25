import type { UnaryFn, AnyFunction } from "./types";
import { isFunction } from "./typeChecks";
import { any } from "./array";

export function compose<A>(f: UnaryFn<A, A>): UnaryFn<A, A>;
export function compose<A, B>(f: UnaryFn<B, A>, g: UnaryFn<A, B>): UnaryFn<A, A>;
export function compose<A, B, C>(
    f: UnaryFn<C, A>,
    g: UnaryFn<B, C>,
    h: UnaryFn<A, B>
): UnaryFn<A, A>;
export function compose<A, B, C, D>(
    f: UnaryFn<D, A>,
    g: UnaryFn<C, D>,
    h: UnaryFn<B, C>,
    i: UnaryFn<A, B>
): UnaryFn<A, A>;
export function compose(...funcs: UnaryFn<any, any>[]): UnaryFn<any, any>;
export function compose(...funcs: UnaryFn<any, any>[]): UnaryFn<any, any> {
    const anyInvalid = any((func: unknown) => !isFunction(func));
    const total = funcs.length;

    if (anyInvalid(funcs)) {
        throw new Error("fjs Error: Invalid function to compose");
    }

    return function (this: any, ...args: any[]) {
        let result: any = (funcs[total - 1] as AnyFunction).apply(this, args);
        for (let i = total - 2; i >= 0; i--) {
            result = (funcs[i] as AnyFunction).call(this, result);
        }
        return result;
    };
}
