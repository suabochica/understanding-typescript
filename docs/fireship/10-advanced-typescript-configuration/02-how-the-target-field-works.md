# How The `target` Field Works

The `lib` property lets us specify what version of JavaScript our _source_ files can use; the `target` property lets us say what version of JavaScript our _output_ files use. This is useful when we want to use newer features of JavaScript while still supporting older browsers and environments.

The default setting for `target` is "ES3", which means it supports all the way back to Internet Explorer 8! These days, it's rare for anyone to be using a browser that doesn't support at least ES2015, so we can usually change the `target` field to `ES2015`. Supporting more recent JavaScript versions, like `ES2019`, might decrease the size of your bundle and make your program more efficient, since you don't have to include large polyfills and JavaScript engines can optimize newer syntax to make it faster than older syntax. Ultimately, the choice is up to you and what browser versions your users have.

In short, pick a `lib` value that covers what code you'll be _writing_, and pick a `target` value that covers your code _output_. You want your `target` to be as recent as possible, while still supporting all the people that need to run your code.

Just for fun, let's see how a simple piece of TypeScript code is compiled into different targets.

Source:

```ts
class Fruit {
  constructor(public name: string, public color?: string) {}
}
class FruitBasket {
  static maxFruit: number = 5;
  #fruitList: Fruit[] = [];
  addFruit(fruit: Fruit) {
    // Throw away green fruit
    if (fruit?.color === "green") return;
    if (this.#fruitList.length < FruitBasket.maxFruit) {
      this.#fruitList.push(fruit);
    }
  }
  eat() {
    this.#fruitList.pop();
  }
}
```

ES5 (20 lines longer):

```js
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError(
        "attempted to get private field on non-instance",
      );
    }
    return privateMap.get(receiver);
  };
var Fruit = /** @class */ (function () {
  function Fruit(name, color) {
    this.name = name;
    this.color = color;
  }
  return Fruit;
})();
var FruitBasket = /** @class */ (function () {
  function FruitBasket() {
    _fruitList.set(this, []);
  }
  FruitBasket.prototype.addFruit = function (fruit) {
    // Throw away green fruit
    if (
      (fruit === null || fruit === void 0
        ? void 0
        : fruit.color) === "green"
    )
      return;
    if (
      __classPrivateFieldGet(this, _fruitList).length <
      FruitBasket.maxFruit
    ) {
      __classPrivateFieldGet(this, _fruitList).push(fruit);
    }
  };
  FruitBasket.prototype.eat = function () {
    __classPrivateFieldGet(this, _fruitList).pop();
  };
  var _fruitList;
  _fruitList = new WeakMap();
  FruitBasket.maxFruit = 5;
  return FruitBasket;
})();
```

ES5 doesn't have class support, so it has to make the necessary adjustments to the prototype of `FruitBasket` to make it behave like a class.

To get private fields working, ES5 has to add a special polyfill which uses a WeakMap to keep track of the fruit list. That adds a considerable number of lines to the output, and isn't as performant as proper private fields could be.

Since this polyfill requires `WeakMap` support, this polyfill isn't even compatible with ES5. We would have to use TypeScript `private` fields instead.

ES2015 (18 lines longer):

```js
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError(
        "attempted to get private field on non-instance",
      );
    }
    return privateMap.get(receiver);
  };
var _fruitList;
class Fruit {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}
class FruitBasket {
  constructor() {
    _fruitList.set(this, []);
  }
  addFruit(fruit) {
    // Throw away green fruit
    if (
      (fruit === null || fruit === void 0
        ? void 0
        : fruit.color) === "green"
    )
      return;
    if (
      __classPrivateFieldGet(this, _fruitList).length <
      FruitBasket.maxFruit
    ) {
      __classPrivateFieldGet(this, _fruitList).push(fruit);
    }
  }
  eat() {
    __classPrivateFieldGet(this, _fruitList).pop();
  }
}
_fruitList = new WeakMap();
FruitBasket.maxFruit = 5;
```

We are able to shave off a few lines of implementation by using ES2015 classes instead of prototypes. Private fields are still not supported, so we need that lengthy polyfill at the top.

ESNext (6 lines longer)

```js
class Fruit {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}
class FruitBasket {
  constructor() {
    this.#fruitList = [];
  }
  #fruitList;
  addFruit(fruit) {
    // Throw away green fruit
    if (fruit?.color === "green") return;
    if (this.#fruitList.length < FruitBasket.maxFruit) {
      this.#fruitList.push(fruit);
    }
  }
  eat() {
    this.#fruitList.pop();
  }
}
FruitBasket.maxFruit = 5;
```

A future version of JavaScript will ship with proper private field support, which will dramatically reduce the implementation size by getting rid of the polyfill. Without the polyfill, we won't need to use that WeakMap hack, which should provide more security and more opportunity for browser efficiency improvement.