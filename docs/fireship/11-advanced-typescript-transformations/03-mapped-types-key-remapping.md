# Mapped Types Key Remapping

In the previous lesson, we learned about using template literal types. This allowed us to define new properties on objects based on the names of existing properties. In this lesson, we'll dynamically modify those property names, while still enjoying type safety for the property values.

In the last lesson, we dynamically created properties on an object by using a mapped type with template literal types.

```ts
type Seasons = "spring" | "summer" | "autumn" | "winter";
type SeasonsStartDate = {
  [P in `${Seasons}Start`]: string;
};
```

This worked fine when we were dealing with an explicit union of strings and a simple value type. What would happen if we made it generic? In this example, we'll create a function which takes an object and adds a `setX` method for each property. This `setX` method would take a callback that accepts the type of the property as a parameter and returns the type of the property. This allows immutable modifications to the property based on its current value.

```ts
declare function addSetMethods<T extends object>(
  object: T,
): T & SetFunctions<T>;

const fruit = addSetMethods({
  name: "Apple",
  color: "red",
  sweetness: 80,
});

fruit.setName((currentName) => `Ripe ${currentName}`);
```

We can see that there is a `setName` method added to this fruit object; there's also a `setColor` and `setSweetness`. We do this by creating an intersection of the T type that represents the object and `SetFunctions<T>` which creates the type definitions for the extra functions.

Let's see if we can create the `SetFunctions` type. We'll use a mapped type where each property is a function that takes a callback. We'll even use a template literal type to create a new property name.

```ts
type SetFunctions<T> = {
  [P in `set${keyof T}`]: (
    callback: (currentValue: T[P]) => T[P],
  ) => void;
};
// Type Error: Type 'keyof T' is not assignable to type 'string | number | bigint | boolean'
// Type Error: Type 'P' cannot be used to index type 'T'.
```

We have two type errors. The first happens in our template literal type. TypeScript expects us to use a `string` here, but `keyof T` could possibly be a number. We can solve this by using an intersection of string and `keyof T` to constrain `P`.

```ts
type SetFunctions<T> = {
  [P in `set${string & keyof T}`]: (
    callback: (currentValue: T[P]) => T[P],
  ) => void;
};
// Type Error: Type 'P' cannot be used to index type 'T'.
```

The second issue has to do with the type of `P`. We're creating new properties on `T`, but since those properties don't exist, we can't access the type on them. We can fix this issue temporarily by constraining `T` to allow string index access on the type. We can use the `Record` utility type to do this.

```ts
type SetFunctions<T extends Record<string, any>> = {
  [P in `set${string & keyof T}`]: (
    callback: (currentValue: T[P]) => T[P],
  ) => void;
};
```
Okay, that fixes all of the type errors. What does our function look like now?

```ts
const fruit = addSetMethods({
  name: "Apple",
  color: "red",
  sweetness: 80,
});

fruit.setname((currentName) => `Ripe ${currentName.toUpperCase()}`);
// Type Error: Property 'toUpperCase' does not exist on type 'unknown'.
```
It looks like we've got some more problems. The most obvious is the type error. TypeScript wasn't able to infer the type of our function's parameter, so it uses `unknown`, which is very unhelpful.

Also, the casing on our method name is awful. `setname?` Is that the best we can do?

We can tackle the first problem with Mapped Types key renaming.

## Mapped Types Key Renaming

We jumped through a lot of hoops to get our original generic type working correctly. This is because, until recently, TypeScript didn't support renaming keys when creating a mapped type. We can now create new property names with template literal types, but we need a way to connect the new property name with the old property's type.

Enter Mapped Types Key Renaming, a new feature in TypeScript 4.1. Let's rewrite the `SetFunctions` type to properly rename our keys, then I'll explain what's going on.

```ts
type SetFunctions<T> = {
  [P in keyof T as `set${string & P}`]: (
    callback: (currentValue: T[P]) => T[P],
  ) => void;
};
```
I'm using the `as` keyword to say that we're looping over all the properties of `T`, but changing the property name based on the template literal type that we define. We can then transform the property's value based on the type of `T[P]`, like we do here to create our type safe callback function.

We can use this to exclude properties from our return type as well, without having to use the Omit utility type. If we make our new property name never, that property will be removed from the type altogether.

```ts
type SetFunctionsExceptColor<T> = {
  [P in keyof T as `set${string & Exclude<P,"color">}`]: (callback: (currentValue: T[P]) => T[P]) => void;
}
//...
fruit.setcolor(...) // Type Error: Property 'setcolor' does not exist on type
```

## Intrinsic Utility Types

TypeScript now ships with a number of intrinsic utility types. These are utilities which aren't represented by type annotations; rather, the type system modifies the type internally. Currently, there are only four intrinsic utility types, and they all relate to changing the casing of literal types.

We can use the `Capitalize` utility type to capitalize the first letter of our property name to make the casing more sensible.

```ts
type SetFunctions<T> = {
  [P in keyof T as `set${string & Capitalize<P>}`]: (callback: (currentValue: T[P]) => T[P]) => void;
}
//...
fruit.setName(...) // 🙌
```

Our method names are now in camel case.

There are also intrinsic utility types for `Uppercase`, which makes the whole string uppercase; `Lowercase`, which makes the whole string lowercase, and `Uncapitalize` which makes the first character lowercase.
