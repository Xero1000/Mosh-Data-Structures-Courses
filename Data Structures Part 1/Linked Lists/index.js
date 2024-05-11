class MyNode {
  #value = null;
  #next = null;

  constructor(value) {
    this.#value = value
  }

  getValue() {
    return this.#value;
  }

  setValue(value) {
    this.#value = value;
  }

  getNext() {
    return this.#next;
  }

  setNext(node) {
    this.#next = node;
  }
}

class LinkedList {
  #first = null;
  #last = null;
  #count = 0;

  addFirst(value) {
    let newNode = new MyNode(value);
    if (this.#isEmpty()) {
      this.#first = newNode;
      this.#last = this.#first
    }
    else {
      newNode.setNext(this.#first);
      this.#first = newNode;
    }
    this.#count++
  }

  addLast(value) {
    let newNode = new MyNode(value)
    if (this.#isEmpty()) {
      this.#last = newNode
      this.#first = this.#last
    }
    else {
      this.#last.setNext(newNode)
      this.#last = newNode
    }
    this.#count++
  }
  
  deleteFirst() {
    if (this.#isEmpty())
      throw new NoSuchElementException()
    if (this.#first === this.#last) {
      this.#first = null
      this.#last = null
    }
    else {
      let nextNode = this.#first.getNext()
      this.#first = null
      this.#first = nextNode
    }
    this.#count--
  }
  
  deleteLast() {
    if (this.#isEmpty()) {
      throw new NoSuchElementException()
    }
    if (this.#first === this.#last) {
      this.#first = null;
      this.#last = null;
    }
    else {
      let previousNode = this.#getPrevious(this.#last)
      this.#last = previousNode
      this.#last.setNext(null)
    }
    this.#count--
  }

  contains(value) {
    return this.indexOf(value) !== -1
  }

  indexOf(value) {
      let currentNode = this.#first
      let currentIndex = 0
      while (currentNode !== null) {
        if (currentNode.getValue() === value)
          return currentIndex
        currentNode = currentNode.getNext()
        currentIndex++;
      }
      return -1
  }

  #getPrevious(node) {
    let currentNode = this.#first
    while (currentNode !== null) {
      if (currentNode.getNext() === node)
        return currentNode
      currentNode = currentNode.getNext()
    }
    return null
  }

  #isEmpty() {
    return this.#first === null
  }

  size() {
    return this.#count
  }

  toArray() {
    let array = []
    let currentNode = this.#first
    while (currentNode !== null) {
      array.push(currentNode.getValue())
      currentNode = currentNode.getNext()
    }
    return array;
  }

  reverse() {
    if (this.#isEmpty()) return;
     
    let currentNode = this.#first
    let nextNode = currentNode.getNext()
    while (currentNode.getNext() !== null) {
      currentNode.setNext(nextNode.getNext())
      nextNode.setNext(this.#first)
      this.#first = nextNode
      nextNode = currentNode.getNext()
    }
    this.#last = currentNode
  }

  getKthFromTheEnd(k) {
    if (k < 0) {
      throw new Error("k must be a positive integer")
    }

    if (k > this.#count) {
      throw new Error("k is larger than the list")
    }

    let pointer1 = this.#first
    let pointer2 = this.#first

    while (k > 1) {
      let next = pointer2.getNext()
      pointer2 = next
      k--
    }

    while (pointer2 != this.#last) {
      pointer1 = pointer1.getNext()
      pointer2 = pointer2.getNext()
    }

    return pointer1
  }

  printMiddle() {
    if (this.#isEmpty()) return 
    let pointer1 = this.#first
    let pointer2 = this.#first

    while (pointer2.getNext() && pointer2.getNext().getNext()) {
      pointer1 = pointer1.getNext()
      pointer2 = pointer2.getNext().getNext()
    }

    if (pointer2.getNext()) {
      return pointer1.getValue() + ", " + pointer1.getNext().getValue()
    }
    else {
      return pointer1.getValue()
    }
  }

  print() {
    let list = []
    let currentNode = this.#first
    if (currentNode === null) return;
      while (currentNode.getNext()) {
        list.push(currentNode.getValue())
        currentNode = currentNode.getNext()
      }
      list.push(currentNode.getValue())
      console.log(list)
    }
  }

  let myLinkedList = new LinkedList();
  myLinkedList.addLast(10);
  myLinkedList.addLast(20);
  myLinkedList.addLast(30);
  myLinkedList.addLast(40);
  myLinkedList.addLast(50);
  myLinkedList.addLast(60);
  console.log(myLinkedList.contains(5))
  console.log(myLinkedList.toArray())
  myLinkedList.reverse()
  console.log(myLinkedList.size())
  console.log(myLinkedList.toArray())
  console.log(myLinkedList.getKthFromTheEnd(1))
  console.log(myLinkedList.printMiddle())
