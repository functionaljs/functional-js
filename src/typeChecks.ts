export function isFunction(obj: unknown): obj is (...args: any[]) => unknown {
    return !!(obj && (obj as any).constructor && (obj as any).call && (obj as any).apply);
}

export function isObject(obj: unknown): obj is object {
    return isFunction(obj) || (!!obj && typeof obj === "object");
}

export function isArray<T = unknown>(obj: unknown): obj is T[] {
    return Array.isArray(obj);
}

export function isArguments(obj: unknown): obj is IArguments {
    return Object.prototype.toString.call(obj) === "[object Arguments]";
}

export function isDate(obj: unknown): obj is Date {
    return Object.prototype.toString.call(obj) === "[object Date]";
}

export function isNumber(obj: unknown): obj is number {
    return Object.prototype.toString.call(obj) === "[object Number]";
}

export function isRegExp(obj: unknown): obj is RegExp {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
}

export function isString(obj: unknown): obj is string {
    return Object.prototype.toString.call(obj) === "[object String]";
}

export function exists<T>(obj: T | null | undefined): obj is T {
    return obj != null;
}

export function truthy<T>(obj: T | null | undefined | false): obj is T {
    return exists(obj) && obj !== false;
}

export function falsy(obj: unknown): obj is null | undefined | false {
    return !truthy(obj);
}
