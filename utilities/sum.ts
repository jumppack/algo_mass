/**
 * Calculates the sum of all numbers passed as arguments.
 * 
 * We use the `export` keyword before the function definition to make this function
 * available for import in other files.
 * 
 * Usage in another file:
 * import { sum } from './sum';
 */
export const sum = function (...args: number[]) : number {
    // The reduce method processes the array element by element, accumulating the result.
    // 'a' is the accumulator (running total), and 'c' is the current value.
    return args.reduce((a, c) => a + c, 0); // Initial value 0 is good practice for empty arrays
};