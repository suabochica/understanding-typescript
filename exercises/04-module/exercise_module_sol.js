var genericMap = /** @class */ (function () {
    function genericMap() {
        this.map = {};
    }
    genericMap.prototype.setItem = function (key, item) {
        this.map[key] = item;
    };
    genericMap.prototype.getItem = function (key) {
        return this.map[key];
    };
    genericMap.prototype.clear = function () {
        this.map = {};
    };
    genericMap.prototype.printMap = function () {
        for (var key in this.map) {
            console.log(key, this.map[key]);
        }
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
