import type { Mapper, Predicate, Reducer, Comparator } from "./types";
import { isArray, exists } from "./typeChecks";

const HARD_RETURN = Symbol("hardReturn");

const eachArray = <T>(iterator: (value: T, index: number) => any, items: T[]): void => {
    for (let i = 0; i < items.length; i++) {
        if (iterator(items[i]!, i) === HARD_RETURN) {
            return;
        }
    }
};

const mapArray = <T, U>(iterator: Mapper<T, U>, items: T[]): U[] => {
    const length = items.length;
    const mapped = new Array<U>(length);
    const fn = iterator;
    if (length > 0 && typeof items[0] === "number" && fn.length === 1) {
        for (let i = 0; i < length; i++) {
            mapped[i] = fn(items[i]!, i);
        }
        return mapped;
    }
    for (let i = 0; i < length; i++) {
        mapped[i] = fn(items[i]!, i);
    }
    return mapped;
};

const foldArray = <T, U>(iterator: Reducer<T, U>, cumulate: U, items: T[]): U => {
    let acc = cumulate;
    if (items.length > 0 && typeof items[0] === "number" && typeof acc === "number") {
        let numberAcc = acc as unknown as number;
        for (let i = 0; i < items.length; i++) {
            numberAcc = iterator(numberAcc as unknown as U, items[i]!, i) as unknown as number;
        }
        return numberAcc as unknown as U;
    }
    for (let i = 0; i < items.length; i++) {
        acc = iterator(acc, items[i]!, i);
    }
    return acc;
};

const reduceArray = <T>(iterator: Reducer<T, T>, items: T[]): T => {
    let acc = items[0];
    if (items.length > 1 && typeof acc === "number" && typeof items[1] === "number") {
        let numberAcc = acc as unknown as number;
        for (let i = 1; i < items.length; i++) {
            numberAcc = iterator(numberAcc as unknown as T, items[i]!, i - 1) as unknown as number;
        }
        return numberAcc as unknown as T;
    }
    for (let i = 1; i < items.length; i++) {
        acc = iterator(acc as T, items[i]!, i - 1);
    }
    return acc as T;
};

const filterArray = <T>(iterator: Predicate<T>, items: T[]): T[] => {
    const filtered: T[] = [];
    const length = items.length;
    const fn = iterator;
    if (length > 0 && typeof items[0] === "number" && fn.length === 1) {
        for (let i = 0; i < length; i++) {
            const value = items[i]!;
            if (fn(value, i)) {
                filtered.push(value);
            }
        }
        return filtered;
    }
    if (fn.length >= 2) {
        for (let i = 0; i < length; i++) {
            const value = items[i]!;
            if (fn(value, i)) {
                filtered.push(value);
            }
        }
        return filtered;
    }
    for (let i = 0; i < length; i++) {
        const value = items[i]!;
        if (fn(value, i)) {
            filtered.push(value);
        }
    }
    return filtered;
};

export function each<T>(iterator: (value: T, index: number) => any, items: T[]): void;
export function each<T>(iterator: (value: T, index: number) => any): (items: T[]) => void;
export function each<T>(iterator: (value: T, index: number) => any, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => each(iterator, next);
    }
    if (!exists(items) || !isArray(items)) {
        return;
    }
    eachArray(iterator, items);
}

export function map<T, U>(iterator: Mapper<T, U>, items: T[]): U[];
export function map<T, U>(iterator: Mapper<T, U>): (items: T[]) => U[];
export function map<T, U>(iterator: Mapper<T, U>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => map(iterator, next);
    }
    if (!exists(items) || !isArray(items)) {
        return [];
    }
    return mapArray(iterator, items);
}

export function fold<T, U>(iterator: Reducer<T, U>, cumulate: U, items: T[]): U;
export function fold<T, U>(iterator: Reducer<T, U>, cumulate: U): (items: T[]) => U;
export function fold<T, U>(
    iterator: Reducer<T, U>
): {
    (cumulate: U, items: T[]): U;
    (cumulate: U): (items: T[]) => U;
};
export function fold<T, U>(iterator: Reducer<T, U>, cumulate?: U, items?: T[]): any {
    if (arguments.length >= 3) {
        if (!exists(items) || !isArray(items)) {
            return cumulate as U;
        }
        return foldArray(iterator, cumulate as U, items);
    }
    if (arguments.length === 2) {
        return (next: T[]) => fold(iterator, cumulate as U, next);
    }
    return function (nextCumulate: U, nextItems?: T[]): any {
        if (arguments.length >= 2) {
            return fold(iterator, nextCumulate, nextItems as T[]);
        }
        return (next: T[]) => fold(iterator, nextCumulate, next);
    };
}

export const foldl = fold;

export function reduce<T>(iterator: Reducer<T, T>, items: T[]): T;
export function reduce<T>(iterator: Reducer<T, T>): (items: T[]) => T;
export function reduce<T>(iterator: Reducer<T, T>, items?: T[]): T | ((items: T[]) => T) {
    if (arguments.length < 2) {
        return (next: T[]) => reduce(iterator, next);
    }
    if (!exists(items) || !isArray(items) || items.length === 0) {
        throw new Error("fjs Error: Cannot reduce empty array without initial value");
    }
    return reduceArray(iterator, items);
}

export const reducel = reduce;
export const foldll = reduce;

export function clone<T>(items: T[]): T[] {
    const input = items ?? [];
    const result = new Array<T>(input.length);
    for (let i = 0; i < input.length; i++) {
        result[i] = input[i]!;
    }
    return result;
}

