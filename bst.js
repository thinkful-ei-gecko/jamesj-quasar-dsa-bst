'use strict'

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key
    this.value = value
    this.parent = parent
    this.left = null
    this.right = null
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key
      this.value = value
    } else if (key <= this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      } else {
        this.left.insert(key, value)
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value
    } else if (key <= this.key && this.left) {
      return this.left.find(key)
    } else if (key > this.key && this.right) {
      return this.right.find(key)
    } else {
      throw new Error('key error')
    }
  }

  remove(key) {
    if (this.key == null) {
      throw new Error('key error')
    }
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      } else if (this.left) {
        this._replaceWith(this.left)
      } else if (this.right) {
        this._replaceWith(this.right)
      } else {
        this._replaceWith(null)
      }
    } else {
      if (key <= this.key && this.left) {
        this.left.remove(key)
      } else if (key > this.key && this.right) {
        this.right.remove(key)
      } else {
        throw new Error('key error')
      }
    }
  }

  // sdfs._replaceWith(this.left)
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node
      } else if (this === this.parent.right) {
        this.parent.right = node
      }
      if (node) {
        node.parent = this.parent
      }
    } else {
      if (node) {
        this.value = node.value
        this.key = node.key
        this.left = node.left
        this.right = node.right
      } else {
        this.value = null
        this.key = null
        this.left = null
        this.right = null
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this
    }
    this.left._findMin()
  }
}

module.exports = BinarySearchTree

function printPretty(BST) {
  if (BST.value === null) {
    return
  } else {
    return {
      node: BST.value,
      left: BST.left ? printPretty(BST.left) : null,
      right: BST.right ? printPretty(BST.right) : null,
    }
  }
}

// this adds up all the nodes in a tree (changed it add the key, not value)
function tree(t) {
  if (!t) {
    return 0
  }
  return tree(t.left) + t.key + tree(t.right)
}

// 5. Height of a BST

// 3, 1, 4, 6, 9, 2, 5, 7
function bstHeight(bst, left = 0, right = 0) {
  if (bst.key === null) {
    return 0
  }

  if (!bst.left && !bst.right) {
    return 1
  }
  if (bst.left) {
    left = 1 + bstHeight(bst.left, left, right)
  } 
  if (bst.right) {
    right = 1 + bstHeight(bst.right, left, right)
  }
  return left > right ? left : right
}

// KISS version
function kissBSTHeight(bst) {
  return Math.max(bst.left && kissBSTHeight(bst.left), bst.right && kissBSTHeight(bst.right)) + 1
}

function main() {
  const bst1 = new BinarySearchTree()
  const bst2 = new BinarySearchTree()

  bst1.insert(3)
  bst1.insert(1)
  bst1.insert(4)
  bst1.insert(6)
  bst1.insert(9)
  bst1.insert(2)
  bst1.insert(5)
  bst1.insert(7)

  bst2.insert('E')
  bst2.insert('A')
  bst2.insert('S')
  bst2.insert('Y')
  bst2.insert('Q')
  bst2.insert('U')
  bst2.insert('E')
  bst2.insert('S')
  bst2.insert('T')
  bst2.insert('I')
  bst2.insert('O')
  bst2.insert('N')

  console.log(bst1)
  console.log(bst2)

  console.log(tree(bst1))
  console.log('Exercise 5')
  console.log(bstHeight(bst1))
  console.log('KISS version', kissBSTHeight(bst1))
}

main()
