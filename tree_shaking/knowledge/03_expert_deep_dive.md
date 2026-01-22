# Tree Shaking: Expert Deep Dive

At an expert level, Tree Shaking is less about "removing unused functions" and more about **preserving program correctness in the face of Side Effects**.

## 1. The "Side Effect" Problem

A **Side Effect** is when a function or module performs an action simply by being imported, even if its exports aren't used.

### Example of a Side Effect
```javascript
// analytics.js
console.log("Analytics module loaded!"); // Side effect!
window.globalCounter = 0;                // Side effect!

export const trackEvent = () => { ... };
```

**Scenario:**
You import `analytics.js` but never call `trackEvent`.
```javascript
import { trackEvent } from './analytics';
// trackEvent is UNUSED.
```

**The Dilemma:**
Should the bundler remove `analytics.js` entirely?
*   **If it removes it**: `window.globalCounter` is never set. If your app relies on that global, the app crashes.
*   **If it keeps it**: You are bundling code that isn't seemingly used, just to preserve the side effect.

**Safety First:** By default, bundlers are conservative. If they suspect a side effect *might* exist, they keep the code.

## 2. `sideEffects: false`

To solve this, package authors can give the bundler a hint in `package.json`.

```json
{
  "name": "my-library",
  "sideEffects": false
}
```

**Meaning:** "I promise that importing my files does NOT trigger any special behavior. If the exports aren't used, it is safe to delete the entire file."

This is the single most important optimization for npm libraries. If a massive UI library claims `"sideEffects": false`, importing one button won't bundle the entire CSS framework or global init scripts.

## 3. Deep Scope Analysis

Advanced optimizers (like Terser or inside Webpack 5+) perform deep flow analysis.

### Pure Annotation
You can annotate specific function calls to tell the bundler they are "pure" (have no side effects).

```javascript
/*#__PURE__*/ heavilyComputedValue();
```

If the result of `heavilyComputedValue()` is assigned to a variable that is unused, the bundler usually *still* runs the function because the function *might* log to console or change a global.
The `/*#__PURE__*/` comment tells the minifier: "If the result is unused, you can safely delete the function call entirely."

## 4. The Algorithm: Mark-and-Sweep Reachability

The core algorithm resembles Garbage Collection in memory management.

1.  **Roots**: Entry points (e.g., `main.tsx`) are "Roots".
2.  **Mark**:
    *   Traverse the AST.
    *   Follow `import` statements.
    *   Mark imported symbols as "Live".
    *   If a symbol is "Live", analyze its definition (scan the file it comes from).
    *   If that definition uses *other* symbols, mark them "Live" too (Recursion).
3.  **Side Effect Check**:
    *   If a module is imported but no exports are used:
    *   Check `sideEffects` flag.
    *   If `true` (default): Include the module code (evaluated) but drop exports.
    *   If `false`: Drop the module entirely.
4.  **Sweep**: Generate a new bundle containing only the "Live" nodes.

## Summary
*   **Safety**: Tree shaking is conservative to prevent breaking apps.
*   **Hints**: `sideEffects: false` and `/*#__PURE__*/` are critical hints we give the compiler.
*   **Mechanism**: It's a graph traversal problem looking for reachable code paths starting from the entry point.
