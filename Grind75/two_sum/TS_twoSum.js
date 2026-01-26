"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function twoSum_ts(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i];
        if (map.has(complement)) {
            return new Array(map.get(complement), i);
        }
        map.set(nums[i], i);
    }
    return [-1, -1];
}
console.log(`Actual: ${twoSum_ts([2, 7, 11, 15], 9)}, Expected: [0, 1]`);
console.log(`Actual: ${twoSum_ts([3, 2, 4], 6)}, Expected: [1, 2]`);
console.log(`Actual: ${twoSum_ts([3, 3], 6)}, 'Expected: [0, 1]`);
