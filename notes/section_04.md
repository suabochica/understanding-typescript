
Section 4: TypeScript and ES6
=============================

ES6 & TypeScript Compatibility
------------------------------
1. [ES6 features suppoted by TS](http://kangax.github.io/compat-table/es6/)

Let and Const
-------------
1. The difference between `var` and `let` is the scope of the variable
2. `const` just allow assing the variabe once

Block Scope
-----------
1. Scopes help us to set the space where the variable can be accessible

Arrow Function
--------------
1. Check ES6 for more details

Arrow Function variatons
------------------------
1. Check the next code:
```javascript
	const greet = () => {
		console.log("Hello!");
	}
	greet();
	
	cons greetFriend = friend => console.log(friend);
	greetFriend ("Dario")
```

Functions and default parameters
--------------------------------
1. Check the next code:
```javascript
	const coutdown = (start: number = 10): void => {
		while (start > 0) {
			start--;
		}
		console.log("Done", start);
	}
```
2. The start parameter is assigned to 10 by default

The Spread Operator (`...`)
---------------------------
1. Operator used to use arrays as lists.

The Rest Operator
-----------------
1. Operator used to use list as arrays.

Destructuring Arrays
--------------------
1. Check the next code:
```javascript
	const myHobbies = ["Cooking", "Reading", "Sports"];
	const [hobbyOne, hobbyTwo] = myHobbies;

	console.log(hobbyOne, hobbyTwo); // -> "Cooking", "Reading"
```

Destructuring Objects
---------------------
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


Template literals (`Extending strings`)
---------------------------------------
1. Check the next code:

```javascript
const userName = "Sergio";
const greeting = `This is a heading! I'm ${userName}, this is cool`;

console.log(grereting); // -> "This is a heading! I'm Sergio, this is cool"

```

Other features
--------------
1. Symbols
2. Iterators
3. Generators