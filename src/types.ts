export type Predicate<T> = {
    bivarianceHack(value: T, index: number): boolean;
}["bivarianceHack"];

export type Comparator<T> = (a: T, b: T) => boolean;

export type Mapper<T, U> = (value: T, index: number) => U;

export type Reducer<T, U> = (accumulator: U, value: T, index: number) => U;

export type UnaryFn<T, U> = (arg: T) => U;

export type Curried2<A, B, R> = {
    (): Curried2<A, B, R>;
    (a: A): (b: B, ...rest: any[]) => R;
    (a: A, b: B, ...rest: any[]): R;
};

export type Curried3<A, B, C, R> = {
    (): Curried3<A, B, C, R>;
    (a: A): Curried2<B, C, R>;
    (a: A, b: B): (c: C, ...rest: any[]) => R;
    (a: A, b: B, c: C, ...rest: any[]): R;
};

export type Curried4<A, B, C, D, R> = {
    (): Curried4<A, B, C, D, R>;
    (a: A): Curried3<B, C, D, R>;
    (a: A, b: B): Curried2<C, D, R>;
    (a: A, b: B, c: C): (d: D, ...rest: any[]) => R;
    (a: A, b: B, c: C, d: D, ...rest: any[]): R;
};

export type AnyFunction = (...args: any[]) => any;

export type CurriedFunction<T extends AnyFunction> = T extends (
    a: infer A,
    b: infer B,
    c: infer C,
    d: infer D
) => infer R
    ? Curried4<A, B, C, D, R>
    : T extends (a: infer A, b: infer B, c: infer C) => infer R
    ? Curried3<A, B, C, R>
    : T extends (a: infer A, b: infer B) => infer R
    ? Curried2<A, B, R>
    : T;
