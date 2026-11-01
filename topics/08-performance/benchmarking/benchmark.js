// * Deno benchmarking

import { Sort } from './sorts';

// ? We can create simple benchmarking measurements using Deno's built-in `bench` module

// ? Let's compare different sorting algorithms

const initArray = () => {
  return Array.from({ length: 10_000 }, () => Math.floor(Math.random() * 10_000));
};

// ? We'll mark the JS built-in sort method as a baseline to compare our sorts against
Deno.bench('JS sort', { baseline: true }, (b) => {
  const array = initArray();

  // ? We can use the benchmarking context `b` to configure when we start and end the test
  // ? This is done so that the array initialization does not interfere with the algorithm measurement
  b.start();
  array.sort();
  b.end();
});

Deno.bench('Bubble sort', (b) => {
  const array = initArray();

  b.start();
  Sort.bubbleSort(array);
  b.end();
});

Deno.bench('Quick sort', (b) => {
  const array = initArray();

  b.start();
  Sort.quickSort(array);
  b.end();
});

Deno.bench('Insertion sort', (b) => {
  const array = initArray();

  b.start();
  Sort.insertionSort(array);
  b.end();
});
