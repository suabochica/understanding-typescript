Section 08: Generics
====================

Introduction
------------
1. *Generics* is a powerfull tool to write dynamic code that use the features of TypeScript and the benefits of a Typed language.

Why and What?
-------------
1. Start with the next example:

```javascript
function echo(data: any) {
    return data;
}

console.log(echo("Max"));                     //-> "Max"    | 3
console.log(echo(27));                        //-> 27       | undefined
console.log(echo({name:"Max", age: 27}));     //-> Object   | undefined
```

2. This example allows the use of `.length` property that should be work just for the string type.
3. However, the browser prints the information in the second column.
3. This means that you are not take adventage of the typed language benefits

Creating a generic function
---------------------------
1. Below you can see an improve over the echo function:

```javascript
function genericEcho<T>(data: T) {
    return data;
}

console.log(genericEcho("Max"));                     //-> "Max"    | 3
console.log(genericEcho(27));                        //-> 27       | Compiler error: property does not exist on type number
console.log(genericEcho({name:"Max", age: 27}));     //-> Object   | Compiler error: property does not exist on type number
```

2. This example throws compiler errors if you try to use `.length` property on a type different to `string`.
3. Also you can specife the explicity type for the function: `console.log(genericEcho<number>(27));`

A built-in Generic Type: Arrays
-------------------------------
1. By default `Array` is a generic type
2. With TypeScript we can specify the type of the elements inside the array

Generic Types and Arrays
------------------------
1. We can add a Generic type to the elements inside the array. Please check the next syntax:

```javascript

function printAll<T>(args: T:[]) {
    args.forEach((element) => console.log(element));    
}

printAll<string>(["Apple", "Banana"]);
printAll<number>([28, 30]);

```

Using Generic Types
-------------------
1. Generic Types have a tricky syntax. Check below:

```javascript

const typeEcho: <T> (data: T) => = genericEcho;

console.log(typeEcho<string>("Something"));
```

2. The type is always defined between the `:` and the `=`

Creating a Generic Class
------------------------
1. You can apply the *Generic* concept on classes. Check the next syntax:

```javascript
class SimpleMath<T> {
    baseValue: T;
    multiplyValue T;
    
    calculateMultiplication(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath();

simpleMath.baseValue = 10;                          // This value could be string type
simpleMath.multyplyValue = 20;                      // This value could be string type

console.log(simpleMath.calculateMultiplication());  //-> 200 as expected
```

2. This class is not completely generic, because we can have several types in the class propeties

Constraints
-----------
1. Constraints help you to be more explicit with the class type.
2. The errors will be reported by the TS compiler

```javascript
class SimpleMath<T extends number | string> {
    baseValue: T;
    multiplyValue T;
    
    calculateMultiplication(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<number>();        // or const simpleMath = new SimpleMath<string>();

simpleMath.baseValue = 10;
simpleMath.multyplyValue = 20;

console.log(simpleMath.calculateMultiplication());  //-> 200 as expected
```

Using more than one GenericType
------------------------------
1. Get messy, but we can set several Generic Types in a Class.

```javascript
class SimpleMath<T extends number | string, U extends number | string> {
    baseValue: T;
    multiplyValue U;
    
    calculateMultiplication(): number {
        return +this.baseValue * +this.multiplyValue;
    }
}

const simpleMath = new SimpleMath<string | number>();

simpleMath.baseValue = "10";
simpleMath.multyplyValue = 20;

console.log(simpleMath.calculateMultiplication());  //-> 200 as expected
```
