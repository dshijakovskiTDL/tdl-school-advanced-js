// * Async Programming

// ? Synchronous JavaScript
// ! ILLUSTRATION

// ? Everything here runs line by line, one command after the other. This is the simplest way JavaScript executes code and it's called "Synchronous" code.
function powerTen(num) {
  return Math.pow(num, 10);
}

// ? powerTen will be called with 2, return a result and move on to the next line.
const resultA = powerTen(2);
// ? Again, powerTen will be called this time with 5, return a result and move on to the next line.
const resultB = powerTen(5);

// ? Finally, we log the results to the console.
console.log({ resultA, resultB });


// ? ...Okay but what happens if we want to do something that takes a while to complete?
// ? For that, let's go back to the slides and let's fetch some cat facts!

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? CHALLENGE 1
// ? Create a function `limitedRepeat` that console logs 'hi for now' every second, but only for 5 seconds.
// ? Research how to use clearInterval if you are not sure how to do this.
