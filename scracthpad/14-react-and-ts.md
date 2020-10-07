Example: Using TypeScript together with ReactJS
===============================================

Introduction
------------
1. How to use TypeScript in a library different that Angular
2. Integration with webpack and reactjs, respecting the folder structure and the use of `jsx` (`.tsx`)

Setting up the Project & Adding React Packages
-----------------------------------------
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
