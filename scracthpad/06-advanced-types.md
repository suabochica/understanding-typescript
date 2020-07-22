Section 06: Namespaces and Modules
==================================
It is time to moving forward and review the advanced features that TypeScript offers on Types. The next image summarized the contents of this section:

![Advanced Types](../assets/s06-advanced-types.png "Advanced Types")


Index
-----------------------------
1. Intersection Types
2. More on Type Guards
3. Discriminated Unions
4. Type Casting
5. Index Properties
6. Function Overloads
7. Optional Chaining
8. Nullish Coalescing
9. Wrap Up
10. Resources

Intersection Types
-----------------------------
Intersection types allow us to combine our types. Please check the snippet below:

```typescript
type Admin = {
    name: string;
    privelges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const employee: ElevatedEmployee = {
    name: 'Edward',
    privelges: ['alchemy'],
    startDate: new Date(),
}
```

Notice that the `ElevatedEmployee` is the combined type of `Admin` and `Employee`, and the key operator for intersect type is the ampersand `&`. With this definition, we can create an object with the combined type as is `employee`. We could get the same result using interfaces, as shown next:

```typescript
interface Admin {
    name: string;
    privelges: string[];
}

interface Employee = {
    name: string;
    startDate: Date;
}

interface ElevatedEmployee extends Admin, Employee {};

const employee: ElevatedEmployee = {
    name: 'Edward',
    privelges: ['alchemy'],
    startDate: new Date(),
}
```

However, this syntax is a little bit longer, and it is common use the `type` version. So, for object types, intersection types it is simply the combination of these object properties. This features can sometimes be useful. You will not use the all the time but you definitely can encounter situations where you can express something in a simpler way by using intersection types.

More on Type Guards
-----------------------------
Type guards, is a condition to check if an specific property over a type is true, to then execute a default logic. Keep in mind that type guards are useful when you are using union types. So, let's check an example: 

```typescript
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string'|| b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}
```

In the last code the type guard is in the `if` statement. This condition validate if the parameters are `string` types using the JavaScript `typeof` key word to concatenate it instead of execute the sum. Here we apply the type guard over JavaScript default types. Now, let's check how use them in custom types:

```typescript
type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);

    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInformation(employee);
```

Again, the type guard is in the `if` statements. However, here we can't use the `typeof` because we will apply the type guard over a custom class. For this case, we should use the `in` syntax of JavaScript to validate if the property exist in the object. If the condition is true, then we execute a concrete logic.

Finally let's review how to apply type guards on classes. Pay attention to the next code:

```typescript
class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1);
useVehicle(v2);
```

Notice the use of the `instanceof` JavaScript keyword to validate if the current object belongs to the particular class. Keep in mind that for the three type guards sample we use vanilla JavaScript features. This means that we can't apply a type guard directly on interfaces because there are a feature for TypeScript development stage.

Discriminated Unions
-----------------------------
Discriminated unions is a pattern that help us to implement type guard easier on objects and even interfaces. Check the next snippet:

```typescript
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed: number;

    switch (animal.type){
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving with speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});
```

Notice that the type guard is defined via `switch/case` statement over the possible values for the `animal.type` property. The pattern consist in set a property type that we know it will exist and use it to check which type of object we are working with. This is a discriminated union because we have one common property in every object that makes our union object easier to identify. We can use this property that describes this object in our check to have type safety and understand which properties are available for such an object and which properties are not.

Therefore it is a very useful pattern when working with objects and union types.

Type Casting
-----------------------------
Type casting is a feature that helps you to tell TypeScript that some value is of a specific type when TypeScript is no able to detect it on its own. Let's explain the feature with a example using the next DOM elements:

```html
<body>
    <p></p>
    <p id="message-output"></p>
    <input id="user-input" type= "text"></input>
</body>
```

Mark up ready, now let's access to this elements in our `app.ts` file:

```typescript
const paragraphElement = document.querySelector('p'); // HTMLParagraphElement | null
const paragraphIdElement = document.getElementById('message-output'); // HTMLElement | null
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!
const userInputElement = document.getElementById('user-input')! as HTMLInputElement

userInputElement.value = 'Hi there!';
```

