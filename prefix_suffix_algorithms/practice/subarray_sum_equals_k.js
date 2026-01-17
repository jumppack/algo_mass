/**
 * Problem Link: https://leetcode.com/problems/subarray-sum-equals-k/
 * Difficulty: Medium
 * 
 * Problem Description:
 * Find the total number of continuous subarrays whose sum equals `k`.
 * 
 * Key Concepts:
 * - Prefix Sum
 * - HashMap (for O(1) lookups)
 * - Frequency Counting
 * 
 * Intuition:
 * To avoid O(N^2) nested loops, we use the property:
 * `Sum(subarray) = CurrentPrefixSum - OldPrefixSum`
 * If `Sum(subarray) == k`, then `OldPrefixSum = CurrentPrefixSum - k`.
 * 
 * We iterate once, and for every element, we check: "Have we seen a prefix sum equal to `CurrentSum - k` before?"
 * The answer is stored in a HashMap that counts how many times each prefix sum has appeared.
 * 
 * Algorithm:
 * 1. `count = 0`, `currentSum = 0`.
 * 2. `map = {0: 1}` (Base case for subarrays starting at index 0).
 * 3. Iterate:
 *    - `currentSum += num`
 *    - `target = currentSum - k`
 *    - `if (map.has(target)) count += map.get(target)`
 *    - `map.set(currentSum, map.get(currentSum) + 1)`
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function subarraySum(nums, k) {
    let count = 0;
    let currentSum = 0;

    // Map stores: Prefix Sum -> Frequency
    const prefixCounts = new Map();

    // Initialize with sum 0 appearing 1 time.
    // This allows us to count subarrays that start from index 0 directly.
    prefixCounts.set(0, 1);

    for (const num of nums) {
        currentSum += num;

        // The value we need to find in our history
        const neededPrefix = currentSum - k;

        // If we have seen (currentSum - k) before, add that frequency to our count
        if (prefixCounts.has(neededPrefix)) {
            count += prefixCounts.get(neededPrefix);
        }

        // Update the map with the current sum
        prefixCounts.set(currentSum, (prefixCounts.get(currentSum) || 0) + 1);
    }

    return count;
}

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const test1 = [1, 1, 1];
const k1 = 2;
console.log(`Test 1: [${test1}], k=${k1} -> ${subarraySum(test1, k1)} (Expected: 2)`);

const test2 = [1, 2, 3];
const k2 = 3;
console.log(`Test 2: [${test2}], k=${k2} -> ${subarraySum(test2, k2)} (Expected: 2)`);
