# `type` Aliases

Interfaces allow us to give names to the shape of objects. Objects aren't the only types we encounter in our program, though. For example, we might use the same Tuple type in multiple places, which means redefining it several times over. In this first example, we use a tuple of three `numbers` to represent a point in 3D space.


```ts
let position: [number, number, number] = [27, 31, 5];

function calculateDistance3D(
  point1: [number, number, number],
  point2: [number, number, number],
): number {
  // TODO: Use distance formula
}
```

That's a lot of duplication, and a Tuple of three numbers could represent many different things.

`type` aliases allow us to give names to any other type or combination of types. It looks very similar to setting a variable, except instead of let or const we use type, and instead of a value we use a type annotation. Once we've defined our alias, we can use it on variable definitions the same way we use interfaces.

Let's see what our 3D coordinates look like as a type alias.


```ts
type Coordinates3D = [number, number, number];

let position: Coordinates3D = [27, 31, 5];

function calculateDistance3D(
  point1: Coordinates3D,
  point2: Coordinates3D,
): number {
  // TODO: Use distance formula
}
```

Now our function declaration is much cleaner and we can see more clearly what the type represents.

Any type or type combination can be used with a type alias.

```ts
type FruitList = string[];

const fruit: FruitList = ["Apple", "Orange"];
```

Writing type aliases doesn't create a new type; any value that is compatible with the alias' type will be compatible with the alias. For example:

```ts
type FruitList = string[];
interface IndexedFruitList {
  [index: number]: string;
}

const fruit: FruitList = ["Apple", "Orange"];
const otherFruitList: string[] = fruit; // This works
const indexedFruitList: IndexedFruitList = fruit; // This also works
```

We can do more interesting things with type aliases too, like self-referential types. Here's a type which represents a tree of strings. Optionally, we can put a left or right value, which is another branch on the tree with its own value and its own left and right branch.

```ts
type StringTree = {
  value: string;
  left?: StringTree;
  right?: StringTree;
};

let myStringTree: StringTree = getStringTree();
myStringTree.value; // string
myStringTree?.left?.right?.left?.value; // string | undefined
```

Above, you might have noticed the interesting `string | undefined` type annotation. Remember that adding `?:` to our type annotations marks those types as optional, which means they might be undefined. We use optional chaining to access the value, but using optional chaining means the value could be a string, but it might be undefined. As we've seen before, a type that could be two or more different types is called a Union type, and it's annotated with the vertical bar (`|`), like we just saw. We'll cover this more in the next section.

## Interface or `type`?

Interfaces and `type` aliases are very similar. You might even be wondering why TypeScript has two constructs which perform basically the same function. They have subtle differences which can make the difference when deciding whether to use one over the other.

Interfaces support extension using the `extends` keyword, which allows an Interface to adopt all of the properties of another Interface. Because of this, Interfaces are most useful when you have hierarchies of type annotations, with one extending from another.

`type` aliases, on the other hand, can represent any type, including functions and Interfaces!

```ts
interface Fruit {
  name: string;
  color: string;
  sweetness: number;
}

type FruitType = Fruit;

type EatFruitCallback = (fruit: Fruit) => void;
```

When you find yourself writing the same type signature repeatedly, or if you want to give a name to a particular type signature, you want to use a `type` alias. `type` aliases will become more important as we explore more complicated type compositions, such as Union and Intersection types, Generics, and utility types. We'll be diving deeper into all of these in future sections.