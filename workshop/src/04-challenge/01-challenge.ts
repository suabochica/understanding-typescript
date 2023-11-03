/**
 * Challenges
 * ==========
 */

const challengeReward = {
    challenges: [
        'Create a generic type that can extract the valid keys to a translation string',
        'Create a generic type that extracts the string of a translation object as a literal type',
        `
            Create a generic type that can receive a translation object and a path to the translation.
            It should return a tuple with the translation string as the first value, and, if there is
            a value to interpolate the values on a tuple
        `,
    ],
    rewards: 'The first 3 to complete the challenge or the 3 that ara able to advance the furthest will get a cinnamon roll tomorrow',
    messages: {
        win: 'Congratulations ${name} you got the ${scoreBoardPlace} and you will get a ${price}',
        participation: '${name} you might have not won, but you learned something new and you now have this repo to practice and get better!',
    },
    rules: {
        deadline: 'At the start of the challenge we will discus between two possible deadlines for the challenge and we can review the progress we made',
        options: {
            first: 'You will get till the end of the workshop to finish the challenge and we can review the progress made',
            second: 'You will get till 10 in the morning of next day to submit the challenge, you need to seek me to review the challenge.',
        },
        help: 'You can ask for my help if needed, but I wont be answering "How do I do this?" kinds of question, only "Why is this not working?" kinds of questions'
    }
} as const

// It should return the paths on an union

type GetTranslationStringPaths<TranslationObject> = TranslationObject extends (string)
    ? ``
    : TranslationObject extends Record<string, any>
        ? {
            [P in keyof TranslationObject]: TranslationObject[P] extends object
            ? `${string & P}.${string & GetTranslationStringPaths<TranslationObject[P]>}`
            : P;
        } [keyof TranslationObject]
    : never

type Paths = GetTranslationStringPaths<typeof challengeReward>
/**
 * Parameters are the part of the string enclosed in ${param}, you should only
 * return the parameter part of the string ['parameter', ...others]
 */

type GetTranslationParameters<S> = S extends (string)
    ? ``
    : S extends Record<string, any>
        ? {
            [P in keyof S]: S[P] extends Record<string, string | Record<string, any>>
            ? `${string & P}.${string & GetTranslationStringPaths<S[P]>}`
            : P
        }[keyof S]
        : never

type Params = GetTranslationParameters<typeof challengeReward>

type GetTranslationsStringsWithParams<TranslationObject, Path> = never // Should return ['string', ['parameter', ...rest]] or string
