/*
 * diff算法比较
 * react 忽略跨层级移动比较
 * 
 * tree diff
 * React的做法是把dom tree分层级，对于两个dom tree只比较同一层次的节点，忽略Dom中节点跨层级移动操作，只对同一个父节点下的所有的子节点进行比 
 * 较。如果对比发现该父节点不存在则直接删除该节点下所有子节点，不会做进一步比较，这样只需要对dom tree进行一次遍历就完成了两个tree的比较。
 * 优化建议
 * 保证稳定dom结构有利于提升性能，不建议频繁真正的移除或者添加节点
 * 
 * component diff
 * 1. 同一类型组件遵从tree diff比较v-dom树
 * 2. 不通类型组件，先将该组件归类为dirty component，替换下整个组件下的所有子节点
 * 3. 同一类型组件Virtual Dom没有变化，React允许开发者使用shouldComponentUpdate（）来判断该组件是否进行diff，
 * 运用得当可以节省diff计算时间，提升性能
 * 优化建议
 * 对于同一类型组件合理使用shouldComponentUpdate（），应该避免结构相同类型不同的组件
 * 
 * element diff
 * 1. INSERT_MARKUP 插入节点：对全新节点执行节点插入操作
 * 2. MOVE_EXISING 移动节点：组件新集合中有组件旧集合中的类型，且element可更新，即组件调用了receiveComponent，
 * 这时可以复用之前的dom，执行dom移动操作
 * 3. REMOVE_NODE 移除节点：此时有两种情况：组件新集合中有组件旧集合中的类型，
 * 但对应的element不可更新、旧组建不在新集合里面，这两种情况需要执行节点删除操作
 * 
 */

 /*
  * key
  * 唯一性, 减少diff的计算, 优化性能
  * 优化建议
  * 在开发过程中，同层级的节点添加唯一key值可以极大提升性能，尽量减少将最后一个节点移动到列表首部的操作，
  * 当节点达到一定的数量以后或者操作过于频繁，在一定程度上会影响React的渲染性能。比如大量节点拖拽排序的问题。
  * 
  */