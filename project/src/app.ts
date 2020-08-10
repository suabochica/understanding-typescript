function Logger(logString: string) {
    console.log('Logger Factory');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    return function(constructor: any) {
        console.log('Template Execution');
        const hookEl = document.getElementById(hookId);
        const p = new constructor()

        if (hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
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

function LogAccessor(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // price
    console.log(descriptor); // {Object with getters and setters}
}

function LogMethod(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
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
    getPriceWithTax(@LogArgument tax: number) {
        return this._price * (1 + tax);
    }
}
