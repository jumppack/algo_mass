import findMaxLength from './contiguous_array.js';

function findMaxLengthWithEqualZeroAndOnes(nums) {
    let maxLen = 0;
    let currSum = 0;

    let prefixSumMap = new Map();
    prefixSumMap.set(0, -1);

    for (let idxInNums = 0; idxInNums < nums.length; idxInNums++) {
        currSum += nums[idxInNums] === 1 ? 1 : -1;

        if (prefixSumMap.has(currSum)) {
            let len = idxInNums - prefixSumMap.get(currSum);
            maxLen = Math.max(len, maxLen);
        } else {
            prefixSumMap.set(currSum, idxInNums);
        }
    }

    return maxLen;
}





function makePrefixSumArray(nums) {
    let prefixSum = new Array(nums.length + 1).fill(0);

    let idxInPrefix = 1;

    for (let idxInNums = 0; idxInNums < nums.length; idxInNums++) {
        prefixSum[idxInPrefix] = prefixSum[idxInPrefix - 1] + nums[idxInNums];
        idxInPrefix++;
    }

    return prefixSum;
}


// Testing
function generateBinaryGrid(size) {
    const out = Array.from({ length: size }, () => Math.round(Math.random()));
    // console.log(`The generated array is ${out}`);
    return out;
}

// console.log(makePrefixSumArray(generateBinaryGrid(5)));


// ---------------------------------------------------
// Test Cases
// ---------------------------------------------------
const test1 = generateBinaryGrid(5);
console.log(`Test 1: [${test1}] -> ${findMaxLengthWithEqualZeroAndOnes(test1)} (Expected: ${findMaxLength(test1)})`);

const test2 = generateBinaryGrid(10);
console.log(`Test 2: [${test2}] -> ${findMaxLengthWithEqualZeroAndOnes(test2)} (Expected: ${findMaxLength(test2)})`);

const test3 = generateBinaryGrid(2);
console.log(`Test 3: [${test3}] -> ${findMaxLengthWithEqualZeroAndOnes(test3)} (Expected: ${findMaxLength(test3)})`);

const test4 = generateBinaryGrid(15)
console.log(`Test 4: [${test4}] -> ${findMaxLengthWithEqualZeroAndOnes(test4)} (Expected: ${findMaxLength(test4)})`);