"use strict";
function addition(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result ' + num);
}
function addAndHandle(n1, n2, callback) {
    var result = n1 + n2;
    callback(result);
}
printResult(addition(5, 12));
var combineValues;
combineValues = addition;
console.log(combineValues(9, 9));
addAndHandle(10, 20, function (result) {
    console.log(result);
});
