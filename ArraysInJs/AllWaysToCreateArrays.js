let x = new Array(),
    y = new Array(10),
    z = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    a = new Array(10).fill(10),
    b = Array.from({ length: 10 }),
    c = Array.from({ length: 10 }, () => Math.round(Math.random())),
    d = new Array(10).fill(10)
    , e = Array.from({ length: 10 }).map(() => Math.round(Math.random));

d.forEach((value, index, array) => {
    array[index] = Math.round(Math.random());
});

console.log(`The x array is ${x}`);
console.log(`The y array is ${y}`);
console.log(`The z array is ${z}`);
console.log(`The a array is ${a}`);
console.log(`The b array is ${b}`);
console.log(`The c array is ${c}`);
console.log(`The d array is ${d}`);
console.log(`The e array is ${e}`);



