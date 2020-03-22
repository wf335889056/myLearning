// https://es6.ruanyifeng.com/#README

/*
 * let 
 * 块级作用域 所声明的变量，只在let命令所在的代码块内有效。
 * 不存在变量声明
 * 不允许重复声明
 * 
 * const
 * 声明一个只读的常量。一旦声明，常量的值就不能改变。
 * 
 */ 
const o = {
  a: 1,
  b: 2
}
o.c = 3
o.a = 4
console.log(o) 

o = { d: 5 } // Assignment to constant variable.

/*
 * 变量解构
 * 好处
 * 1. 交换变量的值
 * 2. 从函数返回多个值
 * 3. 函数参数的定义
 * 4. 提取 JSON 数据
 * 5. 函数参数的默认值
 * 6. 遍历 Map 结构
 * 7. 输入模块的指定方法
 * 
 */ 

// 对象的解构
const { a, b, ...c } = o

// 数组的解构
const [q, w, e, ...r] = [1, 2, 3, 4, 6]
console.log(r) // [4, 6]

// 字符串的解构
const [z, x, c, ...d] = 'hello'
console.log(d) // 'lo'

/*
 * 对象新增的属性方法
 * Object.is() 
 * 判断两个对象是否相等 / "=="
 * Object.assgi() 
 * 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
 * Object.setPrototypeOf() 
 * 方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
 * Object.getPrototypeOf() 
 * 与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。
 * 
 * for in 可以遍历对象本身的属性以及可枚举的属性
 */
 
 /*
  * 数组新增的属性方法
  * Array.includes()
  * 验证数组是否有某一项, 返回boolean类型
  * Array.map(ele, index, arr)
  * 作用是 map 中传入一个函数，该函数会遍历该数组，对每一个元素做变换之后返回新数组。
  * Array.filter(ele, ndex, arr)
  * 作用是也是生成一个数组，传入的函数返回值确实布尔类型，返回值为 true 的元素放入新数组，通常来筛选删除不需要的元素。
  * Array.reduce(acc, ele, index, arr)
  * 可以将数组中的元素通过回调函数最终转换为一个值。
  * 
  * for of/ forEach 可以直接遍历数组
  * 
  */ 


/*
 * Set => new Set([1,2,3])
 * Set本身是一个构造函数，用来生成 Set 数据结构。
 * 它类似于数组，但是成员的值都是唯一的，没有重复的值。
 * 
 * WeekSet => new WeekSet([1,2,3])
 * WeakSet 结构与 Set 类似，也是不重复的值的集合
 * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 
 * WeakSet 对该对象的引用，也就是说，
 * 如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
 * 
 * 内置方法是挂载在prototype原型对象上面的
 * size, add, delete, has, clear
 * 
 * WeekSet 不可以被遍历
 */ 

/*
 * Map => new Map()
 * 本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。
 * Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。
 * 如果你需要“键值对”的数据结构，Map 比 Object 更合适。
 * 
 * WeekMap => new WeekMap()
 * WeakMap结构与Map结构类似，也是用于生成键值对的集合。
 * WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
 * 它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
 * 因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
 * 也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
 * 
 * 内置方法是挂载在prototype原型对象上面的
 * size, set, get, has, delete, clear
 * 
 * WeekMap 不可以被遍历
 */ 

/*
 * proxy
 * 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
 * 
 */

// target: 传入的对象。
// key: 属性。
// value: 要赋的值。
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  }
});
/*
 * 可以通过get, set来进行控制访问的变量, 好处作用
 * 1. 避免意外的错误发生。
 * 2. 需要记录属性的变化：比如属性值的访问日志记录。
 * 3. 数据绑定：在 vue 中使用的数据的双向绑定。
 * 
 */

/*
 * Generator 生成器
 * 使用生成器函数可以生成一组值的序列，每个值的生成是基于每次请求的，并不同于标准函数立即生成。
 * 调用生成器不会直接执行，而是通过叫做迭代器的对象控制生成器执行。
 * 
 * 可以同for of遍历执行
 */ 

function* WeaponGenerator(){
  yield "1";
  yield "2";
  yield "3";
}

for(let item of WeaponGenerator()){
  console.log(item);
}
/*
 * 使用迭代器控制生成器
 * 1. 通过调用生成器返回一个迭代器对象，用来控制生成器的执行。
 * 2. 调用迭代器的 next 方法向生成器请求一个值。
 * 3. 请求的结果返回一个对象，对象中包含一个value值和 done布尔值，告诉我们生成器是否还会生成值。
 * 4. 如果没有可执行的代码，生成器就会返回一个 undefined 值，表示整个生成器已经完成。
 * 
 */ 
const weapon = WeaponGenerator();
console.log(weapon.next());
console.log(weapon.next());
console.log(weapon.next());
console.log(weapon.next());

/*
 * Generator 内部结构实现
 * 生成器更像是一个状态运动的状态机。
 * 1. 挂起开始状态——创建一个生成器处于未执行状态。
 * 2. 执行状态——生成器的执行状态。
 * 3. 挂起让渡状态——生成器执行遇到第一个 yield 表达式。
 * 4. 完成状态——代码执行到 return 全部代码就会进入全部状态。
 * 
 */

