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
Let's create a `/components` folder to store a `TodoList.tsx` file with the next content:

```typescript
import React from 'react';

interface TodoListProps {
  items: {id: string, text: string}[];
};

const TodoList: React.FunctionalComponent<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    <ul>
  )
}

export default TodoList;
```

Let's explain in detail this react component. So first of all, one of the benefits of integrate typescript with react is the use of interfaces ti define the props of a react component. That is the first part of the snippet indicates. We define the `interface TodoListProps` to set the expected fields of an item in the `TodoList` component. For this case we expect an array of `items` two properties each one, the `id` and the `text`, with their respective type.

Next we have the definition of the functional component. Notice that in the line `React.FunctionalComponent<TodoListProps>` we consume the interface defined previously. This component receive as parameter the `props` and in the return statement, we use the jsx syntax to `map` the items in the props and render the text of each item.

In the `App.tsx` file we will consume this component. the next code show us how to:

```typescript
import React from 'react'

import TodoList from './components/TodoList';

const App: React.FunctionalComponent = () => {
  const todos = [{ id: 't1', text: 'Finish the course' }];
  return ( 
    <div className="App">
      {/* A components that adds todos */}
      <TodoList items={todos} />
    </div>
  )
};

export default App;
```

First, we import the `TodoList` component from the respective path. Then inside the arrow function we define the `todos` array, with the `id` and the `text` fields. Finally in the return statement, we use the jsx syntax to render the `<TodoList items={todos} />` component. Here, the `items` attribute gets the `todos` variable that we define before. The `todos` variable are the props of the `TodoList` component.

This is a really good practice that offers typescript to react, and verbose manage over the props of a react component. So far, this component just render hard coded information. Let's do this component dynamic.

Getting user input with "refs"
-----------------------------------------
Let's add a new component called `TodoListForm` to handle the inputs from the user. The code of this component is:

```typescript
import React, { useRef } from 'react';

const TodoListForm: React.FunctionalComponent = () => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    console.log(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoListForm;
```

The first thing to highlight here is the import of the `useRef` hook from react. `useRef` accepts an initial value as its first argument and it returns an object that has a `current` property (which will initially be set to whatever the initial value was). From there, anything you add to `current` will be persisted across renders. In this case we use it to get the input texted by the user. That's why we have a `ref` attribute inside the `<input>` element.

Secondly, we have a `todoSubmitHandler` method that will attend the submit event of the form, and for now it will just log the text entered by the user.

Now, let's consume this component in the `App.tsx` file:


```typescript
import React from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';

const App: React.FunctionalComponent = () => {
  const todos = [{ id: 't1', text: 'Finish the course' }];
  return ( 
    <div className="App">
      <TodoListForm/>
      <TodoList items={todos} />
    </div>
  )
};

export default App;
```

Similar as before, we have to import the `TodoListForm` component from their respective path, and then we use it as brother node of the `TodoList`. Time to check how to share the information between this two components.

Cross-component communication
-----------------------------------------

To communicate our component we use the props again. So, we have to add some code in our `App.tsx` file as shown next:

```typescript
import React from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';

const app: react.FunctionalComponent = () => {
  const todos = [{ id: 't1', text: 'finish the course' }];
  const addTodoHandler = (text:string) => {
    console.log(text)
  }

  return ( 
    <div classname="app">
      <TodoListForm onAddTodo={addTodoHandler}/>
      <TodoList items={todos} />
    </div>
  )
};

export default app;
```
Here we add the function `addTodoHandler` and for now it will just log the entered message by the user. Then in the definition of the `TodoListForm` we add a new property `onAddTodo`, that is a pointer to the `addTodoHandler` function. Now, we have to modify the `TodoListForm` component according this changes, as illustrate the snippet below:


```typescript
import React, { useRef } from 'react';

interface TodoListFormProps {
  onAddTodo: (todoText: string) => void;
}

const TodoListForm: React.FunctionalComponent<TodoListFormProps> = props => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText)
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoListForm;
```

Again, we define an interface called `TodoListFormProps` with a function property `onAddTodo` as we set in the `App.tsx` file. Then, we have to pass the interface `<TodoListFormProps>` in the `React.FunctionalComponent` signature. Finally, in the `todoSubmitHandler` function, instead of log the message, we pass the `enteredText` as parameter of the the `onAddTodo` function.

Now, if you test the application, we get the message from the `App.tsx` file.

Working with state and types
-----------------------------------------
Before to start with state, let's create a new file called `todo.model.ts` with the next code: 

```typescript
export interface Todo {
  id: string;
  text: string;
}
```

This is the basic schema for a `Todo` entity. Now let's introduce the state in the `App.tsx` file:

```typescript
import React, { useState } from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';
import { Todo } from './models/todo.model'

const app: react.FunctionalComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const addtodohandler = (text:string) => {
    setTodos([{id: Math.random().toString, text: text}]);
  }

  return ( 
    <div classname="app">
      <TodoListForm onAddTodo={addTodoHandler}/>
      <TodoList items={todos} />
    </div>
  )
};

export default app;
```

First of all, check that we import from react the `useState` hook. This hook receive two parameters, the first is the object with the current state, and the second one is a function to modify that state. So, the `todos` variable is replaced by this two parameters, and the value is the `useState` with the type `Todo` defined in the model, with an empty array. Finally in the `addTodoHandler` function, we use the `setTodos` parameter and there we set the values for the `id` and the `text` of the `todo` item.

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
