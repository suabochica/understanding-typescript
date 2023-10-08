/**
 * When you use typescript you will see you write javascript code but adding type annotations.
 * In the `createPlayerObject` function we need to tell typescript what type the parameter of
 * the function are going to be and also what they it is going to return.
 */

function createPlayerObject(name: string, age: number): { name: string, age: number } {
    return { name, age }
}

/**
 * This is help us in many ways; for example, if you try to pass the age as an string it
 * will tell you there is an error
 */

const firstPlayer = createPlayerObject('Link', '28')

/**
 * It will helps because typescript knows what properties or methods your variable has
 * and will show an error if you try to access that does not exist (e.g., the score attribute).
 */

const secondPlayer = createPlayerObject('Zelda', 29)

secondPlayer.score

/**
 * You can annotate more thing than functions, like variables. It will also help avoid
 * situations where you try to assign a value that is not the type you expected.
 */

let score: number = 0

score = '10'

/**
 * Another nice thing about type annotations is that it allows for easy suggestion from your
 * IDE for autocompletion. Try to create an user with your information.
 */

const thirdPlayer: { name: string, age: number } = {}
const thirdPlayerAge: number = thirdPlayer

/**
 * It will help to show runtime error like if you try to call something that is not a function
 */

thirdPlayerAgeAge()

/**
 * The line below is to help us create a scope for the file.
 */

export { }
