// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.

// Example 1:
// Input: s = "()"
// Output: true

// Example 2:
// Input: s = "()[]{}"
// Output: true

// Example 3:
// Input: s = "(]"
// Output: false

// Example 4:
// Input: s = "([])"
// Output: true

// Example 5:
// Input: s = "([)]"
// Output: false

// Some naive solutions
// Count the number of brackets each. Confirm 

function validParanthesis (s) {
    let parens = s.split('');
    let stack = new Array();

    let openCloseMap = new Map()
        .set('{', '}')
        .set('[', ']')
        .set('(', ')')
        .set('}', '{')
        .set(']', '[')
        .set(')', '(')

    // Put the first item in the stack;
    stack.push(parens[0]);

    for (let i = 1; i < parens.length; i++) {
        let bracket = parens[i]; //getting the item from array
        
        // peak the previous item from the stack.
        // see if the current value matches the closing of the current bracket
        // if it does remove from the stack. Otherwise, just add to the stack.
        let closeBracket = openCloseMap.get(bracket);

        // For peak operation in array we use
        // peak = stack[stack.length - 1]
        
        if (stack[stack.length - 1] === closeBracket) {
            stack.pop();
        } else {
            stack.push(bracket);
        }
    }
    return stack.length === 0;
}

console.log(`Actual: ${validParanthesis('()[]')}, Expected: True`)
console.log(`Actual: ${validParanthesis('[()]')}, Expected: True`)
console.log(`Actual: ${validParanthesis('[(]]')}, Expected: false`)
console.log(`Actual: ${validParanthesis('[(])')}, Expected: false`)