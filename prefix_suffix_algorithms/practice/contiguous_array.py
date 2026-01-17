"""
Problem Link: https://leetcode.com/problems/contiguous-array/
Difficulty: Medium

Problem Description:
Given a binary array `nums` (containing only 0s and 1s), return the maximum length of a contiguous subarray with an equal number of 0s and 1s.

Key Concepts:
- Prefix Sum
- Hashing (HashMap)
- Array Transformation

Intuition:
The problem asks for "Equal number of 0s and 1s". 
This is equivalent to finding a subarray with `Sum == 0` if we treat 0s as -1 and 1s as +1.
If we can find a subarray `nums[i...j]` whose sum is 0, then that subarray has equal 1s and 0s.

Using prefix sums: `Sum(i, j) = P[j] - P[i-1]`.
We want `P[j] - P[i-1] == 0`, which means `P[j] == P[i-1]`.

So the problem reduces to: 
"Find two indices `x` and `y` (where `y > x`) such that `PrefixSum[x] == PrefixSum[y]`."
The length of the subarray is `y - x`. To maximize length, we want to maximize `y - x`.
This means for every unique `PrefixSum` value we encounter, we want to know the *earliest* index it appeared.

Algorithm:
1. Initialize `max_len = 0` and `current_sum = 0`.
2. Initialize `sum_indices = {0: -1}`.
   - WHY {0: -1}? This handles cases where the subarray starts from index 0. If at index `i` our sum becomes 0, the length is `i - (-1) = i + 1`.
3. Iterate through `nums`:
   - If `num` is 1, add 1. If `num` is 0, subtract 1.
   - If `current_sum` has been seen before:
     - We found a zero-sum subarray ending at current index.
     - Calculate length: `current_index - sum_indices[current_sum]`.
     - Update `max_len`.
   - If `current_sum` has NOT been seen before:
     - Store it: `sum_indices[current_sum] = current_index`.
     - IMPORTANT: Do NOT update if it's already there, because we want to keep the *oldest* index to maximize length.

Time Complexity: O(N) - One pass.
Space Complexity: O(N) - Map stores at most N unique sum values.
"""

from typing import List

def find_max_length(nums: List[int]) -> int:
    max_len = 0
    curr_sum = 0
    
    # Hash Map to store the FIRST occurrence of a cumulative sum.
    # Key: Prefix Sum Value -> Value: Index
    sum_indices = {0: -1}
    
    for i, num in enumerate(nums):
        # Transform the value: 1 -> +1, 0 -> -1
        if num == 1:
            curr_sum += 1
        else:
            curr_sum -= 1
        
        # Check if we have seen this cumulative sum before
        if curr_sum in sum_indices:
            # The subarray between the first occurrence (prev_index) and current index (i) has a sum of 0.
            # It implies equal number of 0s and 1s.
            prev_index = sum_indices[curr_sum]
            length = i - prev_index
            max_len = max(max_len, length)
        else:
            # Store this sum with its index.
            # We only store it if it's NEW, because we want the earliest index for max length.
            sum_indices[curr_sum] = i
            
    return max_len

# ---------------------------------------------------
# Test Cases
# ---------------------------------------------------
if __name__ == "__main__":
    test1 = [0, 1]
    # Sums: 0 (init), -1 (at 0), 0 (at 1) -> Match 0! Len = 1 - (-1) = 2
    print(f"Test 1: {test1} -> {find_max_length(test1)} (Expected: 2)")
    
    test2 = [0, 1, 0]
    # Sums: 0, -1, 0, -1 -> Matches at 0 and -1.
    print(f"Test 2: {test2} -> {find_max_length(test2)} (Expected: 2)")
