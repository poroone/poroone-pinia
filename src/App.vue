<template>
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
const scope = effectScope();

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
// });

b = scope.run(() => {
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
</style>