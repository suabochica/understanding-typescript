Section 07: Generics
====================

*Generics* is a powerful tool to write dynamic code that use the features of TypeScript and the benefits of a Typed language. Keep in mind that generics exist in TypeScript, not in vanilla JavaScript, So there is no real translation here. However, we can use the concept of generics types and take advantages of the different tools that it offer to us.

Index
-----

1. Built-in Generics && What are generics?
2. Creating a Generic Function
3. Working with Constraints
4. Another Generic Function
5. The "keyof" Constraints
6. Generic Classes
7. A First Summary
8. Generic Utility Types
9. Generic Types vs Union Types
10. Resources

Built-in Generics && What are generics?
------------------------
A generic type is a definition to connect two or more types. JavaScript comes with some generic types in his core. Let's examine one of them, the popular `Array`:

```typescript
const names: Array = [];
```

With this line, the TypeScript's compiler will raise the next error: Generic type 'Array<T>' requires 1 type argument. That syntax corresponds to generics, and, as the error mentions, we need to specify a type to associate the `names` variable with the generic type.

```typescript
const names: Array<string> = [];
names[0].split('');
```

For this case we specify the `string` type. That means that every item of the array should be of `string` type, and then, we can use the string methods like `split`. Inside the generic type, we can use union type like `Array<string | number>`.

Let's review another generic type in the core of JavaScript, `Promise`:

```typescript
const promise: Promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});
```
Checking the definition of promise, we got the generic type `Promise<unknown>`. We can take advantage over the generic type and specify the type of the promise response:


```typescript
const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});
```

Here, The main type is `Promise` but a promise just like an array kind of works to gather with other types an for this case we use the `number` type.

So you're really flexible regarding what you do with that generic type information an array knows which data it stores and a  promise knows which data it returns.

If you build your own generic classes or functions you might do something totally different in there but in the end generic types help you to get additional type information if you've got a more complex class or more complex function that does something with the data that's coming in in a way where it doesn't really care about the data being of one particular type but where you want to store the type information of the incoming data to get better typescript support.

Creating a Generic Function
------------------------
To start to understand generic function let's explain the next example:

```typescript
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name; // Error, merge object has not 'name' property
```

Here we have a `merge` function that given two objects it will create a big object from these parameters. However, we get an error trying to access to a property in our `mergedObj`. TypeScript will not identify `name` as a property of the `mergedObj`. We can solve this adding typecasting, but the code will be verbose. Instead, we can use generics, as shown below. 

```typescript
function merge<T, U>(objA: T, objB: U) {
    return (<any>Object).assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name;
```

Notice in the function signature the `<T, U>` syntax to specify the generic function, saying that our `objA` will be of type `T` and the `objB` will be of type `U`. The result of object assigned types could automatically understands that this function returns the intersection `T & U`.

Now we can start to play with our merged function. In the assignation we can specify the types, for example:

```typescript
const mergedObj = merge<string, number>('Max',30);
```

Is a valid use of our generic function. Nonetheless, specify the type could be redundant, because we can take advantage of the TypeScript's type inference feature.

Generics are all about that you can fill in different concrete types for different function calls but we don't need to do that here because typescript simply infers the types of the values we're passing as arguments.
 
Working with Constraints
------------------------
We got started with generics and hopefully it's clear what types does here. We passed some extra information into the merge function so that we can work in a better way with the result of the merge function and that's typically what generics are therefore they allow you to continue working with your data in a typescript optimal way.

However, we are expose to some unexpected behaviors, like the next snippet.

```typescript
function merge<T, U>(objA: T, objB: U) {
    return (<any>Object).assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, 30);
mergedObj.name;
```

Here, we don't get any errors, but if we print the `mergedObj` in console, we can't see that the `30` argument passed in the definition of `mergedObj` is skipped. This is know as a silence problem in JavaScript, because the function is expected an `object`, not a `number`, but the compiler can't identify this inconsistency. To solve this silence problem, we can use type constraints, as shown below:

```typescript
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return (<any>Object).assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name;
```

Here we constraint our generic types, and now the compiler is able to identify if the passed argument isn't an object, as we specify in the signature of the function.

Another Generic Function
------------------------
Let's practicing with generic types. Please check the next snippet:

```typescript
interface Lengthy {
    length: number;
}

function countAndPrint<T extends Lengthy> (element: T): [T, string] {
    let descriptionText = 'Got no value.'
    if (element.length === 1) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1){
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}

console.log(countAndPrint('Hi there!')) // ['Hi there!', Got 9 elements]
console.log(countAndPrint(['Alchemy', 'Travel'])) // [Array[2], Got 2 elements]
```

