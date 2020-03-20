/*
 * Promise 必须为以下三种状态之一：等待态（Pending）、执行态（Fulfilled）和拒绝态（Rejected）。
 * 一旦Promise 被 resolve 或 reject，不能再迁移至其他任何状态（即状态 immutable）。
 * 
 */

/*
 *
 * 基本过程：
 * 1. 初始化 Promise 状态（pending）
 * 2. 执行 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
 * 3. 立即执行 Promise 中传入的 fn 函数，将Promise 内部 resolve、reject 函数作为参数传递给 fn ，按事件机制时机处理
 * 4. Promise里的关键是要保证，then方法传入的参数 onFulfilled 和 onRejected，必须在then方法被调用的那一轮事件循环之后的新执行栈中执行。
 * 5. 真正的链式Promise是指在当前promise达到fulfilled状态后，即开始进行下一个promise.
 *
 */ 

// 例子
new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve({ test: 1 })
      resolve({ test: 2 })
      reject({ test: 2 })
  }, 1000)
}).then((data) => {
  console.log('result1', data)
  // return data
},(data1)=>{
  console.log('result2',data1)
}).then((data) => {
  console.log('result3', data)
})
// result1 { test: 1 }
// result3 undefined

// 有return
// result1 { test: 1 }
// result3 { test: 1 }

/*
 * 结果显示
 * 1. 可进行链式调用，且每次 then 返回了新的 Promise(2次打印结果不一致，如果是同一个实例，打印结果应该一致。
 * 2. 只输出第一次 resolve 的内容，reject 的内容没有输出，即 Promise 是有状态且状态只可以由pending -> fulfilled或 pending-> rejected,是不可逆的。
 * 3. then 中返回了新的 Promise,但是then中注册的回调仍然是属于上一个 Promise 的。
 *
 *
 * 可以在then()链式调用中通过return把上一次的结果数据返回到下一个then中
 * 
 */ 

// 低配版  PromiseA+
function lowPromise(fn){ 
  let state = 'pending';
  let value = null;
  const callbacks = [];

  this.then = function (onFulfilled, onRejected){
      return new lowPromise((resolve, reject)=>{
          handle({ //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
              onFulfilled, 
              resolve,
              onRejected,
              reject
          })
      })
  }

  function handle(callback){
      if(state === 'pending'){
          callbacks.push(callback)
          return;
      }
      
      if(state === 'fulfilled'){
          if(!callback.onFulfilled){
              callback.resolve(value)
              return;
          }
          const ret = callback.onFulfilled(value) //处理回调
          callback.resolve(ret) //处理下一个 promise 的resolve
      }
      if(state === 'rejected'){
        if(!callback.onRejected){
            callback.reject(value)
            return;
        }
        const ret = callback.onRejected(value) //处理回调
        callback.reject(ret) //处理下一个 promise 的resolve
    }
  }
  function resolve(newValue){
      const fn = ()=>{
          if(state !== 'pending')return

          state = 'fulfilled';
          value = newValue
          handelCb()
      }
      
      setTimeout(fn,0) //基于 PromiseA+ 规范
  }
  function reject(error) {
    const fn = ()=>{
      if(state !== 'pending')return

      state = 'rejected';
      value = error
      handelCb()
  }
  
  setTimeout(fn,0) //基于 PromiseA+ 规范
  }

  function handelCb(){
      while(callbacks.length) {
          const fn = callbacks.shift();
          handle(fn);
      };
  }
  
  fn(resolve, reject)
}
/*
 * 这个模型简单易懂，这里最关键的点就是在 then 中新创建的 Promise，
 * 它的状态变为 fulfilled 的节点是在上一个 Promise的回调执行完毕的时候。也就是说当一个 Promise 的状态被 fulfilled 之后，会执行其回调函数，
 * 而回调函数返回的结果会被当作 value，
 * 返回给下一个 Promise(也就是then 中产生的 Promise)，同时下一个 Promise的状态也会被改变(执行 resolve 或 reject)，
 * 然后再去执行其回调,以此类推下去...链式调用的效应就出来了。
 *
 *
 */ 

/*
 * 补充说明
 * 虽然 then 普遍认为是微任务。但是浏览器没办法模拟微任务，目前要么用 setImmediate ，这个也是宏任务，
 * 且不兼容的情况下还是用 setTimeout 打底的。还有，promise 的 polyfill (es6-promise) 里用的也是 setTimeout。
 * 因此这里就直接用 setTimeout,以宏任务来代替微任务了。
 * 
 */

