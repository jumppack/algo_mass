import findPivotIndex from './find_pivot_index.js'


function findPivotIndexMine(nums) {
    let leftSum = Array.from({ length: nums.length + 1 }).fill(0);
    let rightSum = Array.from({ length: nums.length + 1 }).fill(0);

    // First get the total sum of values in nums
    const totSum = nums.reduce((c, a) => c + a, 0);
    // const totSum = nums.reduce((currVal, acc) => {
    //     return currVal + acc;
    // }, 0 /*initial accumulator value */)

    // Calculate the leftSum matrix which contains sum of all the values at indices to the left of the current idx (excluding)
    for (let i = 1; i < leftSum.length; i++) {
        leftSum[i] = leftSum[i - 1] + nums[i - 1]
    }


    // now we will create the right sum
    // we stop when we encounter an index where the leftSum[i] == RigthSum[i]
    // that index will be the pivot index

    for (let j = 0; j < rightSum.length; j++) {
        rightSum[j] = totSum - leftSum[j] - nums[j];
        if (leftSum[j] === rightSum[j]) {
            return j; //the pivotIdx
        }
    }

    return -1;// no pivot idx found.
}


// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const test1 = [1, 7, 3, 6, 5, 6];
console.log(`Test 1: [${test1}] -> ${findPivotIndexMine(test1)} (Expected: ${findPivotIndex(test1)})`);

const test2 = [1, 2, 3];
console.log(`Test 2: [${test2}] -> ${findPivotIndexMine(test2)} (Expected: ${findPivotIndex(test2)})`);

const test3 = [2, 1, -1];
console.log(`Test 3: [${test3}] -> ${findPivotIndexMine(test3)} (Expected: ${findPivotIndex(test3)})`);