export namespace Tabela {
    class SuperTable {

    }

    export class Teste {
        static teste():void {
            console.log('oi');
            
            const teste_div = document.createElement('div');
            teste_div.innerText = "Olá Mundo"
            document.body.appendChild(teste_div);
        }
    }
}
/*
class Student {
    fullName: string;
    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person:Person): string {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user:Student = new Student("Jane", "M.", "User");

console.log(greeter(user));
*/