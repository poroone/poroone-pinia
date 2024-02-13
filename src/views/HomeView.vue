<template>
  <div>hellow</div>
  <div>我是组件</div>
  <div>{{ counter.count }}</div>
  <div>{{ counter.doubleCount }}</div>
  <button @click="counter.increment">++</button>
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue";
import { useCounterStore } from "../stores/counter";
const counter = useCounterStore();
</script>
<style scoped>
</style>