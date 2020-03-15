/*
 * react-router
 * react本身并不支持路由管理
 * 基于React Router的web应用，根组件应该是一个router组件（BrowserRouter，HashRouter）。 
 * 项目中，react-router-dom提供了和两种路由。两种路由都会创建一个history对象。
 * 如果我们的应用有服务器响应web的请求，我们通常使用<BrowserRouter>组件; 如果使用静态文件服务器，则我们应该使用<HashRouter>组件
 * 
 * 基本组件 react-router-dom
 * router组件（BrowserRouter历史路由，HashRouter哈希路由）路由器
 * route matching 组件（Route路由匹配，Switch组合路由）
 * navigation 组件（Link创建链接路由, NavLink突然当前活动的链接路由）
 * Redirect 用于强制路由重定向
 * 
 */

import React from 'react'
// import react router DOM elements
import { Switch, Route, Redirect } from 'react-router-dom'
import ComponentA from '../common/compa'
import ComponentB from '../common/compb'
import ComponentC from '../common/compc'
import ComponentD from '../common/compd'
import ComponentE from '../common/compe'

/*
 * path 路径
 * exact
 *  
 */ 
const Layout = ({ match }) => {
    return(
        <div className="">
            <Switch>
                <Route exact path={`${match.path}/gotoA`} component={ComponentA} />
                <Route path={`${match.path}/gotoB`} component={ComponentB} />
                <Route path={`${match.path}/gotoC`} component={ComponentC} />
                <Route path={`${match.path}/gotoD`} component={ComponentD} />
                <Route path={`${match.path}/gotoE`} component={ComponentE} />
            </Switch>
        </div>
    )}

export default Layout 