/*
 * 数据双向绑定
 *
 *  1. 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。
 *  这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
 *  2. 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，
 *  并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
 *  3. 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，
 *  主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
 *  4. 实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。
 * 
 */

//  Object.defineProperty()
function MyVue(options = {}) {        // 将所有的属性挂载到$options身上
  this.$options = options;        // 获取到data数据（Model）
  var data = this._data = this.$options.data;        // 劫持数据
  observe(data)
}
// 给需要观察的对象都添加 Object.defineProperty 的监听
function Observe(data) {        
  for (let key in data) {                
    let val = data[key];                
    // 递归 =》来实现深层的数据监听
    observe(val)                
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      // get和set不能writable和value共存
      // writable: true, 
      // value: '',
      get() {                                
        return val
      },
      set(newval) { 
       if (val === newval) { //设置的值是否和以前是一样的，如果是就什么都不做
         return
       }
       val = newval // 这里要把新设置的值也在添加一次数据劫持来实现深度响应,
         observe(newval);
      }
     })
   }
 }
 function observe(data) {    // 这里做一下数据类型的判断，只有引用数据类型才去做数据劫持
     if (typeof data != 'object') return
     return new Observe(data)
 }

 // proxy
 var proxyObj = new Proxy({}, {
  get: function(obj, prop) {
    console.log('设置 get 操作')
    return obj[prop];
  },
  set: function(obj, prop, value) {
    console.log('设置 set 操作')
    obj[prop] = value;
  }
});
proxyObj.name = '张三' // '设置 set 操作'
console.log(proxyObj.name) // '设置 get 操作' 张三

 /*
  * Proxy 的优势如下:
  *  可以直接监听对象而非属性；
  *  可以直接监听数组的变化；
  *  有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
  *  返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
  *  作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
  * 
  * 
  * Object.defineProperty 的优势如下:
  * 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平
  * 
  */ 