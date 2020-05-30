Section 2: Using types for better code
======================================

Introduction
------------
1. Learn Types: What are?, How use them?. Which types exists?

Type basics
-----------
1. JS types: String, Boolean, Number. But have dynamic types
2. TS forces you to be explicit with the variables definition

Assign types explicitly
-----------------------
```javascript
let myRealAge: number;

myRealAge = 27;
```

Arrays and types
----------------
```javascript
let hobbies = ["Cooking", "Sports"];
```

1. TS assumes that the array will be just of 'Strings'.
2. The best practice will:
```javascript
let hobbies: string = ["Cooking", "Sports"];
```

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