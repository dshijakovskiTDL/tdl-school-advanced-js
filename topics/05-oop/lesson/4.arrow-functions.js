// * OOP

// * 4. Arrow functions

// ? What if we wanted a little helper function `printYears()` inside `greet` that:
// ? prints out either "year" if the user is 1 year of age OR "years" if they are more than 1 year old

function createUser(username, age) {
  const user = Object.create(userFunctions);
  user.username = username;
  user.age = age;

  return user;
}

let userFunctions = {
  greet: function () {
    function printYears() {
      return `${this.age} year${this.age > 1 ? 's' : ''}`;
    }
    console.log(`${this.username}, a ${printYears()} old user.`);
  },
};

const userA = createUser('userA', 28);
userA.greet(); // userA, a undefined year old user.

// ? Let's assume we run this file as a CommonJS module using Node (non-strict mode)
// ? ...what? When did the user's age become undefined?

// ? Well, remember what we said about regular functions:
// ? `this` refers to the OBJECT THAT CALLED THE FUNCTION - but `printYears()` is a plain function call (there's no object to the left of a dot)
// ? so in non-strict mode, `this` falls back to the `globalThis` object, which doesn't have a property called `age`

// ? what's more, running this file in strict mode, won't even bind to the `globalThis` object - `this` will just be `undefined`...
// ? ...and we won't be able to access the `age` property of an undefined data type, which will throw an error...
// ? so there you have it - an amazing, just chef's kiss type of bug...

// ? So again I ask you, what do we do?

// ! QUIZ
// ! How can we fix this bug?

// ? The solution is... Arrow functions!
// ? Arrow functions, as we saw before, don't bind to the object that called them
// ? Rather they bind to the `this` of the lexical scope in which they were defined
// ? In our case, we defined `printYears` inside of `greet` - a regular function
// ? and regular functions bind to the object that called them - in this case the `userA` object

// * Change `printYears` into an arrow function and run the code to see the fix in action.

// ? So, when we call `userA.greet()` - the `greet` function's implicit `this` parameter refers to `userA`
// ? Inside `greet` we have `printYears` - now as an arrow function - whose `this` keyword is that of its lexical scope
// ? And since its lexical scope is within the `greet` function (that's where it was created)
// ? The `printYears` function's `this` keyword now also refers to `userA`

// ? A little bit of helpful advice here, if you are working with code like the one above:
// ? For direct methods that you would call on objects like `greet` and `birthday` - use regular functions
// ? For helper functions inside these methods that do little helpful logic - use arrow functions
