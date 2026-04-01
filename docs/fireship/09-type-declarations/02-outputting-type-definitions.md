# Outputting Type Script Definitions

When you are building an application with TypeScript, you likely don't care about the type definitions after you've compiled your project to JavaScript. At that point, all you want to do is run your code.

If you are building a JavaScript library that others consume, though, you might want to hang on to those type definitions. The only problem is the TypeScript compiler strips out all of the type signatures, leaving you with JavaScript. Fortunately, there is an option which you can use to have TypeScript output separate files, called declaration files, which you can include with your JavaScript library. Then, any TypeScript users who use your library will still be able take advantage of the types.

If we set the `declaration` property in our tsconfig.json file to `true`, TypeScript will output a type declaration file for all of our files alongside the files themselves. Let's use a slightly modified version of the TypeScript program we used earlier.

```ts
// index.ts
class Fruit {
  constructor(public name: string, public color?: string) {}
}
export class FruitBasket {
  static maxFruit: number = 5;
  #fruitList: Fruit[] = [];
  addFruit(fruit: Fruit) {
    // Throw away green fruit
    if (fruit?.color === "green") return;
    if (this.#fruitList.length < FruitBasket.maxFruit) {
      this.#fruitList.push(fruit);
    }
  }
  eat() {
    this.#fruitList.pop();
  }
}
```

Running this through the TypeScript compiler will create an `index.js` file and an `index.d.ts` file. The "d" in the extension stands for "definition". `.d.ts` files only include type definitions and declarations, but no values or executable code. Here's what the TypeScript definition file looks like for the example above.

```ts
// index.d.ts
declare class Fruit {
  name: string;
  color?: string;
  constructor(name: string, color?: string);
}
export declare class FruitBasket {
  #private;
  static maxFruit: number;
  addFruit(fruit: Fruit): void;
  eat(): void;
}
export {};
```

Looking closely at this, it almost seems like the opposite of our JavaScript output. Instead of stripping out the types, TypeScript removed the JavaScript, leaving us with just type definitions. If we were to try to import and instantiate these classes, TypeScript would complain and tell us that these classes only represent types, not values.

There are two interesting things to notice here. The first is the absence of the `#fruitList` property. Since that's marked as an ES Private field, we won't be able to access that property anyway. TypeScript doesn't even include it in the type definition.

The second is the new `declare` keyword. This only exists in TypeScript, and is used any time we are creating a type definition for something that exists in a JavaScript file. This is covered in depth in the bonus section on typing third-party modules.

Once we've generated our declaration files, we can include them in our library bundle by adding a "types" field to our package.json file. It should include a path to the type definition file relative to where package.json is located.

```ts
// package.json
{
  //...
  "types": "./build/index.d.ts"
}
```

One of the best ways to understand how TypeScript interprets type declaration files is by looking at the output of compiled TypeScript. You can easily do this by pasting TypeScript code into the [TypeScript Playground](https://www.typescriptlang.org/play/) and choosing the '.D.TS' tab on the output window.
