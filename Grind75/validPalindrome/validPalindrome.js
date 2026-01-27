// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

 

// Example 1:

// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.


function validPalindrom (s) {

    let cleanS = s;

    cleanS = removeNonChars(cleanS);
    cleanS = convertToLowerCase (cleanS);

    let fpx = 0;
    let epx = cleanS.length - 1;

    while (fpx < epx) {
        if (cleanS[fpx++] !== cleanS[epx--]) {
            return false;
        }
    }
    return true;
}


function removeNonChars (s) {
    return s.replace(/[^a-zA-z0-9]/g, '')
}


function convertToLowerCase (s) {
    return s.toLowerCase();
}



// Testing
import assert from 'node:assert/strict';
console.log('Running Tests');
assert.strictEqual (validPalindrom('ab-c;ba'), true)
assert.strictEqual(validPalindrom('ab-c;bsa'), false)
console.log('Test Complete');