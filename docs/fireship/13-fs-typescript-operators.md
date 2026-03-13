# TypeScript Operators

When working with TypeScript, we deal with two kinds of things: values and types.

Values are the only thing we see in JavaScript. When working with values, we use variables to store them and assign them using a single equals (`=`). We can use operators to transform a value into some other value. Here's a simple example.

```ts
const theAnswer: number = 15 + 28
```

Here, we're taking two number values, `15` and `27`, and adding them together with the addition (`+`) operator. We're putting them in a variable called `theAnswer` which has a `number` type.

TypeScript types work very similarly. Types can be placed into type aliases, and we can use operators, such as the Union operator (`|`) and Intersection operator (`&`) to transform them.

```ts
type NumberOrString = number | string;
```

TypeScript gives us a few more operators which we can use to transform types and even derive types from values.

## Type Indexed Access

Suppose you have an interface which goes a few levels deep. You want to access the type of one of those deep levels, but you don't want to have to type it out again. And the way you are using it is a one-off, so it seems silly to create an interface just for this one type.

Using Type Indexed Access, we can grab any type from any property of any other type.

```ts
interface Fruit {
  name: string;
  color: string;
  nutrition: { name: string; amount: number }[];
}

type FruitNutritionList = Fruit["nutrition"];
```

We can even grab the type of individual items in an array. We can access a specific index, or we can use the `number` type to grab the type of every array value.

```ts
type NutritionFact = Fruit["nutrition"][0];

// Alternatively
type NutritionFact = Fruit["nutrition"][number];
```

## `typeof`

Sometimes we might want to use the type of some runtime value to represent the type of another thing. This could be especially helpful when the type was inferred by TypeScript.

```ts
let rectangle = { width: 100, height: 200 };
let rectangle2: rectangle; // Type Error: 'rectangle' refers to a value, but is being used as a type here. Did you mean 'typeof rectangle'?
```

Uh oh. It looks like you can't use values as types. Fortunately, the type error gives us the solution we are looking for.

Just like we can use the `typeof` operator in JavaScript to check the type of something at runtime, we can use the typeof operator to derive the type of a value at compile time.

```ts
let rectangle = { width: 100, height: 200 };
let rectangle2: typeof rectangle; // { width: number; height: number; }
```

## `keyof`

It can also be helpful to get the different keys which are present on a type, such as when we are dynamically accessing properties. We can use the `keyof` operator to give us a type which represents all of these property names. In reality, it's a union type of string literals, one for each property name.

```ts
interface Rectangle {
  width: number;
  height: number;
}
type RectangleProperties = keyof Rectangle; // type RectangleProperties = "width" | "height"

let rectangle: Rectangle = { width: 100, height: 200 };
const propertyName: RectangleProperties = "height";
console.log(rectangle[propertyName]); // 200
```

We can even combine keyof with typeof to get a union type with the property names of an object values.

```ts
let rectangle = { width: 100, height: 200 };
type RectangleProperties = keyof typeof rectangle; // type RectangleProperties = "width" | "height"
```

## `const` assertions

TypeScript is very loose with how it interprets our literal types. For example, when we create an object literal, TypeScript infers that the types of the values are primitives, like `string` and `number`, not literal types, like `"hello"` and `"5"`.

```ts
let rectangle = { width: 100, height: 100 };
// let rectangle: {
//     width: number;
//     height: number;
// }
```

This is typically what we want - it would be counterproductive for every value to be immutable - but sometimes, we might want to make the properties literal. We would have to use a literal type annotation to do this, in addition to setting the value.

```
let rectangle: { width: 100; height: 100 } = {
  width: 100,
  height: 100,
};
// let rectangle: {
//     width: 100;
//     height: 100;
// }
```

While that does get the job done, it's very verbose - we're literally repeating our object literal.

When we have any value that we are assigning that we want to be inferred as a literal type, we can use what's called a const assertion. Remember, an assertion is a notice to the type checker that tells it more about our program so it can check our code properly. We write const assertions by putting as const after the literal value.

```
let rectangle = { width: 100, height: 100 } as const;
// let rectangle: {
//     readonly width: 100;
//     readonly height: 100;
// }
```

This has roughly the same effect as writing out the type annotation, but with much less code. It does add a `readonly` modifier, to indicate that these values are constant.

If we only wanted to make one of the values a literal type, we could do that in the object declaration. We can also make individual variable values literal with the same assertion.

```
let rectangle = { width: 100, height: 100 as const };
// let rectangle: {
//     width: number;
//     height: 100;
// }

let message = "Hello" as const;
// let message: "Hello"
```

This actually looks very similar to Enums. In fact, we can achieve the same level of type safety that Enums provide without all the ceremony. Just for fun, here's an Enum, and then a similar object created with a `const` assertion. When we use our object in a properly annotated function, we get great type safety.

```ts
enum Seasons {
  winter,
  spring,
  summer,
  autumn,
}

const SEASONS = {
  winter: "winter",
  spring: "spring",
  summer: "summer",
  autumn: "autumn",
} as const;

function seasonsGreetings(
  season: typeof SEASONS[keyof typeof SEASONS],
) {
  if (season === SEASONS.winter) return "⛄️";
  if (season === SEASONS.spring) return "🐰";
  if (season === SEASONS.summer) return "🏖";
  if (season === SEASONS.autumn) return "🍂";
}
```

Our `seasonsGreetings` function parameter has just as much type safety as if we had used an Enum. In fact, our fancy type signature that we used (`typeof SEASONS[keyof typeof SEASONS]`) equates to a Union of literal values, one for each value in `SEASONS`.

You recall that a literal array value will always inferred to be an array of whatever types we used in the literal, like so.

```ts
const assortedItems = ["hello", 5, (fruit: Fruit) => {}];
// const assortedItems: (string | number | ((fruit: Fruit) => void))[]
```

What a mess! Our array item type is a Union of `strings`, `numbers`, and that specific function signature. This is the same problem we experienced with Tuples, where TypeScript would never infer them to be a fixed-length array of specific types; we always had to add a Tuple type annotation.

What would happen if we used a const assertion on our array literal?

```ts
const assortedItems = ["hello", 5, (fruit: Fruit) => {}] as const;
// const assortedItems: readonly ["hello", 5, (fruit: Fruit) => void]
```

Just adding `as const` to our array literal has turned it into a Tuple, without us having to add an explicit annotation. Our `string` and `number` literals stayed literal in our Tuple definition. If we were to use string and `number` variables (defined with `let`, not `const`), the types would be passed into the Tuple definition.

```ts
let message = "hello";
let count = 5;
const assortedItems = [
  message,
  count,
  (fruit: Fruit) => {},
] as const;
// const assortedItems: readonly [string, number, (fruit: Fruit) => void]
```

Hopefully `const` assertions can help simplify, or even eliminate the need, for some of your type assertions.
