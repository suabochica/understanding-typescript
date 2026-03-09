# Union Types

Sometimes we need a value that could be multiple types. For example, we might have a function that measures distance in 2D space. The function accepts either a Tuple of numbers or an object for the x and y coordinates.

const distance1 = measureDistance([1, 2], [1, 3]); // 1
const distance2 = measureDistance({ x: 1, y: 1 }, { x: 1, y: 3 }); // 2

The problem comes when we need to annotate our function. How do you annotate a value that could be either one type or another?

This is where Union types come in. Union types represent values that could be one of any number of types. We've already seen them a couple of times in the course, such as when we used optional chaining to get a value that was either a string or undefined.

For our distance formula example, we'll put a vertical bar (|) between the types to create a Union type that represents both.

interface CoordinateInterface {
  x: number;
  y: number;
}
type CoordinateTuple = [number, number];

type Coordinate = CoordinateInterface | CoordinateTuple;

This reads like "The Coordinate type is either the CoordinateInterface type or the CoordinateTuple type".

Then, in the function which calculates the distance, we have to do a bit of type narrowing to determine whether the value is a Tuple or an object. We'll create a helper function and use Array.isArray to check if it is a Tuple.

function extractXY(point: Coordinate): CoordinateInterface {
  if (Array.isArray(point)) {
    return { x: point[0], y: point[1] };
  } else {
    return point;
  }
}

Then we can use the distance formula to calculate the distance between the points.

function measureDistance(
  point1: Coordinate,
  point2: Coordinate,
): number {
  const { x: x1, y: y1 } = extractXY(point1);
  const { x: x2, y: y2 } = extractXY(point2);
  // Distance Formula
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

Union Types with Common Fields

When we learned about Interfaces, we extended our EdibleThing type to create Fruit and Vegetable. Lets turn that around and create a Union of Fruit and Vegetable that represents both types.

interface Fruit {
  name: string;
  sweetness: number;
}
interface Vegetable {
  name: string;
  hasSeeds: boolean;
}
type EdibleThing = Fruit | Vegetable;

Since both members of the EdibleThing union have a name:string field on them, we can access it without TypeScript complaining. However, if we try to access the sweetness or hasSeeds properties without narrowing our type to either Fruit or Vegetable, TypeScript will throw a type error.

function checkForSeeds(food: EdibleThing) {
  console.log(food.hasSeeds);
  // Type Error: Property 'hasSeeds' does not exist on type 'EdibleThing'.
  //   Property 'hasSeeds' does not exist on type 'Fruit'.
}

TypeScript is telling us that at least one of the members of the EdibleThing union doesn't have the necessary property, so it throws a type error. We can't even try to access that property without first performing some type narrowing. We can use the JavaScript in keyword to find out if an object has a particular property.

function checkForSeeds(food: EdibleThing) {
  if ("hasSeeds" in food) {
    console.log(food.hasSeeds);
  }
}

Union Types with null or undefined

One of the most valuable uses of Union types is when working with null and undefined when the TSConfig strictNullChecks flag is on. In fact, you might not have realized it, but TypeScript has already inferred a Union type for us. Any time we use an optional property, optional parameter, or optional chaining, TypeScript automatically infers that as a union with undefined. We can easily check if the value is not undefined with a truthy evaluation.

interface Fruit {
  name: string;
  sweetness?: number;
}

function getSweetness(fruit?: Fruit): number {
  const sweetness = fruit?.sweetness; // const sweetness: number | undefined
  if (sweetness) {
    return sweetness;
  }
  throw Error("'sweetness' is undefined");
}

There are a lot of other interesting things we can do with Union types. We'll cover some of these use cases in future sections.