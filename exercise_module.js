var genericMap = /** @class */ (function () {
    function genericMap() {
    }
    genericMap.prototype.setItem = function (key, item) {
        this.key = key;
        this.item = item;
    };
    genericMap.prototype.getItem = function (key) {
        return this.key;
    };
    genericMap.prototype.clear = function () {
    };
    genericMap.prototype.printMap = function () {
        console.log(this);
    };
    return genericMap;
}());
var numberMap = new genericMap();
numberMap.setItem('apple', 5);
numberMap.setItem('banana', 10);
numberMap.printMap();
var stringMap = new genericMap();
stringMap.setItem('name', "Sergio");
stringMap.setItem('age', "26");
stringMap.printMap();
