// * CHALLENGE

// * Temperature Tracker

// ? Write a TemperatureTracker class that keeps track of temperature readings and allows you to efficiently query for:
// ? - The maximum temperature seen so far.
// ? - The minimum temperature seen so far.
// ? - The average temperature so far.

// ? The class should have two methods:
// ? insert(temp) — called every time a new temperature reading comes in.
// ? getStats() — returns an object with { max, min, avg }.

// ? Requirements:
// ? `insert` should ideally run in O(1) time.
// ? `getStats` should return results in O(1) time.

class TemperatureTracker {
  // ! Your code here
}

const tracker = new TemperatureTracker();

tracker.insert(50);
tracker.insert(80);
tracker.insert(50);
tracker.insert(90);

console.log(tracker.getStats()); // { max: 90, min: 50, avg: 67.5 }
