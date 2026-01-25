import type { Curried2, Curried3, UnaryFn } from "./types";
import { curry } from "./curry";

export const mapAsync = curry(async <T, U>(
    fn: (value: T, index: number) => Promise<U>,
    items: T[]
): Promise<U[]> => {
    const length = items.length;
    const promises = new Array<Promise<U>>(length);
    for (let i = 0; i < length; i++) {
        promises[i] = fn(items[i]!, i);
    }
    return Promise.all(promises);
}) as unknown as Curried2<(value: any, index: number) => Promise<any>, any[], Promise<any[]>>;

export const filterAsync = curry(async <T>(
    predicate: (value: T, index: number) => Promise<boolean>,
    items: T[]
): Promise<T[]> => {
    const length = items.length;
    const promises = new Array<Promise<boolean>>(length);
    for (let i = 0; i < length; i++) {
        promises[i] = predicate(items[i]!, i);
    }
    const results = await Promise.all(promises);
    const filtered: T[] = [];
    for (let i = 0; i < length; i++) {
        if (results[i]) {
            filtered.push(items[i]!);
        }
    }
    return filtered;
}) as unknown as Curried2<(value: any, index: number) => Promise<boolean>, any[], Promise<any[]>>;

export const reduceAsync = curry(async <T>(
    fn: (accumulator: T, value: T, index: number) => Promise<T>,
    items: T[]
): Promise<T> => {
    if (!items || items.length === 0) {
        throw new Error("fjs Error: Cannot reduce empty array without initial value");
    }
    let accumulator: any = items[0]!;
    for (let i = 1; i < items.length; i++) {
        accumulator = (await fn(accumulator, items[i]!, i)) as T;
    }
    return accumulator;
}) as unknown as Curried2<(accumulator: any, value: any, index: number) => Promise<any>, any[], Promise<any>>;

export const foldAsync = curry(async <T, U>(
    fn: (accumulator: U, value: T, index: number) => Promise<U>,
    initial: U,
    items: T[]
): Promise<U> => {
    let accumulator = initial;
    for (let i = 0; i < items.length; i++) {
        accumulator = await fn(accumulator, items[i]!, i);
    }
    return accumulator;
}) as unknown as Curried3<
    (accumulator: any, value: any, index: number) => Promise<any>,
    any,
    any[],
    Promise<any>
>;

export function mapFilterReduceAsync<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R,
    items: T[]
): Promise<R>;
export function mapFilterReduceAsync<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R
): (items: T[]) => Promise<R>;
export function mapFilterReduceAsync<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R,
    items?: T[]
): Promise<R> | ((items: T[]) => Promise<R>) {
    if (arguments.length < 5) {
        return (next: T[]) => mapFilterReduceAsync(mapFn, filterFn, reduceFn, initial, next);
    }
    return (async () => {
        const input = items as T[];
        let accumulator = initial;
        for (let i = 0; i < input.length; i++) {
            const mapped = await mapFn(input[i]!, i);
            const keep = await filterFn(mapped, i);
            if (keep) {
                accumulator = await reduceFn(accumulator, mapped, i);
            }
        }
        return accumulator;
    })();
}

export function mapFilterReduceAsyncParallel<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R,
    items: T[]
): Promise<R>;
export function mapFilterReduceAsyncParallel<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R
): (items: T[]) => Promise<R>;
export function mapFilterReduceAsyncParallel<T, U, R>(
    mapFn: (value: T, index: number) => Promise<U> | U,
    filterFn: (value: U, index: number) => Promise<boolean> | boolean,
    reduceFn: (accumulator: R, value: U, index: number) => Promise<R> | R,
    initial: R,
    items?: T[]
): Promise<R> | ((items: T[]) => Promise<R>) {
    if (arguments.length < 5) {
        return (next: T[]) => mapFilterReduceAsyncParallel(mapFn, filterFn, reduceFn, initial, next);
    }
    return (async () => {
        const input = items as T[];
        const length = input.length;
        const mappedPromises = new Array<Promise<U>>(length);
        for (let i = 0; i < length; i++) {
            mappedPromises[i] = Promise.resolve(mapFn(input[i]!, i));
        }
        const mapped = await Promise.all(mappedPromises);
        const filterPromises = new Array<Promise<boolean>>(length);
        for (let i = 0; i < length; i++) {
            filterPromises[i] = Promise.resolve(filterFn(mapped[i]!, i));
        }
        const keep = await Promise.all(filterPromises);
        let accumulator = initial;
        for (let i = 0; i < length; i++) {
            if (keep[i]) {
                accumulator = await reduceFn(accumulator, mapped[i]!, i);
            }
        }
        return accumulator;
    })();
}

export const eachAsync = curry(async <T>(
    fn: (value: T, index: number) => Promise<void>,
    items: T[]
): Promise<void> => {
    for (let i = 0; i < items.length; i++) {
        await fn(items[i]!, i);
    }
}) as unknown as Curried2<(value: any, index: number) => Promise<void>, any[], Promise<void>>;

export async function pipeAsync<A>(value: A): Promise<A>;
export async function pipeAsync<A, B>(value: A, fn1: UnaryFn<A, Promise<B>>): Promise<B>;
export async function pipeAsync<A, B, C>(
    value: A,
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>
): Promise<C>;
export async function pipeAsync<A, B, C, D>(
    value: A,
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>,
    fn3: UnaryFn<C, Promise<D>>
): Promise<D>;
export async function pipeAsync<A, B, C, D, E>(
    value: A,
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>,
    fn3: UnaryFn<C, Promise<D>>,
    fn4: UnaryFn<D, Promise<E>>
): Promise<E>;
export async function pipeAsync(value: any, ...fns: UnaryFn<any, Promise<any>>[]): Promise<any> {
    let result = value;
    for (const fn of fns) {
        result = await fn(result);
    }
    return result;
}

export function flowAsync<A, B>(fn1: UnaryFn<A, Promise<B>>): UnaryFn<A, Promise<B>>;
export function flowAsync<A, B, C>(
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>
): UnaryFn<A, Promise<C>>;
export function flowAsync<A, B, C, D>(
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>,
    fn3: UnaryFn<C, Promise<D>>
): UnaryFn<A, Promise<D>>;
export function flowAsync<A, B, C, D, E>(
    fn1: UnaryFn<A, Promise<B>>,
    fn2: UnaryFn<B, Promise<C>>,
    fn3: UnaryFn<C, Promise<D>>,
    fn4: UnaryFn<D, Promise<E>>
): UnaryFn<A, Promise<E>>;
export function flowAsync(...fns: UnaryFn<any, Promise<any>>[]): UnaryFn<any, Promise<any>> {
    return async (value: any) => {
        let result = value;
        for (const fn of fns) {
            result = await fn(result);
        }
        return result;
    };
}

export const composeAsync = (...fns: UnaryFn<any, Promise<any>>[]): UnaryFn<any, Promise<any>> => {
    return async (value: any) => {
        let result = value;
        for (let i = fns.length - 1; i >= 0; i--) {
            result = await fns[i]!(result);
        }
        return result;
    };
};
