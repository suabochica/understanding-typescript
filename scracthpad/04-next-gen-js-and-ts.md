
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
The ES6 next generation features also consider improvements on the arrays and objects handling. The spread operator comes to the stage, to offer us a cleaner way to interact with arrays and objects.

Let's start to arrays, so check the next code:

```typescript
const hobbies = ['Hunt', 'Travel'];
const activeHobbies = ['Alchemia'];

activeHobbies.push(hobbies[0], hobbies[1]); // ['Alchemia', 'Hunt', 'Travel']
```

In this code we push the values of the `hobbies` array into the `activeHobbies` array. Keep in mind that we are pushing the values. With the spread operator we got the next presentation and the same result.

```typescript
const hobbies = ['Hunt', 'Travel'];
const activeHobbies = ['Alchemia', ...hobbies];
```

The spread operator in arrays let us handle the internal values of the array.

Let's review the spread operator in objects. For example:

````typescript
const person = {
  name: 'Max',
  age: 30
}

const copiedPerson = person;
```

In this code, we not have a copy of the `person` object, we get a reference in memory to the object. If we modify `copiedPerson` key-value, we also modify the `person` object. We can get a real copy using the spread operator:

```typescript
const person = {
  name: 'Max',
  age: 30
}

const copiedPerson = { ...person };
```

Since we created a new object here and just added to key value pairs we got a perfect copy of the original object and not just the pointer that points to the object in memory.

The Rest Parameters
-----------------
To evaluate the rest parameters, let's create an `add` function that will sum all the numbers that receives as parameters. The fact here is that we don't know how many parameters we will receive. The next snippet is an implementation of this scenario:

```typesecript
const add = (...numbers: number[]) => {
  return numbers.reduce((currentResult, currentValue) => {
    return currentResult + currentValue;
  }, 0)
}

const addedNumbers = add(0, 1, 1, 2, 3)
console.log(addedNumbers) // 7
```

In this code we use the rest parameters in `(...numbers: number[])`. His syntax is the same of the spread operator, so we have the be aware of the context to identify which feature we are using. The important thing with the rest operator is that it will put the parameters that we receive in an `array`. That is the reason why we can use the `reduce` function to apply our sum.

That's rest parameters. A really useful feature for accepting an unlimited amount of arguments. 

Array & Object Destructuring
--------------------
Destructuring is a cleaner feature to access to the values in an array or an object, Let's start with arrays.

Consider the next code, whose goal is get the values inside the array.

```javascript
const myHobbies = ["Cooking", "Reading", "Sports"];
const hobbyOne = myHobbies[0];
const hobbyTwo = myHobbies[1];

console.log(hobbyOne, hobbyTwo); // -> "Cooking", "Reading"
```

We access to the values of the array via the index. This is a verbose version. Instead, if we use destructuring we get:

```javascript
const myHobbies = ["Cooking", "Reading", "Sports"];
const [hobbyOne, hobbyTwo] = myHobbies;

console.log(hobbyOne, hobbyTwo); // -> "Cooking", "Reading"
```

Much cleaner now. We have a similar behavior with object. For example:

```javascript
const userData = {
	userName: "Sergio",
	age: 26
};
const {userName, age} = userData;

console.log(userName, age); // -> "Sergio", 26
```

Here we access to the property of the object via the key to get the value. By default, destructuring will create a variable with the name of the key in the object. You can use aliases to access to the object properties for avoid confusions between the key and the variable that will stores the value.

Wrap Up
--------------------------------
Now this is it for this module. Obviously modern JavaScript has a couple of other neat features as well. For example I'll cover classes in the class module and in general this is no JavaScript course.

I don't want to bore you with tons of JavaScript knowledge that doesn't really relate to typescript. I wanted to mention these specific features because it's good to know that typescript helps us use these features in a way that still runs in older browsers because that is something which you must never forget.

Your code gets compiled according the set up of your `tsconfig.json` file. If you set as `target` the `es6`, the code compiled will keep the syntax of used features. But, if you change it to `es5` the compiled filed will be longer and it will traspile the code to the respective standard. 

So that's an important thing to always keep in mind. TypeScript compiles your code not just from TypeScript only features to regular JavaScript but also from modern JavaScript to old JavaScript if you tell Typescript to do so.

### Useful Resources & Links
- [ES6 features suppoted by TS](http://kangax.github.io/compat-table/es6/)
