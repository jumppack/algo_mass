function twoSum_ts(nums: Array<number>, target: number): Array<number|undefined> {

    let map: Map<number, number> = new Map();

    for (let i: number = 0; i < nums.length; i++) {
        let complement: number = target - nums[i];
        if (map.has(complement)) {
            return new Array<number|undefined>(map.get(complement), i)
        }
        map.set(nums[i], i)
    }

    return [-1, -1];
}

console.log(`Actual: ${twoSum_ts([2,7,11,15], 9)}, Expected: [0, 1]`);
console.log(`Actual: ${twoSum_ts([3,2,4], 6)}, Expected: [1, 2]`);
console.log(`Actual: ${twoSum_ts([3, 3], 6)}, 'Expected: [0, 1]`)