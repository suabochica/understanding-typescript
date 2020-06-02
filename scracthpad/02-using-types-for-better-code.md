Section 2: TypeScript Basics & Basic Types
======================================

Index
------------
1. Using Types
2. TypeScript Types vs JavaScript Types
3. Working with Numbers, String & Booleans
4. Type Assignment & Type Inference
5. Object Types
6. Nested Object & Types
7. Arrays Types
8. Working with Tuples
9. Working with Enums
10. The Any Types
11. Union Types
12. Literal Types
13. Type Aliases & Custom Types
14. Function Return Types & Void
15. Function as Types
16. The Unknown & the Never Types


Using Types
-----------
TypeScript provides many types to JavaScript, but JavaScript itself also knows some data types. The following diagram summarize the core types of JavaScript.

![image](../assets/s02-core-types.png)

Not much to add, just keep in mind that the `Truthy` and `Falsy` values are not boolean types.

Good, now let's go back to our `add` function example in his JavaScript version:

```javascript
function add(num1, num2) => num1 + num2;

const number1 = '5';
const number2 = 3;

const result = add(number1, number2);
console.log(result) // prints 53
```

Let's add types to this version;


```typescript
function add(num1: number, num2: number) => num1 + num2;

const number1 = '5';
const number2 = 3;

const result = add(number1, number2);
console.log(result); // prints 53
```

Notice that the `number1` data type is still a `string`. With this variant, TypeScript will warning us that the `add` function is expecting a `number` type and we are sending a `string` type. This warning is showed just during development. That means, *TypeScript's type system only help you before the code gets compiled*. We can go ahead and compile the code with this error, the TypeScript compiler will generate the respective `js` file anyway, but, you will get an error message form the compiler.

To fix the compiler error just follow the warning message, and pass a `number` type to the `add` function.

TypeScript Types vs JavaScript Types
-----------------------
We also know that there is a `number` type in JavaScript via the built in `typeof` operator. The `typeof` operator is not specified to TypeScript, is supported in a keyword by JavaScript and we can use it the get the type of certain values. We use this operator to create a pure JavaScript version of the `add` function:

```javascript
function add(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error ('Incorrect input!'); // Print the error
    }
    return num1 + num2;
} 
const number1 = '5';
const number2 = 3;

const result = add(number1, number2);
console.log(result);
```

If we run the last code we get the `Incorrect input!` message as expected. However this approach has downsides. Sometimes it is the right thing to do, sometimes you only can validate certain inputs in runtime. The main downside here is that we are checking something which we actually can avoid during development with TypeScript, and here we see the difference between JavaScript and TypeScript when it comes to types.

JavaScript is *dynamically typed*, which means it is perfectly fine that we have a variable which initially might hold a `number` where we later assign a `string` to it. That is why we have the `typeof` operator so that we can check the current type of something at runtime.

In the other hand, TypeScript is *statically typed*, which means we define the types of variables and parameters end on during development. They do not suddenly change during runtime. Of course, TypeScript is compiled to JavaScript, so theoretically it could change the types of a variable at runtime, but we will previously notified via the TypeScript compiler.

> Note: In TypeScript, you work with types like `string` or `number`. It is `string` and `number` (etc.), NOT `String`, `Number` (etc.), **the core primitive types in TypeScript are all lowercase!**


Working with Numbers, String & Booleans
----------------
In our JavaScript version of the `add` function we use String, Booleans and Number data types. Let's include some parameters to the `add` function to explicitly define the print of the addition result via a boolean.

```javascript
function add(num1: number, num2: number, canShowResult: boolean, phrase: string) {
    const result: number = num1 + num2;

    if (canShowResult) {
        console.log(phrase, result);
    } else {
        return result;
    }

} 

const number1 = 5;
const number2 = 3;
const canShowResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, canShowResult, resultPhrase);
```

This version receive as parameter a `boolean` to set a condition to print the result in the browser console, and a phrase `string` to add a message in the console log. Notice that the `num1` and `num2` are not passed directly in the console log, because for this case JavaScript will apply type coercion an instead of print the result as an addition it will be concatenate strings:

Type Assignment & Type Inference
--------------------------------
So we are using the core types and until here, in the list of parameters of the function we are always explicitly assigning to types with a colon (e.g `num1: number`). The types works as special keywords of a syntax which is added by TypeScript. It is not part of the compile JavaScript code.

The special keyword are interpreted by the TypeScript compiler, and there are called explicit type assignment. Let's check the next code: 

