Section 5: Classes & Interfaces
==========================================

In this module we'll explore classes and interfaces. Where and why we use them. Then we'll have a detailed look at classes and they are all that our concept called inheritance and add interfaces what they bring to the table how they're compile to JavaScript and why we might use these features.

Index
--------------------------------
1. What are Classes?
2. Creating a First Classes
3. Compiling to JavaScript
4. Constructor Functions & The "this" Keyword
5. "private" and "public" Access Modifiers
6. Shorthand Initialization
7. "readonly" properties
8. Inheritance
9. Overriding Properties & The "protected" Modifiers
10. Getters & Setters
11. Static Methods & Properties
12. Abstract Classes
13. Singletons & Private Constructors
14. Classes Summary
15. A First Interface
16. Using Interfaces with Classes
17. Why Interfaces
18. Readonly Interface Properties
19. Extending Interfaces
20. Interfaces as Functions Types
21. Optional Parameters & Properties
22. Compiling Interfaces to JavaScript
23. Wrap Up
24. Resources

What are Classes?
--------------------------------
Before to explain classes, it is necessary expose the object-oriented programming (OOP) paradigm.

The idea behind object oriented programming and classes is that you work with real life entities in your code.

With this approach, you work with objects that resemble real life objects as far as possible, at least to make it easier for you as a developer to reason about your code. The next image is an example of the entities behind an e-commerce: product list, product and shopping cart.

![What is OOP?](../assets/s05-what-is-oop.png "What is oop")


Notice that each entities have his own responsibilities. Moreover, with an arrow we identify the relationships between this entities. This way, a developer build a schema, splitting logical pieces to resolve a specific problem. In this case, consolidate an e-commerce.

With the notion of entities, we can go ahead with objects and classes. The next image shows the difference between this two concepts and how they are related.

![Objects and Classes](../assets/s05-objects-and-classes.png "Objects and Classes")

In brief, a object is an instance of a class and classes help us define how objects should look like, which properties and methods to have and so on.

Classes exist to speed up the creation of objects and it's simply an alternative to using the object. Also, they make it easier to create multiple objects, which generally have the same structure and the same efforts, which might only differ with the exact data details which are stored in there.

Creating a First Classes
--------------------------------
Let's create our first class to model an object that will represent the departments in an enterprise. Please check the next snippet:

```typescript
class Department {
    name: string;

    constructor (_name: string) {
        this.name = _name;
    }
}

const accounting = new Department('Accounting');

console.log(accounting); // Department {name: 'Accounting'}
```

Several details to consider here. First, we are using the `class` keyword to define the `Department` blueprint. The next lines after define the class are the key-value type pair that will shape the class. Please do not confuse the with the key-value pair in objects, have a similar syntax, but, they have a subtle difference.

Second, we have the `constructor` reserve word to essentially create a function tied to this class and tied to any object you create based on the class which is executed when the object is being created.

Finally we create the `accounting` object via the `Department` class. If we do not pass the `name` parameter in the object creation, TypeScript's compile will raise an error saying that is expected the name property to create the object.

Compiling to JavaScript
--------------------------------
According the version that it is in the `tsconfig` file you will get a different compilation file. For ES6, the compiled file is:

```typescript
class Department {
    constructor (_name: string) {
        this.name = _name;
    }
}

const accounting = new Department('Accounting');

console.log(accounting); // Department {name: 'Accounting'}
```

The only difference is that the key-value type definition is deleted. However, let's see the compiled file when the target version is ES5:

```typescript
"use strict";
var Department = /** @class */ (function () {
    function Department(_name) {
        this.name = _name;
    }
    return Department;
}());
var accounting = new Department('Accounting');
console.log(accounting); // Department {name: 'Accounting'}
```

Notice how is transpiled the `constructor` function. It is a IIFE with the assignation of the property that it is passed to instantiate the class. So this concept is not new it's not introduced by modern JavaScript or by typescript the idea of having blueprints for objects has been around the JavaScript for a very long time in the past.

However we had to use constructor functions and since this could be a bit unintuitive especially to developers who might have worked with different programming languages modern JavaScript introduced the idea of classes of this cleaner syntax and typescript supports this as well.

Because of TypeScript powerful compilation you can choose where you want to compile the older style which of course works in Web browsers or introduce more modern ES6 style which we saw before which looks very much like this year.

The key takeaways that we have this feature built into JavaScript and supported by TypeScript that we can define object blueprints.

