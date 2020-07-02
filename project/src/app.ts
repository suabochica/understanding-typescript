class Department {
    name: string;

    constructor (_name: string) {
        this.name = _name;
    }

    describe() {
        console.log(`Department ${this.name}`);
    }
}

const accounting = new Department('Accounting');
accounting.describe(); // Department Accounting

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // Department: undefined
