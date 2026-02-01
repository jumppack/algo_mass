var insertInterval = function (intervals, newInterval) {
    // If the intervals vector is empty, return an array containing the newInterval
    if (intervals.length === 0) {
        return [newInterval];
    }

    let n = intervals.length;
    let target = newInterval[0];
    let left = 0,
        right = n - 1;

    // Binary search to find the position to insert newInterval
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (intervals[mid][0] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Insert newInterval at the found position
    intervals.splice(left, 0, newInterval);

    // Merge overlapping intervals
    let res = [];
    for (let interval of intervals) {
        // If res is empty or there is no overlap, add the interval to the result
        if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
            res.push(interval);
            // If there is an overlap, merge the intervals by updating the end of the last interval in res
        } else {
            res[res.length - 1][1] = Math.max(
                res[res.length - 1][1],
                interval[1],
            );
        }
    }

    return res;
};

import assert from "node:assert/strict";

// Test 1: 
let intervals = [
    [1, 3],
    [6, 9]
]
let newInterval = [2, 5]
let expected = [
    [1, 5],
    [6, 9]
]
assert.deepEqual(insertInterval(intervals, newInterval), expected);


// Test 2: 
intervals = [
    [1, 2],
    [3, 5],
    [6, 7],
    [8, 10],
    [12, 16]
]

newInterval = [4, 8];
expected = [
    [1, 2],
    [3, 10],
    [12, 16]
]
assert.deepEqual(insertInterval(intervals, newInterval), expected);


// Test 3: 
intervals = [];
newInterval = [2, 43];
expected = [[2, 43]];
assert.deepEqual(insertInterval(intervals, newInterval), expected);

// Test 4:
// intervals = [[1, 2]];
// newInterval = [];
// expected = [[],[1,2]];
// assert.deepEqual(insertInterval(intervals, newInterval), expected)