/**
 * Template Literals
 * =-===============
 *
 * You might have worked with template literals in javascript. They allows
 * you to dynamically create a string by using variables to fill some info
 * that might be dynamic.
 */

const firstName = 'Sergio'
const lastName = 'Benitez'
const fullName = `${firstName} ${lastName}` as const

// We have a similar version with types

type FirstName = typeof firstName
type LastName = typeof lastName
type FullName = `${FirstName} ${LastName}`

/**
 * But might be thinking, how is this useful? On javascript you can use
 * variables and they can change their values. But the type system is more
 * restrictive, right? Kind of, you got some other tools and powers in the
 * type system that can make this worth understanding.
 */
const challengeReward = {
    challenges: [
        'Create a generic type that can extract the valid keys to a translation string',
        'Create a generic type that extracts the interpolation parameters of a string and returns them in a tuple or never if there is no parameters',
        `Create a generic type that can receive a translation object and a path to the translation.
        It should returns a tuple with the translation string as the first value and parameters or just the string if it does not take parameters`
    ],
    rewards: 'The first 3 to complete the challenge or the 3 that are able to advance the furthest will get a cinnamon roll tomorrow',
    messages: {
        win: 'Congratulation ${name} you got the ${scoreBoardPlace} and you will get a ${price}',
        participation: '${name} you might have not won, but you leaned something new and you now have this repo to practice and get better!'
    },
    rules: {
        deadline: 'At the start of the challenge we will discuss between two possible deadlines for the challenge',
        options: {
            first: 'You will get till the end of the workshop to finish the challenge and we can review the progress made',
            second: 'You will get till 10 in the morning of friday to submit the challenge, you need to seek me for review of the challenge'
        },
        help: 'You can ask for my help if needed, but I wont be answering "How do I do this?" kinds of question, only "Why is this not working?" kinds of questions'
    }
} as const