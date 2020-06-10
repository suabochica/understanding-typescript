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

Including & Excluding Files
--------------------------------

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
