// * Functions: Callbacks & Higher Order Functions

// ? I can write a function squareFive that just squares the number 5
// ? But why do this when I can just do `5 * 5` in the code?
function squareFive() {
  return 5 * 5;
}

console.log(squareFive());

// ? Well, I *CAN* do that now
console.log(5 * 5); // Old math

// ? But what if tomorrow I needed to have that math be a bit more complicated,
// ? like squaring it, and dividing by the same number plus 10
function squareFiveDivideByFivePlusTen() {
  return (5 * 5) / (5 + 10);
}

// ? Okay, I still don't really need a function for this, I can just do it in-line
console.log((5 * 5) / (5 + 10)); // New math

// ? Here comes the kicker - what if next week I need to do the same thing, but for different numbers each time
// ? Somewhere it's the same operation with 4 squared, somewhere with 125 squared - am I just gonna keep going
console.log((4 * 4) / (4 + 10));
console.log((125 * 125) / (125 + 10));

// ? THERE'S GOTTA BE A BETTER WAY...
// ? Well, there is and this is exactly why we NEED functions - to *GENERALIZE* our functionality
function doMath(num) {
  return (num * num) / (num + 10);
}

console.log(doMath(5));
console.log(doMath(4));
console.log(doMath(125));

// ? Now this might be obvious and fairly simple, but what we need to notice here is
// ? that what we just did is we introduced VARIABLE VALUES that change the function's result

// ? Depending on what VALUES (arguments) we pass in, the function will return a different result
// ? Meaning, we have found a way to change the OUTPUT RESULT of the function

// ? Now that might be enough for a junior/intermediate JavaScript developer to know and apply to their day-to-day work
// ? But we are Seniors and we deal with more complicated problems in our day-to-day
// ? Let me ask you this: What if instead of the function's OUTPUT RESULT, we needed to change its BEHAVIOR from outside the function

// ? Let's say I have an array
const myList = [1, 2, 3, 4, 5];

// ? Now let's say I needed a function that returns us all the numbers from the array, squared
// ? Easy enough:
function getSquaredNumbers(list) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    output.push(list[i] * list[i]);
  }

  return output;
}

console.log(getSquaredNumbers(myList)); // [1, 4, 9, 16, 25]

// ? Okay, cool - now tomorrow I find out I need a function that gets me all the numbers from the array, halved
// ? Alright, I'm pretty lazy so I just copy the getSquaredNumbers() function and tweak the math operation
function getHalvedNumbers(list) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    output.push(list[i] / 2);
  }

  return output;
}

// ? And maybe I'm picking up on a pattern here and I don't want this code duplicated, so I think ahead and I say
// ? "Well, I can just pass a flag in there to tell me whether I need to return squared or halved numbers"
function getSquaredHalvedNumbers(list, squared) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    if (squared) {
      output.push(list[i] * list[i]);
    } else {
      output.push(list[i] / 2);
    }
  }

  return output;
}

// ? I mean, it kinda works and looks good enough...
// ? But wait, what's this?? The next day comes and you need functionality that will return the duplicated values of an array??
// ? You don't panic, you just write it out:
function duplicateNumbers(list) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    output.push(list[i] * 2);
  }

  return output;
}

// ? ....Do I dare create an even more generic function that does either squared or halved or duplicated numbers based on a value I pass in?
// ? Here goes nothing...
function doOperationBad(list, operation) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    if (operation === 'square') {
      output.push(list[i] * list[i]);
    } else if (operation === 'halve') {
      output.push(list[i] / 2);
    } else if (operation === 'duplicate') {
      output.push(list[i] * 2);
    }
  }

  return output;
}

// ? Okay, now I've gone too far... That looks horrible NOW, let alone coming back to this a month from now to add a new operation
// ? So here we are - stuck with this problem - so what do we do?

// ? Well, remember when I said that we could change the BEHAVIOR of the function, instead of just the VALUES we pass into it
// ? What if - instead of passing just VALUES in our functions, we could pass in CODE... how would that even work? Can we even do it?
// ? Turns out, we absolutely can! We can pass in FUNCTIONS as arguments to other functions, because in JavaScript:
// ? Functions are what's called "First Class citizens" - meaning they behave as regular variables
// ? - We can pass them as arguments
// ? - We can return them as outputs from functions

// ? Now, armed with this new knowledge, how can we fix our horrible function from before?
// ? Hopefully someone already has an idea and that idea is that we pass in the operation as a function:
function doOperation(list, operation) {
  let output = [];

  for (let i = 0; i < list.length; i++) {
    output.push(operation(list[i]));
  }

  return output;
}

// ? Now, the operation parameter is a Function that we ourselves pass into this generic doOperation function
function squareNum(num) {
  return num * num;
}

function duplicateNum(num) {
  return num * 2;
}

console.log(doOperation(myList, squareNum));
console.log(doOperation(myList, duplicateNum));

// ? This is a very powerful feature of JavaScript - letting us pass in actual CODE, actual behavior into functions instead of just values
// ? This approach allows us to:
// ? - Decouple logic from data - instead of hardcoding operations like "square" or "double", we define the behavior in separate functions
// ? - Reduce code duplication - one generic function handles all kinds of operations
// ? - Improve maintainability - we can add other behaviors without touching the existing functionality
// ? - Abstract the behavior from the implementation - `doOperation` doesn't care HOW the operation works, only that IT WORKS

// ? If you haven't noticed by now, we basically just implemented JavaScript's built-in Array.map() function
// ? This is a key concept in JavaScript - functions are first-class citizens and as such they can be used in very interesting ways

// ? Couple of terminologies here:
// ? - doOperation - is a function that TAKES IN A FUNCTION as one of its parameters - this is called a Higher Order Function (HOF)
// ? - squareNum, duplicateNum - are functions that WE PASS INTO OTHER FUNCTIONS as arguments - these are called Callback Functions

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? CHALLENGE 1
// ? Implement Array.filter()

// ? CHALLENGE 2
// ? Implement Array.reduce()
