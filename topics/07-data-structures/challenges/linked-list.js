// * CHALLENGE

// * 1. Implement a Linked list

// * The list should keep track of its "head" and "tail" Nodes.

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  #idxOOB(idx) {
    return idx < 0 || idx >= this.length;
  }

  #find(idx) {
    if (this.#idxOOB(idx)) {
      return undefined;
    }

    let node = this.head;
    for (let i = 0; i < idx; i++) {
      node = node.next;
    }

    return node;
  }

  push(value) {
    const node = new Node(value);

    if (this.length === 0) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length++;

    return value;
  }

  pop() {
    return this.delete(this.length - 1);
  }

  get(idx) {
    const node = this.#find(idx);

    if (!node) {
      return undefined;
    }

    return node.value;
  }

  insert(value, idx) {
    // ! Your code here
  }

  delete(idx) {
    // ! Your code here
  }
}
