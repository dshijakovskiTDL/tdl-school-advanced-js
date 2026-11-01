// * CHALLENGE

// * 1. Make Change - Greedy

// ? Implement a function `makeChange` that takes in an amount of money and returns
// ? the minimum number of coins needed to return the passed in amount of money as change

// ? You have the coins 25, 10 and 5 available to create the change

function makeChangeGreedy(amount, coinsAvailable) {
  // ! Your code here
}

console.log(makeChangeGreedy(45, [25, 10, 5])); // 3 (Can return the change with 25, 10, 10)

// * 2. Make Change - Brute Force

// ? Implement a brute-force solution to the `makeChange` function
// ? to make sure that the optimal solution (minimum amount of coins) is always the returned solution

function makeChangeBruteForce(amount, coinsAvailable) {
  // ! Your code here
}

console.log(makeChangeGreedy(12, [10, 6, 1])); // 3 - Incorrect with Greedy approach
console.log(makeChangeBruteForce(12, [10, 6, 1])); // 2 - Correct with Brute Force
