# Configuring for Modern Web Development

Almost all modern web development these days is done with a bundler, like Webpack. Bundlers make it easy to specify an entry point, load and compile all of the dependencies (including those in the `node_modules` directory), and create a set of output files. This makes the build process more predictable and creates a nice developer experience. However, it isn't required, and simple sites work just fine without using a bundler. In addition, ES Modules make it easier than ever to write modern JavaScript that depends on other modules without needing a bundler.

We can use TypeScript to compile the code for our app, and use ES Modules to load any external scripts or extra files in our project. For this to work, we're making a few assumptions.

- Everyone who uses our app is using a modern browser that supports ES Modules.
- The only third-party code we are using is coming from a CDN, like unpkg.com or skypack.dev.
- Our project isn't very large and doesn't need to use automated complicated tree shaking or code splitting strategies.

If any of these don't apply to your project, you'll likely want to use a bundler. Check out the bonus lessons on how to configure TypeScript for your specific environment.

This would probably be best explained using an example. Let's suppose our project is a simple countdown timer built with vanilla JavaScript/TypeScript. It has the following folder structure.

```txt
TimerApp
├── package.json
├── public
│   └── index.html
├── src
│   ├── index.ts
│   └── utils
│       ├── calculateRemainingTime.ts
│       └── createButton.ts
└── tsconfig.json
```

We won't be going over the code that is in each of these files, just the folder structure.

We'll be using `strict` mode for our TypeScript code. If we wanted to, we could configure TypeScript to use a separate loader like "AMD" or "SystemJS". However, since we are targeting modern browsers, we'll use ES Modules.

We'll be using a single NPM module, `date-fns` to do the necessary calculations. Since TypeScript doesn't work as a bundler for us, we'll load it from the skypack.dev CDN. That means we'll have to modify our `paths` setting to support type checking for the third-party module.

We'll put our build output into the "public" directory, alongside our HTML file.

Finally, we'll turn on source maps so we can easily debug our code in the developer tools.

Here's what our tsconfig.json file looks like:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "esnext",
    "sourceMap": true,
    "outDir": "public",
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "https://cdn.skypack.dev/date-fns@^2.14.0'": [
        "node_modules/date-fns/typings.d.ts"
      ]
    },
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```
We'll have to install the `date-fns` NPM module so we have access to that type declarations file.

```sh
npm install date-fns
```
When writing our program, we need to make sure that we include the file extension on our import statements. For example, if we have a function that creates the DOM element for a button, we would import it like this.

```ts
// src/index.js
import { createButton } from "./utils/createButton.js";
```
Remember, TypeScript will still recognize this correctly during development, and when it is compiled the relative link will be pointing at the correct file.

Our `index.html` file in our `public` folder will be fairly simple. All we need to do is include a `<script>` tag that points at our `index.js` file and a <`div>` to put our application in. Note the special `type="module"` attribute that we add on our script tag. This is necessary to tell the browser to load this script as an ES Module.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Timer</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="index.js" type="module"></script>
  </body>
</html>
```
We can then compile our code with TypeScript by running the `tsc` command.

```sh
tsc
```

This will build our TypeScript code. We can also build our code in watch mode so TypeScript automatically compiles our code as we change it.

```sh
tsc --watch
```
Then, we can start a webserver pointed at our `public` directory and view our site. One quick way to do this is with the `serve` NPM package.

```sh
npx serve public
```

We should see our type checked, compiled, and running site!
