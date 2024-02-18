class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        // This case handles duplicate values; for this example, we do nothing.
        // Alternatively, you could handle duplicates as needed.
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, currentNode = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < currentNode.val) {
      if (currentNode.left === null) {
        currentNode.left = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.left);
      }
    } else if (val > currentNode.val) {
      if (currentNode.right === null) {
        currentNode.right = new Node(val);
      } else {
        this.insertRecursively(val, currentNode.right);
      }
    }
    // If val is equal to the currentNode.val, we do nothing to avoid duplicates.
    return this;
  }
  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined; // If the loop completes without finding the value
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    // Base case: if current node is null
    if (!current) {
      return undefined;
    }
    // If the value is found
    if (val === current.val) {
      return current;
    }
    // If the value is less than current node's value, search in the left subtree
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    }
    // If the value is greater than current node's value, search in the right subtree
    return this.findRecursively(val, current.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    const values = [];
    
    function traverse(node) {
      if (node) {
        values.push(node.val); // Visit the root node
        traverse(node.left); // Traverse left subtree
        traverse(node.right); // Traverse right subtree
      }
    }

    traverse(this.root);
    return values;
  }


  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    const values = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left); // Traverse the left subtree first
      values.push(node.val); // Visit the node
      traverse(node.right); // Then traverse the right subtree
    }
    traverse(this.root);
    return values;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    const values = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left); // Traverse the left subtree first
      traverse(node.right); // Then traverse the right subtree
      values.push(node.val); // Visit the node
    }
    traverse(this.root);
    return values;
  }


  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    const values = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    
    while (queue.length) {
      const currentNode = queue.shift(); // Remove the first node from the queue
      values.push(currentNode.val); // Visit the node
      
      if (currentNode.left) queue.push(currentNode.left); // Add left child to the queue
      if (currentNode.right) queue.push(currentNode.right); // Add right child to the queue
    }
    
    return values;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val, node = this.root, parent = null) {
    if (!node) return null;

    // Find the node to remove
    if (val < node.val) {
      return this.remove(val, node.left, node);
    } else if (val > node.val) {
      return this.remove(val, node.right, node);
    } else { // Node found
      // Node with no children or one child
      if (!node.left || !node.right) {
        const newNode = node.left || node.right;

        if (!parent) { // Removing root
          this.root = newNode;
        } else {
          if (parent.left === node) {
            parent.left = newNode;
          } else {
            parent.right = newNode;
          }
        }
        return node;
      }

      // Node with two children
      // Find the in-order successor (smallest in the right subtree)
      let successor = node.right;
      let successorParent = node;
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Swap the values
      node.val = successor.val;

      // Remove the successor
      return this.remove(successor.val, node.right, node);
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    const getHeight = (node) => {
      if (node === null) return -1; // Base case: the height of a non-existent node is -1

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      // If the subtree is imbalanced, return -Infinity to bubble up the imbalance
      if (Math.abs(leftHeight - rightHeight) > 1 || leftHeight === -Infinity || rightHeight === -Infinity) {
        return -Infinity;
      }

      // Return the height of the current node
      return Math.max(leftHeight, rightHeight) + 1;
    };

    return getHeight(this.root) !== -Infinity;
  }


  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      // Tree is empty or has only one node, so no second highest value exists
      return undefined;
    }

    let current = this.root;
    let parent = null;

    // Traverse to the rightmost node
    while (current.right) {
      parent = current;
      current = current.right;
    }

    // If the rightmost node has a left subtree,
    // the second highest value is the rightmost node in this subtree
    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    // If no left subtree exists for the rightmost node,
    // the second highest value is the parent of the rightmost node
    return parent.val;
  }
}

module.exports = BinarySearchTree;
