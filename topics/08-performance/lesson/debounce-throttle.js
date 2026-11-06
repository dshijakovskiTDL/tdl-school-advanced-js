// * Debounce

// ? Classic debouncing is pretty simple. We take in a function and an interval and:
// ? - Only run the function after the interval has passed
// ? - If we attempt to call it in-between the interval - the timer resets

function debounce(fn, intervalMs) {
  let timer = null;

  return (...args) => {
    // cancel the previous timer
    clearTimeout(timer);

    // start a new timer
    timer = setTimeout(() => {
      fn(...args);
    }, intervalMs);
  };
}

// ? Now if we have some expensive database lookup happening each time users type in a text field
// ? we can just debounce that request and only run that lookup after the user has finished typing
// ? A timer of 500ms should do it here.

function expensiveDatabaseLookup(inputText) {
  // Performing some expensive SQL query
}
const debouncedDatabaseLookup = debounce(expensiveDatabaseLookup, 500);

const userInput = document.getElementById('user-input');
userInput.addEventListener('input', (e) => {
  debouncedDatabaseLookup(e.target.value);
});

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// * Throttle

// ? Throttling is used to limit the rate at which a function is called
// ? This technique will make sure a function is called at most once per interval

// ? To do this, we just need to make sure that enough time has passed
// ? since the last time we called our function, in order to run it again - that's it!

function throttle(fn, intervalMs) {
  // keep track of the last timestamp (in ms) when we called the function
  let lastCalled = 0; // initially 0 because we haven't called it yet

  return (...args) => {
    const now = Date.now();

    // Only run the function if enough time has passed
    if (now - lastCalled >= intervalMs) {
      lastCalled = now;

      return fn(...args);
    }
  };
}

function expensiveApiCall() {
  // Performing some expensive call to an external API
  return { data: true };
}
const throttledApiCall = throttle(expensiveApiCall, 1000); // Make sure the API call is done once per second

// Will attempt to call the function every half-second
// but the call will be "throttled" and it will only happen 1 time per second
setInterval(() => {
  console.log('Calling API');
  console.log(throttledApiCall());
}, 500);
