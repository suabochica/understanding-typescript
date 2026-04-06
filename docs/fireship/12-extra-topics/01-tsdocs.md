# Adding TSDocs to Type Annotations

One of the nicest things about using TypeScript is the IDE integrations. The integration lets us hover over values to see their definition, autocomplete object property names, and make sure we're using our types correctly. In many cases, the type definitions alone are enough to not need the documentation for a library.

There are times, however, when there just isn't enough information in the type definitions for us to know what a function does or why each of its parameters are important. Take a look at this screenshot:

![Boring Annotation](https://fireship.dev/course-assets/courses/typescript/adding-tsdocs-to-type-annotations/boring-annotation.png)
￼
We can see the properties and their types, but we don't know why they are important. Is color the color name, or an RGB hex value? What does sweetness represent? Is it a number from 0 to 1, or from 0 to 100, or from -1 to 1? Those kinds of details aren't communicated through the types.

Fortunately, there are other standards that exist which let us add comments above our function and variable declarations to document them in greater detail. The [TSDoc standard](https://tsdoc.org) is based on the existing [JSDoc standard](https://jsdoc.app), but is entirely designed to work with TypeScript.

Let's take a look at how we would annotate the function in the screenshot. All TSDoc annotations start with a multi-line comment with two asterisks, like `/** */`. Adding a single description is as easy as adding text inside that comment block.

```ts
/** A tasty, sweet plant part that you can eat */
type Fruit = {
  name: string;
  color: string;
  sweetness: number;
};
```

In an IDE, it would look something like this:

![Better Annotation](https://fireship.dev/course-assets/courses/typescript/adding-tsdocs-to-type-annotations/better-annotation.png)
￼
That's helpful, but we still don't have details about the `sweetness` property. We can add those using special TSDocs tags. These are added after the main description, by extending the comment down a few lines. Some IDEs add extra asterisks to each line, but it isn't strictly required.

The `@param` tag lets us define properties on interfaces and object types, as well as the parameters for functions. You put the name of the property or parameter after the `@param` tag, followed by a description. We'll use it to add descriptions to each of our Fruit properties.

```ts
/**
 * A tasty, sweet plant part that you can eat
 *
 * @param name - The botanical name of the fruit
 * @param color - The color name of the fruit
 * @param sweetness - Between 1 and 100, with 100 being the most sweet
 */
type Fruit = {
  name: string;
  color: string;
  sweetness: number;
};
```
And hovering over this in our IDE looks something like this:

![Best Annotation](https://fireship.dev/course-assets/courses/typescript/adding-tsdocs-to-type-annotations/best-annotation.png)
￼
You can see how much of a difference this makes in making it easy to understand your API. The `@param` tag works exactly the same with function parameters; we only need to add the `@returns` tag, which let's us add a description to our return value.

```ts
/**
 * Eat a fruit
 *
 * @param fruit - The fruit that we are going to eat
 *
 * @returns The waste from eating the fruit, such as an apple core.
 */
function eatFruit(fruit: Fruit): FruitWaste {
  // ...
}
```
That annotation looks like this in our IDE:

![Function Annotation](https://fireship.dev/course-assets/courses/typescript/adding-tsdocs-to-type-annotations/function-annotation.png)
￼
It doesn't stop there, either. You can add annotations to interfaces, classes, class methods, objects, even individual variables. For example, I can add a note indicating that this `price` variable is actually in USD.

```ts
/**
 * The price in USD
 */
const price = 27.5;
```
There are also tags which can add even more information to your documentation. For example, `@deprecated` can tell users that a specific property or function shouldn't be used anymore; `@example` can be used to write out a full example of how to use a function; `@throws` lets you provide documentation about what kinds of errors a function will throw. You can find more information about all of the possible tags on the [TSDoc website](https://tsdoc.org).

And, of course, TSDoc isn't only intended for use in your browser. There are documentation generators which can read all of the type definitions and TSDoc comments and convert them into a complete documentation page, which is especially helpful for library authors. Instead of maintaining a separate repository of documentation, you write your documentation alongside the code itself.

Overall, in exchange for a bit more writing and code maintenance, you get automatically generated documentation and in-IDE helpers. That might not be worth it for everyone, but at least you have this tool at your disposal.

There are a bunch of other tags which you can add to provide even.

