/**
 * ============================================================================
 * JavaScript Function Context: `call` vs `bind` (and a bit of `apply`)
 * ============================================================================
 *
 * Both `call` and `bind` are methods built into all standard JavaScript functions
 * (they live on Function.prototype).
 *
 * Their primary purpose is to allow you to explicitly set the value of `this` 
 * when a function executes, overriding the default behavior of how `this` is 
 * determined (which normally depends on *how* the function is invoked).
 *
 * THE CORE DIFFERENCE:
 * 1. `call()`: INVOCATION. It executes the function IMMEDIATELY with the specified `this` context.
 * 2. `bind()`: CREATION. It DOES NOT execute the function immediately. Instead, it 
 *    RETURNS A NEW FUNCTION with the specified `this` context permanently locked in. 
 *    You can execute this new function later.
 */

// Let's set up a scenario where we have some objects and a separate function.

const userAlice = {
    name: "Alice",
    role: "Admin"
};

const userBob = {
    name: "Bob",
    role: "Editor"
};

// A standalone function that relies on `this`
function introduce(greeting, punctuation) {
    // Note: If called normally like introduce(), `this` would be the global window 
    // object (or undefined in strict mode), and this.name would fail or be undefined.
    console.log(`${greeting}! I am ${this.name} and I am an ${this.role}${punctuation}`);
}


console.log("--- 1. The .call() Method ---");
/**
 * .call(thisArg, arg1, arg2, ...)
 * Executes the function instantly.
 * The first argument is what `this` will point to.
 * Subsequent arguments are passed to the target function individually.
 */

// We "borrow" the function and execute it immediately, pretending it belongs to userAlice
introduce.call(userAlice, "Hello", "."); 
// Output: Hello! I am Alice and I am an Admin.

// We do the same for userBob
introduce.call(userBob, "Welcome", "!"); 
// Output: Welcome! I am Bob and I am an Editor!



console.log("\n--- 2. The .apply() Method (Bonus) ---");
/**
 * .apply(thisArg, [argsArray])
 * Exactly identical to .call(), evaluating instantly, EXCEPT you pass the arguments
 * as an Array rather than a comma-separated list.
 * Helpful when you have dynamic arguments grouped in an array.
 */
const bobArgs = ["Hi there", "!!!"];
introduce.apply(userBob, bobArgs);
// Output: Hi there! I am Bob and I am an Editor!!!



console.log("\n--- 3. The .bind() Method ---");
/**
 * .bind(thisArg, arg1, arg2, ...)
 * DOES NOT execute immediately.
 * Returns a totally new function exotic object where `this` is permanently 
 * hardcoded to be `thisArg`. You invoke it when you're ready.
 */

// We create a new function specifically bound to Alice
const aliceIntroduction = introduce.bind(userAlice);

// At this point, nothing has been logged. The function wasn't executed.
console.log("-> Function created using bind. Executing it now:");

// Now we can execute it later, passing only the actual function arguments
aliceIntroduction("Greetings", "..."); 
// Output: Greetings! I am Alice and I am an Admin...

// Even if we try to force context later, bind is permanent!
const attemptToSteal = aliceIntroduction.bind(userBob);
attemptToSteal("Hello", "?"); // It will still run as Alice!



console.log("\n--- 4. Real World Use Case for .bind() ---");
/**
 * Why would you want to delay execution?
 * `bind` is incredibly useful for event listeners, setTimeout, or callbacks 
 * where the environment executes the function for you later, often messing up `this`.
 */

const gameHandler = {
    playerName: "Karan",
    score: 0,
    startGame: function() {
        console.log(`Starting game for ${this.playerName}...`);

        // setTimeout executes its callback in the global context, so `this` gets lost!
        // Using bind() lets us lock `this` to the gameHandler object before passing it.
        setTimeout(function() {
            this.score += 100;
            console.log(`Score updated! New score for ${this.playerName} is ${this.score}`);
        }.bind(this), 1000); 

        // Modern alternative: Arrow functions automatically inherit `this` from 
        // the surrounding lexical scope, which is why we don't need bind() as 
        // much if we use arrows!
        // setTimeout(() => { ... }, 1000);
    }
};

gameHandler.startGame();
