/**
 * Type, aliases, interfaces and inference
 * =======================================
 */

// Lets look at different types

const name: string = 'Holi'
const score: number = 1
const isUserActive: boolean = false
const profilePicture: undefined = undefined
const deleteUser: null = null
const id: symbol = Symbol('1')

const user: {
    name: string,
    score: number,
    isUserActive: boolean,
    profilePicture: undefined,
    deleteUser: null,
    id: symbol
} = { name, score, isUserActive, profilePicture, deleteUser, id }

enum userLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

userLevel.high

const anyUser: any = user
anyUser.location

const what: never = null
const images: string[] = ['path/1', 'path/2']
const stickPosition: [number, number] = [0, 0]
const deleteUserFunction: (user: {
    name: string
    score: number,
    isUserActive: boolean,
    profilePicture: undefined,
    deleteUser: null,
    id: symbol
}) => void = (user) => { }

/**
 * We are seen a lot of duplicated types here and it might get out of hand
 * really quickly. Typescript give us the option to create our own types with
 * aliases and interfaces. Lets look at that.
 */

type Name = string
const nameType: Name = 'Link'

type Point = [number, number]

interface User {
    name: string
    score: number,
    isUserActive: boolean,
    profilePicture: undefined,
    deleteUser: null,
    id: symbol
}

const secondUser: User = {
    name,
    score,
    isUserActive,
    profilePicture,
    deleteUser: (user) => { },
    id

}

/**
 * Now, yu might be thinking, there is still to verbose. This is not that
 * friendly and make it hard to read. Well, we might have been a little bit too
 * excessive when annotating our types. Typescript can do type inference
 * and it might help us
 */

const newName = 'holi'
const newScore = 1
const newIsUserActive = false
const newProfilePicture = undefined
const newDeleteUser = (user: User) => { }
const newId = Symbol('1')


const thirdUser: User = {
    name: newName,
    score: newScore,
    isUserActive: newIsUserActive,
    profilePicture: newProfilePicture,
    deleteUser: newDeleteUser,
    id: newId
}

const point = [0, 0]

/**
 * Be careful with type inference, as some types like tuples are not inferred
 * by default. In this case, it is defaulted to number[] and not [number, number].
 * You can fix this error by annotating point as a tuple [number, number] or its
 * type alias Point
 */

const newStickPosition: Point = point

// We also have literal types to refer only to one possible values

type Error = 'error'

// You can have literal types to represent any of the basic types

type One = 1
type True = true
type Decimal = 10.02


// The line below is to help us create a scope for the file.

export { }