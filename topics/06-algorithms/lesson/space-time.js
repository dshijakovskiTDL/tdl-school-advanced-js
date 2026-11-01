// * Algorithms

// * Time & Space Complexity analysis

function mysteryCode(list) {
  let result = [];

  for (let i = 0; i < list.length; i++) {
    if (list[i] % 5 === list[i] % 10) {
      result.push(list[i]);
    }
  }

  for (let i = 0; i < list.length / 2; i++) {
    if (result[i] === list[i]) {
      result.push(list[i]);
    }
  }

  return result;
}

// ? Time Complexity: O(n)
// ? We have 2 loops, one going the entire array, one going half the distance
// ? We are looking at the worst case scenario, so the loop going the length of the entire array "wins"

// ? Space Complexity: O(n)
// ? First loop: Worst case adds all n elements to result → O(n)
// ? Second loop: Loops n/2 times, potentially adds n/2 more elements → O(n/2)
// ? Total worst case: n + n/2 = 1.5n → O(n) (constants dropped in Big O)

// * In the case of Big O analysis - we always disregard constants, like the one above: O(n/2) -> becomes O(n)

// ? --------------------------------------------------------------------------------------------------------------------------- ?

function findMin(list) {
  let min = Infinity;

  for (let i = 0; i < list.length; i++) {
    if (list[i] < min) {
      min = list[i];
    }
  }

  return min;
}

// ? Time Complexity: O(n)
// ? We are going through the entire array, checking each element once

// ? Space Complexity: O(1)
// ? We are only using 1 extra variable - `min` - regardless the size of the array

// ? --------------------------------------------------------------------------------------------------------------------------- ?

function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

// ? Time Complexity: O(log n)
// ? Each iteration of the while-loop, we CUT IN HALF the amount of items that we need to look for

// ? Space Complexity: O(1)
// ? Again, we only need 3 variables `start`, `end` and `mid` - regardless of the size of the array
