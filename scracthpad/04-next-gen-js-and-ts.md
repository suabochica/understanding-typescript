
Section 4: Next Generation JavaScript & TypeScript
=============================

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

Module Introduction
--------------------------------
2. `let` and `const`

Let and Const
-------------
1. The difference between `var` and `let` is the scope of the variable
2. `const` just allow assign the variable once

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
