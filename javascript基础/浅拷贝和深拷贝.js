/* 浅拷贝
 * 如果是数据类型, 则是值的拷贝
 * 如果是引用类型, 则是值的地址的拷贝, 
 * 被拷贝的对象和拷贝的对象都是指向同一个值的地址
 */

// 数据类型拷贝 '=' 赋值符号 
var a = 10
var b = a
b = 30
console.log(a) // 10 
console.log(b) // 30

var obj = { a: a }
var obj1 = obj
var obj2 = obj1
obj1.a = 20
console.log(obj) // { a: 20 }
obj2.a = 30
console.log(obj) // { a: 30 }

// 实现方式 
// for in 循环赋值
function shallowClone(o){
  const obj = {};
  for(let i in o){
      obj[i] = o[i]
  }
  return obj;
}
// 扩展运算符 ...
// Object.assgin()

/* 深拷贝
 * 在浅拷贝的基础上添加递归循环调用, 
 * 达到多层次的拷贝
 */

// 实现方式
// 第一种方式 递归循环
var objTmp = { b: { c: { d: 1}}, a: { e: [1, 2, 3] }}
function checkType(target) {
  return  Object.prototype.toString.call(target).slice(8, -1)
}
function clone(source) {
  var target = checkType(source) === 'Object'? {} : [];
  for(var i in source) {
    if (source.hasOwnProperty(i)) {
      if (typeof source[i] === 'object') {
        var type = checkType(source[i])
        if (type === 'Object') {
          target[i] = clone(source[i]); // 递归
        } else {
          target[i] = source[i];
        }
      } else {
        target[i] = source[i];
      }
    }
  }
  return target;
}
var newObj = clone(objTmp)
console.log(newObj) // { b: { c: { d: 1 } }, a: { e: [ 1, 2, 3 ] } }
/* 这里只考虑了对象和单一类型数组, 还要其他一些引用类型
 * 递归层次太深, 容易爆栈
 *
 */

// 第二种方式 JSON.parse(JSON.stringify(object))
