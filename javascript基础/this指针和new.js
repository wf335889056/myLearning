/* this指针
 * 对象变量调用, this指向该对象
 * window全局调用, this指向window对象
 * 通过new关键字创建的对象, this指向新创建的对象 
 * 箭头函数的this指针与声明所在的上下文相同, 没有明确的指向 
 * 
 */

/* 可以通过call, apply, bind来改变this指针
 * call(this, params1, params2) 
 * 执行即调用, 第一个参数需要改变的this对象, 后面以单个参数形式传入
 * apply(this, [params1, params2]) 
 * 执行即调用, 第一个参数需要改变的this对象, 后面以数组参数的形式传入
 * bind(this, params1, params2) 
 * 执行不调用, 第一个参数需要改变的this对象, 后面以参数形式传入
 * 会返回一个函数, 需要手动再次调用来触发
 * 
 */

// 对象调用
var o = {
  a: 1,
  fun: function() {
    this.a++
    console.log(this.a) // 2
  }
}
o.fun()

// window调用
function winFun() {
  console.log(this) // node环境调用指向node window环境调用指向window
}
winFun()

// new关键字调用
a = 555
function Person(n) {
  this.a = 1
  this.b = n
  console.log(a) // 555
  console.log(this.a) // 1
}
var son = new Person()


// 箭头函数
var obj = {
  a: 33,
  c: () => {
    console.log(this.a) // undefined
  },
  d: () => {
    console.log(this) // node环境是{}, window环境是window自身
  }
}
obj.c()
obj.d()

/*
 * 箭头函数和普通函数的区别是什么？
 * 箭头函数
 *  1. this总是代表它的直接调用者。
 *  2. 在默认情况下，没找到直接调用者，this指的是window。
 *  3. 在严格模式下，没有直接调用者的函数中的this是undefined。
 *  4. 使用call,apply,bind绑定，this指的是绑定的对象。
 * 
 * 箭头函数this：
 * 1. 在使用=>定义函数的时候，this的指向是 定义时所在的对象，而不是使用时所在的对象；
 * 2. 不能够用作构造函数，这就是说，不能够使用new命令，否则就会抛出一个错误；
 * 3. 不能够使用 arguments 对象；
 * 4. 不能使用 yield 命令；
 * 
 */ 

/* new关键字
 * new一个对象(Object, Array, Function, Date) 返回一个新的对象 
 * 
 */

// target 传入构造函数
// argus 传入构造函数的参数
function newCreate(target, ...argus) {
  // 声明一个空对象
  var obj = {}
  // 设置空对象__proto__是构造函数的原型对象
  obj.__proto__ = target.prototype
  // 绑定this指针的指向并执行
  var res = target.call(obj, ...argus)
  // var res = target.apply(obj, argus)
  // var res = target.bind(obj, ...argus) -> res()
  // 判断res是不是对象, 如果不是对象则返回设置的obj对象
  return res instanceof Object? res : obj
}

function Fun(name, age) {
  this.name = name
  this.age = age
  console.log(this)
}

var fun = newCreate(Fun, '王', 25)

