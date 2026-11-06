// * Heap Sort

// ? Converts an array to a Max Heap and sorts it in-place.
const arr = [8, 2, 1, 3, 5, 10]; // length: 6

// ? This sorting algorithm is comprised of 2 parts:
// ? 1. "Heapifying" the Array (converting it into a Max Heap)
// ? 2. Sorting the Max Heap in-place

// * Part 1: Heapify the array

// ? Calculate left child index:  2n + 1
// ? Calculate right child index: 2n + 2
// ? n - index of the parent node

// ? P - Parent node
// ? L - Left child node
// ? R - Right child node

// ? Start at idx: Math.floor(arr.length / 2) - 1 and go backwards to 0

// * Why start at that index?
// * Because if that starting array were a Heap,
// * that index would be the LAST PARENT - last node that has at least one child

// ? We could theoretically start from the end of the array, but we would just waste
// ? time looking at nodes at indexes that are Out of bounds.
// ? So we start at "Math.floor(arr.length / 2) - 1" to save ourselves some time.

// ? In this case that's idx: 2

// * idx = 2
// * [8, 2, 1, 3, 5, 10]
//    0  1  2  3  4   5

// ? P @ idx: 2 => 1
// ? L @ idx: 5 => 10 (Largest child)
// ? R @ idx: 6 => X (Out of bounds)

// * L > P => swap them
// * [8, 2, 10, 3, 5, 1]
//    0  1   2  3  4  5

// ? Since we swapped with idx: 5 -> Call heapify on that index

// ? idx = 5
// ? P @ idx: 5 => 1
// ? L @ idx: 11 => X (Out of bounds)
// ? R @ idx: 12 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * idx = 1
// * [8, 2, 10, 3, 5, 1]
//    0  1   2  3  4  5

// ? P @ idx: 1 => 2
// ? L @ idx: 3 => 3
// ? R @ idx: 4 => 5 (Largest child)

// * R > P => swap them
// * [8, 5, 10, 3, 2, 1]
//    0  1   2  3  4  5

// ? Since we swapped with idx: 4 -> Call heapify on that index

// ? idx = 4
// ? P @ idx: 4 => 2
// ? L @ idx: 9 => X (Out of bounds)
// ? R @ idx: 10 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * idx = 0
// * [8, 5, 10, 3, 2, 1]
//    0  1   2  3  4  5

// ? P @ idx: 0 => 8
// ? L @ idx: 1 => 5
// ? R @ idx: 2 => 10 (Largest child)

// * R > P => swap them
// * [10, 5, 8, 3, 2, 1]
//     0  1  2  3  4  5

// ? Since we swapped with idx: 2 -> Call heapify on that index

// ? idx = 2
// ? P @ idx: 2 => 8
// ? L @ idx: 5 => 1
// ? R @ idx: 6 => X (Out of bounds)

// ? P > Children - do nothing - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Part 1 ended - we have now "heapify-ed" our Array and turned it into a Max Heap
const heap = [10, 5, 8, 3, 2, 1];

// *         10
// *      /     \
// *     5       8
// *   /  \    /
// *  3    2  1

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Part 2: Sort the Max Heap in-place

// ? Start with the Heap size being the same as the length of the array

// ? Do the following until the Heap size > 0:
// ? 1. Swap the first and last elements IN THE HEAP
// ? 2. Shrink the size of the Heap (from the end)
// ? 3. Call heapify on index 0

// ? Heap size: 6
// * [(10, 5, 8, 3, 2, 1)]
//     0  1  2  3  4  5

// ? 1. Swap first and last element in the Heap
// * [(1, 5, 8, 3, 2, 10)]
//     0  1  2  3  4  5

// ? 2. Shrink the Heap
// ? Heap size: 5 (index 5 is now "Out of bounds"!)
// * [(1, 5, 8, 3, 2), 10]
//     0  1  2  3  4   5

// ? 3. Call heapify on index 0

// ? idx = 0
// ? P @ idx: 0 => 1
// ? L @ idx: 1 => 5
// ? R @ idx: 2 => 8 (Largest child)

// * R > P => swap them
// * [(8, 5, 1, 3, 2), 10]
//     0  1  2  3  4   5

// ? Since we swapped with index 2 -> Call heapify on that index

