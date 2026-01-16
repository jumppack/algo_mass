/**
 * Problem: Subarray Sum Equals K (LeetCode 560)
 * 
 * Given an array of integers nums and an integer k, return the total number 
 * of continuous subarrays whose sum equals to k.
 * 
 * Concept:
 * Use a Map to store frequency of prefix sums.
 * If (currentSum - k) exists in the map, it means we found subarrays ending here 
 * that sum to k.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function subarraySum(nums, k) {
    let count = 0;
    let currentSum = 0;

    // Map: prefixSum -> frequency
    // Initialize with 0:1 to handle subarrays starting from index 0
    const prefixCounts = new Map();
    prefixCounts.set(0, 1);

    for (const num of nums) {
        currentSum += num;

        // Check if (currentSum - k) exists in map
        if (prefixCounts.has(currentSum - k)) {
            count += prefixCounts.get(currentSum - k);
        }

        // Update map
        prefixCounts.set(currentSum, (prefixCounts.get(currentSum) || 0) + 1);
    }

    return count;
}

// Test cases
const test1 = [1, 1, 1];
const k1 = 2;
console.log(`Arr: [${test1}], k=${k1} -> ${subarraySum(test1, k1)}`); // Expected: 2

const test2 = [1, 2, 3];
const k2 = 3;
console.log(`Arr: [${test2}], k=${k2} -> ${subarraySum(test2, k2)}`); // Expected: 2
