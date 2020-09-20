Example: Using TypeScript together with ReactJS
===============================================

Introduction
------------
1. How to use TypeScript in a library different that Angular
2. Integration with webpack and reactjs, respecting the folder structure and the use of `jsx` (`.tsx`)

Setting up the Project & Adding React Packages
----------------------------------------------
1. `npm init`
2. `npm install react react-dom --save`

Adding the ReactJS TypeScript Definition Files Packages
-------------------------------------------------------
1. Use typings is (deprecated)
2. `typings install dt~react dt~react-dom --global --save`
3. The `typings.json` wil be created

Installing webpack
------------------
1. `npm install webpack js-loader lite-server --save-dev`
2. Add the `webpack.config.js` file

Configuring webpack
-------------------
1. Define your folder structure
```
project/
|
|-- src/
|   |-- components/
|   |-- index.tsx
|   |
|-- typings/
|-- index.html
|-- package.json
|-- typings.json
|-- webpack.config.js
|   ...
```

2. Add the basic configuration in webpack with that folder structure in mind

Creating ReactJS Code with TypeScript
-------------------------------------
1. Create a component `Home.tsx`
2. Inside this component define a TypeScript Workflows `interface`
3. This interface will define the contract to the properties that will receive the component

Configuring TypeScript Compiler to work with ReactJS
----------------------------------------------------
1. Add a script tu run webpack

Introduction
------------
1. In a TypeScript project you will need third-party package as jQuery.
2. How to combine JavaScript libraries with TypeScript

Installing a third-party library
--------------------------------
1. Install jQuery `npm install --save jquery`

Importing the Library
---------------------
1. Use SystemJS to manage the libraries dependencies
2. Inside the `index.html` file use the `map` property of SystemJS and add the next key: `jQuery: node_modules/jquery/dist/jquery.min.js`
3. This configuration allow you to use jQuery but the TypeScript Compiler throws the error `Cannot find name $`

Translating JavaScript to TypeScript with TypeScript Definition Files
---------------------------------------------------------------------
1. A *Definition File* basically is a bridge between JavaScript libraries and TypeScript
2. The file extension is `d.ts`

Option 1: Manually download TypeScript Definition Files
-------------------------------------------------------
1. Please check [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) github project
2. Find the package that you need
3. Copy the raw file a paste it in a file inside your local project
4. It is not necessary use an import

Option 2: Managing TypeScript Definition Files with the "typings" Package
-------------------------------------------------------------------------
1. Typings (Deprecated) is the TypeScript Definition Manager like NPM
2. Install typings globally with: `npm install -g typings`
3. Instal the desired package with: `typings install dt~jquery --global --save`
4. This command wil create a `/typings` folder with the definition file and a `typing.json` file with the dependencies
5. It is not necessary use an import

Easier Type Management with TypeScript 2.0
------------------------------------------
1. A awesome new feature that is integrated with `npm`
2. Use the next command: `npm install --save-dev @types/dt~jquery`
3. This command will create the `node_modules/@types` folder where will store the TypeScript Definition Files
4. Also, if you check the `package.json` file you can see the definition file in the `devDependencies` property
5. You got all your third-party libraries in a same place

