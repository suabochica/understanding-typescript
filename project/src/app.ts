class Department {
    protected employees: string[] = [];

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

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT'); // Call the constructor of the base class
        this.admins = admins;
    }
}

const it = new ITDepartment('d1', ['Roy']);
it.describe(); // Department Accounting

it.addEmployee('Edward');
it.addEmployee('Alphonse');

// accounting.employees[2] = 'Anna' // Error: Property employees is private to Department

class AccountingDepartment extends Department {
    constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
    }

    addReport(text: string) {
        this.reports.push(text);
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(name: string) {
        if (name === 'Edward') {
            return;
        }

        this.employees.push(name);
    }
}

const accounting = new AccountingDepartment('d2', []);

accounting.addReport('Something went wrong...');
accounting.printReports();
