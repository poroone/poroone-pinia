import { ref, computed } from 'vue'
// import { defineStore } from 'pinia'
import defineStore from '../plugin/defienStore'
// setup模式

// difineStore创建我们的pinia 第一个参数是一个id 第二个参数是setup(函数)模式或者是options(对象)模式
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  // ref reactive computed functions
  return { count, doubleCount, increment }
})


// options
export const useOptionsStore = defineStore("options", {
  // data reactive
  state: () => {
    return {
      count: 0
    }
  },
  // 计算属性computed
  getters: {
    doubleCount() {
      return this.count * 2
    }
  },
  // 处理this指向 xxxxx.call(state)
  actions: {
    increment() {
      this.count++
    }
  }
})