```typescript
let number1: number;
number1 = 5;
```

Here we define a variable but we are not initialize it with some value. I know that this case is redundant but, it works to explain the type assignment. After define the variable we give a value to the variable that is `5`. With this scenario TypeScript compiler won't throw warning messages because we are using a `number` as expected. If we change the value of 5 to `'Hello'` the TypeScript compiler will throw us an error, we are expecting a `number`, not a `string`;

Now, let's check the next line, to explain the type inference feature of the TypeScript compiler:

```typescript
const number1 = 5;
```

Here, we initialize `number1` with the `5` value. How the variable is initialize with a number, the TypeScript compiler will *infer* that the type of the variable `number1` will a `number`. For this case it is redundant use the type assignment an it is consider a bad practice.

In brief, if the variable is unassigned, consider use the type assignment, if not let that the TypeScript compiler use his type inference feature.


Object Types
--------------------------------
Following with the core types diagram, lets add the Object Type:

![image](../assets/s02-core-types-object.png)

We know that objects in JavaScript are declared with curly braces that inside have key value pairs. These values would all be treated as object types in TypeScript. TypeScript offer us the possibility to define object with specific types.

Let's check the next code sample:


```typescript
const person: {
    name: string;
    age: number;
} = {
    name: 'Edward',
    age: 16,
}

console.log(person.name)
```

Here we declared a `person` object with two properties: `name` of type `string` and `age` of type `number`. If in the assignation of the values, if we change the value of the age from `16` to `true`, the compiler will throw an error saying that the expect type of the `age` key should be a `number`.

> **Note:** Could be confusing the syntax for the type assignment and the key value pairs of the object because both use the colon as separator of the elements. The key distinction is that when we use type assignment the line ends with a semicolon `;` and the key value pairs ends with a comma `,`.

For this case, we use the type assignment that offer TypeScript, but with this version we could be redundant. The next code is a clean version of our last snippet:


```typescript
const person {
    name: 'Edward',
    age: 16,
}

console.log(person.name)
```

We got the same results and take advantage of the type inference feature of the TypeScript compiler. Also, keep in mind that if we change the log line to `console.log(person.nickname)` the compiler will throw a message indicating that we are trying to access to a property of the object that not exist.

Nested Object & Types
--------------------------------
Of course object types can also be created for **nested objects**.

Let's say you have this JavaScript **object**:

```typescript
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!'
  }
}
```

This would be the **type** of such an object:

```typescript
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```

So you have an object type in an object type so to say.


The "Any" type
--------------
1. The `any` type is the most flexible type in TS
2. Tip: you should avoid the use of `any` type

Understanding the created JavaScript code
-----------------------------------------
1. The types are missing the TS is compiled in JS
2. TS job is make sure you wouldn't assign anything wrong

Using types in functions
------------------------
1. You can apply types on the function's return value
2. You can apply types on the function's arguments
3. You can use the function `void` type when the function doesn't return anything

Function as types
-----------------
1. Check the next example:
```javascript
function sayHello(): void {
	console.log("Hello");
}

function multiply(valueOne: number, valueTwo: number): number {
	return valueOne * valueTwo;
}

let myMultiply = sayHello;

myMultiply = multiply;
console.log(myMultiply(5,2)); // -> Hello, 10
```

2. You can notice that the variable `myMultiply` change from `void` to `number`. to avoid that use:
```javascript
let myMultiply: (a: number, b: number) => number;
```

Object and types
----------------
1. To apply the explicit type principle in objects, you have to use the next syntax:
```javascript
let userData: {name: string, age: number} = {
	name: "Sergio"
	"age" "26"
}
```

Creating custom types with aliases
---------------------------------
1. Use the next syntax:
```javascript
type CustomType = {arrayType: number[], functionType: (all: boolean) => number[]}

// then...

let complex = CustomType = {arrayType: [10, 20], functionType: function (all: boolean): number [] {return this.arrayType}}
```
2. The main advantage of use aliases to custom types is flexibility.

Allowing multiple types with Union Types
----------------------------------------
1. Allow us to increase the number of types for a variable
```javascript
let myAge: number | string;

myAge = 27;  	// ✔
myAge = "27";	// ✔
myAge = true;	// ✘
```

Checking types during runtime
-----------------------------
1. Use the next syntax:
```javascript
if (typeof == "type")
	// Do something
```

The `never` type
----------------
1. Type used when a function never returns a value

The `null` type
---------------
1. Is used with union types, and require add a `strictNullChecks` configuration in the `tsconfig.json`
