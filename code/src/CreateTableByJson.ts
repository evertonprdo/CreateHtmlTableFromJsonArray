interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLenght: number;
}

interface Triangle {
    kind: "triangle";
    sideLenght: number;
}

type Shape = Circle | Square | Triangle; 

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLenght ** 2;
        case "triangle":
            return shape.sideLenght **2;
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
let a: Circle = { kind: "circle", radius: 22 }
console.log(getArea(a));

function printToConsole(s: string) {
    console.log(s);    
}
greeter(printToConsole);

type GreetFunction = (a: string) => void;
function greeter(fn:GreetFunction) {
    fn("Hello World");
}

type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned" + fn(6));
}

function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";

doSomething(myFunc);

class SomeObject {
    some:string
    constructor(s: string){
        this.some = s;
    }
}

type SomeConstructor = {
    new (s: string): SomeObject;
};

function fn(ctor: SomeConstructor): SomeObject {
    return new ctor("hello");
}

let x:SomeConstructor = SomeObject;

console.log(fn(x).some);

interface CallOrConstruct {
    (n?: number): string;
    new (s:string): Date;
}

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

const s = firstElement(["a", "b", "c"]);
const n = firstElement([1, 2, 3]);
const u = firstElement([]);

console.log(s, n, u);

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
console.log(parsed);

function longest<T extends { length: number }>(a:T, b:T) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);

console.log(d1, d2);

type User = {
    id: number;

    admin: boolean;
    becomeAdmin: () => boolean
}

interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}

function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}

const mult = multiply(10, 2, 3, 7);
console.log(mult);