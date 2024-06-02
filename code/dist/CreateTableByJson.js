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
console.log(multiplyAll([25, 30, 10], 3));
function move(animal) {
    if ("swim" in animal) {
        animal;
    }
    else {
        animal;
    }
}
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
logValue(new Date);
function isFish(pet) {
    return pet.swim !== undefined;
}
function getSmallPet() {
    let x = { fly() { console.log("Voando"); } };
    let y = { swim() { console.log("Nadando"); } };
    return Math.random() > 0.5 ? x : y;
}
const zoo = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
const undeWater1 = zoo.filter(isFish);
console.log(undeWater1);
