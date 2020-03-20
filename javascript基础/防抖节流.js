/*
 * 防抖
 * 防抖 (debounce): 将多次高频操作优化为只在最后一次执行，
 * 通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * 
 */ 

// 低配版
function debounce1(fn) {
  var timer = null;
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(this, ...arguments)
    }, 1000)
  }
}
// 高配版 
function debounce2(fn, await, immediate = false) {
  var timer = null;
  return function() {
    var _this = this
    // immediate为ture, timer为null的话, 则立即先执行
    if (immediate && !timer) {
      fn.apply(_this, ...arguments)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(_this, ...arguments)
    }, await)
  }
}


/*
 * 节流
 * 节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，
 * 通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 * 
 */

// 低配版
function throttle1(fn) {
  var timer = null
  return function() {
    if (timer) return
    timer = setTimeout(function() {
      fn.apply(this, ...arguments)
      timer = null
    }, 1000)
  }
}
// 高配版
function throttle2(fn, await, immediate = false) {
  var timer = null
  // 闭包记录immediate的值
  var flag = immediate 
  return function() {
    var _this = this
    // flag为ture, timer为null的话, 则立即先执行
    if (flag && !timer) {
      fn.apply(this, ...arguments)
      flag = false
    }
    if (!timer) {
      timer = setTimeout(function() {
        fn.apply(this, ...arguments)
        timer = null
      }, await)
    }
  }
}
