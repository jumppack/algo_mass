"""
Problem Link: https://leetcode.com/problems/find-pivot-index/
Diffculty: Easy

Problem Description:
Given an array of integers `nums`, calculate the pivot index of this array.
The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.
If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.
Return the leftmost pivot index. If no such index exists, return -1.

Key Concepts:
- Prefix Sum
- Total Sum aggregation

Intuition:
We need valid index `i` such that `sum(0 to i-1) == sum(i+1 to n)`.
Calculating these sums for every index would take O(N^2) time.
However, we know that:
`Total Sum` = `Left Sum` + `nums[i]` + `Right Sum`

Therefore: `Right Sum` = `Total Sum` - `Left Sum` - `nums[i]`

So the condition `Left Sum == Right Sum` becomes:
`Left Sum` == `Total Sum` - `Left Sum` - `nums[i]`
`2 * Left Sum` == `Total Sum` - `nums[i]`

This allows us to solve the problem in a single pass (linear time) by maintaining a running `Left Sum`.

Time Complexity: O(N) - We iterate through the array once (actually twice: once for total, once for check).
Space Complexity: O(1) - We only store variables for sums, no extra array needed.
"""

from typing import List

def find_pivot_index(nums: List[int]) -> int:
    # Step 1: Calculate the total sum of the array.
    # This gives us the complete weight of the array allowing us to derive right_sum anytime.
    total_sum = sum(nums)
    
    # Step 2: Initialize running left_sum.
    left_sum = 0
    
    # Step 3: Iterate through the array to check each index as a candidate.
    for i, num in enumerate(nums):
        # Derive right_sum based on our formula
        right_sum = total_sum - left_sum - num
        
        # Check equilibrium condition
        if left_sum == right_sum:
            return i
            
        # Update left_sum to include the current number for the *next* iteration
        # (Since for the next index, the current number will be on the left)
        left_sum += num
        
    return -1

# ---------------------------------------------------
# Test Cases to Verify Logic
# ---------------------------------------------------
if __name__ == "__main__":
    # Case 1: Standard example
    test_1 = [1, 7, 3, 6, 5, 6] 
    # Index 3 (val 6): Left (1+7+3=11) == Right (5+6=11)
    print(f"Test 1: {test_1} -> {find_pivot_index(test_1)} (Expected: 3)")

    # Case 2: Pivot at standard left edge
    test_2 = [1, 2, 3] 
    # No equilibrium
    print(f"Test 2: {test_2} -> {find_pivot_index(test_2)} (Expected: -1)")
    
    # Case 3: Pivot at extreme left (index 0)
    test_3 = [2, 1, -1]
    # Index 0 (val 2): Left (0) == Right (1 + -1 = 0)
    print(f"Test 3: {test_3} -> {find_pivot_index(test_3)} (Expected: 0)")
