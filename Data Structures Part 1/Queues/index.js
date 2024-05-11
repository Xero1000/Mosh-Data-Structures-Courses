// push and shift
function reverse(queue) {
    let stack = []
    while (queue.length !== 0) {
        let item = queue.shift()
        stack.push(item)
    }

    while (stack.length !== 0) {
        let item = stack.pop()
        queue.push(item)
    }

    return queue
}

//let queue = [10, 20, 30]
//console.log(reverse(queue))

class ArrayQueue {
    #queue = []
    #size = 0
    #count = 0
    #f = 0
    #r = -1

    constructor(size) {
        for(let i = 0; i < size; i++) {
            this.#queue.push(0)
            this.#size++
        }
    }

    enqueue(item) {
        if (this.isFull()) {
            throw new Error("Queue is full")
        }
        if (this.#r === this.#size - 1) {
            this.#r = 0
        }
        else {
            this.#r++
        }
        this.#queue[this.#r] = item
        this.#count++
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }
        let item = this.#queue[this.#f]
        this.#queue[this.#f] = 0
        if (this.#f === this.#size - 1) {
            this.#f = 0
        }
        else {
            this.#f++
        }
        this.#count--
        return item
    }

    peek() {
        if (this.isEmpty()) {
            return null
        }
        return this.#queue[this.#f]
    }

    isEmpty() {
        if (this.#count === 0) {
            return true
        }
        return false
    }

    isFull() {
        if (this.#count === this.#size) {
            return true
        }
        return false
    }

    getQueue() {
        return this.#queue
    }
}

let arrayQueue = new ArrayQueue(3)
arrayQueue.enqueue(1)
arrayQueue.dequeue()
arrayQueue.enqueue(1)
arrayQueue.enqueue(2)
arrayQueue.enqueue(3)
// console.log(arrayQueue.peek())
// console.log(arrayQueue.isEmpty())
// console.log(arrayQueue.getQueue())

class StackQueue {
    #s1 = []  
    #s2 = [] 
    #s1Size = 0

    enqueue(item) {
      this.#s1.push(item)
      this.#s1Size++
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }
        this.moveStack1ToStack2()
        return this.#s2.pop()
    }

    isEmpty() {
        return this.#s1.length === 0 && this.#s2.length === 0
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }
        this.moveStack1ToStack2()
        return this.#s2[this.#s2.length - 1]
    }

    moveStack1ToStack2() {
        if (this.#s2.length === 0) {
            for (let i = 0; i < this.#s1Size; i++) {
                this.#s2.push(this.#s1.pop())
            }
            this.#s1Size = 0
        }
    }

    getQueue() {
        let fullQueue = []
        for (let i = this.#s2.length - 1; i >= 0; i--) {
            fullQueue.push(this.#s2[i])
        }
        for (let j = 0; j < this.#s1Size; j++) {
            fullQueue.push(this.#s1[j])
        }
        return fullQueue
    }
}

let sq = new StackQueue()
// sq.enqueue(10)
// sq.enqueue(20)
// sq.enqueue(30)
// sq.enqueue(40)
// sq.enqueue(50)
// console.log(sq.dequeue())
// console.log(sq.peek())
// sq.enqueue(60)
// sq.dequeue()
// console.log(sq.getQueue())

class PriorityQueue {
    #pq = []
    #maxSize = 0
    #count = 0

    constructor(size){
        if (size <= 0) {
            throw new Error("Size must be greater than 0")
        }
        for (let i = 0; i < size; i++) {
            this.#pq.push(null)
        }
        this.#maxSize = size
    }
    // 3, 5, 7
    insert(item) {
        if (this.isFull()) {
            throw new Error("Queue is full")
        }

        let i = this.shiftItemsToInsert(item)
        this.#pq[i] = item;
        this.#count++
    }

    remove() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }
        let item = this.#pq[this.#count - 1]
        this.#pq[this.#count - 1] = null
        this.#count--;
        return item
    }

    isEmpty() {
        return this.#count === 0
    }

    isFull() {
        return this.#count === this.#maxSize
    }

    shiftItemsToInsert(item) {
        let i;
        for (i = this.#count - 1; i >= 0; i--) {
            if (this.#pq[i] < item) {
                this.#pq[i + 1] = this.#pq[i]
            }
            else {
                break;
            }
        }
        return i + 1
    }

    print() {
        console.log(this.#pq)
    }
}