To illustrate the type cast concept we set three elements in the mark up: First, a `paragraphElement` that is identified by TypeScript as a `HTMLParagraphElement` type. For this case the TypeScript compiler execute the type inference properly. Second, we got a `paragraphIdElement`, that is identified by TypeScript as a `HTMLElement`. We will start to have some issues over this element if we want to interact with it, because `HTMLElement` is a generic type. In the last element, we use type cast to specify that the element is of `HTMLInputElement` type, and not as `HTMLElement` type, that will be the type defined by TypeScript without the type cast. 

For this example, if we skip the `HTMLInputElement` type cast, we will get errors on the last line of the snippet, because for a `HTMLElement` the `value` property isn't exist.

Lastly, as you can see we have two syntax to specify the type casting:

```typescript
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!
```

and,

```typescript
const userInputElement = document.getElementById('user-input')! as HTMLInputElement
```

Both get the same result, and the choice is about the context. If you are in a React project is recommendable use the second syntax, to avoid confusion with JSX. On the contrary, go ahead with the first version.

Index Properties
-----------------------------
Function Overloads
-----------------------------
Optional Chaining
-----------------------------
Nullish Coalescing
-----------------------------
Wrap Up
-----------------------------
Resources
-----------------------------

Intro to namespace
-----------------------------
1. Check the next code:

```javascript

namespace myMath() {
	const PI = 3.14;

	export function calculateCircumference(diameter: number) {
		return diameter * PI;
	}

	export function calculateRectangle(width: number, length:number) {
		return width * length;
	}
}

```

2. The namespace allow us split our code avoiding the use of global scope. The TS compiler use JS IIFE to split the code blocks


Namespaces and Multiple Files
-----------------------------
1. We can split our `myMath` namespace in two files `circleMath.ts` and `rectangleMath.ts`, and add the respective calculate functions.
2. If we run the new structure the browser will throw the error `Uncaught Reference`. To solve this issue we have three possibilities:
    1. Import the  `circleMath.js` and the `rectangleMath.js` files in the `index.html`
    2. Use the TypeScript option compiler `-- outFile {{outputsFile.js}} {{inputFile*.ts}}`
    3. Please check the Namespace Import section

Namespace Imports
-----------------
1. TypeScript has his own syntax to import namespace. The next code shows this syntax:

```javascript

/// <reference path="circleMath.ts />"
/// <reference path="rectangleMath.ts />"

```

More on Namespaces
------------------
1. Nested Namespaces
2. Set namespace aliases

Limitations Namespaces
----------------------
1. Namespaces are not declarative.
2. For small projects use Namespaces. For big projects use Modules.

Modules
-------
1. For use modules, you should change your project structure to something like:

```
app
|-- modules
|   |-- moduleFileOne.ts
|   |-- moduleFileTwo.ts
|-- app.ts
```

2. In the app.ts you will `import` the element that are `export` in the modules files.

Loading Modules
---------------
1. The module dependency management in JavaScript has a long history. Please check the article [JavaScript Module System Shutdown](https://auth0.com/blog/javascript-module-systems-showdown/)
2. For this learning you will use the *All-in-one solution: SystemJS*
    1. Install it with `npm install --save systemjs`
    2. Add the respective configuration in the `index.html` file

Importing and Exporting Modules
-------------------------------
1. Bear in mind that first you have to export and then you import. Then follow the next syntax:

```javascript
// rectangle.ts file
export function calculateRectangle(width: number, length:number) {
	return width * length;
}

```

```javascript
// app.ts file
import {calculateRectangle} from 'path/to/rectangle.ts'

console.log(calculateRectangle(20,10))
```

2. Alias are enable in module imports

```javascript
// app.ts file
import * as Rectangle from 'path/to/rectangle.ts'
console.log(Rectangle.calculateRectangle(20,10))

```

3. Export default syntax

```javascript
// rectangle.ts file
export default function calculateRectangle(width: number, length:number) {
	return width * length;
}

```

```javascript
// app.ts file
import calcRectangle from 'path/to/rectangle.ts'

console.log(calcRectangle(20,10))
```

Module Resolution
-----------------
1. Import with relative paths
2. Import with absolute paths. Common use whe you use TypeScript with Angular
3. Automatic resolution of `.ts` files

Namespaces vs Modules
---------------------

Namespaces
- Organize application with JavaScript Objects
- Can be split up over multiple files
- No module loader required
- Dependencies get difficult to manage in bigger applications

Modules
- Organize application with real Modules
- Can be split up over multiple files
- Module loader required
- Explicit dependency declaration
