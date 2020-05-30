Section 01: Getting Started
================

Index
---------------------------------
1. Intro 
2. What Is TypeScript & Why Should You Use It?
3. Installing & Using TypeScript
4. TypeScript Advantages Overview
5. How To Get The Most Out Of The Course
6. Setting Up A Code Editor / IDE
7. The Course Project Set Up


What Is TypeScript & Why Should You Use It?
---------------------------------
To check what is TypeScript lets use the next diagram:

![image](../assets/s01-what-is-ts.png)

So, first of all TypeScript is a JavaScript/ES6 super set, whose most important feature is the introduction of strongly types. This means that TypeScript is a language building up on JavaScript that add new features and advantages. Second aspect, TypeScript can't be run in the browser, then the TypeScript features are compiled to JavaScript "workarounds", possible errors are thrown. This means that TypeScript have a compiler that we will review in the coming sections.

The TypeScript community has enable a [playground](www.typescriptlang.org/play/index.html) for get the equivalences between TypeScript and JavaScript. The invitation is make to check the link and start with your sniff in TypeScript.

Now, why should you use TypeScript. Lets check the next code sample:

```js
function add (num1, num2) {
    return num1 + num2;
}

console.log(add('2', '3')); // prints 23
```

Unfortunately, JavaScript is weak typed, and this feature expose us to unwanted behaviors at runtime, just like the previous example. Here the expected act is get the 5 as consequence of the arithmetic sum, but we get 23, because JavaScript interpret the parameters as strings and then apply string concatenation. So, to avoid this accidental behavior we should apply mitigation strategies like add a `if` check to the `add` function, then validate and sanitize the user input. However, this action makes that developers can still write invalid code! With TypeScript we are not exposed to these risks. 

Installing & Using TypeScript
---------------------------------
Let's review a simple case to check how to install TypeScript and then use it. First, let's define a markup with two inputs and the association to a script file:

```html
<html>
<head>
    <script type="text/javascript" src="exercises/javascript_add.js" defer></script>
</head>
<body>
    <input id="num1" type="number" value="" placeholder="Number 1"/>
    <input id="num2" type="number" value="" placeholder="Number 2"/>
    <button>Add!</button>
</body>
</html>
```

Now let's put the `add` function logic in the script, using the input values that the user will give us from the html:

```js
const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) => num1 + num2;

button.addEventListener("click", function() {
    console.log(add(input1.value, input2.value));
});
```

When we run this code, JavaScript will apply the string concatenation, because the `.value` method of the elements in the DOM always return strings. Therefore, we will get an unexpected result from the logic business perspective, since our goal is apply the arithmetic sum. Let's fix this script with pure JavaScript:

```js
const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) => {
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    } else {
        return +num1 + +num2;
    }
}

button.addEventListener("click", function() {
    console.log(add(input1.value, input2.value));
});
```

Now, we have a condition to validate the type of the inputs. If the condition is `false` we use the implicit cast `+num1` to convert the `string` in a `number`. This solution works, but it is overworked.

Time to install TypeScript and use it. First of all, it is required install Node.js to can use the `npm` package manager. Once installed `npm` we can run:

```
$ npm install -g typescript
```

This command will install the TypeScript compiler and all the necessary dependencies to start our development with this super set. Now lets create a `typescript-add.ts` file an let's implement the logic for the `add` function:

```ts
const button = document.querySelector("button");
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number): number {
    return num1 + num2;
}

button.addEventListener("click", function() {
    console.log(add(+input1.value, +input2.value));
});
```

> Note: This code just have sense on `.ts` files. If you put it in a `.js` file we will fall in a errors sequence

Much cleaner! Important thing here. First, when you install the TypeScript package your editor will use the compiler to share you several things about your current code. For this case, initially we get a compiler error for the `input1.value` parameter, saying that this value could be undefined and we are not considering that scenario. It is for that reason that we add the `!` in our DOM elements. With this syntax we are saying to the TypeScript compiler that this values always will exist.

Second we start to use Types! The `HTMLInputElement` in our DOM elements and the `number` in the parameters of the `add` function, are types that reinforce the legibility of the code. Finally, check that in the log line we use the implicit cast `+input1.value` to send a `number` to the `add` function and not a `string`. 

Now lets compile our file. For this sample we have to run:

```
$ tsc exercises/typescript-add.ts
```

This command will generate a `typescript-add.js` file, that is the compiled version of our `typescript-add.ts` file. We can sniff the contents of this file to check what was the work of the TypeScript compiler. The last thing we should do is update the script path in our HTML file. Now we can see an example created with TypeScript.

TypeScript Advantages Overview
---------------------------------
1. Install it through `npm -g i typescript`

How To Get The Most Out Of The Course
---------------------------------
1. Create a file with the `.ts` extension
2. Use the command `tsc file.ts` to compile your TS in JS

Setting Up A Code Editor / IDE
-------------------------------
1. Install a server with `npm i lite-server`
2. Add a script to start the lite server
3. Use `tsc --init` to create a `tsconfig.json`

The Course Project Set Up
---------------------------------
