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
