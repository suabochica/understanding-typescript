/**
 * Recursive types
 * ===============
 *
 * Recursion at the type level is a way to look through types. The main
 * caveat is that the type language don't support imperative programming,
 * it is a pure functional language. That means we need to use a recursive
 * function to over a type.
 */

type Column = { name: string, values: unknown[]}
type Table = [Column, ...Column[]]
type UserRanking = [
    {name: 'Names', values: ['Link', 'Zelda', 'Ganon']},
    {name: 'Scores', values: [10, 10, 5]},
    {name: 'Rank', values: [1, 2, 3]}
]

type GetColumn<List, Name> =
    List extends [infer First, ...infer Rest]
    ? First extends { name: Name, values: infer Values }
        ? Values
        : GetColumn<Rest, Name>
    : undefined;

type Names = GetColumn<UserRanking, 'Names'>
type Scores = GetColumn<UserRanking, 'Scores'>
type Rank = GetColumn<UserRanking, 'Rank'>

/**
 * If you know a bit of programming you might be familiar with the higher
 * order function like `map`, `filter` and `reduce`. Lets look examples.
 */

const example = [1, 2, 3, 4]
const mapResult = example.map((x) => x * x) // [1, 4, 9, 16]
const filterResult = mapResult.filter((x) => x > 5) // [9, 16]
const reduceResult = filterResult.reduce((sum, x) => sum + x, 0) // [9, 16]

/**
 * When we work at the type level, we cannot accept function as parameters.
 * But, we can hardcode the recursive code that will allow us to have some
 * specific instance of higher order functions.
 */

/**
 * Maps
 * ----
 *
 * In this map example we will take a type of objects that have a name
 * property and return a tuple of the names.
 */

type GetName<User> =
    User extends { name: infer Name } ? Name : unknown;

type ToNames<List> =
    List extends [infer First, ...infer Rest]
        ? [GetName<First>, ...ToNames<Rest>]
        : [];

type TupleNames = ToNames<[
    {id: 1; name: 'Link'},
    {id: 2; name: 'Zelda'},
    {id: 3; name: 'Ganon'},
    {id: 4}
]>

/**
 * All map loops will have the following structure, where you can use custom
 * function to map a value into another.

type SomeMapLoop<List> =
    List extends [infer First, ...infer Rest]
        ? [YourTypeFunction<First>, ...SomeMapLoop<Rest>]
        : []
 */

/**
 * Filters
 * -------
 *
 * Filter loop remove some element based on a condition
 */

type OnlyStrings<List> =
    List extends [infer First, ...infer Rest]
        ? First extends string
            ? [First, ...OnlyStrings<Rest>]
            : OnlyStrings<Rest>
        : []

type onlyValidNames = OnlyStrings<TupleNames>

/**
 * All filter loops will have the following structure:

type SomeFilter<List> =
    List extends [infer First, ...infer Rest]
        ? First extends YourTypeCondition
            ? [First, ...SomeFilter<Rest>]
            : SomeFilter<Rest>
        : []
 */

/**
 * Reducers
 * --------
 *
 * Reduce loop transforms an accumulator using each element of a list
 */

type FromEntries<Entries, Acc = {}> =
    Entries extends [infer Entry, ...infer Rest]
        ? FromEntries<
            Rest,
            Entry extends [infer Key extends string | number | symbol, infer Value]
                ? Acc & {[ K in Key]: Value}
                : Acc
        >
        : Acc

type User = FromEntries<[
    ["name", "Link"],
    ["age", 29],
]>

/**
 * All reduce loops will have the following structure, where you can use
 * custom accumulator and any logic to convert and entry into the accumulator.
 *

type SomeReduce<Tuple, Acc = {YourInitialAcc}> =
    Tuple extends [infer First, ...infer Rest]
        ? SomeReduce<Rest, YourLogic<Acc, First>>
        : Acc
 */

// The line below is to help us create a scope for the file.

export { }
