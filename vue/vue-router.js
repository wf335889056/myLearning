/*
 * vue-router是什么
 *  vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。
 *  vue的单页面应用是基于路由和组件的，路由用于设定访问路 径，并将路径和组件映射起来。
 *  传统的页面应用，是用一些超链接来实现页面切换和跳转的。
 *  在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系。
 * 
 * 路由方式
 *  Hash模式
 *  History模式
 * 
 * 路由跳转
 *  直接修改地址栏
 *  this.$router.push(‘路由地址’)
 *  <router-link to="路由地址"></router-link>
 * 
 * vue-router参数传递
 *  用name传递参数
 *  通过<router-link> 标签中的to传参
 *  利用url传递参数----在配置文件里以冒号的形式设置参数 (params传参)
 *  使用path来匹配路由，然后通过query来传递参数 (query传参)
 * 
 * 
 */ 