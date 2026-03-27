# Class Definitions

Classes are a type of object which was introduced to JavaScript in ES2015. They provide "syntactic sugar" around JavaScript's Prototypal inheritance system, making it easier to create object instances that all behave the same. This means each instance of a class has the same property structure and the same methods.

One of the reasons TypeScript was invented in the first place was to add a class syntax to JavaScript and make it more object-oriented. Now that classes are part of the JavaScript language, TypeScript fully supports them.

We define a class using the `class` keyword. We can then add properties to the class, along with their type definitions. Classes also need a constructor which initializes the class instance when it is created. Inside of class methods (another name for functions inside the class) we can use the `this` variable to access our class instance.

```ts
class Fruit {
  name: string;
  color: string;
  sweetness: number;
  constructor(name: string, color: string, sweetness: number) {
    this.name = name;
    this.color = color;
    this.sweetness = sweetness;
  }
  fullName() {
    const isSweet = this.sweetness > 50;
    return `${isSweet ? "Sweet " : ""}${this.color} ${this.name}`;
  }
}
```

This class has four members - three properties (`name`, `color`, `sweetness`) and one method (`fullName`).

Classes might seem very similar to Interfaces. They let you give a name to a particular shape of object and assign types to the properties of that object. However, interfaces only represent a type; classes represent both the type of a class instance and a constructor function.

When we check the `typeof` value of our class definition, it appears as a `function`. This represents the constructor, which can be called to create an instance of the class. However, we can't just invoke the class constructor function; we have to use the `new` keyword so JavaScript knows to link up the class properties and methods to the class instance.

```ts
typeof Fruit; // "function"
const apple = Fruit("Apple", "red", 80); // Type Error: Value of type 'typeof Fruit' is not callable. Did you mean to include 'new'?
const banana = new Fruit("Banana", "yellow", 70); // This works

banana.fullName(); // "Sweet yellow Banana"
```

We can use the class _type_ as an annotation, just like we would an Interface.

```ts
const fruitBasket: Fruit[] = [];

fruitBasket.push(new Fruit("Pear", "green", 60));
```

If we have the `strictPropertyInitialization` flag turned on in our tsconfig.json file, TypeScript will expect us to initialize all of our class properties in the constructor. If we don't, TypeScript will throw a type error.

```ts
class Fruit {
  name: string;
  color: string;
  // Type Error: Property 'color' has no initializer and is not definitely assigned in the constructor.
  sweetness: number;
  // Type Error: Property 'sweetness' has no initializer and is not definitely assigned in the constructor.
  constructor(name: string, color?: string, sweetness?: number) {
    this.name = name;
    if (color) {
      this.color = color;
    }
    if (sweetness || sweetness === 0) {
      this.sweetness = sweetness;
    }
  }
}
```

There are three ways we can avoid constructor initialization. They are default values, optional properties, and the non-null assertion operator.

Default properties let us specify what the value of a property should be in case it isn't assigned in the constructor.

```ts
class Fruit {
  name: string;
  color: string = "red";
  sweetness: number = 50;
  constructor(name: string, color?: string, sweetness?: number) {
    this.name = name;
    if (color) {
      this.color = color;
    }
    if (sweetness || sweetness === 0) {
      this.sweetness = sweetness;
    }
  }
}
```

Optional properties work the same in classes as they do in Interfaces. Putting `?` after the property name will mark the property as optional. When we try to access these properties before they are assigned, their value will be `undefined`. Also, remember that optional properties only exist in TypeScript; you can't use them when writing JavaScript.

```ts
class Fruit {
  name: string;
  color?: string;
  sweetness: number = 50
  constructor(name: string, sweetness?: number) {
    this.name = name;
    if (sweetness || sweetness === 0) {
      this.sweetness = sweetness;
    }
  }
}
```

Another TypeScript-only solution is the Non-null assertion operator. It looks like an optional property, except with an exclamation mark (`!`) instead of a question mark. Adding this bypasses the `strictPropertyInitialization` rule for that property, which means if we aren't careful, the property might never be initialized and it would have the value of `undefined` at runtime. Only use this when you are certain you know better than the type checker.

