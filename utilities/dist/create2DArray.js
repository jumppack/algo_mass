/**
 * Creates a 2D array of the specified dimensions, initialized with a default value.
 *
 * @param rows - The number of rows.
 * @param cols - The number of columns.
 * @param initialValue - The value to initialize each cell with (defaults to 0).
 * @returns A 2D array (matrix) of numbers.
 */
export const create2DArray = function (rows, cols, initialValue = 0) {
    // Array.from creates a new array of length 'rows'.
    // The second argument is a mapping function that creates each row.
    // Array(cols).fill(initialValue) creates a row and fills it with the initial value.
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
};
