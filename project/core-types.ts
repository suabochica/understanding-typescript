// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Edward',
//     age: 16,
// }

const personTuple: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
} = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel'],
    role: [0, 'hero'],
}

personTuple.role[0] = 1;
// person.role[0] = 'enemy'; ✘: expected an number value

enum Role {
    PRESIDENT,
    ALCHEMIST,
    STATAL_ALCHEMIST,
    HOMUNCULUS,
}

const person = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel'],
    role: Role.STATAL_ALCHEMIST,
}

if (person.role === Role.STATAL_ALCHEMIST) {
    console.log('Hello full metal!');
}

let favoriteActivities: string[];

favoriteActivities = ['Alchemy'];

console.log(person.name)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
