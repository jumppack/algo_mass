"""
Problem: Product of Array Except Self (LeetCode 238)

Given an integer array nums, return an array answer such that answer[i] is equal 
to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operation.

Concept:
answer[i] = (Product of all left elements) * (Product of all right elements)
We can use a prefix product array and a suffix product array.
To optimize space to O(1) (excluding output array), we can calculate left products 
directly into the result array, and then multiply by right products on the fly.

Time Complexity: O(N)
Space Complexity: O(1) extra space (result array doesn't count).
"""

from typing import List

def product_except_self(nums: List[int]) -> List[int]:
    n = len(nums)
    answer = [1] * n
    
    # Pass 1: Calculate left products (prefix products)
    # answer[i] will contain product of nums[0...i-1]
    left_product = 1
    for i in range(n):
        answer[i] = left_product
        left_product *= nums[i]
        
    # Pass 2: Calculate right products (suffix products) and multiply
    # We maintain a running right_product
    right_product = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= right_product
        right_product *= nums[i]
        
    return answer

# Test cases
if __name__ == "__main__":
    test1 = [1, 2, 3, 4]
    print(f"Arr: {test1} -> {product_except_self(test1)}") # Expected: [24, 12, 8, 6]
    
    test2 = [-1, 1, 0, -3, 3]
    print(f"Arr: {test2} -> {product_except_self(test2)}") # Expected: [0, 0, 9, 0, 0]
