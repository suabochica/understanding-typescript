interface Named {
    readonly name?: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 40

    constructor(n?: string) {
        this.name = n
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        } else {
            console.log(`Hi!`);
        }
    }
}

let user: Greetable;

user = new Person('Edward')

user.greet("Hello, I am")
console.log(user);
