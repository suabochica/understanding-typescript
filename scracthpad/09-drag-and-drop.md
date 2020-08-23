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
If you check the markup, we have a form with a title, a description and a people field. Let's get these elements to start to interact with them:

```typescript
class ProjectInput {
    // ...
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        // ...

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));

    }

    private attach() {...}
}

const prjInput = new ProjectInput();
```

First, we define the respective class properties to each of the fields in the form. Using the `this.element.querySelector("#{id}")` we get the DOM elements and now we can start to play with them. So far, we just will limited to the access of the elements.

The interaction is in the private method `configure`. In this method, we add a event listener to the `submit` element of the form, and we set the `submitHandler` callback to log the value of the title element in the browser's console. Notice the use of the `bind` JavaScript's method at t he moment of set the callback. This is necessary to keep the scope of the class inside the `submitHandler` method and get the value of the title element.

Now we will add a decorator to autobind the `this` in our functions.

Creating & Using an "Autobind" Decorator
----------------
Let's recall the useful scenario for the property descriptor decorator `autobind` that we reviewed in the last section. The decorator had the next implementation.

```typescript
function autobind(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);

            return boundFunction;
        }
    };

    return adjustedDescriptor;
}
```

To use the decorator, we just need to add the decorator syntax in the `submitHandler` function, and remove the `bind` function in the event listener as show next:

```typescript
//...
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler);

    }
```

Now thanks to our `autobind` decorator which hopefully also shows that this decorator can have some real use.

Of course here it's actually a bit more work than just calling `bind`, but imagine this being used on more and more methods which all have to be bound not having to call `bind` this manually can then reuse save you some time and also prevent some potential errors in cases where you just forgot it.

Fetching User Input
----------------
Now, let's fetch all the information shared enter by the user via form. To achieve that, we will create a `gaterUserInput` method, which will get the values of the form's field, and set a exhaustive validation over each field. If one of the fields is missing, then a alert message will throw saying that the input is invalid.

For other side, we want to clear all the input after submit the form. A method called `clearInputs` will handle this logic. Basically it will set the values of each elements as an empty string.

```typescript
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value= '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people)
            this.clearInputs();
        }
    }
```

We will consume this methods in the `submitHandler` method. There we get the user input from the form ant we validate if the returned values is an array. For that case via destructuring, we get each value, and for the moment, we are log them in the console. Finally we clear the inputs.

An point that we can improve from the last code is the form validation. For this case we are doing a exhaustive validation and this approach is not easy to scale. Let's check how to create a reusable validation functionality.

Creating a Re-Usable Validation Functionality
----------------
To create a usable validation functionality, let's recall the `interface` concept of past lessons. We will create a `Validatable` interface with several properties that could be optional, and the mandatory property is the value of the input element. With this interface we can create a `isValidInput` function with a parameter of type `Validable`. Then we set if statements over each of the properties in the input. Check the next code:

```typescript
interface Validatable {
    value: string | number;
    required?: boolean;
    minStringLength?: number;
    maxStringLength?: number;
    minNumberLength?: number;
    maxNumberLength?: number;
}

function isValidInput(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length > validatableInput.minStringLength;
    }
    if (validatableInput.maxStringLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length < validatableInput.maxStringLength;
    }
    if (validatableInput.minNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.minNumberLength;
    }
    if (validatableInput.maxNumberLength != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value < validatableInput.maxNumberLength;
    }

    return isValid;
}
```

An additional detail with this snippet is the `isValid` variable that is used like an condition to match the possible scenarios of the input element. In the end, the `isValid` variable is returned in the `isValidInput`.

To use this helper, in the if statement of the `gatherUserInput` we call the `isValidInput` function with the values retrieved from the respective DOM elements as shows next:

```typescript
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        },
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minStringLength: 5,
        },
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            minNumberLength: 1,
            maxNumberLength: 5,
        },

        if (
            !isValidInput(titleValidatable) ||
            !isValidInput(descriptionValidatable) ||
            !isValidInput(peopleValidatable)
        ) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
```

Keep in mind that we negate the function because the `alert` code is executed if one of the validation fails. 

Rendering Project Lists
----------------

Before to start with the implementation of the code to render the project list, lets recall the markup of them.

```html
    <template id="project-list">
      <section class="projects">
        <header>
          <h2></h2>
        </header>
        <ul></ul>
      </section>
    </template>
```

With this reference is clearer what DOM elements are relevant to the `ProjectList` class. It is important to highlight that we will have two type of projects: active and finished. So, we should pass a parameter in the constructor method of the `ProjectList` class. This code is pretty similar to the `ProjecInput` class. Below we show the code for the `ProjectList` class.

```typescript
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById(
            'project-list'
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}

//...
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
```

Some minor changes in this class. All the ids of the in the `querySelector` were fit to the markup showed before. The `renderContent` method handle a dynamic code to list both list (active and finished) with the same snippet via template literals. If you update your browser, now we will see to new empty containers with their respective title that will hold the list elements.

The next step is integrate the click on the "Add Project" button to get the information of the form an put it in the list container.


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
