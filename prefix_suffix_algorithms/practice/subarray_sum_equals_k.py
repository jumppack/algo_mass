"""
Problem: Subarray Sum Equals K (LeetCode 560)

Given an array of integers nums and an integer k, return the total number 
of continuous subarrays whose sum equals to k.

Concept:
We look for a subarray such that Sum(i, j) = k.
Using prefix sums: P[j] - P[i-1] = k
Rearranging: P[i-1] = P[j] - k

This means as we iterate through the array (calculating current prefix sum P[j]), 
we just need to check if there is a previous prefix sum equal to (P[j] - k).
We use a HashMap (dictionary) to store the frequency of each prefix sum encountered so far.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

def subarray_sum(nums: List[int], k: int) -> int:
    count = 0
    current_sum = 0
    # Map: prefix_sum -> count
    # Initialize with {0: 1} to handle the case where a subarray starting from index 0 equals k.
    prefix_counts = {0: 1}
    
    for num in nums:
        current_sum += num
        
        # Check if (current_sum - k) exists in our map
        if (current_sum - k) in prefix_counts:
            count += prefix_counts[current_sum - k]
            
        # Add current_sum to map
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
        
    return count

# Test cases
if __name__ == "__main__":
    test1 = [1, 1, 1]
    k1 = 2
    print(f"Arr: {test1}, k={k1} -> {subarray_sum(test1, k1)}") # Expected: 2 ([1,1], [1,1])
    
    test2 = [1, 2, 3]
    k2 = 3
    print(f"Arr: {test2}, k={k2} -> {subarray_sum(test2, k2)}") # Expected: 2 ([1,2], [3])
