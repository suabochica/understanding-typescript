# Typing an npm Module that has no Types

The more complex your project becomes, the more likely you'll install a third-party package that doesn't have any type definitions, either built-in or part of Definitely Typed repository. Never fear, we can create our own type definitions to use inside our project.

This will not be easy, though. Creating a type definition for a module with no types requires us to make guesses about API of the module and what types best represent that. Sometimes we might get it wrong; other times the API will be so complicated that writing type definitions isn't practical. Remember, the purpose of TypeScript is to help you be a more productive developer. Using `any` is perfectly acceptable when all other options would take too long to implement correctly.

Third party packages come in all kinds of shapes and sizes, which means we have to adapt our type definition for each package. Because of these differences, we'll learn this material through example. We'll go through several different varieties of module that's available on NPM and create our own type definitions.

We'll start with modular libraries. You can tell that a package is modular if it has no references to `global` or `window`. That includes any top-level `var` or `function` declarations. If the package uses `import` or `require`, that's a good sign too.

We'll use a Fruit Basket package as our example, but we'll change the API of the package between examples to demonstrate certain principles. Inside our project, we'll first want to create a `fruit-basket.d.ts `file to hold our type declarations.

In our first example, we'll import several values from a module using ES Module syntax.

```ts
// index.ts
import {
  fruitBasket,
  Apple,
  eatFruit,
  timeToEat,
} from "fruit-basket";

const apple = new Apple();
fruitBasket.add(apple);

eatFruit(fruitBasket, timeToEat);
```

Just based on these values, we can see that `fruitBasket` is likely a class instance of some kind, `Apple` is a class definition, `eatFruit` is a function, and `timeToEat` is likely a number.

There are two ways we can declare our module. The first is a little more work, but makes it possible for us to submit our type definitions to the Definitely Typed repository later. Our type definition has to live in a folder structure that mirrors the package that we are writing definitions for. We put that folder in the `node_modules/@types` folder, which lets TypeScript detect it and recognize what package the type definitions are associated with. So, if we were writing a definition in this style, our folder structure might look something like this:

```txt
.
├── package.json
├── index.ts
└── node_modules
    └── @types
      └── fruit-basket
        └── index.d.ts
```

If we had more files, we would want to create separate declaration files for each file.

Then, we declare the type definitions for each of the things which are exported from the package.

```ts
// @types/fruit-basket/index.d.ts
export class Apple {
  name: string;
}

export interface FruitBasket {
  add(fruit: Apple): void;
}

export function eatFruit(
  fruitBasket: FruitBasket,
  time: number,
): void;

export const fruitBasket: FruitBasket;
export let timeToEat: number;
```

Let's note a few things here.

- The implementation of `Apple` wasn't clear, but looking at the underlying code would tell us that it has a name property.
- Any JavaScript values are defined using either `const` or `let` along with a type definition. We do this for `fruitBasket` and `timeToEat`. Our `function` declaration also counts as a value, and the `Apple` class automatically represents both a type and a value.
- We can also define and export types. We created a `FruitBasket` interface, and then used that type when defining our `fruitBasket` value; we also export it, which makes that type available to the user of our library.

We'll talk about how to work with global export later in this lesson, but if you want to easily turn your module into a UMD module that also provides a global value, you can do that with a single line that wraps your module in a namespace using `export as namespace`.

```ts
// @types/fruit-basket/index.d.ts
export class Apple {
  name: string;
}

export interface FruitBasket {
  add(fruit: Apple): void;
}

export function eatFruit(
  fruitBasket: FruitBasket,
  time: number,
): void;

export const fruitBasket: FruitBasket;
export let timeToEat: number;

export as namespace fruitBasketLib;
```

That's how you can declare a type definition in the node_modules folder.

For the rest of this lesson, we'll define our module inside our project folder. To do this, we have to declare our module explicitly so TypeScript knows what our module's name is.

If we were in a hurry and just wanted TypeScript to recognize all of the exports from `fruit-basket` as `any`, we could declare the module without adding any type definitions.

```ts
// fruit-basket.d.ts
declare module "fruit-basket";
```

We need a bit more if we want any type safety though. In our declaration file, we place our declarations inside a block after our module declaration, and we use the `export` keyword to say what values are exposed by our package. We then need to create type definitions that match the way the API is used.

```ts
// fruit-basket.d.ts
declare module "fruit-basket" {
  export class Apple {
    name: string;
  }

  export interface FruitBasket {
    add(fruit: Apple): void;
  }

  export function eatFruit(
    fruitBasket: FruitBasket,
    time: number,
  ): void;

  export const fruitBasket: FruitBasket;
  export let timeToEat: number;
}
```
Things are a little different if our package has a default export. What if instead, we imported from our package using this code:

