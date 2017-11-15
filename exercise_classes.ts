// Exercise 1 - TypeScript Class ✔
// ---------------------------------------------
class Car {
    name: string
    acceleration: number;
    
    constructor(name: string) {
        this.name = name;
        this.acceleration = 0;
    }
    
    honk() {
        console.log("Toooooooooot!")
    }
    
    accelerate(speed) {
        this.acceleration = this.acceleration + speed;
    }
}

let car = new Car("BMW")
car.honk();
console.log(car.acceleration);
car.accelerate(20);
console.log(car.acceleration);

// Exercise 2 - Inheritance ✔
// ---------------------------------------------
class BaseShape {
    width: number = 0;
    length: number = 0;
}

class Rectangle extends BaseShape {
    calculateArea() {
        return this.width * this.length;
    }
}

let rectangle = new Rectangle();
rectangle.width = 5;
rectangle.length = 10;
console.log(rectangle.calculateArea())

// Exercise 3 - Getters and Setters ✘
// ---------------------------------------------

class Person {
    private _firstName: string = ""; // ✘, I forget add the private keyword
    
    // ✘, Add an unnecessary constructor
    
    get firstName() { // ✔
        return this._firstName;
    }
    
    set firstName (value:string) { // ✔
        if (value.length > 3) {
            this._firstName = value;
        } else {
            this._firstName = "";
        }
    }
}

const person = new Person();
console.log(person.firstName);
person.firstName = "Se";
console.log(person.firstName);
person.firstName = "Sergio";
console.log(person.firstName);


