// * Benchmarking with mitata

import { bench, run, summary } from 'mitata';
import { Sort } from './sorts';

// ? Each sort mutates its array, so every sample needs a new one
// ? `[0]` prepares that array, and only the `bench` function is timed
const measureSort = (sort) => {
  return function* () {
    yield {
      [0]: () => Array.from({ length: 10_000 }, () => Math.floor(Math.random() * 10_000)),

      bench: (array) => sort(array),
    };
  };
};

// ? `summary` compares every case with the baseline
summary(() => {
  // ? The built-in sort is the baseline the other algorithms are compared against
  bench('JS sort', measureSort(Sort.jsSort)).baseline();

  bench('Bubble sort', measureSort(Sort.bubbleSort));

  bench('Quick sort', measureSort(Sort.quickSort));

  bench('Insertion sort', measureSort(Sort.insertionSort));
});

await run();
