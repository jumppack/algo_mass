# Implementation Plan - Visuals & Practice Expansion

## Goal Description
Respond to user feedback by replacing Mermaid code blocks with actual generated images in knowledge files and expanding the practice section with key prefix sum problems.

## User Review Required
- None.

## Proposed Changes

### Knowledge - Visuals
#### [MODIFY] [knowledge/level1_eli5.md](file:///c:/Users/kaery/Desktop/Algorithms/prefix suffix sum/prefix_suffix_algorithms/knowledge/level1_eli5.md)
- Replace Mermaid flowchart with `eli5_flowchart.png`.

#### [MODIFY] [knowledge/level2_intermediate.md](file:///c:/Users/kaery/Desktop/Algorithms/prefix suffix sum/prefix_suffix_algorithms/knowledge/level2_intermediate.md)
- Replace Block-Beta diagram with `array_visualization.png`.
- Replace XYChart with `complexity_chart.png`.

#### [MODIFY] [knowledge/level3_expert.md](file:///c:/Users/kaery/Desktop/Algorithms/prefix suffix sum/prefix_suffix_algorithms/knowledge/level3_expert.md)
- Replace Graph TD with `parallel_scan_tree.png`.

#### [NEW] Images in `resource/images/`
- `eli5_flowchart.png`
- `array_visualization.png`
- `complexity_chart.png`
- `parallel_scan_tree.png`

### Practice - New Problems
#### [NEW] [find_pivot_index.py/.js](file:///c:/Users/kaery/Desktop/Algorithms/prefix suffix sum/prefix_suffix_algorithms/practice/find_pivot_index.py) (Already exists, just noting context)

#### [NEW] `range_sum_query_immutable.py` & `.js`
- **Problem**: Calculate sum of elements in range [L, R] multiple times.
- **Concept**: Basic Prefix Sum class structure.

#### [NEW] `subarray_sum_equals_k.py` & `.js`
- **Problem**: Total continuous subarrays whose sum equals k.
- **Concept**: `HashMap` + `Prefix Sum` (Frequency counting).

#### [NEW] `contiguous_array.py` & `.js`
- **Problem**: Max length of contiguous subarray with equal number of 0s and 1s.
- **Concept**: Transform 0 to -1, then finding max length subarray with sum 0 (`HashMap` storing first occurrence).

#### [NEW] `product_except_self.py` & `.js`
- **Problem**: Product of array except self without division.
- **Concept**: Prefix Product + Suffix Product arrays (or O(1) space optimization).

## Verification Plan
### Manual Verification
- Check all markdown files render images correctly.
- Verify solution files exist and are named correctly.
- Run `git status` to ensure all new files are staged.
