// Design a map that allows you to do the following:

// Maps a string key to a given value.
// Returns the sum of the values that have a key with a prefix equal to a given string.
// Implement the MapSum class:

// MapSum() Initializes the MapSum object.
// void insert(String key, int val) Inserts the key-val pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
// int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.

var MapSum = function() {
    this.map = new Map();
};

/** 
 * @param {string} key 
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function(key, val) {
    this.map.set(key, val);
};

/** 
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function(prefix) {
    let ans = 0;
    for (const [key, value] of this.map) {
        if (key.startsWith(prefix)) {
            ans += value;
        }
    }
    return ans;
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
assert.equal(mapSum.sum("ap"), 3, "Sum for prefix 'ap' should be 3");

// Test 2: Insert "app" with value 2
mapSum.insert("app", 2);
// "apple" (3) and "app" (2) both start with "ap"
assert.equal(mapSum.sum("ap"), 5, "Sum for prefix 'ap' should be 5 (3+2)");

// Test 3: Insert "apple" again with new value 5 (Update)
mapSum.insert("apple", 5);
// "apple" is now 5. "app" is 2.
assert.equal(mapSum.sum("ap"), 7, "Sum for prefix 'ap' should be 7 (5+2)");

// Test 4: Prefix matching exact key
assert.equal(mapSum.sum("apple"), 5, "Sum for prefix 'apple' should be 5");

// Test 5: No existing prefix
assert.equal(mapSum.sum("xyz"), 0, "Sum for non-existent prefix 'xyz' should be 0");

// Test 6: Empty prefix (should sum everything)
assert.equal(mapSum.sum(""), 7, "Sum for empty prefix should be total sum (7)");

console.log("All MapSum tests passed!");