# Configuring for Babel Development

Using Babel with TypeScript is a common way to transform your code, since Babel often runs faster in certain contexts and gives you access to the entire Babel ecosystem. However, there are some caveats which make developing with Babel a little more complicated.

- Babel doesn't type check your code. For that, you'll still want to use TypeScript with the `noEmit` tsconfig.json flag enabled.
- Babel doesn't read your tsconfig.json file to get your configuration. That means any settings which affect the compiler have to be set on the Babel plugin directly.
- Many TypeScript features aren't supported directly or at all. Const Enums and the `export =` syntax both require additional Babel plugins to work, and behavior of namespaces is also limited. If you are using Babel, it's best to avoid all of these TypeScript features.

Also, since the TypeScript Babel plugin only removes the TypeScript type definitions, we will have to rely on Babel to do any JavaScript transformations, such as transpiling to an earlier version of JavaScript.

To enable Babel in your TypeScript project, you'll first want to install the necessary dependencies.

```sh
npm install --save-dev @babel/core @babel/cli typescript @babel/preset-env @babel/preset-typescript
```

Then, create a `.babelrc` file and include the following presets.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```
Your tsconfig.json file is only going to affect the way your code is type checked, not compiled. For that reason, we can ignore many of the settings. The most important setting is `noEmit`, since that will stop TypeScript from compiling our code.

Another important setting is `isolatedModules`. TypeScript includes this setting to provide certain warnings that make it easier for external build tools, like Babel, to transpile TypeScript code better.

```json
{
  "compilerOptions": {
    "strict": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["src/**/*"]
}
```
Then you can execute Babel to compile your code.

```sh
npx babel src --extensions ".ts" -d build
```
And you can type check your code by running the TypeScript command.

```sh
tsc
```

For more information on configuring the TypeScript Babel plugin, check out the [Babel docs](https://babeljs.io/docs/babel-plugin-transform-typescript#typescript-compiler-options).