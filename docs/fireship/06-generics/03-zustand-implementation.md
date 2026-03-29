# Zustand Implementation

Types exist not only to tell the TypeScript compiler how your program works. They also serve as great documentation for other developers who might want to know how to use your API. Reading the type definitions of other projects can help us understand how an API is supposed to be used and help us better understand how to write good types.

Zustand is a state management library for JavaScript. It has support for React, but can be used with any JavaScript framework, or by itself. It has a simple API which uses Generics to make it really easy to work with your state. We're going to take a tour of the API and see how it's implemented.

Here's a sample of how the API works, from the Zustand documentation.

```ts
import create, { State } from "zustand/vanilla"; // We won't use any of the React APIs

interface BearStore extends State {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}

// Create our store using the interface we defined earlier.
const store = create<BearStore>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// Call one of the functions we defined
store.getState().increasePopulation();

// Log the current value of the state
console.log(store.getState().bears);

// Update the state
store.setState({ bears: 10 });

// This subscribes to updates. Whenever `state.bears` changes, it will log it to the console.
const unsubscribeFunction = store.subscribe(
  (store) => console.log(store.bears),
  (state) => state.bears,
);
```

Notice how I'm importing the `State` type from Zustand. This is a type which our state interface has to extend, because Zustand only expects objects to be used as the store. This is a handy bit of type checking to ensure that is the case.

Lets start by taking a look at that `create` function.

```ts
function create<TState extends State>(
  createState: StateCreator<TState>,
): StoreApi<TState>;
This is the function signature. It has a single generic, TState which has a type constraint extends State. Before we go any further, lets look at that constraint.

type State = Record<string | number | symbol, any>;
```

`Record` is a utility type. It takes in two generic parameters: a `string | number | symbol`, and `any`. It uses the first as an index type and the second as the type of the value. Basically, it represents any kind of object or array. Using it as a type constraint means `TState` has to be an object or array; we can't use a `string` or `number` for `TState`.

Back to the create function.

```ts
function create<TState extends State>(
  createState: StateCreator<TState>,
): StoreApi<TState>;
Our function takes a createState parameter which has a type of StateCreator<TState>. It's passing our generic type TState in as a generic to StateCreator. Lets take a look at that definition.

type StateCreator<TState extends State> = (
  set: SetState<TState>,
  get: GetState<TState>,
  api: StoreApi<TState>,
) => T;
```

`StateCreator` is a `type` alias for a function definition. This function has three parameters: `set`, `get`, and `api`, and it passes our `TState` generic in to all three of them. Finally, the function returns a value of the type `TState`, and that return value becomes our `store` object.

This is the function we use when we create our store. In fact, we used the `set` parameter in the `increasePopulation` and `removeAllBears` functions. Let's dive in one level deeper and see what `SetState` is doing.

```ts
type PartialState<TState extends State> =
  | Partial<TState>
  | ((state: TState) => Partial<TState>)
  | ((state: TState) => void);

type SetState<TState extends State> = (
  partial: PartialState<TState>,
  replace?: boolean,
) => void;
```

`SetState` once again uses our `TState` generic, and uses it in a function. The first parameter, `partial`, uses the `PartialState` type. This is a Union type which represents three things.

First, it includes `Partial<TState>`. `Partial` is another utility type. It makes all of the properties of whatever type you pass in optional. This lets us pass in only a part of our state, instead of needing to pass in a complete copy of our state with only a small change. We use that in the `removeAllBears` function.

Second, we can pass in a function with our state `TState` as a parameter that returns `Partial<TState>`. This lets us modify a part of our state based on the current state. We use that in the `increasePopulation` function.

Finally, we can pass in a function with our state `TState` as a parameter that returns `void`. This is used by Zustand to indicate that we actually don't want to make any changes to our state.

So, to recap, the `SetState` function gives us three options which we can use for the first `partial` parameter. The second parameter is an optional `boolean` that tells Zustand whether we want to outright replace our state instead of changing a small part. Our `SetState` function returns void, meaning it doesn't return anything of value.

