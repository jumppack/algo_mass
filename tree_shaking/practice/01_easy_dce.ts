/**
 * PRACTICE: LEVEL 1 - EASY
 * TOPIC: Dead Code Elimination (The basics of Tree Shaking)
 * 
 * GOAL:
 * We want to write a simple function that simulates "shaking" a file.
 * We have a list of declaration names (function names defined in a file)
 * and a list of used names (function names actually called).
 * Your job is to return ONLY the names that should be kept.
 * 
 * CONCEPT:
 * This represents the final step of a bundler: once it knows what is used,
 * it drops everything else.
 */

// 1. Data Structures
// We pretend a "Module" is just a list of function names it exports.
type ModuleExports = string[];

// We pretend "Usage" is a list of function names actually called in the app.
type UsageReport = string[];

/**
 * Perform basic Dead Code Elimination.
 * 
 * @param allExports - A list of all functions available in a file.
 * @param usedExports - A list of functions that are actually imported and used.
 * @returns A list of functions to KEEP.
 */
export function deadCodeElimination(allExports: ModuleExports, usedExports: UsageReport): string[] {
    // A Set is a data structure that allows fast lookups (O(1)).
    // Ideally, we want to check if an export is in the 'usedExports' list quickly.
    const usedSet = new Set(usedExports);
    
    // We filter the list of all exports.
    // We only keep an export if it exists in our 'usedSet'.
    const keptCode = allExports.filter(exportName => {
        const isUsed = usedSet.has(exportName);
        
        // Log for learning purposes
        if (isUsed) {
            console.log(`[KEEP] Function '${exportName}' is used.`);
        } else {
            console.log(`[DROP] Function '${exportName}' is unused. Shaking it off!`);
        }
        
        return isUsed;
    });

    return keptCode;
}

// --- TEST AREA ---
// You can run this file to see the output!

console.log("--- Starting Tree Shaking Simulation (Easy) ---");

// Imagine a file 'math.ts' with these exports:
const myMathModule = ["add", "subtract", "multiply", "divide", "squareRoot"];

// Imagine our app only uses these:
const myAppUsage = ["add", "multiply"];

const finalBundle = deadCodeElimination(myMathModule, myAppUsage);

console.log("\n--- Result ---");
console.log("Original File Size (functions):", myMathModule.length);
console.log("Final Bundle Size (functions):", finalBundle.length);
console.log("Bundled Functions:", finalBundle);

/**
 * HOMEWORK / REFLECTION:
 * 1. What happens if 'myAppUsage' contains a name that isn't in 'myMathModule'? 
 *    (e.g., we try to use a function that doesn't exist).
 *    In a real bundler, this would throw a "Module not found" or "Export not found" error.
 */
