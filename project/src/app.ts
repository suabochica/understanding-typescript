const names: Array<string> = [];
names[0].split('');

const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});

function merge<T, U>(objA: T, objB: U) {
    return (<any>Object).assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name; // Error, merge object has not 'name' property
