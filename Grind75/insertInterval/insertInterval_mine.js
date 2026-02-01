// You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

// Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

// Return intervals after the insertion.

// Note that you don't need to modify intervals in-place. You can make a new array and return it.

 

// Example 1:

// Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output: [[1,5],[6,9]]
// Example 2:

// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]
// Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */

// We use two status messages which says startMerge, mergeIdentified. 
// on an iteration if mergeIdentified is true then we call doMerge

// doMerge takes a number of array to merge 
// Signature: 2 args, idsx: Array<number>. These are then indexes to merge
//                      arr: Array<[number, number>>: the array who intervals needs to be merged

var insert = function(intervals, newInterval) {
    // Pre checks
    if (newInterval.length == 0) { return intervals;}
    if (intervals.length == 0 ) { return [newInterval];}

    let [newStart, newEnd] = newInterval;
    let out = [];

    // some error conditions
    if ((newStart > newEnd) || (newInterval.length !== 2)) {
        console.error("incorrect new interval")
        throw new Error();
    }

    // Check edge conditions here are return early
    // Edge condition: 
    //  if newEnd < intervals[0][0]
    //      then: return an new array with newInterval moved to the start
    //              i.e. out = Array.from(intervalsds)
    //                   out.unshift(newIntervals)
    //                   return out

    // if newStart > intervals[interval.length - 1][1]
    //      then: return a new array with newInterval moved to the end
    //              i.e. out = Array.from(intervals);
    //                   out.push(newIntervals)
    //                  return out
    if (newEnd < intervals[0][0]) {
        console.log('edge case 1')
        out = Array.from(intervals);
        out.unshift(newInterval)
        return out;
    }

    if (newStart > intervals[intervals.length - 1][1]) {
        console.log('edge case 2')
        out = Array.from(intervals);
        out.push(newInterval);
        return out; 
    }

    // Main logic: 
    /**
     * Steps
     * 1. Get the newIntervals start and end number
     * 2. Iterate over the intervals array and check the following
     *      if (IntervalStartVal <= newIntervalStart <= IntervalEndVal)
     *          then: proceed to step 3
     *      else
     *          if (it was the last index we were checking)
     *              then push the new interval to the end of array
     *          else
     *              keep going forward
     *      
     * 3. If the condition matches then then next condition to check is 
     *      whether the newInterval lies in this interval or do we need to merge
     *      if (newIntervalEnd <= IntevalEndVal)
     *          then: just merge the newInterval with the interval at index
     *      else
     *          We need to merge a few intervals so put the current interval
     *          into a toMerge array.
     *     
     */
    console.log(' main logic started')
    let mergeState = false;
    let idxToMerge = [];
    for (let i = 0; i < intervals.length; i++) {
        let [start, end] = intervals[i];

        if (mergeState) {
            if (start <= newEnd) {
                idxToMerge.push(i)
                console.log('continue merge')
                continue;
            } else {
                console.log('Merge has been identified')
                mergeState = false;
                break;
            }
        } else {
            if ((start <= newStart && newStart <= end) 
            || (start <= newEnd && newEnd <= end)) {
                console.log('Starting matched at idx' + i)
            // check if the interval falls completely into this interval
                if (newEnd <= end) {
                    // just update this interval and return the new array
                    console.log('Match found inside a terminal')
                    out = Array.from(intervals);
                    out[i][0] = Math.min(start, newStart);
                    out[i][1] = Math.max(end, newEnd);
                    return out;
                }
                console.log('Will have to merge idx starting from ' + i)
                idxToMerge.push(i);
                mergeState = true;
            }
        }
    }

    console.log('Idx to Merge are' + idxToMerge);
    out = doMerge(idxToMerge, newStart, newEnd, intervals);
    return out;
};

function doMerge(idxs, newStart, newEnd, intervals) {
    console.log('Doing merge')
    let mergeStartIdx = idxs[0];
    let mergeEndIdx = idxs[idxs.length - 1];

    console.log(mergeStartIdx);
    console.log(mergeEndIdx);

    let mergeStartVal = Math.min(intervals[mergeStartIdx][0], newStart);
    console.log(mergeStartVal);
    // Then end will the max of either the newInterval's end or the end of the last element of idxs
    let mergeEndVal = Math.max(intervals[mergeEndIdx][1], newEnd);
    console.log(mergeEndVal);
    let mergeInterval = [mergeStartVal, mergeEndVal];
    console.log(mergeInterval);

    let deleteCount = mergeEndIdx - mergeStartIdx + 1;
    console.log('Delete count ' +deleteCount)
    let out = Array.from(intervals);
    out.splice(mergeStartIdx, deleteCount , mergeInterval)
    console.log('Merged out is ' + out )
    return out;
}

import assert from "node:assert/strict";
// testcase for edge case
// testEdgeCaseFirst
let intervals = [
    [3, 5],
    [6, 9]
]
let newInterval = [1, 2]
let expected = [ [1, 2], [3, 5], [6, 9] ]
assert.deepEqual(insert(intervals, newInterval), expected);

// testEdgeCaseLas
newInterval = [10, 20]
expected = [ [3, 5], [6, 9], [10, 20] ] 
assert.deepEqual(insert(intervals, newInterval), expected)


// main logic
intervals = [
    [1, 3],
    [6, 9]
]
newInterval = [2, 5];
expected = [
    [1, 5],
    [6, 9]
]
assert.deepEqual(insert(intervals, newInterval), expected)


// Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
// Output: [[1,2],[3,10],[12,16]]

intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
newInterval = [4,8];
expected = [[1,2],[3,10],[12,16]]
assert.deepEqual(insert(intervals, newInterval), expected)