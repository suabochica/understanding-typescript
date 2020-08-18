Section 09: Drag & Drop
========================================

Index
----------------------------------------
1. Getting Started
2. DOM Element Selection & OOP Rendering
3. Interacting with DOM Elements
4. Creating & Using an "Autobind" Decorator
5. Fetching Udrt Input
6. Creating a Re-Usable Validation Functionality
7. Rendering Project Lists
8. Managing Application State with Singletons
9. More Classes & Custom Types
10. Filtering Projects with Enums
11. Adding Inheritance & Generics
12. Rendering Project Items with a Class
13. Using a Getter
14. Utilizing Interfaces to Implement Drag & Drop
15. Drag Events & Reflecting the Current State in the UI
16. Adding a Dropable Area
17. Finishing Drag & Drop
18. Wrap Up

Getting Started
----------------
We're going to build a small little demo application a little project.

The app we're going to build will not be too complex but it will be a nice application where we essentially will be able to manage a couple of projects where a project essentially is as a goal. You could say is that we have lists of projects and we'll have two lists of projects an active list and a finished list and we'll be able to drag and drop items from one list to the other and stuff like that.

Now of course the application itself will be nice but the most important thing is that it will allow us to practice many of the things we learned thus far and that's of course the goal of this module.

DOM Element Selection & OOP Rendering
----------------

So the first thing we have to achieve is rendering the form. Let's start with the markup:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ProjectManager</title>
    <link rel="stylesheet" href="app.css" />
    <script src="dist/app.js" defer></script>
  </head>
  <body>
    <template id="project-input">
      <form>
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea id="description" rows="3"></textarea>
        </div>
        <div class="form-control">
          <label for="people">People</label>
          <input type="number" id="people" step="1" min="0" max="10" />
        </div>
        <button type="submit">ADD PROJECT</button>
      </form>
    </template>
    <template id="single-project">
      <li></li>
    </template>
    <template id="project-list">
      <section class="projects">
        <header>
          <h2></h2>
        </header>
        <ul></ul>
      </section>
    </template>
    <div id="app"></div>
  </body>
</html>
```

Relevant thing of this markup are the `<template>` tag to holds some content that will be hidden when the page loads. We need to use JavaScript, or in this case TypeScript to display it. The other important thing is the `app` element, that will works as the host element for the application.

Now let's dive in in the content of the `app.ts` file. We will use a `ProjectInput` class where we will handle the DOM selection and also the rendering of the form. Please check the next code.

```typescript
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const prjInput = new ProjectInput();
```

Here, we use the `document.getElementById` method to select the `templateElement` and the `hostElement`. the `attach` method will let us to insert the `templateElement` element, that in this case is a form, as an adjacent element of the `hostElement`. Finally, when you instantiate the `ProjectInput` class you will get a rendered form in the TypeScript server.


Interacting with DOM Elements
----------------
Creating & Using an "Autobind" Decorator
----------------
Fetching Udrt Input
----------------
Creating a Re-Usable Validation Functionality
----------------
Rendering Project Lists
----------------
Managing Application State with Singletons
----------------
More Classes & Custom Types
----------------
Filtering Projects with Enums
----------------
Adding Inheritance & Generics
----------------
Rendering Project Items with a Class
----------------
Using a Getter
----------------
Utilizing Interfaces to Implement Drag & Drop
----------------
Drag Events & Reflecting the Current State in the UI
----------------
Adding a Dropable Area
----------------
Finishing Drag & Drop
----------------
Wrap Up
----------------
