const names: Array<string> = [];
names[0].split('');

const promise: Promise<number> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 2000)
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return (<any>Object).assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30});
mergedObj.name; // Error, merge object has not 'name' property

interface Lengthy {
    length: number;
}

function countAndPrint<T extends Lengthy> (element: T): [T, string] {
    let descriptionText = 'Got no value.'
    if (element.length === 1) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1){
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}

console.log(countAndPrint('Hi there!'))

function extactAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U
) {
    return 'Value: ' + obj[key];
}

extactAndConvert({name: 'Max'}, 'name');


class DataStorage<T> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1)
            return
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Edward');
textStorage.addItem('Alphonse');
textStorage.removeItem('Alphonse');
textStorage.getItems(); // Edward

const objectStorage = new DataStorage<object>();
const edObject = {name: 'Edward'};
const alObject = {name: 'Alphobse'};
objectStorage.addItem(edObject);
objectStorage.addItem(alObject);
objectStorage.removeItem(alObject); // Some errors here for how works objects in JS
textStorage.getItems();
