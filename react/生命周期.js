/*
 * componentWillMount()
 * 在渲染前调用, 只触发一次
 * 官方不推荐使用
 * 
 * componentDidMount()
 * 组件第一次渲染结束, 可操作DOM节点,  可做一些异步操作(监听, 异步请求处理)
 *
 * componentWillReceiveProps()
 * 组件收到新的props, 还没触发render()函数, 
 * 官方不推荐使用
 * 
 * shouldComponentUpdate(props)
 * 返回一个布尔值, 可以控制组件是否需要更新, 
 * 
 * componentWillUpdate()
 * 组件将接受新的props和state, 页面还没重新渲染
 * 官方不推荐使用
 * 
 * componentDidUpdate()
 * 组件更新完成
 * 
 * componentWillUnMount()
 * 组件将被卸载, 可以做做些异步监听去除
 * 
 * getDerivedStateFromProps(nextProps, prevState)
 * 可以根据props来设置state
 * 
 * getSnapshotBeforeUpdate(prevProps, prevState)
 * 可以在更新之前获取最新的渲染数据，它的调用是在 render 之后， update 之前；
 * 
 * componentDidCatch(error, info)
 * 捕获异常
 */