# Intersection types

Let's say we have two types that are different, but similar enough that we might want to combine them together.

```ts
interface Fruit {
  name: string;
  sweetness: number;
}
interface Vegetable {
  name: string;
  hasSeeds: boolean;
}

interface EdibleThing {
  name: string;
  sweetness: number;
  hasSeeds: boolean;
}
```
That seems a bit redundant. What if we were able to combine these types together?

If Union types are either one type or another, Intersection types are one type and another. Intersection types combine the properties and features of two types together. Let's go back to our `Fruit` and `Vegetable` example.

```ts
type EdibleThing = Fruit & Vegetable;

let banana: EdibleThing = { name: "Banana", sweetness: 70 };
// Type Error: Type '{ name: string; sweetness: number; }' is not assignable to type 'EdibleThing'.
//   Property 'hasSeeds' is missing in type '{ name: string; sweetness: number; }' but required in type 'Vegetable'.

let apple: EdibleThing = {
  name: "Apple",
  sweetness: 80,
  hasSeeds: true,
}; // This works
```

This is especially helpful when combining interfaces and other object-like types. You can't combine everything though. Combining primitives will always yield a `never` type or a type that is impossible to satisfy.

```ts
type Strnumbering = string & number; // type Strnumbering = never;
type NumberAndNumberArray = number & number[];

let testNum1: number & number[] = 5; // Type Error: Type 'number' is not assignable to type 'number[]';
let testNum2: number & number[] = [5]; // Type Error: Type 'number[]' i
```

Since TypeScript also combines the types of properties with the same name, we have to be careful when combining objects with a similar shape but different types.

```ts
interface Fruit {
  name: string;
  sweetness: number;
}
interface Candy {
  name: string;
  sweetness: string;
}
type SweetThing = Fruit & Candy;

const apple: SweetThing = { name: "Apple", sweetness: 80 };
// Type Error: Type 'number' is not assignable to type 'never'.
```

In this case, our two `sweetness` properties have different primitive types, and combining them created a never type, which made it impossible to assign anything to variables of that type.
`
Intersection types are especially helpful when you need to add more properties to existing types. We'll learn more about adding properties to types with intersection types later on in the course.