```ts
// index.ts
import fruitBasket, { Apple, timeToEat } from "fruit-basket";
```

This requires only slight modification. We still have to define (and name) our `fruitBasket` value, but then we can use the `export default` syntax to mark that value as the default export.

```ts
// fruit-basket.d.ts
declare module "fruit-basket" {
  export class Apple {
    name: string;
  }

  export interface FruitBasket {
    add(fruit: Apple): void;
    eat(time: number): void;
  }

  const fruitBasket: FruitBasket;
  export default fruitBasket;

  export function eatFruit(
    fruitBasket: FruitBasket,
    time: number,
  ): void;

  export let timeToEat: number;
}
```

Exporting our `eatFruit` as the default works exactly the same way, but only if we can use the `esModuleInterop` flag in our TSConfig.json file. If that's not possible, such as when we submit our code to Definitely Typed, we have to use the `export =` syntax and namespaces to represent functions that are the default export. This is where things start to get a little hairy.

```ts
// fruit-basket.d.ts
declare module "fruit-basket" {
  function eatFruit(
    fruitBasket: eatFruit.FruitBasket,
    time: number,
  ): void;

  namespace eatFruit {
    const timeToEat: number;
    const fruitBasket: FruitBasket;

    interface FruitBasket {
      add(fruit: Apple): void;
      eat(time: number): void;
    }

    class Apple {
      name: string;
    }
  }

  export = eatFruit;
}
```

We declare our function, which represents the default export, and then declare a namespace with the same name and put all of the named exports inside that namespace. We define our `FruitBasket` interface inside the namespace, which makes it available to the consumer. We then reference it in our `eatFruit` function declaration by accessing the interface inside the namespace with `eatFruit.FruitBasket`. Then we export the function/namespace.

This shows a very important behavior which we need to remember as we create our type definitions. We already know that classes represent both values and types. We can also merge namespaces with values and types. In this case, by defining and function and a namespace with the same name, we've created something that is both a namespace and a value. We go through the `eatFruit` namespace to access the `FruitBasket` interface in our `eatFruit` function definition. We won't go into much more detail about this behavior in this course, but you can read about it in the TypeScript documentation.

If we need to import typings from other modules, we can do that using regular `import` syntax inside of our module declaration. This works exactly the same as ES Modules, so we can also immediately export values and types from other modules.

```ts
// fruit-basket.d.ts
declare module "fruit-basket" {
  import { Apple } from "fruit-apple";
  export { Apple } from "fruit-apple";

  export interface FruitBasket {
    add(fruit: Apple): void;
  }

  export function eatFruit(
    fruitBasket: FruitBasket,
    time: number,
  ): void;

  export const fruitBasket: FruitBasket;
  export let timeToEat: number;
}
```

Global libraries behave completely differently, so our type definitions have to behave accordingly. A global library is accessed from the global scope without using any form of `import`. `jQuery`, `d3` and many other libraries use this approach.

However many libraries are written as UMD libraries, which means they can be referenced both from the global and using an `import` statement. You can tell that a library is exclusively global if it has top-level variable and function declarations, or if it explicitly references the `global` or `window` objects, without defining any kind of exports.

Suppose our `fruit-basket` library were accessed on the global object. Using it would look something like this:

```ts
// index.ts
const { Apple, fruitBasket, eatFruit, timeToEat } = fruitBasketLib;
const apple = new Apple();
fruitBasket.add(apple);

eatFruit(fruitBasket, timeToEat);
```
Namespaces are TypeScript's way of referencing global objects. If our library is truly global, we just wrap all of our definitions in a namespace.

```ts
// fruit-basket.d.ts
declare namespace fruitBasketLib {
  class Apple {
    name: string;
  }

  interface FruitBasket {
    add(fruit: Apple): void;
    eat(time: number): void;
  }

  const timeToEat: number;
  const fruitBasket: FruitBasket;

  function eatFruit(fruitBasket: FruitBasket, time: number): void;
}
```
Referencing other type declarations can be done using a triple-slash reference.

```ts
// fruit-basket.d.ts
/// <reference types="fruit-apple" />

declare namespace fruitBasketLib {
  interface FruitBasket {
    add(fruit: fruitApple.Apple): void;
    eat(time: number): void;
  }

  const timeToEat: number;
  const fruitBasket: FruitBasket;

  function eatFruit(fruitBasket: FruitBasket, time: number): void;
}
```