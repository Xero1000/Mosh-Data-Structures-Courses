class FixedSizeArray {
    #length;
    #numbers;
    #count = 0;
    constructor(length){
        this.#length = length
        this.#numbers = new Array(this.#length).fill(null)
    }

    insert(item) {
        if (this.#count === this.#length) {
            this.#length++
        }
        this.#numbers[this.#count] = item
        this.#count++
    }

    removeAt(index) {
        if (index < 0 || index >= this.#length)
             throw new Error("Illegal argument: Index is out of bounds")

        this.#numbers[index] = null
        
        if (index === this.#count)
            return;
    
        for (let i = index + 1; i < this.#count; i++) {
            this.#numbers[i - 1] = this.#numbers[i]
            this.#numbers[i] = null
        }
        this.#count--;
    }

    indexOf(item) {
        for (let i = 0; i < this.#count; i++) {
            if (this.#numbers[i] === item) 
                return i
        }
        return -1
    }

    print() {
        let itemsCopy = this.#count
        for (let i = 0; i < itemsCopy; i++) {
            console.log(this.#numbers[i])
        }
    }

    max() {
        let max = this.#numbers[0]
        for (let i = 1; i < this.#count; i++) {
            if (this.#numbers[i] > max) {
                max = this.#numbers[i]
            }
        }
        return max;
    }

    getNumbers() {
        return this.#numbers.slice(0, this.#count)
    }

    intersect(array) {
        let commonItems = []
        let arrayItems = array.getNumbers()
        for (let i = 0; i < this.#numbers.length; i++) {
            for (let j = 0; j < arrayItems.length; j++) {
                if (this.#numbers[i] === arrayItems[j]) {
                    commonItems.push(this.#numbers[i])
                }
            }
        }
        return commonItems
    }

    reverse() {
        let reverseArray = []
        for (let i = this.#count - 1; i >= 0; i--) {
            reverseArray.push(this.#numbers[i])
        }
        return reverseArray
    }

    insertAt(newItem, index) {
        if (this.#count === this.#length) {
            this.#length++
        }
        for (let i = this.#count; i >= index; i--) {
            this.#numbers[i] = this.#numbers[i - 1]
        }
        this.#numbers[index] = newItem
        this.#count++
    }
}

let numbers = new FixedSizeArray(3)
numbers.insert(10)
numbers.insert(20)
numbers.insert(30)
numbers.insert(40)
numbers.insert(50)
// numbers.removeAt(4)
// numbers.removeAt(4)
// numbers.print()
// console.log(numbers.max()) // O(n)

let numbers2 = new FixedSizeArray(3)
numbers2.insert(10)
numbers2.insert(15)
numbers2.insert(20)
numbers2.insert(55)
numbers2.insert(50)
// console.log(numbers.intersect(numbers2))
// console.log(numbers.reverse())
numbers.insertAt(300, 0)
numbers.print()