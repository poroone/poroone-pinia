### 一个需求
vue3的相适应是的东西 停止响应 computed watch watchEffect 停止响应

vue2 Object.freeze 停止 对象冻结
vue3 computed watch watchEffect 通过effectScope effect来进行停止响应

pinia dispose

### effectScop是个函数
- 调用之后返回scope提供两个方法  支持一个参数 true false
- run 创建一个响应式的作用域
- stop  停止响应  stop会把 run中的响应式全部停止响应 停止   `computed` `watch` `watchEffect`
- 支持作用域嵌套
- 子作用域不想受父级的影响 `effectScope(true)` true代表他是一个独立作用域 不受父级影响
- 支持返回值

### pinia 
- 状态管理 的一个库
- 设计者模式 单例模式  应为多有的组件共享一个值 ,来源就是一个对象 pinia vuex redux
- 支持两种风格 options API setup模式写法
- 创建一个pinia的实例

- pinia 实例
- state {"counter":{count:1},"options":{xxx}}  //state 中只会存储 ref reactive 不存computed
- install
- _s  Map => {'counter'=>proxy({counter,dubleCount,increment}),"options":proxy({})} 

任何一个页面SFC单文件组件使用pinia的时候去访问同一个对象 

### api
  reset 清空
  dispose 停止
  subscribe 侦听state变化
### createPinia
  install vueuse默认执行必须写
  createPinia 抛出给vue用的pinia实例
### defienStore 
  createApi 一些附加的api
  defienStore 用于创建pinia 参数是id 和option | setup函数
  createSetupPinia 
  compileSetup  用来处理setup函数模式
  createOptionsPinia
  compileOptions 用来处理options模式
### format  设计了一些功能
  isFunction 判断是不是一个function
  isComputed 判断是不是一个computed 
### type 一些类型
  __pinia__ 定义了一个symbol防止重复
  Pinia 定义了pinia的类型 install state scope store 
  SetupFunction  setup函数模式
  options   options模式 state actions getters