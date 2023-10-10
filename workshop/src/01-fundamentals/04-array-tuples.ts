/**
 * Arrays and tuples
 * =================
 *
 * Arrays an tuples types compile to javascript arrays,
 * but they behave different at the type level. Arrays are
 * just like arrays but they are can be constraint to one type.
 *
 * Tuples are arrays with fixed length and you have to constraint
 * each index to a type
 */

type StringArray = string[]
type StringOrNumberArray = (string | number)[]
type OtherStringOrNumberArray = Array<string | number>
type StringTuple = [string, string]
type Tuple1 = [number, string, boolean, 1, 1]

/**
 * You can index tuples to get the type at that particular index
 * the same way you can use keys to index objects
 */

type TupleIndex1 = Tuple1[1]
type TupleIndex2 = Tuple1[2]
type TupleIndex3 = Tuple1[3]
type TupleIndex123 = Tuple1[1|2|3]

/**
 * Another power that typescript adds to tuples is the option of
 * naming indices to disambiguate the purpose of their value.
 */

type FullName = [firstName: string, lastName: string]

const myName: FullName = ['Link', 'Zelda']

/**
 * Keep in mind the naming will only live in the type definition. It
 * won't add any other functionality like indexing by that name.
 */

type FirstName = FullName['firstName'] // error: property `firstName` not exist on type FullName

const firstName = myName.firstName // error: property `firstName` not exist on type FullName

/**
 * The name does show up if you hover over the index when indexing,
 * or with autocomplete when accessing by dot notation
 */

const actualFirstName = myName[0]

// You can have optional indices as long as they at the end of the type

type FirstNames = [
    firstName: string,
    secondName?: string,
    otherNames?: string[]
]
type Point = [number, number, number?]

/**
 * Another great thing you can do with types is concatenating them
 * to create a new tuple.
 */

type FullNameAndPoint = [...FullName, ...Point]

/**
 * When you working with arrays, you can still extract their type by indexing,
 * but you should index with the number type.
 */

type StringArrayType = StringArray[number]
type StringOrNumberArrayType = StringOrNumberArray[number]
type OtherStringOrNumberArrayType = OtherStringOrNumberArray[number]

/**
 * You can combine tuples and arrays with variadic tuples to create
 * arrays that capture some invariance.
 */

type NonEmpty = [string, ...string[]]
type PhoneNumber = ['+', ...number[]]
type UserTuple = [
    name: string,
    age?: number,
    ...addresses: string[]
]

/**
 * With this kinds of variadic tuples you can share types of parameters
 * between several function
 */

function createUser(...args: UserTuple) {
    const [name, age, ...addresses] = args
}

createUser('Link', 28, 'private info')
createUser('Riju', 18)
createUser('Sidon')
createUser('Zelda')

// The line below is to help us create a scope for the file.

export {}
