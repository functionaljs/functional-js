import type { UnaryFn } from "./types";

export function pipe<A>(value: A): A;
export function pipe<A, B>(value: A, fn1: UnaryFn<A, B>): B;
export function pipe<A, B, C>(value: A, fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>): C;
export function pipe<A, B, C, D>(
    value: A,
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>
): D;
export function pipe<A, B, C, D, E>(
    value: A,
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>,
    fn4: UnaryFn<D, E>
): E;
export function pipe<A, B, C, D, E, F>(
    value: A,
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>,
    fn4: UnaryFn<D, E>,
    fn5: UnaryFn<E, F>
): F;
export function pipe(value: any, ...fns: UnaryFn<any, any>[]): any {
    let result = value;
    for (let i = 0; i < fns.length; i++) {
        result = fns[i]!(result);
    }
    return result;
}

export function flow<A, B>(fn1: UnaryFn<A, B>): UnaryFn<A, B>;
export function flow<A, B, C>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>): UnaryFn<A, C>;
export function flow<A, B, C, D>(
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>
): UnaryFn<A, D>;
export function flow<A, B, C, D, E>(
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>,
    fn4: UnaryFn<D, E>
): UnaryFn<A, E>;
export function flow<A, B, C, D, E, F>(
    fn1: UnaryFn<A, B>,
    fn2: UnaryFn<B, C>,
    fn3: UnaryFn<C, D>,
    fn4: UnaryFn<D, E>,
    fn5: UnaryFn<E, F>
): UnaryFn<A, F>;
export function flow(...fns: UnaryFn<any, any>[]): UnaryFn<any, any> {
    return (value: any) => {
        let result = value;
        for (let i = 0; i < fns.length; i++) {
            result = fns[i]!(result);
        }
        return result;
    };
}
