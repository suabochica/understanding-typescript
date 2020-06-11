"use strict";
// const person: {
//     name: string;
//     age: number;
// } = {
//     name: 'Edward',
//     age: 16,
// }
var personTuple = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel'],
    role: [0, 'hero'],
};
personTuple.role[0] = 1;
// person.role[0] = 'enemy'; ✘: expected an number value
var Role;
(function (Role) {
    Role[Role["PRESIDENT"] = 0] = "PRESIDENT";
    Role[Role["ALCHEMIST"] = 1] = "ALCHEMIST";
    Role[Role["STATAL_ALCHEMIST"] = 2] = "STATAL_ALCHEMIST";
    Role[Role["HOMUNCULUS"] = 3] = "HOMUNCULUS";
})(Role || (Role = {}));
var person = {
    name: 'Edward',
    age: 16,
    hobbies: ['Alchemy', 'Travel'],
    role: Role.STATAL_ALCHEMIST,
};
if (person.role === Role.STATAL_ALCHEMIST) {
    console.log('Hello full metal!');
}
var favoriteActivities;
favoriteActivities = ['Alchemy'];
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