Constructor Functions & The "this" Keyword
--------------------------------
Classes have the guidelines to define and object, and, additionally they can have methods that could be called on the created object. Below, we add a `describe` method to the `Department` class:

```typescript
class Department {
    name: string;

    constructor (_name: string) {
        this.name = _name;
    }

    describe() {
        console.log(`Department ${this.name}`);
    }
}

const accounting = new Department('Accounting');
accounting.describe(); // Department Accounting
```

Now, the object `accounting` offers us a way to get a description of itself via the `describe` method. Now, let's create a `accountingCopy` object with a `describe` property that will consume the `accounting.describe`:

```typescript
const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
```

We get a `undefined` value, and the reason is in the `this.name` defined in the body of the `describe` in the `Department` class. So, the `describe` method it is called and executed. When it is executed, the `this` keyword will not refer to the object created via `Department`. Instead, `this` is bound to the `{ describe: accounting.describe }`, and here you don't have a `name` property. That is why we get `undefined`.

Keep in mind that `this` typically refers to the thing which is responsible for calling a method.

To solve this issue, we have to be more specific in the `describe` method adding a typed parameter to it, as shows next:

```typescript
class Department {
    name: string;

    constructor (_name: string) {
        this.name = _name;
    }

    describe(this: Department) {
        console.log(`Department ${this.name}`);
    }
}
```

This definition makes that the TypeScript's compiler throw us an error in the `accountingCopy` assignation saying that the `name` property is missing. The we follow the recommendation to get:

```typescript
const accountingCopy = { name: 'Dummy', describe: accounting.describe };
accountingCopy.describe(); // Department: Dummy
```

Problem solved :).

"private" and "public" Access Modifiers
--------------------------------
The `private` and `public` modifiers are two great feature introduced by TypeScript to organize the access in the classes defined. This feature is not exist in JavaScript. For JavaScript the variables or methods are public, an you can manage the access via scopes. By default all the variables an methods are public in TypeScript.

Let's review the `private` modifier with the next example:

```typescript
class Department {
    name: string;
    private employees: string[] = [];

    constructor (_name: string) {
        this.name = _name;
    }

    describe() {
        console.log(`Department ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
}

const accounting = new Department('Accounting');
accounting.describe(); // Department Accounting

accounting.addEmployee('Edward');
accounting.addEmployee('Alphonse');

// accounting.employees[2] = 'Anna' // Error: Property employees is private to Department

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
```

Notice that the `employees` is a private property for the `Department` class. This means that `employees` is a variable that only could be accessed inside the class `Department`. If you check the `account.employees[2]` line assignation, here we are trying to access into the employees array to push the `Anna` value, but the TypeScript's compiler throw an error, clarifying that the `employees` property is private and only accessible within class `Department`.

These modifiers are great tools to structure the classes in our code in a uniform way.

Shorthand Initialization
--------------------------------
With the knowledge of the `public` and `private` modifiers, we know can understand a shorthand initialization for the `Department` class. Currently, first we are defining the properties of the `Department` class and then we assign them in the `constructor` method:

```typescript
class Department {
    private id: string;
    name: string;
    private employees: string[] = [];

    constructor (_id: string, _name: string) {
        this.id = _id
        this.name = _name;
    }

    describe() {
        console.log(`Department ${this.name}`);
    }

