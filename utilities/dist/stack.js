/**
 * A generic Stack implementation using an Array.
 * Arrays in JavaScript/TypeScript are already optimized for stack operations (push/pop)
 * as they operate at the end of the array (O(1)).
 */
export class Stack {
    /**
     * Initializes the stack.
     * @param initialElements - Optional array of elements to initialize the stack with.
     */
    constructor(initialElements) {
        this._storage = [];
        if (initialElements) {
            this._storage = [...initialElements];
        }
    }
    /**
     * Adds an element to the top of the stack.
     * Time Complexity: O(1)
     */
    push(item) {
        this._storage.push(item);
    }
    /**
     * Removes and returns the element at the top of the stack.
     * Returns undefined if the stack is empty.
     * Time Complexity: O(1)
     */
    pop() {
        return this._storage.pop();
    }
    /**
     * Returns the element at the top of the stack without removing it.
     * Returns undefined if the stack is empty.
     * Time Complexity: O(1)
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this._storage[this._storage.length - 1];
    }
    /**
     * Returns true if the stack is empty, false otherwise.
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this._storage.length === 0;
    }
    /**
     * Returns the number of elements in the stack.
     * Time Complexity: O(1)
     */
    size() {
        return this._storage.length;
    }
    /**
     * Removes all elements from the stack.
     * Time Complexity: O(1)
     */
    clear() {
        this._storage = [];
    }
}
