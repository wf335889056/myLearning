/*
 * 无状态函数组件
 * 
 */
function a(props) {
  console.log(props)
  return ( <div>无状态函数组件</div> )
}

/*
 * 类组件
 * 有状态组件
 */
class b extends React.component {
  constructor(props) {
    super(props)
  }
  render() {
    return ( <div>类组件</div> )
  }
}

/*
 * hooks组件
 * 
 */
function c(props) {
  const [name, useName] = useState('张三');
  return ( <div>hooks组件</div> )
}

/*
 * 受控组件
 * 受控组件是在 React 中处理输入表单的一种技术。
 * 表单元素通常维护它们自己的状态，而react则在组件的状态属性中维护状态。我们可以将两者结合起来控制输入表单。
 * 这称为受控组件。因此，在受控组件表单中，数据由React组件处理。
 * 
 */

/*
 * 非受控组件
 * 大多数情况下，建议使用受控组件。
 * 有一种称为非受控组件的方法可以通过使用Ref来处理表单数据。
 * 在非受控组件中，Ref用于直接从DOM访问表单值，而不是事件处理程序。
 * 
 */

/*
 * 容器组件
 * 容器组件是处理获取数据、订阅 redux 存储等的组件。它们包含展示组件和其他容器组件，但是里面从来没有html。
 * 
 */

/*
 * 高阶组件(HOC)
 * 高阶组件不是组件，是增强函数，可以输入一个元组件，返回出一个新的增强组件；
 * 高阶组件的主要作用是代码复用，操作状态和参数；
 * 高阶组件是将组件作为参数并生成另一个组件的组件。 Redux connect是高阶组件的示例。 这是一种用于生成可重用组件的强大技术。
 *
 */

/*
 * 属性代理
 * 返回出一个组件，它基于被包裹组件进行 功能增强；
 */

// 默认参数: 可以为组件包裹一层默认参数；
function proxyHoc(Comp) {
	return class extends React.Component {
		render() {
			const newProps = {
				name: 'tayde',
				age: 1,
			}
			return <Comp {...this.props} {...newProps} />
		}
	}
}
// 提取状态: 可以通过 props 将被包裹组件中的 state 依赖外层，例如用于转换受控组件:
function withOnChange(Comp) {
	return class extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				name: '',
			}
		}
		onChangeName = () => {
			this.setState({
				name: 'dongdong',
			})
		}
		render() {
			const newProps = {
				value: this.state.name,
				onChange: this.onChangeName,
			}
			return <Comp {...this.props} {...newProps} />
		}
	}
}
// 包裹组件: 可以为被包裹元素进行一层包装，
function withMask(Comp) {
  return class extends React.Component {
      render() {
		  return (
		      <div>
				  <Comp {...this.props} />
					<div style={{
					  width: '100%',
					  height: '100%',
					  backgroundColor: 'rgba(0, 0, 0, .6)',
				  }} ></div>
        </div>
		  )
	  }
  }
}
// 反向继承 (Inheritance Inversion): 返回出一个组件，继承于被包裹组件，常用于以下操作:
function IIHoc(Comp) {
  return class extends Comp {
      render() {
          return super.render();
      }
  };
}
// 渲染劫持
// 条件渲染: 根据条件，渲染不同的组件, 可以直接修改被包裹组件渲染出的 React 元素树
function withLoading(Comp) {
  return class extends Comp {
      render() {
          if(this.props.isLoading) {
              return <Loading />
          } else {
              return super.render()
          }
      }
  };
}
// 操作状态 (Operate State): 可以直接通过 this.state 获取到被包裹组件的状态，并进行操作。
// 但这样的操作容易使 state 变得难以追踪，不易维护，谨慎使用。

/*
 * 应用场景
 * 
 */

// 权限控制，通过抽象逻辑，统一对页面进行权限判断，按不同的条件进行页面渲染:
function withAdminAuth(WrappedComponent) {
  return class extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        isAdmin: false,
    }
  } 
  async componentWillMount() {
      const currentRole = await getCurrentUserRole();
      this.setState({
          isAdmin: currentRole === 'Admin',
      });
  }
  render() {
      if (this.state.isAdmin) {
          return <Comp {...this.props} />;
      } else {
          return (<div>您没有权限查看该页面，请联系管理员！</div>);
      }
  }
  };
}
// 性能监控，包裹组件的生命周期，进行统一埋点:
function withTiming(Comp) {
  return class extends Comp {
      constructor(props) {
          super(props);
          this.start = Date.now();
          this.end = 0;
      }
      componentDidMount() {
          super.componentDidMount && super.componentDidMount();
          this.end = Date.now();
          console.log(`${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`);
      }
      render() {
          return super.render();
      }
  };
}
// 代码复用，可以将重复的逻辑进行抽象。

/*
 * 使用注意
 *  1. 纯函数: 增强函数应为纯函数，避免侵入修改元组件；
 *  2. 避免用法污染: 理想状态下，应透传元组件的无关参数与事件，尽量保证用法不变；
 *  3. 命名空间: 为 HOC 增加特异性的组件名称，这样能便于开发调试和查找问题；
 *  4. 引用传递: 如果需要传递元组件的 refs 引用，可以使用React.forwardRef；
 *  5. 静态方法: 元组件上的静态方法并无法被自动传出，会导致业务层无法调用；解决:
 *    函数导出, 静态方法赋值
 *  6. 重新渲染: 由于增强函数每次调用是返回一个新组件，因此如果在 Render 中使用增强函数，就会导致每次都重新渲染整个HOC，而且之前的状态会丢失；
 */ 
