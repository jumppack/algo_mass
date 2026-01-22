/**
 * PRACTICE: LEVEL 3 - EXPERT
 * TOPIC: Fine-Grained Reachability & Side Effects
 * 
 * GOAL:
 * A modern bundler (like Webpack 5) doesn't just check if a FILE is used.
 * It checks if specific STATEMENTS are used. 
 * It also handles "Side Effects" - code that runs just because you imported the file.
 * 
 * ALGORITHM:
 * usage:
 * 1. Start at Root.
 * 2. Mark imported statements.
 * 3. Handle Side Effects: If a module is unused but triggers side effects, keep it?
 */

// --- DATA TYPES ---

type StatementType = "Import" | "ExportDecl" | "SideEffect" | "PureCalculation";

interface Statement {
    id: number;
    type: StatementType;
    content: string;
    // For Exports: What is the name of the exported symbol?
    exportName?: string; 
    // For PureCalculation: Is it marked as /#_PURE_/?
    isPure?: boolean;
}

interface Module {
    name: string;
    sideEffects: boolean; // package.json "sideEffects" flag
    statements: Statement[];
}

// Result of our analysis
interface BundleResult {
    includedModules: string[];
    droppedStatements: string[]; // List of statement contents we removed
}

/**
 * Expert Tree Shaker Simulation
 * 
 * We are simulating the decision: "Should we keep this module?"
 * 
 * SCENARIO: 
 * We have imported a module, but we are NOT using any of its exports.
 * e.g. import { Unused } from './lib';
 */
export function analyzeModule(mod: Module, isExportUsed: boolean): string {
    console.log(`\nAnalyzing Module: ${mod.name}`);
    console.log(` - Used by app? ${isExportUsed}`);
    console.log(` - 'sideEffects' flag? ${mod.sideEffects}`);

    // CASE 1: The app actually uses an export from this file.
    if (isExportUsed) {
        return "KEEP (Exports Used)";
    }

    // CASE 2: The app does NOT use exports.
    // However, we must respect the "sideEffects" flag.
    
    if (mod.sideEffects === true) {
        // The author says: "I have side effects! Don't delete me!"
        // Even though exports aren't used, we might need to keep the file execution.
        return "KEEP (Side Effects Logic Only)";
    } 
    
    // CASE 3: No exports used, and author says "sideEffects: false".
    // We can safely delete everything!
    else {
        return "DROP (Tree Shaken)";
    }
}

/**
 * Statement Level Optimization (The /#_PURE_/ Annotation)
 */
export function optimizeStatements(statements: Statement[]): Statement[] {
    return statements.filter(stmt => {
        // If it's a Pure Calculation (e.g., `const x = heavyMath()`)
        // AND it is not exported (simplified for this demo)...
        // We can remove it if we assume it's unused in this local scope.
        
        if (stmt.type === "PureCalculation" && stmt.isPure) {
            console.log(`[OPTIMIZER] Removing Pure unused statement: "${stmt.content}"`);
            return false; // Remove
        }
        
        if (stmt.type === "PureCalculation" && !stmt.isPure) {
            console.log(`[OPTIMIZER] Keeping Impure statement (might trigger side effect): "${stmt.content}"`);
            return true; // Keep
        }

        return true; // Keep everything else
    });
}

// --- TEST AREA ---

// 1. A library with "sideEffects: false" (The Gold Standard)
const modernLib: Module = {
    name: "modern-utils.ts",
    sideEffects: false,
    statements: []
};

// 2. A library with "sideEffects: true" (The Old/Safety Way)
const legacyLib: Module = {
    name: "legacy-polyfils.ts",
    sideEffects: true,
    statements: []
};

console.log("--- PART 1: Module Level Decisions ---");
console.log(`1. Modern Lib (Unused): ${analyzeModule(modernLib, false)}`);
console.log(`2. Modern Lib (Used):   ${analyzeModule(modernLib, true)}`);
console.log(`3. Legacy Lib (Unused): ${analyzeModule(legacyLib, false)}`);
// Notice that #3 is KEPT even though it is Unused! This represents bloat.


console.log("\n--- PART 2: Statement Level Optimization ---");

const myCode: Statement[] = [
    { id: 1, type: "PureCalculation", content: "/*#__PURE__*/ calculateHugePrimes()", isPure: true },
    { id: 2, type: "PureCalculation", content: "console.log('I am a side effect log')", isPure: false },
    { id: 3, type: "ExportDecl", content: "export const hello = 'world'" }
];

const finalizedCode = optimizeStatements(myCode);

console.log("\nFinal Code Statements:");
finalizedCode.forEach(s => console.log(` - ${s.content}`));

/**
 * LESSON:
 * See how statement #1 was dropped? 
 * Because it was marked Pure and we simulated it being unused locally.
 * Statement #2 was kept because it was NOT marked pure (it logs to console).
 */