/*
 * Promise
 * 1. 由于 JS 的运行时单线程的，所以当执行耗时的任务时，就会造成 UI 渲染的阻塞。
 * 当前的解决方法是使用回调函数来解决这个问题，当任务执行完毕会，会调用回调方法。
 * 2. 回调函数存在以下几个缺点
 *  不能捕捉异常（错误处理困难）——回调函数的代码和开始任务代码不在同一事件循环中；
 *  回调地域问题（嵌套回调）；
 *  处理并行任务棘手（请求之间互不依赖）；
 * 
 * 原理
 * 1. 通过内置的 Promise 构造函数可以创建一个 Promise 对象，构造函数中传入两个函数参数：resolve，reject。
 * 两个参数的作用是，在函数内手动调用 resolve 的时候，就说明回调成功了；
 * 调用  reject 说明调用失败。通常在 promise 中进行耗时的异步操作，响应是否成功，我们根据判断就可以调用对应的函数。
 * 2. 调用 Promise 对象内置的方法 then，传入两个函数，一个是成功回调的函数，一个失败回调的函数。
 * 当再 promise 内部调用 resolve 函数时，之后就会回调 then 方法里的第一个函数。当调用了 reject 方法时，就会调用then 方法的第二个函数。
 * 3. promise 相当于是一个承诺，当承诺兑现的时候（调用了 resolve 函数），就会调用 then 中的第一个回调函数，
 * 在回调函数中做处理。当承诺出现未知的错误或异常的时候（调用了 reject 函数），就会调用 then 方法的第二个回调函数，提示开发者出现错误。
 * 
 * Promise 的状态
 * 1. 等待状态（pending）
 * 2. 完成状态（resolve）
 * 3. 拒绝状态（reject）
 *
 * Promise 链
 * promise可以实现链式调用，每次then 之后返回的都是一个promise对象，可以紧接着使用 then继续处理接下来的任务，
 * 这样就实现了链式调用。如果在 then 中使用了return，那么 return 的值也会被Promise.resove()包装。
 * 
 * 并行处理任务
 * 使用 Promise.all()方法进行异步请求，将多个请求任务封装数组进行同步请求
 * 返回的结果值会打包成一个数组，可以通过数组的下标获取值对返回的结果进行判断。
 * 只有全部请求成功才会进入成功的方法，否则就会调用 catch 抛出异常。
 * 与 Promise.race()方法不同的是，race方法只要其中一个返回成功，就会调用成功的方法。
 */ 

// 手写低配版promise
const PENDING = "pending";
const RESOLVE = "resolve";
const REJECT = "reject";

// promise 函数
function MyPromise(fn){
    const that = this;           // 回调时用于保存正确的 this 对象
    that.state = PENDING;        // 初始化状态
    that.value = null;           // value 用于保存回调函数(resolve/reject 传递的参数值)
    that.resolvedCallbacks = []; // 用于保存 then 中的回调
    that.rejectedCallbacks = [];

    // resolve 和 reject 函数 
    function resolve(value) {
        if(that.state === PENDING){
            that.state = 'resolve';
            that.value = value;
            that.resolvedCallbacks.map(cb => cb(that.value));
        }
    }

    function reject(value) {
        if (that.state === PENDING) {
            that.state = 'reject'
            that.value = value
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }

    // 实现如何执行 Promise 中传入的函数
    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

// 实现 then 函数
MyPromise.prototype.then = function(onResolved, onRejected) {
    const that = this;
    // 判断两个参数是否为函数类型(如果不是函数，就创建一个函数赋值给对应的参数)
    onResolved = typeof onResolved === 'function' ? onResolved : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r}

    // 判断当前的状态
    if (that.state === 'pending') {
        that.resolvedCallbacks.push(onResolved)
        that.rejectedCallbacks.push(onRejected)
    }
    if (that.state === 'resolve') {
        onResolved(that.value)
    }
    if (that.state === 'reject') {
        onRejected(that.value)
    }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 0)
}).then(value => {
    console.log(value)
})

/*
 * async 及 await
 * async 及 await就是 Generator 以及 Promise 的语法糖，内部的实现原理还是原来的，只不过是在写法上有所改变，
 * 这些实现一些异步任务写起来更像是执行同步任务。
 * 
 * 优点
 * 1. 内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。
 * 也就是说，async 函数的执行，与普通函数一模一样，只要一行。
 * 2. 更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。
 * async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。
 * 3. 更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，
 * 而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
 * 
 * 缺点
 * 因为 await 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 await 会导致性能上的降低。
 * 
 */ 


/*
 * class
 * ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，
 * 新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已 
 * 
 * constructor()
 * 类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，
 * 如果没有显式定义，一个空的constructor方法会被默认添加。
 * 
 * new Class()
 * 使用new命令。前面说过，如果忘记加上new，像函数那样调用Class，将会报错。
 * 
 * 取值函数（getter）和存值函数（setter）
 * 
 * 注意事项
 * 1. 严格模式
 *  类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。
 *  只要你的代码写在类或模块之中，就只有严格模式可用。考虑到未来所有的代码，其实都是运行在模块之中，所以 ES6 实际上把整个语言升级到了严格模式。
 * 2. 不存在提升
 * 3. name 属性
 * 4. Generator 方法
 * 5. this 的指向
 *  类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。
 * 
 */ 

/*
 * export
 * export命令用于规定模块的对外接口
 * 
 * import
 * import命令用于输入其他模块提供的功能。
 */ 