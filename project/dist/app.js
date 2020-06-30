"use strict";
var Department = /** @class */ (function () {
    function Department(_name) {
        this.name = _name;
    }
    return Department;
}());
var accounting = new Department('Accounting');
console.log(accounting); // Department {name: 'Accounting'}
