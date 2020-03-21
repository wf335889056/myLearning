/*
 * 原理
 * 把第一位当做根节点，比根节点小的数放在左子树上，比根节点大的数放到右子树上，以此类推。
 * 
 * 二叉树每一个节点不能多于两个孩子
 * 没有孩子的节点就是叶子节点
 * 一个节点有左右两个指针，若无则指向null
 * 深度为h的二叉树最多有2^h-1个结点(h>=1)，最少有h个结点
 * 
 * 二叉树的遍历三种方式
 * 1. 前序遍历（DLR），首先访问根结点，然后遍历左子树，最后遍历右子树。简记根-左-右。
 * 2. 中序遍历（LDR），首先遍历左子树，然后访问根结点，最后遍历右子树。简记左-根-右。 
 * 3. 后序遍历（LRD），首先遍历左子树，然后遍历右子树，最后访问根结点。简记左-右-根
 * 
 * 
 */ 

class BinaryTree {
  constructor(tree = []) {
      this.root = null;//树根
      this.Node = key => {
          //生成一个新的子树
          let _obj = Object.create(null, {});
          _obj.key = key;
          _obj.left = null;
          _obj.right = null;
          return _obj;
      }
      //初始化二叉树
      if (typeof tree === 'number') {
          this.insert(tree);
      } else if (Array.isArray(tree)) {
          this.bulkInsert(tree)
      } else {
          console.error('请输入Number类型或者Array类型的参数')
      }
  }
  insert(key) {
      //添加一个新子树
      let newNode = this.Node(key);
      let _insertNode = (node, newNode) => {
          //判断新二叉树的值和原有节点的值
          if (newNode.key < node.key) {
              if (node.left === null) {
                  //判断左节点是否为空
                  node.left = newNode;
              } else {
                  _insertNode(node.left, newNode)
              }
          } else {
              if (node.right === null) {
                  //判断右节点是否为空
                  node.right = newNode;
              } else {
                  _insertNode(node.right, newNode)
              }
          }
      }
      if (this.root === null) {
          //如果没有根节点，那么把传入的值当根节点
          this.root = newNode;
      } else {
          //如果有根节点，那么把传入的值插到二叉树上
          _insertNode(this.root, newNode);
      }
  }
  bulkInsert (nodes) {
      nodes.forEach(key => {
          //遍历数组，插入子树
          this.insert(key);
      })
  }
  showTree () {
      //返回二叉树对象
      return this.root;
  }

  inOrderTraverse (fn) {
      let inOrderTraverseNode = (node, callback) => {
          if (node !== null) {
              inOrderTraverseNode(node.left, callback);
              callback(node.key);
              inOrderTraverseNode(node.right, callback);
          }
      }
      inOrderTraverseNode(this.root, fn)
  }

  preOrderTraverse (fn) {
      let preOrderTraverseNode = (node, callback) => {
          if (node !== null) {
              callback(node.key);
              preOrderTraverseNode(node.left, callback);
              preOrderTraverseNode(node.right, callback);
          }
      }
      preOrderTraverseNode(this.root, fn)
  }

  postOrderTraverse (fn) {
      let postOrderTraverseNode = (node, callback) => {
          if (node !== null) {
              postOrderTraverseNode(node.left, callback);
              postOrderTraverseNode(node.right, callback);
              callback(node.key);
          }
      }
      postOrderTraverseNode(this.root, fn)
  }

  min() {
      let node = this.root;
      if (node) {
          while (node && node.left !== null) {
              node = node.left;
          }
          return node.key;
      }
  }

  max() {
      let node = this.root;
      if (node) {
          while (node && node.right !== null) {
              node = node.right;
          }
          return node.key;
      }
  }



  search(key) {
      let searchNode = (node, key) => {
          if (node === null) {
              return false;
          }
          if (key < node.key) {
              return searchNode(node.left, key);
          } else if (key > node.key){
              return searchNode(node.right, key);
          } else {
              return true;
          }
      }
      return searchNode(this.root, key)
  }

  remove(key) {
      let findMinNode = (node, key) => {
          let node = node || this.root;
          if (node) {
              while (node && node.left !== null) {
                  node = node.left;
              }
              return node;
          }
          return null;
      }
      let removeNode = (node, key) => {
          if (node === null) {
              return null
          }

          if (key < node.key) {
              node.left = removeNode(node.left, key);
              return node;
          } else if (key > node.key) {
              node.right = removeNode(node.right, key);
              return node;
          } else {
              if (node.left === null && node.right === null) {
                  node = null;
                  return node;
              }
              if (node.left === null) {
                  node = node.right;
                  return node;
              } else if (node.right === null) {
                  node = node.left;
                  return node;
              } 

              if (node.left !== null && node.right !== null) {
                  let aux = findMinNode(node.right);
                  node.key = aux;
                  node.right = removeNode(node.right, aux.key);
                  return node;        
              }
          }
      }
      this.root = removeNode(this.root, key)
  }
}

let nodes = [8,3,6,4,9,11,2,5,7];
let binaryTree = new BinaryTree(nodes);
console.log(JSON.stringify(binaryTree))
