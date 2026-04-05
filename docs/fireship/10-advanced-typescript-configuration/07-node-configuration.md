# Configuring for Node Development

Node.js has slightly different requirements than browsers, so we'll need to adjust our tsconfig.json file to work correctly.

Since version 13, Node.js has had limited support for ES Modules. However, CommonJS is much more common (pun intended) in the Node ecosystem, so we'll have our compiler output CommonJS-compliant files. We can still use ES Modules in our source code, though, especially if we have `esModuleInterop` turned on.

We'll also want to change our `target` field to whatever version of JavaScript our version of Node.js supports. We'll use the `isolatedModules` flag to make sure each of our files is a module. Finally, we use `resolveJsonModule` to allow us to import .json files as modules (as Node.js already supports).

Here's what a sample tsconfig.json would look like.

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "outDir": "build",
    "strict": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

We also will want to include the `@types/node` package so that TypeScript understands the type definitions of Node's APIs.

```sh
npm install --save-dev @types/node
```

We can then run our TypeScript compiler to transform our code, and then run the code in the output folder with Node.js.

```sh
tsc
node build/index.js
```
It's also possible to have TypeScript compile our code on-the-fly as it is required by Node.js. A package called `ts-node` lets us do just that. We can run it by pointing it at a TypeScript file.

```sh
npx ts-node src/index.ts
```
This approach works well for small scripts that we run ourselves and for development, but isn't ideal for production environments, since the TypeScript compiler has to continue running, consuming precious memory. Instead, it's best to compile our TypeScript and run Node.js directly.

If we are in a development environment, it can get a little tedious to continuously stop the Node.js server, recompile our application, and restart Node.js whenever we make a change. Tools like Nodemon make this easier for Node.js development by restarting the Node process whenever a file changes. However, they aren't ideal for TypeScript development, since the TypeScript process takes a little while to restart.

`ts-node-dev` is a package which wraps `ts-node` and makes it so our Node.js process is restarted without restarting TypeScript. This leads to faster development feedback loops, since we don't have to wait for TypeScript to start up every time we make a change. `ts-node-dev` works exactly the same as `ts-node` - just point it at a file. Any changes to that file or its dependencies will cause a refresh.

```
npx ts-node-dev src/index.ts
```

## Handling `baseUrl` and `paths`

If you use the `paths` option in your tsconfig.json file, we can very easily configure Node.js to recognize those adjustments. The `tsconfig-paths `package automatically reads the configuration in the tsconfig.json file and adjusts Node.js' module system to support the `baseUrl` and paths configuration we used. We can register it with Node.js (or `ts-node `or `ts-node-dev`) with Node's `-r` flag.

```
npm install --save-dev tsconfig-paths
# then
node -r tsconfig-paths/register build/index.js
# or
npx ts-node-dev -r tsconfig-paths/register src/index.ts
```
Note that this requires including your tsconfig.json file with your production Node.js code, so `tsconfig-paths` knows what your configuration is.