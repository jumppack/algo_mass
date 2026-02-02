// You are asked to design a file system that allows you to create new paths and associate them with different values.

// The format of a path is one or more concatenated strings of the form: / followed by one or more lowercase English letters. For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string "" and "/" are not.

// Implement the FileSystem class:

// bool createPath(string path, int value) Creates a new path and associates a value to it if possible and returns true. Returns false if the path already exists or its parent path doesn't exist.
// int get(string path) Returns the value associated with path or returns -1 if the path doesn't exist.


class TrieNode {
    constructor (name, value = 0) {
        this.children = new Map() // Map<string, TrieNode>
        this.name = name;
        this.value = value;
    }
}

class FileSystem {
    constructor () {
        this.root = new TrieNode('');
    }

    createPath (path, value) {
        // TODO: Check edge cases
        if (path.length === 0 || (path.length === 1 && path === '/')) return false;


        // Get all the individual components of the path
        let components = path.split('/');
        components.shift(); // to remove the first "" empty path before "/"

        let curr = this.root;

        for (let i = 0; i < components.length; i++) {

            let comp = components[i];

            if (curr.children.has(comp)) {
                curr = curr.children.get(comp);
                // If this was the last component, then just update the value and return false
                if (i === components.length - 1) {
                    curr.value = value;
                    return false; // Because we didn't create a new path but just updated the value.
                } else {
                    // Keep going
                    continue;
                }
            } else { // It is not in the children map
                // Two cases here
                // 1. If the idx is the last idx => We will need to add the component to the path
                // 2. If not last => The path is broken
                if (i === components.length - 1) {
                    curr.children.set(comp, new TrieNode(comp, value));
                    return true; // New path was created
                } else {
                    return false; // A part of the path was missing so path is invalid.
                }
                
            }
        }

    }

    // get( path) Returns the value associated with path 
    // or returns -1 if the path doesn't exist.
    get (path) {
        // TODO: Some edge cases for path

        let components = path.split("/");
        components.shift();

        let out = 0; // 

        let curr = this.root;

        for (let i = 0; i < components.length; i++) {
            let comp = components[i];
            if (curr.children.has(comp)) {
                curr = curr.children.get(comp);
                
                // If this is the last comp in the path, then just return the value
                // otherwise keep looking
                if (i === components.length - 1) {
                    return curr.value;
                } else {
                    continue;
                }

            } else {
                return -1;
            }
        }
    }
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