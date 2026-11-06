// * Basic algorithm techniques

// * Caching & Memoization

// ? Oftentimes the problems we face require us to do multiple expensive calculations
// ? and we need to be smart about how and when we perform these calculations
// ? otherwise our algorithms can quickly become super slow and inefficient

// ? In such cases, we want to look at potential ways to save previously computed results
// ? and reuse them as much as possible, if possible

// ? Let's look at the good ol' staircase problem:
// ? We can climb a staircase by stepping 1 or 2 stairs at a time
// ? How many ways can we climb a staircase of N stairs given the above information?

// ? Let's first look at how we can even attack this problem. Let's start small.

// * Staircase size: 2
// ? We can climb these stairs 2 ways:
// ? 1. Go up 1 stair and then another [1, 1]
// ? 2. Go up 2 stairs at once [2]

// * Staircase size: 3
// ? 1. Go up 1 stair at a time [1, 1, 1]
// ? 2. Go up 1 stair and then 2 [1, 2]
// ? 3. Go up 2 stairs and then 1 [2, 1]

// * Staircase size: 4
// ? 1. Go up 1 stair at a time [1, 1, 1, 1]
// ? 2. [2, 1, 1]
// ? 3. [1, 2, 1]
// ? 4. [1, 1, 2]
// ? 5. Go up 2 stairs at a time [2, 2]

// ? Now this might seem confusing to find a pattern to, but let's look at it this way:
// * If I have 4 stairs in front of me - I know my next move can be to either climb 1 stair or 2 stairs at once
// * So given that, I will be either left with 3 more stairs or 2 more stairs to climb

// ? If I know how many ways there are to climb 3 stairs, I can just add that to the number of ways to climb 2 stairs
// ? because each of those sequences can be prefixed by my first move (1 or 2 steps)

// * ways(4) = ways(4-1) + ways(4-2)

// ? ...this looks like recursion right? Let's do it!

// ? Approach #1 - "Simple" recursion
function staircaseNaive(stairs) {
  // Base case: If we have 1 or fewer stairs left to climb, there's only 1 way to climb em
  if (stairs <= 1) return 1;

  return staircaseNaive(stairs - 1) + staircaseNaive(stairs - 2);
}

console.log(staircaseNaive(4)); // 5

console.time('staircase-slow');
console.log(staircaseNaive(40)); // 165580141 ...but very very slow
console.timeEnd('staircase-slow');

// ? Why is this the naive approach?
// ? Well, let's go back to the staircase size: 4 example and expand the equation:
// ? ways(4) = ways(4-1) + ways(4-2) = ways(3) + ways(2)
// ? Now we have to calculate:
// ? 1. ways(3)
// ?    ways(3) = ways(2) + ways(1)
// ?    Now here we calculate
// ?    1.1 ways(2) = ways(1) + ways(0) = 2
// ?    1.2 ways(1) = 1
// ?    ways(3) = 2 + 1 = 3

// ? 2. ways(2)
// ?    ways(2) = ways(1) + ways(0) = 2

// ? ways(4) = 3 + 2 = 5

// ? ...but notice how many times we calculated ways(2) and ways(1) and ways(0)
// ? this makes our current implementation very slow once it gets to larger staircases

// * The time complexity for the above algorithm is O(2^n) - exponential
// ? because we are branching out into 2 recursive calls for each stair

// ? Exponential algorithms are very very slow for not-even-that-large inputs, as we saw with 40 stairs
// ? ...so how can we make them faster?

// ? Well, the answer is simple - we introduce caching!
// ? We can keep track of the calculations we already did for a specific staircase
// ? and reuse those values to compute the final result

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Approach #2 - Recursion with caching
function staircase(stairs, cache = {}) {
  if (stairs in cache) return cache[stairs];

  // Base case still the same
  if (stairs <= 1) return 1;

  const result = staircase(stairs - 1, cache) + staircase(stairs - 2, cache);

  // Cache the results for the current number of stairs
  cache[stairs] = result;

  return result;
}

console.log(staircase(4)); // 5

console.time('staircase-fast');
console.log(staircase(40)); // 165580141 ...but blazingly fast!
console.timeEnd('staircase-fast');

// ? Note: This is a different "reusing" technique than the "Sliding Window" technique
// ? as in this case we can map a "key" (the current number of stairs we need to climb)
// ? to a "value" (the number of ways we can climb those stairs), which we can store in a key-value cache.

// ? On the other hand, the "Sliding Window" technique often deals with sequences of array items
// ? which we cannot map to any particular single unique "key" for a given sequence
// ? so we implement a different kind of reusing there

// * Caching previously computed values is a great way to speed up our algorithms
// * and we will see more examples of this in the later lessons...
