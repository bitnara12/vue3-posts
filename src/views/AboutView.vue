<template>
  <div>
    <Button>무료로 진단 받아보기 ></Button>
    <Button backgroundColor="#3f3e3b">무료로 진단 받아보기 ></Button>
    <Button backgroundColor="#EEEEEE" textColor="#9f9f9f"
      >무료로 진단 받아보기 ></Button
    >
    <Button backgroundColor="#3f3e3b" fontSize="16pt" width="250">다음</Button>
    <Button fontSize="16pt" width="250">다음</Button>
    <Button
      backgroundColor="#ffedc9"
      textColor="#ffb317"
      fontSize="16pt"
      width="250"
      >다음</Button
    >
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Button from '@/components/Button.vue';

const route = useRoute();
console.log(route.path);
</script>

<style lang="scss" scoped></style>
