Section 08: Decorators
=============================================
Let's dive into the next more advanced feature that would be decorators. Decorators are a feature which can be very useful for meta-programming.

Now what does meta-programming mean.

It means that you typically won't use tech writers that often to have a direct impact on the end users of your page.

So, off the users visiting your page but instead decorators are particularly well suited instrument for writing code which is then easier to use by other developers.

Now that might sound strange but you'll see what I mean from this module.

Decorators are functions that you can attach to classes, methods, properties, to add an extra functionality.

Index
--------------------------
1. A First Class Decorator
2. Working with Decorator Factories
3. Building Useful Decorators
4. Adding Multiple Decorators
5. Diving into Property Decorators
6. Accessor & Parameter Decorators
7. When Do Decorators Execute?
8. Returning a Class in a Class Decorator
9. Other Decorator Return Types
10. Example: Creating an "Autobind" Decorator
11. Validation with Decorators - Part one
12. Validation with Decorators - Part two
13. Fixing a Validator Bug
14. Wrap Up

A First Class Decorator
--------------------------
Before to start, please enable this option in your `tsconfig` file:

```json
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
```

Otherwise, we can't apply properly the use of decorator in the code.

Now, lets write our first decorator. Let's add a decorator called `Logger`. It is really important to understand that a decorator isn't the end just a function, instead is a function that you apply to something, for example to a class in a certain way. Please check the next snippet:

```typescript
function Logger(constructor: Function) {
    console.log('logging');
    console.log(constructor);
}

@Logger
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
```

As we mentioned `Logger` is the decorator. The capitalize format is a convention to define decorators, but it is not mandatory. This decorator is applied to the `Person` class with the `@Logger`, where we just call the definition of the function. This syntax specifies the use of decorators syntax.

If you check the logs, you can note that our decorator output logging is printed first that the `constructor` log. That's really important detail of decorators, they execute when your class is defined not when it is instantiate. If you don't need to instantiate your class at all we could remove that code for instantiating the class and we would still get death decorator output.

So the decorator runs when JavaScript finds the class definition not when you use that constructor function to instantiate an object. That's really important to understand.

So this is our first decorator it's not the only way of how we can create a decorator though.

Working with Decorator Factories
--------------------------
Besides creating a decorator we saw before, we can also define a decorator factory which basically returns a decorator function that allows us to configure it when we assign it as a decorator. Let's convert our previous decorator in a factory decorator:

```typescript
function Logger(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

@Logger('LOGIN - PERSON')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
```

Notice that now our decorator function returns an anonymous function that use the parameter in the function statement. This way we create a factory decorator.

This version now call our decorator because we're not executing the decorator function but we're executing a function that will return such a decorator function (`return function (constructor: Function)`).

The advantage just is that we now can pass in values which will be used by that inner returned decorator function. Now we see the old output but with our custom log string here.

So using decorator factories can give us some more power and more possibilities of configuring what the decorator then does internally.

Building Useful Decorators
--------------------------
We will build a decorator that given an element in the DOM by id we will apply a template to render it in the respective element. So let's start modifying the markup.

```html
<html>
<body>
    <div id="app"></div>
</body>
</html>
```

Once added the `id="app"`, we will define a new factory decorator called `WithTemplate` with the next body:

```typescript
function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor()

        if (hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}
```

Check that this decorator factory expect a `template` and a `hookId` as parameters. Then, it gets the `hookEl` and after validate it, ill will apply the template. Below we show how use this decorator:

```typescript
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
```

If you check your localhost, you will see that the values of `My Person Object` was replaced by `Edward` due to the specifications given in the `WithTemplate` decorator.

Consider Angular a very popular framework that uses TypeScript and it use decorators like `@Component` to allow you to pass in an object where you specify things like the template component and the selector in the DOM where the template should be rendered.

This is relatively close to what we defined here: a template and then a place where it should be rendered.

