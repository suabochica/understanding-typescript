# Configuring for Library Development with TSDX

If you are making a library that you intend to release on NPM, there are a lot of pieces to consider. How can you make your package work with multiple module systems? How can you make sure the production bundle is as small as possible? What about adding tests and linting?

While I could spend the next 10 minutes explaining every possible configuration and optimization, there are tools which have collected best practices for modern NPM packages and rolled them into a nice, easy to use package.

TSDX is a Zero-config CLI for TypeScript package development. That means you only need to run one command, and it will configure everything for you with great defaults and the ability to adjust any setting as needed.

To create a new TypeScript library, just run:

```sh
npx tsdx create mylib
```

This will set you up with a TypeScript project that outputs to CommonJS and ES Modules, tree-shakes and minifies your build, lints your code, and even warns you if your package is getting to large. If you need to customize any of the tools that TSDX uses, you can follow their [configuration guide](https://tsdx.io/docs).

That's it. That's the whole lesson.

