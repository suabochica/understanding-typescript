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

function add(num1: number, num2: number, canShowResult: boolean, phrase: string) {
    const result: number = num1 + num2;

    if (canShowResult) {
        console.log(phrase, result);
    } else {
        return result;
    }

}

const number1 = 5;
const number2 = 3;
const canShowResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, canShowResult, resultPhrase);
