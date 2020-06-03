// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Edward',
//     age: 16,
// }
var person = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel']
};
var favoriteActivities;
favoriteActivities = ['Alchemy'];
// favoriteActivities = ['Alchemy', 1]; Error!
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
