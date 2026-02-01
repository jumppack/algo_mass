/**
 * A generic Queue implementation using a generic object (dictionary) for storage.
 * This ensures O(1) time complexity for both enqueue and dequeue operations,
 * unlike using Array.prototype.shift() which is O(n).
 */
export class Queue {
    /**
     * Defines a queue data structure
     * @param initialElements - Optional array of elements to initialize the queue with.
     */
    constructor(initialElements) {
        this._storage = {};
        this._head = 0;
        this._tail = 0;
        if (initialElements) {
            for (const el of initialElements) {
                this.enqueue(el);
            }
        }
    }
    /**
     * Adds an element to the back of the queue.
     * Time Complexity: O(1)
     */
    enqueue(item) {
        this._storage[this._tail] = item;
        this._tail++;
    }
    /**
     * Removes and returns the element at the front of the queue.
     * Returns undefined if the queue is empty.
     * Time Complexity: O(1)
     */
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const item = this._storage[this._head];
        // Delete the reference to allow garbage collection
        delete this._storage[this._head];
        this._head++;
        // Reset pointers if empty to keep index numbers small
        if (this.isEmpty()) {
            this._head = 0;
            this._tail = 0;
        }
        return item;
    }
    /**
     * Returns the element at the front of the queue without removing it.
     * Returns undefined if the queue is empty.
     * Time Complexity: O(1)
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this._storage[this._head];
    }
    /**
     * Returns true if the queue is empty, false otherwise.
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this.size() === 0;
    }
    /**
     * Returns the number of elements in the queue.
     * Time Complexity: O(1)
     */
    size() {
        return this._tail - this._head;
    }
    /**
     * Removes all elements from the queue.
     * Time Complexity: O(1)
     */
    clear() {
        this._storage = {};
        this._head = 0;
        this._tail = 0;
    }
}
