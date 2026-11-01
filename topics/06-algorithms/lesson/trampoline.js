// * Trampoline

// ? Higher order function which keeps executing "thunks"
// ? instead of recursively piling on Stack frames

// ? thunk - a function that wraps the code we want to run, so it can be run later

function trampoline(func) {
  return function (...args) {
    // Start with the initial function call
    let result = func(...args);

    // Keep executing the returned 'thunk' until we get a non-function result
    while (typeof result === 'function') {
      result = result();
    }

    return result;
  };
}

// ? We can now transform our factorial function to return a "thunk"
function factorial(n, acc = 1) {
  if (n <= 1) return acc;

  // Return a function that performs the recursive call
  return () => factorial(n - 1, n * acc);
}

const trampolineFactorial = trampoline(factorial);
const output = trampolineFactorial(10000); // No Stack overflow happening

console.log(output);
