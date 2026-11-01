// * Basic algorithm techniques

// * New data vs In-place Mutation

// ? Let's say we need to implement a function called `uniqueSort`
// ? this function should take in an array of numbers, filter out the repeating numbers and sort it

// ? Approach #1 - put the unique values in a `unique` array
function uniqueSort1(arr) {
  const seen = {};
  const unique = [];

  for (let i = 0; i < arr.length; i++) {
    if (seen[arr[i]]) continue;

    unique.push(arr[i]);
    seen[arr[i]] = true;
  }

  return unique.sort((a, b) => a - b);
}

let arr1 = [5, 4, 2, 2, 1, 7, 4];
arr1 = uniqueSort1(arr1);
console.log(arr1); // [1, 2, 4, 5, 7]

// ? This approach works, however it does affect the space complexity of the algorithm
// ? In this case, the space complexity is O(n) - because we are creating a new array `unique`
// ? which could potentially house all the elements in `arr` if the original array was already unique

// ? Technically, we are also creating a `seen` object, which can also hold all elements as keys
// ? if the array was already unique.

// ? So the full space complexity calculation is O(unique + seen) = O(n + n) = O(2n) => O(n)
// ? Remember, we always discard constant numbers

// ! QUIZ: Would using a Set solve the O(n) space complexity issue?

// ? Using a Set automatically tracks unique elements, so we don't need an extra `seen` object.
// ? This makes our code cleaner, but the space complexity is still O(n)
// ? because worst-case scenario: our Set would need to store all items if the original array is already unique

// ? Approach #1 - Alternative using a Set
function uniqueSort11(arr) {
  const unique = [...new Set(arr)];

  return unique.sort((a, b) => a - b);
}

arr1 = uniqueSort11(arr1);
console.log(arr1); // [1, 2, 4, 5, 7]

// * To truly improve the space complexity, we need to mutate the original array in-place.

// * Mutating data in-place (if acceptable for the data) is a great performance improvement in general
// * as opposed to creating new data, so do this whenever possible.

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Approach #2 - sort first, remove duplicates in-place
function uniqueSort2(arr) {
  arr.sort((a, b) => a - b);

  // Array is sorted - duplicates will be next to each other
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 1);
    }
  }
}

let arr2 = [5, 4, 2, 2, 1, 7, 4];
uniqueSort2(arr2);
console.log(arr2); // [1, 2, 4, 5, 7]

// ? Now our space complexity is O(1) 🥳
// ? However, there are some key things to point out in this case

// ? 1. We did theoretically increase the time complexity by sorting before filtering
// ? because the sort method now has to compare potentially more items than before
// ? But this is not an issue as the sorting algorithm's time complexity is still O(n) to O(n*log n) regardless the input

// ? Note: JavaScript's built-in sort method uses different sorting algorithms depending on the use case
// ? and it ranges from O(n) to O(n*log n)

// ? Nevertheless, this is a trade-off we may be willing to take - it depends on the situation
// ? It is important to know that this trade off will almost always be present
// ? We will need to choose to optimize for time or space complexity depending on the problem we are trying to solve

// ? 2. Our code is buggy... What if we had more than 1 duplicate for a particular number

arr2 = [5, 4, 2, 2, 2, 1, 7, 4];
uniqueSort2(arr2);
console.log(arr2); // [1, 2, 2, 4, 5, 7]

// ? Utilizing in-place mutation is a great way to improve the space complexity of an algorithm
// ? however we need to be careful on how we mutate that data so that we don't miss anything

// ? In our case, we need to REMOVE duplicates from the original sorted array
// * Whenever we are REMOVING elements from an array in-place -> We need to traverse the array backwards
// ? This is because of the way deletion works:
// ? When we remove an item from an array, all the items after it shift to the left (their index decreases by 1)
// ? So when we remove an item and then increment `i` - we will miss the item that moved into the position of the deleted item

// ? Example
// ? [1, 2, 2, 2]
// ?     ^ i is here (1)
// ? arr.splice(i, 1) -> delete 1 item starting at index 1
// ? [1, 2, 2]
// ?     ^ i is still here (1) before iteration ends
// ? *iteration ends* i++
// ? [1, 2, 2]
// ?        ^ i is here (2) - we missed a duplicate!

// ? If we do this in reverse, we won't miss any items
// ? [1, 2, 2, 2]
// ?           ^ i is here (3)
// ? arr.splice(i, 1) - delete i item starting at index 3
// ? [1, 2, 2]
// ?           ^ i is still here (3) - before iteration ends
// ? *iteration ends* i--
// ? [1, 2, 2]
// ?        ^ i is here (2)

// * Quick tip:
// * When you REMOVE items from an array in-place -> loop backwards
// * When you ADD items to an array in-place -> loop forwards

// ? Approach #3 - sort first, remove duplicates in-place [fixed]
function uniqueSort(arr) {
  arr.sort((a, b) => a - b);

  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] === arr[i - 1]) {
      arr.splice(i, 1);
    }
  }
}

let arr = [5, 4, 2, 2, 2, 1, 7, 4];
uniqueSort(arr);
console.log(arr); // [1, 2, 4, 5, 7]
