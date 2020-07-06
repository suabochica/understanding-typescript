class Department {
    name: string;
    private employees: string[] = [];

    constructor (_name: string) {
        this.name = _name;
    }

    describe() {
        console.log(`Department ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
}

const accounting = new Department('Accounting');
accounting.describe(); // Department Accounting

accounting.addEmployee('Edward');
accounting.addEmployee('Alphonse');

// accounting.employees[2] = 'Anna' // Error: Property employees is private to Department

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
