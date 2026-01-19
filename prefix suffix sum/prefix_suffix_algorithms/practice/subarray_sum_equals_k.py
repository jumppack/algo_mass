"""
Problem Link: https://leetcode.com/problems/subarray-sum-equals-k/
Difficulty: Medium

Problem Description:
Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.

Key Concepts:
- Prefix Sum
- Hashing (HashMap / Dictionary)
- Frequency Counting

Intuition:
A simple prefix sum approach check `P[j] - P[i] == k` for all pairs loops in O(N^2). We need O(N).
We know that `Sum(i, j) = PrefixSum[j] - PrefixSum[i-1]`.
We want `Sum(i, j) == k`.
Therefore: `PrefixSum[j] - PrefixSum[i-1] == k`
Rearranging: `PrefixSum[i-1] == PrefixSum[j] - k`

This means: As we iterate through the array and calculate the current running sum (`PrefixSum[j]`), we look back and ask: "How many times have I seen a prefix sum equal to `CurrentSum - k` before?"
If I have seen it `X` times, it means there are `X` valid subarrays ending at my current position that sum to `k`.

Algorithm:
1. Initialize `count = 0` and `current_sum = 0`.
2. Initialize a hash map `prefix_counts = {0: 1}`. 
   - WHY {0:1}? This represents a "virtual" prefix sum of 0 before the array starts. It handles the case where `current_sum` itself exactly equals `k` (since `current_sum - k = 0`).
3. Iterate through `nums`:
   - Add `num` to `current_sum`.
   - Check if `(current_sum - k)` is in the map. If yes, add its count to the result.
   - Update the map: increment the count for `current_sum`.

Time Complexity: O(N) - Single pass through the array. Map lookups are O(1) on average.
Space Complexity: O(N) - In the worst case (all prefix sums are unique), the map stores N entries.
"""

from typing import List

def subarray_sum(nums: List[int], k: int) -> int:
    count = 0
    current_sum = 0
    
    # Hash Map to store frequency of prefix sums found so far.
    # Key: Prefix Sum Value -> Value: Frequency Count
    # Initial state {0: 1} is CRITICAL. It means "a sum of 0 has occurred once (at the start)".
    prefix_counts = {0: 1}
    
    for num in nums:
        # Update running prefix sum
        current_sum += num
        
        # Explain: We need a previous prefix sum P_prev such that:
        # current_sum - P_prev = k  =>  P_prev = current_sum - k
        needed_prefix = current_sum - k
        
        if needed_prefix in prefix_counts:
            # Add the number of times we've seen this needed prefix sum
            count += prefix_counts[needed_prefix]
            
        # Record the current sum into the map for future checks
        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
        
    return count

# ---------------------------------------------------
# Test Cases
# ---------------------------------------------------
if __name__ == "__main__":
    test1 = [1, 1, 1]
    k1 = 2
    # Prefixes: [0 (init), 1, 2, 3]
    # At i=1 (sum=2): need 0. Map has 0->1. Count+=1. Map 2->1.
    # At i=2 (sum=3): need 1. Map has 1->1. Count+=1.
    print(f"Test 1: {test1}, k={k1} -> {subarray_sum(test1, k1)} (Expected: 2)")
    
    test2 = [1, 2, 3]
    k2 = 3
    print(f"Test 2: {test2}, k={k2} -> {subarray_sum(test2, k2)} (Expected: 2)")
