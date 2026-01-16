"""
Problem: Range Sum Query - Immutable (LeetCode 303)

Given an integer array nums, handle multiple queries of the following type:
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.

Implement the NumArray class:
- NumArray(int[] nums) Initializes the object with the integer array nums.
- int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

Time Complexity:
- Initialization: O(N) to build the prefix sum array.
- Query: O(1) per query.

Space Complexity: O(N) to store the prefix sum array.
"""

from typing import List

class NumArray:

    def __init__(self, nums: List[int]):
        # We use a padded prefix sum array of size N+1 to handle the left=0 case easily.
        # self.prefix[i] stores the sum of nums[0...i-1]
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        # Sum(left, right) = P[right+1] - P[left]
        # logic: sum(0..right) - sum(0..left-1)
        return self.prefix[right + 1] - self.prefix[left]


# Test cases
if __name__ == "__main__":
    nums = [-2, 0, 3, -5, 2, -1]
    obj = NumArray(nums)
    print(f"Sum(0, 2): {obj.sumRange(0, 2)}") # Expected: 1 (-2 + 0 + 3)
    print(f"Sum(2, 5): {obj.sumRange(2, 5)}") # Expected: -1 (3 - 5 + 2 - 1)
    print(f"Sum(0, 5): {obj.sumRange(0, 5)}") # Expected: -3
