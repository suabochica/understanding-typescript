function Logger(logString: string) {
    console.log('Logger Factory');
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log('Template Factory');
    return function(constructor: any) {
        console.log('Template Execution');
        const hookEl = document.getElementById(hookId);
        const p = new constructor()

        if (hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

@Logger('LOGGING')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
    name: string = 'Edward';

    constructor() {
        console.log('Creating person object');
    }
}

const person = new Person();
