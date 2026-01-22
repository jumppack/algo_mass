# Tree Shaking: Elementary Basics

## 1. What is Tree Shaking?

Imagine you are packing a backpack for a hiking trip. You have a drawer full of items: a compass, a map, a water bottle, a heavy textbook, and a snorkel.
*   **Goal**: Pack only what you need to survive and enjoy the hike.
*   **Action**: You take the compass, map, and water bottle. You leave the textbook and snorkel behind.

**Tree Shaking** is exactly this process for your code. It is a term commonly used in the JavaScript ecosystem to describe the removal of **dead code**.

### Why "Tree Shaking"?
The term was popularized by Rich Harris (creator of Rollup). Picture your application as a tree:
*   **Modules** (files) are leaves.
*   **Dependencies** are branches.
*   You shake the tree vigorously.
*   The brown, dead leaves (unused code) fall off.
*   The green, live leaves (used code) stay attached.

In a technical context, the bundler (like Webpack or Rollup) starts at your main entry point (e.g., `index.ts`) and marks any function or variable you *import* and *use* as "live". Everything else is considered "dead" and is excluded from the final bundle.

## 2. Why do we need it?

Modern web development relies heavily on third-party libraries (packages).
*   **Scenario**: You install a utility library like `lodash` which has 200+ functions.
*   **Usage**: You only import *one* function: `import { debounce } from 'lodash'`.
*   **Without Tree Shaking**: Your final code bundle might include *all 200+ functions*. This bloats your file size, slows down page load, and wastes user bandwidth.
*   **With Tree Shaking**: The bundler sees you only use `debounce` and drops the other 199 functions.

## 3. Dead Code Elimination (DCE) vs. Tree Shaking

While often used interchangeably, there is a subtle difference:
*   **DCE (Dead Code Elimination)**: Traditionally refers to optimizing code usage within a function or block. For example, `if (false) { doSomething() }` - a compiler knows `doSomething` will never run and removes it.
*   **Tree Shaking**: Refers specifically to **live code inclusion** at the module level. Instead of looking for dead code to cut, it looks for live code to keep.

## Summary
*   **Tree Shaking** = Only including code that is actually used.
*   **Benefit**: Smaller application size, faster performance.
*   **Requirement**: Requires a static module structure (ES Modules) to work effectively.
