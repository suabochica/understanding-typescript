# Literal types

Literal types represent exact values of JavaScript primitives. For example, strings can represent any string, but type `literalString = "thisString"` can only represent a string with the value of `"thisSring"`.

```ts
let fruitName: "Apple" = "Apple";
fruitName = "Banana"; // Type Error: Type '"Banana"' is not assignable
```

This behavior is inferred automatically when we use `const` to declare our variables, since that variable will never change to something different.

```ts
const fruitName = "Apple";
// const fruitName: "Apple"
```

A variable that can only be assigned one value isn't very interesting. Literal types become much more powerful when we combine them with Union types. Remember when we talked about Enums, we created an object to represent our constant values.

```ts
const SEASONS = {
  winter: "winter",
  spring: "spring",
  summer: "summer",
  autumn: "autumn",
};
```

We then used an Enum to make this object more type safe. It isn't very convenient, though, since we always have to reference the `SEASONS` object or Enum to get at the value we want. Using a Union of literal types allows us to have the same type safety as Enums, but without the extra hassle of accessing our values on the Enum itself`

```ts
type Seasons = "spring" | "summer" | "autumn" | "winter";

function seasonMessage(season: Seasons) {
  if (season === "summer") {
    return "The best season.";
  }
  return "It's alright, I guess.";
}

seasonMessage("autumn"); // It's alright, I guess.
seasonMessage("fall"); // Type Error: Argument of type '"fall"' is not 
```

Literal types can be created with `numbers` and `booleans` too.

```ts
type JazzBasketballRetiredJerseys =
  | 1
  | 4
  | 7
  | 9
  | 12
  | 32
  | 35
  | 53
  | 1223;
type JazzFan = true;
```

We can use literal types in Interfaces and object types as well.

```ts
interface Fruit {
  foodType: "fruit";
  name: string;
  sweetness: number;
}
```

This pattern of putting a literal property on an interface becomes especially useful when creating Discriminating Unions, which we'll cover in a future section.
