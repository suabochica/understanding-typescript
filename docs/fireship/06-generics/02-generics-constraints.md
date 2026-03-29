# Generics Constraints

Suppose we want to create fruit baskets. These baskets will be classes, and each basket will only be able to hold a single type of fruit - no mixed baskets - and each fruit will be its own class, extended from a base `Fruit` class. We also want to make sure our baskets are actually holding fruit, and not vegetables or rocks or something else.

Let's start by making a fruit basket class.

```ts
class Fruit {
  isFruit: true = true;
  constructor(public name: string) {}
}
class FruitBasket {
  constructor(public fruits: Fruit[] = []) {}
  add(fruit: Fruit) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

This works well for holding any kind of fruit, but now we need to be able to hold different kinds of fruit. Let's create our fruit classes. We'll give each of our fruit classes a `type` property, to make it clear what type of fruit it is. (This works in a similar way to discriminating unions.)

```ts
class Fruit {
  isFruit = true;
  constructor(public name: string) {}
}
class Apple extends Fruit {
  type: "Apple" = "Apple";
  constructor() {
    super("Apple");
  }
}
class Banana extends Fruit {
  type: "Banana" = "Banana";
  constructor() {
    super("Banana");
  }
}
```

Now, we don't want to go through the effort of making a separate fruit basket class for each kind of fruit. Instead, we'll make a _generic class_. We do it the same way as the generic function, by defining the generic name with angle brackets in front of the class's name. Then we can use that generic type anywhere we need to inside our class definition.

```ts
class FruitBasket<T> {
  constructor(public fruits: T[] = []) {}
  add(fruit: T) {
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

Let's look closer at what's going on here. We are defining a generic type `T` at the top of our class, before we get to our constructor. Then, down in the constructor, we are using the property shorthand to create a public property called `fruits`. We're giving `fruits` a type of `T[]`, which means it is an array of `T`. We're setting `fruits` to an empty array by default.

The `add` method takes fruit as a parameter, with the type being `T`. This lets us add a single `T` - whatever that ends up being - to our array of `T`.

Now we can instantiate our fruit basket.

```ts
const appleBasket = new FruitBasket(); // const appleBasket: FruitBasket<never>
```

Hang on, what's going on here? Why is our `appleBasket` a basket of `unknown`? With our `getFirstItem` example in the last lesson, TypeScript was able to infer the type of the generic based on what we passed to it. In this case, we aren't passing anything to our `FruitBasket` constructor, so it has no way of knowing what type the generic should be, so it defaults to `never`. We have three options.

**Option 1**: Pass a parameter to `FruitBasket` when we call the constructor so TypeScript can infer the type of the generic. We have written our class so we can pass an array of items as the initial list.

```ts
const appleBasket = new FruitBasket([new Apple()]); // const appleBasket: FruitBasket<Apple>
```

**Option 2**: Provide a default generic type for our `FruitBasket` class. If a type isn't provided or inferred for our generic, TypeScript will fall back on the default type instead of `never`. For this to work, we need

```ts
class FruitBasket<T = Apple> {
  //...
}
```

**Option 3**: Provide a type for the generic in the class when we instantiate it. We do this by putting the type we want to use for the generic in angle brackets just after the name of the class when we are instantiating it. This same syntax works to specify a type when calling a generic function.

```ts
const appleBasket = new FruitBasket<Apple>(); // const appleBasket: FruitBasket<Apple>
```

Now that we have our `appleBasket`, lets put some fruit in it.

```ts
appleBasket.add(new Apple());
appleBasket.add(new Banana()); // Type Error: Argument of type 'Banana' is not assignable to parameter of type 'Apple'.
```

TypeScript has warned us that we can put a `Banana` in `appleBasket`, since it's type is incompatible with `Apple`. We could, however, create a `bananaBasket` and put a `Banana` in that basket instead.

## Generic Constraints

The final thing we wanted to do was make it impossible to put things like `Vegetables` inside of our `FruitBasket`. We can do that by applying a _type constraint_. This tells TypeScript that our generic can't just be any type. It has to match the constraints we supply. To do this, we'll use the `extends` keyword in our generic definition.

```ts
class FruitBasket<T extends Fruit> {
  // ...
}
```

In this case, we're saying that our generic `T` has to match `Fruit`. That means any type that we pass in for `T` has to at least have the same properties as `Fruit`, including the types of those properties. Since `Apple` and `Banana` are extended from `Fruit`, they automatically qualify. Anything that doesn't match `Fruit` will throw a type error.

Now we'll add our `Vegetable` class and try to make a `FruitBasket` of `Vegetables`.

```ts
// Type Error: Argument of type '"naem"' is not assignable to parameter of type '"name" | "sweetness"'.
class Vegetable {
  isFruit = false;
  constructor(public name: string) {}
}

const appleBasket = new FruitBasket<Apple>(); // This works.

const vegetableBasket = new FruitBasket<Vegetable>();
// Type Error: Type 'Vegetable' does not satisfy the constraint 'Fruit'.
//   Types of property 'isFruit' are incompatible.
```

Hurray! We can't make a `vegetableBasket`! `Vegetable` may have a `isFruit` property, but for Vegetables, that property is a literal `false` type, while `Fruit` has a literal `true` type. Those two types are incompatible, so `Vegetable` does not pass the constraint we put on our generic `T`.

One other important aspect of generic constraints is what happens to `T` inside of our class implementation. Since `T` is constrained to only be types that match `Fruit`, we can access all of the properties of `Fruit` inside our class. For example, if we wanted to log the name of the fruit to the console as we ate it, we could change our `add` method to access the name.

```ts
class FruitBasket<T extends Fruit = Apple> {
  constructor(public fruits: T[] = []) {}
  add(fruit: T) {
    console.log("Added " + fruit.name);
    this.fruits.push(fruit);
  }
  eat() {
    this.fruits.pop();
  }
}
```

## Multiple Type Parameters

We can use multiple type parameters in our generics as well. We just separate our generics with a comma when we define them, much like we do with function parameters. As an example, we'll create a function which grabs a property from whatever object we pass to it. The object's type will be captured with the `T` generic, and the key (which could be either a string or a number, for arrays) will be captured with the `K` generic.

```ts
function getObjectProperty<T, K extends string | number>(
  object: T,
  key: K,
) {
  return object[key]; // Type Error: Type 'K' cannot be used to index type 'T'.
}
```
It looks like our naïve solution creates a type error. TypeScript has no way of knowing ahead of time whether `K` is the type which is used to index `T`.

What we can do to solve this is tell TypeScript right away that `K` represents all of the keys of `T` using the `keyof` operator. Once we've defined `T`, we can use it elsewhere in our generic type definition.

```ts
function getObjectProperty<T, K extends keyof T>(
  object: T,
  key: K,
) {
  return object[key];
}
```
Now TypeScript knows that the `key` parameter has to be one of the properties of `object`. This means we'll get type errors if we accidentally use the wrong property name, such as if we make a typo.

```ts
const fruit = {
  name: "Apple",
  sweetness: 70,
};

const fruitName = getObjectProperty(fruit, "name");
const misspelledName = getObjectProperty(fruit, "name");
// Type Error: Argument of type '"name"' is not assignable to parameter of type '"name" | "sweetness"'.
```

TypeScript caught our typo, because it knows what properties are present on `fruit` and knows the property we are asking for doesn't exist.