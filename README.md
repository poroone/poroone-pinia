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
