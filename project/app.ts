// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Edward',
//     age: 16,
// }

const person: {
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

person.role[0] = 1;
// person.role[0] = 'enemy'; ✘: expected an number value

let favoriteActivities: string[];

favoriteActivities = ['Alchemy'];

console.log(person.name)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
