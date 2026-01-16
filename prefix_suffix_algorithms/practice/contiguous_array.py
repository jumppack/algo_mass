"""
Problem: Contiguous Array (LeetCode 525)

Given a binary array nums, return the maximum length of a contiguous subarray 
with an equal number of 0 and 1.

Concept:
This is a variation of the "Zero Sum Subarray" problem.
1. Transform the array: treat 0s as -1 and 1s as +1.
2. If the sum of a subarray is 0, it means it has equal numbers of -1s (0s) and +1s.
3. We use a HashMap to store the *first index* where we see a particular prefix sum.
4. If we see a prefix sum again at index j that we saw at index i, 
   it means the subarray between i and j sums to 0. Length = j - i.

Time Complexity: O(N)
Space Complexity: O(N)
"""

from typing import List

def find_max_length(nums: List[int]) -> int:
    max_len = 0
    curr_sum = 0
    # Map: prefix_sum -> first_index
    # Initialize {0: -1} to handle subarrays starting from index 0.
    sum_indices = {0: -1}
    
    for i, num in enumerate(nums):
        # Treat 0 as -1, 1 as 1
        curr_sum += 1 if num == 1 else -1
        
        if curr_sum in sum_indices:
            # We found a subarray with sum 0 ending at i
            length = i - sum_indices[curr_sum]
            max_len = max(max_len, length)
        else:
            # Only store the index if it's the first time seeing this sum
            # (because we want the longest subarray, so we want the earliest start index)
            sum_indices[curr_sum] = i
            
    return max_len

# Test cases
if __name__ == "__main__":
    test1 = [0, 1]
    print(f"Arr: {test1} -> {find_max_length(test1)}") # Expected: 2
    
    test2 = [0, 1, 0]
    print(f"Arr: {test2} -> {find_max_length(test2)}") # Expected: 2 ([0, 1] or [1, 0])
