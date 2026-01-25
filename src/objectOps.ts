import type { Curried2, Curried3 } from "./types";
import { curry } from "./curry";

export const pick = curry(<T extends object, K extends keyof T>(
    keys: K[],
    obj: T
): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}) as unknown as Curried2<string[], any, any>;

export const omit = curry(<T extends object, K extends keyof T>(
    keys: K[],
    obj: T
): Omit<T, K> => {
    const result = { ...obj } as any;
    keys.forEach((key) => {
        delete result[key];
    });
    return result as Omit<T, K>;
}) as unknown as Curried2<string[], any, any>;

export const path = curry(<T = any>(pathArray: Array<string | number>, obj: any): T | undefined => {
    let current = obj;
    for (const key of pathArray) {
        if (current == null) {
            return undefined;
        }
        current = current[key];
    }
    return current as T;
}) as unknown as Curried2<Array<string | number>, any, any>;

export const assoc = curry(<T extends object, K extends keyof T>(
    key: K,
    value: T[K],
    obj: T
): T => {
    return { ...obj, [key]: value };
}) as unknown as Curried3<string, any, any, any>;

export const dissoc = curry(<T extends object, K extends keyof T>(key: K, obj: T): Omit<T, K> => {
    const result = { ...obj } as any;
    delete result[key];
    return result as Omit<T, K>;
}) as unknown as Curried2<string, any, any>;
