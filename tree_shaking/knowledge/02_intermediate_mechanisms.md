# Tree Shaking: Intermediate Mechanisms

Now that we understand the *what* and *why*, let's dive into the *how*. How does a machine know which parts of your code are "live"?

## 1. The Magic of ES Modules (ESM)

Tree shaking relies heavily on **ES Modules** (the `import` and `export` syntax).

### Static vs. Dynamic
*   **CommonJS (require)**: Dynamic. You can compute what to import at runtime.
    ```javascript
    // CommonJS - Hard to tree shake
    const moduleName = condition ? 'featureA' : 'featureB';
    const feature = require(moduleName);
    ```
    Because `moduleName` isn't known until the code *runs*, a bundler can't safely exclude anything at *build time*.

*   **ES Modules (import)**: Static. Imports must happen at the top level and cannot be dynamic (standard static imports).
    ```javascript
    // ESM - Easy to tree shake
    import { featureA } from './features';
    ```
    The bundler can read the file *text* and know exactly what dependencies exist without running the code.

## 2. The Abstract Syntax Tree (AST)

To analyze your code, tools like Webpack or Rollup parse your code into a tree structure called an **Abstract Syntax Tree (AST)**.

### Example
**Code:**
```typescript
import { add } from './math';
console.log(add(1, 2));
```

**Simplified AST View:**
*   `Program`
    *   `ImportDeclaration`
        *   `Specifier`: "add"
        *   `Source`: "./math"
    *   `ExpressionStatement`
        *   `CallExpression` (console.log)
            *   `CallExpression` (add)

### The Algorithm step-by-step:
1.  **Parse**: Connect `index.ts` to its AST.
2.  **Scan Imports**: The bundler sees `ImportDeclaration` for `add`.
3.  **Trace Usage**: It scans the rest of the AST. found `CallExpression(add)`.
4.  **Mark**: The export `add` in `./math.ts` is marked as "used".
5.  **Sweep**: Any other exports in `./math.ts` (like `subtract` or `divide`) that were NOT marked are unused. They are dropped from the final output.

## 3. The "Scope Hoisting" Effect

Efficient bundlers often use "Scope Hoisting" (Module Concatenation). Instead of wrapping every module in a separate function (which adds runtime overhead), they try to place all your code into a single scope.

**Input:**
```javascript
// math.js
export const add = (a, b) => a + b;
export const sub = (a, b) => a - b;

// index.js
import { add } from './math';
console.log(add(1, 2));
```

**Output (Bundled):**
```javascript
// The 'sub' function is gone completely!
const add = (a, b) => a + b;
console.log(add(1, 2));
```

This visualization helps understand that tree shaking is essentially a **reachability analysis** on a graph of variables and functions.
