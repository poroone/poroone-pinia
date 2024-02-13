<template>
  <div>我是setup函数模式</div>
  <div>{{ counter.count }}</div>
  <button @click="counter.increment">++</button>
  <HomeView></HomeView>

  <div>我是options模式</div>
  <div>{{ options.count }} state</div>
  <div>{{ options.doubleCount }} getters</div>
  <button @click="options.increment">++</button>
  <button @click="reset">还原值</button>
  <button @click="stop">停止值</button>
</template>

<script setup lang='ts'>
// 还是使用逐渐
import { ref, reactive } from "vue";
import { useCounterStore, useOptionsStore } from "./stores/counter";
import HomeView from "./views/HomeView.vue";
const counter = useCounterStore();
const options = useOptionsStore();

const reset = () => {
  // options.$reset();
  counter.$reset()
};
const stop = () => {
  options.$dispose();
};
options.$subscribe((mutation: any, state: any) => {
  console.log(mutation, state);
});

console.log(counter, "counter");
console.log(options, "options");
</script>
<style scoped>
</style>



<!-- <template>
  <div>
    <button @click="stop">停止响应</button>
    <button @click="a++">++</button>
    <h2>ref{{ a }}</h2>
    <hr />
    <h2>computed{{ b }}</h2>
    <div>{{ counter.count }}</div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch, watchEffect, effectScope, effect } from "vue";
import { useCounterStore, useOptionsStore } from "./stores/counter";
const counter = useCounterStore();
let a = ref(0);
let b: any;
const scope = effectScope(); -->
<!-- 
// scope.run(() => {
//   effect(() => {
//     const subScope = effectScope(true);
//     subScope.run(() => {
//       b = computed(() => {
//         return a.value + 1;
//       });
//       watch(a, () => {
//         console.log("watch.a", a.value);
//       });
//     });
//   });
// }); -->

<!-- b = scope.run(() => {
  let c = effect(() => {
    const c = computed(() => {
      counter.increment();
      return a.value + 1;
    });
    watch(a, () => {
      console.log("watch.a", a.value);
    });
    return c;
  });
  console.log(c());
  return c();
});

const stop = () => {
  scope.stop();
};
</script>
<style scoped>
</style> -->