// ? idx = 2
// ? P @ idx: 2 => 1
// ? L @ idx: 5 => X (Out of bounds)
// ? R @ idx: 6 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Heap size: 5
// * [(8, 5, 1, 3, 2), 10]
//     0  1  2  3  4   5

// ? 1. Swap the first and last element in the Heap
// * [(2, 5, 1, 3, 8), 10]
//     0  1  2  3  4   5

// ? 2. Shrink the Heap
// ? Heap size: 4 (index 4 is now "Out of bounds"!)
// * [(2, 5, 1, 3), 8, 10]
//     0  1  2  3   4   5

// ? 3. Call heapify on index 0

// ? idx = 0
// ? P @ idx: 0 => 2
// ? L @ idx: 1 => 5 (Largest child)
// ? R @ idx: 2 => 1

// * L > P => swap them
// * [(5, 2, 1, 3), 8, 10]
//     0  1  2  3   4   5

// ? Since we swapped with index 1 -> Call heapify on that index

// ? idx = 1
// ? P @ idx: 1 => 2
// ? L @ idx: 3 => 3 (Largest child)
// ? R @ idx: 4 => X (Out of bounds)

// * L > P => swap them
// * [(5, 3, 1, 2), 8, 10]
//     0  1  2  3   4   5

// ? Since we swapped with index 3 -> Call heapify on that index

// ? idx = 3
// ? P @ idx: 3 => 2
// ? L @ idx: 7 => X (Out of bounds)
// ? R @ idx: 8 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Heap size: 4
// * [(5, 3, 1, 2), 8, 10]
//     0  1  2  3   4   5

// ? 1. Swap the first and last element in the Heap
// * [(2, 3, 1, 5), 8, 10]
//     0  1  2  3   4   5

// ? 2. Shrink the Heap
// ? Heap size: 3 (index 3 is now "Out of bounds"!)
// * [(2, 3, 1), 5, 8, 10]
//     0  1  2   3  4   5

// ? 3. Call heapify on index 0

// ? idx = 0
// ? P @ idx: 0 => 2
// ? L @ idx: 1 => 3 (Largest child)
// ? R @ idx: 2 => 1

// * L > P => swap them
// * [(3, 2, 1), 5, 8, 10]
//     0  1  2   3  4   5

// ? Since we swapped with index 1 -> Call heapify on that index

// ? idx = 1
// ? P @ idx: 1 => 2
// ? L @ idx: 3 => X (Out of bounds)
// ? R @ idx: 4 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Heap size: 3
// * [(3, 2, 1), 5, 8, 10]
//     0  1  2   3  4   5

// ? 1. Swap the first and last element in the Heap
// * [(1, 2, 3), 5, 8, 10]
//     0  1  2   3  4   5

// ? 2. Shrink the Heap
// ? Heap size: 2 (index 2 is now "Out of bounds"!)
// * [(1, 2), 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 3. Call heapify on index 0

// ? idx = 0
// ? P @ idx: 0 => 1
// ? L @ idx: 1 => 2 (Largest child)
// ? R @ idx: 2 => X (Out of bounds)

// * L > P => swap them
// * [(2, 1), 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? Since we swapped with index 1 -> Call heapify on that index

// ? idx = 1
// ? P @ idx: 1 => 1
// ? L @ idx: 3 => X (Out of bounds)
// ? R @ idx: 4 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Heap size: 2
// * [(2, 1), 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 1. Swap the first and last element in the Heap
// * [(1, 2), 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 2. Shrink the Heap
// ? Heap size: 1 (index 1 is now "Out of bounds"!)
// * [(1), 2, 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 3. Call heapify on index 0

// ? idx = 0
// ? P @ idx: 0 => 1
// ? L @ idx: 1 => X (Out of bounds)
// ? R @ idx: 2 => X (Out of bounds)

// ? Nothing to compare with - children out of bounds - end here
// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Heap size: 1
// * [(1), 2, 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 1. Swap the first and last element in the Heap
// * [(1), 2, 3, 5, 8, 10]
//     0  1   2  3  4   5

// ? 2. Shrink the Heap
// ? Heap size: 0 => DONE 🥳

// * [1, 2, 3, 5, 8, 10]
//    0  1  2  3  4   5

const result = [1, 2, 3, 5, 8, 10];

// ? Time complexity: O(n log n)
// ? Space complexity: O(1)

// ? ...I know

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? The goal is to use these diagrammed instructions and implement Heap Sort on your own
// * Trust me - it's not that difficult
