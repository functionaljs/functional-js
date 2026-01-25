# functional.js

<p align="center">
  <strong>A lightweight, TypeScript-first functional programming library</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/functional.js"><img src="https://img.shields.io/npm/v/functional.js.svg" alt="npm version"></a>
  <a href="https://github.com/functionaljs/functional-js/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## Features

- **TypeScript-first** with excellent type inference
- **Lightweight** (~3KB gzipped) with strong tree-shaking
- **Auto-curried** functions for point-free programming
- **Zero dependencies**
- **Modern ESM + CJS** dual package
- **Full test coverage** (100%)

## Install

```bash
npm install functional.js # or
pnpm add functional.js # or
yarn add functional.js
```

## Quick Start

```typescript
import { pipe, map, filter, reduce } from "functional.js";

const data = [1, 2, 3, 4, 5, 6];

const result = pipe(
    data,
    filter((x) => x % 2 === 0),
    map((x) => x * 2),
    reduce((acc, x) => acc + x)
);

console.log(result); 
```

### Using Curry

```typescript
import { curry } from "functional.js";

const add = curry((a: number, b: number) => a + b);

add(1, 2);
add(1)(2);

const add5 = add(5);
add5(10);
```

### Point-Free Style

```typescript
import { flow, map, filter, pluck } from "functional.js";

interface User {
    name: string;
    age: number;
    active: boolean;
}

const getActiveUserNames = flow(
    filter<User>((u) => u.active),
    map((u) => u.name.toUpperCase())
);

const users: User[] = [
    { name: "Alice", age: 30, active: true },
    { name: "Bob", age: 25, active: false },
    { name: "Charlie", age: 35, active: true }
];

console.log(getActiveUserNames(users));
```

## Core Functions

### Function Composition

- `curry(fn)` — Auto-curry any function
- `compose(...fns)` — Right-to-left function composition
- `pipe(value, ...fns)` — Left-to-right data pipeline
- `flow(...fns)` — Left-to-right function composition

### Array Operations

- `map(fn, array)` — Transform array elements
- `filter(fn, array)` — Filter array by predicate
- `reduce(fn, array)` — Reduce array (no initial value)
- `fold(fn, initial, array)` — Fold array with initial value
- `flatMap(fn, array)` — Map and flatten
- `each(fn, array)` — Iterate over array
- `partition(fn, array)` — Split array by predicate
- `group(fn, array)` — Group array by key function
- `zip(arr1, arr2)` — Zip two arrays together
- `zipWith(fn, arr1, arr2)` — Zip with a combining function
- `uniq(array)` — Remove duplicates
- `uniqBy(fn, array)` — Remove duplicates by key function

### Array Queries

- `first(fn, array)` — Find first matching element
- `last(fn, array)` — Find last matching element
- `every(fn, array)` — Check if all elements match
- `any(fn, array)` — Check if any element matches
- `best(comparator, array)` — Find best element by comparator

### Object Operations

- `prop(key)` — Create property accessor
- `pluck(key, array)` — Extract property from array of objects
- `pick(keys, obj)` — Select properties from object
- `omit(keys, obj)` — Remove properties from object
- `path(pathArray, obj)` — Get nested property value
- `assoc(key, value, obj)` — Set property immutably
- `dissoc(key, obj)` — Remove property immutably
- `assign(obj1, obj2)` — Merge objects

### Utilities

- `identity(x)` — Return input unchanged
- `constant(x)` — Create constant function
- `tap(fn)` — Execute side effect and return input

### Type Checks

- `isFunction`, `isObject`, `isArray`
- `isString`, `isNumber`, `isDate`, `isRegExp`
- `exists`, `truthy`, `falsy`

## TypeScript Support

All functions have full TypeScript support with proper type inference:

```typescript
import { pipe, map, filter } from "functional.js";

const numbers = [1, 2, 3, 4, 5];

const result = pipe(
    numbers,
    filter((x) => x > 2),
    map((x) => x.toString())
);
```

## Comparison

| Library       | Bundle Size | TypeScript | Auto-Curry | Notes |
| ------------- | ----------- | ---------- | ---------- | ----- |
| functional.js | ~3KB        | Strong     | Yes        | Data-last, zero dependencies |
| Ramda         | ~50KB       | Limited    | Yes        | Data-last, large API |
| lodash/fp     | ~24KB       | Good       | Yes        | Data-last wrappers over lodash |
| underscore    | ~17KB       | Limited    | No         | Data-first utilities |
| fp-ts         | ~15KB       | Strong     | No         | Types-first, higher learning curve |

## Performance

Benchmarks run on Node.js 24.13.0 (macOS), using small/medium/large scenarios with isolated processes, warmups, and median results.

Highlights from the latest run:
- functional.js wins 31 of 45 ops/sec metrics
- functional.js is fastest cold start at 0.81 ms
- functional.js leads 4 of 9 memory benchmarks (lowest heap delta)
- functional.js is up to 3.86x faster than the runner-up when it leads (1.57x average)

![Performance overview](./assets/performance-marketing.png)
![fjs speed ratio](./assets/performance-fjs-ratio.png)
![Benchmark wins](./assets/performance-wins.png)
![Memory overview](./assets/memory-overview.png)
![Cold start](./assets/cold-start.png)

## Using AI Assistants

Use these prompts with AI assistants (ChatGPT, Claude, Cursor, etc.) to get accurate functional.js help:

### For learning

- "Show me how to use pipe in functional.js with TypeScript"
- "Compare functional.js pipe with Ramda pipe"
- "Explain when to use flow versus compose in functional.js"
- "Give me a functional.js example for transforming an array of users"

### For migration

- "Convert this Ramda code to functional.js: [paste code]"
- "Migrate lodash/fp chain to functional.js pipe: [paste code]"
- "Replace compose with flow using functional.js: [paste code]"

### For problem-solving

- "How do I transform an array of users with functional.js"
- "Show me point-free style with functional.js"
- "Build a reusable pipeline with flow and use it on data"

### For debugging

- "Why does reduce throw on this input in functional.js: [paste code]"
- "My curried function returns another function, what did I do wrong in functional.js: [paste code]"

## License

[MIT License](./LICENSE) © Lee Crossley

## Acknowledgments

Inspired by Ramda, lodash/fp, and fp-ts. Built for modern TypeScript development.
