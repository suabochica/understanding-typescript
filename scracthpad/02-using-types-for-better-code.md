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

```js
function add(num1, num2) => num1 + num2;

const number1 = '5';
const number2 = 3;

const result = add(number1, number2);
console.log(result) // prints 53
```

Let's add types to this version;


```ts
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

```js
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


Tuples
------
```javascript
let address: [string, number] = ["Cooking", 99];
```

1. For TS the order element is important

Enum
----
```javascript

enum Color {
	Gray,
	Green,
	Blue
}

let myColor:Color = myColor.Green

console.log(myColor)// -> 1
```

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
