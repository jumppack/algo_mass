// You are given two integers, x and y, which represent your current location 
// on a Cartesian grid: (x, y). You are also given an array points
//  where each points[i] = [ai, bi] represents that a point exists at (ai, bi).
// 
//  A point is valid if it shares the same x-coordinate or the same y-coordinate 
// as your location.

// Return the index (0-indexed) of the valid point with the smallest Manhattan distance 
// from your current location. If there are multiple, return the valid point with the 
// smallest index. If there are no valid points, return -1.

// The Manhattan distance between two points (x1, y1) and (x2, y2) 
// is abs(x1 - x2) + abs(y1 - y2).

/**
 * @param {number} x
 * @param {number} y
 * @param {number[][]} points
 * @return {number}
 */
/**
 * Main function to find the index of the nearest valid point.
 * 
 * Time Complexity: O(N) where N is the number of points. We iterate through the array of points exactly once.
 * Space Complexity: O(1) as we only use a few variables to store the current minimum distance and its index.
 * 
 * @param {number} x - The x-coordinate of our current location
 * @param {number} y - The y-coordinate of our current location
 * @param {number[][]} points - An array of points where each point is an array [ai, bi]
 * @return {number} - The index of the nearest valid point, or -1 if no valid points exist
 */
var nearestValidPoint = function(x, y, points) {
    // --- STEP 1: Handle Edge Cases ---
    // If the points array is empty, there are no valid points to check, so we return -1.
    if (points.length === 0) return -1;
    // If the first point doesn't have exactly 2 coordinates (x, y), the input might be malformed.
    if (points[0].length !== 2) return -1;

    // --- STEP 2: Initialize tracking variables ---
    // We use Number.MAX_SAFE_INTEGER as our initial "infinity" value. 
    // This allows the first valid distance we find to easily safely overwrite this value.
    let smallestValidDistance = Number.MAX_SAFE_INTEGER;
    let smallestValidIdx = Number.MAX_SAFE_INTEGER;

    // --- STEP 3: Iterate through all available points ---
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        
        // Check if the current point is valid (must share the same x or y coordinate)
        if (!isValidPoint(point, x, y)) {
            // If it's not valid, we skip this point and move to the next one
            continue;
        }

        // --- STEP 4: Calculate the distance for valid points ---
        // If the point is valid, calculate the Manhattan distance from our current tracking location (x, y) 
        // to the current point.
        let dist = computeDistance([x, y], point);
        
        // --- STEP 5: Update the nearest point if the new distance is smaller or equal ---
        // We only care if the newly calculated distance is less than OR strictly equal to our current minimum.
        if (dist <= smallestValidDistance) {
            // If the distance is exactly the same as our current minimum distance:
            if (dist === smallestValidDistance) {
                // The problem states: "If there are multiple, return the valid point with the smallest index."
                // So, we keep the index that is numerically smaller (since we iterate from 0 to n, `i` will fundamentally be increasing, but this handles it safely)
                smallestValidIdx = Math.min(i, smallestValidIdx);
            } else {
                // If the distance is strictly smaller, we update our closest index directly.
                smallestValidIdx = i;
            }
            // Update the tracked smallest valid distance to the newly found smaller distance.
            smallestValidDistance = dist;
        }
    }

    // --- STEP 6: Return the result ---
    // If smallestValidIdx is still Number.MAX_SAFE_INTEGER, it means we NEVER found a valid point 
    // during our loop. In that case, we return -1 based on the problem requirements.
    // Otherwise, we return the index of the closest point.
    return smallestValidIdx === Number.MAX_SAFE_INTEGER ? -1 : smallestValidIdx;
};


/**
 * Helper function to determine if a point is "valid".
 * A point is valid if it shares either the same x-coordinate or the same y-coordinate as our location.
 * This represents horizontal (same y) or vertical (same x) alignment on the grid.
 */
let isValidPoint = function (point, x, y) {
    // point[0] is the x-coordinate of the point in the array.
    // point[1] is the y-coordinate of the point in the array.
    return (x === point[0] || y === point[1]);
}


/**
 * Helper function to calculate the Manhattan distance between two points.
 * 
 * Manhattan Distance is fundamentally the distance between two points measured along axes at right angles.
 * Formula: |x1 - x2| + |y1 - y2|
 * 
 * Note: Since we only calculate distance for valid points, one of the differences (either x or y) 
 * will always be 0. So technically, the distance here ends up being just the absolute difference 
 * of the coordinates that don't match!
 */
let computeDistance = function (point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

import assert from 'node:assert/strict';

// Test Case 1: Standard example
// x=3, y=4, points=[[1,2],[3,1],[2,4],[2,3],[4,4]]
// Valid points: [3,1] (dist 3), [2,4] (dist 1), [4,4] (dist 1)
// Smallest dist is 1. Indices 2 and 4. Smallest index is 2.
assert.equal(nearestValidPoint(3, 4, [[1,2],[3,1],[2,4],[2,3],[4,4]]), 2, "Test Case 1 Failed");

// Test Case 2: Exact match
assert.equal(nearestValidPoint(3, 4, [[3,4]]), 0, "Test Case 2 Failed");

// Test Case 3: No valid points
assert.equal(nearestValidPoint(3, 4, [[2,3]]), -1, "Test Case 3 Failed");

// Test Case 4: Multiple points same distance, return smallest index
// x=1, y=1. points=[[1,2], [2,1], [1,0]]
// [1,2] -> valid (x match), dist 1. Index 0.
// [2,1] -> valid (y match), dist 1. Index 1.
// [1,0] -> valid (x match), dist 1. Index 2.
// Expected: 0
assert.equal(nearestValidPoint(1, 1, [[1,2], [2,1], [1,0]]), 0, "Test Case 4 Failed");

console.log("All NearestPoint tests passed!");

