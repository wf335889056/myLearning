/*
 * redux工作原理
 * Redux 是一个 数据管理中心，可以把它理解为一个全局的 data store 实例。
 * 它通过一定的使用规则和限制，保证着数据的健壮性、可追溯和可预测性
 * 在React中，组件连接到 redux ，如果要访问 redux，需要派出一个包含 id和负载(payload) 的 action。action 中的 payload 是可选的，
 * action 将其转发给 Reducer。
 * 当reducer收到action时，通过 swithc...case 语法比较 action 中type。 匹配时，更新对应的内容返回新的 state。
 * 当Redux状态更改时，连接到Redux的组件将接收新的状态作为props。当组件接收到这些props时，它将进入更新阶段并重新渲染 UI。
 * 
 * 核心理念
 * 单一数据源: 整个应用只有唯一的状态树，也就是所有 state 最终维护在一个根级 Store 中
 * 状态只读: 为了保证状态的可控性，最好的方式就是监控状态的变化。那这里就两个必要条件
 *  Redux Store 中的数据无法被直接修改
 *  严格控制修改的执行
 * 纯函数: 规定只能通过一个纯函数 (Reducer) 来描述修改；
 * 
 */

/*
 * redux进阶
 * React-Redux: 结合 React 使用；
 *  <Provider>: 将 store 通过 context 传入组件中；
 *  connect(mapStateToProps, mapDispatchToProps)(Com): 一个高阶组件，可以方便在 React 组件中使用 Redux
 *   1. 将store通过mapStateToProps进行筛选后使用props注入组件
 *   2. 根据mapDispatchToProps创建方法，当组件调用时使用dispatch触发对应的action
 * Reducer 的拆分与重构:
 *  随着项目越大，如果将所有状态的 reducer 全部写在一个函数中，将会 难以维护；
 *  可以将 reducer 进行拆分，也就是 函数分解，最终再使用combineReducers()进行重构合并
 * 异步 Action: 
 *  Action: 由于 Reducer 是一个严格的纯函数，因此无法在 Reducer 中进行数据的请求，需要先获取数据，
 * 再dispatch(Action)即可，下面是三种不同的异步实现:
 * redux-thunk, redux-saga
 */ 

/*
 * createStore(reducer, [preloadedState], enhancer)
 * 创建一个 Redux store 来以存放应用中所有的 state。
 * 参数1 reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
 * 参数2 [preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，
 * 或者从之前保存的用户会话中恢复一个传给它。
 * 如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。
 * 否则，你可以自由传入任何 reducer 可理解的内容。
 * enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。
 * 这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
 * 
 * store
 * Store 就是用来维持应用所有的 state 树 的一个对象。 改变 store 内 state 的惟一途径是对它 dispatch 一个 action。
 * 
 * combineReducers(reducers)
 * 随着应用变得越来越复杂，可以考虑将 reducer 函数 拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。
 * combineReducers 辅助函数的作用是，把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，
 * 然后就可以对这个 reducer 调用 createStore 方法。
 * 合并后的 reducer 可以调用各个子 reducer，并把它们返回的结果合并成一个 state 对象。 
 * 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名。
 * 
 * applyMiddleware(...middleware)
 * 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
 * Middleware 可以让你包装 store 的 dispatch 方法来达到你想要的目的。
 * 同时， middleware 还拥有“可组合”这一关键特性。多个 middleware 可以被组合到一起使用，形成 middleware 链。
 * 其中，每个 middleware 都不需要关心链中它前后的 middleware 的任何信息。
 * 
 * bindActionCreators(actionCreators, dispatch)
 * 
 * 
 * compose(...functions)
 * 从右到左来组合多个函数。
 * 这是函数式编程中的方法，为了方便，被放到了 Redux 里。
 * 当需要把多个 store 增强器 依次执行的时候，需要用到它。
 * 
 */