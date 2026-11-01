// * Basic algorithm techniques

// * Sliding Window

// ? Let's look at a common problem often found in coding interview questions:
// ? We need to implement a function that calculates the largest sum of K consecutive numbers in an array

// ? Example:
// ? [2, 1, 5, 1, 3, 2], k = 3
// ? Solution: 9 (Because [5, 1, 3] is the largest subarray sum of 3 elements)

// ? To start off, most people go with the naive approach of going through all possible combinations of sub-arrays
// ? Note: This is not an inherently bad thing to do, as it is always the case that
// ? "A solution is better than no solution"

// ? Approach #1 - Go through every possible combination of sub-arrays
function maxSubArraySumNaive(arr, k) {
  if (arr.length < k) return null;

  let max = -Infinity;

  // We should loop from 0 to arr.length - k (inclusive)
  // so as to not miss the last window
  for (let i = 0; i <= arr.length - k; i++) {
    let sum = 0;

    for (let j = i; j < i + k; j++) {
      sum += arr[j];
    }

    if (sum > max) {
      max = sum;
    }
  }

  return max;
}

console.log(maxSubArraySumNaive([2, 1, 5, 1, 3, 2], 3)); // 9

// ? Time Complexity: O(n * k)
// ? We have nested loops, one going the length of the entire array (n), and one going the length of the subarray (k)

// ? Space Complexity: O(1)
// ? We are using a couple of extra variables (max, sum) regardless of the input size

// ? This solution works, but it is rather inefficient because we are recalculating a new subarray every time
// ? i = 0: [2, 1, 5]
// ? i = 1: [1, 5, 1]
// ? i = 2: [5, 1, 3]
// ? ...
// ? Notice how most numbers are repeatedly present in each consecutive subarray
// ? meaning we have information on them that we are not using at the moment

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Instead what we can do is use the "Sliding Window" technique where we reuse previous sums

// ? How it works:
// ? We can start with our initial first sub-array sum: [2, 1, 5] = 8
// ? Now, we "slide" this window forward and calculate [1, 5, 1]
// ? but instead of calculating from the start of the window and iterating through the entire sub-array
// ? we can just take our current "subarray sum" (8) and:
// ? 1. subtract the number leaving the window (2)
// ? 2. add the number entering the window (1)

// * 1st window: [2, 1, 5] 1 3 2
// * Sum: 8

// * slide: "2" is leaving the window, "1" is entering the window

// * 2nd window: 2 [1, 5, 1] 3 2
// * Sum: 8 - 2 + 1 = 7

// ? this way, we only move forward once and reuse the information we have from previous "subarray sums"

function maxSubArraySum(arr, k) {
  if (arr.length < k) return null;

  // Calculate the first subarray sum
  let current = 0;
  for (let i = 0; i < k; i++) {
    current += arr[i];
  }

  // can assume that the first window is the largest sum
  let max = current;

  // Move through the array, reusing the previous subarray
  for (let i = k; i < arr.length; i++) {
    // element leaving the window: arr[i - k]
    current -= arr[i - k];

    // element entering the window: arr[i]
    current += arr[i];

    if (current > max) {
      max = current;
    }
  }

  return max;
}

console.log(maxSubArraySum([2, 1, 5, 1, 3, 2], 3)); // 9

// ? Time Complexity: O(n)
// ? First loop: 0 -> k
// ? Second loop: k -> arr.length
// ? Combined: Looping through the entire length of the array

// ? Space Complexity: O(1)
// ? Still only using a couple of extra variables (max, current) regardless of the input size

// * The sliding window approach can be used to solve many similar problems
// * The main idea is to find a way to reuse information that we have previously calculated
