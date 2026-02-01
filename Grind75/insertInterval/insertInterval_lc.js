const insertInterval = function (intervals, newInterval) {
    let n = intervals.length,
        i = 0,
        res = [];

    // Case1: No overlapping till the end of current interval is
    // less that start of new interval
    while( i < n && intervals[i][1] < newInterval[0]) {
        // Just keep adding the current intervals to the
        // output
        res.push(intervals[i]);
        i++;
    }

    // At this point all intervals before the start of new Intervals have been
    // added. So we reach here either because the list has exhausted
    // or current interval's end is after newInterval's start

    // Case2: Overlapping case:
    // Here, the newInterval's start is less that the current interva's end
    // With each overlapping interval, we keep updating the newInterval's boundairs
    while (i < n && intervals[i][0] <= newInterval[1] ) {
        // 
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
        i++;
    }

    res.push(newInterval);

    // Case 3: Merge after the overlapping is done
    while (i < n) {
        res.push(intervals[i]);
        i++;
    }

    return res;
}

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
intervals = [[1, 2]];
newInterval = [];
expected = [[],[1,2]];
assert.deepEqual(insertInterval(intervals, newInterval), expected)
