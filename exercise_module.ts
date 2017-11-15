    // Exercise 1 - Arrow Function ✔
    var double = (value: number): number => value * 2;
    
    console.log(double(10));
     
    // Exercise 2 - Default Values ✔
    var greet = function (name: string = "Max") {
        console.log("Hello, " + name);
    };
    greet();
    greet("Anna");
     
    // Exercise 3 - Spread operator ✔
    var numbers = [-3, 33, 38, 5];
    console.log(Math.min(...numbers));
     
    // Exercise 4 - Spread operator ✘
    var newArray = [55, 20];
    newArray.push(...numbers);
    console.log(newArray);
     
    // Exercise 5 - Destructurign arrays ✔
    var testResults = [3.89, 2.99, 1.38];
    var [result1, result2, result3] = testResults;

    console.log(result1, result2, result3);
     
    // Exercise 6 - Destructurign objects ✔
    var scientist = {firstName: "Will", experience: 12};
    var {firstName, experience} = scientist
    
    console.log(firstName, experience);