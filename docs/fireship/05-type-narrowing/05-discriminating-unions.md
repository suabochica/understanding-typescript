# Discriminating Unions

Thus far, we've learned how to type narrow primitive types, `null` and `undefined`, classes, and arrays. We've been able to narrow objects a _little_, but now we'll learn a method that lets us determine with one check whether a value represents one several different objects.

Sometimes we might have two interfaces that are slightly similar in shape but with key differences. If we had a union of those two interfaces, we could access any of the common properties without a problem. However, if we were to try accessing one of the properties that only exists on one of the Interfaces, TypeScript would warn us.

```ts
interface Fruit {
  name: string;
  color: string;
  juice: () => void;
}

interface Vegetable {
  name: string;
  color: string;
  steam: () => void;
}

type EdibleThing = Fruit | Vegetable;

function prepareEdibleThing(food: EdibleThing) {
  food.juice();
  // Type Error: Property 'juice' does not exist on type 'EdibleThing'.
  //    Property 'juice' does not exist on type 'Vegetable'.
}
```

TypeScript is telling us that ~juicing vegetables is gross~ a `Vegetable` doesn't have the property we're looking for, and since the parameter we pass to the function could be a `Vegetable`, we can't access the property without doing more checks.

Using Optional Chaining doesn't help, since `food` is already guaranteed to not be `null` or `undefined`. One thing that does work is using the in keyword.

```ts
function prepareEdibleThing(food: EdibleThing) {
  if ("juice" in food) {
    food.juice();
  }
}
```
This works well when we only need to access a single property, but what if we needed to access many properties? Or what if we had more than two types in the Union?

This is where Discriminating Unions come into play. We can create a Discriminating Union by adding literal type properties to the interfaces which are part of the union. We can then check that individual property to see what type represents the value.

```ts
interface Fruit {
  type: "fruit";
  name: string;
  color: string;
  juice: () => void;
}

interface Vegetable {
  type: "vegetable";
  name: string;
  color: string;
  steam: () => void;
}

type EdibleThing = Fruit | Vegetable;

function prepareEdibleThing(food: EdibleThing) {
  if (food.type === "fruit") {
    food.juice();
  }
  if (food.type === "vegetable") {
    food.steam();
  }
}
```

This only works because all of the members of the Union have a similar property, but the property doesn't have to be a literal type. As long as the type is different for each of the members, we can check against it. For example, TypeScript's type checker is intelligent enough to determine the type when we use a truthiness check on a member that could be null.

```ts
type StringResult =
  | { error: Error; data: null }
  | { error: null; data: string };

function handleResult(result: StringResult) {
  if (result.error) {
    // Handle the error, which we know is an Error type
  }

  return result.data;
}
```

To recap, there are often times when a value could be two different kinds of objects. By adding a common, but unique, property between both objects, we can easily tell the shape of our value by checking that property. This is, by far, the easiest way to narrow the type of an object.

