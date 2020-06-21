Section 3: Understanding the TypeScript Compiler
================================================

In this module we'll take a closer look at the typescript compiler. Thus far we always just used it by running `tsc` and then pointing at a file which we want to compile.

Now whilst that of course works it's not really feasible for bigger projects where you have multiple files or where you simply don't want to run this command.

After every change you want to see in practice in addition to that convenience which we currently don't have.

There also are a couple of interesting things you can configure regarding the compilation process which actually change what is compiled and how it is compiled. These are therefore the things we'll take a closer look at in this module.


Index
------------
1. Using "Watch Mode"
2. Compiling the Entire Project
3. Including & Excluding Files
4. Setting a Compilation Target
5. Understanding TypeScript Core Libraries
6. More Configuration & Compilation Options
7. Working wit Source Maps
8. rootDir & outDir
9. Stop Emitting Files on Compilation Errors
10. Strict Compilation
11. Code Quality Options
12. Debugging with Visual Studio Code


Using "Watch Mode"
--------------------------------
Now to get started I want to make sure that I don't have to rerun the `tsc` command we're at point at a file after every change I make because right now whenever I change something in my `ts` file and to reflect that change in my output file and on `localhost` we have to save to file run the compilation again and then reload.

So to get rid of that we can enter *watch mode*. That means we can tell TypeScript to watch file and whenever that file changes typescript will recompile. The next command enables the watch mode:

```
$ tsc app.ts -w
```

Now whenever we change anything in `app.ts` and we save it, the file on the disk technically changes as well. You see does automate automated you read compiles, and of course this also means that if we would do anything which is not allowed (e.g. reassigning to a constant and then a wrong type as well).

Whenever we tried to do that of course it all recompensed, but, then just as if we manually run the command we see the compilation error down there. So watch mode is already a big improvement.

The downside is that we still have to specifically target the file and at the moment of course this is the only file we're working with. But typically in bigger projects that's not necessarily the case.

Compiling the Entire Project
--------------------------------
In real apps, your projects will have more than one file. Let's check the next project folder structure.

```
- project
    + node_modules
     analytics.ts
     app.ts
     index.html
     package-lock.json
     package.json
```

We have the `app.ts` file as root of our project, and let's imagine that in `analytics.ts` we will consume handlers over data. So far, we use the `tsc` to compile the file individually. To compile several file at the same time, we should tell to TypeScript that the current folder is a project, to achieve that we should run:

```
tsc --init
```

This command will create a `tsconfig.json` file at root lever with a default set up. Now, the TypeScript's compiler will identify the `tsconfig.json` and the will compile all the `.ts` files in the folder. So, when we run `tsc` it will be generate all the `.js` files respectively.

Including & Excluding Files
--------------------------------
Now let's have a look at the `tsconfig.json` file because this is a crucial file for managing this project. It essentially tells TypeScript how it should compile these files.

Now before we dive into the compiler options where we as the name suggests can configure how the compiler behaves.

So, at the end of the file, we will add the `exclude` to set what files we want ignore in this project.

```json
// tsconfig.json
...
    "exclude": [
        "basics.ts",
        "core-types.ts",
        "function.ts",
        "union-aliases.ts",
    ],
```

Similarly, we have a property `include`, where we define explicitly what files will be included in the project.

```json
// tsconfig.json
...
    "include": [
        "app.ts",
        "analytics.ts",
    ],
```

> Note: We can use the regex to set folders and not just files as values. so, for example, if we want ignore all the `.dev.ts` files in any folder we can use `**/*.dev.ts`, of if we want to ignore the current folder we use `./`.

Setting a Compilation Target
--------------------------------
Now that we have a understanding of how we can manage our files with the compiler, let's dive into the compiler options because that's really interesting.

This allows us to control how our types could code is compiled. So not only which files but also how the files which are getting compiled are treated by TypeScript.

In the `tsconfig.json` you will see that we have a bunch of options below the `"compilerOptions"` key. Let's start from the top to the bottom and the first property is `'target'`:

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",      /* Specify ECMAScript target version */
    ...
    }
}
```

With the `target` option we specify the ECMAScript target version that by default is `ES5`. We can update this values to `ES2020`, and then the TypeScript's compiler will generate a `.js` file with the features that are enable in the ECMAScript version. 

Understanding TypeScript Core Libraries
--------------------------------
The next option is `module`, but we will skip it for a moment, because in future section we will learn about modules in TypeScript and how we can connect multiple files.

Now, `lib` is a interesting option, because according to the specified target it will assume default values. this is an option that allows you to specify which default objects and features TypeScript notes.

```json
{
  "compilerOptions": {
    "target": "es6",      /* Specify ECMAScript target version */
    // "lib": [],         /* Specify library files to be included in the compilation. */
    ...
    }
}
```

Initially it is commented but let's review the next case: Imagine that we have a button in our mark up, and we add an event listener to that button to trigger an action.

```typescript
const button = document.querySelector('button')!;

