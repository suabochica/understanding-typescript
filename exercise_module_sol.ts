class genericMap<T> {
    private map: {[key: string]: T} = {};
    
    setItem(key: string, item: T) {
        this.map[key] = item;
    }
    
    getItem(key: string) {
        return this.map[key];
    }
    
    clear() {
        this.map = {};
    }
    
    printMap() {
        for (let key in this.map) {
            console.log(key, this.map[key]);
        }
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