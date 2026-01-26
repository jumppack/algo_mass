// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.
// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]
 

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.
 

// Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?



// Naive solution is to iterate over the array in O(n^2) algorithm with two pointer and
// reporting the sum at each pair index and comparing with the targe and return the pair(s)


// Actual solution with MAP where key is the complementry sum  (target - num[i]) and value is the index i
function twoSum (nums, target) {

    // create the map -> ComplementryValue => Indexs
    const map = new Map();
    let pairs = [];

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]
        if (map.has(nums[i])) {
            pairs.push(map.get(nums[i]), i);
        }
        map.set(complement, i)
    }
    // return pairs; // too return all pairs
    return pairs; // returns a single pair which the solution demands
}

console.log(`Actual: ${twoSum([2,7,11,15], 9)}, Expected: [0, 1]`);
console.log(`Actual: ${twoSum([3,2,4], 6)}, Expected: [1, 2]`);
console.log(`Actual: ${twoSum([3, 3], 6)}, 'Expected: [0, 1]`)


function twoSum1 (nums, target) {

    let map = new Map() 
}



