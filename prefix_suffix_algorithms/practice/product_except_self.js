/**
 * Problem: Product of Array Except Self (LeetCode 238)
 * 
 * Given an integer array nums, return an array answer such that answer[i] is equal 
 * to the product of all the elements of nums except nums[i].
 * 
 * Algorithm must be O(N) time and O(1) extra space.
 * 
 * Concept:
 * Use a running prefix product (leftProduct) stored in the result array.
 * Then iterate backwards with a running suffix product (rightProduct) and multiply.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) (excluding output array)
 */

function productExceptSelf(nums) {
    const n = nums.length;
    const answer = new Array(n).fill(1);

    // Pass 1: Calculate left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        answer[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Pass 2: Calculate right products and multiply
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return answer;
}

// Test cases
const test1 = [1, 2, 3, 4];
console.log(`Arr: [${test1}] -> ${productExceptSelf(test1)}`); // Expected: [24, 12, 8, 6]

const test2 = [-1, 1, 0, -3, 3];
console.log(`Arr: [${test2}] -> ${productExceptSelf(test2)}`); // Expected: [0, 0, 9, 0, 0]