button.addEventListener('click', () => {
    console.log('Clicked')
})
```

For this code is a valid question to ask, from where `document` comes? or from where I'm consuming the `querySelector` method? This snippet runs in the browser, but keep in mind that JavaScript can run also in NodeJs, an this code under the context of NodeJs have no sense.

The `document` object comes from a library that is imported by default in the TypeScript's compiler. This library is `dom`. So, under the hood the `lib` option in the compiler options is importing these libraries:

```json
{
  "compilerOptions": {
    "target": "es6",      /* Specify ECMAScript target version */
    "lib": [
        "dom",
        "es6",
        "dom.iterable",
        "scripthost",
    ],         /* Specify library files to be included in the compilation. */
    ...
    }
}
```
Lesson learned: When you set a target value, TypeScript add some values by default in the `lib` option. 

More Configuration & Compilation Options
--------------------------------

There are some self explanatory options that we will show next:

```json
{
  "compilerOptions": {
    ...
    // "allowjs": true,                       /* allow javascript files to be compiled. */
    // "checkjs": true,                       /* report errors in .js files. */
    // "jsx": "preserve",                     /* specify jsx code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* generates a sourcemap for each corresponding '.d.ts' file. */
    ...
    }
}
```

For `allowJs` and `checkJs` we explicitly some extend the TypeScript features on JavaScript files. `jsx` is related to React app, and `declaration`, `declarationMap` are advances concepts which matter to you if you are shipping your project as a library. Then you will need a manifest files which describes all the types you have in your project.

Working wit Source Maps
--------------------------------
Source map helps us with debugging and development.

```json
{
  "compilerOptions": {
    ...
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    ...
    }
}
```

If we now go to the browser and we want to understand what our code does we can go to the **sources** tab here in the developer tools and there we find our JavaScript files. Currently we will see out compiled `app.js`.

Now we can dive into these files and the good thing is these files are fairly readable to us humans of course because they contain JavaScript code in the end. That's good, but, what if we had more complex types of code and we want to debug our TypeScript code and not the compiled JavaScript code.

In other words it would be nice if we would see the types of files here and not the JavaScript files. If you uncomment the `sourceMap` option, and run `tsc` now the compiler will generate a `js.map` file that work as a bridge between the browser and our `.ts` file. This time, when you open the developer tools under the **source** tab you will see the `app.ts` file. Then we can debugger points to check the step by step the execution of the code inside the `.ts` file.

rootDir & outDir
--------------------------------
The next options are listed below:

```json
{
  "compilerOptions": {
    ...
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./dist",                       /* Redirect output structure to the directory. */
    "rootDir": "./src",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    ...
    }
}
```

With `outFile` we follow a good practice to concatenate all our scripts in just one file. With this action we reduce the quantity of request to get the resources for the web page. However, the downside is that it will be not easy to debugging the production code. So, the recommendation is do the debugging in development stage.

Then we got `outDir` and `rootDir`. To understand these options lets share the folder structure of a web app:

```
.
├── dist
├── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
└── tsconfig.json
```

The relevant directories here, are `dist` and `src`, because it is a convention where `src` will store all our files in development lap, and `dist` will house the file ind production phase. so, if we run the `tsc` command we the last configurations, the `.ts` files will hold in `./src` and the `.js` file will appear in `./dist`.


Stop Emitting Files on Compilation Errors
--------------------------------
There are two additional options that will make tight with the development of our TypeScript files:

```json
{
  "compilerOptions": {
    ...
    "noEmit": false,                          /* Do not emit outputs. */
    "noEmitOnError": true,                    /* Do not emit outputs when exist a compilation error in TypeScript. */
    }
}
```

The `noEmit` options it is useless by itself, because it will not create any compiled `.js` file. However, the `noEmitOnError` adaptation it is. This options will no generate any `.js` file id the TypeScript compiler detects errors in your code.

Strict Compilation
--------------------------------
Following the order of the options, now we enter to the _strict type-checking_ options. The next configuration:

```json
{
  "compilerOptions": {
    ...
    "strict": true,                           /* Enable all strict type-checking options. */
    }
}
```

It is equivalent to:

```json
{
  "compilerOptions": {
    ...
    "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,              /* Enable strict null checks. */
    "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
    }
}
```

Let review an example for some of these options. So the `noImplicitAny` options raise an error on expressions and declarations with an implied `any` type. For example:

```typescript
let logged;

