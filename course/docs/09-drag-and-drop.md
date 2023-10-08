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

With this reference is clearer what DOM elements are relevant to the `ProjectList` class. It is important to highlight that we will have two type of projects: active and finished. So, we should pass a parameter in the constructor method of the `ProjectList` class. This code is pretty similar to the `ProjectInput` class. Below we show the code for the `ProjectList` class.

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
To handle the state of the project we will follow an approach used in the modern front-end frameworks that consist in set the state like an unique instance and as a global object. We could use an `addProject` function as part of the `ProjectInput` class and handle the state from there via the `getElementById` and start to play with the DOM object to render the inputs in the containers of the `ProjectList` class. However, the global state approach allow us handle the event in a reactive way, so let's go ahead with the implementation with this idea in mind:

```typescript
class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();

        return this.instance;
    }

    addListener(listenerHandler: Function) {
        this.listeners.push(listenerHandler);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,
        }
        this.projects.push(newProject);

        for (const listenerHandler of this.listeners) {
            listenerHandler(this.projects.slice());
        }
    };
}
const projectState = ProjectState.getInstance();
```

The `ProjectState` class is our global state with holds the `projects` of our application. We follow the singleton pattern on this class to keep guarantees that all the application is modifying the same state. That the reason why we have an `instance` property and a `getInstance()` method. Additionally, we have a `listeners` property to manage the events that will interact with the state. Each of these properties have their own methods to add a `listener` and a `project` respectively.

Finally in the variable `projectState` we store the only instance of the state. Now, let's review how to consume this global object form the `ProjectInput` class.

```typescript
class ProjectInput {
//...
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}
```

The relative method of this class to interact with the state is the `submitHandler`. After validate the inputs of the form, we can add the project with these arguments to the state via `projectState.addProject()`. Now, the state have a project when the user clicks on the _Add Project_ button. Let's check how to render the state information in the `ProjectList` class.

```typescript
class ProjectList {
    //...
    assignedProjects: any[] = [];

    constructor(private type: 'active' | 'finished') {
        //...
        this.assignedProjects = [];


        //...
        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attach();
        this.renderContent();
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');

            listItem.textContent = projectItem.title;
            listElement.appendChild(listItem);
        }
    }
}
```
In this call we add a property `assignedProjects` to get the project that are in the state. Before to attach the containers, through the `projectState.addListener` we emit a subscription to get access of the object in our state. Then we render the information using the `renderProjects` method, creating a `li` element to append the new list item in the project containers.

If you test this code we got an advance, but also we have several bugs. For example, if you add a second project, the list we will render the first element again. Let's go ahead to figure out this unexpected behaviors.


More Classes & Custom Types
----------------
Now, let's work in our any types. Remember that the idea behind use type is reduce as much as possible the use of the `any` type. To replace the `any` type, we can rely on custom types. Let's create a `Project` class that we can use as type, but we will left it as a class because we will instantiate it after.


```typescript
enum ProjectStatus {
    Active,
    Finished,
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {}
}
```

As you can see, the `Project` class in his constructor have all the properties of our project. Additionally, we include the `status` property that is supported by an enum `ProjectStatus` type, to indicate the state of the project.

We have a similar scenario with the `Listener` in the `ProjectState`. We can use the next custom type to replace the `any` keyword in the listeners declaration:

```typescript
type Listener = (items: Project[]) => void;
```

Now we can replace the `any` type by the created custom types, as show the next code.

```typescript
class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();

        return this.instance;
    }

    addListener(listenerHandler: Listener) {
        this.listeners.push(listenerHandler);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active,
        )
        this.projects.push(newProject);

        for (const listenerHandler of this.listeners) {
            listenerHandler(this.projects.slice());
        }
    };
}
```

Filtering Projects with Enums
----------------
Currently, we got the next two bugs:

1. Every time the user add project, the project is added in both containers.
2. If the user add two or more project, the containers re render the past projects again.

Let's solve the first bug with help of the `filter` method as shown the next code:

