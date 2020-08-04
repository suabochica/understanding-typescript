function Logger(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

@Logger('LOGIN - PERSON')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
