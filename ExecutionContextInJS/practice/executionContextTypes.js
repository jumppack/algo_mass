/**
 * ============================================================================
 * JavaScript Execution Contexts
 * ============================================================================
 *
 * In JavaScript, an "Execution Context" is an abstract concept describing the 
 * environment in which JavaScript code is evaluated and executed. 
 *
 * It holds the information about the currently running code, its variables, 
 * objects, functions, and critically, what the `this` keyword refers to.
 *
 * There are THREE main types of execution contexts in JavaScript:
 * 1. Global Execution Context (GEC)
 * 2. Function / Local Execution Context (FEC)
 * 3. Eval Execution Context (rarely used)
 *
 * Note: Sometimes "context" is used informally to refer specifically to the 
 * value of `this` (like when we talk about `call`, `bind`, `apply`), but technically, 
 * `this` is simply one *part* of an Execution Context.
 */


console.log("--- 1. Global Execution Context (GEC) ---");
/**
 * 1. Global Execution Context
 * This is the default or base context. The code that is not inside any function 
 * is in the global execution context.
 * 
 * It does two main things:
 * - Creates a Global Object (e.g., `window` in a browser, `global` in Node.js).
 * - Sets the value of `this` to point to that global object.
 *
 * There can only be exactly ONE global execution context in a program.
 */
var globalMessage = "I am global";
console.log("Are we in the global context?", this === globalThis); 
// Note: In strict mode (`"use strict"`), or inside ES Modules (which are strict by default), 
// top-level `this` behaves a bit differently (often `undefined` in Node.js modules), 
// but the Execution Context itself is still the Global Execution Context.



console.log("\n--- 2. Function Execution Context (FEC) ---");
/**
 * 2. Function Execution Context
 * Every single time a function is CALLED (not when it's defined), an entirely 
 * new execution context is created for that specific function.
 * 
 * Each function has its own execution context, and it carries:
 * - Its local arguments (the `arguments` object).
 * - Its local variables.
 * - Its own `this` binding (which depends on HOW the function was called).
 */

function firstFunction() {
    // A new context is created for 'firstFunction'
    console.log("Entering firstFunction context.");
    const firstLocalVar = "A";

    function secondFunction() {
        // ANOTHER new context is created for 'secondFunction' and placed ON TOP 
        // of the call stack.
        console.log("Entering secondFunction context. 'this' depends on how I was called.");
        const secondLocalVar = "B";
        // Can access outer variables via the Scope Chain (Lexical Environment)
        console.log(`I can see ${firstLocalVar} and ${secondLocalVar}`);
    }

    secondFunction(); // Execution context for secondFunction starts here
    console.log("Exiting firstFunction context.");
}

firstFunction(); // Execution context for firstFunction starts here



console.log("\n--- 3. Eval Execution Context ---");
/**
 * 3. Eval Execution Context
 * Code executed inside the built-in `eval()` function also gets its own execution 
 * context. However, `eval` is generally considered dangerous and bad practice, 
 * so this context is rarely used in modern web development.
 */

const a = 10;
eval('const b = 20; console.log("Eval context: a + b =", a + b);'); 
// Output: Eval context: a + b = 30



/**
 * ============================================================================
 * The Execution Stack (Call Stack)
 * ============================================================================
 *
 * JavaScript is single-threaded, meaning it can only execute one task at a time.
 * To manage these different contexts, JS uses an "Execution Stack" (or Call Stack).
 *
 * It is a LIFO (Last In, First Out) data structure:
 * 
 * 1. Script starts -> Global Execution Context is pushed to the bottom of the stack.
 * 2. `firstFunction()` is called -> A new Function Context is created and pushed on top.
 * 3. `secondFunction()` is called -> Another Function Context is created and pushed on top.
 * 4. `secondFunction()` finishes -> Its context is popped off the stack.
 * 5. `firstFunction()` finishes -> Its context is popped off the stack.
 * 6. Program ends -> Global Context is destroyed.
 */