```typescript
class ProjectList {
    constructor(private type: 'active' | 'finished') {
      //...
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    // ...
}
```

Here we create a new variable `relevantProjects` that with help of the enum type that we define for the project statuses, we can filter them. The combination between enums and filters is a common strategy to get selective in our data.

The second bug is generated by the code in the `renderProjects` method. To fix this bug, we should clean the inner HTML of the list element as is in the next snippet:

```typescript
class ProjectList {
    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');

            listItem.textContent = projectItem.title;
            listElement.appendChild(listItem);
        }
    }
    // ...
}
```

Now our bugs were fixed. It is pending add some improvements in the code, because currently we have duplicated code on it. 

Adding Inheritance & Generics
----------------

Currently, the `ProjectList` and the `ProjectInput` have duplicate code in the next aspects:

1. The classes are using a template element to handle the rendering
2. The classes consume a `hostElement` to attach the content
3. The classes uses a `element` to render his contents
4. The classes have an `attach` function
5. The classes can share the `configure` and the `renderContent` methods

These aspects are good symptoms to rely in the use of inheritance and generics. Let's create a `ProjectComponent` abstract class that will wrap and structure a way to make our code reusable. Please check the next snippet.

```typescript
abstract class ProjectComponent<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId: string
    ) {
        this.templateElement = document.getElementById(
              templateId
            )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );

        this.element = importedNode.firstElementChild as U;

        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        );
    }

    abstract configure(): void;
    abstract renderContent(): void;
}
```

Here, we define the `ProjectComponent` with two generic `T` and `U` that extends from the `HTMLElement` type. This way we get flexibility at the moment of use the class, because the according the child class we can define as `element` or `hostElement` different types. For the other hand the `templateElement` will be of the same type, no matter the case. Remember that in the mark up we define `<template>` tags to accomplish our dynamic rendering.

In the constructor of the function we got four properties: `templateId` to access to our `templateElement`, `hostElementId` to access to the `hostElement`, `insertAtStart` to determine where attach our new element, and `newElementId` to access to the new element we are building. Check that inside the body of the `constructor`, we handle the logic to get the elements, import the node and attach the new element.

Finally, we define the `attach` method that use the `insertAtStart` property to determine where insert the new element, and we have two abstract methods that will be implemented to the child classes. 

Now, let's check how to consume the `ProjectComponent` parent class:

```typescript
class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);

        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');

            listItem.textContent = projectItem.title;
            listElement.appendChild(listItem);
        }
    }
}
```

For `ProjectList` class we extends the `ProjectComponent` class with these types: `HTMLDivElement` and `HTMLElement`. We define the `assignedProjects` property, that is relevant only for the `ProjectList`, and in the `constructor` function is the key point where we use the logic that we define in the `ProjectComponent`, more precisely in the `super` method, where we call the `ProjectComponent` class with the next properties: `project-list` as the `templateId`, `app` as the `hostElementId`, `false` as the value for `insertAtStart` and `active-projects` as the `newElementId`.

This connection will execute all the logic inside the body of the `ProjectComponent`s `constructor` method. Additionally, we implement the `configure` and the `renderContent` methods, that are abstract methods in our parent class. In the `cofigure` method we handle the to update our `projectState` via listeners and in the `renderContent` we render the title of our project list containers.

Notice that the `renderProjects` method is private to the `ProjectList` class, then it does not have any relation with the `ProjectComponent` parent class.

Now, it's time to check how we consume the `ProjectComponent` in the `ProjectInput` class:

```typescript
class ProjectInput extends ProjectComponent<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {...}

    private clearInputs() {...}

    @autobind
    private submitHandler(event: Event) {...}
}
```
In this case, we extends the `ProjectComponent` class with the `HTMLDivElement` and `HTMLFormElement` types. He is evident the benefit of use generics in the parent class definition.