    printId() {
        console.log(`Department ${this.id}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
}
```

The shorthand initialization version of the `Department` class is:

```typescript
class Department {
    private employees: string[] = [];

    constructor (private id: string, public name: string) { }

    describe() {
        console.log(`Department ${this.name}`);
    }

    printId() {
        console.log(`Department ${this.id}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
}
```
With this version we avoid the double initialization that we get in the first snippet.

"readonly" properties
--------------------------------
Related to the context of access modifiers, it is another modifier called `readonly`, used to indicate the fields in the class which should **not** change after their initialization. In the `Department` class a potential candidate is the `id` property. Below and example using the `readonly` modifier.

```typescript
class Department {
    private employees: string[] = [];

    constructor (private readonly id: string, public name: string) { }

    describe() {
        console.log(`Department ${this.name}`);
        this.id = "d1" // id is a read-only property
    }
    ...
}
```

Notice that if we try to assign a new values to `this.id` the TypeScript's compiler raise an error about the `readonly` condition.

The `readonly` modifier adds extra safety to make clear that a certain property should only be initialized to once. This way you as developer make your intentions clear when you define the code. In a team, it is a good idea to write clearer and explicit code to help everyone what are the goal behind the logic.

These modifiers only exist in TypeScript. When the are transpiled to JavaScript all the variables are public by default and the access to variables is handled via scope. For other hand, the methods are added to the `prototype` of the constructor function. Prototypes are an important concept behind vanilla JavaScript that it is out of the range for the section.

Inheritance
--------------------------------
Until now we work with the `Department` to create an accounting department. However, we will need more departments and these departments might need more information and specific properties. The approach establish `Department` as a base class, an then we will have specialized methods and specific properties over the `Department` class. To goal this we should use **inheritance** on `Department` class.

Let's recap the `Department` class:

```typescript
class Department {
    private employees: string[] = [];

    constructor (private readonly id: string, public name: string) { }

    describe() {
        console.log(`Department ${this.name}`);
    }

    printId() {
        console.log(`Department ${this.id}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
```

Good. Now we will create an `ITDepartment` that will inherit the properties of `Department` and it will contain an specific property called `admind`. Please check the next code:

```typescript
class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT'); // Call the constructor of the base class
        this.admins = admins;
    }
}

const it = new ITDepartment('d1', ['Roy']);
it.describe(); // Department Accounting

it.addEmployee('Edward');
it.addEmployee('Alphonse');
```

Notice the `extends` keyword in the signature of the `ITDepartment` class. This way, we inherit all the definitions in `Department` class. In addition, in the `constructor` method you can see the `super` keyword. This line call the constructor of the base class. With these two detail we can access to all the definitions in `Department` from `ITDepartment`.

For the other hand, check the `admins` property. This property is exclusive for `ITDepartment`. It means that `Department` can access to the `admins` fields. Thus, we add specific definitions to the child class.

To complement the range of inheritance, let's create the `AccountingDepartment` where it will have specific properties and specific methods. Please review the next snippet:

```typescript
class AccountingDepartment extends Department {
    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }
}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.printReports();
```

Just as before, we use the `extends` keyword and the super methods to establish the inheritance relation with the `Department` class.

Otherwise, in the `AccountingDepartment` class we add the `reports` specific property, and the `addReport`, `printReports` methods. Again, this methods are exclusive to `AccountingDepartment`, then they not means nothing to the `Department` class.


Inheritance is a great feature to structure you code and is one of the pillars for OOP. Also it helps to set the standards in you work with a team, so it is time to take advantage of it. 

Overriding Properties & The "protected" Modifiers
--------------------------------
In inheritance we can override the methods of our base class. Let's override the `addEmployee` method of the `Department` class in `AccountingDepartment`:

```typescript
class Department {
    private employees: string[] = [];

    constructor (private readonly id: string, public name: string) { }
    ...
}

class AccountingDepartment extends Department {
    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
    }
    ...
    addEmployee(name: string) {
        if (name === 'Edward') {
            return;
        }

        this.employees.push(name);
    }
}
```

This way, all the variables instantiated via `AccountingDepartment` will have access to the `addEmployee` method we define above. This snippet currently has an error, an is that the `this.employees` property can't be accessed by `AccountingDepartment` because this field is a `private` field for `Department`. We can extend the range of the access to the base class properties with another modifier, `protected`:


```typescript
class Department {
    protected employees: string[] = [];

    constructor (private readonly id: string, public name: string) { }
    ...
}
```

The `protected` modifier makes the fields of the base class accessible from outside but it makes it accessible from inside of the classes that extend the base class.

Getters & Setters
--------------------------------
To explain the a getter, let's add a new property in the `AccountingDepartment` class called `lastReport` as shown below:


```typescript
class AccountingDepartment extends Department {
    private lastReport: string;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }

        throw new Error('No report found');
    }

    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
        this.lastReport = reports[0]
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }
    ...
}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.printReports();

console.log(accounting.mostRecentReport); // Using the get property
```

Several things to take in account for the last snippet. The first one is that `lastReport` is a `private` property, so, only can be accessed by `AccountingDepartment`. Second, we use the `get` keyword to define the `mostRecentReport` function. Despite `mostRecentReport` is defined as a function, for `AccountingDepartment` it will be a property, thanks to the use of the `get` keyword before his definition. That is the reason why in the log we use just `accounting.mostRecentReport` without the `()` to invoke a function.

Something similar happens with a setter:

```
class AccountingDepartment extends Department {
    private lastReport: string;
    
    ...

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!')
        }

        this.addReport(value)
    }

    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
        this.lastReport = reports[0]
    }

    ...
}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.printReports();

accounting.mostRecentReport = "Set most recent report"; // Using the set property
console.log(accounting.mostRecentReport);
```

A general convention is that getters and setters share the same method name. A difference is that the `set` definition will receive and argument in the function definition, the value that will be set. To set this value we only use the assignation operator, as shown the code above.

Getters and setters are great to encapsulate logic and for adding extra logic that should run when you try to read a property or when you try to set a property.

Static Methods & Properties
--------------------------------
Static properties an methods are a feature that allow you to add properties and methods to classes which are not accessed on an instance of the class, so, you don't need to call the `new` to instantiate the class before to access to these properties. Instead, you access them directly from the class.

A popular example is the when we use `Math` built-in object that has properties and methods fro mathematical constants and functions:

```typescript
Math.PI;
Math.E;
Math.pow();
Math.random();
```

As you can see, we never instantiate `new Math`. Let's add a static property `fiscalYear` and a static method `createEmployee` to our `Department` class:

```typescript

class Department {
    static fiscalYear = 2020
    protected employees: string[] = [];

    constructor (private readonly id: string, public name: string) { Department.fiscalYear }

    static createEmployee(name: string) {
        return { name: name };
    }
    ...

}

const employee1 = Department.createEmployee('Winry');
console.log(employee1);
```

Notice the use of the `static` keyword to define static properties and static methods. Additionally, check in the constructor that we access to the `fiscalYear` via `Department.fiscalYear`. If we try to use `this.fiscalYear`, TypeScript's compiler raise an error because `this` access to the properties through the instance of the class, and the purpose of `static` is detach method and properties for the instance of the class.

Static properties and methods are often used for utility functions that you want to group in a class, or global constants that you also want to store in a class.

Abstract Classes
--------------------------------
We now that the methods of the base classes can be override in the child class. However, sometimes you do not just want to offer the option of overriding a method because this offer is done by default. Instead, you want to force that the classes that are extending a base class implement in mandatory way certain method of it.

For this instruction we can use `abstract` keyword. Let's do that the `describe` method of the `Department` class will mandatory for the children class. Please check the next code:

```typescript
abstract class Department {
    static fiscalYear = 2020
    protected employees: string[] = [];

    constructor (protected readonly id: string, public name: string) { }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;
    
    ...
}
```

Notice that we use the `abstract` in the signature of the `Department` class and in the signature of the `describe` method. It is a requirement because for TypeScript, the abstract methods can only exist in abstract classes. With this definition, the TypeScript's compiler will raise an error on the `ITDepartment` and `AccountingDepartment` classes, because currently they don't have an implementation of the `describe` method. Time to add it:

```typescript
class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT'); // Call the constructor of the base class
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

const it = new ITDepartment('d1', ['Roy']);
it.describe(); // IT Department

class AccountingDepartment extends Department {
    private lastReport: string;

    //...

    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
        this.lastReport = reports[0]
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }
    
    //...
}

const accounting = new AccountingDepartment('d2', []);
accounting.describe(); // Accounting Department
```

Now both classes have their respective `describe` method. An important detail is that abstract classes can't be instantiated with the `new` keyword, because abstract class just are to be inherit from. Then you should instantiate the classes that extends the abstract class.

Abstract classes can therefore be very useful if you want to force that all classes based on some other class share some common method or property. We can all have abstract properties but at the same time you want to make sure that you don't have to provide concrete value to concrete implementation in the base class. Instead, the inheriting class will take all these responsibilities.

Singletons & Private Constructors
--------------------------------
There is an interesting feature to introduce that is the private constructors. A private constructor is a pattern in OOP called **Singleton**. The Singleton pattern is about ensuring that you always only have one instance of a certain class. This can be useful in scenarios where you somehow cannot use the static methods or properties you do not want to, but, at the same time you want to make sure that you can create multiple objects based on a class.

The next code is an implementation of the singleton pattern in the `AccountingDepartment` class:

```typescript
class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    //...

    private constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
        this.lastReport = reports[0]
    }

    static getInstance() {
        if (AccountingDepartment) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    //...
}

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
```

Several stuff to highlight here. First, check that we add a `private static instance` of type `AccountingDepartment` as a property for the class. This property will give store the only instance that `AccountingDepartment` will have.

Second, the constructor now it is private, `private constructor`. So, we cannot instantiate the `AccountingDepartment` with a `new` keyword anymore. Instead, we create a `getInstance` method, where we validate if an instance of `AccountingDepartment` is already created to return it. If not, we create the instance and we assign it to the `this.instance` property and return it.

Finally, we create two variables `accounting` and `accounting2` and we call in both variables the `getInstance` method. If you log these variables you get the same `AccountingDepartment` object in both case, having guarantees over our singleton.

Classes Summary
--------------------------------
So far we learned:

- Classes themselves
- Properties and access modifiers: public, private and protected
- Inheritance and abstract classes/methods
- Singleton and private constructors

Under the hood, the TypeScript classes are transpiled to the prototype object of vanilla JavaScript. This is good to know, to understand the magic that TypeScript adds over the default JavaScript features.

A First Interface
--------------------------------
Now, let's talk about **interfaces**. An interfaces is basically the definition of an object. Check the next example to illustrate the concept:

```typescript
interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}
```

Notice that we don't have initialized values in this structure, we just define the property an the respective type. Also, check the convention of add a semicolon `;` after define the object property.

Let's use this interface:

```typescript
let user: Person;

user = {
    name: 'Edward',
    age: 18,
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

user.greet("Hello, I am") // Prints: "Hello, I am Edward"
```

As you can see, the type of the variable `user` is the `Person` interface we define before. In the assignation of the `user` object we match the values types with the types established in the interface. If we skip this detail, the TypeScript's will raise an error.

So this is an interface. It allows us to define the structure of an object we can use it as a type to type check for objects that must have this structure.

Using Interfaces with Classes
--------------------------------
Now you will say why we have to use interface if until now, we got the same behavior if we use the `type` keyword as show below:

```typescript
type Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}
```

With this version we got the same result as before. Often, you can interchange `interface` with `type` but they have some differences. One major difference is that interfaces can only be used to describe the structure of an object, and this definition make it the clearer. For the other side, you can use type for that as well, but, instead of a custom type you can also store union types, and stuff that we did mention in chapter 2, making type a bit flexible.

The second big difference is that you can implement an interface in an class, and this is probably the reason why you often work with interface indeed. An interface can be used as a contract. Then a class that implements the interface has to adhere to. Let's check an example:

```typescript
interface Greetable {
    name: string;
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 40

    constructor(n: string) {
        this.name = n
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}
```

Here, we have a interface `Greetable` that is implemented by a class `Person`. With this definition, the TypeScript's compiler will raise error if the `Person` class has not a `name` property and a `greet` method. Let's now check how we use the `Person` class:

```typescript
let user: Greetable;

user = new Person('Edward')

user.greet("Hello, I am")
console.log(user); // Prints the Person object
```

Check that we are using the `new` keyword to instantiate the `Person` class, a class that is implementing the `Greetable` interface. Also we say the `user` variable has type `Greetable`. TypeScript's compiler has not problem with this definition, because `Greetable` is implemented by the `Person` class, then the person object store in the `user` has the readable interface.

The key point is that we can work with classes as always, but with interfaces we forced to implement classes under an specific structure. Interfaces are often used to share functionality among different class not regarding their concrete implementation, but checking the feature structure that the class should have.

So, interfaces are similarly to work with abstract classes, except that in abstract classes we have implementation details. In interfaces we just have a structure definition.

That is interface in a nutshell.

Why Interfaces
--------------------------------
So now did we know about these powerful features an obvious question is why would we use that, why is that helpful? 

Well it is useful in situations where we know we want to have a certain set of functionalities or methods and we want to ensure that a class has is forced to fit his implementation to this set.

To goal that, we can implement an interface which forces the existence of these methods. Then, we can easily share functionality among classes and every class has to add its own implementation.

Enforce a certain structure with the help of interfaces can be useful if we then have other parts of our code which rely on that structure. This allows us to write truly powerful and flexible code where we don't have to know everything about an object or everything about a class, just will be relevance for use the structure defined via interfaces.

Readonly Interface Properties
--------------------------------
For interfaces we can use the `readonly` modifier. Recall that the `readonly` makes that the property in whatever object you built based on this interface must only be set once and is read only thereafter, so that it can't be changed off.


For example:

```typescript
interface Greetable {
    readonly name: string;
    greet(phrase: string): void;
}
...

user = new Person('Edward')
user.name = 'Alphonse' // Error, name is a readonly property
```

Notice than the `name` property is `readonly` is for that reason that we can't modify it after instantiate the `Person` object.

Extending Interfaces
--------------------------------
We can implement inheritance in interfaces. Let's adapt our code example to illustrate how we can apply inheritance on interfaces.

```typescript
interface Named {
    readonly name: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age = 40
    ...
}
```

As you can see, the `Greetable` interface is extending the `Named` interface. If we define the `Person` class that is implementing the `Greetable` and we skip the `name` property, the TypeScript's compiler will raise an error saying that the `name` property is missing.

Remember, that we can implement several interfaces in a class, that means that with the next code:

```typescript
class Person implements Greetable, Named {
    name: string;
    age = 40
    ...
}
```

We got the same results. However, we adapt the example to illustrate how we can extends interfaces.

Finally, unlike inheritance in classes, interfaces can extends several interfaces and the same time. For example:

```typescript
interface Greetable extends Named, AnotherInterface {
    greet(phrase: string): void;
}
```

It is a valid use. Recall that in classes we only can extend one class.

Interfaces as Functions Types
--------------------------------
So far, we now that interfaces are use to define the structure of an object. Also, we can use interfaces to define the structure of a function.

Let's recall the definition of the function types to explain the equivalence. Check the snippet below:

```typescript
type addFunction = (a: number, b: number) => number;
let add: addFunction;

add = (n1: number, n2: number) => {
    return n1 + n2;
}
```

Here, we use the `type` keyword and for the `addFunction` we define an structure of two parameters of type `number` with a return of type `number` as well. Now let's use the `interface` syntax to achieve the same result.

```typescript
interface addFunction {
    (a: number, b: number): number;
}
let add: addFunction;

add = (n1: number, n2: number) => {
    return n1 + n2;
}
```

The two differences with this version is that the assignation operator `=` and the arrow function `=>` are skipped. Instead we follow a pair syntax where the expression before the colon `:` are the parameters of the function, and the definition after the colon is the return type of the function.

Probably, the first version is more popular that the second one. We illustrate the option, to be aware that interfaces also offer use the possibility of define function types.

Optional Parameters & Properties
--------------------------------
TypeScript provides a Optional parameters feature. By using Optional parameters features, we can declare some parameters in the function optional, so that client need not required to pass value to optional parameters. We can use this feature in interfaces. Check the next code:

```typescript
interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 40

    constructor(n?: string) {
        this.name = n
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        } else {
            console.log(`Hi!`);
        }
    }
}
```

Notice that all the properties in the interface are optional. So when we implement the `greet` method in the `Person` class, we should consider the scenario when the name is not a parameter, being that we define it as an optional parameter.

Compiling Interfaces to JavaScript
--------------------------------
An interesting detail with interfaces is that if you check the compiled `app.js` file we can't see anything related to interfaces. The interfaces definitions in our `.ts` files are not transpiled to vanilla JavaScript. This means that interfaces are a TypeScript pure feature and it is evaluated in during development stage, so you can use it to improve your code. 

Wrap Up
--------------------------------
That is it for interfaces and classes in this module we had a detailed look at classes and what we can do there.

Classes in TypeScript in the end just build up on classes for JavaScript and I already summarized those. Below some take aways for classes:

- Classes allow you to prepare some type of blueprints for your objects
- `private` makes accessible the variable for the class where is defined
- `protected` is an extension of `private` and allows make accessible the variable for another classes
- `public` keyword is a shortcut for create a property, getting the argument and assign it
- Just use the dot notation and be aware of the properties's scope
- Use the `extends` keyword when the class is defined to apply inheritance
- The inherit class have to use the `super` keyword in his `constructor`
- `static` keyword allow us to use the properties of a class without instantiate it. Ideal for helpers.
- `abstract` keyword allow us to create classes that can't be instantiated. Works as a blueprint.
- `abstract` keyword in methods doesn't have logic. Works as a guide to the class that use the abstract class to show that the logic of the abstract method is responsibility of that class.
-  Abstract classes always have to be inherit
- Singleton: is a pattern where you have just one instance of a class in runtime

Interfaces are a different thing. They only exist in TypeScript very pure types with feature helping you to write clearly structured and very explicit code. They can help you to force classes to have certain features or objects in general to have a certain structure.

- Interfaces could be defined as a custom type
- Interfaces can be used as a function types.
- Interfaces allow for optional properties and all the four optional methods by the way.
- Interfaces are not compiled to JavaScript.

Resources
--------------------------------
- [JS Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [TS Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)
