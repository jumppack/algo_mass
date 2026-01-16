/**
 * Problem: Find the Equilibrium Index of an Array
 * 
 * An equilibrium index of an array is an index such that the sum of elements 
 * at lower indexes is equal to the sum of elements at higher indexes.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function findEquilibriumIndex(arr) {
    // Calculate total sum of the array
    const totalSum = arr.reduce((acc, curr) => acc + curr, 0);

    let leftSum = 0;

    for (let i = 0; i < arr.length; i++) {
        // rightSum is totalSum - leftSum - current element
        const rightSum = totalSum - leftSum - arr[i];

        if (leftSum === rightSum) {
            return i;
        }

        // Update leftSum for the next iteration
        leftSum += arr[i];
    }

    return -1;
}

// Test cases
const test1 = [-7, 1, 5, 2, -4, 3, 0];
console.log(`Index for [${test1}]: ${findEquilibriumIndex(test1)}`); // Expected: 3

const test2 = [1, 2, 3];
console.log(`Index for [${test2}]: ${findEquilibriumIndex(test2)}`); // Expected: -1
