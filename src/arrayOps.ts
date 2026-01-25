import type { Curried2, Curried3 } from "./types";
import { curry } from "./curry";
import { each } from "./array";
import { exists, isArray } from "./typeChecks";

export const flatMap = curry(<T, U>(fn: (value: T, index: number) => U[], items: T[]): U[] => {
    if (!exists(items) || !isArray(items)) {
        return [];
    }
    const input = items;
    const length = input.length;
    const result: U[] = [];
    const mapper = fn;
    for (let i = 0; i < length; i++) {
        const mapped = mapper(input[i]!, i);
        if (!exists(mapped) || !isArray(mapped)) {
            continue;
        }
        const mappedItems = mapped;
        for (let j = 0; j < mappedItems.length; j++) {
            result.push(mappedItems[j]!);
        }
    }
    return result;
}) as unknown as Curried2<(value: any, index: number) => any[], any[], any[]>;

export const chain = flatMap;

export const flatten = <T>(items: T[][]): T[] => {
    if (!exists(items) || !isArray(items)) {
        return [];
    }
    const input = items;
    const result: T[] = [];
    for (let i = 0; i < input.length; i++) {
        const subArray = input[i]!;
        if (!exists(subArray) || !isArray(subArray)) {
            continue;
        }
        for (let j = 0; j < subArray.length; j++) {
            result.push(subArray[j]!);
        }
    }
    return result;
};

export const zip = curry(<T, U>(arr1: T[], arr2: U[]): Array<[T, U]> => {
    const length = Math.min(arr1.length, arr2.length);
    const result: Array<[T, U]> = [];
    for (let i = 0; i < length; i++) {
        result.push([arr1[i]!, arr2[i]!]);
    }
    return result;
}) as unknown as Curried2<any[], any[], Array<[any, any]>>;

export const zipWith = curry(<T, U, R>(
    fn: (a: T, b: U) => R,
    arr1: T[],
    arr2: U[]
): R[] => {
    const length = Math.min(arr1.length, arr2.length);
    const result = new Array<R>(length);
    for (let i = 0; i < length; i++) {
        result[i] = fn(arr1[i]!, arr2[i]!);
    }
    return result;
}) as unknown as Curried3<(a: any, b: any) => any, any[], any[], any[]>;

export const uniq = <T>(items: T[]): T[] => {
    return Array.from(new Set(items));
};

export const uniqBy = curry(<T, K>(fn: (value: T) => K, items: T[]): T[] => {
    const seen = new Set<K>();
    const result: T[] = [];
    each((item: T) => {
        const key = fn(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }, items);
    return result;
}) as unknown as Curried2<(value: any) => any, any[], any[]>;
