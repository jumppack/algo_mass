
var MapSum = function() {
    this.map = new Map();
    this.score = new Map();
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    let delta = val - (this.map.get(key) ?? 0);
    this.map.set(key, val);

    let prefix = "";

    for (let char of key.split('')) {
        prefix += char;
        this.score.set(prefix, (this.score.get(prefix) ?? 0) + delta)
    }
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    // let ans = 0;
    // for (const [key, value] of this.map) {
    //     if (key.startsWith(prefix)) {
    //         ans += value;
    //     }
    // }
    // return ans;
    return this.score.get(prefix) ?? 0;
};

/** 
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

import assert from 'node:assert/strict';

const mapSum = new MapSum();

// Test 1: Insert "apple" with value 3
mapSum.insert("apple", 3);
// Prefix map should look like: a:3, ap:3, app:3, appl:3, apple:3
assert.equal(mapSum.sum("ap"), 3, "Sum for prefix 'ap' should be 3");

// Test 2: Insert "app" with value 2
mapSum.insert("app", 2);
// Prefix map update: a:5, ap:5, app:5 ...
// "apple" (3) and "app" (2) both start with "ap"
assert.equal(mapSum.sum("ap"), 5, "Sum for prefix 'ap' should be 5 (3+2)");

// Test 3: Update "apple" with new value 5 (delta = 5 - 3 = +2)
mapSum.insert("apple", 5);
// Prefix map update: a:7, ap:7, app:7 ...
// "apple" is now 5. "app" is 2.
assert.equal(mapSum.sum("ap"), 7, "Sum for prefix 'ap' should be 7 (5+2)");

// Test 4: Prefix matching exact key
assert.equal(mapSum.sum("apple"), 5, "Sum for prefix 'apple' should be 5");

// Test 5: No existing prefix
assert.equal(mapSum.sum("xyz"), 0, "Sum for non-existent prefix 'xyz' should be 0");

console.log("All MapSum Prefix tests passed!");