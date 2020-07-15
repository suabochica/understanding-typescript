interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

let user: Person;

user = {
    name: 'Edward',
    age: 18,
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

user.greet("Hello, I am")
