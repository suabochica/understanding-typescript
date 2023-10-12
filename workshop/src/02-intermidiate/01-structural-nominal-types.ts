/**
 * Structural Nominal Types
 * ========================
 *
 * Typescript is a structural type system. That just mean it will lok at a type
 * and determine all properties it has and if an another type has the same properties
 * it will be treated as the _same_ type. The opposite would be a nominal type system,
 * like haskell, where the name of the type will be taken into account to decide if a
 * type is compatible or not with another
 */

type Name = string

function printName(name: Name) {
    console.log(name)
}

/**
 * We can see an example of this with the following lines of code. The 'printName'
 * function needs a parameter of type Name. But as Name has the exact same properties
 * of a string , we can pass a string variable to it an it should work no problem.
 */

const myName: string = 'Link Tears'
printName(myName)

/**
 * To make this clearer, let's look an example where we have an `User` type and a
 * `AdminUser` type that shares all the properties from user but adds a new one to
 * show the admin level.
 */

interface User {
    name: string,
    score: number,
    isUserActive: boolean,
    profilePicture: undefined,
    deleteUser: (user: User) => void,
    id: symbol
}

interface AdminUser extends User {
    adminLevel: 'normal' | 'superUser'
}

/**
 * The function `printUserName` receives an user and print the name on it. If we try
 * to pass it and `AdminUser`, it should work with no problem. That is because the type
 * `AdminUser` is compatible with the type `User`
 */

function printUserName(user: User) {
    console.log(user.name)
}

const admin: AdminUser = {
    name: 'Ganondorf',
    score: 1000,
    isUserActive: true,
    profilePicture: undefined,
    deleteUser: (user: User) => { },
    id: Symbol(2),
    adminLevel: 'superUser'
}

printUserName(admin)

/**
 * A structural type system have some advantages as flexibility without loosing the
 * safety of it. However, nominal type system also favor other features. For example,
 * you might have a function that is able to validate and sanitize a string. You might
 * want to only allow validated strings on certain functions. You can use the following
 * convention to fake the behavior of a nominal type on typescript
 */

type ValidatedInputString = string & { __brand: 'User Input Post Validation' }

const validateUserInput = (input: string) => {
    const simpleValidatedOutput = input.replace(/\</g, '<-')

    // We use type assertions to assign the type ValidatedInputString to return the value
    return simpleValidatedOutput as ValidatedInputString
}

const printValidatedName = (name: ValidatedInputString) => {
    console.log(name)
}

const name = admin.name // error: Cannot redeclare block-scoped variable

/**
 * We will get an error if we try to pass the `printValidatedName` function a normal string
 * as it is expecting a `ValidatedInputString` which has the property `__brand` on it, while
 * a normal string does not, making it non compatible. But one caveat is that `ValidatedInputString`
 * is still assignable to a string.
 */

printUserName(name) // error: 'name' is deprecated

const validatedName = validateUserInput(name) // error: 'name' is deprecated

printName(validatedName)
printValidatedName(validatedName)

// As bonus, any user can easy use type assertions to circumvent the requirement of a validated string

printValidatedName(name as ValidatedInputString)

// The line below is to help us create a scope for the file.

export { }

