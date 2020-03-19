/*
 * 组件通信
 *
 * props / $emit 适用 父子组件通信
 *
 * ref 与 $parent / $children 适用 父子组件通信
 * 
 * EventBus （$emit / $on） 适用于 父子、隔代、兄弟组件通信
 * 
 * $attrs/$listeners 适用于 隔代组件通信
 * 
 * provide / inject 适用于 隔代组件通信
 * 
 * Vuex 适用于 父子、隔代、兄弟组件通信
 * 
 */ 

/*
 * data是对象和函数返回对象的区别
 * 
 * 因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，
 * 子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，
 * 那么每个实例可以维护一份被返回对象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；
 * 而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题。
 * 
 */

 
/*
 * Vue 应用运行时性能优化措施
 *  引入生产环境的 Vue 文件
 *  使用单文件组件预编译模板
 *  提取组件的 CSS 到单独到文件
 *  利用Object.freeze()提升性能
 *  扁平化 Store 数据结构
 *  合理使用持久化 Store 数据
 *  组件懒加载
 * 
 * Vue 应用加载性能优化措施
 *  服务端渲染 / 预渲染
 *  组件懒加载
 * 
 */ 


/*
 * render()函数
 *  createElement()
 * 
 * 
 * 
 */  
