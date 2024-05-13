
class CharFinder {

    findFirstNonRepeatedChar(string) {
        let chars = {}
        for (let i = 0; i < string.length; i++) {
            if (string[i] === " ") continue
    
            if (string[i] in chars) {
                chars[string[i]] += 1
            }
            else {
                chars[string[i]] = 1
            }
        }

        for (let key in chars) {
            if (chars[key] === 1) {
                return key
            }
        }
    }

    findFirstRepeatedChar(string) {
        let chars = new Set()

        for (let i = 0; i < string.length; i++) {
            if (chars.has(string[i])) {
                return string[i]
            }
            chars.add(string[i])
        }
    }
}

let chFinder = new CharFinder()
// console.log(chFinder.findFirstNonRepeatedChar("a green apple"))
// console.log(chFinder.findFirstRepeatedChar("a green apple"))

class HashExample {
    #arraySize = 0;

    constructor(size) {
        this.#arraySize = size
    }

    hash(key) {
        let index = 0;

        if (typeof key === "number") {
            index = this.#hashInteger(key)
        }
        if (typeof key === "string") {
            index = this.#hashString(key)
        }
        return index
    }

    #hashInteger(key) {
        let hashValue = key % this.#arraySize
        return hashValue;
    }

    #hashString(key) {
        let hashValue = 0; 
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i)
        }
        hashValue %= this.#arraySize
        return hashValue
    }
}

let hash = new HashExample(100)
// console.log(hash.hash("123456-A"))

class LinkedList {
    #first = null;
    #last = null;
    #count = 0;

    Node = class {
        constructor(value) {
            this.value = value;
            this.next = null;
        }
    };

    addFirst(value) {
        let newNode = new this.Node(value);
        if (this.#isEmpty()) {
          this.#first = newNode;
          this.#last = this.#first
        }
        else {
          newNode.next = this.#first;
          this.#first = newNode;
        }
        this.#count++
      }
    
      addLast(value) {
        let newNode = new this.Node(value)
        if (this.#isEmpty()) {
          this.#last = newNode
          this.#first = this.#last
        }
        else {
          this.#last.next = newNode
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
          let nextNode = this.#first.next
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
          let previousNode = this.getPrevious(this.#last)
          this.#last = previousNode
          this.#last.next = null
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
            if (currentNode.value === value)
              return currentIndex
            currentNode = currentNode.next
            currentIndex++;
          }
          return -1
      }

      getFirst() {
        return this.#first
      }
    
      getPrevious(node) {
        let currentNode = this.#first
        while (currentNode !== null) {
          if (currentNode.next === node)
            return currentNode
          currentNode = currentNode.next
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
          array.push(currentNode.value)
          currentNode = currentNode.next
        }
        return array;
      }
}

class HashTable {
    #linkedListArray = []
    #size = 0;

    constructor(size) {
        for (let i = 0; i < size; i++) {
            this.#linkedListArray.push(null)
        }
        this.#size = size
    }

    #Entry = class {
        constructor(key, value) {
            this.key = key;
            this.value = value;
        }
    }

    put(key, value) {
        this.#checkKey(key)
        this.#checkValue(value)

        let index = this.#hashKey(key)
        
        if (this.#linkedListArray[index] === null) {
            this.#linkedListArray[index] = new LinkedList()
        }

        let bucket = this.#linkedListArray[index]
        let currentNode = bucket.getFirst()

        while (currentNode) {
            let entry = currentNode.value
            if (entry.key === key) {
                entry.value = value
                return
            }
            currentNode = currentNode.next
        }
        bucket.addLast(new this.#Entry(key, value)) 
    }

    get(key) {
        this.#checkKey(key)
        let index = this.#hashKey(key)
        let bucket = this.#linkedListArray[index]

        if (bucket !== null) {
            let currentNode = bucket.getFirst()
            while (currentNode) {
                let entry = currentNode.value
                if (entry.key === key) {
                    return entry.value
                }
                currentNode = currentNode.next
            }
        }

        return null
    }

    remove(key) {
        this.#checkKey(key)
        let index = this.#hashKey(key)

        let bucket = this.#linkedListArray[index]
        this.#checkArrayIndexBucket(bucket)

        let currentNode = bucket.getFirst()
        while (currentNode) {
            let entry = currentNode.value
            if (entry.key === key) {
                let previousNode = bucket.getPrevious(currentNode)
                let nextNode = currentNode.next
                currentNode = null
                if (!previousNode) {
                    bucket.deleteFirst()
                }
                else {
                    previousNode.next = nextNode
                }
                return
            }
            currentNode = currentNode.next
        }
        
        throw new Error("No such key exists")
    }

    getBucket(key) {
        let index = this.#hashKey(key)
        let bucket = this.#linkedListArray[index]
        return bucket
    }

    #checkKey(key) {
        if (typeof key !== "number") {
            throw new Error("Key must be an integer")
        }
        if (key < 0) {
            throw new Error("Key must be a positive integer")
        }
    }

    #checkValue(value) {
        if (typeof value !== "string") {
            throw new Error("Value must be a string")
        }
    }

    #checkArrayIndexBucket(bucket) {
        if (bucket === null) {
            throw new Error("No data exists for this key")
        }
    }

    #hashKey(key) {
        return key % this.#size;
    }

}

let hashTable = new HashTable(5)
hashTable.put(6, "A") // 1
hashTable.put(8, "B") // 3
hashTable.put(11, "C") // 1
hashTable.put(6, "A+")
hashTable.put(1, "D")
hashTable.remove(16)
console.log(hashTable.get(6))
console.log(hashTable)
