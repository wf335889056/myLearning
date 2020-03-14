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