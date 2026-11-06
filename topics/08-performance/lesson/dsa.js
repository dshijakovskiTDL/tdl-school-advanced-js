// * Data Structures & Algorithms knowledge for performant code

// * Array vs Map/Set lookups

// ? Remember that Arrays have an O(n) search time, so if you can, don't use them as storage for when you want to look for something within the data structure.
const array = ['data', 'other-data', 'another-data', 'target-data'];
array.includes('target-data'); // O(n)

// ? Instead, use Sets or Maps - which have constant time lookups
const set = new Set(['data', 'other-data', 'another-data', 'target-data']);
set.has('data'); // O(1)

const map = new Map([['data-key', 'value']]);
map.has('data-key'); // O(1)

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Exit early out of loops

function slowFind(users, id) {
  let found = false;

  for (const user of users) {
    if (user.id === id) {
      found = true;
    }
  }

  return found;
}

function fastFind(users, id) {
  for (const user of users) {
    if (user.id === id) {
      return true;
    }
  }

  return false;
}

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Use binary search when you know your data is sorted

// ? Binary search - O(log n)
// ? Linear search - O(n)

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Use a native for loop whenever possible

// ? .forEach() - calls a function for each item in the collection -> SLOW
// ? for...of - uses the iterator protocol to iterate through the collection -> SLOW
// ? for(let i = 0; i < length; i++) - just incrementing a variable's value -> FAST

// ! Note: In the modern V8 engine, the difference is not noticeable, but it still depends on what you are working on and which engine (version) you are using.
