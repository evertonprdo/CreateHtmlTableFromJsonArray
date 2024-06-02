"use strict";
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLenght ** 2;
        case "triangle":
            return shape.sideLenght ** 2;
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
let a = { kind: "circle", radius: 22 };
console.log(getArea(a));
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function greeter(fn) {
    fn("Hello World");
}
function doSomething(fn) {
    console.log(fn.description + " returned" + fn(6));
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);
class SomeObject {
    some;
    constructor(s) {
        this.some = s;
    }
}
function fn(ctor) {
    return new ctor("hello");
}
let x = SomeObject;
console.log(fn(x).some);
function firstElement(arr) {
    return arr[0];
}
const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);
console.log(s, n, u);
function map(arr, func) {
    return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
console.log(d1, d2);
function multiply(n, ...m) {
    return m.map((x) => n * x);
}
const mult = multiply(10, 2, 3, 7);
console.log(mult);