Now needless to say the angular decorators are of course way more advanced and elaborate than our basic decorator here. Nonetheless the core idea is the same angular it gives you the decorators here so that you can specify some HTML code which can be connected to your component class that will be rendered to the DOM when this component gets rendered.

So that's one of the things you can do with decorators or specifically here with decorator factories because that allows us to pass in that extra corn flake which we need here ,and, that's also what meta programming means.

We're creating decorator functions which you might say have some impact on the end user. In the end we do render something on the screen here but we do that with a tool which we expose to our developers because this decorator is such a tool which our developers have to use by adding it to a class in this example. Otherwise this would do nothing.

So, we provide extra utilities to developers which the other developers can use to for example conveniently render something on the screen for a given class.

Adding Multiple Decorators
--------------------------
We can apply multiple decorators to a class. Let's fit our example use the `Logger` and `WithTemplate` decorators in the `Person` class:

```typescript
function Logger(logString: string) {
    console.log('Logger Factory');              // [1]
    return function (constructor: Function) {
        console.log(logString);                 // [4]
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');            // [2]
    return function(constructor: any) {
        console.log('Template Execution');      // [3]
        const hookEl = document.getElementById(hookId);
        const p = new constructor()

        if (hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
```

So, a valid question is what is the order of how the decorators are applied, and it is important to clarify that the order changes according to the definition of the decorator. So, if we define a traditional decorator, the execution is top-to-bottom, like show the logs before the `return` statement. But, if you use a decorator factory, the execution is bottom-to-top.

The numbers in the snippet allow us to identify the decorator order execution of the code for this case.

Diving into Property Decorators
--------------------------
Keep in mind that decorators should be applied also in class properties. If you add a decorator to a property the decorator receives two arguments. The first argument is the `target` of the property, and for it will be refer to the class object itself. The second argument we get is the property name simply that could be a `string` here could of course also be a `Symbol`. For example:

```typescript
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName); // ({Product obj} , title)
}

class Product {
    @Log
    title: string;
    private _price: number;

    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!')
        }
    }

    constructor(t: string, p:number) {
        this.title = t;
        this._price = p;
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}
```

Here the `Log` function is a traditional decorator that is applied to the `title` property of the `Product` class. If you chekc the logs inside the decorator function, the `target` is the `Product` object, and the `propertyName` is the expected `title`.

Now when exactly thus is `Log` execute though?. Well as you can tell since we never instantiate any product, so, it executes basically when your class definition is registered by JavaScript. Therefore, it executes when you define this property to JavaScript as part of your class. In this particular case, the `Log` decorator is executed as part of the constructor function when we set `this.title = t`.

Accessor & Parameter Decorators
--------------------------
We can apply decorators in several places of our code like:

1. Accessors
2. Methods
3. Parameters

Let's create some decorators for our Product class:

```typescript
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName); // ({Product obj} , title)
}

function LogAccessor(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // price
    console.log(descriptor); // {Object with getters and setters}
}

function LogMethod(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(descriptor); // {writable: true, enumerable: false, configurable: true, ...}
}

function LogParameter(target: any, propertyName: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(position); // 0
}
```

Notice how according the decorator type, we should pass specific parameters. For the case of accessors and methods we have the same three parameters: `target`, `propertyName`, and `descriptor`. For parameters the last parameter is the `position` of it. Let's apply these decorators in the Product class:

```typescript
class Product {
    @Log
    title: string;
    private _price: number;

    @LogAccessor
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!')
        }
    }

    constructor(t: string, p:number) {
        this.title = t;
        this._price = p;
    }

    @LogMethod
    getPriceWithTax(@LogArgument tax: number) {
        return this._price * (1 + tax);
    }
}
```

So these are all the places where we can add decorators with TypeScript and we can do various things with them.Several libraries or frameworks make heavy use of decorators and the goal is check how these tools work with decorators to give you an idea of the power that decorators can have.

When Do Decorators Execute?
--------------------------
Before we dive into more examples let's understand the order in which decorators run though. Here it's important to understand that first of all they're all running without us instantiating a class. For this case, if we do this:

