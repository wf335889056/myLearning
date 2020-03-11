/*
  * 基本数据类型 string number boolean null undefined symbol bigInt
  * 基本类型自动分配在栈中, 会被内存自动清除
  * 引用类型 Object Array Date Function
  * 引用类型动态分配在堆中, 不一定会被自动清除, 需要手动设置null来清除
  * 
  */

 /*
  * 断数据类型
  * 可以通过typeof, Object.prototype.toString.call(), instanceof
  * typeof 通常用于验证基本数据类型
  * Object.prototype.toString.call() 通常用于验证引用类似
  * instanceof 等价于 A.__proto__ = B.constrict.prototype
  *    
  */ 


console.log(typeof '这是一段字符串' === 'string') // true
console.log(typeof 123 === 'number')  // true
console.log(typeof false === 'boolean')  // true

var obj = { a: 1, b: 2, c: [1,2,3] }
console.log(Object.prototype.toString.call(obj) === '[object Object]') // true
var arr = [1,2,3]
console.log(Object.prototype.toString.call(arr) === '[object Array]') // true
var fun = function() {}
console.log(Object.prototype.toString.call(fun) === '[object Function]') // true


// 
var a = { n: 1 }
var b = a
a.x = a = { n: 2 }
console.log(a) // { n: 2 }
console.log(b) // { n: 1, x: { n:2 } }
console.log(a.x) // undefined