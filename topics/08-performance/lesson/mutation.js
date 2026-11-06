// * Mutation vs Recreation

// * Array.reduce()

// ? One of the classic examples here is the usage of the Array.reduce() method
const users = [
  { name: 'user-1', info: {} }, // Imagine we have the user's details in the `info` property
  { name: 'user-2', info: {} },
  { name: 'user-3', info: {} },
];

// ? We want to transform this array into an object which has:
// ? - the user's name as the key
// ? - the user's info as the value

// ? Recreation
const usersDataSlow = users.reduce((acc, user) => {
  const { name, info } = user;
  return { ...acc, [name]: info }; // Recreating a new object
}, {});
console.log(usersDataSlow);

// ? In the above example, each time through the array we are recreating a new accumulator object
// ? This can get very slow especially in the hot paths of your code, because
// ? a new accumulator object is being created for every iteration of the `reduce` method

// ? Mutation
const usersDataFast = users.reduce((acc, user) => {
  const { name, info } = user;
  acc[name] = info; // Mutating the same object

  return acc;
}, {});
console.log(usersDataFast);

// ? Using mutation, we are only creating 1 object - the initial empty object the accumulator starts as
// ? after that, each iteration we are just mutating that object - adding a new entry for each user
// ? This again is much easier on the GC as it doesn't need to create new objects all the time

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Take advantage of reference types

// ? JavaScript developers sometimes forget that Objects and Arrays are "reference types"
// ? and that we can take advantage of that fact when using them in functions

// ? Let's say we are running some code that does some animations and moves a square along the screen
// ? The function that moves the square takes in the square object, along with how much it has moved
// ? along the X and Y axes respectively
// ? This function should return the new position of the square so that we can redraw it.

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const square = new Square(0, 0);

// ? Recreation
function moveSlow(square, dx, dy) {
  return { x: square.x + dx, y: square.y + dy };
}

// ? Here we are again creating a new object each time the square moves
// ? Instead, we can remember that Objects are reference types and changing their properties inside a function
// ? actually changes them outside the function

// ? Mutation
function moveFast(square, dx, dy) {
  square.x += dx;
  square.y += dy;
}

// ? Now we just use the square's x and y properties and redraw it where it should be shown
// ? No new object creation, just the main square one
