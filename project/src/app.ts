type Admin = {
    name: string;
    privelges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const employee: ElevatedEmployee = {
    name: 'Edward',
    privelges: ['alchemy'],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
