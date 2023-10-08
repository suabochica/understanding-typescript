Third party libraries and typescript
===============================================

In modern web development we typically also work with third party libraries. We don't write all the code of our projects on our own. Instead typically we utilize third party libraries so that we don't always have to reinvent the wheel on our own but can add certain functionalities to our projects and then just focus on our core business logic.

Now in this module we will have a look at third party libraries and how you can add them to your typescript project. 

Specifically we'll have a look at two types of libraries and what working with them in a typescript project means we'll have a look at **normal libraries** which you could use in regular jobs good projects as well and you will learn how you can use them in typescript and get the most out of them. But then we will also have a look at some **typescript specific libraries**. The difference will be that these are libraries that really utilize and embrace certain types of features to give you a brand new way of working with them to give you a certain functionalities. You can't build like this with vanilla javascript so let's have a look at both.

Index
-----------------------------------------

1. Using javascript libraries with typescript
2. Using declare as a last resort
3. No types needed: class transformer
4. Typescript embracing: class validator

Using javascript libraries with typescript
-----------------------------------------
Let's use the lodash library to illustrate how use JavaScript libraries in our project behind webpack. First of all, run:

```
npm i --save lodash
```

Once installed, and verified that the package.json file was update, in a `app.ts` file let's consume the library. For example:

```typescript
import _ from 'lodash'_

console.log(_.shuffle([1, 2, 3]));
```

`shuffle` is a method that you can check in the lodash's documentation. But with this setup we will get an error after run the webpack server: `Could not find a diclaration file for module 'lodash'`. The proble here is that TypeScript doesn't understand what method lodash exports. That is why it can't find the module. A quick fix will update the next property in the `tsconfig.json` file:

```json
  "noEmitOnError" : false,
```

Then, the server will up, an we can verify in the console tab that the log is working, but, the error is still there. That proves that the code in the `app.ts` is right, but TypeScript setup is wrong. That's the scenario we want to replicate, use a JavaScript library in a TypeScript project. 

So, to solve the TypeScript setup for JavaScript libraries without type definitions, we have to install and additional package, that will translate the JavaScript library for TypeScript projects, offering the type definitions that TypeScript expects. For this case we should run:

```
npm i --save-dev @types/lodash
```

Once installed this package, the error disappear automatically. The `@types` is a package that offer the types definitions for the most popular JavaScript library. This package have a lot of `*.d.ts` where the type definitions of an specific library are exported. So, if you want to use `jquery` in TypeScript you will have to install the `@types/jquery` package. So that is how you can work with types and vanilla JavaScript libraries.

Using declare as a last resort
-----------------------------------------

Another case to guarantee the coexistence between JavaScript and TypeScript is when you set global variables for the window object. For example, imagine that you have the next `index.html` file:

```html
<html>
<head>
  ...
</head>
<body>
  ...
  <script>
    var GLOBAL = 'This is set'
  </script>
</body>
</html>
```

And, you want to consume this variables in the `app.ts` file:

```typescript
import _ from 'lodash'_

console.log(GLOBAL);
console.log(_.shuffle([1, 2, 3]));
```

If you run the ts watcher, you will get the next error: 'Cannot find name GLOBAL'. To fix this scenario, TypeScript offer a declaration syntax like the next one:


```typescript
import _ from 'lodash'_

declare var GLOBAL: string;

console.log(GLOBAL);
console.log(_.shuffle([1, 2, 3]));
```

This way we are telling to TypeScript that the `GLOBAL` variables of JavaScript exists.

No types needed: class transformer
-----------------------------------------
To understand the use of the `class-transformer` package of the wrote in vanilla JavaScript, let's create an scenarion of a product with a title and a price, as shown below:

```typescript
// product.model.ts
export class Product {
  title: string;
  price: number;
  
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
  
  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
```

Let's consume this class in the `app.ts` file, where we will take an array of products, and, we will `map` them to the `Product` class to enable the `getInformation` method. Next code is an example to get this.

```typescript
// app.ts
import { Product } from './product.model';

const products = [
  { title: 'A Carpet', price: 29.00 },
  { title: 'A Book, price: 10.00 },
]

const loadedProducts = products.map(product => {
  return new Product(product.title, product.price);
});

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
```

Now let's replicate the same result, but with help of the `class-transformer` package of TypeScript. First of all, let's install the module:

```
npm install class-transformer --save
```

Then, a shim is required, so let's run:

```
npm install reflect-metadata --save
```

Good, now we can use this package in the `app.ts` file, as show the next snippet:

```typescript
// app.ts
import "reflect-metadata"
import { plainToClass } from "class-transformer"
import { Product } from './product.model';


const products = [
  { title: 'A Carpet', price: 29.00 },
  { title: 'A Book, price: 10.00 },
]

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
```

Here the `plainToClass` is a method that we can access from `reflect-metadata` where we pass the class that we want to apply over a JSON data. This way, our products get the `getInformation` method via the use of the `reflect-metadata` package. 

