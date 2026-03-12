/**
 * ============================================================================
 * JavaScript Map Data Structure
 * ============================================================================
 *
 * A Map is a collection of keyed data items, similar to an Object. But the main
 * difference is that Map allows keys of ANY type, including objects, arrays, and functions.
 * Also, Maps maintain the insertion order of their elements, which standard objects
 * do not guarantee (though modern JS objects often do for string keys).
 *
 * Why use Map over an Object?
 * 1. Key Types: Objects only allow Strings and Symbols as keys. Maps allow ANY value.
 * 2. Order: Map iteration is strictly in insertion order.
 * 3. Size: Map has a built-in `size` property. Objects require `Object.keys(obj).length`.
 * 4. Iteration: Maps are directly iterable. Objects require `Object.keys()`, `Object.values()`, etc.
 * 5. Performance: Maps are optimized for frequent additions and removals of key-value pairs.
 */

// 1. Creating a Map
console.log("--- 1. Creating a Map ---");
// Creating an empty map
const myMap = new Map();

// Creating a map with initial values (an iterable of [key, value] pairs, like an array of arrays)
const initializedMap = new Map([
    ['name', 'Alice'],
    ['age', 30],
    ['isEmployed', true]
]);
console.log("Initialized Map:", initializedMap);

// You can also initialize a Map from an Object using Object.entries():
const someObj = { color: 'red', shape: 'circle' };
const mapFromObj = new Map(Object.entries(someObj));
console.log("Map from Object:", mapFromObj);


// 2. Map.prototype.set(key, value)
console.log("\n--- 2. Adding / Updating items using .set() ---");
// .set() adds or updates an element with a specified key and value.
// It returns the Map object itself, which allows you to chain .set() calls!
myMap.set('role', 'Developer')
     .set('language', 'JavaScript')
     .set('experience', 5);

// Using objects and arrays as keys! (This is impossible with standard objects)
const objKey = { id: 1 };
const arrKey = [1, 2, 3];
const funcKey = () => console.log('Hello');

myMap.set(objKey, "I am the value for objKey");
myMap.set(arrKey, "I am the value for arrKey");
myMap.set(funcKey, "I am the value for funcKey");

console.log("Map after setting values:", myMap);


// 3. Map.prototype.get(key)
console.log("\n--- 3. Retrieving items using .get() ---");
// .get() returns a specified element by key. If the value isn't found, it returns undefined.
console.log("Get 'role':", myMap.get('role')); // Output: Developer
console.log("Get objKey:", myMap.get(objKey)); // Output: I am the value for objKey

// Very Important Note on Reference Types as Keys:
// Maps compare keys by reference for objects/arrays.
console.log("Get inline object {id: 1}:", myMap.get({ id: 1 })); 
// Output: undefined, because {id: 1} is a new reference, completely different from objKey in memory.


// 4. Map.prototype.has(key)
console.log("\n--- 4. Checking existence using .has() ---");
// .has() returns a boolean indicating whether an element with the specified key exists or not.
console.log("Has 'experience'?", myMap.has('experience')); // Output: true
console.log("Has 'salary'?", myMap.has('salary')); // Output: false


// 5. Map.prototype.size
console.log("\n--- 5. Checking the size ---");
// The size accessor property returns the number of elements in a Map object.
console.log("Size of myMap:", myMap.size); // Output: 6


// 6. Map.prototype.delete(key)
console.log("\n--- 6. Removing items using .delete() ---");
// .delete() removes the specified element from a Map object by key. 
// Returns true if an element existed and has been removed, false otherwise.
const dropped = myMap.delete('language');
console.log("Was 'language' deleted?", dropped); // Output: true
console.log("Has 'language' now?", myMap.has('language')); // Output: false
console.log("Size after deletion:", myMap.size); // Output: 5


// 7. Iteration methods: keys(), values(), entries()
console.log("\n--- 7. Iterating over Maps ---");
// Maps are inherently iterable. You can use standard iteration protocols like for...of loops.

console.log("-> Using myMap.keys():");
for (const key of myMap.keys()) {
    console.log("Key:", key, "| Type:", typeof key);
}

console.log("\n-> Using myMap.values():");
for (const value of myMap.values()) {
    console.log("Value:", value);
}

console.log("\n-> Using myMap.entries() or just iterating the Map directly:");
// myMap is implicitly the same as myMap.entries()
for (const [key, value] of myMap.entries()) {
    console.log(`Key: [${typeof key}], Value: ${value}`);
}


// 8. Map.prototype.forEach()
console.log("\n--- 8. Iterating using .forEach() ---");
// .forEach() executes a provided function once per each key/value pair in the Map object, in insertion order.
// Note the callback signature is (value, key, map) - similar to Array.forEach(element, index, array)
myMap.forEach((value, key) => {
    console.log(`forEach - Key: ${String(key)} -> Value: ${value}`);
});


// 9. Map.prototype.clear()
console.log("\n--- 9. Removing all items using .clear() ---");
// .clear() removes all elements from a Map object.
myMap.clear();
console.log("Size after clear():", myMap.size); // Output: 0
console.log("Map is now empty:", myMap);

/**
 * Summary of Time Complexities for Map Operations:
 * - set(key, value): O(1) on average
 * - get(key): O(1) on average
 * - has(key): O(1) on average
 * - delete(key): O(1) on average
 * - clear(): O(1) or O(N) depending on the JS engine's garbage collection / memory deallocation, but practically immediate for the developer.
 * 
 * Maps are significantly faster and more predictable than native Objects when you need to frequently add and remove key-value pairs dynamically.
 */
