// * CHALLENGE

// * Merge Sort - merging functionality

// ? Merge sort works by splitting the array in halves until it gets down to a
// ? base-case of the smallest array possible - an array of one element.
// ? Then it goes back and merges all those small arrays into bigger and bigger sorted arrays until it sorts the entire original array.
// ? Writing that process using a recursive approach would look like this:

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

// ? Your task is to implement the `merge` function.
// ? `merge` takes in 2 sorted arrays and merges them in a sorted order (ASC for this example)

function merge(left, right) {
  // ! Your code here
}

console.log(merge([5, 7, 10], [4, 8, 20])); // [4, 5, 7, 8, 10, 20]

console.log(mergeSort([5, 7, 10, 4, 8, 20])); // [4, 5, 7, 8, 10, 20]
