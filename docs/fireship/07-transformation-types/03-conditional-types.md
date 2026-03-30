# Conditional Types

We've already learned that we can use literals to represent types that can only be assigned to that literal. For example, the following type can only be assigned to the value "Apple".

```ts
type AppleLiteral = "Apple";

let name: AppleLiteral = "Apple";
let wrongName: AppleLiteral = "Banana"; // Type Error: Type '"Banana"' is not assignable to type '"Apple"'.
let nameString: string = name; // This works
```
We know that the `AppleLiteral` type can be assigned to a `string`, but TypeScript doesn't tell us that outright. What would be nice if there were some way we could use a type constraint to determine what type a literal type represents.

Fortunately, TypeScript provides us with a construct to do that. Conditional types let us provide a type constraint. If the constraint passes, we get one type; otherwise, we get a different type. If this sounds like an if statement or ternary for types, that's exactly what it is.

We can create a conditional type by using the ternary syntax, with a question mark after the type constraint, followed by the "true" result, followed by a colon (`:`), and then the "false" result.

```ts
type LiteralIsStringType<T> = T extends string ? string : never;

type AppleLiteralType = LiteralIsStringType<AppleLiteral>; // type AppleLiteralType = string;
type NeverLiteralType = LiteralIsStringType<0>; // type NeverLiteralType = never;
```
This type definition tells us "If the generic `T` is assignable to a `string`, then give us a `string` type; if we pass anything but a `string` or string literal, give us `never`".

We could extend this to include more literal types by chaining our conditional type with more type constraints and results. For example, this will tell us whether a literal is a `string`, `number`, or `boolean`.

```ts
type LiteralType<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : never;
```

There are other exciting things we can do as well! For example, suppose we have a type which is "nullable", which means it is included in Union with `null | undefined`. If we wanted to transform our type so it does not include `null | undefined`, we could use a conditional type to check if our type is assignable to `null | undefined`. If it is, we get `never`; if it isn't, we get our type.

```ts
type NonNullable<T> = T extends null | undefined ? never : T;

type NonNullString = NonNullable<string | null | undefined>; // type NonNullString = string;
```

This demonstrates an important property of conditional types. Conditional types are distributive, which means that when we pass in a Union type, the type constraint isn't checked against the entire Union that is passed in; rather the constraint is checked against each member of the Union individually.

When checking the `string` part of the type we pass in, the `T` in our `NonNullable` type represents a `string` type. Since a `string` type doesn't extend `null | undefined`, our conditional fails, and it returns `T`, which is actually `string`. When `T` represents `null` or `undefined`, however, both of those pass the type condition, so it returns `never`. Any time you have a Union of a type and `never`, the `never` is removed from the Union automatically, which leaves you with string.

This exclusionary quality of the `never` type really comes in handy when working with conditional types and type Unions. We can use this to make a utility type which takes two Unions; if any of the types in the first Union are assignable to the second Union, it will remove them from the first union. To create this utility type, we'll use a generic type that takes two generic parameters.

```ts
type Exclude<T, U> = T extends U ? never : T;

type FavoriteLetters = "a" | "l" | "e" | "x";
type Vowels = "a" | "e" | "i" | "o" | "u" | "y";

type NonFavoriteVowels = Exclude<Vowels, FavoriteLetters>;
// type NonFavoriteVowels = "i" | "o" | "u" | "y"
```

We can switch our conditional around so instead of excluding items from the first Union that match the second, it extracts items from the first Union that match the second.

```ts
type Extract<T, U> = T extends U ? T : never;

type FavoriteVowels = Extract<Vowels, FavoriteLetters>;
// type FavoriteVowels = "a" | "e"
```

## Conditional Type Inference

Let's take a look at one more conditional utility type which could really come in handy. Often, we need to grab the return type of a function. This might be useful if we pass the function's result to other functions and need an easy way to give those functions the appropriate type signature.

We can't use index access to get the type from a function's return signature - that doesn't even make sense. However, TypeScript is able to infer the type of functions easily enough. What we need is a way to hook into TypeScript's inference system to tell it we need it to infer the value of a particular part of a type signature.

We'll create a new utility type called `ReturnType`. It will have a generic `T` which is constrained to any function definition. That will keep us from passing `strings` and Interfaces and such to it. We'll then use a conditional type to see if `T` extends a function definition, and add the keyword `infer` to the return type. This lets us create a new generic, which we'll call `R` which represents the function's return type. If TypeScript is able to infer the type of `R`, then that's what we'll return; otherwise we'll return `any`.

```ts
type AnyFunction = (...args: any) => any;
type ReturnType<T extends AnyFunction> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

// We have to use `typeof` to extract the type signature of this function.
type ParseIntReturn = ReturnType<typeof Number.parseInt>; // type ParseIntReturn = number

// ParseIntReturn is already a type, so we can directly access its properties without using `typeof`
type ToStringReturn = ReturnType<ParseIntReturn["toString"]>; // type ToStringReturn = string
```

We can think of the `infer` keyword as unwrapping whatever thing we use it with in our conditional type. In this case, we are unwrapping a function's type to get the return type. We could also unwrap a function's parameters by `inferring` the parameters type instead of the return type.

```ts
type Parameters<T extends AnyFunction> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type ParseIntParams = Parameters<typeof Number.parseInt>; // type ParseIntParams = [s: string, radix?: number]
```
We can use the `infer` keyword in conditional types to unwrap many other things too. For example, here's a conditional type that either unwraps an array `T` to return the type of the array's values. If `T` is not an array, it returns `T`.

```ts
type UnwrapArray<T> = T extends (infer R)[] ? R : T;
```

In this case, it is inferring the type of the array `T`'s values, and putting that type into `R`.

For good measure, let's unwrap a `Promise` with `infer`. This will give us the type of the value that is resolved by the `Promise`.

```ts
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
```
We likely won't be using conditional type inference, or maybe even conditional types themselves, directly too much as we write TypeScript. Instead, we'll most likely create a number of reusable utility types which we can then sprinkle throughout our code. TypeScript ships with many [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) as well.