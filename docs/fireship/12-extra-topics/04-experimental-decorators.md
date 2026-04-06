# Experimental Decorators

Decorators are an experimental feature of TypeScript that allow you to add extra powers to ES2015 classes. The implementation which TypeScript uses is different from the TC39 proposal (currently in Stage 2), so using decorators is discouraged. However, if you find yourself working in a codebase that uses decorators, it could be helpful to know how they work.

Decorators are functions that we can attach to classes and their members. These decorator functions get different parts of the class as their parameters, and allow us to do something with that class (or class member). Decorators allow us to reuse logic between multiple classes without resorting to class inheritance.

Since this is an experimental feature, you need to turn on the `experimentalDecorators` option in tsconfig.json.

There are several different kinds of decorators; we'll go over each of them.

## Class Decorator

We can attach a function to a class which will be called when that class is instantiated. The function gets the class constructor as it's first parameter. We have to return a class definition. Typically we extend the class that is being decorated.

```ts
type Instantiable = new (...args: any[]) => any;

function makeEdible<TClass extends Instantiable>(target: TClass) {
  return class Edible extends target {
    edible = true;
  };
}
```

We're using the `Instantiable` type to represent any object that can be instantiated using the `new` keyword, including classes. By using the generic `TClass` type to represent our class, we can maintain type safety and only allow our function to be used when decorating classes.

We can then decorate our class using `@` followed by our function.

```ts
@makeEdible
class Fruit {
  constructor(public name: string) {}
}

console.log(new Fruit("Apple")); // class Fruit {name:"Apple", edible:true}
```

Suppose we wanted to pass parameters into our decorator. We can do that by creating a "decorator factory". This is a function which returns our decorator function, and it looks something like this:

```ts
function setEdible(isEdible: boolean = true) {
  return function makeEdible<TClass extends Instantiable>(
    target: TClass,
  ) {
    return class Edible extends target {
      edible = isEdible;
    };
  };
}

@setEdible(false)
class Fruit {
  constructor(public name: string) {}
}
console.log(new Fruit("Apple")); // class Fruit {name:"Apple", edible:false}
```

## Property Decorators

We can use property decorators to add metadata or logic to a class property. This is done using property descriptors, which are explained in much better detail in this [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

We can use it to transform a regular property into an accessor property, with getters and setters. The first parameter is the class prototype; we'll use any to represent it. We also get the name of the property we decorated as the second parameter.

We'll create a set of functions which set the decorated property to be uppercase. We'll store the value outside of the class instance that we don't destroy our call stack with recursive calls to our setter function.

```ts
function Uppercase(target: any, key: string) {
  let val = target[key];

  const getter = () => {
    return val;
  };
  const setter = (newVal: string) => {
    val = newVal.toUpperCase();
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Fruit {
  @Uppercase
  public name = "Apple";
  constructor(name: string) {
    this.name = name;
  }
}

console.log(new Fruit("Apple")); // class Fruit {name:"APPLE"}
```

We can also use the same "function returning another function" factory pattern to create property decorator factories.

## Method Decorators

Method decorators work similarly to property decorators; they are a function where the first parameter is the class prototype and the second is the method name. The third property is the property descriptor for the method which can be modified directly.

```ts
function Loggable(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Executed ${key} method.`);
    return original.apply(this, args);
  };
  return descriptor;
}

class Fruit {
  public name = "Apple";
  constructor(name: string) {
    this.name = name;
  }
  @Loggable
  sayName() {
    console.log(`${this.name} Fruit`);
  }
}
```