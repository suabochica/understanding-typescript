# Migrating from Java Script to Type Script

If you aren't starting a new TypeScript project from scratch, you're likely converting an existing JavaScript project over. With any other language than TypeScript, you would have to convert the entire project at the same time. However, with TypeScript, since it can understand and compile any JavaScript program, you can convert an existing project one piece at a time. Obviously, when we do this there will be a lot of issues in our code. But we only have to tackle those issues on a file-by-file basis instead of all at the same time.

This lesson provides a few guidelines for how you might go about converting your JavaScript project to TypeScript, so feel free to adapt these ideas to your individual needs.

You'll likely want to start with a permissive `tsconfig.json` file. Since there are so many issues as we get started, we might want to relax the rules just a bit before we frustrate ourselves too much with red squiggles. This is the _only_ time in the course that I'm going to suggest turning off strict mode; and we'll turn it on a little later.

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom","esnext"],
    "allowJs": true,
    "checkJs": false,
    "skipLibCheck": true,
    "strict": false,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "downlevelIteration": true
  }
}
```

Notice, the most important settings are `allowJs`, which tells TypeScript to include JavaScript files in it's compilation; and `checkJs`, which tells TypeScript to type check JavaScript files. We want to turn off `checkJs` so TypeScript only checks our `.ts` files.

I've also turned off strict mode. Depending on your project, you might want to selectively turn on and off different strict rules. For example, perhaps you want to turn on `strictNullChecks` but don't want to turn on `noImplicitAny`. That's entirely up to you.

Once your `tsconfig.json` is set up the way you like, you should be able to run TypeScript and get back no errors, since it isn't checking for errors in your JavaScript code. Change the file extension of one file from `.js` to `.ts `(or `.tsx` for React components), and you'll start seeing the errors in that single file. Fix the errors, save the file, and move on to the next.

At some point, when all or most of your files have been converted, you might want to increase the strictness of your type checking by turning on some of the strict settings you disabled earlier. This will take a bit more effort to fix the issues, but you'll also gain confidence that your program won't throw type errors at runtime.

Another alternative to converting your project to TypeScript is to use JSDoc comments exclusively. Like I mentioned in the previous lesson, JSDoc comments can provide type annotations that TypeScript can parse inside JavaScript files. There are two differences with this approach: first `checkJs` setting needs to be turned on so TypeScript can typecheck our `.js` files. However, without any other configuration, TypeScript will check all of our JavaScript files. To convert them one file at a time, we need to add our files to the files list in our `tsconfig.json `so TypeScript only type checks those files.

There are a lot of other suggestions provided in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html). Be sure to check that out to get more ideas.

Refactoring code from JavaScript to TypeScript will take a lot of time and effort, but the end result - confidence that the code runs correctly - is well worth it in the end.
