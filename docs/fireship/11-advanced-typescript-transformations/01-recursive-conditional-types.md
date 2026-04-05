# Recursive Conditional Types

ES2019 introduced the `.flat()` method to arrays. If an array has another array as one of its items, it spreads those items into the original array, thus flattening it. It even supports specifying a depth parameter so you can flatten nested arrays, like so:

```ts
const flattened = [
  [1, 2],
  [3, 4, ["a", "b"]],
].flat(4);
// [1,2,3,4,"a","b"]
```

The type of the result is `(string|number)[]`, since the final result has both strings and numbers in the array. I'll let you explore TypeScript's built-in type definitions to see how it manages that.

For our purposes, we're going to write a function that takes advantage of the `.flat` method to deeply flatten an array so there are no more nested arrays inside of it. In other words, we'll call `.flat `with an infinite depth. How would we type that?

```ts
function deepFlatten<T extends any[]>(array: T): T[] {
  return array.flat(Infinity);
}
const flattened = deepFlatten([
  [1, 2],
  [3, 4, ["a", "b"]],
]); // const flatten: (number | string[])[][][]
```

This `.flat` method takes in the array and returns the same array with no modification. This is what would happen if we called `.flat(0)`. It's a good start, but it doesn't properly represent the arrays being combined together. How could we do that?

We know that we can unwrap an array using conditional types and the `infer` keyword; we could try that.

```ts
type UnwrapArray<T> = T extends (infer R)[] ? R : T;
function deepFlatten<T extends any[]>(array: T): UnwrapArray<T>[] {
  return array.flat(Infinity);
}
const flattened = deepFlatten([
  [1, 2],
  [3, 4, ["a", "b"]],
]); // const flatten: (number | string[])[][]
```

That helped us unwrap one of the arrays, but we still don't have a fully flattened type definition. The challenge here is that the `.flat` method is a recursive function. What would be nice is if we could use our `UnwrapArray` type inside of itself. That way, if `R` is possibly still an array, we could unwrap it again; otherwise, we return the non-array `T` value. It's a recursive conditional type!

```ts
type UnwrapArrayRecursive<T> = T extends (infer R)[]
  ? UnwrapArrayRecursive<R>
  : T;

function deepFlatten<T extends any[]>(
  array: T,
): UnwrapArrayRecursive<T>[] {
  return array.flat(Infinity);
}
const flattened = deepFlatten([
  [1, 2],
  [3, 4, ["a", "b"]],
]); // const flatten: (string | number)[]
```

TypeScript recursively unwraps our nested array type until it arrives at the fully non-array types. It then unions those together to tell us the type of every element of our nested array. The return type of our function is an array of those elements, since they are now occupying a flat array.

Recursive conditional types are new in TypeScript 4.1. Before, you would have to write out incredibly complicated types with strange hacks. Now, recursive conditional types are built in with automatic depth limiting. If TypeScript executes the same recursive conditional too many times, it will give you a warning. Also, be aware that for very complicated types, it might increase your type checking time. In many cases, it might be best to write out the types by hand.