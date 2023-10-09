/**
 * Objects and records
 * ===================
 */

/**
 * Objects
 * -------
 * 
 * Objects types describe a javascript object. They are defined
 * almost the same way as we define the javascript ones. We have
 * some keys and say what types can that key hold
 */


type BlogPost = {
    title: string,
    author: string,
    id: number
}

const simpleBlogPost: BlogPost = {
    title: 'Typescript objects are easy',
    author: 'Mollock',
    id: 1
}

/**
 * Be careful with object assignability. In the next example we can
 * see that if you define an object inline typescript won't let you
 * add extra keys to the object
 */

const postWithTagsInline: BlogPost = {
    title: 'Science of bread making',
    author: 'Hetor',
    id: 2,
    tags: ['Science', 'Bread', 'Baking'] // ts error
}

/**
 * If we first create the object without providing the type and then
 * assign it to a variable with the type 'BlogPost', typescript will
 * see it as compatible and allow it
 */

const postWithTags = {
    title: 'Science of bread making',
    author: 'Hetor',
    id: 2,
    tags: ['Science', 'Bread', 'Baking']
}

const blogPost: BlogPost = postWithTags

/**
 * This means that you have no guarantee that an object of some type
 * does not contain extra props! This is reflected on the `Object.keys()`
 * function asi it returns string[] instead of only the keys of that object.
 */

// You can read the type of a key by using square brackets

type BlogTitleType = BlogPost['title']

/**
 * You can also make use of union of literal types to gen an 
 * union of the types of those keys
 */

type BlogTitleOrID = BlogPost['title' | 'id']

/**
 * Another useful thing you can do is get all the keys of the object as
 * an union of their literal type. This will be useful when we get to
 * more advanced use cases.
 */

type BlogPostKeys = keyof BlogPost

let blogPostKeys: BlogPostKeys = 'title'
blogPostKeys = 'author'
blogPostKeys = 'id'
blogPostKeys = 'tags'

/**
 * You might want to some optional properties in your object. To achieve
 * this, you can mark a property with a question mark `?`
 */

type Comment = {
    title: string,
    author: string,
    id: number,
    starRating?: number,
}

const oldComment: Comment = {
    title: 'This is confusing',
    author: 'Grog brain',
    id: 1,
    starRating: 3
}

const newComment: Comment = {
    title: 'Quite so!',
    author: 'Grog brain',
    id: 1,
}

/**
 * Records
 * -------
 * 
 * Records are another way of defining objects. That restrict the type
 * of a key to a particular type of value
 */

type RecordOfBooleans = {
    [key: string]: boolean
}

type OtherRecordOfBooleans = Record<string, boolean>

const recordOfBooleans: RecordOfBooleans = {
    isThisWorking: true,
    areYouSure: true,
    isThisAnError: false,
    andThis: 1 // ts error: number not assignable to boolean
}

const otherRecordOfBooleans: OtherRecordOfBooleans = {
    isThisWorking: true,
    areYouSure: true,
    isThisAnError: false,
    andThis: 1 // ts error: number not assignable to boolean
}

/**
 * You can mix this with template literal types to achieve some
 * powerful record types.
 */

type RestrictIsKey = {
    [key: `is${string}`]: boolean,
    [key: string]: string | boolean | number
}

const commentWithIsKeys: RestrictIsKey = {
    title: 'This is confusing',
    author: 'Grog brain',
    id: 3,
    starRating: 3,
    isModerated: false,
    isDraft: false,
    isNumber: 1 // ts error: number not assignable to boolean
}

// The line below is to help us create a scope for the file.

export { }
