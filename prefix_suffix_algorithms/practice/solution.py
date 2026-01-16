"""
Problem: Find the Equilibrium Index of an Array

An equilibrium index of an array is an index such that the sum of elements 
at lower indexes is equal to the sum of elements at higher indexes.

Example:
Input: [-7, 1, 5, 2, -4, 3, 0]
Output: 3
Explanation:
Left sum (at index 3) = -7 + 1 + 5 = -1
Right sum (at index 3) = -4 + 3 + 0 = -1
"""

from typing import List

def find_equilibrium_index(arr: List[int]) -> int:
    """
    Finds the first equilibrium index in the array.
    Returns -1 if no such index exists.
    
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    
    total_sum = sum(arr)  # Calculate total sum of the array
    left_sum = 0
    
    for i, num in enumerate(arr):
        # right_sum can be calculated as total_sum - left_sum - cur_num
        right_sum = total_sum - left_sum - num
        
        if left_sum == right_sum:
            return i
            
        # Update left_sum for the next iteration
        left_sum += num
        
    return -1

# Test cases
if __name__ == "__main__":
    test_1 = [-7, 1, 5, 2, -4, 3, 0]
    print(f"Index for {test_1}: {find_equilibrium_index(test_1)}")  # Expected: 3
    
    test_2 = [1, 2, 3]
    print(f"Index for {test_2}: {find_equilibrium_index(test_2)}")  # Expected: -1
