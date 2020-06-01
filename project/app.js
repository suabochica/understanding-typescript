// class Greeter {
//     greeting: string;
//     constructor(message: string) {
//         this.greeting = message;
//     }
//     greet() {
//         return "Hello, " + this.greeting;
//     }
// }
// let greeter = new Greeter("world");
// let button = document.createElement('button');
// button.textContent = "Say Hello";
// button.onclick = function() {
//     alert(greeter.greet());
// }
// document.body.appendChild(button);
function add(num1, num2, canShowResult, phrase) {
    var result = num1 + num2;
    if (canShowResult) {
        console.log(phrase, result);
    }
    else {
        return result;
    }
}
var number1 = 5;
var number2 = 3;
var canShowResult = true;
var resultPhrase = 'Result is: ';
add(number1, number2, canShowResult, resultPhrase);
