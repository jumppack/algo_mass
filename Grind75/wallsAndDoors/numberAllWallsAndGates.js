
// Import the compiled Queue class
// Note: We reference the .js file in the dist folder because we compiled it with tsc
import { Queue } from '../../utilities/dist/queue.js';
import assert from 'node:assert/strict';

const EMPTY = 2147483647;
const GATE = 0;
const DIRECTIONS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
];

/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function(rooms) {
    const m = rooms.length;
    if (m === 0) return;
    const n = rooms[0].length;

    // We can use our custom Queue class here
    // In JS, we don't need to specify the generic type <number[]>
    const q = new Queue();

    for (let row = 0; row < m; row++) {
        for (let col = 0; col < n; col++) {
            if (rooms[row][col] === GATE) {
                q.enqueue([row, col]);
            }
        }
    }

    while (!q.isEmpty()) {
        const point = q.dequeue();
        const row = point[0];
        const col = point[1];

        for (const direction of DIRECTIONS) {
            const r = row + direction[0];
            const c = col + direction[1];

            // Check boundaries and if the room is empty
            if (r < 0 || c < 0 || r >= m || c >= n || rooms[r][c] !== EMPTY) {
                continue;
            }

            // Update distance
            rooms[r][c] = rooms[row][col] + 1;
            q.enqueue([r, c]);
        }
    }
};

// --- Test Cases ---

// Test Case 1: Standard case from problem description
const INF = 2147483647;
const rooms1 = [
    [INF,  -1,  0,  INF],
    [INF, INF, INF,  -1],
    [INF,  -1, INF,  -1],
    [  0,  -1, INF, INF]
];

const expected1 = [
    [  3,  -1,   0,   1],
    [  2,   2,   1,  -1],
    [  1,  -1,   2,  -1],
    [  0,  -1,   3,   4]
];

wallsAndGates(rooms1);

// Deep comparison to verify correctness
try {
    assert.deepEqual(rooms1, expected1);
    console.log("Test Case 1 Passed!");
} catch (e) {
    console.error("Test Case 1 Failed!");
    console.error("Expected:", expected1);
    console.error("Actual:", rooms1);
}

// Test Case 2: Empty grid
const rooms2 = [];
wallsAndGates(rooms2);
assert.deepEqual(rooms2, [], "Test Case 2 (Empty) Passed!");
console.log("Test Case 2 Passed!");

// Test Case 3: No gates
const rooms3 = [[INF, INF], [INF, INF]];
const expected3 = [[INF, INF], [INF, INF]]; // Should remain unchanged as unreachable
wallsAndGates(rooms3);
assert.deepEqual(rooms3, expected3);
console.log("Test Case 3 Passed!");