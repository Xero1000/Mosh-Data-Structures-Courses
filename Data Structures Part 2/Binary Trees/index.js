
class BinarySearchTree {
    #root = null

    #Node = class {
        value = null
        leftChild = null
        rightChild = null

        constructor(value) {
            this.value = value
        }
    }

    insert(value) {
        let newNode = new this.#Node(value)

        if (this.#root === null) {
            this.#root = newNode
            return    
        }

        let currentNode = this.#root

        while (true) {
            if (value < currentNode.value) {
                if (currentNode.leftChild === null) {
                    currentNode.leftChild = newNode
                    break;
                }
                currentNode = currentNode.leftChild
            }
            else {
                if (currentNode.rightChild === null) {
                    currentNode.rightChild = newNode
                    break;
                }
                currentNode = currentNode.rightChild
            }
        }
    }

    find(value) {
        let currentNode = this.#root
        while (currentNode !== null) {
            if (value > currentNode.value) {
                currentNode = currentNode.rightChild
            }
            else if (value < currentNode.value) {
                currentNode = currentNode.leftChild
            }
            else {
                return true
            }
        }
        return false
    }
}

let bst = new BinarySearchTree()
bst.insert(7)
bst.insert(4)
bst.insert(9)
bst.insert(1)
bst.insert(6)
bst.insert(8)
bst.insert(10)
console.log(bst.find(8))