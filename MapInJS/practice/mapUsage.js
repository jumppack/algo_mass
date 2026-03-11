// ==========================================
// TOPIC: The `map()` Function in JavaScript
// ==========================================

/*
  What is `map()`?
  -----------------
  The `map()` method creates a NEW array populated with the results of calling a provided function 
  on every element in the calling array.

  Key Characteristics:
  1. It does NOT mutate (change) the original array.
  2. It returns a new array of the exact same length as the original array.
  3. It executes the callback function once for each element in the array.
  4. It does not execute the function for empty elements.

  Syntax:
  -------
  array.map(function(currentValue, index, arr), thisValue)

  - currentValue (Required): The value of the current element.
  - index (Optional): The array index of the current element.
  - arr (Optional): The array object the current element belongs to.
  - thisValue (Optional): A value to be passed to the function to be used as its "this" value.

  When to use `map()`?
  --------------------
  Use `map()` over `forEach()` or `for` loops when you want to transform elements 
  in an array and expect a new array back.
*/

// ==========================================
// EXAMPLES
// ==========================================

// Example 1: Basic Transformation (Squaring Numbers)
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(function (num) {
  return num * num;
});

console.log("Original Numbers:", numbers);
console.log("Squared Numbers:", squaredNumbers);
console.log("--------------------------------------------------");


// Example 2: Extracting Data from an Array of Objects
// This is one of the most common real-world use cases for `map()`.
const users = [
  { id: 1, firstName: "Alice", lastName: "Smith", age: 28 },
  { id: 2, firstName: "Bob", lastName: "Johnson", age: 34 },
  { id: 3, firstName: "Charlie", lastName: "Brown", age: 22 }
];

// Let's create an array of just the full names using an arrow function.
const fullNames = users.map((user) => `${user.firstName} ${user.lastName}`);

console.log("Extracted Full Names:", fullNames);
console.log("--------------------------------------------------");


// Example 3: Using the `index` and `arr` Parameters
// Let's create a new array where we modify the value based on its index.
const letters = ['a', 'b', 'c', 'd'];

const letterWithIndex = letters.map((letter, index, array) => {
  // Let's return the letter, its position, and the total length of the array
  return `${letter.toUpperCase()} is at position ${index} in an array of size ${array.length}`;
});

console.log("Letters with Index Metadata:");
letterWithIndex.forEach(item => console.log(item));
console.log("--------------------------------------------------");


// Example 4: Edge Case - What happens if we don't return anything?
// If the callback doesn't explicitly return a value, JavaScript returns `undefined`.
const numbersTwo = [10, 20, 30];
const undefinedArray = numbersTwo.map((num) => {
  // We missed the return statement
  let calculate = num * 2;
});

console.log("Map without explicit return:", undefinedArray); // [undefined, undefined, undefined]
console.log("--------------------------------------------------");


// ==========================================
// ADVANCED CONCEPTS & PITFALLS
// ==========================================

/*
  Difference between map() and forEach():
  - `forEach()` returns `undefined` and is used to execute side-effects (e.g., logging to console, saving to a DB).
  - `map()` returns a new array and is used when you need to transform data.
  
  Performance:
  - While `map()` is elegant, a traditional `for` loop *can* theoretically be slightly faster. 
    However, the readability and immutability benefits of `map()` generally outweigh the negligible 
    performance difference in typical modern JavaScript applications unless dealing with massive datasets.
*/

// Chaining: `map()` is extremely powerful when chained with other array methods like `filter()` or `reduce()`.
const sales = [100, 250, 40, 500, 15];

// Task: Find all sales over 50, apply a 10% tax, and convert to localized currency strings.
const processedSales = sales
  .filter(amount => amount > 50)               // Keep only > 50 -> [100, 250, 500]
  .map(amount => amount * 1.1)                 // Add 10% tax -> [110, 275, 550]
  .map(amount => `$${amount.toFixed(2)}`);     // Format -> ["$110.00", "$275.00", "$550.00"]

console.log("Chained Processed Sales:", processedSales);
