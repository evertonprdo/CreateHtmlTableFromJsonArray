/*
function printName(obj : { first: string; last?: string}): void {
    console.log(obj.last?.toUpperCase());
}

printName({ first: "Olá Mundo!", last: 'Oi' });

function printId(id: string | number): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}

printId("um")


function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
    } else {
        console.log("Welcome lone traveler " + x);
    }
}

welcomePeople("Julia");
welcomePeople(["Roberta", "Barbara", "Beatriz"])

type Point = {
    x: number;
    y: number;
};

function printCoord(pt:Point): void {
    console.log("The coordinate's x values is " + pt.x);
    console.log("The coordinate's y values is " + pt.y);
}

printCoord({ x: 100, y: 100 })
*/

const myInput: HTMLInputElement = document.getElementById('teste') as HTMLInputElement;
myInput.value = "Olá Mundo";
myInput.type = "number";
console.log(myInput);

function printText(s: string, alignment: "left" | "right" | "center"): void {
    console.log(s, alignment);
}

printText('Alinnhamento: ', 'center');

function padLeft(padding: number | string, input: string): string {
    if (typeof padding === 'number') {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}

console.log(padLeft(5, "Olá"));
console.log(padLeft("Olá: ", "Mundo!"));

function printAll(strs: string | string[] | null): void {
    if(strs && typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === 'string') {
        console.log(strs);
    }
}

printAll("Oi");
printAll(["oi", 'tudo', 'bom?']);

function multiplyAll(
    values: number[] | undefined,
    factor: number
  ): number[] | undefined {
    if (!values) {
      return values;
    } else {
      return values.map((x) => x * factor);
    }
  }