# Configuring for Webpack Development

Webpack is incredibly common for web development these days. There are two options we have when configuring it to work with TypeScript. We can either use a TypeScript loader, or we can use the Babel loader and configure Babel to compile TypeScript code. Since we cover configuring Babel in another lesson, we'll just focus on the TypeScript loader.

The first thing we'll want to do is install all of the necessary dependencies.

```sh
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin typescript ts-loader
```

Webpack will handle determining our dependency tree and writing our bundled code, but TypeScript will be used to do the actual compilation. That means we need to configure a few options around what we want our compiled output to be.

We'll set the `target` to "es2015", although we could change this based on what browsers we need to support. We'll also set `module` to "commonjs", since it provides the most compatibility with Webpack. We'll also make sure `esModuleInterop` and `isolatedModules` are turned on.

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "isolatedModules": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

We also need to configure our `webpack.config.js` file. We'll specify the entry point for our our project, as well as the output bundle location. We'll tell Webpack to resolve `.ts` and `.tsx` files in addition to `.js`. Then we'll configure a module loader that finds any files with a `.ts` or `.tsx` extension and load them with the `ts-loader` module loader. This will invoke TypeScript with our tsconfig.json options for every TypeScript file that Webpack finds.

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};
```

We can then run Webpack using `npx webpack`. Webpack will run and create a bundle for us in the 'output' directory. This is just the basic config; we would need to include other loaders for CSS and other file types.

We can also serve our webpack app as a webpage with live reloading using Webpack Dev Server. We can do this by running `npx webpack-dev-server`. This will start a web server that will automatically reload when we change our source code. Using the `HtmlWebpackPlugin` has Webpack create a blank HTML file and injects our output bundle in the `<body>` of our page.

## Working with non-code assets

It's common for Webpack projects to import non-code assets, like images, CSS, SCSS, and more. TypeScript doesn't know how to deal with these types of files, so we need to create a simple type declaration file to handle these. To do this, we'll create a `custom.d.ts` file to hold all of our type definitions for the non-code assets Webpack might load. Here is a declaration for .png files.

```ts
// custom.d.ts
declare module "*.png" {
  const content: any;
  export default content;
}
```

This tells TypeScript that any files that end in ".png" export an any value, which lets us use it however we need without TypeScript complaining. If we knew exactly how Webpack transformed the file type, we could adjust the type definition. For example, if .png files were imported as URL strings, we could change the type to string.

## Handling `baseUrl` and `paths`

If you use the `baseUrl` or `paths` settings in tsconfig.json, you can easily configure Webpack to pick up these settings. Installing and enabling `tsconfig-paths-webpack-plugin` will make your module resolution settings just work with Webpack.

```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  ...
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "./path/to/tsconfig.json" })]
  }
  ...
}
```

Notice that the plugin is placed in the resolve.plugins section of the configuration. This is intentional. As the docs explain:

> tsconfig-paths-webpack-plugin is a resolve plugin and should only be placed in this part of the configuration. Don't confuse this with the plugins array at the root of the webpack configuration object.