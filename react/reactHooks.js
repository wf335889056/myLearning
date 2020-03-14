/*
 * Hooks 让我们在函数组件中可以使用state 和其他功能。
 * 基本规则:
 *  Hooks 应该在外层使用，不应该在循环，条件或嵌套函数中使用
 *  Hooks 应该只在函数组件中使用。
 * 
 * 好处:
 * 1、跨组件复用: 其实 render props / HOC 也是为了复用，相比于它们，Hooks 作为官方的底层 API，最为轻量，
 * 而且改造成本小，不会影响原来的组件层次结构和传说中的嵌套地狱；
 * 2、类定义更为复杂:
 *  不同的生命周期会使逻辑变得分散且混乱，不易维护和管理；
 *  时刻需要关注this的指向问题；
 *  代码复用代价高，高阶组件的使用经常会使整个组件树变得臃肿；
 * 3、状态与UI隔离: 正是由于 Hooks 的特性，状态逻辑会变成更小的粒度，并且极容易被抽象成一个自定义 Hooks，
 * 组件中的状态和 UI 变得更为清晰和隔离。
 * 
 * 注意:
 * 避免在 循环/条件判断/嵌套函数 中调用 hooks，保证调用顺序的稳定；
 * 只有 函数定义组件 和 hooks 可以调用 hooks，避免在 类组件 或者 普通函数 中调用；
 * 不能在useEffect中使用useState，React 会报错提示；
 * 类组件不会被替换或废弃，不需要强制改造类组件，两种方式能并存；
 * 
 * 我们可以使用一些钩子，例如useState，useEffect，useContext，useReducer等。
 */

/*
 * 状态钩子
 * useState()
 * 用于定义组件的 State，其到类定义中this.state的功能；
 * 
 */
function aCom() {
  const [a, seta] = useState(123)
  return ( <div>{a}</div> )
}

/*
 * 生命周期钩子
 * useEffect()
 * 类定义中有许多生命周期函数,
 * useEffect结合了componentDidMount、componentDidUpdate和componentWillUnmount
 * useEffect(callback, [source])接受两个参数
 * callback: 钩子回调函数；
 * source: 设置触发条件，仅当 source 发生改变时才会触发；
 * useEffect钩子在没有传入[source]参数时，默认在每次 render 时都会优先调用上次保存的回调中返回的函数，后再重新调用回调；
 * 
 */
function bCom() {
  const [b, setb] = useState(123)
  useEffect(() => {
    setb(456)
    return () => {
      setb(0)
    }
  }, [b])
  return ( <div>{b}</div> )
}

/*
 * useContext: 获取 context 对象
 * useReducer: 类似于 Redux 思想的实现，但其并不足以替代 Redux，可以理解成一个组件内部的 redux:
 *  并不是持久化存储，会随着组件被销毁而销毁；
 *  属于组件内部，各个组件是相互隔离的，单纯用它并无法共享数据；
 *  配合useContext的全局性，可以完成一个轻量级的 Redux；(easy-peasy)
 * useCallback: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；
 * useMemo: 用于缓存传入的 props，避免依赖的组件每次都重新渲染；
 * useRef: 获取组件的真实节点；
 * useLayoutEffect:
 *  DOM更新同步钩子。用法与useEffect类似，只是区别于执行时间点的不同。
 *  useEffect属于异步执行，并不会等待 DOM 真正渲染后执行，而useLayoutEffect则会真正渲染后才触发；
 *  可以获取更新后的 state；
 * 
 * 自定义钩子(useXxxxx): 基于 Hooks 可以引用其它 Hooks 这个特性，我们可以编写自定义钩子
 * 
 * 
 */ 