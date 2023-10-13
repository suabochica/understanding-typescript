/**
 * Conditionals
 * ============
 *
 * We can include conditions on our types definitions.
 */

type User = {
    name: string,
    id: number,
    nickname: string
}

type SuperUser = {
    name: string,
    id: number,
    role: 'moderator' | 'admin' | 'superAdmin'
}

type HypeUser = User & SuperUser

/**
 * The syntax of a conditional type is very similar to a ternary operator.
 * In this context the extends keyword works as a condition asking B
 * compatible with A?
 */

type IsTypeCompatible<A, B> = B extends A ? true : false

type A = IsTypeCompatible<User, SuperUser>
type B = IsTypeCompatible<User, HypeUser>
type C = IsTypeCompatible<SuperUser, HypeUser>
type D = IsTypeCompatible<HypeUser, SuperUser>

/**
 * The extends as a condition does not return a boolean type. That mean you
 * cannot change it for a literal true or false and also you cannot assign
 * the expression directly to a type
 */

type T = true ? true : false;
type Two = 2 extends number

/**
 * You can nest conditions if you want to return a specific type depending on
 * what you can assign the parameter to.
 */

type GetUserTypeName<U> =
    U extends HyperUser ? "HyperUser"
  : U extends User ? "User"
  : U extends SuperUser? "SuperUser"
  : never

const user = {
    name: 'Link',
    id: 1,
    nickname: 'knight'
} as const

const superUser = {
    name: 'Link',
    id: 2,
    role: 'superUser'
} as const

const hypeUser = {
    name: 'Link',
    id: 2,
    nickname: 'knight',
    role: 'superUser'
} as const

const notAnUser = {
    id: 1,
    nickname: 'knight'
} as const

type UserA = GetUserTypeName<typeof user>
type UserB = GetUserTypeName<typeof superUser>
type UserC = GetUserTypeName<typeof hypeUser>
type UserD = GetUserTypeName<typeof notAnUser>

/**
 * Conditional types have a super power with the somewhat new
 * keyword infer. It declares a type variable by destructuring
 * the type on the left-hand side of extends
 */

type GetName<T> = T extends {[key: string]: unknown, name: infer Name} ? Name: never

type UserNameA = GetName<typeof user>
type UserNameB = GetName<typeof superUser>
type UserNameC = GetName<typeof hypeUser>
type UserNameD = GetName<typeof notAnUser>

// The line below is to help us create a scope for the file.

export { }
