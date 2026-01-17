/**
 * Problem Link: https://leetcode.com/problems/range-sum-query-immutable/
 * Difficulty: Easy
 * 
 * Problem Description:
 * Design a class that handles multiple range sum queries efficiently.
 * `sumRange(left, right)` should return the sum of elements between `left` and `right`.
 * 
 * Key Concepts:
 * - Prefix Sum Array
 * - Class / Object-Oriented Design
 * 
 * Intuition:
 * Naive loop summation is O(N) per query. We want O(1).
 * We pre-calculate cumulative sums so that any range sum is just a subtraction of two pre-calculated values.
 * 
 * Algorithm:
 * 1. Constructor: Build an array `prefix` where `prefix[i]` stores the sum of the first `i` elements.
 * 2. `prefix[0]` is always 0 (identity for addition).
 * 3. `sumRange(L, R)` is simply `prefix[R + 1] - prefix[L]`.
 * 
 * Time Complexity: O(N) init, O(1) query.
 * Space Complexity: O(N) storage.
 */

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        // Create an array of size N+1 filled with 0
        this.prefix = new Array(nums.length + 1).fill(0);

        // Fill the prefix array
        for (let i = 0; i < nums.length; i++) {
            // current prefix sum = previous sum + current number
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }

    /**
     * @param {number} left 
     * @param {number} right 
     * @return {number}
     */
    sumRange(left, right) {
        // To get sum inclusive of right, we need index right+1
        // To exclude everything before left, subtract index left
        return this.prefix[right + 1] - this.prefix[left];
    }
}

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const nums = [-2, 0, 3, -5, 2, -1];
const obj = new NumArray(nums);

console.log(`Array: [${nums}]`);
console.log(`Sum(0, 2): ${obj.sumRange(0, 2)} (Expected: 1)`);
console.log(`Sum(2, 5): ${obj.sumRange(2, 5)} (Expected: -1)`);
console.log(`Sum(0, 5): ${obj.sumRange(0, 5)} (Expected: -3)`);