For this case, we are using a package and the amazing thing about this package is that it works that well here because it builds up on TypeScript.

Typescript embracing: class validator
-----------------------------------------

Now let's integrate the `class-validator` package of TypeScript stack, that offer us a huge catalog of decorator to apply them over our class properties. First, let's install the package with `npm`:

```
npm install class-validator --save
```

Now, in the `product.model.ts` file let's import the next decorators from the `class-validator` package: `IsNotEmpty`, `IsNumber` and `IsPositive`. Then, let's use them as decorator of the Product class properties as show the next snippet.

```typescript
// product.model.ts
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;
  
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
  
  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
```

> Note: Remember enable the `experimentalDecorators` property in the `tsconfig.json` file to allow the use of decorators.

Finally, to validate that the decorators are working on, we will create and invalid Product, and with help of the `validate` function from `class-validate` let's pass the invalid product and we will log the errors on that instance of the product. Keep in mind that the `validate` product return a promise, so we have to use the `.then` method of the Promise API. Please check the next code:

```typescript
// app.ts
import "reflect-metadata"
import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { Product } from './product.model';


const products = [
  { title: 'A Carpet', price: 29.00 },
  { title: 'A Book, price: 10.00 },
]

const newProd = new Product('', -5,99);
validate(newProd).then(error => {
  if (errors.length > 0) {
    console.log('Validation Errors:', errors);
  } else {
    console.log(newProd.getInformation());
  }
});

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
```

If you run the project, you will get the error of empty string and negative number in the console tab of the browser. These error are informative, the not will break the program, but they will give us the tools to write a better code.

This is how easily you can add quite powerful validation to your projects with this decorator based approach related to what we did earlier in the decorators module.

But as I mentioned multiple times more elaborate with a bunch of built in rules and you can learn all about that of course in the docs of this package and without reinventing the wheel.

So that a class validate or package really is a powerful package you should be aware of if you're building bigger projects with typescript.

Wrap up
-----------------------------------------
The idea is that you get a feeling for two important things.

The first thing is that with TypeScript you can use regular JavaScript packages like `lodash` without issues. You might get errors initially. Keep in mind that technically it works though. But you can also work around these compilation errors then by importing the right types. The right translation from JavaScript to TypeScript in the end and such translation packages exist for all major and popular and even a lot of small JavaScript libraries.

You also might be working with JavaScript libraries which have these translation files. These `d.ts` files built in already. They are of course you don't need to install such translations thereafter. Besides these vanilla JavaScript libraries which might need translations you also might have libraries like `class-transformer` which work fine in vanilla JavaScript in modern vanilla JavaScript at least where you also have classes but which all the work without any extra translations and types of projects.

And then we have packages like `class-validator` they really embrace typescript specific features and give you a brand new way of thinking about your project and of solving certain problems. In this case here by utilizing decorators knowing all these things is super important and gives you all the flexibility you need for your future projects.

Takeaways
-----------------------------------------
In a TypeScript project you will need third-party package as jQuery. How to combine JavaScript libraries with TypeScript?

- Installing a third-party library
  1. Install jQuery `npm install --save jquery`

- Importing the Library
  1. Use SystemJS to manage the libraries dependencies
  2. Inside the `index.html` file use the `map` property of SystemJS and add the next key: `jQuery: node_modules/jquery/dist/jquery.min.js`
  3. This configuration allow you to use jQuery but the TypeScript Compiler throws the error `Cannot find name $`

- Translating JavaScript to TypeScript with TypeScript Definition Files
  1. A *Definition File* basically is a bridge between JavaScript libraries and TypeScript
  2. The file extension is `d.ts`

- Option 1: Manually download TypeScript Definition Files
  1. Please check [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) github project
  2. Find the package that you need
  3. Copy the raw file a paste it in a file inside your local project
  4. It is not necessary use an import

- Option 2: Managing TypeScript Definition Files with the "typings" Package
  1. Typings (Deprecated) is the TypeScript Definition Manager like NPM
  2. Install typings globally with: `npm install -g typings`
  3. Instal the desired package with: `typings install dt~jquery --global --save`
  4. This command wil create a `/typings` folder with the definition file and a `typing.json` file with the dependencies
  5. It is not necessary use an import

- Easier Type Management with TypeScript 2.0
  1. A awesome new feature that is integrated with `npm`
  2. Use the next command: `npm install --save-dev @types/dt~jquery`
  3. This command will create the `node_modules/@types` folder where will store the TypeScript Definition Files
  4. Also, if you check the `package.json` file you can see the definition file in the `devDependencies` property
  5. You got all your third-party libraries in a same place

Resources
-----------------------------------------
- [Lodash](https://lodash.com)
- [class-transformer](https://github.com/typestack/class-transformer)
- [class-validator](https://github.com/typestack/class-validator)
