'use strict';

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key <= this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key == key) {
      return this.value;
    } else if (key <= this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('key error');
    }
  }

  remove(key) {
    if (this.key == null) {
      throw new Error('key error');
    }
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else {
      if (key <= this.key && this.left) {
        this.left.remove(key);
      } else if (key > this.key && this.right) {
        this.right.remove(key);
      } else {
        throw new Error('key error');
      }
    }
  }

  // sdfs._replaceWith(this.left)
  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      } else if (this === this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.value = node.value;
        this.key = node.key;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.value = null;
        this.key = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    this.left._findMin();
  }
}

module.exports = BinarySearchTree;

function printPretty(BST) {
  if (BST.value === null) {
    return;
  } else {
    return {
      node: BST.value,
      left: BST.left ? printPretty(BST.left) : null,
      right: BST.right ? printPretty(BST.right) : null,
    };
  }
}

// this adds up all the nodes in a tree (changed it add the key, not value)
function tree(t) {
  if (!t) {
    return 0;
  }
  return tree(t.left) + t.key + tree(t.right);
}

// 5. Height of a BST - O(n) because after the root node,
// the subsequent BSTs could just be link lists going both directions

// 3, 1, 4, 6, 9, 2, 5, 7
function bstHeight(bst, left = 0, right = 0) {
  if (bst.key === null) {
    return 0;
  }

  if (!bst.left && !bst.right) {
    return 1;
  }
  if (bst.left) {
    left = 1 + bstHeight(bst.left, left, right);
  }
  if (bst.right) {
    right = 1 + bstHeight(bst.right, left, right);
  }
  return left > right ? left : right;
}

// KISS version
function kissBSTHeight(bst) {
  return (
    Math.max(
      bst.left && kissBSTHeight(bst.left),
      bst.right && kissBSTHeight(bst.right),
    ) + 1
  );
}

// 6. Is it a BST?
function checkIsBST(bst) {
  if (bst.key === null) {
    throw new Error('Invalid data');
  }

  if (!bst.left && !bst.right) {
    return true;
  }

  if (bst.left && bst.right) {
    if (bst.key < bst.left.key || bst.key > bst.right.key) {
      return false;
    }
    return true && checkIsBST(bst.left) && checkIsBST(bst.right);
  }

  if (bst.left) {
    if (bst.key < bst.left.key) {
      return false;
    }
    return true && checkIsBST(bst.left);
  }

  if (bst.right) {
    if (bst.key > bst.right.key) {
      return false;
    }
    return true && checkIsBST(bst.right);
  }
}

// 3, 1, 4, 6, 9, 2, 5, 7
// 7 Find the 3rd largest node
function bstToArray(bst) {
  if (!bst.left && !bst.right) {
    return [bst.key];
  }

  if (bst.left && bst.right) {
    return [...bstToArray(bst.left), ...bstToArray(bst.right), bst.key];
  } else if (bst.left) {
    return [...bstToArray(bst.left), bst.key];
  } else if (bst.right) {
    return [...bstToArray(bst.right), bst.key];
  }
}

function thirdLargest(bst) {
  let sortedArray = bstToArray(bst).sort();
  console.log(sortedArray);
  const key = sortedArray[sortedArray.length - 3];
  console.log(key);
  return bst.find(key);
}

// 8. Balanced Bst, check if balanced
function balancedBst(bst) {
  // if no left or right, return true
  if (!bst.left && !bst.right) {
    return true;
  }

  if (!bst.left && bst.right) {
    if (!bst.right.left && !bst.right.right) {
      return true;
    } else {
      return false;
    }
  }
  if (!bst.right && bst.left) {
    if (!bst.left.left && !bst.left.right) {
      return true;
    } else {
      return false;
    }
  }
  if (bst.left && bst.right) {
    return balancedBst(bst.left) && balancedBst(bst.right);
  }
}

// 9. Are they the same BSTs?
// arr1 = [ 3, 5, 4, 6, 1, 0, 2 ]
// arr2 = [ 3, 1, 5, 2, 4, 6, 0 ]
// function sameBSTs(arr1, arr2) {
//   // If they do not start with same key, identical BSTs are not possible
//   if (arr1[0] !== arr2[0]) {
//     return false
//   }

//   let stdArr1 = []
//   let stdArr2 = []

//   stdArr1.push(arr1[0])
//   stdArr2.push(arr2[0])

//   arr1.unshift()
//   arr2.unshift()

//   for (let i = 1; i < arr1.length; i++) {
//     if (arr1[i] < stdArr1[0]) {
//       stdArr1.push(arr1[i])
//     }

//     if (arr2[i] < stdArr2[0]) {
      
//     }
//   }
// }

// function sameBSTArr(arr1, arr2) {
//   return arr1 === arr2
// }

// function standardizeArr(arr) {
//   let standardized = []
//   standardized.push(arr[0])
//   let i = 1
//   while (i < arr.length) {
//     if (arr[i] < standardized[0]) {
//       standardized.push(arr[i])
//       i = 1
//       break
//     } else {
//       i++
//     }
//   }

//   while (i < arr.length) {
//     if (arr[i] > standardized[0]) {
//       standardized.push(arr[i])
//       i = 1
//       break
//     } else {
//       i++
//     }
//   }

//   return standardized
// }

// function standardArrRecursive(arr) {
//   if (arr.length === 0) {
//     throw new Error('Invalid')
//   }
//   if (arr.length === 1) {
//     return arr
//   }

  
// }

function main() {
  const bst1 = new BinarySearchTree();
  const bst2 = new BinarySearchTree();
  const bogusBST = {
    key: 89,
    left: {
      key: 80,
      left: {
        key: 70,
      },
      right: {
        key: 60,
      },
    },
  };
  const bst3 = new BinarySearchTree();

  bst1.insert(3, 3);
  bst1.insert(1, 1);
  bst1.insert(4, 4);
  bst1.insert(6, 6);
  bst1.insert(9, 9);
  bst1.insert(2, 2);
  bst1.insert(5, 5);
  bst1.insert(7, 7);

  bst2.insert('E');
  bst2.insert('A');
  bst2.insert('S');
  bst2.insert('Y');
  bst2.insert('Q');
  bst2.insert('U');
  bst2.insert('E');
  bst2.insert('S');
  bst2.insert('T');
  bst2.insert('I');
  bst2.insert('O');
  bst2.insert('N');

  bst3.insert(5);
  bst3.insert(3);
  bst3.insert(7);
  bst3.insert(2);
  bst3.insert(4);
  bst3.insert(6);
  bst3.insert(8);

  console.log(bst1);
  console.log(bst2);

  console.log(tree(bst1));
  console.log('Exercise 5');
  console.log(bstHeight(bst1));
  console.log('KISS version', kissBSTHeight(bst1));
  console.log('Exercise 6');
  console.log(checkIsBST(bst1));
  console.log(checkIsBST(bst2));
  console.log(checkIsBST(bogusBST));

  console.log('#7. sort tree into array');
  console.log(thirdLargest(bst1));

  console.log(balancedBst(bst1));
  console.log(balancedBst(bst2));
  console.log(balancedBst(bst3));

  let arr1 = [ 3, 5, 4, 6, 1, 0, 2 ]
  let arr2 = [ 3, 1, 5, 2, 4, 6, 0 ]
  console.log(standardizeArr(arr1))
  console.log(standardizeArr(arr2))
}

main();
