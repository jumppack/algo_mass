/**
 * Problem Link: https://leetcode.com/problems/product-of-array-except-self/
 * Difficulty: Medium
 * 
 * Problem Description:
 * Return an array where each `answer[i]` is the product of all elements except `nums[i]`.
 * Must be O(N) time and O(1) extra space (no division allowed).
 * 
 * Key Concepts:
 * - Prefix Product and Suffix Product
 * - In-place Computation
 * 
 * Intuition:
 * `Result[i] = (Left Product) * (Right Product)`
 * Left Product at i = Product of `0` to `i-1`.
 * Right Product at i = Product of `i+1` to `N-1`.
 * 
 * We can compute all Left Products first and store them in the result array.
 * Then, we can iterate backwards, keeping a running "Right Product" and multiplying it into the result array.
 * 
 * Algorithm:
 * 1. Fill `answer` with 1s.
 * 2. Iterate `i` from 0 to N: `answer[i] = leftProduct`. `leftProduct *= nums[i]`.
 * 3. Iterate `i` from N-1 down to 0: `answer[i] *= rightProduct`. `rightProduct *= nums[i]`.
 * 
 * Time Complexity: O(N) - Two passes.
 * Space Complexity: O(1) - Ignoring output array.
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
import productExceptSelf from "./product_except_self.js";
// Using brute force O(n^2)
// function productExceptSelfMine(nums) {
//     let answer = Array.from({ length: nums.length }).fill(1)


//     for (let i = 0; i < nums.length; i++) {
//         let product = 1;
//         for (let j = 0; j < nums.length; j++) {
//             if (i != j) {
//                 product *= nums[j];
//             } else {
//                 // do nothing. No mulitplication} 
//             }
//         }
//         answer[i] = product;
//     }

//     return answer;
// }

// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------

// Generates an array with value in range -10 to 10

function productExceptSelfMine(nums) {
    let answer = Array.from({ length: nums.length });

    let leftProduct = Array.from({ length: nums.length + 1 }).fill(1);
    let rightProduct = Array.from({ length: nums.length + 1 }).fill(1);


    for (let i = 1; i < nums.length; i++) {
        leftProduct[i] = leftProduct[i - 1] * nums[i - 1]
    }

    for (let j = nums.length - 2; j >= 0; j--) {
        rightProduct[j] = rightProduct[j + 1] * nums[j + 1];
    }

    for (let k = 0; k < nums.length; k++) {
        answer[k] = leftProduct[k] * rightProduct[k];
    }

    return answer;
}


function generateTestArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 21) - 10)
}

const test1 = generateTestArray(6);
console.log(`Test 1: [${test1}] -> ${productExceptSelfMine(test1)} || Expected : ${productExceptSelf(test1)}`);

const test2 = generateTestArray(8);
console.log(`Test 2: [${test2}] -> ${productExceptSelfMine(test2)} || Expected: ${productExceptSelf(test2)}`);

const test3 = generateTestArray(5);
console.log(`Test3: [${test3}] -> ${productExceptSelfMine(test3)} || Expected: ${productExceptSelf(test3)}`)