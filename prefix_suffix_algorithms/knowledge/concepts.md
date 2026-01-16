# Prefix and Suffix Sum Arrays

## 1. Introduction
Prefix and Suffix sums are fundamental techniques in algorithm design, primarily used to optimize array range queries and solve problems involving subarrays efficiently. They allow us to calculate sums (or other cumulative operations) in $O(1)$ time after an $O(n)$ preprocessing step.

## 2. Prefix Sum Array
A **Prefix Sum Array** `P` for an array `A` of size `n` is defined as:
$$P[i] = A[0] + A[1] + \dots + A[i]$$

Or recursively:
$$P[0] = A[0]$$
$$P[i] = P[i-1] + A[i] \quad \text{for } i > 0$$

### Key Utility: Range Sum Query
To find the sum of the subarray `A[L...R]`, we can use the formula:
$$Sum(L, R) = P[R] - P[L-1]$$
*(If $L=0$, then $Sum(0, R) = P[R]$)*

This reduces the time complexity of a range sum query from $O(n)$ to $O(1)$.

## 3. Suffix Sum Array
A **Suffix Sum Array** `S` is the counterpart to the prefix sum. It represents the sum of elements from index `i` to the end of the array.
$$S[i] = A[i] + A[i+1] + \dots + A[n-1]$$

Recursively:
$$S[n-1] = A[n-1]$$
$$S[i] = A[i] + S[i+1] \quad \text{for } i < n-1$$

### Key Utility
Suffix sums are useful when we need to process or query subarrays ending at the last index, or when combining with prefix sums to split an array into two parts (e.g., finding an equilibrium index).

## 4. Visual Example
Array `A`:  `[ 1,  2,  3,  4,  5]`

**Prefix Sum `P`**:
- `P[0] = 1`
- `P[1] = 1+2 = 3`
- `P[2] = 3+3 = 6`
- Result `P`: `[ 1,  3,  6, 10, 15]`

**Suffix Sum `S`**:
- `S[4] = 5`
- `S[3] = 4+5 = 9`
- `S[2] = 3+9 = 12`
- Result `S`: `[15, 14, 12,  9,  5]`

## 5. Common Applications
- **Range Sum Queries**: Calculating sum of elements in a given range.
- **Equilibrium Index**: Finding an index where sum of left elements equals sum of right elements.
- **Product of Array Except Self**: Using prefix and suffix products.
- **Subarray Sums being divisible by K**.