```typescript
const p1 = new Product('Book', 19);
const p2 = new Product('Shoes', 29);
```

This compiles without errors but our decorator logs keep being the same. So it's not the instantiation of this class that matters.

All these decorators no matter if it was a property decorator, method decorator, an accessor decorator, or a parameter decorator they all executed when you defined this class and that's important to understand.

These are not decorators that run at runtime when you call a method or when you work with a property. This is not what they do.

Instead these decorators allow you to do additional behind the scenes setup work. When a class is defined back to that meta programming concept I explained earlier.

That's the idea behind decorators, their core use case is that they're not attached to event listeners, then when you work with a property you can run some code. You can make something like that work with decorators actually but by tweaking and editing something behind the scenes.

Remember, the decorator itself really is just a function that executes when your classes defined. So, you can then use the decorators to do some extra work like set up some code that should run whatever it is called to add additional metadata or store some data about in a property somewhere else in your project or in your library which you're creating.

This is what you can use decorators for and that's all the pattern you'll kind of see when I now show you these examples of what you could build with decorators. They're adding extra functionality which then sometimes can execute when you do something with your claws or with your method but which can also do totally different things.

Returning a Class in a Class Decorator
--------------------------
Let's fit the `WithTemplate` function decorator to return a class like an extension of the original class, in this case the `Person` class:

```typescript
function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    return function<T extends {new (...args: any[]): {name: string}}>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Renedering template')
                const hookEl = document.getElementById(hookId);

                if (hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}
```

Several changes in this code. First, in the first function signature we use a generic type to represent the constructor of the object where we will apply the decorator (`<T extends {new (...args: any[]): {name: string}}>`). In this type definition, we are specifying that the object should have a `name` property. Also this function receives as parameter an `originalConstructor` that work on the constructor of the `Person` class.

Second, we are returning a class that extends from `originalConstructor`. Inside this class we specify his own constructor and with `super` we relate both constructors. Now we access to the `name` property via `this` and not via the `p` element.


Decorators are powerful if you really understand what you can do with them. You can use them as functions and also you can find them with factory functions. Moreover, with some decorator you can always return something to replace the thing you add at the decorator to. In our case to class with a new class that can implement the old class but also add its new custom logic


Other Decorator Return Types
--------------------------
We saw how we can build quite amazing things with decorators. Decorator factories and then also by utilizing the return values of decorators which in the example of a class decorator allows us to basically replace the class.

Now you can return values in our decorators too but not all of them or not in all of them. The return value is respected in decorators that you add to *methods* and the decorators you add to *accessories*. We can't add return values in decorators used to parameter and properties.

For accesors, we get objects like:

```json
{
    configurable: true
    enumerable: false
    get: undefined
    set: f price(val)
    __proto__: Object
}
```

We can modify these properties in a `return` statement for the accesor decorator. This means that we can set a `get` function in the return of the function.

For decorators on methods we get:
```json
{
    configurable: true
    enumerable: false
    value: f getPriceWithTax(tax)
    writeable: true
    __proto__: Object
}
```

Also here, all these properties can be updated in the `return` statement of our method decorator.

Example: Creating an Autobind Decorator
-------------------------- 
Lets review and example where a descriptor decorator can be useful. This example is related to the use of the JavaScript `bind` method to keep the context of `this`. First, lets add a button in the markup.

```html
...
    <button>Click me</button>
```

Now, lets create a `Printer` class with a method to print a message when the previous button is clicked. Keep in mind, that we have to instantiate the `Printer` class in a variable, and use the `addEventListener` to attend the click event. Check the next code.

```typescript
class Printer {
    message = 'This works';

    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer()

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage.bind(printer));
```

Notice the last line of the last snippet. Without the `.bind(printer)` this example will get an `undefined` every time you click the button. The reason is because the context of `this` is different inside the `addEventListener`, and then the `showMessage` method is out of the scope.

Now, lets create an `Autobind` descriptor decorator to handle the binding of the last scenario.

