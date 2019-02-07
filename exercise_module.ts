class genericMap<T extends number | string> {
    // Bad definition of the genericMap. Look the exercise_module_sol.md to checj the right solution

    key: string;
    item: T;

    setItem(key: string, item: T): void {
        this.key = key;
        this.item = item;
    }

    getItem(key: string): string {
        return this.key;
    }

    clear() {
        this.key = {};
    }

    printMap(): void {
        console.log(this)
    }
}

const numberMap = new genericMap<number>();

numberMap.setItem('apple', 5);
numberMap.setItem('banana', 10);
numberMap.printMap();

const stringMap = new genericMap<string>();

stringMap.setItem('name', "Sergio");
stringMap.setItem('age', "26");
stringMap.printMap();