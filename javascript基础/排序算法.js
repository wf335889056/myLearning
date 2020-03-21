var arrsOrgin = [0,2,34,10,2,1,9,11,100,20]

// Array.sort排序
function arraySort(arr) {
  // 通过深拷贝保证每一次使用引用类型数据都是新的地址
  var arr = JSON.parse(JSON.stringify(arr))
  // 保证是数组类型
  if (!Array.isArray(arr)) return
  return arr.sort((a,b) => a - b)
}
console.log(arraySort(arrsOrgin))

// 冒泡排序
// 第一次循环，开始比较当前元素与下一个元素的大小，如果比下一个元素小或者相等，则不需要交换两个元素的值；若比下一个元素大的话，则交换两个元素的值。然后，遍历整个数组，第一次遍历完之后，相同操作遍历第二遍。
function bubbleSort(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  // 通过双循环遍历,每一项依次从左到右比较,满足条件交换位置
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
      }
    }
  }
  return arr
}
console.log(bubbleSort(arrsOrgin))
// 时间复杂度：平均时间复杂度是O(n^2)
// 空间复杂度：由于辅助空间为常数，所以空间复杂度是O(1);

// 升级版冒泡排序 时间复杂度降到O(n)
function improveBubble(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var len = arr.length
  // 数组从右往左遍历, 最后次交换的数是这一次排序中最大的数, 之后的数都比他大
  for (var i = len - 1; i >= 0; i--) {
    // 初始化位置
    var pos = 0
    for (var j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        var tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
        // 记录最后一次交换的位置
        pos = j + 1
      }
    }
    // 
    len = pos + 1
  }
  return arr
}
console.log(improveBubble(arrsOrgin))

// 选择排序
// 第一遍，从数组中选出最小的，与第一个元素进行交换；第二遍，从第二个元素开始，找出最小的，与第二个元素进行交换；依次循环，完成排序
function selectionSort(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  for (var i = 0; i < arr.length - 1; i++) {
    var index = i
    for (var j = 0; j < arr.length; j++) {
      if (arr[index] > arr[j]) {
        index = j
      }
    }
    var tmp = arr[i]
    arr[i] = arr[index]
    arr[index] = tmp
  }
  return arr
}
console.log(selectionSort(arrsOrgin))
// 时间复杂度：平均时间复杂度是O(n^2)，这是一个不稳定的算法，因为每次交换之后，它都改变了后续数组的顺序。
// 空间复杂度：辅助空间是常数，空间复杂度为O(1);
// 出现重复的数字, 排序不准确

// 插入排序
// 首先，循环原数组，然后，将当前位置的元素，插入到之前已排序好的数组中，依次操作。
function insertSort(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i]
    for (var j = 0; j < i; j++) {
      if (temp < arr[j] && j == 0) {
        arr.splice(i, 1)
        arr.unshift(temp)
        break
      }
      if (temp > arr[j] && temp < arr[j + 1] && j < i - 1) {
        arr.splice(i, 1)
        arr.splice(j + 1, 0, temp)
        break
      }
    }
  }
  return arr
}
console.log(insertSort(arrsOrgin))
// 时间复杂度：平均算法复杂度为O(n^2)
// 空间复杂度：辅助空间为常数，空间复杂度是O(1)
// 出现重复的数字, 排序不准确

// 快速排序
// 首先，我们需要找到一个基数，然后将比基数小的值放在基数的左边，将比基数大的值放在基数的右边，之后进行递归那两组已经归类好的数组。
function quickSort(arr) {
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  if(arr.length <= 1){
    return arr;
  }
  var temp = arr[0];
  var left = [];
  var right = [];
  for(var i = 1; i < arr.length; i++){
    if (arr[i] > temp){
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat([temp], quickSort(right));
}
console.log(quickSort(arrsOrgin))
// 时间复杂度：平均时间复杂度O(nlogn)，只有在特殊情况下会是O(n^2)，不过这种情况非常少
// 空间复杂度：辅助空间是logn，所以空间复杂度为O(logn)

// 归并排序
// 首先，将相邻的两个数进行排序，形成n/2对，然后在每两对进行合并，不断重复，直至排序完。
function mergeSort(arr){
  var arr = JSON.parse(JSON.stringify(arr))
  if (!Array.isArray(arr)) return
  var len = arr.length;
  for (var seg = 1; seg < len; seg += seg) {
    var arrB = [];
    for (var start = 0; start < len; start += 2*seg) {
      var row = start, mid = Math.min(start+seg, len), heig = Math.min(start + 2*seg, len);
      var start1 = start, end1 = mid;
      var start2 = mid, end2 = heig;
      while(start1 < end1 && start2 < end2){
        arr[start1] < arr[start2] ? arrB.push(arr[start1++]) : arrB.push(arr[start2++]);
      }
      while(start1 < end1){
        arrB.push(arr[start1++]);
      }
      while(start2 < end2){
        arrB.push(arr[start2++]);
      }
    }
    arr = arrB;
  }
  return arr
}
console.log(mergeSort(arrsOrgin))
// 时间复杂度：平均时间复杂度是O(nlogn)
// 空间复杂度：辅助空间为n，空间复杂度为O(n)

// 基数排序
// 首先，比较个位的数字大小，将数组的顺序变成按个位依次递增的，之后再比较十位，再比较百位的，直至最后一位。
function radixSort(arr){
  let maxNum = Math.max(...arr);
  let dis = 0;
  const len = arr.length;
  const count = new Array(10);
  const tmp = new Array(len);
  while(maxNum >=1){
    maxNum /= 10;
    dis++;
  }
  for(let i = 1, radix = 1; i <= dis; i++){
    for(let j = 0; j < 10; j++){
      count[j] = 0;
    }
    for(let j = 0; j < len; j++){
      let k = parseInt(arr[j] / radix) % 10;
      count[k]++;
    }
    for(let j = 1; j < 10; j++){
      count[j] += count[j - 1];
    }
    for(let j = len - 1; j >= 0 ; j--){
      let k = parseInt(arr[j] / radix) % 10;
      tmp[count[k] - 1] = arr[j];
      count[k]--;
    }
    for(let j = 0; j < len; j++){
      arr[j] = tmp[j]; 
    }
    radix *= 10;
  }
  return arr;
}

console.log(radixSort(arrsOrgin));
// 时间复杂度：平均时间复杂度O(k*n)，最坏的情况是O(n^2)