```ts
class Fruit {
  name: string;
  sweetness!: number;
  constructor(name: string, sweetness?: number) {
    this.name = name;
    this.initSweetness(sweetness);
  }
  initSweetness(sweetness?: number) {
    if (!sweetness) {
      this.sweetness = 100;
    }
    this.sweetness = sweetness;
  }
}
```

## Inheritance

Just like Interfaces, classes can be extended by other classes, creating an inheritance chain. This behaves just a little differently than interfaces, though, since we have to account for the constructor function. Lets create the same class inheritance that we did earlier with Interfaces and adjust it for our class.

```ts
class EdibleThing {
  name: string;
  color: string;
  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

class Fruit extends EdibleThing {
  sweetness: number;
  constructor(name: string, color: string, sweetness: number) {
    super(name, color);
    this.sweetness = sweetness`
  }
}
```

`super` is a special function which is only available in the constructor of a class which inherits from another class. It calls the constructor of the parent class. This lets us pass the necessary parameters to the parent's constructor so it can prepare the class instance. Because of the rules of JavaScript, we have to call `super` before trying to access `this`. Otherwise, TypeScript will give us this warning: `'super' must be called before accessing 'this' in the constructor of a derived class`.

## Static Properties

We can assign static properties to a class. These are properties which only exist on the class definition, not class instances. We do this by appending the `static` keyword in front of the property name.

```
class Vegetable {
  static cookingTimeSeconds = 5;
  static cook(vegetable: Vegetable) {
    setTimeout(() => {
      console.log(`Cooked ${vegetable.name}`);
    }, Vegetable.cookingTimeSeconds * 1000);
  }
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const squash = new Vegetable("squash");
Vegetable.cook(squash); // 5 seconds later: "Cooked squash"
```

This is useful when we have utility functions or constants related to a specific class that we want easy access to.

## Annotating Class Constructors

For our `Vegetable` class, the type that it represents is for the class instance that is created when we instantiate it. What if we wanted to have an annotation for the _class constructor function_? For example, suppose we had a function that we pass a class constructor to. It instantiates the class, and then does something with it.

```ts
function prepareAndEat(constructor: Vegetable) {
  // Type Error: Type 'Vegetable' has no construct signatures.
  const squash = new constructor("squash");
  constructor.cook(squash);
}
```

Remember how typeof Vegetable or any other class represents the constructor function. We can use that to get the construct signature for this particular class. The inferred type from this will also give us a hint of how we can write a construct signature on our own.

```ts
type VegetableConstructor = typeof Vegetable;
// type VegetableConstructor: new (name: string) => Vegetable
```

This looks just like a regular function annotation, except it uses the new keyword to indicate that it's creating a class instance - that's what makes it a construct signature.

Remember, though, that our class has some static properties which should be present on the constructor function. For that, we have to create a separate type that includes a callable interface for the constructor.

```ts
interface VegetableConstructor {
  new (name: string): Vegetable;
  cookingTimeSeconds: number;
  cook(vegetable: Vegetable): void;
}
```

If we wanted to make this class construct signature work with more than just Vegetable classes, we could turn it into a generic interface, where the generic type is the class instance.

```ts
interface AnyFoodConstructor<Food extends Vegetable> {
  new (name: string): Food;
  cookingTimeSeconds: number;
  cook(food: Food): void`
}
```

Now we can use this type signature with any class constructor that has the same static properties as `Vegetable`.

## Abstract Classes

Abstract classes are classes which cannot be instantiated, but provide implementation details for any classes which extend them. This differs from Interfaces, which only provide type definitions. You can think of them as being blueprints, or templates, which have to be followed when creating certain types of class definitions. They only exist in TypeScript, so you can't use an abstract class when you are writing JavaScript.

Abstract classes can include abstract methods, which include a function type signature, but contain no implementation. Abstract methods must be implemented by the derived class; if the derived class doesn't implement every abstract method, TypeScript will throw an error.

```ts
abstract class EdibleThing {
  name: string;
  abstract eat(): void;
  constructor(name: string) {
    this.name = name;
  }
}
class Fruit extends EdibleThing {
  constructor(name: string) {
    super(name);
  }
  eat() {
    console.log(`Yum. ${this.name}s are tasty.`);
  }
}
```