```typescript
function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
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

In this decorator, we store the `descriptor.value` in a `originalMethod` variable to bound the `this` of the function in the `get` property of the `adjustedDescriptor`. Finally, we return the `adjustedDescriptor`. Lets use the `Autobind` decorator.

```typescript
class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer()

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);
```

Here, we get the same result, but in this version, it is not necessary call the `bind` method after the `printer.showMessage` argument in the `addEventListener`.

So this is one neat example of how you can utilize decorators to build a quite amazing functionality and save you the hassle of manually calling bind everywhere.

Validation with Decorators - Part one
--------------------------
Lets check another scenario where decorators could be a good alternative. Form validations. Lets illustrate the sample with a basic `Course` structure whose properties are a `title` and a `price`. First of all, lets add a respective form into the markup the get the input of the course data.

```html
  <form action="">
      <input type="text" name="title" value="" placeholder="Course title" id="title" />
      <input type="text" name="price" value="" placeholder="Course price" id="price" />
      <button type=" submit">Save</button>
  </form>
```

Now, lets create the types script code to start to play with the `Course` class. Remember type your properties and add the event listener to the `submit` element of the form.

```typescript
class Course {
    title: string;
    price: number;

    constructor(_title: string, _price:number) {
        this.title = _title;
        this.price = _price;
    }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;

    const title = titleElement.value;
    const price = +priceElement.value;

    const createdCourse = new Course(title, price);
    console.log(createdCourse);
})
```

So far, this code have a expected behavior if the user fills both fields in the course form. However, if the user submit the form without data the `Course` instance will be created. So, we have to add some validation to the course form, to have all the guarantees over the expected input. The next functions are possible validations to the form.

```typescript
function Required() {}

function PositiveNumber() {}

function validate(obj: object) {}
```

We just have the signatures of the decorators, later we will review the body for them. An important thing here is that you can consider that these elements could be stored in a third party file. So, we can export them and later use them in our `Course` class as show next.

```typescript
class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(_title: string, _price:number) {
        this.title = _title;
        this.price = _price;
    }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;

    const title = titleElement.value;
    const price = +priceElement.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');

        return;
    }
    console.log(createdCourse);
})
```

Again keep in mind this could be part of our own third party library. So in there we could have some kind of storage that stores these decorators for the `Course` class and for the `title` property.

For example, we want wanted to be required and invalidate we can then check if in this storage object we got for the class the object is based on we do have a validated registered for the title for the price and so on and we then run our validation logic.


Validation with Decorators - Part two
--------------------------
First of all, lets create an interface `ValidatorConfig` where we want to configure that storage. We work with the idea of there is to have a couple of properties and hence we use the index type notation to access them.

These index are basically strings where the value is yet another object. Here would be basically the class name for which you want to register some validated properties and then in the object which was stored there.

We have two concrete properties of the class that have validators attached to them : `required` and `positive`. Then, we create a variable `registeredValidators` whose type is the created interface.

```typescript
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};
```

Now, lets add the body of our decorators. Here, we will get the `constructor.target.name` property in both cases, and set the prop name values to the `required` and `positive` respectively. Also, is important use the spread operator to avoid replace the `registeredValidators` object.

```typescript
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}
```

Finally the `validate` function. This function will works over the `registeredValidators[obj.constructor.name]`, because our validations will go over the indexed we have store there. So, first of all, we have to validate that the object is valid. Additionally we create a `isValidProp` to check that our validation will be applied over the expected indexes.

Then we iterate over all prop in `objValidatorConfig`, and again, we iterate over the `objValidatorConfig[prop]` to apply the validation with a switch/case syntax. Next code show us the example:

```typescript
function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    let isValidProp: boolean = true

    if(!objValidatorConfig) {
        return true;
    }

    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValidProp = isValidProp && !!obj[prop];
                    break;
                case 'positive':
                    isValidProp = isValidProp && obj[prop] > 0;
                    break;
            }
        }
    }

    return isValidProp;
}
```
And this is now a first naive implementation of how such a validator could work with the help of typescript decorators. Keep in mind that all of that here all the decorators to validate function and the registry would be hidden away from you.

That could be part of the third party library which you're working on of course in a more elaborate way than probably which you share with your end users and you as an end user would just import these things at these decorators and called validate and you would have a very convenient way of adding validation to your class system.

Fixing a Validator Bug
--------------------------
Wrap Up
--------------------------
Resources
--------------------------



Creating a Class Decorator
--------------------------
1. The only condition to define a function as decorator is pass as argument the constructor of the function where the decorator will attached.
2. Check the next code:

```javascript
function logged(constructorFunction: Function) {
    console.log(constructorFunction);
}

