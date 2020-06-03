// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Edward',
//     age: 16,
// }

const person = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel']
}

let favoriteActivities: string[];

favoriteActivities = ['Alchemy'];
// favoriteActivities = ['Alchemy', 1]; Error!

console.log(person.name)

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
