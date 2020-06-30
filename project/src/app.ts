class Department {
    name: string;

    constructor (_name: string) {
        this.name = _name;
    }
}

const accounting = new Department('Accounting');

console.log(accounting); // Department {name: 'Accounting'}