let priorityQueue = new PriorityQueue(5)
// priorityQueue.insert(10)
// priorityQueue.print()
// priorityQueue.insert(1)
// priorityQueue.print()
// priorityQueue.insert(5)
// priorityQueue.print()
// priorityQueue.insert(2)
// priorityQueue.print()
// priorityQueue.remove()
// priorityQueue.print()
// priorityQueue.insert(4)
// priorityQueue.print()
// priorityQueue.remove()
// priorityQueue.print()
// priorityQueue.remove()
// priorityQueue.print()
// priorityQueue.remove()
// priorityQueue.print()


//EXERCISES
//-------------

function reverseKIntegers(queue, k) {
    let stack = []

    if (k > queue.length) {
        throw new Error("K is greater than queue size")
    }
    if (k < 0) {
        throw new Error("K must be a positive integer")
    }

    for (let i = 0; i < k; i++) {
        stack.push(queue.shift())
    }

    for (let j = 0; j < k; j++) {
        queue.push(stack.pop())
    }

    for (let l = 0; l < queue.length - k; l++) {
        queue.push(queue.shift())
    }
    return queue
}

// let input = [10, 20, 30, 40, 50]
// console.log(reverseKIntegers(input, 3))

class Node {
    value;
    next;

    constructor(value) {
        this.value = value;
    }
}

class LinkedListQueue {
    #first;
    #last;
    #size = 0;

    //O(1)
    enqueue(item) {
        let newNode = new Node(item)

        if (this.isEmpty()) {
            this.#first = newNode
            this.#last = this.#first
        }
        else {
            this.#last.next = newNode
            this.#last = newNode
        }
        this.#size++
    }

    //O(1)
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }

        let value = this.#first.value
        if (this.#size === 1) {
            this.#first = null
            this.#last = null
        }
        else {
            let previousNode = this.#first;
            this.#first = this.#first.next;
            previousNode = null
        }
        this.#size--;

        return value
    }

    //O(1)
    isEmpty() {
        return this.#size === 0
    }

    //O(1)
    size() {
        return this.#size
    }

    //O(1)
    peek() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty")
        }
        return this.#first.value
    }

    print() {
        let q = []
        let currentNode = this.#first
        for (let i = 0; i < this.#size; i++) {
            q.push(currentNode.value)
            currentNode = currentNode.next
        }
        return q
    }
}

let llq = new LinkedListQueue()
llq.enqueue(5)
llq.enqueue(6)
llq.enqueue(3)
// console.log(llq.peek())
// console.log(llq.print())

// 1, 2, 3, 4, 5
class QueueStack {
    #q1 = [] 
    #q2 = [] 
    #size = 0

    //O(1)
    push(item) {
        this.#q1.push(item)
        this.#size++
    }

    //O(n)
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty")
        }
        for (let i = 0; i < this.#size - 1; i++) {
            this.#q2.push(this.#q1.shift())
        }
        let value = this.#q1.shift()
        this.#size--

        this.#q1 = this.#q2
        this.#q2 = []
        return value
    }

    //O(1)
    isEmpty() {
        return this.#size === 0
    }

    //O(1)
    size() {
        return this.#size
    }

    //O(1)
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty")
        }
        return this.#q1[this.#size - 1]
    }

    getStack() {
        return this.#q1
    }
}

let qs = new QueueStack() 
qs.push(5)
qs.push(6)
qs.push(7)
console.log(qs.getStack())
console.log(qs.peek())
