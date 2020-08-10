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
Returning a Class in a Class Decorator
--------------------------
Other Decorator Return Types
--------------------------
Example: Creating an "Autobind" Decorator
-------------------------- 
Validation with Decorators - Part one
--------------------------
Validation with Decorators - Part two
--------------------------
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
