/**
 * Problem Link: https://leetcode.com/problems/contiguous-array/
 * Difficulty: Medium
 * 
 * Problem Description:
 * Given a binary array (must contain only 0 and 1), find the maximum length of a contiguous subarray with an equal number of 0 and 1.
 * 
 * Key Concepts:
 * - Prefix Sum
 * - HashMap
 * - Problem Transformation (0 -> -1)
 * 
 * Intuition:
 * By treating `0` as `-1`, "Equal number of 0s and 1s" becomes "Sum is 0".
 * `Sum(i, j) == 0` implies `PrefixSum[j] == PrefixSum[i-1]`.
 * 
 * To maximize the length `j - (i-1)`, we need to find the *first* time `PrefixSum[j]` appeared.
 * 
 * Algorithm:
 * 1. `Map` stores `{sum: firstIndex}`. Init `{0: -1}`.
 * 2. Loop `i` from 0 to N:
 *    - `sum += (nums[i] == 1 ? 1 : -1)`
 *    - If `map.has(sum)`: calculate `len = i - map.get(sum)`. Update max.
 *    - Else: `map.set(sum, i)`.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export default function findMaxLength(nums) {
    let maxLen = 0;
    let currSum = 0;

    // Map: prefixSum -> firstIndex
    // Initialize with 0:-1 so that if we encounter a sum of 0 at index i, 
    // the length is i - (-1) = i + 1.
    const sumIndices = new Map();
    sumIndices.set(0, -1);

    for (let i = 0; i < nums.length; i++) {
        // Transform 0 -> -1, 1 -> 1
        currSum += (nums[i] === 1 ? 1 : -1);

        if (sumIndices.has(currSum)) {
            // We've seen this sum before!
            // The subarray between the first time we saw it and now sums to 0.
            const length = i - sumIndices.get(currSum);
            maxLen = Math.max(maxLen, length);
        } else {
            // Only memorize the first time we see this sum
            // to allow for maximum possible subarray length later.
            sumIndices.set(currSum, i);
        }
    }

    return maxLen;
}

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
// const test1 = [0, 1];
// console.log(`Test 1: [${test1}] -> ${findMaxLength(test1)} (Expected: 2)`);

// const test2 = [0, 1, 0];
// console.log(`Test 2: [${test2}] -> ${findMaxLength(test2)} (Expected: 2)`);

// const test3 = [0, 1, 0, 1];
// console.log(`Test 3: [${test3}] -> ${findMaxLength(test3)} (Expected: 4)`);

// const test4 = [1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1];
// console.log(`Test 4: [${test4}] -> ${findMaxLength(test4)} (Expected: 14)`);