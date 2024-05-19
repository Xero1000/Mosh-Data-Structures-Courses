
class AVLTree {
    #root = null
    
    #AVLNode = class {
        value = 0
        height = 0
        leftChild = null
        rightChild = null
        
        constructor(value) {
            this.value = value
        }
    }

    insert(value) {
        this.#root = this.#insert(this.#root, value)
    }

    #insert(root, value) {
        if (root === null) {
            return new this.#AVLNode(value)
        }

        if (value < root.value) {
            root.leftChild = this.#insert(root.leftChild, value)
        }
        else {
            root.rightChild = this.#insert(root.rightChild, value)
        }

        root.height = Math.max(this.#height(root.leftChild), this.#height(root.rightChild)) + 1

        return root
    }

    #height(node) {
        return node === null ? 0 : node.height
    }

    getRoot() {
        return this.#root
    }
}

let tree = new AVLTree() 
tree.insert(10)
tree.insert(20)
tree.insert(30)
console.log(tree.getRoot())