@logged
class Person {
    constructor() {
        console.log("Hi")
    }
}
```

Decorator Factories
-------------------
1. A *Factory*  help you to set what decorators will be used by the class:
2. Check the next code:

```javascript
function logging(value: boolean) {
    return value ? logged : null;
}

@logging(true)
class Car {

}
```

3. Above, the `logging()` function is a factory

Creating a useful Decorator
--------------------------
1. Decorators turn useful when you take advantage of the JavaScript prototypal inheritance.
2. Check the next code:

```javascript
function printable(constructorFunction: Function) {
    constructorFunction.prototype.print = function() {
        console.log(this);
    }
}

@printable
class Plant {
    name = "Green Plant"
}

cons plant = new Plant();
(<any>plant).print()
```

3. Above, the code use a weird syntax `(<any>plant)`. Unfortunately, this is the only way to use the function in the decorator

Using Multiple Decorators
-------------------------
1. Just add the factory to the class that will use it.

```javascript
@logging(true)
@printable
class Plant {
    name = "Green Plant"
}

cons plant = new Plant();
(<any>plant).print()
```

Method Decorators
-----------------
1. A *Method Decorator* is declared just before a method declaration.
2. The decorator is applied to the `Property Descriptor` for the method, and can be used to observe, modify, or replace a method definition.
3. Check the next code:

```javascript
function editableMethod(value: boolean) {
    return function(target: any, propName: string, descriptor: PropertyDescriptor) {
        descriptor.writable = value;
    }
}

class Project {
    projectName: string;

    constructor(name: string) {
        this.projectName = name;
    }

    @editableMethod(true)
    calculateBudget() {
        console.log(1000);
    }
}

const project = new Project("Super Project");

project.calculateBudget();

project.calculateBudget = function() {
    console.log(2000);  // -> editable ? 2000 : 1000
}

project.calculateBudget();
```

Property Decorators
-------------------
1. A *Property Decorator* is declared just before a property declaration.
2. A property decorator cannot be used in a declaration file, or in any other ambient context.
3. Check the next code:

```javascript
function editableProperty(value: boolean) {
    return function(target: any, propName: string): any {
        const newDescriptor: PropertyDescriptor = {
            writable: value
        }

        return newDescriptor;
    }
}

class Project {
    @editableProperty(true)
    projectName: string;

    constructor(name: string) {
        this.projectName = name;
    }

    @editableMethod(true)
    calculateBudget() {
        console.log(1000);
    }
}

const project = new Project("Super Project");

project.calculateBudget();

project.calculateBudget = function() {
    console.log(2000);
}

project.calculateBudget();
```

Parameter Decorators
--------------------
1. A *Parameter Decorator* is declared just before a parameter declaration.
2. The parameter decorator is applied to the function for a class constructor or method declaration.
3. Check the next code:

```javascript
function printableParameter(target: any, methodName: string, paramIndex: number) {
    console.log("target: ", target)
    console.log("methodName: ", methodName)
    console.log("paramIndex: ", paramIndex)
}

class Course {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printStudentsNumbers(mode: string, @printableParameter printAll: boolean) {
        if (printAll) {
            console.log(40)
        } else {
            console.log(10)
        }
    }
}

const course = new Course("Super Course");

course.printStudentNumbers("anything", true);
course.printStudentNumbers("anything", false);

```
