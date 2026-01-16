/**
 * Problem: Contiguous Array (LeetCode 525)
 * 
 * Given a binary array nums, return the maximum length of a contiguous subarray 
 * with an equal number of 0 and 1.
 * 
 * Concept:
 * Treat 0 as -1 and 1 as 1.
 * We want to find the longest subarray with sum 0.
 * Use a Map to store the *first index* of each prefix sum.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

function findMaxLength(nums) {
    let maxLen = 0;
    let currSum = 0;

    // Map: prefixSum -> firstIndex
    // Initialize with 0:-1 to handle subarrays starting from index 0
    const sumIndices = new Map();
    sumIndices.set(0, -1);

    for (let i = 0; i < nums.length; i++) {
        // Treat 0 as -1, 1 as 1
        currSum += (nums[i] === 1 ? 1 : -1);

        if (sumIndices.has(currSum)) {
            // Found a subarray with sum 0 between firstIndex and current i
            const length = i - sumIndices.get(currSum);
            maxLen = Math.max(maxLen, length);
        } else {
            // Only store if first time seeing this sum
            sumIndices.set(currSum, i);
        }
    }

    return maxLen;
}

// Test cases
const test1 = [0, 1];
console.log(`Arr: [${test1}] -> ${findMaxLength(test1)}`); // Expected: 2

const test2 = [0, 1, 0];
console.log(`Arr: [${test2}] -> ${findMaxLength(test2)}`); // Expected: 2
