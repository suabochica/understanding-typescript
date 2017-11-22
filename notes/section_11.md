TypeScript Workflows
====================

Introduction
------------
1. TypeScript inside project workflows with bundler, gulp and webpack.

Using `tsc` and the `tsconfig` File
-----------------------------------
1. The watch command to left the TypeScript compiler open: `tsc -w`
2. Use the `tsconfig.json` to control which files will be compiled with the `exclude` property

How to TypeScript resolves Files using the `tsconfig.json` File
---------------------------------------------------------------
1. Run the `tsc` command
2. This command will check the configuration inside `tsconfig.json`
3. The `exclude` property tells to the compiler not check inside this files/folders
4. The opposite of exclude is the `files` property to be more explicit

More on `tsc` and the `tsconfig` File
-------------------------------------
1. You can use the tsc command on specific file: `tsc app.ts`
2. Also is important the location of the `tsconfig.json` file
3. For mor information check the oficial documentation of TypeScript in the section [Project Configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

Adding TypeScript into a Gulp Workflow 
--------------------------------------
1. Install gulp and gulp-typescript plugin: `npm install --save-dev gulp gulp-typescript`
2. Add a `gulpfile.js`
3. import `gulp` and `gulp-typescript`
4. `gulp-typescript` is a typescript wrapper 
5. create the `typescript` task and associate it to the `tsconfig.json`
6. You can check the [gupl-typescript documentation](https://www.npmjs.com/package/gulp-typescript)

Adding TypeScript into a Webpack Workflow 
-----------------------------------------
1. Install webpack and the gulp loader: `npm install --save-dev webpack ts-loader`
2. Remove the SystemJS code for loads files.
3. Now you are using webpack. Then use bundle.js to load your files
4. Remove the `exclude` property from `tsconfig.json`. Now it is responsability of webpack
5. Also remove the `module` and `sourceMap` properties. Now it is responsability of webpack
6. Add the file `webpack.config.js`
7. Remember that webpack always use the local package installed in the project. No matters if the package ins installed globaly
8. Finally change the syntaxis to import jQuery `import $ = require(jquery)`







5. 