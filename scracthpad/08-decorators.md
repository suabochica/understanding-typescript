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
Working with Decorator Factories
--------------------------
Building Useful Decorators
--------------------------
Adding Multiple Decorators
--------------------------
Diving into Property Decorators
--------------------------
Accessor & Parameter Decorators
--------------------------
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
