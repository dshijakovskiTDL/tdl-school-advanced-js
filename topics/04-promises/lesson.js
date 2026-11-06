// * Promises

// ? Promise constructors
new Promise((resolve) => {
  setTimeout(() => resolve('Done'), 3000);
}).then((result) => {
  console.log(result);
});

// ? Firstly, we create a Promise with the `new Promise()` call
// ? This creates an empty Promise object with the following state:
// ! [[PromiseState]]: "pending"
// ! [[PromiseResult]]: undefined
// ! [[PromiseFulfillReactions]]: []
// ! [[PromiseRejectReactions]]: []

// ? Then, we execute the Promise Executor function
// ? In this case, `setTimeout` is called and schedules a function `() => resolve('Done')` to run after 3000ms
// ? Still, our Promise's state is unchanged:
// ! [[PromiseState]]: "pending"
// ! [[PromiseResult]]: undefined
// ! [[PromiseFulfillReactions]]: []
// ! [[PromiseRejectReactions]]: []

// ? After that, we attach a `.then()` call to the Promise, with the callback `(result) => console.log(result)` passed in
// ? This now adds a new Record in the Promise's [[PromiseFulfillReactions]] List, to run when the Promise resolves
// ! [[PromiseState]]: "pending"
// ! [[PromiseResult]]: undefined
// ! [[PromiseFulfillReactions]]: [PromiseReactionRecord<`(result) => console.log(result)`>]
// ! [[PromiseRejectReactions]]: []

// ? Now, after 3000ms - the function `() => resolve('Done')` is added to the Task Queue, ready to run
// ? In this case, the Call Stack is empty, so it gets put on the Call Stack and runs immediately
// ? This function calls resolve with the argument 'Done' - which resolves the Promise with the result - the string "Done"

// ? Finally, because the Promise has settled (in this case resolved)
// ? all the Handlers in the [[PromiseFulfillReactions]] are executed one by one immediately (...or are they?)
// ? This in turn runs the `(result) => console.log(result)` function with the [[PromiseResult]] passed in - which is the string "Done"
// ? And then the string "Done" gets printed to the console
// ? ...phew
// ! [[PromiseState]]: "fulfilled"
// ! [[PromiseResult]]: "Done"
// ! [[PromiseFulfillReactions]]: []
// ! [[PromiseRejectReactions]]: []

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Promise-based APIs
// ! ILLUSTRATION
function gotData(data) {
  console.log(data);
}

const myPromise = fetch('https://catfacts.com/2');
myPromise.then(gotData);

console.log('Me first');

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Promises in the real world
// ! ILLUSTRATION
function blockFor500ms() {
  // ? Imagine some code that blocks the main thread for 500ms...
}

setTimeout(() => console.log('Hello!'), 0);

const catFactsPromise = fetch('https://catfacts.com/2');
catFactsPromise.then(gotData);

blockFor500ms(); // ? This will block the main thread for 500ms

console.log('Me first!');

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Async/Await: The syntactic sugar of Promises
// ! ILLUSTRATION
async function returnResult() {
  console.log('Fetching your result...');

  const result = await new Promise((resolve) => {
    setTimeout(() => resolve(10), 3000);
  });

  console.log('Got result');
  return result;
}

returnResult().then(console.log);
console.log('Me first');

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? CHALLENGE 1
// ? Given a piece of code using Promises with .then and .catch callbacks,
// ? refactor it to use the async/await approach.

function downloadData(url) {
  return fetch('/api/data');
}

function downloadFallbackData(url, error) {
  console.error(error);
  return fetch('/api/fallback');
}

function processData(data) {
  console.log('Processing data...', data);
}

// ! Refactor to async/await syntax
function getProcessedData(url) {
  return downloadData(url)
    .catch((err) => downloadFallbackData(url, err))
    .then((data) => processData(data));
}

getProcessedData();

// ? CHALLENGE 2
// ? Given a function that mocks an API call which can fail 50% of the time,
// ? create a function that fetches this API and retries a maximum of N times.

function mockFetchApi(api) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Fetching...', api);

      if (Math.random() < 0.5) {
        return reject('Error!');
      }

      resolve('Done!');
    }, 2000);
  });
}

async function fetchRetry(api, N) {
  // ! Your code here
}
