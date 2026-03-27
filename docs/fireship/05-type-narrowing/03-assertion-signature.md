# Assertion Signatures

We'll start this section off with an example. Lets suppose we're trying to create a dynamically generated graphic using the Canvas API. We already have a `<canvas>` element in the HTML of the page, so we can just access it using our DOM APIs. Once we have reference to the element, we can create a 2D drawing context, and then start making graphics.

TypeScript knows the types which are returned by `document.getElementById` and `canvas.getContext`, so we should be able to use them without applying any type annotations.


```ts
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // Type Error: Property 'getContext' does not exist on type 'HTMLElement'.

```

Oh, that's a bummer. It looks like `document.getElementById` returns an `HTMLElement` instead of the `HTMLCanvasElement` that we need, even though we know the element is most certainly a `<canvas>` element. Well, let's try adding a type annotation to our canvas variable.


```ts
const canvas: HTMLCanvasElement = document.getElementById("canvas");
// Type Error: Type 'HTMLElement' is missing the following properties from type 'HTMLCanvasElement': height, width, ...

```

Oh no! The `HTMLElement` type which is returned by getElementById is not assignable to a variable with the type `HTMLCanvasElement`. That's because `HTMLElement` doesn't have the necessary properties defined to make it compatible with `HTMLCanvasElement`.

But we know that it is in fact a `<canvas>` element! We just need a way to tell TypeScript that.

## Assertion Signatures

To _assert_ to the type checker that a value has a specific type, we just append the keyword `as`, followed by the type we want to assert. This tells the TypeScript type checker that a certain value is in fact the type we say it is.


```ts
const canvas = document.getElementById(
  "canvas",
) as HTMLCanvasElement;
const context = canvas.getContext("2d");

```

TypeScript trusts us to know what we're doing, and now lets us access the properties on `HTMLCanvasElement`.

Once again, this is a situation where we know more than TypeScript and get to override the behavior of the type checker. TypeScript isn't doing any runtime checks for us to make sure that canvas really is a `HTMLCanvasElement`. Any time we do this, we run the risk of being wrong and creating type errors which the type checker can't catch for us.

Still, Assertion signatures are safer than most methods, since the type checker will verify that the type we are asserting is at least similar to the original type. That keeps us from asserting that one type is a totally incompatible type.


```ts
let fruitName: number = "banana" as number;
// Type Error: Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other.
The type checker is even smart enough to avoid conversions between interfaces that aren't similar enough.

interface Car {
  make: string;
  model: string;
  color: string;
}
interface Fruit {
  name: string;
  color: string;
  sweetness: number;
}

let car: Car = {
  make: "Pontiac",
  model: "Sunfire",
  color: "silver",
};
let fruityCar: Fruit = car as Fruit;
// Type Error: Conversion of type 'Car' to type 'Fruit' may be a mistake because neither type sufficiently overlaps with the other.
//   Type 'Car' is missing the following properties from type 'Fruit': name, sweetness
```

Let's look at another example. One of features of HTML `<form>` tags is that you can easily access any of the inputs on it by the `name` property. Take a look at this form:


```html
<form>
  <label for="name">Name</label>
  <input id="name" name="name" type="text" />
  <label for="email">Email Address</label>
  <input id="email" name="email" type="text" />
  <button type="submit">Submit</button>
</form>

```

In TypeScript, we can attach an event listener to this forms 'submit' event and access the inputs. Here, I'm using optional chaining to access a few of these properties.

```ts
document
  .querySelector("form")
  ?.addEventListener("submit", (event) => {
    const email = event.currentTarget?.email;
    // TypeError: Property 'email' does not exist on type 'EventTarget'.
  });

```
There's no way for TypeScript to know whether that form has an input named `email`, so we can't access it immediately. However, if we are certain our form will have that element, we can use an intersection type to add that property to the `EventTarget` type. We'll also use a union with null, since `event.currentTarget` _might_ be null;


```ts
document.querySelector("form")?.addEventListener("submit", (event) => {
  const target = event.currentTarget as
    | (EventTarget & { email: HTMLInputElement })
    | null = ;
  const email = target.email;
});

```
Now, we can access the `email` input on our form.

## Double Assertion Signatures

We're about to dive into something that is _exceptionally_ dangerous. Only do this if you are confident you won't introduce any type errors.

We can convince TypeScript that any value of any type has any other type. It all starts by giving a value an assertion that it is `unknown`. Any value can be converted into `unknown`, so this isn't very strange so far.


```ts
const ageInYears = "too old to count" as unknown;
ageInYears; // const ageInYears: unknown
```

But now, what if we were to add _another_ assertion, turning that unknown type into a different type?

```ts
const ageInYears = ("too old to count" as unknown) as number;
ageInYears; // const ageInYears: number
We can even try to access number properties on our value. This, of course, will throw a type error.

ageInYears.toFixed(8); // Uncaught TypeError: ageInYears.toFixed is not a function
```

This is the most dangerous way to get around the type system, even more dangerous than `any`. Not only does it open you up to unexpected type errors, but TypeScript can't even warn you that they might happen. You've convinced it everything is fine.

This can be helpful when you are certain something should be a certain type and TypeScript isn't letting you convert with a single assertion signature. This is especially useful when you are working with interfaces or third-party APIs which expect parameters to be passed as a certain type.

We should only convert a value's type to `unknown` if there is no other solution. It's much safer for us to convert to a type that is common between the two different types. In this next example, I have a reusable `buttonEventListener` function which only accepts `HTMLButtonElement` values. However, I can use it with an `HTMLAnchorElement` value by first converting my anchor value into the common `HTMLElement` type, and then converting that into an `HTMLButtonElement`.

HTMLElement is similar enough to both types that we can use it without TypeScript warning us, and our code will be more type safe than if we converted our type to unknown, since at very least our value has to match the `HTMLElement` type.

```ts
function buttonEventListener(
  event: string,
  listener: any,
  element: HTMLButtonElement,
) {
  element.addEventListener(event, listener);
}

const anchor = document.createElement("a");
buttonEventListener(
  "click",
  () => console.log("Mouse clicked"),
  anchor,
);
// Type Error: Argument of type 'HTMLAnchorElement' is not assignable to parameter of type 'HTMLButtonElement'.

buttonEventListener(
  "click",
  () => console.log("Mouse moved"),
  (anchor as HTMLElement) as HTMLButtonElement,
);
// no error
```

In this example, our `buttonEventListener` function could be more expressive or allow more types to be used for `element`, but our solution offers a good workaround.

￼