We dived pretty deep on this part. Let's go back to the complete signature of `create`.

```ts
function create<TState extends State>(
  createState: StateCreator<TState>,
): StoreApi<TState>;
```

The final part of this signature is the return value: `StoreApi<TState>.` This ends up being the type of `const store`, so it's pretty important. Let's take a look at how it works.

```ts
interface StoreApi<T extends State> {
  setState: SetState<T>;
  getState: GetState<T>;
  subscribe: Subscribe<T>;
  destroy: Destroy;
}
```

The `TState` extends State signature probably looks very familiar at this point. We already know what `SetState<TState>` does. Let's look at `GetState<TState>` next.

```ts
type GetState<TState extends State> = () => T;
```

Well, that's simple. It's a type signature for a function that does one thing: Return our store. Remember, in this case, we passed the type of our store in as the generic `TState`, and that's all that this returns.

We'll look at `Destroy` next.

```ts
type Destroy = () => void;
```

This is a function that takes no parameters and returns nothing. It cleans up the store and removes any subscription listeners, so it doesn't need a complicated type definition.

subscribe: `Subscribe<TState>`, on the other hand, is a little bit more involved, so we'll take it extra slowly. `subscribe` lets us create a function which is called whenever we make changes to our state. Optionally, we can provide a selector, which is a function that tells the subscription to only fire when a _particular_ bit of state changes.

```ts
interface Subscribe<TState extends State> {
  (listener: StateListener<TState>): () => void;
  <StateSlice>(
    listener: StateSliceListener<StateSlice>,
    selector: StateSelector<TState, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>,
  ): () => void;
}
```

This is an interface that defines a function with two overloads. We'll go over each of them separately, pretending like each is the only definition of the function.

```ts
type StateListener<TState> = (state: TState) => void;

interface Subscribe<TState extends State> {
  (listener: StateListener<TState>): () => void;
}
```

The first overload accepts a parameter called `listener` which is a `StateListener<TState>`. We can see in the definition above that `StateListener<TState>` is a function with a parameter for our `state` that returns `void`. This lets us pass a `StateListener` function which is called with our state whenever anything in the state changes. The `Subscribe` function also returns another function, known as the `unsubscribe` function, which takes no parameters and returns `void`. Calling this will deactivate our subscription, making it so our `StateListener` function isn't called anymore.

The second overload is more complicated.

```ts
interface Subscribe<TState extends State> {
  <StateSlice>(
    listener: StateListener<StateSlice>,
    selector: StateSelector<TState, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>,
  ): () => void;
}
```

The second overload creates a new generic just for this function, called `StateSlice`. The syntax for this is different than other generic functions, since it is being defined inside an interface. `StateSlice` represents a small part of the state, as defined by the `StateSelector<TState, StateSlice>`.

```ts
type StateSelector<TState extends State, U> = (state: TState) => U;
```

This function isn't too complicated by itself. It takes in our state `TState` and returns `U`. Remember, when this function is defined in `Subscribe`, `U` is really `StateSlice`. What's happening is we're transforming TState into `StateSlice`, and then using `StateSlice` everywhere else in our `Subscribe` function.

Let's see what the optional `equalityFn?: EqualityChecker` is doing with `StateSlice`.

```ts
type EqualityChecker<StateSlice> = (
  state: StateSlice,
  newState: any,
) => boolean;
```

This function takes in our state `StateSlice`. It also takes in `newState`, which is `any`. It then returns a `boolean`. The purpose of this function is to see if our state actually changed. If the function returns t`r`ue, then the new state is effectively the same as the old state and the subscription doesn't fire. If the function returns `false`, then the new state is different from the old state, and the subscription fires.

Finally, `StateListener` is the same as the first overload, but is passed `StateSlice` instead of `TState`.

That's the whole implementation. Zustand uses generic to make it possible to store just about any kind of state, while only creating about 15 type definitions. That's a pretty lean API!

Hopefully we've learned a bit more about the power of Generics and how to compose them together to create flexible APIs.
