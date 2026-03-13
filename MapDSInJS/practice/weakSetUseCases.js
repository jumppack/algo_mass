/**
 * ============================================================================
 * JavaScript WeakSet Use Cases
 * ============================================================================
 *
 * A WeakSet is a collection of objects. Like a Set, each object in a WeakSet
 * may occur only once.
 *
 * What makes it "Weak"?
 * Just like WeakMap, references to objects in a WeakSet are held "weakly".
 * If no other references to an object stored in the WeakSet exist outside of
 * the WeakSet, they can be easily garbage collected.
 *
 * Key characteristics of WeakSet:
 * 1. Only objects can be stored in a WeakSet (no primitives like string or numbers).
 * 2. Not Iterable: Because elements can be garbage collected at any time,
 *    you cannot iterate over a WeakSet (no forEach, for...of).
 * 3. No Size: You cannot determine how many items are in a WeakSet.
 * 4. Methods: Only supports add(), has(), and delete().
 */

// --- Use Case 1: Keeping track of processed objects/DOM nodes ---
// Imagine you have a script that applies a specific effect to DOM elements,
// but you want to ensure the effect is only applied ONCE per element, preventing leaks.

const processedElements = new WeakSet();

function applyEffect(element) {
    // If we've already seen this element, skip it!
    if (processedElements.has(element)) {
        console.log(`Element ${element.id} already processed. Skipping.`);
        return;
    }

    console.log(`Applying heavy effect to element: ${element.id}...`);
    // Apply effect...
    element.style = { color: "red" }; // Mocking style change

    // Mark it as processed
    processedElements.add(element);
}

// Simulation with dummy objects representing DOM nodes
const divA = { id: 'divA', nodeType: 1 };
const divB = { id: 'divB', nodeType: 1 };

applyEffect(divA); // Output: Applying heavy effect to element: divA...
applyEffect(divB); // Output: Applying heavy effect to element: divB...
applyEffect(divA); // Output: Element divA already processed. Skipping.

// When divA or divB are removed from the DOM and all variables pointing to them are cleared,
// they are automatically removed from the WeakSet, preventing memory leaks.


// --- Use Case 2: Detecting Circular References (Safe Deep Copy / Serialization) ---
// When traveling down deeply nested structures, objects might reference themselves.
// A WeakSet is perfect for tracking "objects we are currently visiting" to avoid infinite loops.

function detectCircular(obj, visited = new WeakSet()) {
    // Base case: if it's not an object, it's safe (primitives can't be circular)
    if (obj === null || typeof obj !== 'object') {
        return false;
    }

    // If we've already visited this specific object reference, we have a cycle!
    if (visited.has(obj)) {
        return true; 
    }

    // Mark current object as visited
    visited.add(obj);

    // Recursively check properties
    for (const key in obj) {
        if (detectCircular(obj[key], visited)) {
            return true;
        }
    }

    return false;
}

const node1 = { name: "Node 1" };
const node2 = { name: "Node 2" };
node1.next = node2;
node2.next = node1; // Circular reference created!

console.log("\nIs node1 circular?", detectCircular(node1)); // Output: true

// Standard Sets can also detect cycles, but using WeakSet ensures no strong
// references are kept after the algorithm finishes.


// --- Use Case 3: "Brand Checking" for Class Instances ---
// Sometimes you want to guarantee that a method belongs to its original class instance
// and isn't being spoofed via .call() or .bind() on an arbitrary object.

const validInstances = new WeakSet();

class SecureDatabaseConnection {
    constructor() {
        // Stamp this exact instance as legitimately created by the constructor
        validInstances.add(this);
    }

    query(sql) {
        // Verify the 'this' context is an authentic instance originally created
        if (!validInstances.has(this)) {
            throw new TypeError("Invalid context. Method can only be called on authentic SecureDatabaseConnection instances.");
        }
        console.log(`Executing query safely: ${sql}`);
    }
}

const db = new SecureDatabaseConnection();
console.log("\n--- Brand Checking ---");
db.query("SELECT * FROM users"); // Output: Executing query safely: SELECT * FROM users

const fakeDb = {}; 
try {
    // Someone attempts to hijack the method context
    db.query.call(fakeDb, "DROP TABLE users"); 
} catch (err) {
    console.error(err.message); // Output: TypeError: Invalid context...
}