// 完整版
function Promise(fn) {
  // promise存在三种状态 pending(等待), fulfilled(完成), rejected(异常)
  let state = 'pending'
  // 记录每次执行的结果
  let value = null
  // 收集回调函数
  const callbacks = []

  this.then = function (onFulfilled, onRejected) {
    // 返回一个新的promise 传入下一个then中, 下一个then的状态也会被改变
    return new Promise((resolve, reject) => {
      handle({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
    })
  }

  // 捕获异常
  // 实际上，错误也好，异常也罢，最终都是通过reject实现的。也就是说可以通过 then 中的错误回调来处理。所以我们可以增加这样的一个 catch 方法：
  this.catch = function (onError) {
    this.then(null, onError)
  }

  // 在实际应用的时候，我们很容易会碰到这样的场景，不管Promise最后的状态如何，都要执行一些最后的操作。
  // 我们把这些操作放到 finally 中，也就是说 finally 注册的函数是与 Promise 的状态无关的，不依赖 Promise 的执行结果。所以我们可以这样写 finally 的逻辑：
  this.finally = function (onDone) {
    this.then(onDone, onError)
  }

  // 1. 无参数 [直接返回一个resolved状态的 Promise 对象]
  // 2. 普通数据对象 [直接返回一个resolved状态的 Promise 对象]
  // 3. 一个Promise实例 [直接返回当前实例]
  // 4. 一个thenable对象(thenable对象指的是具有then方法的对象) [转为 Promise 对象，并立即执行thenable对象的then方法。]
  this.resolve = function (value) {
    if (value && value instanceof Promise) {
      return value
    } if (value && typeof value === 'object' && typeof value.then === 'function') {
      const { then } = value
      return new Promise((resolve) => {
        then(resolve)
      })
    } if (value) {
      return new Promise(resolve => resolve(value))
    }
    return new Promise(resolve => resolve())
  }

  // Promise.reject与Promise.resolve类似，区别在于Promise.reject始终返回一个状态的rejected的Promise实例，
  // 而Promise.resolve的参数如果是一个Promise实例的话，返回的是参数对应的Promise实例，所以状态不一 定。
  this.reject = function (value) {
    return new Promise(((resolve, reject) => {
      reject(value)
    }))
  }

  // 入参是一个 Promise 的实例数组，然后注册一个 then 方法，然后是数组中的 Promise 实例的状态都转为 fulfilled 之后则执行 then 方法。
  // 这里主要就是一个计数逻辑，每当一个 Promise 的状态变为 fulfilled 之后就保存该实例返回的数据，
  // 然后将计数减一，当计数器变为 0 时，代表数组中所有 Promise 实例都执行完毕。
  this.all = function (arr) {
    const args = Array.prototype.slice.call(arr)
    return new Promise(((resolve, reject) => {
      if (args.length === 0) return resolve([])
      let remaining = args.length

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            const { then } = val
            if (typeof then === 'function') {
              then.call(val, (val) => {
                res(i, val)
              }, reject)
              return
            }
          }
          args[i] = val
          if (--remaining === 0) {
            resolve(args)
          }
        } catch (ex) {
          reject(ex)
        }
      }
      for (let i = 0; i < args.length; i++) {
        res(i, args[i])
      }
    }))
  }

  // 有了 Promise.all 的理解，Promise.race 理解起来就更容易了。
  // 它的入参也是一个 Promise 实例数组，然后其 then 注册的回调方法是数组中的某一个 Promise 的状态变为 fulfilled 的时候就执行。
  // 因为 Promise 的状态只能改变一次，那么我们只需要把 Promise.race 中产生的 Promise 对象的 resolve 方法，
  // 注入到数组中的每一个 Promise 实例中的回调函数中即可。
  this.race = function (values) {
    return new Promise(((resolve, reject) => {
      for (let i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject)
      }
    }))
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }

    const cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected
    const next = state === 'fulfilled' ? callback.resolve : callback.reject

    if (!cb) {
      next(value)
      return
    }
    // 异常通常是指在执行成功/失败回调时代码出错产生的错误，对于这类异常，我们使用 try-catch 来捕获错误，并将 Promise 设为 rejected 状态即可。
    try {
      const ret = cb(value)
      next(ret)
    } catch (e) {
      callback.reject(e)
    }
  }
  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') return

      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        const { then } = newValue
        if (typeof then === 'function') {
          // newValue 为新产生的 Promise,此时resolve为上个 promise 的resolve
          // 相当于调用了新产生 Promise 的then方法，注入了上个 promise 的resolve 为其回调
          then.call(newValue, resolve, reject)
          return
        }
      }
      state = 'fulfilled'
      value = newValue
      handelCb()
    }

    setTimeout(fn, 0)
  }
  function reject(error) {
    const fn = () => {
      if (state !== 'pending') return

      if (error && (typeof error === 'object' || typeof error === 'function')) {
        const { then } = error
        if (typeof then === 'function') {
          then.call(error, resolve, reject)
          return
        }
      }
      state = 'rejected'
      value = error
      handelCb()
    }
    setTimeout(fn, 0)
  }
  function handelCb() {
    while (callbacks.length) {
      const fn = callbacks.shift()
      handle(fn)
    }
  }
  fn(resolve, reject)
}