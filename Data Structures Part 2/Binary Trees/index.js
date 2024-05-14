
class BinaryTree {
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

    equals(other) {
        if (other === null) 
            return false
        return this.#equals(this.#root, other.getRoot())
    }

    #equals(firstNode, secondNode) {
        if (firstNode === null && secondNode === null) 
            return true

        if (firstNode !== null && secondNode !== null) 
            return firstNode.value === secondNode.value 
                    && this.#equals(firstNode.leftChild, secondNode.leftChild) 
                    && this.#equals(firstNode.rightChild, secondNode.rightChild)
        
        return false // if one of the two nodes is null, that means the trees are not equal
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

    getRoot() {
        return this.#root
    }

    
    height() {
        if (this.#root === null) 
            return -1
        
        return this.#height(this.#root)
    }
    
    #height(root) {
        if (this.#isLeaf(root))
            return 0
        
        return 1 + Math.max(this.#height(root.leftChild), this.#height(root.rightChild))
    }

    #isLeaf(node) {
        return node.leftChild === null && node.rightChild === null
    }

    min() {
        return this.#min(this.#root)
    }

    // This is if we're not dealing with a binary search tree
    // In a binary search tree, we just find the leftmost leaf node
    // O(n)
    #min(root) {
        if (this.#isLeaf(root))
            return root.value

        let left = this.#min(root.leftChild)
        let right = this.#min(root.rightChild)

        return Math.min(Math.min(left, right), root.value)
    }

    traversePreOrder() {
        this.#traversePreOrder(this.#root)
    }

    #traversePreOrder(root) {
        if (root === null) 
            return

        console.log(root.value)
        this.#traversePreOrder(root.leftChild)
        this.#traversePreOrder(root.rightChild)
    }

    traverseInOrder() {
        this.#traverseInOrder(this.#root)
    }
    
    #traverseInOrder(root) {
        if (root === null) 
            return

        this.#traverseInOrder(root.leftChild)
        console.log(root.value)
        this.#traverseInOrder(root.rightChild)
    }

    traversePostOrder() {
        this.#traversePostOrder(this.#root)
    }

    #traversePostOrder(root) {
        if (root === null)
            return

        this.#traversePostOrder(root.leftChild)
        this.#traversePostOrder(root.rightChild)
        console.log(root.value)
    }
}

let tree = new BinaryTree()
tree.insert(7)
tree.insert(4)
tree.insert(9)
tree.insert(1)
tree.insert(6)
tree.insert(8)
tree.insert(10)

let tree2 = new BinaryTree()
tree2.insert(7)
tree2.insert(4)
tree2.insert(9)
tree2.insert(1)
tree2.insert(6)
tree2.insert(8)
tree2.insert(10)
//console.log(tree.find(8))
//tree.traversePostOrder()
//console.log(tree.height())
//console.log(tree.min())
//console.log(tree.equals(tree2))


// f(3)
//   3 * f(2)
//         2 * f(1)
//               1 * 1
function factorial(n) {
    if (n === 0) return 1 // base condition
    return n * factorial(n - 1)
}

//console.log(factorial(5))