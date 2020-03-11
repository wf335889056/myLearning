/*
 * 外部函数嵌套内部函数, 内部函数可以访问内部变量的函数
 * 函数执行, 形成一个私有的作用域, 保护里边的私有变量不受外界的 * 干扰, 除了保护私有变量外, 还可以保存一个内部变量的值
 *
 */

/*
 * 保护
 * 团队开发中, 把自己的变量包装在一个函数内, 形成块级作用域, 在
 * 内部使用, 防止别人的变量的重命名, 导致变量数据的不易确定性
 * 如果想把方法或者变量提供给别人, 可通过return和window.xxx
 * 的形式暴露给别人使用
 * 
 */ 

/* 保存
 * 在执行异步操作时(setTimeout, onclick事件绑定), 而for在js中是* 同步任务早已经结束了, i的是len
 * 可通过闭包传入的形式解决, 或者var改成let
 */

var len = [1,2,3,4].length
for (var i = 0; i < len; i++) {
  setTimeout(() => {
    console.log(i) // 4 4 4 4
  }, 0)
} 
// 第一种 用函数只执行传参的形式
for (var i = 0; i < len; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i) // 0 1 2 3
    }, 0)
  })(i)
}
// 第二种 全局变量声明var改成局部变量声明let
for (let i = 0; i < len; i++) {
  setTimeout(() => {
    console.log(i) // 0 1 2 3
  }, 0)
} 
// 第三种 利用setTimeout的第三个参数的形式入参
for (var i = 0; i < len; i++) {
  setTimeout((i) => {
    console.log(i) // 0 1 2 3
  }, 0, i)
} 