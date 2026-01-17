"""
Problem Link: https://leetcode.com/problems/product-of-array-except-self/
Difficulty: Medium

Problem Description:
Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.
The algorithm must run in O(n) time and without using the division operation.

Key Concepts:
- Prefix Product
- Suffix Product
- Space Optimization

Intuition:
If we were allowed division, we could just calculate total product (P) and return `P / nums[i]`. (Caveat: dealing with Zeros would be tricky).
Without division, we can observe that:
`answer[i] = (Product of all elements to left of i) * (Product of all elements to right of i)`
`answer[i] = PrefixProduct[i-1] * SuffixProduct[i+1]`

We can calculate prefix products in one pass (O(N)) and suffix products in another pass (O(N)).
To optimize space to O(1) (excluding the output array), we can:
1. Use the `answer` array to store `PrefixProduct`.
2. Iterate backwards maintaining a running `SuffixProduct` variable and multiply it into `answer` in-place.

Algorithm:
1. Initialize `answer` array with 1s.
2. **Left Pass**:
   - Iterate sum accumulator from left to right.
   - Store cumulative product (up to i-1) in `answer[i]`.
3. **Right Pass**:
   - Iterate sum accumulator from right to left.
   - Maintain a running `right_product`.
   - `answer[i] = answer[i] * right_product`.
   - Update `right_product`.

Time Complexity: O(N) - Two linear passes.
Space Complexity: O(1) - Apart from the output array, we use only scalar variables.
"""

from typing import List

def product_except_self(nums: List[int]) -> List[int]:
    n = len(nums)
    answer = [1] * n
    
    # Pass 1: Build Prefix Products
    # At the end of this loop, answer[i] will contain product of nums[0...i-1]
    left_product = 1
    for i in range(n):
        answer[i] = left_product
        left_product *= nums[i]
        
    # Pass 2: Build Suffix Products and Multiply
    # We maintain `right_product` which represents product of nums[i+1...n-1]
    right_product = 1
    for i in range(n - 1, -1, -1):
        # answer[i] currently holds left_product.
        # We multiply it by right_product to get the final result.
        answer[i] *= right_product
        
        # Update right_product for the next iteration step (moving left)
        right_product *= nums[i]
        
    return answer

# ---------------------------------------------------
# Test Cases
# ---------------------------------------------------
if __name__ == "__main__":
    test1 = [1, 2, 3, 4]
    # Expect: [24, 12, 8, 6]
    # 0: 2*3*4=24, 1: 1*3*4=12, 2: 1*2*4=8, 3: 1*2*3=6
    print(f"Test 1: {test1} -> {product_except_self(test1)}") 
    
    test2 = [-1, 1, 0, -3, 3]
    # Expect: [0, 0, 9, 0, 0] (0 makes everything else 0, except the index OF the 0)
    print(f"Test 2: {test2} -> {product_except_self(test2)}")
