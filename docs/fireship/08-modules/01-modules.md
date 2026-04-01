# Modules in Type Script

## Exporting Types

Sometimes we define a type in one file that we need to reference in another file. We can export and import them like any other value, even alongside normal values.

```ts
// ./fruitBasket.ts
export class Fruit {}
export type FruitBasket = Fruit[];

export const fruit: FruitBasket = [];
```

We can then import and use them in other files.

```ts
// ./main.ts
import { FruitBasket, Fruit } from "./fruitBasket.ts";

export function addToBasket(basket: FruitBasket) {
  basket.push(new Fruit());
}
```

Remember, type definitions are removed entirely from our code when we compile TypeScript to JavaScript. These types aren't actually being imported at runtime; they only exist before the code is compiled.

Sometimes we need to import a type, but we don't want to execute any code from the file we are importing them from. One solution would be to move the types out into a separate file. Another solution is indicating to TypeScript that the only things we are importing from a file are types. We can do that with the `type` keyword.

```ts
// ./main.ts
import type { FruitBasket, Fruit } from "./fruitBasket.ts";
```

This indicates that `FruitBasket` and `Fruit` only represent types, not values. Classes are an interesting case; they represent both types and values. If we were to try to instantiate `Fruit` after only importing the type, TypeScript would warn us that we can't do that.

```ts
// ./main.ts
import type { FruitBasket, Fruit } from "./fruitBasket.ts";

new Fruit(); // Type Error: 'Fruit' cannot be used as a value because it was imported using 'import type'.
```

## ES Modules vs CommonJS

TypeScript is a compiler in addition to being a type checker. That means you can feed it any valid JavaScript code and it can transform it into other JavaScript code.

One place where this becomes important is in the module system. There are significant differences between CommonJS, module loaders for AMD modules, and ES Modules, and those differences are most obvious when we have the `esModuleInterop` tsconfig.json flag disabled.

Take a look at the following example using both ES Modules and CommonJS. All of these examples assume the `esModuleInterop` flag is turned off.

```ts
// fruitBasket.js
export default new FruitBasket();

// main.js
import * as fruitBasketModule from "./fruitBasket.js";
import fruitBasketDefault from "./fruitBasket.js";
const fruitBasketRequire = require("./fruitBasket.js");

console.log(fruitBasketModule); // { default: [Function: FruitBasket] }
console.log(fruitBasketDefault); // [Function: FruitBasket]
console.log(fruitBasketRequire); // { default: [Function: FruitBasket] }
```

We can see that when the export is using ES Modules, using a `require` statement behaves more like the `import * as` type of import statement. If we wanted to access the default export using `require`, we would have to use property access to get the default property off of the `fruitBasketRequire` variable.

What happens when we export using CommonJS?

```ts
// fruitBasket.js
module.exports = new FruitBasket();

// main.js
import * as fruitBasketModule from "./fruitBasket.js"; // Error: File './fruitBasket.ts' is not a module.
import fruitBasketDefault from "./fruitBasket.js"; // Error: File './fruitBasket.ts' is not a module.
const fruitBasketRequire = require("./fruitBasket.js");

console.log(fruitBasketRequire); // [Function: FruitBasket]
```

The TypeScript compiler won't even let us try to import these modules using ES Modules syntax. It a file doesn't use an `import` or `export` statement, it doesn't count as a module, and you have to use require to pull in the file's contents. Fortunately, it behaves the way you would expect for CommonJS - instead of putting the export onto the `default` property, it provides it to us directly.

TypeScript has it's own module syntax which is unique to TypeScript. It's designed to model the traditional CommonJS workflow, while being compatible with ES Module syntax.

Exporting modules is similar to CommonJS, except instead of using the special `module.exports` object, we assign our exported values to a special export object.

```ts
// fruitBasket.js
export = new FruitBasket()
```

We can then import it using a special `import ... = require(...)` syntax. It looks kind of like CommonJS mixed with ES Modules.

```ts
// main.js
import FruitBasket = require('./fruitBasket.js')

console.log(FruitBasket) // [Function: FruitBasket]
```

Of course, TypeScript helps us with this incompatibility when we turn on the `esModuleInterop` tsconfig.json flag. Be aware that the `export =` and `import =` syntax is TypeScript specific. It isn't supported if you are using TypeScript with many third-party tools, like Babel. I would recommend avoiding it if possible. Using the `esModuleInterop` flag will cover most cases. Try to only use ES Modules for all of the files you write in your program. If you have to import CommonJS code, use CommonJS syntax or TypeScript's special syntax.