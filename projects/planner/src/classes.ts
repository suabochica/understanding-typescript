abstract class Department {
    static fiscalYear = 2020
    protected employees: string[] = [];

    constructor (protected readonly id: string, public name: string) { }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

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

const employee1 = Department.createEmployee('Winry');
console.log(employee1);

class ITDepartment extends Department {
    admins: string[];

    constructor(id: string, admins: string[]) {
        super(id, 'IT'); // Call the constructor of the base class
        this.admins = admins;
    }

    describe() {
        console.log(`IT Department - ID: ${this.id}`);
    }
}

const it = new ITDepartment('d1', ['Roy']);
it.describe(); // Department Accounting

it.addEmployee('Edward');
it.addEmployee('Alphonse');

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    /** Getters & Setters
     --------------------------------------------*/
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }

        throw new Error('No report found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!')
        }

        this.addReport(value)
    }

    /** Constructor
     --------------------------------------------*/
    private constructor(id: string, public reports: string[]) {
        super(id, 'ACC'); // Call the constructor of the base class
        this.lastReport = reports[0]
    }

    static getInstance() {
        if (AccountingDepartment) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe() {
        console.log(`Accounting Department - ID: ${this.id}`);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
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

// const accounting = new AccountingDepartment('d2', []);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

accounting.addReport('Something went wrong...');
accounting.printReports();

accounting.mostRecentReport = "Set most recent report";
console.log(accounting.mostRecentReport);
