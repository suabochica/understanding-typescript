
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
1. Check ES6 for more details

Default Parameters
-------------------------
1. Check the next code:

```javascript
const greet = () => {
	console.log("Hello!");
}
greet();

const greetFriend = friend => console.log(friend);
greetFriend ("Dario")
```

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
