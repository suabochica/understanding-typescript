function Logger(logString: string) {
    console.log('Logger Factory');

    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// function WithTemplate(template: string, hookId: string) {
//     console.log('Template Factory');
//     return function(constructor: any) {
//         console.log('Template Execution');
//         const hookEl = document.getElementById(hookId);
//         const p = new constructor()

//         if (hookEl){
//             hookEl.innerHTML = template;
//             hookEl.querySelector('h1')!.textContent = p.name;
//         }
//     }
// }

function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    return function<T extends {new (...args: any[]): {name: string}}>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Renedering template')
                const hookEl = document.getElementById(hookId);

                if (hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();

// ---

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertyName); // ({Product obj} , title)
}

function LogAccessor(target: any, propertyName: string | Symbol, descriptor?: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // price
    console.log(descriptor); // {Object with getters and setters}
}

function LogMethod(target: any, propertyName: string | Symbol, descriptor?: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(descriptor); // {writable: true, enumerable: false, configurable: true, ...}
}

function LogParameter(target: any, propertyName: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(position); // 0
}

class Product {
    @Log
    title: string;
    private _price: number;

    @LogAccessor
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!')
        }
    }

    constructor(t: string, p:number) {
        this.title = t;
        this._price = p;
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Shoes', 29);

function Autobind(target: any, methodName: string, descriptor?: PropertyDescriptor) {
    const originalMethod = descriptor!.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);

            return boundFunction;
        }
    };

    return adjustedDescriptor;
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer()

const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);


interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]; // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    let isValidProp: boolean = true

    if(!objValidatorConfig) {
        return true;
    }

    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValidProp = isValidProp && !!obj[prop];
                    break;
                case 'positive':
                    isValidProp = isValidProp && obj[prop] > 0;
                    break;
            }
        }
    }

    return isValidProp;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(_title: string, _price:number) {
        this.title = _title;
        this.price = _price;
    }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement;
    const priceElement = document.getElementById('price') as HTMLInputElement;

    const title = titleElement.value;
    const price = +priceElement.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');

        return;
    }
    console.log(createdCourse);
})
