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

Understanding TypeScript Core Libraries
--------------------------------

More Configuration & Compilation Options
--------------------------------

Working wit Source Maps
--------------------------------

rootDir & outDir
--------------------------------

Stop Emitting Files on Compilation Errors
--------------------------------

Strict Compilation
--------------------------------

Code Quality Options
--------------------------------

Debugging with Visual Studio Code
--------------------------------
