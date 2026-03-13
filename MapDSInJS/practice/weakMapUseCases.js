/**
 * ============================================================================
 * JavaScript WeakMap Use Cases
 * ============================================================================
 *
 * A WeakMap is a collection of key/value pairs where the keys must be objects,
 * and the values can be arbitrary values.
 *
 * What makes it "Weak"?
 * The references to the key objects are held "weakly". If there are no other
 * references to a key object elsewhere in the program, the garbage collector
 * can safely remove the object from memory, and the corresponding key/value
 * pair will be automatically removed from the WeakMap.
 *
 * This prevents memory leaks that would occur if you used a standard Map,
 * which holds "strong" references to its keys and prevents them from being garbage collected.
 *
 * Key characteristics of WeakMap:
 * 1. Keys must be objects (or non-registered Symbols). Primitives are not allowed.
 * 2. Not Iterable: You cannot loop over a WeakMap (.keys(), .values(), .entries(), or forEach() do not exist).
 * 3. No Size: There is no .size property.
 */

// --- Use Case 1: Attaching Metadata / State to DOM Elements ---
// This is the most common use case. If you attach state directly to a DOM node (e.g., node.myState = ...),
// it can cause memory leaks if the node is removed from the DOM but the state object still references it.
// With WeakMap, when the DOM node is removed and garbage collected, the state is cleared automatically.

const domMetadata = new WeakMap();

// Assume `element` is an actual DOM Node retrieved from the page
function initializeWidget(element) {
    // We store widget state associated with the specific DOM element
    domMetadata.set(element, { clicks: 0, initializedAt: Date.now() });

    element.addEventListener('click', () => {
        const state = domMetadata.get(element);
        state.clicks += 1;
        domMetadata.set(element, state);
        console.log(`Widget clicked ${state.clicks} times.`);
    });
}

// Example usage context:
// const btn1 = document.getElementById('btn1');
// initializeWidget(btn1);
// If btn1 is later removed from the DOM (e.g., btn1.remove()), the entry in domMetadata is garbage collected.


// --- Use Case 2: Private Data in Classes ---
// Before the introduction of private class fields (#), WeakMaps were the standard
// way to achieve true privacy in JavaScript classes while cleanly managing memory.

const privateData = new WeakMap();

class User {
    constructor(name, age) {
        this.name = name; // Public property
        
        // Private properties are stored in the WeakMap, keyed by the 'this' instance
        privateData.set(this, { age: age });
    }

    getAge() {
        // Accessing the private data using the instance as the key
        return privateData.get(this).age;
    }

    celebrateBirthday() {
        const data = privateData.get(this);
        data.age += 1;
        privateData.set(this, data);
        console.log(`Happy birthday! I am now ${data.age}.`);
    }
}

const alice = new User("Alice", 28);
console.log(alice.name); // Output: Alice
console.log(alice.age); // Output: undefined. 'age' is not accessible directly!
console.log(alice.getAge()); // Output: 28

// When there are no longer any references to `alice` in the program,
// the garbage collector removes `alice`, and the private data { age: 28 } is also cleaned up.


// --- Use Case 3: Caching / Memoization for Objects ---
// If you have a heavy computation that takes an object as input and returns a result,
// you can cache the result securely in a WeakMap without causing memory leaks.

const computationCache = new WeakMap();

function processHeavyObject(obj) {
    // Check if we've already calculated the processing result for this exact object
    if (computationCache.has(obj)) {
        console.log("Returning cached result...");
        return computationCache.get(obj);
    }

    console.log("Performing heavy computation...");
    // Simulating heavy work based on the object's properties
    const result = Object.keys(obj).length * 1000; 

    // Cache the result for next time
    computationCache.set(obj, result);
    return result;
}

const dataItem = { id: 1, val: "Complex data" };
processHeavyObject(dataItem); // Output: Performing heavy computation...
processHeavyObject(dataItem); // Output: Returning cached result...

// If 'dataItem' is no longer needed in the app, the cache entry automatically disappears!
