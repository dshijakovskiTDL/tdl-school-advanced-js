// * Async Programming

// ? Synchronous JavaScript
// ! ILLUSTRATION

function powerTen(num) {
  return Math.pow(num, 10);
}

const resultA = powerTen(2);
const resultB = powerTen(5);

console.log({ resultA, resultB });

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? CHALLENGE 1
// ? Create a function `limitedRepeat` that console logs 'hi for now' every second, but only for 5 seconds.
// ? Research how to use clearInterval if you are not sure how to do this.
