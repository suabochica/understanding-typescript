# Thinking in Types

We've covered a lot of ground in this course. We've learned about the base types that come with JavaScript; a bunch of new types that are part of TypeScript; special ways that we can operate on types with `typeof`, `keyof`, Unions, and Intersections; and how we can make our types more generic with... well, generics.

As we know, the TypeScript compiler takes our TypeScript code and turns it into JavaScript code which we can then execute. If I had the following TypeScript code, taken from our Generics lesson:

```ts
interface Fruit {
  isFruit: true;
  name: string;
}
class FruitBasket<T extends Fruit> {
  constructor(public fruits: T[] = []) {}
  add(fruit: T) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

TypeScript would compile it into the following JavaScript:

```ts
class FruitBasket {
  constructor(fruits = []) {
    this.fruits = fruits;
  }
  add(fruit) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

It looks very similar to our TypeScript code, except all of the type definitions, including the Fruit interface and generic type T, were removed. Instead, we're just left with runtime code.

TypeScript also lets us compile our code into a format that is just types. This file is often shipped with the compiled JavaScript in case an upstream developer needs access to the type definitions for their IDE or something. We can easily see this by pasting the code into [TypeScript's Playground](https://www.typescriptlang.org/play/#code/JYOwLgpgTgZghgYwgAgGJQK7DMg3gKGWWAGd0swAuMTCAbkORDgFsJKSbQBzBgX3wIANnBIk0mbACFRAawhgAPABVkEAB6QQAE3HlsAPjyMEAexCdMCMKagAKAA4YARkOAJkMSWBKVkygG0AXWQAXmRggEo8ASI4bW07Lwo-ZWiCIiIwAAtSADpk7BI8pxJspO9IhiJYtTgwO3TGLNziwp8S0wdG6uQBPiA) and choosing the ".d.ts" tab on the output panel.

```ts
interface Fruit {
  isFruit: true;
  name: string;
}
declare class FruitBasket<T extends Fruit> {
  fruits: T[];
  constructor(fruits?: T[]);
  add(fruit: T): void;
  eat(): void;
}
```

It's like a shadow of our original code. It has the same shape, but it's missing all of the implementation. Still, you can recognize a lot of what is going on just from the type signatures.

It might not be apparent, but type systems can be thought of in very similar terms to our runtime systems. Granted, it's like an upside-down version of our runtime code, but a lot of the same principles are there.

- Type aliases are like variables. They are named buckets that we can put any type in, just like a regular variable.
- TypeScript operators, like `typeof`, `keyof`, `|`,  and `&,` let us combine, manipulate, and modify our types, like of like `+`, `*`, and `-`.
- Type narrowing lets us determine an exact type from several possibilities.
- Generics work like functions. Generic types accept a type as a parameter and operate on it to transform it into a different type.

All of these things work together to allow you to compose simple types, like strings and numbers, into more complicated types, like video game entities and business units.

Sometimes it's going to be a little difficult to figure out what's going on with our types. Strings and numbers are a little more concrete - every programmer is familiar with how they work. Generic types are more abstract, which makes them a little more complicated to reason about if you don't have much experience with type systems.

In this section of the course, we'll be talking about two more constructs which take principles from runtime programming and let us use them as we work in the type system.

- Mapped types are like loops, which let us take a union of types and perform a transformation on each of the types in the union.
- Conditional types are like if statements. They let us modify a type based on some condition which must be met.

These two features give us even more control over our types, making it easier for us to reuse and compose our types. As we talk about them, pay attention to how we use the generic types. Especially pay attention to where our generic types are defined.

At the end of this section there will be an activity where we apply what we've learned about generics, type operators, mapped types, and conditional types to create a series of utility types that can be used to transform other types. This might be one of the more challenging activities, but don't skip it. Mastering how these utility types are composed will be very helpful, both for crating complicated type definitions and for understanding simpler type definitions.