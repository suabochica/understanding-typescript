# Advanced Function Typing

We're not done learning how to add types to functions.

## Overloaded Functions

Sometimes you have a single function which accepts different counts of arguments or different argument types. We could easily type something like that with Union types and optional parameters. In fact, if the function is simple, it can be better to type them this way.

```ts
function stringOrArrayLength(input: string | unknown[]) {
  return input.length;
}
```

If we had more than a few arguments or types in our union, it could get messy. That's where function overloading comes in.

We overload a function by adding multiple function type signatures above the function definition. If we were to overload the same function as above without using unions, it might look like this:

```ts
function stringOrArrayLength(input: string): number;
function stringOrArrayLength(input: unknown[]): number;
function stringOrArrayLength(input: { length: number }): number {
  return input.length;
}
```

The last function signature is known as the "implementation signature", and has to match the signature of all of the overloads. Since both `string` and `arrays` have a `length` property, I can use an object with a `length` property, but it's common to use any for the parameters and narrow the type of each parameter in the function implementation.

You can add as many function signatures and parameters as you want, so long as the implementation signature matches all of them.

## Callable Interfaces

Since functions in JavaScript are just objects, you can add properties to them. TypeScript lets you annotate these situations with callable interfaces. You assign whatever properties you want, and then assign the function parameters and return type. The function annotation is a little different, with a colon instead of an arrow.

```ts
interface IceCreamSundae {
  (toppings: string[]): void;
  baseIceCream: string;
  chocolateSyrup: number;
  cherry: boolean;
}

const sundae: IceCreamSundae = (toppings: string[]) => {};
sundae.baseIceCream = "vanilla";
sundae.chocolateSyrup = 5;
sundae.cherry = true;
```

There's something kind of weird going on here. Usually, when you define a variable with an interface type, it has to have all of the properties of that interface when it is defined. However, JavaScript makes it impossible for us to define regular functions with properties. Because of that, TypeScript lets us off a little easy. So long as we assign those properties at some point, TypeScript won't complain.

This will, however, cause problems if we try to access properties _before_ assigning them. TypeScript won't give us a warning in this situation:

```ts
const sundae: IceCreamSundae = (toppings: string[]) => {};
sundae.baseIceCream = "vanilla";
sundae.chocolateSyrup = 5;

console.log(sundae.cherry); // undefined
sundae.cherry = true;
```

## `this` Parameter

When an object includes a function declaration, you can access the object with the special `this` variable. TypeScript provides a way for you to apply a type annotation to `this` so you can have type safety when accessing `this`.

```ts
interface IceCreamSundae {
  baseIceCream: string;
  chocolateSyrup: number;
  cherry: boolean;
}
const hotFudgeSundae = {
  baseIceCream: "vanilla",
  chocolateSyrup: 5,
  cherry: true,
  eat(this: IceCreamSundae) {
    if (this.cherry) {
      console.log("Mmmm. Tasty.");
    } else {
      console.log("Could be better.");
    }
  },
};

hotFudgeSundae.eat(); // 'Mmmm. Tasty.'
```

Remember, this is a special parameter to functions, so we don't have to pass it to our eat function. When we compile this into JavaScript, the this type annotation is removed.

```ts
const hotFudgeSundae = {
  baseIceCream: "vanilla",
  chocolateSyrup: 5,
  cherry: true,
  eat() {
    if (this.cherry) {
      console.log("Mmmm. Tasty.");
    } else {
      console.log("Could be better.");
    }
  },
};
```