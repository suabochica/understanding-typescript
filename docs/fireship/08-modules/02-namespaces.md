# Type Script Namespaces

Before ES Modules was standardized and included in JavaScript, TypeScript had its own form of code organization called namespaces. Each namespace that you create exist in the global environment, similar to IIFE modules. That makes it so you can access anything in any namespace from any other file in your project, but makes it difficult to examine what dependencies a specific file has.

You might find some situations where using namespaces could be valuable, such as creating type definitions for a third-party module. Or you might be working with a project that already uses namespaces. In most circumstances, though, you should use modules instead of namespaces. Modules are more compatible with tools like Babel and Node.js. ES Modules are well supported and provide for better code reuse and stronger isolation. They can also be statically analyzed, making it easier to work with bundlers like Webpack.

In short, namespaces are supported by TypeScript and have a few uses, but you should avoid using them in favor of modules for any new projects. This section on namespaces is included in case you encounter them in any TypeScript codebases.

## Using Namespaces
Namespaces are blocks which we create with the `namespace` keyword. Anything inside the block is considered part of the namespace. If we want something inside our namespace to be accessible outside our namespace, we use the `export` keyword to its declaration. We can export types and values from within namespaces.

```ts
namespace FruitBasket {
  export abstract class Fruit {
    name!: string;
  }
  export type FruitBasket = Fruit[];

  const fruitBasket: FruitBasket = [];

  export function addToBasket(fruit: Fruit) {
    fruitBasket.push(fruit);
  }
  export function eat() {
    return fruitBasket.pop();
  }
  export function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
}
```
Here, we're exporting the abstract `Fruit` class which we can extend, the `FruitBasket` type, and a few functions. Those are the only things which can be accessed from outside of our namespace.

If this sounds familiar, you might be interested to know that namespaces are implemented as IIFEs when they are compiled to JavaScript.

```ts
var FruitBasket;
(function (FruitBasket) {
  class Fruit {}
  FruitBasket.Fruit = Fruit;
  const fruitBasket = [];
  function addToBasket(fruit) {
    fruitBasket.push(fruit);
  }
  FruitBasket.addToBasket = addToBasket;
  function eat() {
    return fruitBasket.pop();
  }
  FruitBasket.eat = eat;
  function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
  FruitBasket.nextFruit = nextFruit;
})(FruitBasket || (FruitBasket = {}));
```

The `var FruitBasket;` declaration assigns our `FruitBasket` namespace to the global scope, and the function closure makes it so nothing is exposed globally except the things we want. Anything with an `export` keyword is added to the `FruitBasket` global object, such as `FruitBasket.nextFruit = nextFruit`;, making it accessible from outside.

## Multiple Files

While we can access namespaces globally, the order that these files are loaded and executed makes a differences. Fortunately, we can create a dependency graph of our files using a reference tag. This is a comment added to the top of our TypeScript file that tells TypeScript that we're referencing another file. Notice below that when making the comment, we use three slashes (`/`) instead of two.

In this example, we extend our namespace with additional properties in a separate file. We use the reference tag to tell the TypeScript compiler that the `fruitBasket.ts` file needs to be loaded first.

```ts
// ./fruitBasket.ts
namespace FruitBasket {
  export abstract class Fruit {
    name!: string;
  }
  export type FruitBasket = Fruit[];

  const fruitBasket: FruitBasket = [];
}

// ./fruitBasketFunctions.ts

/// <reference path="fruitBasket.ts">
namespace FruitBasket {
  export function addToBasket(fruit: Fruit) {
    fruitBasket.push(fruit);
  }
  export function eat() {
    return fruitBasket.pop();
  }
  export function nextFruit() {
    return fruitBasket[fruitBasket.length - 1];
  }
}
```

By default, the TypeScript compiler will emit a single file for each file in our project. That means we need to add a separate `<script>` tag for each file, and make sure they are imported in the correct order.

```html
// index.html
<html>
  <head>
    <!-- ... -->
  </head>
  <body>
    <!-- ... -->
    <script src="fruitBasket.js" type="text/javascript"></script>
    <script
      src="fruitBasketFunctions.js"
      type="text/javascript"
    ></script>
  </body>
</html>
```

Depending on which module system we are using, we can configure TypeScript to emit a single file with the namespace declarations in the correct order using the `outFile` tsconfig.json setting. We'll talk more about that when we talk about advanced TypeScript configuration.
