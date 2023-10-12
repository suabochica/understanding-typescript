/**
 * Generics
 * ========================
 *
 * Generics can be thought of as the function of the type world
 */

type SameType<T> = T
type SameString = SameType<string>
type SameLiteral = SameType<2>

/**
 * This might not look impressive, but you can take this to the next level
 * when used with function and type constraints to preserve types and make
 * sure the parameters have some properties
 */

function getAnyTuple(first: any, second: any): [any, any] {
    return [first, second]
}

const anyTuple = getAnyTuple('Link', 28)

function getTuple<TFirst, TSecond>(first: TFirst, second: TSecond): [TFirst, TSecond] {
    return [first, second]
}

const typedTuple = getTuple('Link', 28)

/**
 * The extends keywords is type constrain. This is basically saying `Array` can
 * be any array of the same type as long as it has at least 2 items in it.
 */

function getSecondIndex<T, Array extends [T, T, ...T[]]> (array: Array): Array[1] {
    return Array[1]
}

const secondIndex1 = getSecondIndex([1, 2, 3])
const secondIndex2 = getSecondIndex(['hola', 'hello', 'hallo'])
const secondIndex3 = getSecondIndex(['Link', 28, 'private'])

/**
 * Type constrains can be used with type generics to achieve some
 * powerful utility types
 */

type SecondIndexType<
    T extends [unknown, unknown, ...unknown[]]
> = T[1]

type A = SecondIndexType<[number, string, boolean]>
type UserTuple = [name: string, age: number, ...addresses: string[]]
type B = SecondIndexType<UserTuple>

// The line below is to help us create a scope for the file.

export { }
