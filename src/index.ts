import { curry } from "./curry";
import {
    each,
    map,
    fold,
    foldl,
    reduce,
    reducel,
    foldll,
    clone,
    first,
    head,
    take,
    rest,
    tail,
    drop,
    last,
    every,
    all,
    any,
    contains,
    select,
    filter,
    best,
    whilst,
    partition,
    group,
    shuffle,
    nub,
    strictEquals,
    unique,
    distinct
} from "./array";
import { compose } from "./composition";
import { toArray, apply, assign, extend, prop, pluck } from "./object";
import {
    isFunction,
    isObject,
    isArray,
    isArguments,
    isDate,
    isNumber,
    isRegExp,
    isString,
    exists,
    truthy,
    falsy
} from "./typeChecks";
import { identity, constant, tap } from "./utilities";
import { pipe, flow } from "./pipe";
import { pick, omit, path, assoc, dissoc } from "./objectOps";
import { flatMap, chain, flatten, zip, zipWith, uniq, uniqBy } from "./arrayOps";
import {
    mapAsync,
    filterAsync,
    reduceAsync,
    foldAsync,
    eachAsync,
    pipeAsync,
    flowAsync,
    composeAsync,
    mapFilterReduceAsync,
    mapFilterReduceAsyncParallel
} from "./async";

export { curry } from "./curry";

export {
    each,
    map,
    fold,
    foldl,
    reduce,
    reducel,
    foldll,
    clone,
    first,
    head,
    take,
    rest,
    tail,
    drop,
    last,
    every,
    all,
    any,
    contains,
    select,
    filter,
    best,
    whilst,
    partition,
    group,
    shuffle,
    nub,
    strictEquals,
    unique,
    distinct
} from "./array";

export { compose } from "./composition";

export { toArray, apply, assign, extend, prop, pluck } from "./object";

export {
    isFunction,
    isObject,
    isArray,
    isArguments,
    isDate,
    isNumber,
    isRegExp,
    isString,
    exists,
    truthy,
    falsy
} from "./typeChecks";

export { identity, constant, tap } from "./utilities";

export { pipe, flow } from "./pipe";

export { pick, omit, path, assoc, dissoc } from "./objectOps";

export { flatMap, chain, flatten, zip, zipWith, uniq, uniqBy } from "./arrayOps";

export {
    mapAsync,
    filterAsync,
    reduceAsync,
    foldAsync,
    eachAsync,
    pipeAsync,
    flowAsync,
    composeAsync,
    mapFilterReduceAsync,
    mapFilterReduceAsyncParallel
} from "./async";

export type {
    Predicate,
    Comparator,
    Mapper,
    Reducer,
    UnaryFn,
    Curried2,
    Curried3,
    Curried4,
    AnyFunction,
    CurriedFunction
} from "./types";

export const fjs = {
    curry,
    each,
    map,
    fold,
    foldl,
    reduce,
    reducel,
    foldll,
    clone,
    first,
    head,
    take,
    rest,
    tail,
    drop,
    last,
    every,
    all,
    any,
    contains,
    select,
    filter,
    best,
    whilst,
    partition,
    group,
    shuffle,
    nub,
    strictEquals,
    unique,
    distinct,
    compose,
    toArray,
    apply,
    assign,
    extend,
    prop,
    pluck,
    isFunction,
    isObject,
    isArray,
    isArguments,
    isDate,
    isNumber,
    isRegExp,
    isString,
    exists,
    truthy,
    falsy,
    identity,
    constant,
    tap,
    pipe,
    flow,
    pick,
    omit,
    path,
    assoc,
    dissoc,
    flatMap,
    chain,
    flatten,
    zip,
    zipWith,
    uniq,
    uniqBy,
    mapAsync,
    filterAsync,
    reduceAsync,
    foldAsync,
    eachAsync,
    pipeAsync,
    flowAsync,
    composeAsync,
    mapFilterReduceAsync,
    mapFilterReduceAsyncParallel
};