function sendAnalytics(data: string) {
  console.log(data);
  logged = true
}

send analytics('The data')
```

If the function signature of the last snippet will `function sendAnalytics(data)`, the compiler raise an error over the `data` parameter because it will be associated to the `any` type.

The `strictNullChecks` is self explanatory, but lets bring back an example to recap:

```typescript
const button = doucment.querySelector('button')!;

button.addEventListener('click', clickHandler.bid(null, "You are welcome!"))
```

Please notice the exclamation mark at the end of the first line `!`. If we omit this detail, the TypeScript compiler will throw an error, because it is probable that the `button` variable will `null` (it can be retrieved from the DOM). The `!` is an operator that use TypeScript to enable validation over `null` values.

The `strictBindCallApply` enable the strict use of the `bind`, `call` and `apply` methods of JavaScript, demanding all the required parameters for each method. Review the next snippet.

```typescript
const button = doucment.querySelector('button')!;

function clickHandler(message: string) {
  console.log('Clicked' + message)
}

button.addEventListener('click', clickHandler.bid(null, "You are welcome!"))
```

If we don't pass the `"You are welcome!"` message, the compiler will raise an error.


The `alwaysStrict` parse in strict mode an emit `use strict` for each source file. So the compiled JavaScript files will look like:

```javascript
"use strict"

const button = doucment.querySelector('button');
button.addEventListener('click', () => {
  console.log('clicked');
})
```

Code Quality Options
--------------------------------

The next set of option to review in the file are the _additional check_, and there are options that will improve our code quality:

```json 
{
  "compilerOptions": {
    ...
    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
  }
}
```

For `noUnusedLocals` the compiler will throw a warning when you declare a local variable but it is never use. Below an example:

```typescript
function clickHandler(message: string) {
  let userName = "Edward";
  console.log("Clicked" + message);
}
```

For this snippet the compiler will raise a warning for the `userName` variable, because it is never used. Keep in mind that if `userName` will a global variable TypeScript will not associate the variable with the warning.

Similarly, the `noUnusedParameters` option works. If you have a function with a parameter that is never user, then the compiler will rise the respective error. For example:

```typescript
function clickHandler(message: string, age: number) {
  console.log("Clicked" + message);
}
```

In this case, the `age` parameter will highlighted by TypeScript and it will raise an error notifying that the `age` variable is never used.

Lastly we got the `noImplicitReturns` options, that report an error when functions do not return values. Please review the next code:

```typescript
function add(n1, n2) {
  if (n1 & n2 > 0) return n1 + n2
}
```

For this code, the compiler will throw an error because the `add` function does not return anything. The `return` keyword in in the scope of the `if` block but now in the scope of the function.


Debugging with Visual Studio Code
--------------------------------

For debugging in Visual Studio Code we recommend use the next plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

The last one will allow you to have the Chrome's DevTools inside VSCode. Remember set `sourceMap` option as `true` to allow the debugging in `.ts` files directly.

Wrap Up
--------------------------------
That's it for this module.

We had a very detailed look at the types of compiler how you can configure it and how you can make sure that it really compiles your code the way you want.

We had to look at all these different options especially district options really allow you to write correct code and not run into strange bugs or runtime bugs you might face for example with the strict null checks.

And in addition to that we had a look at debugging how you can easily configure chrome and VSCode such that you can debug from inside view as code debugging from inside chrome with `sourceMaps` and the sources tab of course is always an option.

The key here also are the `sourceMaps` which you are configuring to be generated in the `tsconfig` file which are these map files that live next to your JavaScript files.

They basically act as bridges for the debugger between your JavaScript files and your TypeScript files.


### Useful Resources & Links
Attached you find all the code snapshots for this module - you also find them attached to individual lectures throughout this module.

These links might also be interesting:

- [tsconfig Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Compiler Config Docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [VS Code TS Debugging](https://code.visualstudio.com/docs/typescript/typescript-debugging)
