/*
 * 组件传值数据流向
 * 单向数据流动, 通过props传入
 * 
 * 
 * props和state的区别
 * props是只读属性, 从外部组件传入
 * state是组件内部状态的值
 * class a extends React.component {
 *  constructor(props) {
 *    super(props) props可以通过this访问
 *    this.state = this.props
 *  }
 * }
 */

/*
 * setState
 * 1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
 * 2. setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，
 *    只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，
 *    形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
 * 3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，
 * 在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， 
 * setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
 * 
 */ 