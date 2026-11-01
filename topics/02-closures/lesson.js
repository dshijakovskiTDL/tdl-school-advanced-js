// * Closures

// ? Functions by default have no memory - they get created and when they finish running, get destroyed
function multiply(x, y) {
  const result = x * y;
  return result;
}

const resultA = multiply(2, 4); // 8
const resultB = multiply(5, 3); // 15

// ? These 2 invocations have nothing, absolutely nothing in common
// ? When we first call multiply with the arguments 2 and 4 - the moment it returns the result, it forgets about 2 and 4
// ? Then, when we call multiply a second time with 5 and 3 - it starts fresh, with those 2 arguments and computes a new result
// ? This is simple, straight forward and very expected - but can we do something about it to make it complex?

// ? --------------------------------------------------------------------------------------------------------------------------- ?
// ! ILLUSTRATION

// ? We said that Functions are first-class citizens in JavaScript-land, so let's see how we can use that here
function createDoubler() {
  function doubler(num) {
    return num * 2;
  }

  return doubler;
}

// ? In this example, we are returning a Function called doubler
const newDoubler = createDoubler();
console.log(newDoubler(3)); // 6
console.log(newDoubler(7)); // 14

// ? We call these functions (createDoubler) - Factory Functions, meaning functions that return functions

// ? Now, what if we had some state in the Factory function, that's used in the returned function
function createCounter() {
  let count = 0;

  function increment() {
    count++;
    return count;
  }

  return increment;
}

// ? When we do something like this - a bit of "magic" happens (spoiler alert, it's not magic - it's never magic)
// ? The function that gets returned - keeps the memory of that `count` variable alive through this thing we call
// ? "The function's backpack" - we'll define it more technically later, but for now can stick to this term
const myCounter = createCounter();
console.log(myCounter()); // 1
console.log(myCounter()); // 2

// ? What's more, every invocation of createCounter - returns a function with its own individual backpack
// ? so we can create as many counters as we want, each with their own separate "state"
const myOtherCounter = createCounter();
console.log(myOtherCounter()); // 1
console.log(myCounter()); // 3
console.log(myOtherCounter()); // 2

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? CHALLENGE 1
// ? Create a function called `createPrinter` that takes an input.
// ? This function should return a function that logs that input out to the console.

// ? CHALLENGE 2
// ? Recreate the counter factory function
// ? with the ability to define the step by which your counter increments each time.
