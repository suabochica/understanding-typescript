/**
 * Set Theory
 * =========
 *
 * Unions and intersection are sets in set theory
 *
 * Unions
 * ------
 *
 * When talking of unions, you can think of it as a type
 * that is able to be one type OR another. Another way of
 * thinking about it is a super set that contains both types.
 */

type NumberOrString = number | string

let validNumberOrString: NumberOrString = 1

validNumberOrString = 'hello'
validNumberOrString = true // error: type boolean is not assignable to NumberOrString

/**
 * This alone is helpful, but it becomes more powerful if
 * we make use of literal types to represent a subset of
 * valid values.
 */

type PowerUps = 'mushroom' | 'fireFlower' | 'leaf'

let currentPowerUp: PowerUps = 'mushroom'

currentPowerUp = 'leaf'
currentPowerUp = 'spring' // error: type spring is not assignable to PowerUps

// You can use unions with any type, even objects.

type User = {
    name: string,
    id: number,
    nickname: string
}

type SuperUser = {
    name: string,
    id: number,
    role: 'moderator' | 'admin' | 'root'
}


/**
 * Try to return the id of the user and see how typescript will
 * autocomplete the keys that are shared by User and SuperUser
 */

function getUserId(user: User | SuperUser): number {
    return user.id
}

/**
 * Intersections
 * -------------
 *
 * Intersection define a type that is simultaneously both types.
 * This might seams weird if try to think about it in terms of the
 * basic types, how can something be a number and a string at the
 * same time? It cannot, but they are really useful when use
 * with literal types or object types
 */

type Fruits = 'orange' | 'apple' | 'banana' | 'grape'
type SunsetColors = 'orange' | 'yellow' | 'white' | 'red'
type StopLightColors = 'green' | 'yellow' | 'red'

type FruitsAndColors = Fruits & SunsetColors
type SunsetColorsAndStopLightColors = StopLightColors & SunsetColors
type FruitsAndStopLightColors = Fruits & StopLightColors

type HyperUser = User & SuperUser

/**
 * This is an utility type that will help us take a peak at the
 * properties of the intersection type
 */

type Identity<T> = T extends object ? {} & {
    [P in keyof T]: T[P]
}: T

type IdentityHypeUser = Identity<HyperUser>

/**
 * Special type
 * ------------
 *
 * There are some special types that are tied up to set theory.
 * Unknown would be the first one we will look at, it is the superset
 * of every type that means you can assign anything to it.
 */

let something: unknown = { test: 'jum!'}
something = 'hello'
something = true
something = 10

/**
 * The problem with unknown is that typescript cannot know anything
 * of the value that contains, so it wont let you do almost anything
 */

something = something + 10 // error: something is of type 'unknown'
something.toString() // error: something is of type 'unknown'

/**
 * On the opposite side we have 'never'. It represent and empty set.
 * This is used to represent a value that won't exist at runtime
 */

function panic(): never {
    throw new Error('No value will ever be return')
}

const oops: never = panic()

/**
 * It is also the subtype of every other type, giving it the property
 * to be compatible to any type
 */

const number: number = panic()
const string: string = panic()
const hyperUser: HyperUser = panic()
const doesThisMakesSense: boolean = panic()

/**
 * And then we have the outlier, 'any'. Usually the use of any is not
 * recommended. You can thin of it as a way to get out of typescript
 * type safety and allow you to do whatever want. The problem with any
 * is that it is at the same time the super set and the ub set of every type
 */
const whatever: any = 2
whatever.chartAt(3)

const whatIsThis = whatever + 10

function negate(value: boolean) {
    return !value
}

const imConfused = negate(whatever)

// The line below is to help us create a scope for the file.

export {}
