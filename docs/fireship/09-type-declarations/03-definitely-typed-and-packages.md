# Definitely Typed and @types/ packages

Third-party packages are a big part of why working with JavaScript is so great. NPM has a huge ecosystem of packages which we can use in Node.js projects or on the web. While some of these packages are written in TypeScript and include TypeScript definitions, most of them are still written in JavaScript. That means we can't use them in our project without decreasing our type safety, since we might accidentally use an API wrong, or might use a function return value in the wrong way. In addition, we won't be able to take advantage of the IDE enhancements which TypeScript provides, which can be really helpful for figuring out how to use an API.

Fortunately, there is a huge repository of user-submitted types for over 7,000 NPM packages. It's called Definitely Typed, and it publishes its type definitions on NPM using the `@types/` namespace. Adding types to our project is as easy as running `npm install`.

One of the most used type definitions is the one for Node.js. If you want to use any of Node.js's APIs, like `fs` or `path`, you'll want to install these type definitions.

```ts
npm install --save-dev @types/node
```

That's all you have to do! You can now take advantage of all of Node.js's features without needing to worry if you are using the types correctly - TypeScript will pick up the definition you installed and warn you if there is a problem.

If we have `strict` mode on, or if we are using the `noImplicitAny` flag in tsconfig.json, TypeScript will warn you if a package doesn't have type definitions when you try to import it.

```ts
import React from "react";
// Type Error: Could not find a declaration file for module 'react'. 'node_modules/react/index.js' implicitly has an 'any' type.
//   Try `npm install @types/react` if it exists or add a new declaration (.d.ts) file containing `declare module 'react';`
```

Installing the `@types/react` package with NPM resolves the issue.

Some packages don't have definitions on DefinitelyTyped, which means running `npm install @types/somePackage ` will fail. In that case, you will have to create the type definition yourself. That's fairly uncommon, since the most popular libraries on NPM have type definitions on DefinitelyTyped. If you still need to create a new definition file for a third-party module, check out the bonus lesson.

In the event that you need to use a package with no type definitions, you can create a simple shim which will let TypeScript recognize the module, but make the entire module `any`. This works by creating a `.d.ts` file inside your project folder. The file needs to have the same name as the package you are importing. Then, inside that file, use the `declare` keyword to tell typescript about your module:

```ts
//fruit-basket.d.ts
declare module "fruit-basket";
```

Now, anywhere that we import the fruit-basket module, we will get a value with the any type. As always, when we use any, we lose all of the type safety which comes with TypeScript, but when you've got deadlines to meet and don't have the time or attention to add types to a third-party package, this will work in a pinch.

## Overriding Built in Definitions

Sometimes we might need to override a built in type definition, such as adding something to the `window` global. We can do this with a special type declaration that extends the global namespace. This declaration should happen inside our application code, not in a `.d.ts` file.

```ts
declare global {
  interface Window {
    fruitList: Fruit[];
  }
}
```

The interface that we define on the `Window` object (note the capital W) will be combined with the built in definition, and then anywhere in our code that we reference `window.fruitList`, we'll have the correct type definitions.
