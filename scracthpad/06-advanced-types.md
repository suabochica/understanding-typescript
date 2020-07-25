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
Index properties is a feature that is under the category of features that help us to write flexible code. This feature allow us to create objects regarding the properties they might hold. Letś review an example where you will handle error messages for the login validation of an user:

```typescript
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!'
}
```

Notice the notation `[prop:string]` to define the index property. With this body in the interface we are saying that we are expecting a key of type `string` with a value that also will be a `string`. This definition is used in the `erroBag` variable. Here we are defining two possible error message, one for a invalid email, and, other for a invalid username. According the index (i.e email, username) we will use their respective error message.

So this is now such a error back we could build with the help of our container which gives us this extra flexibility that we don't need to know in advance which property names we want to use and how many properties we need.

Function Overloads
-----------------------------
Function overloads is a TypeScript feature that allow you to handle the possible scenarios of a flexible function. Let's recall the `add` function with `Combinable` type:

```typescript
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string'|| b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add('Edward','Elric');
```


When you check the type of the `result` variable we get that his type is `Combinable`. Sort of, this is true, but behind of scenes we expect that the `result` variable be a `string` type. With this current implementation we have the next limitation: If we want to use an `string` method like `split`, the TypeScript's compiler will raise an error saying that the `Combinable` type has not a `split` method.

To solve this error we can use function overloads to specify the possible scenarios of our functions according the parameters types. Below we show the syntax for this feature:

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string'|| b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}

const result = add('Edward','Elric');
result.split(' ');
```

Now we can use the `split` method on our variable `result`. It is important to highlight, that the function overloads is a TypeScript's pure feature, so this code is not traspiled to JavaScript, an is a feature that is just able in development phase.

Optional Chaining
-----------------------------
Let me introduce a very neat feature, optional chaining. Optional chaining is an operator that helps us to safely access to nested properties and nested objects in a object data.

For example:

```typescript
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    // job: { title: 'CEO', description: 'My own company' }
}

console.log(fetchedUserData.job && fetchedUserData.job.title)
```

The `fetchedUserData` is a object mock of a response object from the back-end. Sometimes, these responses can skip on of the properties. For this case, the `job` property was missing. This scenario make us to do a validation in the JavaScript code to have guarantees over the property existence, such as we specify in the log line.

With the optional changing operator, we got a short syntax and a legible code, as show next:

```typescript
console.log(fetchedUserData?.job?.title)
```

The property in front of the question mark is undefined it will not access the thing they're after and therefore will not flow a runtime error but instead it will just not continue. So behind the scenes does is basically compile to if check which checks whether Dad exists before it tries to access this.

Nullish Coalescing
-----------------------------
In JavaScript is common deal with `null` values. The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise returns its left-hand side operand. For example:

```typescript
const userInput = '';
const storedData = userInput ?? 'DEFAULT';

console.log(storedData) // Prints and empty string
```

For this case, if we change the `userInput` value to null we get the `'DEFAULT'` message.

Contrary to the logical OR (||) operator, the left operand is returned if it is a *falsy* value which is not `null` or `undefined`. In other words, if you use || to provide some default value to another variable foo, you may encounter unexpected behaviors if you consider some falsy values as usable (eg. '' or 0).

```typescript
const userInput = '';
const storedData = userInput || 'DEFAULT';

console.log(storedData) // Prints DEFAULT
```

Wrap Up
-----------------------------
We had a look at some advanced typescript features that can come in handy in applications and like with all the other concepts you already learn about.

Of course we will have a project where we see many of these things in action so that you don't just learn them here in theory but you also see them applied in a real project.

Nonetheless I hope the concepts taught here are pretty clear and dairy use as clear as well and why you might want to use some of these patterns because features like intersection types function overloads type guards in various variations with different approaches to find out which type something has that discriminated union's pattern ends on.

These are all interesting patterns said can help you improve your code your code quality and make your intentions clearer.

Resources
-----------------------------
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