export function first<T>(iterator: Predicate<T>, items: T[]): T | undefined;
export function first<T>(iterator: Predicate<T>): (items: T[]) => T | undefined;
export function first<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => first(iterator, next);
    }
    let result: T | undefined;
    each((item: T, index: number) => {
        if (iterator(item, index)) {
            result = item;
            return HARD_RETURN;
        }
        return undefined;
    }, items as T[]);
    return result;
}

export const head = first;
export const take = first;

export function rest<T>(iterator: Predicate<T>, items: T[]): T[];
export function rest<T>(iterator: Predicate<T>): (items: T[]) => T[];
export function rest<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => rest(iterator, next);
    }
    const result = select(iterator, items as T[]);
    result.shift();
    return result;
}

export const tail = rest;
export const drop = rest;

export function last<T>(iterator: Predicate<T>, items: T[]): T | undefined;
export function last<T>(iterator: Predicate<T>): (items: T[]) => T | undefined;
export function last<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => last(iterator, next);
    }
    const itemsClone = clone(items as T[]);
    return first(iterator, itemsClone.reverse());
}

export function every<T>(iterator: Predicate<T>, items: T[]): boolean;
export function every<T>(iterator: Predicate<T>): (items: T[]) => boolean;
export function every<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => every(iterator, next);
    }
    let isEvery = true;
    each((item: T, index: number) => {
        if (!iterator(item, index)) {
            isEvery = false;
            return HARD_RETURN;
        }
        return undefined;
    }, items as T[]);
    return isEvery;
}

export const all = every;

export function any<T>(iterator: Predicate<T>, items: T[]): boolean;
export function any<T>(iterator: Predicate<T>): (items: T[]) => boolean;
export function any<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => any(iterator, next);
    }
    let isAny = false;
    each((item: T, index: number) => {
        if (iterator(item, index)) {
            isAny = true;
            return HARD_RETURN;
        }
        return undefined;
    }, items as T[]);
    return isAny;
}

export const contains = any;

export function select<T>(iterator: Predicate<T>, items: T[]): T[];
export function select<T>(iterator: Predicate<T>): (items: T[]) => T[];
export function select<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => select(iterator, next);
    }
    if (!exists(items) || !isArray(items)) {
        return [];
    }
    return filterArray(iterator, items);
}

export const filter = select;

export function best<T>(iterator: Comparator<T>, items: T[]): T | undefined;
export function best<T>(iterator: Comparator<T>): (items: T[]) => T | undefined;
export function best<T>(iterator: Comparator<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => best(iterator, next);
    }
    const compare = (arg1: T, arg2: T): T => {
        return iterator(arg1, arg2) ? arg1 : arg2;
    };
    return reduce(compare, items as T[]);
}

export function whilst<T>(iterator: Predicate<T>, items: T[]): T[];
export function whilst<T>(iterator: Predicate<T>): (items: T[]) => T[];
export function whilst<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => whilst(iterator, next);
    }
    const result: T[] = [];
    each((item: T, index: number) => {
        if (iterator(item, index)) {
            result.push(item);
        } else {
            return HARD_RETURN;
        }
        return undefined;
    }, items as T[]);
    return result;
}

export function partition<T>(iterator: Predicate<T>, items: T[]): [T[], T[]];
export function partition<T>(iterator: Predicate<T>): (items: T[]) => [T[], T[]];
export function partition<T>(iterator: Predicate<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => partition(iterator, next);
    }
    const truthy: T[] = [];
    const falsy: T[] = [];
    each((item: T, index: number) => {
        (iterator(item, index) ? truthy : falsy).push(item);
    }, items as T[]);
    return [truthy, falsy];
}

export function group<T, K extends string | number | symbol>(
    iterator: (value: T) => K,
    items: T[]
): Record<K, T[]>;
export function group<T, K extends string | number | symbol>(
    iterator: (value: T) => K
): (items: T[]) => Record<K, T[]>;
export function group<T, K extends string | number | symbol>(
    iterator: (value: T) => K,
    items?: T[]
): any {
    if (arguments.length < 2) {
        return (next: T[]) => group(iterator, next);
    }
    const result = {} as Record<K, T[]>;
    each((item: T) => {
        const key = iterator(item);
        const existing = result[key];
        if (existing) {
            existing.push(item);
            return;
        }
        result[key] = [item];
    }, items as T[]);
    return result;
}

export function shuffle<T>(items: T[]): T[] {
    const result = clone(items);
    for (let i = 0; i < result.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = result[i]!;
        result[i] = result[j]!;
        result[j] = t;
    }
    return result;
}

export const strictEquals = <T>(a: T, b: T): boolean => a === b;

export function nub<T>(comparator: Comparator<T>, items: T[]): T[];
export function nub<T>(comparator: Comparator<T>): (items: T[]) => T[];
export function nub<T>(comparator: Comparator<T>, items?: T[]): any {
    if (arguments.length < 2) {
        return (next: T[]) => nub(comparator, next);
    }
    const input = items as T[];
    if (comparator === strictEquals) {
        return Array.from(new Set(input));
    }
    const unique: T[] = input.length > 0 ? [input[0]!] : [];
    each((item: T) => {
        if (!any((value: T) => comparator(item, value), unique)) {
            unique.push(item);
        }
    }, input);
    return unique;
}

export const unique = nub;
export const distinct = nub;
