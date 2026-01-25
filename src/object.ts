import type { Curried2 } from "./types";
import { curry } from "./curry";
import { map } from "./array";
import { isArray } from "./typeChecks";

export function toArray<T extends Record<string, any>>(obj: T): Array<[keyof T, T[keyof T]]> {
    return map((key: keyof T) => [key, obj[key]], Object.keys(obj) as Array<keyof T>);
}

export const apply = curry(<T extends Record<string, any>, K extends keyof T>(
    func: K | [K, ...any[]],
    items: T[]
): any[] => {
    let method: K;
    let args: any[] = [];

    if (isArray(func)) {
        [method, ...args] = func as [K, ...any[]];
    } else {
        method = func;
    }

    return map((item: T) => {
        const fn = item[method];
        if (typeof fn === "function") {
            return fn.apply(item, args);
        }
        return fn;
    }, items);
}) as unknown as Curried2<any, any[], any[]>;

export const assign = curry(<T extends Record<string, any>, U extends Record<string, any>>(
    obj1: T,
    obj2: U
): U & T => {
    return { ...obj2, ...obj1 };
}) as unknown as Curried2<Record<string, any>, Record<string, any>, Record<string, any>>;

export const extend = assign;

export function prop<K extends string | number | symbol>(property: K) {
    return function <T extends Record<K, any>>(obj: T): T[K] {
        return obj[property];
    };
}

export const pluck = curry(<T, K extends keyof T>(property: K, items: T[]): Array<T[K]> => {
    return map(prop(property), items);
}) as unknown as Curried2<any, any[], any[]>;
