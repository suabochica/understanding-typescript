# Generics

Generics are one of the most powerful parts of TypeScript. They make it possible to reuse and transform our types into different types, instead of having to rewrite different definitions for each type. Think of them as functions, but for types. A type goes in, a different type comes out.

Generics can be a little daunting, so we'll take this lesson relatively slowly.

## Generic Functions

Lets look at a simple example: pulling a single item from an array.

```ts
function getFirstItem(list: number[]): number {
  return list[0];
}
```

What if we wanted to grab a string from a list of strings instead? We would have to write another function.

```ts
function getFirstStringItem(list: string[]): string {
  return list[0];
}
```

Our array implementation is _exactly_ the same, but we have to write it twice because the type signatures are different. What if we were to use a union type?

```
function getFirstItem(list: (number | string)[]): number | string {
  return list[0];
}
```
This is better - we only have to define our function once - but it doesn't really describe our API at all. This type signature implies that our array contains a mixture of numbers and strings, which isn't the case at all. Also, once we have the result of the function, we have to narrow the type to be either `number` or `string`.

This is where generics come in. We want the ability to write a type signature for a function that takes in an array of some type, lets call that type `ItemType`, and returns a single item with the type `ItemType`. Here's how we would write that signature.

```ts
function getFirstItem<ItemType>(list: ItemType[]): ItemType {
  return list[0];
}
```

Notice the angle brackets we use right after the function name. This is where we define generic parameter. Here, we're defining a generic parameter called `ItemType`, but we could call it anything we want. Once we've defined our generic type, we can use it anywhere in our function, including on the parameters and the return signature. Here, we're saying that our `list` parameter is an array of `ItemType`, and it returns a `ItemType` value.

Now we can use it anywhere we want, with any type we want! The best part is TypeScript will automatically infer the return type from the usage. It even correctly infers complex types, like classes.

```ts
class Fruit {
  constructor(public name: string) {}
}

const fruit = getFirstItem([
  new Fruit("banana"),
  new Fruit("apple"),
  new Fruit("pear"),
]);

fruit; // const fruit: Fruit
```

So, to recap: Generics represent a type that won't be defined until the type is used in our code. We can use generics with functions. When we originally write the generic function, we might not know the type the generics represent, but when we use our function elsewhere in our code, the generics' types can be inferred from the usage. This makes it possible to write functions that accept different kinds of types but have the same implementation for each type.

These generic parameters are like variables; the more descriptive the name, the easier it is to understand what it's purpose is. We used `ItemType`, since our generic parameter represents the type of each item in the array. However, many libraries and authors use single-letter type names, like `T` or `U`, which can make generics seem more intimidating. Don't fret though. If you slow down and look closely, you should be able to see what is going on in the generic.

## Generic Types

Generics aren't just for functions. In fact, we can create generic Interfaces, Classes, and type aliases.

Here's an example that we looked at earlier in the course. This type represents a tree of `string` values.

```ts
type StringTree = {
  value: string;
  left?: StringTree;
  right?: StringTree;
};
```

This is a great type which could be really handy when working with trees of `strings`. But what if we have a tree of something other than `strings`? Either I would have to make a separate type for each of them, or I could make a generic type.

```ts
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

You can see that we accept a generic type that we call `T`. We then use that as the type of the value on our tree.

When we create our `left` and `right` properties, we use the same type recursively, but we need to tell that type what generic type it should use. We can just pass `T` back into our recursive type, which will let us use `T` for all of the values of our `Tree`. We pass types to our generics by putting angle brackets after the generic's name, like so:

```ts
type StringTree = Tree<string>;
```

Let's see how this looks when actually creating an object with this type. We'll use this type to represent a literal tree that grows in the ground that has grafted branches of fruit on it.

```ts
interface Fruit {
  name: string;
  color: string;
}

const graftedFruitTree: Tree<Fruit> = {
  value: { name: "trunk", color: "brown" },
  left: {
    value: { name: "apple", color: "red" },
    right: {
      value: { name: "orange", color: "orange" },
    },
  },
  right: {
    value: { name: "pear", color: "yellow" },
  },
};
interface Fruit {
```

This gives you a good start to generics. In the next lesson, we'll learn a few more ways we can apply generics, and how to constrain our generic parameter so it only accepts certain types.

￼