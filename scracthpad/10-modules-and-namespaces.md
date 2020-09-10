Modules & Namespaces
========================================================

Index
----------------------------------------

1. Module introduction 
2. Writing module code
3. Organizing files and folders
4. A problem with namespace imports
5. Browsers note 
6. Using ES modules
7. Understanding various import and export syntax
8. How does code in module execute
9. Wrap up

Module introduction
----------------------------------------
Our practice project has a lot of code all in one file and this is arguably not a super complex project. You can definitely ride way more elaborate projects and applications and you would end up with way more code so putting it all into one file is probably not what you want to do.

So what you want to do instead is you want to write modular code which simply means you want to split your code across multiple files so that each file on its own stays manageable and maintainable and you then simply import and export from into these files and make sure that data for all these files are connected but they're connected by typescript or by the browser or by some third party build tool and not by you.

Now in this module we'll have a look at two main options that help us with organizing our code in multiple files and we'll not just learn about them in theory but also in practice will of course apply these different approaches and see how we can split our code.

Writing module code
----------------------------------------
Organizing files and folders
----------------------------------------
A problem with namespace imports
----------------------------------------
Browsers note 
----------------------------------------
Using ES modules
----------------------------------------
Understanding various import and export syntax
----------------------------------------
How does code in module execute
----------------------------------------
Wrap up
----------------------------------------

TODO: Content for section 12
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


