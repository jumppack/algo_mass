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
var nearestValidPoint = function(x, y, points) {
    // edge cases: 
    if (points.length === 0) return -1;
    if (points[0].length !== 2) return -1;

    let smallestValidDistance = Number.MAX_SAFE_INTEGER;
    let smallestValidIdx = Number.MAX_SAFE_INTEGER ;

    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (!isValidPoint(point, x, y)) {
            continue;
        }

        let dist = computeDistance([x, y], point);
        
        if (dist <= smallestValidDistance) {
            if (dist === smallestValidDistance) {
                smallestValidIdx = Math.min(i, smallestValidIdx);
            } else {
                smallestValidIdx = i
            }
            smallestValidDistance = dist;
        }
    }

    return smallestValidIdx === Number.MAX_SAFE_INTEGER ? -1 : smallestValidIdx;
};


// A point is valid if either its x or y coordinate matches the given x, y
let isValidPoint = function (point, x, y) {
    return (x === point[0] || y === point[1]);
}


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

