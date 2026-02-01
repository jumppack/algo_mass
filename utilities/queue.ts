/**
 * Generic Queue interface defining standard queue operations.
 */
export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
}

/**
 * A generic Queue implementation using a generic object (dictionary) for storage.
 * This ensures O(1) time complexity for both enqueue and dequeue operations,
 * unlike using Array.prototype.shift() which is O(n).
 */
export class Queue<T> implements IQueue<T> {
  private _storage: Record<number, T> = {};
  private _head: number = 0;
  private _tail: number = 0;

  /**
   * Defines a queue data structure
   * @param initialElements - Optional array of elements to initialize the queue with.
   */
  constructor(initialElements?: T[]) {
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
  enqueue(item: T): void {
    this._storage[this._tail] = item;
    this._tail++;
  }

  /**
   * Removes and returns the element at the front of the queue.
   * Returns undefined if the queue is empty.
   * Time Complexity: O(1)
   */
  dequeue(): T | undefined {
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
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._storage[this._head];
  }

  /**
   * Returns true if the queue is empty, false otherwise.
   * Time Complexity: O(1)
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Returns the number of elements in the queue.
   * Time Complexity: O(1)
   */
  size(): number {
    return this._tail - this._head;
  }

  /**
   * Removes all elements from the queue.
   * Time Complexity: O(1)
   */
  clear(): void {
    this._storage = {};
    this._head = 0;
    this._tail = 0;
  }
}
