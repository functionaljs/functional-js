export function identity<T>(value: T): T {
    return value;
}

export function constant<T>(value: T): () => T {
    return () => value;
}

export function tap<T>(fn: (value: T) => void) {
    return (value: T): T => {
        fn(value);
        return value;
    };
}
