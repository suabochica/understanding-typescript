# Template Literal Types

We learned earlier that we can create unions of literal strings. These are used to represent object keys, specific string parameters, and finite states. In our example, we created a union of season names.

```ts
type Seasons = "spring" | "summer" | "autumn" | "winter";
Suppose for a moment that we wanted to create a value that represents the dates that the seasons begin. It might look something like this:

const seasonsStartDate = {
  springStart: "March, 20",
  summerStart: "June, 20",
  autumnStart: "September, 22",
  winterStart: "December, 21",
};
```

How would we construct a type that represents this object structure? We could use a mapped type, but our `Seasons` type only has the name of the season, not the `-Start` suffix. Of course, we could write out every property in the type so it has the suffix, but we already have our literal type. Why don't we just do some kind of string interpolation, like we can with JavaScript?

```ts
type SeasonsStartDate = {
  [P in `${Seasons}Start`]: string;
};
// type SeasonsStartDate = {
//     springStart: string;
//     summerStart: string;
//     autumnStart: string;
//     winterStart: string;
// }
```

Holy cow, it worked! Starting with TypeScript 4.1, you can interpolate string literals together. The syntax is exactly like JavaScript, except instead of passing in string values, you pass in string literal types.

Notice how TypeScript automatically created an interpolation with every member of our union. This is a really powerful aspect of template literal interpolation that makes it possible to create combinations of many strings, such as this one which gives us positioning schemes.

```ts
type VerticalPositions = "top" | "middle" | "bottom";
type HorizontalPositions = "left" | "center" | "right";

type Positions = `${VerticalPositions}-${HorizontalPositions}`;
// "top-left" | "top-center" | "top-right" | "middle-left" | "middle-center" | "middle-right" | "bottom-left" | "bottom-center" | "bottom-right"
```

TypeScript creates string literals for every permutation of strings based on the unions that are passed in. This is really useful, and can be very powerful. Just remember that TypeScript has to process all of those permutations. In this case, having two unions of three options yielded nine different string literals; adding another union of three strings would give us 3^3 combinations, or 27. The calculations which TypeScript has to perform grow exponentially, so in many cases it's best to just use `string`.

## Template Literal Constraint

In the example above, we created nine specific options which our type represents. Sometimes, though, we want a string that represents many values, but matches a specific pattern. We can create a type which does this using non-literal types in our type interpolation.

```ts
type StringDashString = `${string}-${string}`;

const correctPosition: StringDashString = "forward-backward";
const incorrectPosition: StringDashString = "Some other value";
// Type Error: Type '"Some other value"' is not assignable to type '`${string}-${string}`'.
```

We can interpolate `number` types as well. We can use this to represent several number patterns, such as phone numbers or IP addresses. Obviously, this only checks the presence of any number, not whether it's a valid number, such as being less than 255 in the case of IP Addresses; we would need runtime checking for that.

```ts
type PhoneNumber = `(${number}) ${number}-${number}`; // (555) 315-4483
type IPAddress = `${number}.${number}.${number}.${number}`; // 192.168.1.5
```

## Template Literal Inference

You might recall when we learned about conditional types, we could hook into the type inference system to unwrap our types. We can do the same thing with template literal types.

By placing the `infer` keyword inside a template tag, we can parse a literal value. This example uses a conditional type to pull literal values out of a string and put them into a tuple.

```ts
type MatchTuplePair<
  S extends string
> = S extends `[${infer A},${infer B}]` ? [A, B] : unknown;

type StringTuple = MatchTuplePair<`[hello,world]`>; // type StringTuple = ["hello", "world"]
```

You can also take advantage of implied inference, where TypeScript automatically detects the type of something without us having to use the `infer` keyword. Suppose we were creating a function which adds an `on` method to an object that we pass in. This method lets you pass in the name of a property with the `Changed` suffix along with a callback that is called whenever that property is modified. The type of the callback parameter should be the same as the type of the property it matches. Using it would look something like this:

```ts
declare function watchableProperties<T>(obj: T): T & AddOnMethod<T>;
let fruit = watchableProperties({
  name: "Apple",
  color: "red",
  sweetness: 80,
});

fruit.on("nameChanged", (newName) => {
  // (parameter) newName: string;
});
```

We're using an intersection type operator to add an `on` method to our object via the AddOnMethod type. That's the only piece of this that's missing, so lets start with that.

```ts
type AddOnMethod<T> = {
  on(
    eventName: string,
    callback: (newValue: unknown) => void,
  ): void;
};
```

This barely models the function, but we get no type checking on the `eventName` parameter, and we would have to use type narrowing to figure out what the `newValue` type actually is.

All of this can be inferred by TypeScript. We can create a new generic called K to be used with the on method, and have it extend the keys of `T`. Then, we can use that for the types of both `eventName` using template literals and `newValue` using indexed type access. Because of the nature of tagged templates, we'll also have to constrain `K` to only represent strings using an intersection type operator.

```ts
type AddOnMethod<T> = {
  on<K extends string & keyof T>(
    eventName: `${K}Changed`,
    callback: (newValue: T[K]) => void,
  ): void;
};
```
Now, we'll get type warnings if we accidentally use the wrong event name, or if we use the wrong type for `newValue`.

## Template Literals and Recursive Conditionals

Using recursive conditionals, we can create more complicated utility types that work with template literal types. For example, if we had a literal type that has whitespace on either side, we could create a trim type to remove that whitespace.

```ts
type WhitespaceString = "      hi there     ";

type Trim<S extends string> = S extends ` ${infer T}`
  ? Trim<T>
  : S extends `${infer T} `
  ? Trim<T>
  : S;

type TrimmedString = Trim<WhitespaceString>; // type TrimmedString: "hi there"
```
There are a lot more uses for this, especially once you use some of the transformation types which we'll cover later on in this section. For example, one ambitious TypeScript user created an [Express route parser](https://x.com/MikeRyanDev/status/1308036861747752962?s=20) that lets you type check your URLs based on the route definition. The same user made one that returns the correct [DOM element type for complex CSS queries](https://x.com/MikeRyanDev/status/1308472279010025477?s=20). Another person made a [JSON parser](https://x.com/buildsghost/status/1301976526603206657?s=20) just using the TypeScript type checker!

These are all very advanced, and very complicated examples. Don't be discouraged by them! Rather, recognize how much power is available in the type system with these tools at your disposal.
