# Level 3: Deep Dive & Optimization (Expert)

## 1. Memory Hierarchy & Cache Locality

While the mathematical definition of a prefix sum ($P[i] = P[i-1] + A[i]$) implies a simple recurrence, its performance on modern hardware is heavily dictated by **memory access patterns**.

### Spatial Locality
Prefix sum calculation is the poster child for **spatial locality**.
-   **Sequential Access**: We access $A[i]$ and write to $P[i]$ in strict increasing order ($i, i+1, i+2...$).
-   **Cache Lines**: Modern CPUs fetch memory in chunks (cache lines, typically 64 bytes). Because our access is sequential, when we fetch $A[i]$, the CPU automatically fetches $A[i+1]$ through $A[i+15]$ (assuming 32-bit integers) into the L1 cache.
-   **Prefetching**: Hardware prefetchers detect this linear pattern and optimistically fetch future cache lines before the code even requests them, virtually eliminating memory latency constraints compared to random access algorithms (like traversing a linked list or hash map).

### Throughput Optimization
-   **Write-Combining**: If we are writing the result to a new array, modern CPUs use "Write-Combining" buffers. Instead of sending each 4-byte integer to L3/RAM individually (which is expensive), the CPU collects them in a buffer (e.g., 64 bytes) and flushes the entire line at once.

**Takeaway**: This makes prefix sums strictly **bandwidth-bound**, not latency-bound. The speed is limited only by how fast RAM can send data to the CPU, not by the CPU's calculation speed.

## 2. Parallel Prefix Sum (Scan)

On a single core, prefix sum is sequential $O(N)$. However, on GPUs or multi-core systems, we can't wait for $P[i-1]$ to compute $P[i]$. We need a Parallel Scan.

### The Hillis-Steele Algorithm (Step Efficient)
-   **Concept**: Adding elements at exponentially increasing distances ($2^0, 2^1, 2^2...$).
-   **Work**: $O(N \log N)$ (Note: This is more work than sequential!)
-   **Span (Critical Path)**: $O(\log N)$

### The Blelloch Algorithm (Work Efficient)
This is the standard for CUDA/OpenCL because it is work-efficient ($O(N)$ operations). It mimics a "Tree Reduction" followed by a "Tree Distribution".

![Parallel Scan Tree](../resource/images/parallel_scan_tree.png)

#### Phase 1: Up-Sweep (Reduce)
We build a logical binary tree on top of the array.
-   Combine pairs: $A[0]+A[1]$, $A[2]+A[3]$...
-   Combine results: $(A[0]+A[1]) + (A[2]+A[3])$...
-   This takes $O(N)$ operations and leaves the total sum at the root.

#### Phase 2: Down-Sweep (Distribute)
We traverse back down from the root to build the prefix sums.
-   **Key Idea**: Copy the parent's accumulated value to the left child, and pass (parent + left child original sum) to the right child.
-   This also takes $O(N)$ operations.

**Resource**: [CMU Lecture on Parallel Scan (Guy Blelloch)](https://www.cs.cmu.edu/~blelloch/papers/Ble90.pdf)

## 3. Mutable Data Structures

What if the array $A$ changes frequently? Recomputing the static prefix sum array $P$ takes $O(N)$, which is too slow for frequent updates.

### Binary Indexed Tree (Fenwick Tree)
-   **Update**: $O(\log N)$
-   **Query**: $O(\log N)$
-   **Idea**: Store partial sums covering powers of 2 ranges.
-   **Visual**:
    ```
    Index: 1 2 3 4 5 6 7 8
    BIT:   - - - + - - - +  (Index 4 stores sum(1..4), Index 8 stores sum(1..8))
           - +   | - +   |
           +     | +     |
    ```
    *Each index `i` stores the sum of the range `[i - 2^r + 1, i]`, where `r` is the number of trailing zeros in `i`'s binary representation.*

### Segment Tree
-   **Update**: $O(\log N)$
-   **Query**: $O(\log N)$
-   **Pros**: more flexible than BIT. Supports min/max, GCD, and lazy propagation for range updates.
-   **Cons**: Higher memory overhead ($4N$) compared to BIT ($N$).

## 4. Advanced Applications

### 2D Prefix Sums
Used in image processing (Integral Images) to calculate average brightness of a rectangular region in $O(1)$.
$$P[i][j] = A[i][j] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]$$
*We subtract $P[i-1][j-1]$ because it was added twice.*

### Difference Arrays (Range Updates)
If you need to perform many updates: "Add $V$ to all elements in range $[L, R]$" and query only at the end.
-   Use a difference array $D[i] = A[i] - A[i-1]$.
-   Update: $D[L] += V$ and $D[R+1] -= V$.
-   Final Result: Prefix sum of $D$ gives the updated array $A$.

### Coordinate Compression
When the range of indices is large (e.g., $10^9$) but the number of actual elements is small ($10^5$), we map the large coordinates to a smaller dense range $0 \dots N$ to apply prefix sums or Segment Trees.
