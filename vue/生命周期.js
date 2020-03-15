/*
 * beforeCreate()
 * 组件实例被创建之初，组件的属性生效之前 ssr渲染时触发
 * 
 * created()
 * 组件实例已经完全创建，属性也绑定，但真实 dom 还没有生成，$el 还不可用 ssr渲染时触发
 * 
 * beforeMount()
 * 在挂载开始之前被调用：相关的 render 函数首次被调用
 * 
 * mounted()
 * el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子
 * 
 * beforeUpdate()
 * 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前
 * 
 * update()
 * 组件数据更新之后
 * 
 * activited()
 * keep-alive 专属，组件被激活时调用
 * 
 * deactivated()
 * keep-alive 专属，组件被销毁时调用
 * 
 * beforeDestory()
 * 组件销毁前调用
 * 
 * destoryed()
 * 组件销毁后调用
 * 
 * 
 */

/*
 * keep-alive组件
 * include - 字符串或正则表达式。只有名称匹配的组件会被缓存。 
 * exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
 * max - 数字。最多可以缓存多少组件实例。
 * 
 * <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
 * 
 */ 