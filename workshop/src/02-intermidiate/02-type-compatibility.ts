/**
 * Type compatibility
 * ========================
 *
 * With the context of the structural type system, let's look a bit
 * deeper into type compatibility and some of the no so clear things
 * we might find
 */

interface User {
    name: string,
    isUserActive: boolean,
    profilePicture: undefined,
    deleteUser: (user: User) => void,
    id: symbol,
    setScore: (score: number) => void,
    getScore: () => number,
}

function getRandomNumberUpTo(maxNumber: number): number {
    return Math.random() * maxNumber
}

function flipBinaryDigit( digit: 0 | 1) {
    return digit === 0 ? 1 : 0
}

function getOneOrTwo(): 1 | 2 {
    return Math.random() > 0.5 ? 1 : 2
}

function getRandomNumber() {
    return Math.random()
}

/**
 * Try replacing the `setScore` function with `getRandomNumberUpTo` or
 * `flipBinaryDigit`, and `getScore` with `getOneOrTwo` or `getRandomNumber`
 */

const myUser: User = {
    name: 'Link',
    isUserActive: true,
    profilePicture: undefined,
    deleteUser: (user: User) => {},
    id: Symbol(2),
    setScore: (score: number) => {},
    getScore: () => 1
}

/**
 * With functions the type compatibility is a bit more complex. The parameters
 * of the function should accept at least the same type as specified, the
 * function can have optional parameters not specified, but cannot have extra
 * required parameters not specified.
 */

/**
 * Parameters types
 * ----------------
 */

type NumberFunction = (number: number) => void
type BinaryFunction = (digit: 0 | 1) => void

// The name of the parameter does not affect the compatibility of the function

const numberToString: NumberFunction = (input: number) => {
    return input.toString()
}

// The parameter of the type needs to be compatible with the parameter of the fn.

const flipNumberOrString: NumberFunction = (input: number | string) => {
    if (typeof input === 'string') {
        return Number(input)
    } else {
        input.toString()
    }
}

/**
 * If the parameter of the function is a subtype of the function type, it won't be
 * compatible. Typescript is expecting to pass any number. So, if you try to pass 3
 * to the `flipBinaryDigit` function, it won't work b/c is not compatible.
 */

const flipBinaryDigitAlias: NumberFunction = flipBinaryDigit // error: types are incompatible

/**
 * In this case the parameter function `numberToString` is of type number and the
 * function type `BinaryFunction` expects to be able to pass 1 or 2, both of those
 * are valid numbers, so `numberToString` is compatible with the type `BinaryFunction`.
 */

const numberToStringAlias: BinaryFunction = numberToString

/**
 * Return types
 * ----------------
 */

type ReturnBinary = () => 0 | 1
type ReturnBoolean = () => boolean
type ReturnNumber = () => number


/**
 * The return type of the function should be compatible with the return type of the function type.
 * In the following example `getRandomNumber` returns a number but the type ReturnBinary expects a
 * function that can only return 0 or 1. The number type is not compatible with the union of 0 | 1.
 */

const getRandomNumberAlias: ReturnBinary = getRandomNumber // error: not assignable

/**
 * The next example is the opposite of the previous one. The function `getRandomBinary` returns 0
 * or 1 and the return type of `ReturnNumber` expects a function that return a number. 0 and 1
 * are both compatible with number, so the function `getRandomBinary` is compatible with `ReturnNumber`
 */

const getRandomBinary: ReturnNumber = () => Math.random() > 0.5 ? 0 : 1

// The line below is to help us create a scope for the file.

export { }
