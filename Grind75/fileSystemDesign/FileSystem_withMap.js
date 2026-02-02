var FileSystem = function() {
    this.paths = new Map();
};

/** 
 * @param {string} path 
 * @param {number} value
 * @return {boolean}
 */
FileSystem.prototype.createPath = function(path, value) {
    if (!isValid(path)) return false;
    if (checkPathExists(path, this.paths)) return false;
    
    let parent = getParent(path);
    
    // For paths like /a, the parent is '' which is still valid
    if (parent.length > 1 && !this.paths.has(parent)) return false;

    this.paths.set(path, value);
    return true;
};


/** 
 * @param {string} path
 * @return {number}
 */
FileSystem.prototype.get = function(path) {
    if (!isValid(path, this.paths)) return -1;

    return this.paths.has(path)
        ? this.paths.get(path)
        : -1;
};


// Checks below condition
// 1. Path is not empty or "/""
// 2. The path does not exisits
const isValid = function (path) {
    return (path.length === 0 || path === "/") 
    ? false
    : true;
}

const checkPathExists = function (path, map) {
    return (map.has(path)) 
    ? true
    : false;
}

const getParent = function (path) {
    return path.slice(0, path.lastIndexOf("/"));
}

import assert from 'node:assert/strict';

const fs = new FileSystem();

// Test 1: Create a valid path
assert.equal(fs.createPath("/a", 1), true, "Should successfully create path /a");
assert.equal(fs.get("/a"), 1, "Should return value 1 for path /a");

// Test 2: Create a nested path where parent exists
assert.equal(fs.createPath("/a/b", 2), true, "Should successfully create path /a/b");
assert.equal(fs.get("/a/b"), 2, "Should return value 2 for path /a/b");

// Test 3: Create a path that already exists
assert.equal(fs.createPath("/a", 3), false, "Should fail creating existing path /a");

// Test 4: Create a path where parent does not exist
assert.equal(fs.createPath("/c/d", 4), false, "Should fail creating path /c/d when /c does not exist");

// Test 5: Get a non-existent path
assert.equal(fs.get("/z"), -1, "Should return -1 for non-existent path /z");

// Test 6: Invalid paths
assert.equal(fs.createPath("/", 1), false, "Should fail for root path /");
assert.equal(fs.createPath("", 1), false, "Should fail for empty path");

console.log("All FileSystem tests passed!");