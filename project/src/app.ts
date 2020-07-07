class Department {
    private employees: string[] = [];

    constructor (private readonly id: string, public name: string) { }

    describe() {
        console.log(`Department ${this.name}`);
    }

    printId() {
        console.log(`Department ${this.id}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }
}

const accounting = new Department('1', 'Accounting');
accounting.describe(); // Department Accounting

accounting.addEmployee('Edward');
accounting.addEmployee('Alphonse');

// accounting.employees[2] = 'Anna' // Error: Property employees is private to Department

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
