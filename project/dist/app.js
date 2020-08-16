var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log('Logger Factory');
    return function (constructor) {
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
function WithTemplate(template, hookId) {
    console.log('Template Factory');
    return function (originalConstructor) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                console.log('Renedering template');
                var hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = _this.name;
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Edward';
        console.log('Creating person object');
    }
    Person = __decorate([
        Logger('LOGGING'),
        WithTemplate('<h1>My Person Object</h1>', 'app')
    ], Person);
    return Person;
}());
var person = new Person();
// ---
function Log(target, propertyName) {
    console.log('Property decorator!');
    console.log(target, propertyName); // ({Product obj} , title)
}
function LogAccessor(target, propertyName, descriptor) {
    console.log('Accessor decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // price
    console.log(descriptor); // {Object with getters and setters}
}
function LogMethod(target, propertyName, descriptor) {
    console.log('Method decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(descriptor); // {writable: true, enumerable: false, configurable: true, ...}
}
function LogParameter(target, propertyName, position) {
    console.log('Parameter decorator!');
    console.log(target); // {Product obj}
    console.log(propertyName); // getPriceWithTax
    console.log(position); // 0
}
var Product = /** @class */ (function () {
    function Product(t, p) {
        this.title = t;
        this._price = p;
    }
    Object.defineProperty(Product.prototype, "price", {
        set: function (val) {
            if (val > 0) {
                this._price = val;
            }
            else {
                throw new Error('Invalid price - should be positive!');
            }
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.getPriceWithTax = function (tax) {
        return this._price * (1 + tax);
    };
    __decorate([
        Log
    ], Product.prototype, "title");
    __decorate([
        LogAccessor
    ], Product.prototype, "price");
    __decorate([
        LogMethod,
        __param(0, LogParameter)
    ], Product.prototype, "getPriceWithTax");
    return Product;
}());
var p1 = new Product('Book', 19);
var p2 = new Product('Shoes', 29);
function Autobind(target, methodName, descriptor) {
    var originalMethod = descriptor.value;
    var adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get: function () {
            var boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjustedDescriptor;
}
var Printer = /** @class */ (function () {
    function Printer() {
        this.message = 'This works';
    }
    Printer.prototype.showMessage = function () {
        console.log(this.message);
    };
    __decorate([
        Autobind
    ], Printer.prototype, "showMessage");
    return Printer;
}());
var printer = new Printer();
var button = document.querySelector('button');
button.addEventListener('click', printer.showMessage);
var registeredValidators = {};
function Required(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['required'], _a));
}
function PositiveNumber(target, propName) {
    var _a;
    registeredValidators[target.constructor.name] = __assign(__assign({}, registeredValidators[target.constructor.name]), (_a = {}, _a[propName] = ['positive'], _a));
}
function validate(obj) {
    var objValidatorConfig = registeredValidators[obj.constructor.name];
    var isValidProp = true;
    if (!objValidatorConfig) {
        return true;
    }
    for (var prop in objValidatorConfig) {
        for (var _i = 0, _a = objValidatorConfig[prop]; _i < _a.length; _i++) {
            var validator = _a[_i];
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
var Course = /** @class */ (function () {
    function Course(_title, _price) {
        this.title = _title;
        this.price = _price;
    }
    __decorate([
        Required
    ], Course.prototype, "title");
    __decorate([
        PositiveNumber
    ], Course.prototype, "price");
    return Course;
}());
var courseForm = document.querySelector('form');
courseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleElement = document.getElementById('title');
    var priceElement = document.getElementById('price');
    var title = titleElement.value;
    var price = +priceElement.value;
    var createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});