Again, the connection with the `ProjectComponent` is done in the `super` method of the `constructor`. Here we set the `project-inpu` as the `templateId`, `app` as the `hostElementId`, `true` as value of `insertAtStart` and `userInput` as the `newElementId`.

Same way, we have to define the body of our abstract methods, but in this case the `renderContent` body is empty. We can set these methods as optional, or left it empty as we did.

In summary, with this example we highlight the benefits of use inheritance and generics. Now we have a cleaner and maintainable code.

Rendering Project Items with a Class
----------------
Currently, we are rendering the project items directly as a unordered list inside the containers via `document.createElement("ul")`, and we are just displaying the title of the project. This is fine, but now we can a `Project` custom type, so will be a good idea use this type to render our projects with a class. First we'll going to add some elements to the list markup:

```html
<!-- ... -->
    <template id="single-project">
        <li>
            <h2></h2>
            <h3></h3>
            <p></p>
        </li>
    </template>
```

The `<h2>` will render the title, `<h3>` the people and `<p>` the description. Now, we will use our `ProjectComponent` to create a `ProjectItem` class. We will take advantage of the `renderContent` method to display the project item through a class. Please check the next code:

```typescript
class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
```

Notice the types that we pass to the `ProjectComponent` class. We're putting the project item as a `HTMLLIElement` inside a `HTMLUListElement`. We define a private property called project, that will be passed in the in the `constructor` of the class together a `hostId` of the element that will wrap the item. Finally in the `renderContent` method we add the respective `textContent` of our element with the properties of the project.

Now, let's consume this class. If you review the `ProjectList` class, we have a `renderProjects` method. This class has a assignedProjects property that is a array of projects. When we iterate over this array, we got our project element that will passed as parameter of the `ProjectItem` class. Please check the next snippet.

```typescript

class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    //...

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;

        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}
```

In short, now are rendering our project items with a class.

Using a Getter
----------------
Now lets use a getter over the people property of the project to complement our output with useful information. In the `ProjectItme` we will add a getter `handlePersonPlural` the print the singular case, if we had just one person, and the plural case if we got more.

```typescript
class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> {
    private project: Project;

    get handlePersonPlural() {
        if (this.project.people == 1) {
            return '1 person';
        } else {
            return `${this.project.people} persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);

        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() {}

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.handlePersonPlural + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}
```

To use the getter, we just call the `this.handlePersonPlural` in the `renderContent` method over the people element.

Utilizing Interfaces to Implement Drag & Drop
----------------
Let's organize the app to attend the drag and drop events to pass our active projects to finished. Here we have to accomplish two goals. The first one is add all the logic related to the drag and drop, and then, we have to modify our state to reflect the drag and drop event into the application state. Before to start, lets use the `draggable` attribute in the `single-project` element of the mark up. Please check the next code.
```html
    <template id="single-project">
        <li draggable="true">
            <h2></h2>
            <h3></h3>
            <p></p>
        </li>
    </template>
```

Good! Now let's use interfaces to implement the drag and drop functionality. We will build it via two interfaces, a `Draggable` interface that will applied over the element that will be draggable and it will contains two handlers, one for the `dragstart` event and other for the `dragend` event. The second interface is the `DragTarget`, and it will contains the three handlers: `dragOverHandler`, `dropHandler`, and `dragLeaveHandler`. The next snippet reflects both interfaces definitions.

```typescript
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
```

Once created the interfaces we have to use them. For this case, we will use the `Draggable` interface in the `ProjectItem` class. Remember use the `implements` keyword to establish the relation between the class and the interface like show the next code:

```typescript
class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;
    // ...
    dragStartHandler(event: DragEvent) {
        console.log(event);
    }

    dragEndHandler(_: DragEvent) {
        console.log('DragEnd')
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {...}
}
```

Notice that in the `configure` method we add the event listener to the respective `dragstart` and `dragend` events, setting as callbacks the methods `dragStartHandler` and `dragEndHandler` that we define in the `Draggable` interface. For now, we will just log some message to validate that the events and their callback are working as expected.

Drag Events & Reflecting the Current State in the UI
----------------
Now, let's implement the `DragTarget` interface into the `ProjectList` class. Similarly as before we use the `implements` keyword and the we add the three methods defined in the interface: `dragOverHandler`, `dropHandler` and `dragLeaveHandler`. In the `configure` method we add the event listeners to this object the attend the respective events.

```typescript
class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {
    //...

