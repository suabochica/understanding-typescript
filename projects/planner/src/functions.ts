function addition(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log('Result ' + num);
}

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const result = n1 + n2;

    callback(result);
}

printResult(addition(5, 12));

let combineValues: (a: number, b: number) => number;

combineValues = addition;

console.log(combineValues(9,9));

addAndHandle(10, 20, (result) => {
    console.log(result);
});