The `countAndPrint` is a generic function that give and element of generic type `T` will return the element itself and the length of this element. In the above example we pass the `'Hi there!'` string and we got a length of 9 elements, that corresponds to the quantity of characters. Also we pass an array of two elements and we got a length of two elements. Here, we start to see the benefits of use generics.

Again we got our generic function idea is similar to the function before we want to be a bit unspecific about the type of data we get here.

We don't really care if it's a `string` if it's an `array` or anything else which has a `length` property. We just care about that it does have a `length` property and then we want to do something with it because we rely on the `length` property in our code so we need to guarantee that we get that.

The "keyof" Constraints
------------------------

The `keyof` constraint is a mechanism to establish relations between generics types. For example:

```typescript
function extactAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value: ' + obj[key];
}

extactAndConvert({name: 'Max'}, 'name');
```

Notice the generic definition `<T extends object, U extends keyof T>`, where we specify that the generic type `U` have a dependency with a key of the `T` generic type.

This way we tell TypeScript that we want to ensure that we have this correct structure and that's of course really useful because it allows us to ensure that we don't make dumb mistakes where we tried to call this function which in the end would try to access a property that doesn't exist.

Generic Classes
------------------------
Let's apply the concept of generic to classes via an `DataStorage` example:

```typescript
class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1)
            return
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}
```

As you can see, the data storage will work with the generic type `T` and have a private property `data` that is an array of the generic type. Additionally we specify three methods for this class: `addItem`, `removeItem` and `getItems`. Time to use our class definition:

```typescript
const textStorage = new DataStorage<string>();
textStorage.addItem('Edward');
textStorage.addItem('Alphonse');
textStorage.removeItem('Alphonse');
textStorage.getItems(); // Edward

const objectStorage = new DataStorage<object>();
const edObject = {name: 'Edward'};
const alObject = {name: 'Alphobse'};
objectStorage.addItem(edObject);
objectStorage.addItem(alObject);
objectStorage.removeItem(alObject); // Some errors here for how works objects in JS
textStorage.getItems();
```

Here, is the flexibility of generics. we have to instances of `DataStorage`: one to apply the class on `string` called `textStorage`and other to apply it on `object` called `objectStorage`. For strings these code works perfectly, but for object we have some issues with the `removeItem` method, because remember that in JavaScript objects are accessed via memory reference. But, the attention is how the `DataStorage` generic class can be used for different types.

Keep in mind that you're not limited to one type when you work with classes and you can also have methods which have their own generic types inside of classes so you could introduce new generic types in class methods.

If you have some generic type which only is needed in a certain method and not in the entire class so you're really flexible there you can use constraints everywhere and in general generic types are there to make your life easier and to give you that perfect combination of full flexibility we can use any primitive value we want here and type safety because we know perfectly well what is stored in this data storage and what is stored in this data storage.

So this combination is the awesome thing that generic types give us.

A First Summary
------------------------
So that is it for generic types already. They can really be tricky to understand, but basically, they give us flexibility combined with type safety. We're flexible regarding the values we pass in or the values we use in our class at least as long as we adhere to the possible constraints which you might have added.

We got full pipe support for what we then do with the class or with the result of a generic function because TypeScript then knows which concrete type we pass in what we call the function here or when we instantiate the class here.

Generic Utility Types
------------------------
TypeScript offer us a large list of utility types that can be handy if we use them as a combination with generics. In this section we will review two of them: `Partial` and `Readonly`. Let's start with the first one, via the next snippet:

```typescript
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date,
) {
    let courseGoal: Partial<CourseGoal> = {};

    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}
```

Partial Constructs a type with all properties of `T` set to optional. This utility will return a type that represents all subsets of a given type. In the last code, all the properties of `courseGoal` are partially passed before return it.

For the other hand, the `Readonly` type, takes a type `T` and marks all of its properties as `readonly` using mapped types. Here is a demo that uses it in practice:

```typescript
const nicknames: Readonly<string[]> = ['Edward', 'Winry'];
nicknames.push('Pinako') // not allowed
```

With this definition, we can add or remove items for `nicknames`.

In the resources section we will share the documentation of the utility types in TypeScript.

Generic Types vs Union Types
------------------------
Resources
------------------------

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

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
3. This means that you are not take advantage of the typed language benefits

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
3. Also you can specify the explicitly type for the function: `console.log(genericEcho<number>(27));`

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
simpleMath.multiplyValue = 20;                      // This value could be string type

console.log(simpleMath.calculateMultiplication());  //-> 200 as expected
```

2. This class is not completely generic, because we can have several types in the class properties

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
simpleMath.multiplyValue = 20;

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
simpleMath.multiplyValue = 20;

console.log(simpleMath.calculateMultiplication());  //-> 200 as expected
```
