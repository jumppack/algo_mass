/**
 * Problem Link: https://leetcode.com/problems/product-of-array-except-self/
 * Difficulty: Medium
 * 
 * Problem Description:
 * Return an array where each `answer[i]` is the product of all elements except `nums[i]`.
 * Must be O(N) time and O(1) extra space (no division allowed).
 * 
 * Key Concepts:
 * - Prefix Product and Suffix Product
 * - In-place Computation
 * 
 * Intuition:
 * `Result[i] = (Left Product) * (Right Product)`
 * Left Product at i = Product of `0` to `i-1`.
 * Right Product at i = Product of `i+1` to `N-1`.
 * 
 * We can compute all Left Products first and store them in the result array.
 * Then, we can iterate backwards, keeping a running "Right Product" and multiplying it into the result array.
 * 
 * Algorithm:
 * 1. Fill `answer` with 1s.
 * 2. Iterate `i` from 0 to N: `answer[i] = leftProduct`. `leftProduct *= nums[i]`.
 * 3. Iterate `i` from N-1 down to 0: `answer[i] *= rightProduct`. `rightProduct *= nums[i]`.
 * 
 * Time Complexity: O(N) - Two passes.
 * Space Complexity: O(1) - Ignoring output array.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    const n = nums.length;
    // Initialize answer array
    const answer = new Array(n).fill(1);

    // Pass 1: Calculate Left Products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Pass 2: Calculate Right Products & Multiply
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        // Multiply by the product of all elements to the right
        answer[i] *= rightProduct;

        // Accumulate current number for the next position
        rightProduct *= nums[i];
    }

    return answer;
}

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const test1 = [1, 2, 3, 4];
console.log(`Test 1: [${test1}] -> ${productExceptSelf(test1)}`); // Expected: [24, 12, 8, 6]

const test2 = [-1, 1, 0, -3, 3];
console.log(`Test 2: [${test2}] -> ${productExceptSelf(test2)}`); // Expected: [0, 0, 9, 0, 0]
