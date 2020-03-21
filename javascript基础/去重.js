var arrs = [0, 1, 2, 3, 'a', 'f',2, 5, 10, 100, 3, 2, 50, 20, 30, 'a', 'f']

// es6 Set去重 
function uniqueSet(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var arr = new Set(arr)
  return arr
}
console.log(uniqueSet)

// 根据下标去重
function uniqueSubscript(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var res = []
  for (var i = 0; i < arr.length; i++) {
    if(res.indexOf(arr[i]) == -1) {
      res.push(arr[i])
    }
  }
  return res
}
console.log(uniqueSubscript(arrs))

// 双循环去重(常规做法) 效率低
function uniqueDoubleFor(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var res = [arr[0]] 
  //这里构建一个res数组 且存放了第一个值 以便下面对比
  for (var i= 1; i< arr.length; i++) {  
    var isrepeat = false
    for (var j= 0; j< res.length; j++) {  
      //循环两个数组做对比
      if(arr[i] == res[j]) {
        isrepeat = true 
        break      
        //这里判断下循环arr时候 跟res对比 相等就跳出 且给出标记 当前arr数组第几个是出现重复的
      }
    }
    if (!isrepeat) {
      res.push(arr[i])  //这里 true标记的都是重复的 false都是可以添加的
    }
  }
  return newarr //完事返回
}
console.log(uniqueDoubleFor(arrs))

// 先排序后去重
function uniqueSort(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  arr = arr.sort()
  var res = [arr[0]]
  for (var i= 1; i < arr.length; i++) {
    // 判断 因为都是挨着的 只要判断原数组元素跟新数组最后一个元素比较就可以
    if (arr[i] !== res[res.length-1]) { 
      res.push(arr[i])
    }}
  return res
}
console.log(uniqueSort(arrs))

// 对象属性去重(推荐使用) 效率最高
function uniqueObject(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var obj = {}
  var res = []
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = true
      res.push(arr[i])
    }
  }
  return res
}
console.log(uniqueObject(arrs))
// 这样对象属性做法 将数组arr 元素跟obj对象对比 
// 看看对象里面这个属性 不存在就添加到newarr 并将当前数组的这个属性设置一个值表示对象中有了这个值
// 这样循环完就将 对象中有的属性抛去 剩下去重后的元素