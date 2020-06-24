
Section 4: Next Generation JavaScript & TypeScript
=============================

Now did we have a good understanding of the basic types good features and what typescript adds and we also understand how to typescript compiler works.

Let's have a look at what else typescript has to offer specifically when it comes to modern JavaScript syntax.

Index
------------------------------

1. Module Introduction
2. `let` and `const`
3. Arrow Functions
4. Default Parameters
5. The Spread Operator
6. Rest Parameters
7. Array & Object Destructuring
8. How Code Gets Compiled

Let and Const
-------------
`let` and `const` are keywords introduced in ES6 to improve the variable declarations. Let's start explaining `const` through the next snippet

```typescript
const userName = "Edward";

userName = "Alphonse"; // Throw an error
```

If you run this code in the browser the console will throw an error because `const` just allow assign the variable once. It means that you can't change his value.

Now, let's review `let` which is very similar to `var`. First of all, `let` variable can change his values after be declared. For example:

```typescript
let age = 30

age = 29;
```

For other side, we have to talk about the relation between `let` and `var` keywords with scopes. Please review the next snippet.

```typescript
function add(a: number, b: number) {
  let result;
  
  result = a + b;
  
  return result;
}

console.log(result) // Throw an error
```

If we run this code, the browser will indicates that the `result` variable is out of the _scope_ of the add functions. A block scope means that a variable is always available in the block in which you define it or in any lower blocks. We create scopes in JavaScript with the curly braces `{}`. 

This is the difference between `var`, `let` and `const`. For `var` just exist the global scope, whilst for `let` and `const` we have the block scope in a function, the `if`-`for` statements and the code inside the `{}`.

Arrow Functions
--------------
Arrow functions are a shorter syntax for function declarations in JavaScript. For this example:

```typescript
function add (a: number, b: number): number {
  return a + b;
}
```

The arrow function version is:

```typescript
add = (a: number, b:number): number => a + b;
```

Now, we can then retake take advantage of this very short and concise syntax. So these are some of the variations of Arrow functions and of course we already used arrow functions thus far in the course.

Default Function Parameters
-------------------------
A nice feature included in ES6 is the default function parameters to allow default values in the parameters of the functions. For example:

```typescript
add = (a: number, b:number = 1): number => a + b;

console.log(add(5)) // prints 6
```

In the last snippet we set `1` as a default parameter for `b`, and the log prints the expected behavior. Eventually we can override the default value. However, exist an specific scenario where the default parameters is not working. Check the next snippet:

```typescript
add = (a: number = 1, b:number): number => a + b;

console.log(add(5)) // We got a error
```

JavaScript is not able to identify the which parameter skip. Then, the sort in the default parameters is relevant. Instead it simply adheres to the order and therefore you should set defaults from the right. So make sure that the parameters for what you don't accept default arguments come first before your default parameters.

The Spread Operator (`...`)
---------------------------
1. Operator used to use arrays as lists.

The Rest Parameters
-----------------
1. Operator used to use list as arrays.

Array & Object Destructuring
--------------------
1. Check the next code:
```javascript
const myHobbies = ["Cooking", "Reading", "Sports"];
const [hobbyOne, hobbyTwo] = myHobbies;

console.log(hobbyOne, hobbyTwo); // -> "Cooking", "Reading"
```

1. Check the next code:
```javascript
const userData = {
	userName: "Sergio",
	age: 26
};
const {userName, age} = userData;

console.log(userName, age); // -> "Sergio", 27
```
2. You can use aliases to access to the object properties

How Code Gets Compiled
--------------

Wrap Up
--------------------------------

### Useful Resources & Links
- [ES6 features suppoted by TS](http://kangax.github.io/compat-table/es6/)
