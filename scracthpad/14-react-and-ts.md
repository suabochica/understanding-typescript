Using TypeScript together with ReactJS
===============================================

In this course will obviously learned a lot about TypeScript and you'll all learn how to work with TypeScript and third party libraries like lodash.

Now there is a very popular third party library which you might be interested in using to gather with TypeScript and that is React.

ReactJs is a extremely popular JavaScript library for building amazing user interfaces and you can use it with TypeScript as well. It's not the default in most react projects. You don't work with typescript but you can absolutely do that. And in this course module you will learn how it works.

> Disclaimer: This is not a React course. This module is for you if you already know React and you want to learn how to use TypeScript and React.

1. Setting up
2. How do react and typescript work together
3. Working with props and types props
4. Getting user input with "refs"
5. Cross-component communication
6. Working wiht state and types
7. Managing state better
8. More props and state work
9. Adding styling
10. Types for other react features
11. Wrap up

Introduction
------------
1. How to use TypeScript in a library different that Angular
2. Integration with webpack and reactjs, respecting the folder structure and the use of `jsx` (`.tsx`)

Setting up a react + typescript project
-----------------------------------------

For start a react project, is recommendable use an script of the `create-react-app` package. This package offer a lot of set ups to building your app, and one of his guide is focused in TypeScript. The information that we will group in the next lines, is in the [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/) section of the `create react app` official docs.

So, you can start running:

```
npm create-react-app --template typescript
```

This command will create a react + typescript project from scratch. It will have some default files. To reduce the complexity, you can left the folder structure as shows the next image:

![image](../assets/s14-react-ts-cleaned-folder.png)

How do react and typescript work together
-----------------------------------------

React works with typescript as another third party library. To evidence that, let's take a look to the next snippet:

```typescript
import React from 'react'

const App: React.FunctionalComponent = () => {
  return <div className="App"></div>
};

export default App;
```

This is the code by default in the `App.tsx` file. The important line in this code is `const App: React.FunctionalComponent`. With that definition we are saying that the `App` variable is of type `React.FunctionalComponent`. Now, a valid question is where is the definition of the `React.FunctionalComponent`?. The answer is in the `node_modules` folder. If you check his contents, the `create-react-app` will install the types definitions for `react` and `react-dom`. So, if you delete the return statement, the TypeScript compiler will raise a warning saying that the `React.FunctionalComponent` type is not assignable to a `void` type. This way, the TypeScript's compiler will start to help us with the development of the react app. 

Working with props and types props
-----------------------------------------
Getting user input with "refs"
-----------------------------------------
Cross-component communication
-----------------------------------------
Working wiht state and types
-----------------------------------------
Managing state better
-----------------------------------------
More props and state work
-----------------------------------------
Adding styling
-----------------------------------------
Types for other react features
-----------------------------------------
Wrap up
-----------------------------------------


Creating ReactJS Code with TypeScript
-------------------------------------
1. Create a component `Home.tsx`
2. Inside this component define a TypeScript Workflows `interface`
3. This interface will define the contract to the properties that will receive the component

Configuring TypeScript Compiler to work with ReactJS
----------------------------------------------------
1. Add a script tu run webpack
