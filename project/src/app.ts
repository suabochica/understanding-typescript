function Logger(constructor: Function) {
    console.log('logging');
    console.log(constructor);
}

@Logger
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
