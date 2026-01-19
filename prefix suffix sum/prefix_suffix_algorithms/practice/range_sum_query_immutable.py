"""
Problem Link: https://leetcode.com/problems/range-sum-query-immutable/
Difficulty: Easy

Problem Description:
Design a data structure that handles multiple queries of the following type:
1. `sumRange(left, right)`: Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive.

Key Concepts:
- Prefix Sum Array
- Preprocessing vs Query Time Trade-off

Intuition:
If we just iterate from `left` to `right` for every query, the time taken is proportional to the length of the range (O(N)).
If we have many queries (say M queries), the total time would be O(M * N), which is too slow.

By pre-calculating the running totals (prefix sums) once, we can answer any range sum query in O(1) time.
`Sum(left, right) = PrefixSum[right] - PrefixSum[left - 1]`

Algorithm:
1. **Initialization (__init__)**:
   - Create a `prefix` array of size `N + 1`.
   - We use size `N + 1` to handle the edge case where `left = 0` elegantly (so we don't index out of bounds).
   - `prefix[i]` will store the sum of `nums[0]` up to `nums[i-1]`.
   - `prefix[0]` will be 0.

2. **Query (sumRange)**:
   - Return `prefix[right + 1] - prefix[left]`.

Time Complexity:
- Initialization: O(N) to build the array.
- Query: O(1) constant time per lookup.

Space Complexity: O(N) to store the prefix sum array.
"""

from typing import List

class NumArray:

    def __init__(self, nums: List[int]):
        # Initialize prefix array with N+1 zeros
        # self.prefix[k] covers sum of nums[0...k-1]
        self.prefix = [0] * (len(nums) + 1)
        
        # Build the prefix sum array
        for i in range(len(nums)):
            # New prefix sum = Previous prefix sum + Current number
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        # Formula: P[right+1] - P[left]
        # P[right+1] includes nums[0]...nums[right]
        # P[left] includes nums[0]...nums[left-1]
        # Subtracting gives nums[left]...nums[right]
        return self.prefix[right + 1] - self.prefix[left]


# ---------------------------------------------------
# Test Cases
# ---------------------------------------------------
if __name__ == "__main__":
    nums = [-2, 0, 3, -5, 2, -1]
    obj = NumArray(nums)
    
    print(f"Array: {nums}")
    print(f"Sum(0, 2): {obj.sumRange(0, 2)} (Expected: 1)") # -2 + 0 + 3 = 1
    print(f"Sum(2, 5): {obj.sumRange(2, 5)} (Expected: -1)") # 3 + -5 + 2 + -1 = -1
    print(f"Sum(0, 5): {obj.sumRange(0, 5)} (Expected: -3)") 
