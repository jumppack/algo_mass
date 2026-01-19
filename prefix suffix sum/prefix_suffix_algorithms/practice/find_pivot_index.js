/**
 * Problem Link: https://leetcode.com/problems/find-pivot-index/
 * Difficulty: Easy
 * 
 * Problem Description:
 * Given an array of integers `nums`, calculate the pivot index of this array.
 * The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
 * 
 * Key Concepts:
 * - Prefix Sum
 * - Mathematical Optimization
 * 
 * Intuition:
 * Instead of re-calculating sums for every index (O(N^2)), we can derive the Right Sum if we know the Total Sum and the current Left Sum.
 * Formula: `Right Sum = Total Sum - Left Sum - nums[i]`
 * We want to find `i` where: `Left Sum === Right Sum`
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function findPivotIndex(nums) {
    // Step 1: Calculate total sum
    // reduce is a clean way to sum an array in JS
    const totalSum = nums.reduce((acc, curr) => acc + curr, 0);

    // Step 2: Initialize running left sum
    let leftSum = 0;

    // Step 3: Iterate and check
    for (let i = 0; i < nums.length; i++) {
        // Calculate what the right sum MUST be for this index
        const rightSum = totalSum - leftSum - nums[i];

        if (leftSum === rightSum) {
            return i; // Found the leftmost pivot
        }

        // Add current number to leftSum for the NEXT iteration
        leftSum += nums[i];
    }

    return -1;
}

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const test1 = [1, 7, 3, 6, 5, 6];
console.log(`Test 1: [${test1}] -> ${findPivotIndex(test1)} (Expected: 3)`);

const test2 = [1, 2, 3];
console.log(`Test 2: [${test2}] -> ${findPivotIndex(test2)} (Expected: -1)`);

const test3 = [2, 1, -1];
console.log(`Test 3: [${test3}] -> ${findPivotIndex(test3)} (Expected: 0)`);
