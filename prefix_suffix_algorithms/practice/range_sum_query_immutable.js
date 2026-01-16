/**
 * Problem: Range Sum Query - Immutable (LeetCode 303)
 * 
 * Given an integer array nums, handle multiple queries of the following type:
 * Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
 * 
 * Time Complexity:
 * - Initialization: O(N)
 * - Query: O(1)
 * 
 * Space Complexity: O(N)
 */

class NumArray {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        // Create prefix sum array of size N+1
        // prefix[i] stores sum of elements nums[0...i-1]
        this.prefix = new Array(nums.length + 1).fill(0);

        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }

    /**
     * @param {number} left 
     * @param {number} right 
     * @return {number}
     */
    sumRange(left, right) {
        // Sum(left, right) = P[right+1] - P[left]
        return this.prefix[right + 1] - this.prefix[left];
    }
}

// Test cases
const nums = [-2, 0, 3, -5, 2, -1];
const obj = new NumArray(nums);
console.log(`Sum(0, 2): ${obj.sumRange(0, 2)}`); // Expected: 1
console.log(`Sum(2, 5): ${obj.sumRange(2, 5)}`); // Expected: -1
console.log(`Sum(0, 5): ${obj.sumRange(0, 5)}`); // Expected: -3
