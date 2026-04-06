# Unexpected TypeScript Behavior

Throughout the course, we've talked about all the ways that TypeScript tries to make sure your code is correct and free of type errors. However, the way that it is designed lends itself to some interesting and unexpected behaviors. All of these behaviors have reasonable explanations, but they might not be entirely obvious at first.

This section is all about explaining ways that TypeScript can behave strangely, why it does what it does, and how we can get around that.

## Structural Typing

We've covered this in a previous section, but it's important to reiterate, since this is the basis for most of these strange behaviors. TypeScript uses a structural typing system, also known as duck typing. This means it checks to see if the properties of types match, rather than identifying two types as being different if they were defined in different places.

Take this for example:

```ts
interface Apple {
  name: string;
  color: string;
}
interface Banana {
  name: string;
}
const fruit: Apple = { name: "Banana", color: "Yellow" };
const otherFruit: Banana = fruit;
```

Even though I've specifically said that `otherFruit` is a `Banana` type, we can still assign an `Apple` value to it, since `Apple` has the same properties as `Banana`. `Apple` even has an extra property, but TypeScript doesn't mind. So long as it has the properties it needs, it will ignore any extra properties we assign.

## Type Erasure

The second thing which has the biggest impact on strange behaviors is type erasure. This means that when our code is compiled from TypeScript to JavaScript, all of the type information is removed from our code. This includes interfaces, type aliases, type signatures, and generics.

There is a distinction between types and values. Types describe the structure of a value, while the value holds information in the structure the type specifies. So the value of an object sticks around after compilation, but the interface that describes the shape of that object is removed.

That means you can't try and convert types into values, such as using the `typeof` operator. That won't work, because our types are erased at compilation. Here is an example that **does not work** to illustrate this issue.

```ts
// THIS WILL NOT WORK
function eatIfString<T>(fruit: T) {
  if (typeof T === "string") {
    // Do a thing
  }
}
```

This doesn't work, because `T` doesn't have a value. It represents a type. What we can do is check the type of the value which is passed into our function instead.

```ts
// THIS WILL WORK
function eatIfString<T>(fruit: T) {
  if (typeof fruit === "string") {
    // Do a thing
  }
}
```

## Destructuring Objects

ES2015 brought us object and parameter destructuring, a handy way to access properties that exist in objects. You might assume that we can just put our type definitions directly on the values we destructure, like so.

```ts
// THIS WILL NOT WORK
function getFruitName({ name: string }) {
  return name;
}
```

The problem with this has to do with destructuring syntax. Putting something after a colon in the destructuring list actually changes the name of the variable from the property name to whatever you put after the colon. So in this case, we're putting the `name` property into a variable called `string`, which is obviously not what we wanted to do.

Instead, we have to add our type definition to the whole object.

```ts
// THIS WILL WORK
function getFruitName({ name }: { name: string }) {
  return name;
}

// or even better
function getFruitName({ name }: Fruit) {
  return name;
}
```

## Void Functions

Having a function with `void` as the return type is helpful when we want to make sure we don't accidentally return something from our function. However, you might find a situation where you use a function that actually does return something in a place where it should be returning `void`.

```ts
function performCallback(callback: () => void) {
  callback();
}

let list: number[] = [];
performCallback(() => list.push(10));
```

The `callback` function we pass in implicitly returns a number value, so TypeScript should be throwing an error to tell us that the return values don't match up.

However, remember that TypeScript is here to keep us from writing type errors in our code. There isn't a type error here. Yes, we do return a value from our `callback` function. However, that value isn't assigned to a variable or used in any way. TypeScript just ignores it. This gives us a little bit of flexibility when working with callbacks like this without needing to worry about our types matching up perfectly.

## Fewer Function Parameters

Lets look at a similar example. In this case, our callback signature takes multiple parameters, but the callback function we pass in only uses one of them.

```ts
const numbers = [1, 2, 3];
const doubled = numbers.map((item: number) => num * 2);
```

What's going on here? We know that our `.map` callback has three parameters: the item, the index, and the entire array. We're only using one of those parameters.

TypeScript doesn't care how we use the parameters that are passed in, since our callback might not need all of the parameters. All that TypeScript cares about is that all of the parameters that we do use have the correct type. In this case, we've used the appropriate type for the item parameters, so TypeScript doesn't throw an error.

## Empty Interfaces

Here's a fun one. What happens when we don't put any properties on an interface?

```ts
interface Empty {}

const myObject: Empty = { hello: "World" };
const myArray: Empty = [1, 2, 3];
const myString: Empty = "This works";
```

That's right. Assigning values to an empty Interfaces operate exactly the same as the `any` type. That's because when we assign the value, TypeScript checks to make sure all of the properties of our interface are present. Since our interface has no properties, that means all of them are present, so the assignment works just fine.

This same behavior exists on Classes as well. As a rule of thumb, never create Interfaces or Classes with no properties.

## Object Literals

Okay, we know that when we create an Interface, we can assign other variables to it that have more properties than necessary. That means we should be able to assign object literals with more properties than necessary, right?

```ts
interface Fruit {
  name: string;
}
const apple = { name: "Apple", color: "red" };
const anotherApple: Fruit = apple; // This works just fine.
const banana: Fruit = { name: "Banana", color: "yellow" }; // Type Error: Object literal may only specify known properties, and 'color' does not exist in type 'Fruit'.
```

What happened? TypeScript has a special rule around object literals. If we assign an object literal to a variable that has a specific type, we can't include any extra properties. Since we have full control over the structure of the object literal (we made it in the first place), TypeScript expects us to remove the extra properties.

We can get around this by asserting that our object literal is the expected type.

```ts
const banana: Fruit = { name: "Banana", color: "yellow" } as Fruit; // This works just fine.
```

## Type Assertions vs Type Casting

When we use the `as` keyword in TypeScript, like we just did above, we are asserting that a certain value is a certain type. We are not, however, actually transforming the value from one type into another, just convincing TypeScript that the types are the way we say they are.

That means we can use the as keyword to break the type checker and cause runtime type errors. For example, we can assert any value into any type by first using the `as unknown` assertion.

```ts
const myAge: number = ("perpetually youthful" as unknown) as number;

console.log(myAge * 2); // NaN
```

In this case, JavaScript's very permissive type casting system helped us out by turning the result into a number instead of throwing a runtime type error. However, if we were to try accessing a number method, like `.toFixed`, JavaScript would throw `Uncaught TypeError: myAge.toFixed is not a function`.

If I wanted to explicitly turn my `string` into a `number`, I could use several different methods to cast the value.

```
const myStringAge = "perpetually youthful";
const myAge: number = parseInt(myStringAge);

console.log(myStringAge + 2); // "perpetually youthful2"
console.log(myAge + 2); // NaN
```

Whenever you are using the `as` keyword, or any time you are trying to convince TypeScript that a value is a certain type, be very careful to make sure you don't accidentally introduce runtime type errors that TypeScript can't detect.
