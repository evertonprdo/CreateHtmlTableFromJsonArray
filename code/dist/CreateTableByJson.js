"use strict";
const myInput = document.getElementById('teste');
myInput.value = "Olá Mundo";
myInput.type = "number";
console.log(myInput);
function printText(s, alignment) {
    console.log(s, alignment);
}
printText('Alinnhamento: ', 'center');
function padLeft(padding, input) {
    if (typeof padding === 'number') {
        return " ".repeat(padding) + input;
    }
    return padding + input;
}
console.log(padLeft(5, "Olá"));
console.log(padLeft("Olá: ", "Mundo!"));
function printAll(strs) {
    if (strs && typeof strs === "object") {
        for (const s of strs) {
            console.log(s);
        }
    }
    else if (typeof strs === 'string') {
        console.log(strs);
    }
}
printAll("Oi");
printAll(["oi", 'tudo', 'bom?']);
function multiplyAll(values, factor) {
    if (!values) {
        return values;
    }
    else {
        return values.map((x) => x * factor);
    }
}
