# Additional `tsconfig.json` Options

TypeScript has over 100 different configuration options which can be used to fine-tune how the type checker and compiler work. We've already covered many of these in previous lessons, such as `strict`, `module`, and `lib`. This lesson will cover several other options.

To help keep things simple, I've condensed the full list of options down to the most helpful options that you might be reaching for in a TypeScript project, organized by what they are used for. In a future lesson, we'll talk about options for TypeScript's module resolution algorithm. You can find the rest of the options in the [TypeScript Documentation Reference](https://www.typescriptlang.org/tsconfig/).

## Including and excluding certain files

These first three properties aren't included in the `compilerOptions` section of tsconfig.json like most of the other properties. They are their own top-level properties. We use them to tell TypeScript what files in the project should be type checked and compiled by TypeScript and which ones to ignore.

### `files`

The `files` property is a list of paths, relative to the tsconfig.json file, to all of the files in your project. If your project is small and doesn't necessarily include any dependencies from `node_modules`, using the `files` can make TypeScript speedier since it doesn't have to comb your filesystem for the files that are present in your project. All you have to do is include every file in the list.

```json
{
  "compilerOptions": {},
  "files": ["fruitBasket.ts", "fruit/apple.ts", "fruit/banana.ts"]
}
```

This can get tedious, though, so most often you'll use `include` and `exclude`. files is not mutually exclusive with include and exclude though; you can always list specific files in your program with `files`.

### `include`

Typical projects have a few directories, some of which have source code that needs to be checked and some which have support files that don't need to be checked. By default, TypeScript will compile all `.ts` and `.tsx` files in the same directory as the tsconfig.json file. We can selectively include the files that we need using the `include`.

Both `include` and `exclude` use a wildcard character system when evaluating the glob patterns you use in the file paths. `**/` matches any directory nested at any level, `*` matches 0 or more characters in a file or directory name, and `?` matches exactly one character in a file or directory name.

We can use these rules to create a glob that matches any file extensions with `.ts` or `.js`, but not `.json` or `.css`, inside our src directory.

```text
src/**/*.?s
```

We can leave off the extension altogether, since TypeScript will automatically include `.ts`, `.tsx`, and `.d.ts` (along with their JavaScript counterparts). Here's a very common `include` setting.

```json
{
  "compilerOptions": {},
  "include": ["src/**/*"]
}
```

One thing to remember is that `include` only tells TypeScript where to start. If one of our files imports a module from a file that is not matched by our `include` list, that file will still be compiled and type checked by TypeScript.

### `exclude`

When using `include`, you'll also want to explicitly exclude some directories and files. One obvious example is the `node_modules` folder. We definitely do not want to have to compile all of our third-party module code if we don't have to.

The `exclude` property acts as a mask to the files we specified in our include property. That means that it doesn't actually exclude files altogether; it just keeps files from being picked up by the TypeScript compiler.

One notable exception is the `node_modules` folder. TypeScript doesn't work as a bundler like Webpack does, so it won't ever try to pull out or compile files that you import from `node_modules`. You should still include `node_modules` in your exclude list, but don't worry about those files being added to your project's output when TypeScript compiles.

```json
{
  "compilerOptions": {},
  "exclude": ["node_modules/**/*", "scripts/**/*"]
}
```

## Improving the developer experience

### `incremental`

When your TypeScript project starts getting big, your build times might increase substantially. TypeScript provides a few options to make your project build faster and use less memory in these circumstances. If your project is pretty small, this changes might be helpful, but likely won't make a large difference.

Usually when TypeScript compiles or type checks your code, it does it all at once. Changing even a small part of your project would still require TypeScript to at least look at other files that are imported and exported, and eventually every file has been checked anyway.

When `incremental` is turned on, TypeScript will keep a cache of the compilation results for itself when it runs a full compile. On subsequent compiles, it will use this cache to skip parts that don't need to be compiled again, making the overall build faster. The cache exists in the same folder as the build output, and have no relation to the actual JavaScript output files.

```json
{
  "compilerOptions": {
    "incremental": true
  }
}
```

### `sourceMap`

Source maps are generated files which provide a map from compiled output, such as the `.js` files which TypeScript generates, back to the original `.ts` source, without having to include the source files themselves. They can be included in build output and shipped to production environments without affecting the end-user's experience since source maps are only loaded when the user opens the developer tools.

Turning on source maps will increase your build time, but could be helpful when trying to debug your code in a production environment. Turning on source maps is as easy as activating the `sourceMap` flag.

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

You can also include your source maps inline with your JavaScript files using the `inlineSourceMap` option, but that will increase the size of your output files and could degrade your user experience. You should only use that option if the server that you are serving your code on doesn't support source maps.

### `checkJs`

If your project doesn't have any `.js` files, or if you specifically don't want TypeScript to check your `.js` files, you can turn off the `checkJs` option. This will still let TypeScript compile your JavaScript files, but it won't give you any warnings or errors if your JavaScript has any type errors. This is helpful when incrementally migrating a JavaScript project to TypeScript.

```json
{
  "compilerOptions": {
    "checkJs": false
  }
}
```

### `jsx`

If you are working with React or another library that uses JSX, you can configure how TypeScript compiles the JSX syntax. If you are working with React, you'll want to set this setting to `react`; otherwise, you can set it to `preserve`, which will keep the JSX syntax in place without changing it.

You can also use the `jsxFactory` option to change which function is used to compile JSX Elements. By default, it uses `React.createElement`, but if we were working with a Preact project, we would want to use `preact.h`. Here's what the full Preact configuration might look like.

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "preact.h"
  }
}
```

Remember, whenever you are working with JSX, the JSX code has to be inside a `.tsx` file. If you are having strange errors with your JSX, double check the file extension.

## Configuring the Compiler output

### `outDir`

This lets you specify where your compiled source will be placed relative to the tsconfig.json file. This includes source maps and declaration files, if applicable. If the directory doesn't exist, TypeScript will make it before outputting the compiled files.

```json
{
  "compilerOptions": {
    "outDir": "build"
  }
}
```

### `noEmit`

This option tells the TypeScript compiler to only type check our code, not output any files. This is incredibly useful if we are using TypeScript with a separate build tool, like Webpack, Babel, or Parcel. We can still use TypeScript to type check our files with a single command, perhaps as part of our CI/CD process, but the actual compilation will be handled by the other tools in our toolchain.