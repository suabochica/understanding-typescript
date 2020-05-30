Section 07: Doing Contract Work with Interfaces
===============================================

Introduction
------------
1. Time to come to some features which are brand new after TypeScript: Interfaces

The Basics about Interfaces
---------------------------
1.   An *Interface* basically is a contract signed between objects to guarantee the use of a property, function, whatever...
2.   The next code shows how to define interfaces in TypeScript:

```javascript
interface NamedPerson {
    firstName: string
}

function greet(person: NamedPerson) {
    console.log("Hello" + person.firstName);
}

function changeName(person: NamedPerson) {
    person.firstName = "Leonardo";
}

const person = {
    name: "Sergio",
    age: 26
}

greet(person);
changeName(person);
greet(person);

```
Interfaces and Properties
-------------------------
1. If we try pass an object literal like `greet(name: "Sergio", age: 14)` the TypeScript compiler will throw an error
2. This error is because in the `greet()` is expected a `NamedPerson` interface whose does not have specified an `age` property.
3. To solve this we have to remove the age property from the object literal or add the property `age` to the `NamedPerson` interface

```javascript
interface NamedPerson {
    firstName: string,
    age?: number,               // Notation for optional property
    [propName: string]: any     // Notation for expected property
}
```

Interfaces and Methods
----------------------
1. Check the comment that illustrate the method declaration syntax for an interface

```javascript
interface NamedPerson {
    firstName: string,
    age?: number,
    [propName: string]: any,
    greet(lastName: string): void   // Notation for add methods in the interface
}

const person = {
    name: "Sergio",
    age: 26
    hobbies: ["Sports", "Videogames"]
    greet(lastName: string) {
        console.log("Hi my last name is" + lastName);
    }
}

person.greet("Benítez"); //-> "Hi my last name is Benítez"
```

Using Interfaces with Classes
-----------------------------
1. You can use interfaces in classes through the keyword `implements`. Check the next code:

```javascript
interface NamedPerson {
    firstName: string,
    age?: number,
    [propName: string]: any,
    greet(lastName: string): void   // Notation for add methods in the interface
}

class Person implements NamedPerson {
    firstName: string;          // Mandatory property by NamedPerson
    nickName: string            // We can add more properties or methods in our class!
    greet(firstName: string, nickName: string) {   // Mandatory method by NamedPerson
        console.log("Hi my first name is " + firstName +" a.k.a " nickName);
    }
}

const myClassPerson = new Person();
myClassPerson.firstName = "Sergio";
myClassPerson.nickName = "Kun"
myClassPerson.greet(myClassPerson.firstName, myClassPerson.nickName) //-> "Hi my first name is Sergio a.k.a Kun

```

Interfaces and Function Types
-----------------------------
1. Check the next code syntax to use function types as interfaces:

```javascript
interface DoubleValueFunction {
    (number1: number, number2: number): number;
}

let myDoubleValueFunction: DoubleValueFunction;

myDoubleValueFunction = function(value1: number, value2: number) {
    return (value1 + value2) * 2
}

console.log(myDoubleValueFunction(5, 6)) //-> 22
```

Interface Inheritance
---------------------
1. Works similarly to the inheritance in classes. You have to use the keyword `extends`

```javascript
interface AgedPerson extends NamedPerson {
    age: number     // Makes the age property mandatory
}

let oldPerson: AgedPerson {
    age: 26
    firstName: "Sergio"
    greet(firstName: string, nickName: string) {   // Mandatory method by NamedPerson
        console.log("Hi")
    }
}

console.log(oldPerson)  //-> object
```

What happens once the interfaces get compiled
---------------------------------------------
1. Interfaces does not exist in native JavaScript. So when are compiled the interfaces disappears
2. The use of interfaces in TypeScript have the only purpose to find error during development time
