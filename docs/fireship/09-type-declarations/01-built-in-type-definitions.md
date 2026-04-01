# Built-in Type Definitions

It would be really tedious to have to write type definitions for every built-in JavaScript object. Fortunately, TypeScript comes with its own set of definitions for every feature in JavaScript, called the standard library. We can use any of the functions in JavaScript's standard library without worrying about doing something unsafe. TypeScript version updates include updates to these definitions, so you can confidently use new features too.

```ts
Math.max; // (method) Math.max(...values: number[]): number
isNaN; // function isNaN(number: number): boolean

new Date().toLocaleString; // (method) Date.toLocaleString(): string (+1 overload)
```

You can use type definitions from the standard library too. For example, all of TypeScript's utility types are included in the standard library, so we don't have to define them ourselves.

```ts
type ReadonlyFruit = Readonly<{ name: string; color: string }>;
// type ReadonlyFruit {
//   readonly: name: string;
//   readonly: color: string;
// }
```

# TSConfig.json `lib` property

The default configuration for TypeScript includes definitions for ES5 and DOM APIs, such as those that exist in web browser like `document.getElementById` and `HTMLElement`. We can configure which standard library packages we want to include by modifying the `lib` property of our tsconfig.json file. This property takes an array of strings representing different features or packs of features.

For example, if we wanted to use ES2020 features, we could use put `lib: ["ES2020"] `in our tsconfig.json. This would automatically include all of the previous versions, so we don't have to list them all. In fact, we can put any version of JavaScript, from ES2015 to the current version, or use ESNext to get a continually updated set of new JavaScript features.

If we manually change the `lib` property of tsconfig.json, we'll have to include the DOM API standard library too. We just need to include it in the array, like so: `lib: ["ESNext","DOM"].

We can also choose specific standard library components, such as `ES2015.Proxy `to get support for proxy syntax. However, it's usually best to choose the specific version of JavaScript we want to have the type definitions for.

TypeScript doesn't ship with support for Node.js APIs, but we'll talk about how we can add support in a future lesson.