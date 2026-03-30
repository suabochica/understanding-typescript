# Mapped Types

Suppose we had an interface and we wanted to make a readonly version of it, to make sure that we aren't making any changes to the object. One way we could do this is by creating two interfaces.

```ts
interface Fruit {
  name: string;
  color: string;
  sweetness: number;
}

interface ReadonlyFruit {
  readonly name: string;
  readonly color: string;
  readonly sweetness: string;
}
```

This is fine, except the duplication is a little verbose, especially since we know `ReadonlyFruit` will have the same properties as `Fruit`, just `readonly`. If these two type definitions were in separate files, we might accidentally forget to update one when we change the other.

Fortunately, TypeScript provides us with a special type signature which we can use to perform transforms on interfaces and object types. Mapped types allow us to take an existing type, pull out each property individually, and perform a transformation on that property's type. You can think of is an an array `.map()` function, but for the properties on an object type.

These special type transformers are generic types that work like functions. We pass in the object type that we want to transform, and it returns a new type with the transformations.

Let's use our example above to create a type transformer that makes all properties on an object `readonly`. Because the syntax is a little complicated, we'll go over it step by step.

The first thing we need to do is get all of the properties out of our fruit. We'll create a generic type which uses the `keyof` operator to do that.

```ts
type Properties<T> = keyof T;

type FruitProperties = Properties<Fruit>; // type FruitProperties = "name" | "color" | "sweetness"
```

TypeScript has determined the properties of whatever we pass in to our generic `Properties` type and given it to us as a union of string literals. We could use this to get a list of values for an object too. We'll do that by using an indexed access to get the type of the values using the properties which we already determined.

```ts
type Values<T> = T[Properties<T>];
type FruitValues = Values<Fruit>; // type FruitValues = string | number
```

This is handy if we want to get the type of every value in our interface, but what we really want to do is loop over each property and get the value for that property, and perform the transform we want to do at the same time. We can perform that loop using the `in` keyword. We'll use the `in` keyword to pull individual property literal types out of our `Properties` type into a new generic `P`. We can then use `P` to access the type of that property's value in `T`.

```ts
type ObjectIdentity<T> = {
  [P in Properties<T>]: T[P];
};

type FruitCopy = ObjectIdentity<Fruit>;
// type FruitCopy = {
//     name: string;
//     color: string;
//     sweetness: number;
// }
```

The syntax `P in Properties<T>` probably looks familiar. It very closely resembles the syntax for a `for .. in` loop in JavaScript. Just like `for ..` in creates a new variable for each iteration of the loop, we're creating a new type for each property in our list.

This is called `ObjectIdentity` because it doesn't perform any transformation. It will return exactly the same object type that you pass in. We now have a template which we can use to create our transformations. For example, by prepending `readonly` to our property, we can make each property `readonly`.

```ts
type Readonly<T> = {
  readonly [P in Properties<T>]: T[P];
};

type ReadonlyFruit = Readonly<Fruit>;
// type ReadonlyFruit = {
//     readonly name: string;
//     readonly color: string;
//     readonly sweetness: number;
// }
```
If you were to paste this into the TypeScript playground or a TypeScript file, you might get an error: `Duplicate identifier 'Readonly'`.. That's because TypeScript actually ships with a number of transformer types, which it calls _Utility Types_. These utility types are so helpful that TypeScript bundles a number of them which we can use wherever we want. We'll look closer at utility types, and create several more ourselves, later in this section.

The final thing we might want to do is remove a modifier from a type signature. For example, if we wanted to change a type so its properties are not `readonly`. We do this by prepending a minus (`-`) to the modifier when we are adding it to the type. This tells TypeScript "Please remove this modifier from this property if it has it".

```ts
type UnReadonly<T> = {
  -readonly [P in Properties<T>]: T[P];
};

type WritableFruit = UnReadonly<ReadonlyFruit>;
// type WritableFruit = = {
//     name: string;
//     color: string;
//     sweetness: number;
// }
```
We can even do this with the optional modifier, such as in this `Required` utility type, which makes all of the properties required.

```ts
type Required<T> = {
  [P in Properties<T>]-?: T[P];
};

interface OptionalFruit {
  name: string;
  color?: string;
  sweetness?: number;
}
type RequiredFruit = Required<OptionalFruit>;
// type RequiredFruit = = {
//     name: string;
//     color: string;
//     sweetness: number;
// }
```

We'll see a lot more ways to work with mapped types when we take a closer look at utility types later.

