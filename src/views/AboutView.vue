<template>
  <div>
    <h2>About View</h2>
    <p>path: {{ $route.fullPath }}</p>
    <p>params: {{ $route.params }}</p>
    <p>query: {{ $route.query }}</p>
    <p>hash: {{ $route.hash }}</p>
    <button class="btn btn-primary" @click="$router.push('/')">Home</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(route.path);
</script>

<style lang="scss" scoped></style>
