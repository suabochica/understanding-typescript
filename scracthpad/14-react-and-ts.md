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
// App.tsx
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
// TodoList.tsx
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
// App.tsx
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
// TodoListForm.tsx
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
// App.tsx
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
// App.tsx
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
// TodoListForm.tsx
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
// todo.model.ts
export interface Todo {
  id: string;
  text: string;
}
```

This is the basic schema for a `Todo` entity. Now let's introduce the state in the `App.tsx` file:

```typescript
// App.tsx
import React, { useState } from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';
import { Todo } from './models/todo.model'

const app: react.FunctionalComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const addTodoHandler = (text:string) => {
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
One alternative to manage better our state in the `setTodos` function is using the spread operator over the `todos` object to create a copy of the last `state`. However is much cleaner the next approach:

```typescript
// App.tsx
import React, { useState } from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';
import { Todo } from './models/todo.model'

const app: react.FunctionalComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const addTodoHandler = (text:string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random().toString, text: text }
    ]);
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

Here we got a `prevTodos` function that returns and array with the `prevTodos` state, and the object with the new changes. This version is more legible and cleaner.

More props and state work
-----------------------------------------
Now, let's add a flow for delete todo items. First, let's modify the `TodoList` component to add a button that will trigger the event to delete an item:

```typescript
// TodoList.tsx
import React from 'react';

interface TodoListProps {
  items: {id: string, text: string}[];
  deleteTodoHandler: (id: string) => void;
};

const TodoList: React.FunctionalComponent<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>{todo.text}
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    <ul>
  )
}

export default TodoList;
```

Two things to highlight: one, the interface was updated to receive the `deleteTodoHandler` function as part of the `TodoListProps` interface. That means that in the definition of the component we have to pass that method. Secondly, we add a `button` in the jsx of the file to trigger the delete flow. Let's modify the `App.tsx` file to attend this new journey

```typescript
// App.tsx
import React, { useState } from 'react'

import TodoList from './components/TodoList';
import TodoListForm from './components/TodoListForm';
import { Todo } from './models/todo.model'

const app: react.FunctionalComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const addTodoHandler = (text:string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random().toString, text: text }
    ]);
  }
  const deleteTodoHandler = (id:string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  }

  return ( 
    <div classname="app">
      <TodoListForm onAddTodo={addTodoHandler}/>
      <TodoList items={todos} onDeleteTodo={deleteTodoHandler} />
    </div>
  )
};

export default app;
```

Notice that we create a `deleteTodoHandler` method whose content filter the `todos` that are different to the id passed as parameter. This is the criteria to set in the state what is the item we will delete. Then, at the moment of instantiate the `TodoList` component, we pass a second prop `onDeleteTodo` with the pointer to the method mentioned previously. This way we will delete the `todo` item when we press the delete button after it.

Adding styling
-----------------------------------------
To add styling you should create the `.css` files for both components and fit the selectors to apply the styles. Then you have to import them in the respective `.tsx` file, and test in the browser that the specified styles are being rendered. The next snippet shows how to import the stiles in a react component:

```typescript
// TodoList.tsx
import React from 'react';
import './TodoList.css';

interface TodoListProps {
  items: {id: string, text: string}[];
  deleteTodoHandler: (id: string) => void;
};

const TodoList: React.FunctionalComponent<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>{todo.text}
          <span>{todo.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    <ul>
  )
}

export default TodoList;
```

```typescript
// TodoListForm.tsx
import React, { useRef } from 'react';
import '.TodoListForm.css';

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
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef}/>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoListForm;
```
Types for other react features
-----------------------------------------
Some of the popular libraries used with react are redux and react-router. For redux, you can check the official [documentation](https://redux.js.org/recipes/usage-with-typescript) and read the section _usage with typescript_. For react-router, we don't have guides to work with typescript, so we should install the `@types/react-router-dom` package and follow the definitions of these types.

This way, you can use the advantage of typescript with these package.

Wrap up
-----------------------------------------

So in this module we had a look at react and typescript. Again we can add a lot of nice extra features and checks that make sure that we write clear an error free code.

We review a couple of very important patterns and a couple of very important react features like props and state and how to use them with typescript. Also, we check how you should think about adding other functionalities like redux which we didn't use in this module.

An important thing is don't forget about all the other things you learn about typescript in previous lessons. The types you learn about and all the things you can do with typescript including the configuration applies to this react plus types could project as well.

Just because we had a nice configuration out of the box here does not mean that you can't tweak it. You can tweak it and you can use everything you've learned in this project because after all even though we're writing some reactive code and we can use `jsx` we're still writing javascript or specifically typescript code and data for everything you'll learn from this course is valid here as well.

It's easy to forget that so always keep it in mind. And with that consider creating your next react project with typescript. You know certainly know how to get started and how it works.