    @autobind
    dragOverHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
    }

    dropHandler(_: DragEvent) {}

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        projectState.addListener((projects: Project[]) => {...});
    }

    renderContent() {...}

    private renderProjects() {...}
}
```

So far, we will add and remove the `droppable` style in the `ul` container of the project list. We add the class in the `dragover` event and we remove it in the `dragleave`. These change have an impact in the UI, but it is still pending modify the state.

Adding a Dropable Area
----------------
Time to start to implement the logic in the handlers. The first step is identify what data will be moved from the active container to the finished container. So, all the flow start from the `dragStartHandler` method inside the `ProjectClass`

```typescript
class ProjectItem extends ProjectComponent<HTMLUListElement, HTMLLIElement> implements Draggable{
    /...
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
}
```

Here, we use the `event.dataTransfer` property to manipulate the data related to the project. With the `setData` method we specify that we will send a `text/plain` data that contains the project id. The `effectAllowed` is a way to indicate to the browser that we want to move the data. Now, let's check how consume the exposition in the `dragOverHandler` and `dropHandler` methods.

```typescript
class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {
    /...
    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault(); 
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');
        }
    }

    dropHandler(event: DragEvent) {
        console.log(event.dataTransfer!.getData('text/plain'));
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }
}
```

Notice that in the `dragOverHandler` we add a validation to verify that the `event.dataTransfer` field has a data of type `text/plain`. If this validation is true, then we prevent the default behavior of event (by the default the browser don't allow draggable elements) and then we add our `droppable` class. Finally in the `dropHandler` we log the id of the project via `getData` method of the `event.dataTransfer` property.

So far, we will log the id of the project in the browser, but now, we have some data transferred between the containers.

Finishing Drag & Drop
----------------
Almost done, to finish the implementation, we have to complete the action in the `drop` event. So, we will store the project id from the `event.dataTransfer` in a variable. With this id, we have the resources to update the state of the application. Then we will consume the `projectState` global object and we will set a `moveProject` method to achieve this goal. Check the next snippet:

```typescript
class ProjectList extends ProjectComponent<HTMLDivElement, HTMLElement> implements DragTarget {
    /...
    @autobind
    dragOverHandler(event: DragEvent) { ... }

    dropHandler(event: DragEvent) {
        event.preventDefault();
        const projectId = event.dataTransfer!.getData('text/plain');

        projectState.moveProject(
            projectId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
        );
    }

    @autobind
    dragLeaveHandler(_: DragEvent) { ... }
}
```

Notice that the `moveProject` has a second parameter, the project status. This is the property that we will update in the state. Now let's focus on the `moveProject` method in the `ProjectState` class. This method will identify the project with the given project id and it will update the status property. Additionally it will update the listeners as show the next code:

```typescript
class ProjectState extends State<Project>{
    // ...

    addProject(title: string, description: string, numOfPeople: number) { ... };

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);

        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    };

    private updateListeners() {
        for (const listenerHandler of this.listeners) {
            listenerHandler(this.projects.slice());
        }
    }
}
```

Now, if you test the application, we got the expected behavior when we move the projects from the active container to the finished container and vice versa.

Wrap Up
----------------
With this project we use the next TypeScript features:

- Types
- Custom types
- Classes
- Abstract classes
- Inheritance
- Private and public props
- Event handling
- Set global state
- Decorators and interfaces and how they can help us and how we can write type safe scalable code.

Now Definitely feel free to build up on this project add more features on your own explorer what you could change there and simply practice working with typescript.

Currently we have all the logic in one file. In the next lesson we will split this file into multiple files to managing our code base in a better way.
