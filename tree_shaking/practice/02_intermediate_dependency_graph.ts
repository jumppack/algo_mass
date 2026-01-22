/**
 * PRACTICE: LEVEL 2 - INTERMEDIATE
 * TOPIC: Dependency Graph Traversal
 * 
 * GOAL:
 * Real tree shaking isn't just about one list of names. It's about a WEB of files.
 * If file A imports file B, and file B imports file C, then we need C!
 * Even if file A never imports C directly.
 * 
 * This algorithm simulates "Marking" live modules by crawling the graph.
 */

// --- DATA STRUCTURES ---

// A "Module" represents a single file.
interface Module {
  id: string;          // e.g., "index.ts"
  code: string;        // The actual content (ignored for this sim)
  dependencies: string[]; // List of IDs this module imports (e.g., ["math.ts", "utils.ts"])
}

// A "Graph" is a collection of all available modules in the project.
// Key = Module ID, Value = The Module object
type ModuleGraph = Record<string, Module>;

/**
 * The Tree Shaking Algorithm (Graph Traversal)
 * 
 * @param entryPointId - The file we start at (e.g., "index.ts")
 * @param graph - All files on the disk
 * @returns A Set of Module IDs that are "Live" (Reachable)
 */
export function buildDependencyGraph(entryPointId: string, graph: ModuleGraph): Set<string> {
  console.log(`\nStarting analysis from entry point: ${entryPointId}`);
  
  // 1. The Set of "Live" modules. We start empty.
  const liveModules = new Set<string>();

  // 2. A Queue for Breadth-First Search (BFS).
  // We push the entry point to start.
  const queue: string[] = [entryPointId];

  // While we still have files to process...
  while (queue.length > 0) {
      // Get the next file ID from the queue
      const currentId = queue.shift()!; // '!' tells TS we know it exists

      // Security check: Does this file actually exist?
      if (!graph[currentId]) {
          console.error(`ERROR: Module '${currentId}' missing from graph!`);
          continue;
      }

      // Optimization: If we already visited this file, skip it!
      // This prevents infinite loops (circular dependencies A -> B -> A).
      if (liveModules.has(currentId)) {
          continue;
      }

      // MARK: Mark this module as live.
      liveModules.add(currentId);
      console.log(`[MARK] Marked '${currentId}' as live.`);

      // SWEEP: Look at its dependencies (imports)
      const currentModule = graph[currentId];
      for (const depId of currentModule.dependencies) {
          // Add them to the queue to be processed next
          queue.push(depId);
      }
  }

  return liveModules;
}

// --- TEST AREA ---

// Let's define a fake project structure
const myProject: ModuleGraph = {
  // Entry point
  "index.ts": { 
      id: "index.ts", 
      code: "import { add } from './math'; console.log(add(1,2));", 
      dependencies: ["math.ts"] 
  },
  
  // Math depends on Utils
  "math.ts": { 
      id: "math.ts", 
      code: "import { isNumber } from './utils'; ...", 
      dependencies: ["utils.ts"] 
  },
  
  // Utils has NO dependencies (Leaf node)
  "utils.ts": { 
      id: "utils.ts", 
      code: "export const isNumber = ...", 
      dependencies: [] 
  },
  
  // This file is on the disk, but NOBODY imports it!
  // It should NOT be in the final result.
  "dead_legacy_code.ts": {
      id: "dead_legacy_code.ts",
      code: "console.log('I am old code');",
      dependencies: ["utils.ts"] 
  }
};

const liveIds = buildDependencyGraph("index.ts", myProject);

console.log("\n--- Bundler Result ---");
console.log("All Files on Disk:", Object.keys(myProject));
console.log("Files Included in Bundle:", Array.from(liveIds));

if (!liveIds.has("dead_legacy_code.ts")) {
  console.log("SUCCESS: 'dead_legacy_code.ts' was correctly tree-shaken away!");
} else {
  console.log("FAIL: Dead code was included.");
}
