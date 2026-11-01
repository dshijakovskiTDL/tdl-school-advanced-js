import { CITY_NAMES } from './cities.js';

class Node {
  constructor(value = '') {
    this.value = value;
    this.final = false;
    this.next = new Map();
  }

  add(word) {
    if (word.length === 0) {
      this.final = true;
      return;
    }

    const char = word[0].toLowerCase();
    const rest = word.slice(1);

    const node = new Node(char);

    // If I don't have a "next" with this char - create one
    if (!this.next.has(char)) {
      this.next.set(char, node);
    }

    // Continue adding the rest of the word through that "next"
    this.next.get(char).add(rest);
  }

  getStartingNode(word) {
    let node = this;

    for (const char of word.toLowerCase()) {
      if (!node.next.has(char)) {
        return null;
      }

      node = node.next.get(char);
    }

    return node;
  }

  autocomplete(prefix, max, words = []) {
    if (words.length >= max) {
      return words;
    }

    if (this.final) {
      words.push(prefix);
    }

    const nextNodes = this.next.values();
    for (const node of nextNodes) {
      node.autocomplete(prefix + node.value, max, words);

      if (words.length >= max) break;
    }

    return words;
  }
}

class Trie {
  #root;

  constructor(words = []) {
    this.#root = new Node('');

    for (const word of words) {
      this.#root.add(word);
    }
  }

  autocomplete(string, max = Infinity) {
    if (string.length === 0) {
      return [];
    }

    const startingNode = this.#root.getStartingNode(string);
    if (!startingNode) {
      return [];
    }

    // Auto-complete the rest of the words, starting from the startingNode
    const words = startingNode.autocomplete(string, max);

    // Find words

    if (startingNode.final && !words.includes(string)) {
      words.push(string);
    }

    return words.slice(0, max);
  }
}

const trie = new Trie(CITY_NAMES);

console.log(trie.autocomplete('n', 10));
// [
// 'new york'
// 'new orleans'
// 'new haven'
// 'new bedford'
// 'new berlin'
// 'new britain'
// 'new braunfels'
// 'new brunswick'
// 'new rochelle'
// 'newark'
// ]
